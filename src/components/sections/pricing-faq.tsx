const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. Cancel from your settings page anytime. No questions asked.',
  },
  {
    question: 'What counts as a signal?',
    answer:
      'Any message, ticket, or transcript that mentions a product request, complaint, or suggestion.',
  },
  {
    question: 'Do you store my customer data?',
    answer:
      'We process signals to generate insights but never sell or share your data. SOC2 compliance coming Q3 2026.',
  },
  {
    question: 'What if I need more than 10 seats?',
    answer:
      "Email us at team@orbitpm.co and we'll set up a custom enterprise plan within 24 hours.",
  },
]

interface PricingFaqProps {
  dark?: boolean
}

export default function PricingFaq({ dark = false }: PricingFaqProps) {
  return (
    <section className="mt-20 max-w-2xl mx-auto">
      <h2
        className={`text-2xl font-medium text-center mb-10 ${
          dark ? 'text-white' : 'text-[#0A0A0A]'
        }`}
      >
        Common questions
      </h2>
      <div>
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className={`py-5 border-b ${dark ? 'border-white/10' : 'border-black/8'}`}
          >
            <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              {faq.question}
            </p>
            <p
              className={`text-sm mt-2 leading-relaxed ${
                dark ? 'text-white/50' : 'text-[#6B6B6B]'
              }`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
