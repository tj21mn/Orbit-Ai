const quotes = [
  {
    text: 'We stopped maintaining a spreadsheet backlog. ORBIT found three duplicate requests we had been tracking separately for months.',
    name: 'Sarah Chen',
    role: 'PM, Series B SaaS',
  },
  {
    text: 'The revenue scoring changed how we prioritize. Sales stopped asking why their loudest customer wasn\'t first on the roadmap.',
    name: 'Marcus Webb',
    role: 'Head of Product',
  },
  {
    text: 'PRD generation alone saves our team a full day per sprint. The Linear sync is the part that actually stuck.',
    name: 'Priya Nair',
    role: 'Senior PM',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 px-6 border-t border-white/8">
      <div className="max-w-5xl mx-auto">
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest text-center mb-3">
          Teams
        </p>
        <h2 className="text-[40px] font-medium text-white leading-[1.1] text-center max-w-lg mx-auto mb-16">
          Built for PMs who ship, not synthesize
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="bg-[#111111] border border-white/8 rounded-xl p-6 flex flex-col"
            >
              <blockquote className="text-white/60 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption>
                <p className="text-white text-sm font-medium">{q.name}</p>
                <p className="text-white/40 text-xs mt-0.5">{q.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
