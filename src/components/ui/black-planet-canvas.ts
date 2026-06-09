import { createPlanets, type Planet, type PlanetPosition } from './orbit-canvas'

export interface Star {
  x: number
  y: number
  size: number
  opacity: number
  phase: number
  tier: 'dust' | 'mid' | 'bright'
}

export interface ConstellationLine {
  x1: number
  y1: number
  x2: number
  y2: number
  opacity: number
}

export interface StarField {
  stars: Star[]
  lines: ConstellationLine[]
}

export interface ParticleRing {
  radius: number
  ry: number
  speed: number
  dir: 1 | -1
  dotCount: number
  angle: number
  opacity: number
}

export const BLACK_RINGS: ParticleRing[] = [
  { radius: 0.14, ry: 0.34, speed: 0.004, dir: 1, dotCount: 120, angle: 0, opacity: 0.55 },
  { radius: 0.22, ry: 0.36, speed: 0.003, dir: -1, dotCount: 160, angle: 0.8, opacity: 0.4 },
  { radius: 0.30, ry: 0.38, speed: 0.002, dir: 1, dotCount: 200, angle: 1.6, opacity: 0.28 },
  { radius: 0.38, ry: 0.40, speed: 0.0015, dir: -1, dotCount: 240, angle: 2.4, opacity: 0.18 },
]

function ringPoint(
  cx: number,
  cy: number,
  radius: number,
  ry: number,
  angle: number,
  tiltX: number,
) {
  const px = cx + Math.cos(angle) * radius + Math.sin(angle) * radius * ry * tiltX
  const py = cy + Math.sin(angle) * radius * ry
  return { x: px, y: py }
}

export function createStarField(): StarField {
  const stars: Star[] = []
  const dustCount = 140
  const midCount = 55
  const brightCount = 12

  for (let i = 0; i < dustCount; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      size: 0.25 + Math.random() * 0.45,
      opacity: 0.04 + Math.random() * 0.1,
      phase: Math.random() * Math.PI * 2,
      tier: 'dust',
    })
  }

  for (let i = 0; i < midCount; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      size: 0.5 + Math.random() * 1.1,
      opacity: 0.1 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
      tier: 'mid',
    })
  }

  for (let i = 0; i < brightCount; i++) {
    stars.push({
      x: 0.12 + Math.random() * 0.76,
      y: 0.08 + Math.random() * 0.78,
      size: 1 + Math.random() * 1.2,
      opacity: 0.35 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      tier: 'bright',
    })
  }

  const brightStars = stars.filter((s) => s.tier === 'bright')
  const lines: ConstellationLine[] = []

  brightStars.forEach((star, i) => {
    if (i >= brightStars.length - 1) return
    const next = brightStars[i + 1]
    if (!next) return
    const dist = Math.hypot(star.x - next.x, star.y - next.y)
    if (dist < 0.22) {
      lines.push({
        x1: star.x,
        y1: star.y,
        x2: next.x,
        y2: next.y,
        opacity: 0.06 + (0.22 - dist) * 0.2,
      })
    }
  })

  return { stars, lines }
}

export function createStars(count: number): Star[] {
  return createStarField().stars.slice(0, count)
}

export function createBlackPlanets(): Planet[] {
  return createPlanets()
}

function drawEdgeDepth(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = 'rgba(10,10,10,0.45)'
  ctx.fillRect(0, 0, w, h * 0.12)
  ctx.fillRect(0, h * 0.88, w, h * 0.12)
  ctx.fillStyle = 'rgba(10,10,10,0.3)'
  ctx.fillRect(0, 0, w * 0.08, h)
  ctx.fillRect(w * 0.92, 0, w * 0.08, h)
}

function drawBlueprintGrid(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  w: number,
  h: number,
  time: number,
) {
  const pulse = 0.5 + Math.sin(time * 0.4) * 0.5

  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12 + time * 0.015
    const len = Math.max(w, h) * 0.55
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len * 0.35)
    ctx.strokeStyle = `rgba(255,255,255,${0.012 + pulse * 0.008})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  for (let r = 0.18; r <= 0.46; r += 0.07) {
    ctx.beginPath()
    ctx.ellipse(cx, cy, r * w * 0.42, r * h * 0.16, 0, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.025)'
    ctx.lineWidth = 0.5
    ctx.stroke()
  }
}

function drawConstellationLines(
  ctx: CanvasRenderingContext2D,
  lines: ConstellationLine[],
  w: number,
  h: number,
) {
  lines.forEach((line) => {
    ctx.beginPath()
    ctx.moveTo(line.x1 * w, line.y1 * h)
    ctx.lineTo(line.x2 * w, line.y2 * h)
    ctx.strokeStyle = `rgba(255,255,255,${line.opacity})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  })
}

