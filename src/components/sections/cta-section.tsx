import WaitlistButton from '@/components/ui/waitlist-button'

export default function CTASection() {
  return (
    <section className="relative section-light py-28 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#6B6B6B] text-xs font-medium uppercase tracking-widest mb-4">
          Get started
        </p>
        <h2 className="text-[#0A0A0A] text-[40px] font-medium leading-[1.1] mb-4">
          Stop guessing. Start shipping the right things.
        </h2>
        <p className="text-[#6B6B6B] text-base mb-8 leading-relaxed">
          Join product teams who replaced spreadsheet backlogs with revenue-ranked opportunities.
        </p>
        <WaitlistButton variant="dark" />
        <p className="text-[#B3B3B3] text-xs mt-4">
          No credit card · Cancel anytime · Setup in 5 min
        </p>
      </div>
    </section>
  )
}
