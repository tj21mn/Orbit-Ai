import Link from 'next/link'
import { Check } from 'lucide-react'

interface PricingFeature {
  text: string
}

interface PricingCardProps {
  name: string
  price: string
  period?: string
  subtext?: string
  features: PricingFeature[]
  cta: string
  href: string
  featured?: boolean
}

export default function PricingCard({
  name,
  price,
  period = '/month',
  subtext,
  features,
  cta,
  href,
  featured = false,
}: PricingCardProps) {
  if (featured) {
    return (
      <div className="relative bg-[#111111] rounded-2xl border border-white/15 p-8">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#0A0A0A] text-xs px-4 py-1 rounded-full border border-white/10">
          Most popular
        </span>

        <p className="text-white text-base font-medium">{name}</p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-white text-5xl font-medium">{price}</span>
          <span className="text-white/50 text-sm">{period}</span>
        </div>

        <div className="border-t border-white/10 mt-6 mb-6" />

        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature.text} className="flex items-center gap-2 text-sm text-white/70">
              <Check size={14} className="text-white flex-shrink-0" />
              {feature.text}
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className="mt-8 flex items-center justify-center w-full bg-white text-[#0A0A0A] h-11 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
        >
          {cta}
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#1A1A1A] rounded-2xl border border-white/10 p-8">
      <p className="text-white text-base font-medium">{name}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-white text-5xl font-medium">{price}</span>
        <span className="text-white/50 text-sm">{period}</span>
      </div>
      {subtext && <p className="text-white/40 text-xs mt-1">{subtext}</p>}

      <div className="border-t border-white/10 mt-6 mb-6" />

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature.text} className="flex items-center gap-2 text-sm text-white/50">
            <Check size={14} className="text-[#ACADB1] flex-shrink-0" />
            {feature.text}
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-8 flex items-center justify-center w-full border border-white/15 text-white h-11 rounded-full text-sm hover:bg-white/10 transition-colors"
      >
        {cta}
      </Link>
    </div>
  )
}
