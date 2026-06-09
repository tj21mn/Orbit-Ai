import { forwardRef } from 'react'
import { Layers, MessageCircle, MessageSquare, Mic } from 'lucide-react'
import type { Planet } from './orbit-canvas'

const ICONS = {
  slack: MessageSquare,
  intercom: MessageCircle,
  linear: Layers,
  gong: Mic,
} as const

interface OrbitPlanetProps {
  planet: Planet
  variant?: 'light' | 'dark'
  active?: boolean
  onHover?: (ringIndex: number | null) => void
}

const OrbitPlanet = forwardRef<HTMLDivElement, OrbitPlanetProps>(function OrbitPlanet(
  { planet, variant = 'light', active = false, onHover },
  ref,
) {
  const Icon = ICONS[planet.id as keyof typeof ICONS]
  const isDark = variant === 'dark'
  const orbitSize = planet.size + 18

  return (
    <div
      ref={ref}
      className="absolute will-change-[left,top] -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
      style={{ width: orbitSize, height: orbitSize }}
      onMouseEnter={() => onHover?.(planet.ringIndex)}
      onMouseLeave={() => onHover?.(null)}
    >
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-opacity ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: orbitSize, height: orbitSize }}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
        <div
          className={`rounded-full flex items-center justify-center transition-colors ${
            isDark
              ? active
                ? 'border border-white/40 bg-[#1A1A1A]'
                : 'border border-white/15 bg-[#111111] hover:border-white/30'
              : 'border border-black/8 bg-white hover:border-black/15'
          }`}
          style={{ width: planet.size, height: planet.size }}
        >
          <Icon
            size={planet.size * 0.42}
            className={`transition-opacity ${isDark ? 'text-white/70' : 'text-[#706F70]'} ${active ? 'opacity-100' : 'opacity-80'}`}
          />
        </div>
        <span
          className={`text-[8px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap transition-colors ${
            isDark
              ? active
                ? 'text-white bg-[#1A1A1A] border border-white/20'
                : 'text-white/50 bg-[#111111]/90 border border-white/10'
              : 'text-[#706F70] bg-white/80 border border-[#D4D8DF]'
          }`}
        >
          {planet.name}
        </span>
      </div>
    </div>
  )
})

export default OrbitPlanet
