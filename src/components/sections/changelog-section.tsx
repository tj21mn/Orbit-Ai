const entries = [
  { date: 'Jun 6', tag: 'New', title: 'Signals page — paste or sync customer feedback' },
  { date: 'Jun 4', tag: 'Improvement', title: 'Analyze pipeline now persists to Supabase' },
  { date: 'Jun 1', tag: 'New', title: 'PRD drawer with streaming generation' },
]

export default function ChangelogSection() {
  return (
    <section id="changelog" className="relative section-light py-24 px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[#6B6B6B] text-xs font-medium uppercase tracking-widest mb-3">
              Changelog
            </p>
            <h2 className="text-[32px] font-medium text-[#0A0A0A] leading-[1.1]">
              Shipping weekly
            </h2>
          </div>
          <p className="text-[#B3B3B3] text-xs">Updated Jun 6, 2026</p>
        </div>

        <div className="border border-black/8 rounded-xl bg-white divide-y divide-black/8">
          {entries.map((entry) => (
            <div key={entry.title} className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4">
              <span className="text-[#B3B3B3] text-xs font-mono w-16 flex-shrink-0">{entry.date}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#6B6B6B] border border-black/8 rounded-full px-2 py-0.5 w-fit">
                {entry.tag}
              </span>
              <span className="text-[#0A0A0A] text-sm">{entry.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
