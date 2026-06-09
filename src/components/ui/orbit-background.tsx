"use client"

import { useEffect, useRef } from "react"
import {
  createParticles,
  createPlanets,
  drawOrbitFrame,
  PLANET_CONFIGS,
  tickRipples,
  type Particle,
  type Planet,
  type Ripple,
} from "./orbit-canvas"
import OrbitPlanet from "./orbit-planet"

export default function OrbitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const planetRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 })
  const frameRef = useRef(0)
  const stateRef = useRef<{
    planets: Planet[]
    particles: Particle[]
    ripples: Ripple[]
    time: number
  } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const planets = createPlanets()
    stateRef.current = {
      planets,
      particles: createParticles(60),
      ripples: [{ radius: 8, opacity: 0.12 }],
      time: 0,
    }

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      }
    }
    window.addEventListener("mousemove", onMouse)

    const draw = () => {
      const state = stateRef.current
      if (!state) return

      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.04
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.04

      state.time += 0.016
      state.ripples = tickRipples(state.ripples)

      const positions = drawOrbitFrame(
        ctx,
        canvas.offsetWidth,
        canvas.offsetHeight,
        smoothMouseRef.current,
        state.planets,
        state.particles,
        state.ripples,
        state.time
      )

      positions.forEach((pos, i) => {
        const el = planetRefs.current[i]
        if (!el) return
        el.style.left = `${pos.x}px`
        el.style.top = `${pos.y}px`
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      {PLANET_CONFIGS.map((config, i) => (
        <OrbitPlanet
          key={config.id}
          ref={(el) => {
            planetRefs.current[i] = el
          }}
          planet={{ ...config, angle: 0 }}
        />
      ))}
    </div>
  )
}
