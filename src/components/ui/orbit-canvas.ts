export interface OrbitRing {
  radius: number
  ry: number
  speed: number
  dir: 1 | -1
  color: string
  opacity: number
}

export interface Planet {
  id: string
  name: string
  ringIndex: number
  angle: number
  size: number
}

export interface PlanetPosition {
  x: number
  y: number
  planet: Planet
}

export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export interface Ripple {
  radius: number
  opacity: number
}

export const RINGS: OrbitRing[] = [
  { radius: 0.13, ry: 0.36, speed: 0.009, dir: 1, color: "53,53,54", opacity: 0.20 },
  { radius: 0.22, ry: 0.38, speed: 0.006, dir: -1, color: "112,111,112", opacity: 0.16 },
  { radius: 0.31, ry: 0.40, speed: 0.004, dir: 1, color: "53,53,54", opacity: 0.12 },
  { radius: 0.40, ry: 0.42, speed: 0.0028, dir: -1, color: "172,173,177", opacity: 0.09 },
]

export const PLANET_CONFIGS: Omit<Planet, "angle">[] = [
  { id: "slack", name: "Slack", ringIndex: 0, size: 38 },
  { id: "intercom", name: "Intercom", ringIndex: 1, size: 36 },
  { id: "linear", name: "Linear", ringIndex: 2, size: 34 },
  { id: "gong", name: "Gong", ringIndex: 3, size: 32 },
]

export function createPlanets(): Planet[] {
  const startAngles = [0.4, 2.0, 3.8, 5.3]
  return PLANET_CONFIGS.map((config, i) => ({
    ...config,
    angle: startAngles[i],
  }))
}

export function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0004,
    vy: (Math.random() - 0.5) * 0.0003,
    size: 0.6 + Math.random() * 1.2,
    opacity: 0.08 + Math.random() * 0.14,
  }))
}

function ringPoint(
  cx: number,
  cy: number,
  radius: number,
  ry: number,
  angle: number,
  tiltX: number
) {
  const px = cx + Math.cos(angle) * radius + Math.sin(angle) * radius * ry * tiltX
  const py = cy + Math.sin(angle) * radius * ry
  return { x: px, y: py }
}

