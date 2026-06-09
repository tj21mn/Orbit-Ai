import BlackPlanetBackground from '@/components/ui/black-planet-background'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#0A0A0A]">
        <BlackPlanetBackground />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
