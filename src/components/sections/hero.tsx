import WaitlistButton from '@/components/ui/waitlist-button'
import HeroMockupReveal from '@/components/sections/hero-mockup-reveal'

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111111]/80 px-3.5 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] flex-shrink-0" />
          <span className="text-white/60 text-xs">Now in beta · Get Early Access</span>
        </div>

        <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">
          Product intelligence for B2B teams
        </p>

        <h1 className="text-[52px] md:text-[68px] font-medium leading-[1.05] tracking-[-0.03em] mb-5 max-w-3xl">
          <span className="text-white block">Ship what customers</span>
          <span className="text-white/50 block">actually need.</span>
        </h1>

        <p className="text-white/50 text-lg leading-relaxed max-w-[560px] mb-8">
          ORBIT analyzes every customer signal across Slack, Intercom, and Linear — and ranks your backlog by revenue impact. No more guessing.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <WaitlistButton />
          <a
            href="#integrate"
            className="border border-white/15 bg-[#111111]/60 text-white/70 h-11 px-7 rounded-full text-sm hover:text-white hover:border-white/30 transition-colors inline-flex items-center justify-center"
          >
            View integration
          </a>
        </div>

        <p className="text-white/30 text-xs mb-10">
          No credit card required · 5-minute setup · Works with your existing tools
        </p>

        <p className="text-white/25 text-xs tracking-wide">Scroll to explore</p>
      </div>

      <HeroMockupReveal />
    </section>
  )
}
