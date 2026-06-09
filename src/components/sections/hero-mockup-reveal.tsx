'use client'

import { useEffect, useState } from 'react'
import HeroMockup from '@/components/sections/hero-mockup'

export default function HeroMockupReveal() {
  const [reveal, setReveal] = useState(0)

  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight
      const start = vh * 0.05
      const distance = vh * 0.42
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance))
      setReveal(progress)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="relative z-10 h-[62vh] min-h-[480px]">
      <div
        className="sticky top-[14vh] px-6 pb-8 max-w-5xl mx-auto w-full"
        style={{
          transform: `translateY(${(1 - reveal) * 140}px)`,
          opacity: 0.08 + reveal * 0.92,
        }}
      >
        <HeroMockup />
      </div>
    </div>
  )
}
