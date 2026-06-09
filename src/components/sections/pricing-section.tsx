import PricingCard from '@/components/sections/pricing-card'

function BlueprintMarker({ className }: { className?: string }) {
  return (
    <span className={`text-white/30 text-[10px] leading-none select-none ${className ?? ''}`}>
      +
    </span>
  )
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: [
      { text: '3 analyses per month' },
      { text: 'Up to 50 signals' },
      { text: '1 integration' },
      { text: 'PRD generation' },
      { text: 'Email support' },
    ],
    cta: 'Get started free',
    href: '/sign-up',
  },
  {
    name: 'Pro',
    price: '$49',
    featured: true,
    features: [
      { text: 'Unlimited analyses' },
      { text: 'Unlimited signals' },
      { text: 'All 4 integrations' },
      { text: 'PRD generation + Linear sync' },
      { text: 'Slack notifications' },
      { text: 'Priority support' },
    ],
    cta: 'Start 30-day trial',
    href: '/sign-up',
  },
  {
    name: 'Team',
    price: '$149',
    subtext: 'Up to 10 seats',
    features: [
      { text: 'Everything in Pro' },
      { text: '10 team seats' },
      { text: 'Shared roadmap view' },
      { text: 'Admin controls' },
      { text: 'Custom integrations' },
      { text: 'Dedicated onboarding' },
    ],
    cta: 'Contact us',
    href: 'mailto:team@orbitpm.co',
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="relative max-w-5xl mx-auto">
        <BlueprintMarker className="absolute -top-4 left-0 hidden md:block" />
        <BlueprintMarker className="absolute -top-4 right-0 hidden md:block" />

        <div className="text-center mb-16">
          <p className="text-[#ACADB1] text-xs uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-[40px] font-medium mb-4 leading-[1.1]">
            <span className="text-white block">Simple, transparent</span>
            <span className="text-white/50 block">pricing.</span>
          </h2>
          <p className="text-white/50 text-base">Start free. Upgrade when your team is ready.</p>
        </div>

        <div className="relative border border-white/15 rounded-xl p-6 md:p-8 before:absolute before:top-8 before:bottom-8 before:left-1/3 before:w-px before:bg-white/10 after:absolute after:top-8 after:bottom-8 after:left-2/3 after:w-px after:bg-white/10 before:hidden after:hidden md:before:block md:after:block">
          <BlueprintMarker className="absolute -top-2 -left-2 bg-[#0A0A0A] px-0.5 hidden md:block" />
          <BlueprintMarker className="absolute -top-2 -right-2 bg-[#0A0A0A] px-0.5 hidden md:block" />
          <BlueprintMarker className="absolute -bottom-2 -left-2 bg-[#0A0A0A] px-0.5 hidden md:block" />
          <BlueprintMarker className="absolute -bottom-2 -right-2 bg-[#0A0A0A] px-0.5 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