function drawRing(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ring: OrbitRing,
  w: number,
  h: number,
  tiltX: number,
  tiltY: number
) {
  const radius = ring.radius * Math.min(w, h * 2)
  const ry = ring.ry + Math.abs(tiltY) * 0.12

  ctx.beginPath()
  for (let s = 0; s <= 140; s++) {
    const a = (Math.PI * 2 * s) / 140
    const { x, y } = ringPoint(cx, cy, radius, ry, a, tiltX)
    if (s === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.strokeStyle = `rgba(${ring.color},${ring.opacity})`
  ctx.lineWidth = 0.75
  ctx.stroke()
}

function drawPlanetTrail(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  ring: OrbitRing,
  angle: number,
  w: number,
  h: number,
  tiltX: number,
  tiltY: number,
  accent: string
) {
  const radius = ring.radius * Math.min(w, h * 2)
  const ry = ring.ry + Math.abs(tiltY) * 0.12

  for (let k = 1; k <= 18; k++) {
    const ta = angle - ring.dir * ring.speed * k * 2
    const { x, y } = ringPoint(cx, cy, radius, ry, ta, tiltX)
    const fade = 1 - k / 20
    ctx.beginPath()
    ctx.arc(x, y, 3 * fade, 0, Math.PI * 2)
    ctx.fillStyle = accent.replace("1)", `${fade * 0.25})`)
    ctx.fill()
  }
}

export function drawOrbitFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  mouse: { x: number; y: number },
  planets: Planet[],
  particles: Particle[],
  ripples: Ripple[],
  time: number
): PlanetPosition[] {
  const cx = w / 2 + (mouse.x - 0.5) * 28
  const cy = h * 0.38 + (mouse.y - 0.5) * 18
  const tiltX = (mouse.x - 0.5) * 0.18
  const tiltY = (mouse.y - 0.5) * 0.1

  ctx.clearRect(0, 0, w, h)

  particles.forEach((p) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > 1) p.vx *= -1
    if (p.y < 0 || p.y > 1) p.vy *= -1
    ctx.beginPath()
    ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(172,173,177,${p.opacity})`
    ctx.fill()
  })

  ripples.forEach((r) => {
    ctx.beginPath()
    ctx.arc(cx, cy, r.radius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(112,111,112,${r.opacity})`
    ctx.lineWidth = 0.6
    ctx.stroke()
  })

  RINGS.forEach((ring) => drawRing(ctx, cx, cy, ring, w, h, tiltX, tiltY))

  const positions: PlanetPosition[] = []

  planets.forEach((planet) => {
    const ring = RINGS[planet.ringIndex]
    planet.angle += ring.speed * ring.dir
    const radius = ring.radius * Math.min(w, h * 2)
    const ry = ring.ry + Math.abs(tiltY) * 0.12
    const { x, y } = ringPoint(cx, cy, radius, ry, planet.angle, tiltX)

    drawPlanetTrail(ctx, cx, cy, ring, planet.angle, w, h, tiltX, tiltY, "rgba(112,111,112,1)")
    positions.push({ x, y, planet })
  })

  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      const a = positions[i]
      const b = positions[j]
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        const strength = (1 - dist / 120) * 0.12
        const mx = (a.x + b.x) / 2
        const my = (a.y + b.y) / 2
        const bulge = (120 - dist) * 0.12
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.quadraticCurveTo(mx, my - bulge, b.x, b.y)
        ctx.strokeStyle = `rgba(112,111,112,${strength})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }
    }
  }

  drawSun(ctx, cx, cy, time)

  return positions
}

function drawSun(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  time: number
) {
  const pulse = 1 + Math.sin(time * 1.2) * 0.08
  const sunRadius = 7 * pulse

  const outerGlow = ctx.createRadialGradient(cx, cy, sunRadius * 0.5, cx, cy, 56)
  outerGlow.addColorStop(0, "rgba(235,237,241,0.45)")
  outerGlow.addColorStop(0.35, "rgba(212,216,223,0.18)")
  outerGlow.addColorStop(0.7, "rgba(172,173,177,0.06)")
  outerGlow.addColorStop(1, "rgba(172,173,177,0)")
  ctx.beginPath()
  ctx.arc(cx, cy, 56, 0, Math.PI * 2)
  ctx.fillStyle = outerGlow
  ctx.fill()

  const midGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28)
  midGlow.addColorStop(0, "rgba(235,237,241,0.55)")
  midGlow.addColorStop(0.5, "rgba(212,216,223,0.18)")
  midGlow.addColorStop(1, "rgba(172,173,177,0)")
  ctx.beginPath()
  ctx.arc(cx, cy, 28, 0, Math.PI * 2)
  ctx.fillStyle = midGlow
  ctx.fill()

  const corona = ctx.createRadialGradient(cx, cy, sunRadius, cx, cy, sunRadius + 6)
  corona.addColorStop(0, "rgba(255,255,255,0.45)")
  corona.addColorStop(1, "rgba(212,216,223,0)")
  ctx.beginPath()
  ctx.arc(cx, cy, sunRadius + 6, 0, Math.PI * 2)
  ctx.fillStyle = corona
  ctx.fill()

  ctx.beginPath()
  ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2)
  ctx.fillStyle = "#EBEDF1"
  ctx.fill()

  const rim = ctx.createRadialGradient(cx - 1.5, cy - 1.5, 0, cx, cy, sunRadius)
  rim.addColorStop(0, "rgba(255,255,255,0.95)")
  rim.addColorStop(0.45, "rgba(255,255,255,0.25)")
  rim.addColorStop(1, "rgba(172,173,177,0)")
  ctx.beginPath()
  ctx.arc(cx, cy, sunRadius, 0, Math.PI * 2)
  ctx.fillStyle = rim
  ctx.fill()
}

export function tickRipples(ripples: Ripple[]): Ripple[] {
  const next = ripples
    .map((r) => ({ radius: r.radius + 1.2, opacity: r.opacity - 0.006 }))
    .filter((r) => r.opacity > 0)

  if (next.length < 3 && Math.random() < 0.008) {
    next.push({ radius: 4, opacity: 0.16 })
  }
  return next
}