function drawStarFlare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) {
  const len = size * 5
  ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.35})`
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(x - len, y)
  ctx.lineTo(x + len, y)
  ctx.moveTo(x, y - len * 0.5)
  ctx.lineTo(x, y + len * 0.5)
  ctx.stroke()
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  w: number,
  h: number,
  time: number,
  mouse: { x: number; y: number },
) {
  stars.forEach((star) => {
    const twinkle = 0.65 + Math.sin(time * 0.8 + star.phase) * 0.35
    const x = star.x * w
    const y = star.y * h
    const alpha = star.opacity * twinkle
    const dx = star.x - mouse.x
    const dy = star.y - mouse.y
    const mouseGlow = Math.max(0, 1 - Math.hypot(dx, dy) * 2.2) * 0.35

    if (star.tier === 'dust') {
      ctx.beginPath()
      ctx.arc(x, y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.fill()
      return
    }

    const glowAlpha = alpha * (0.18 + mouseGlow * 0.5)

    ctx.beginPath()
    ctx.arc(x, y, star.size * (star.tier === 'bright' ? 6 : 4), 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${glowAlpha})`
    ctx.fill()

    if (star.tier === 'bright') {
      drawStarFlare(ctx, x, y, star.size, alpha + mouseGlow * 0.3)
    }

    ctx.beginPath()
    ctx.arc(x, y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${Math.min(1, alpha + mouseGlow * 0.4)})`
    ctx.fill()
  })
}

function drawOrbitTrack(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ring: ParticleRing,
  w: number,
  h: number,
  tiltX: number,
  angleOffset: number,
) {
  const radius = ring.radius * Math.min(w, h * 2)
  ctx.beginPath()
  for (let i = 0; i <= 160; i++) {
    const a = angleOffset + (Math.PI * 2 * i) / 160
    const { x, y } = ringPoint(cx, cy, radius, ring.ry, a, tiltX)
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = `rgba(255,255,255,${ring.opacity * 0.1})`
  ctx.lineWidth = 0.5
  ctx.stroke()
}

function drawRingTicks(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ring: ParticleRing,
  w: number,
  h: number,
  tiltX: number,
  angleOffset: number,
) {
  const radius = ring.radius * Math.min(w, h * 2)
  const tickCount = 48

  for (let i = 0; i < tickCount; i++) {
    if (i % 4 !== 0) continue
    const a = angleOffset + (Math.PI * 2 * i) / tickCount
    const inner = ringPoint(cx, cy, radius * 0.985, ring.ry, a, tiltX)
    const outer = ringPoint(cx, cy, radius * 1.015, ring.ry, a, tiltX)
    ctx.beginPath()
    ctx.moveTo(inner.x, inner.y)
    ctx.lineTo(outer.x, outer.y)
    ctx.strokeStyle = `rgba(255,255,255,${ring.opacity * 0.22})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }
}

function drawParticleRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ring: ParticleRing,
  w: number,
  h: number,
  tiltX: number,
  angleOffset: number,
) {
  const radius = ring.radius * Math.min(w, h * 2)

  for (let i = 0; i < ring.dotCount; i++) {
    const a = angleOffset + (Math.PI * 2 * i) / ring.dotCount
    const { x, y } = ringPoint(cx, cy, radius, ring.ry, a, tiltX)
    const depth = 0.35 + ((Math.sin(a) + 1) / 2) * 0.65
    const size = 0.5 + depth * 0.95

    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${ring.opacity * depth})`
    ctx.fill()
  }
}

function drawSignalPulse(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
) {
  const cycle = (time * 0.08) % 1
  if (cycle > 0.12) return

  const progress = cycle / 0.12
  const x = w * (0.08 + progress * 0.84)
  const y = h * (0.15 + Math.sin(progress * Math.PI) * 0.08)

  ctx.beginPath()
  ctx.moveTo(x - 28, y)
  ctx.lineTo(x + 28, y)
  ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - progress)})`
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(x + 28, y, 1.2, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,255,255,${0.35 * (1 - progress)})`
  ctx.fill()
}

function drawBlackPlanet(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  mouse: { x: number; y: number },
) {
  const planetRadius = 38
  const dx = mouse.x * 2 - 1
  const dy = mouse.y * 2 - 1

  for (let i = 4; i >= 1; i--) {
    ctx.beginPath()
    ctx.arc(cx, cy, planetRadius + i * 16, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255,255,255,${0.015 + i * 0.006})`
    ctx.lineWidth = 0.5
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.arc(cx, cy, planetRadius + 6, 0, Math.PI * 2)
  ctx.strokeStyle = 'rgba(255,255,255,0.06)'
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx, cy, planetRadius, 0, Math.PI * 2)
  ctx.fillStyle = '#0A0A0A'
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, cy, planetRadius + 1, -Math.PI * 0.15, Math.PI * 0.55)
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'
  ctx.lineWidth = 1
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx, cy, planetRadius + 1, Math.PI * 0.55, Math.PI * 1.05)
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  ctx.lineWidth = 0.5
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cx - planetRadius * 0.28 + dx * 4, cy - planetRadius * 0.32 + dy * 3, planetRadius * 0.2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx - planetRadius * 0.12 + dx * 2, cy - planetRadius * 0.18 + dy * 2, 2.5, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.fill()
}

