import Navbar from '@/components/sections/navbar'
import Hero from '@/components/sections/hero'
import LogoBar from '@/components/sections/logo-bar'
import IntegrateSection from '@/components/sections/integrate-section'
import ProductFlowSection from '@/components/sections/product-flow-section'
import PlatformSection from '@/components/sections/platform-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import ChangelogSection from '@/components/sections/changelog-section'
import PricingSection from '@/components/sections/pricing-section'
import CTASection from '@/components/sections/cta-section'
import Footer from '@/components/sections/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoBar />
      <div id="integrate">
        <IntegrateSection />
      </div>
      <div id="features">
        <ProductFlowSection />
      </div>
      <PlatformSection />
      <TestimonialsSection />
      <ChangelogSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  )
}
