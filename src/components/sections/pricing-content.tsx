import PricingFaq from '@/components/sections/pricing-faq'
import PricingSection from '@/components/sections/pricing-section'

export default function PricingContent() {
  return (
    <main className="pt-28 pb-24">
      <PricingSection />
      <div className="px-6">
        <PricingFaq dark />
      </div>
    </main>
  )
}
