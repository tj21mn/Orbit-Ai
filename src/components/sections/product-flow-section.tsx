import HeroMockup from '@/components/sections/hero-mockup'

const flows = [
  {
    step: '01',
    label: 'Ingest',
    title: 'Every signal, one graph',
    body: 'Slack threads, Intercom tickets, Gong calls, and Linear issues flow into a single deduplicated signal graph — automatically.',
    align: 'left' as const,
  },
  {
    step: '02',
    label: 'Rank',
    title: 'Revenue impact, not volume',
    body: 'ORBIT scores each opportunity by ARR at risk, churn signals, and expansion potential. The loudest customer is never the default priority.',
    align: 'right' as const,
  },
  {
    step: '03',
    label: 'Ship',
    title: 'Insight to spec in one click',
    body: 'Approve an opportunity and ORBIT writes the PRD, creates Linear tickets, and posts the update to Slack. Your job is to decide.',
    align: 'left' as const,
  },
]

export default function ProductFlowSection() {
  return (
    <section className="relative section-dark py-28 px-6 grid-line-bg">
      <div className="max-w-5xl mx-auto">
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest text-center mb-3">
          Product
        </p>
        <h2 className="text-[40px] font-medium text-white leading-[1.1] text-center max-w-xl mx-auto mb-20">
          From signal chaos to shipping decisions
        </h2>

        <div className="flex flex-col gap-24">
          {flows.map((flow, index) => (
            <div
              key={flow.step}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                flow.align === 'right' ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={flow.align === 'right' ? 'lg:order-2' : ''}>
                <p className="text-white/30 text-xs font-mono mb-3">{flow.step} — {flow.label}</p>
                <h3 className="text-2xl font-medium text-white mb-3 leading-snug">{flow.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">{flow.body}</p>
              </div>
              <div className={flow.align === 'right' ? 'lg:order-1' : ''}>
                {index === 0 ? (
                  <HeroMockup />
                ) : (
                  <FlowCard step={flow.step} label={flow.label} index={index} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlowCard({
  step,
  label,
  index,
}: {
  step: string
  label: string
  index: number
}) {
  const items =
    index === 1
      ? [
          { name: 'CSV export', score: 91, tag: 'Revenue risk' },
          { name: 'Bulk user mgmt', score: 78, tag: 'Churn risk' },
          { name: 'Slack alerts', score: 65, tag: 'Retention' },
        ]
      : [
          { name: 'Problem', value: 'Enterprise CSV export missing' },
          { name: 'PRD', value: 'Generated · 12 sections' },
          { name: 'Linear', value: '3 tickets created' },
        ]

  return (
        <div className="code-panel-dark p-5">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/8">
        <span className="text-white/50 text-xs font-mono">{step} / {label}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={'score' in item ? item.name : item.name + item.value}
            className="flex items-center justify-between py-2 border-b border-white/6 last:border-0"
          >
            {'score' in item ? (
              <>
                <span className="text-white/70 text-sm">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs">{item.tag}</span>
                  <span className="text-white text-sm font-medium">{item.score}</span>
                </div>
              </>
            ) : (
              <>
                <span className="text-white/40 text-xs">{item.name}</span>
                <span className="text-white/70 text-xs">{item.value}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
