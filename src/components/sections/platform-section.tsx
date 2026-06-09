const stats = [
  { label: 'Signals analyzed', value: '12,400+' },
  { label: 'Avg. time saved / week', value: '6.2 hrs' },
  { label: 'Integrations', value: '4 native' },
  { label: 'Setup time', value: '5 min' },
]

const controls = [
  {
    title: 'Full visibility',
    body: 'Every opportunity links back to source quotes across Slack, Intercom, and Linear.',
  },
  {
    title: 'Revenue-weighted',
    body: 'Impact scores reflect ARR risk and churn — not upvotes or loudest voice.',
  },
  {
    title: 'Write-back ready',
    body: 'PRDs and Linear tickets generated from approved opportunities, not templates.',
  },
]

export default function PlatformSection() {
  return (
    <section className="relative section-light py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#6B6B6B] text-xs font-medium uppercase tracking-widest mb-3">
          Platform
        </p>
        <h2 className="text-[40px] font-medium text-[#0A0A0A] leading-[1.1] max-w-md mb-16">
          Everything in your control
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-black/8 p-5"
            >
              <p className="text-[#B3B3B3] text-xs mb-2">{stat.label}</p>
              <p className="text-[#0A0A0A] text-2xl font-medium">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {controls.map((item) => (
            <div
              key={item.title}
              className="border border-black/8 rounded-xl p-6 bg-white"
            >
              <h3 className="text-sm font-medium text-[#0A0A0A] mb-2">{item.title}</h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
