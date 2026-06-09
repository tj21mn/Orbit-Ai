'use client'

import { useEffect, useRef, useState } from 'react'
import {
  BLACK_RINGS,
  createBlackPlanets,
  createStarField,
  drawBlackPlanetFrame,
  type ConstellationLine,
  type ParticleRing,
  type Star,
} from './black-planet-canvas'
import { PLANET_CONFIGS } from './orbit-canvas'
import OrbitPlanet from './orbit-planet'

export default function BlackPlanetBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const planetRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const scrollRef = useRef(0)
  const scrollVelocityRef = useRef(0)
  const smoothScrollVelocityRef = useRef(0)
  const orbitSpinRef = useRef(0)
  const hoverRingRef = useRef<number | null>(null)
  const draggingRef = useRef(false)
  const lastScrollSampleRef = useRef({ y: 0, t: 0 })
  const lastMouseSampleRef = useRef({ x: 0.5, y: 0.5, t: 0 })
  const frameRef = useRef(0)
  const [hoverRing, setHoverRing] = useState<number | null>(null)
  const stateRef = useRef<{
    planets: ReturnType<typeof createBlackPlanets>
    stars: Star[]
    lines: ConstellationLine[]
    rings: ParticleRing[]
    time: number
  } | null>(null)

  useEffect(() => {
    hoverRingRef.current = hoverRing
  }, [hoverRing])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const starField = createStarField()

    stateRef.current = {
      planets: createBlackPlanets(),
      stars: starField.stars,
      lines: starField.lines,
      rings: BLACK_RINGS.map((ring) => ({ ...ring })),
      time: 0,
    }

    const startTime = performance.now()
    lastScrollSampleRef.current = { y: window.scrollY, t: startTime }
    lastMouseSampleRef.current.t = startTime

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const sampleMouse = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect()
      const x = Math.min(1, Math.max(0, (clientX - r.left) / r.width))
      const y = Math.min(1, Math.max(0, (clientY - r.top) / r.height))
      const now = performance.now()
      const dx = x - lastMouseSampleRef.current.x
      const dy = y - lastMouseSampleRef.current.y
      const dragMultiplier = draggingRef.current ? 4 : 2.4

      orbitSpinRef.current += dx * dragMultiplier
      orbitSpinRef.current += dy * dragMultiplier * 0.35

      lastMouseSampleRef.current = { x, y, t: now }
      mouseRef.current = { x, y }
    }

    const onMouseMove = (e: MouseEvent) => sampleMouse(e.clientX, e.clientY)
    const onMouseDown = () => {
      draggingRef.current = true
    }
    const onMouseUp = () => {
      draggingRef.current = false
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    const onScroll = () => {
      const now = performance.now()
      const y = window.scrollY
      const dt = Math.max(8, now - lastScrollSampleRef.current.t)
      scrollVelocityRef.current = (y - lastScrollSampleRef.current.y) / dt
      lastScrollSampleRef.current = { y, t: now }
      scrollRef.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const draw = () => {
      const state = stateRef.current
      if (!state) return

      const mouseSpeed = Math.hypot(
        mouseRef.current.x - smoothMouseRef.current.x,
        mouseRef.current.y - smoothMouseRef.current.y,
      )
      const mouseLerp = 0.06 + Math.min(mouseSpeed * 0.8, 0.14)

      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * mouseLerp
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * mouseLerp
      orbitSpinRef.current *= 0.993
      smoothScrollVelocityRef.current +=
        (scrollVelocityRef.current - smoothScrollVelocityRef.current) * 0.12

      scrollVelocityRef.current *= 0.8

      state.time += 0.016

      const positions = drawBlackPlanetFrame(
        ctx,
        canvas.offsetWidth,
        canvas.offsetHeight,
        {
          mouse: smoothMouseRef.current,
          scrollY: scrollRef.current,
          scrollVelocity: smoothScrollVelocityRef.current,
          spinOffset: orbitSpinRef.current,
          hoverRingIndex: hoverRingRef.current,
        },
        state.planets,
        state.rings,
        state.stars,
        state.lines,
        state.time,
      )

      positions.forEach((pos, i) => {
        const el = planetRefs.current[i]
        if (!el) return
        el.style.left = `${pos.x}px`
        el.style.top = `${pos.y}px`
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none">
        {PLANET_CONFIGS.map((config, i) => (
          <OrbitPlanet
            key={config.id}
            variant="dark"
            active={hoverRing === config.ringIndex}
            ref={(el) => {
              planetRefs.current[i] = el
            }}
            planet={{ ...config, angle: 0 }}
            onHover={(ringIndex) => setHoverRing(ringIndex)}
          />
        ))}
      </div>
    </div>
  )
}