export interface OrbitInput {
  mouse: { x: number; y: number }
  scrollY: number
  scrollVelocity: number
  spinOffset: number
  hoverRingIndex: number | null
}

export function drawBlackPlanetFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  input: OrbitInput,
  planets: Planet[],
  rings: ParticleRing[],
  stars: Star[],
  lines: ConstellationLine[],
  time: number,
): PlanetPosition[] {
  const { mouse, scrollY, scrollVelocity, spinOffset, hoverRingIndex } = input
  const scrollNorm = Math.min(1, scrollY / Math.max(h * 0.65, 1))
  const scrollSpin = Math.max(-0.0014, Math.min(0.0014, scrollVelocity * 0.00022))
  const cx = w / 2 + (mouse.x - 0.5) * 88 + scrollY * 0.008
  const cy = h * (0.5 + scrollNorm * 0.14) + (mouse.y - 0.5) * 52 - scrollY * 0.04
  const tiltX = 0.12 + (mouse.x - 0.5) * 0.42 + (mouse.y - 0.5) * 0.08
  const mouseEnergy = 1 + Math.max(0, 1 - Math.hypot(mouse.x - 0.5, mouse.y - 0.5) * 1.4) * 0.45

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#0A0A0A'
  ctx.fillRect(0, 0, w, h)

  drawBlueprintGrid(ctx, cx, cy, w, h, time)
  drawConstellationLines(ctx, lines, w, h)
  drawStars(ctx, stars, w, h, time, mouse)
  drawSignalPulse(ctx, w, h, time)

  rings.forEach((ring, ringIndex) => {
    const hoverBoost = hoverRingIndex === ringIndex ? 1.5 : 1
    const ringSpinBias = 0.55 + ringIndex * 0.12
    ring.angle +=
      ring.speed * ring.dir * mouseEnergy * hoverBoost +
      scrollSpin * ring.dir * ringSpinBias

    const angleOffset = ring.angle + spinOffset * ring.dir * ringSpinBias
    const ringOpacity = hoverRingIndex === ringIndex ? Math.min(0.85, ring.opacity * 1.35) : ring.opacity
    const ringDraw = { ...ring, opacity: ringOpacity }

    drawOrbitTrack(ctx, cx, cy, ringDraw, w, h, tiltX, angleOffset)
    if (ringIndex >= 2) {
      drawRingTicks(ctx, cx, cy, ringDraw, w, h, tiltX, angleOffset)
    }
    drawParticleRing(ctx, cx, cy, ringDraw, w, h, tiltX, angleOffset)
  })

  drawBlackPlanet(ctx, cx, cy, mouse)
  drawEdgeDepth(ctx, w, h)

  const positions: PlanetPosition[] = []

  planets.forEach((planet) => {
    const ring = rings[planet.ringIndex]
    if (!ring) return

    const hoverBoost = hoverRingIndex === planet.ringIndex ? 1.5 : 1
    const ringSpinBias = 0.55 + planet.ringIndex * 0.12
    planet.angle +=
      ring.speed * ring.dir * 1.1 * mouseEnergy * hoverBoost +
      scrollSpin * ring.dir * ringSpinBias

    const radius = ring.radius * Math.min(w, h * 2)
    const { x, y } = ringPoint(
      cx,
      cy,
      radius,
      ring.ry,
      planet.angle + spinOffset * ring.dir * ringSpinBias,
      tiltX,
    )
    positions.push({ x, y, planet })
  })

  return positions
}
