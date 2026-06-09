const opportunities = [
  { rank: 1, title: "CSV export", signals: 94, score: 91, tag: "Revenue risk", q: "We lose deals because you don't have this" },
  { rank: 2, title: "Bulk user management", signals: 67, score: 78, tag: "Churn risk", q: "Our ops team wastes 2 hours daily" },
  { rank: 3, title: "Slack notifications", signals: 52, score: 65, tag: "Retention", q: "I miss updates when not in dashboard" },
  { rank: 4, title: "Mobile app", signals: 41, score: 54, tag: "Growth unlock", q: "Need roadmap access while traveling" },
]

const metrics = [
  { label: "Total Signals", value: "292", sub: "+18 this week" },
  { label: "Opportunities", value: "38", sub: "5 high-impact" },
  { label: "Avg Impact Score", value: "67.4", sub: "↑ 4.2 vs last week" },
]

const sideNavItems = [
  { label: "Overview", active: false },
  { label: "Opportunities", active: true },
  { label: "Roadmap", active: false },
  { label: "Signals", active: false },
  { label: "Integrations", active: false },
]

const barHeights = [30, 55, 42, 70, 48, 85, 62, 78, 50, 90, 68, 80]

export default function HeroMockup() {
  return (
    <div className="rounded-2xl border border-[#D4D8DF] overflow-hidden" style={{ background: "#F0F1F4" }}>
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#E8E9EC] border-b border-[#D4D8DF]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex items-center bg-white/70 border border-[#D4D8DF] rounded-lg px-3 py-1 max-w-[200px] mx-auto gap-2">
          <span className="text-[#ACADB1] text-[10px]">app.orbit.so</span>
        </div>
      </div>

      <div className="flex h-[380px]">
        <div className="w-48 bg-[#1A1A1C] flex flex-col flex-shrink-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
            <span className="text-white text-[11px] font-medium">Orbit</span>
            <span className="ml-auto text-[9px] text-white/30 bg-white/8 px-1.5 py-0.5 rounded-full">Beta</span>
          </div>
          <div className="flex flex-col gap-0.5 p-2 flex-1">
            {sideNavItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg ${
                  item.active ? "bg-white/10 text-white" : "text-white/35"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.active ? "bg-white" : "bg-white/20"}`} />
                <span className="text-[11px]">{item.label}</span>
                {item.active && (
                  <span className="ml-auto text-[9px] text-white/40 bg-white/8 px-1.5 py-0.5 rounded-full">38</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-[#F5F6F8] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#EBEDF1] bg-white">
            <div>
              <span className="text-[#080808] text-xs font-medium">Opportunities</span>
              <span className="text-[#ACADB1] text-[10px] ml-2">Jun 9 – Jun 16</span>
            </div>
            <button className="bg-[#080808] text-white text-[10px] px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity">
              Generate PRDs
            </button>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col p-3 gap-3">
            <div className="grid grid-cols-3 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="bg-white rounded-xl border border-[#EBEDF1] px-3 py-2.5">
                  <p className="text-[#ACADB1] text-[9px] uppercase tracking-widest mb-1">{m.label}</p>
                  <p className="text-[#080808] text-lg font-medium leading-none mb-1">{m.value}</p>
                  <p className="text-[#ACADB1] text-[9px]">{m.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-1 overflow-hidden">
              <div className="flex-1 bg-white rounded-xl border border-[#EBEDF1] flex flex-col overflow-hidden">
                <div className="px-3 py-2 border-b border-[#EBEDF1]">
                  <span className="text-[#080808] text-[11px] font-medium">Top Opportunities</span>
                </div>
                {opportunities.map((o) => (
                  <div key={o.rank} className="flex items-center gap-3 px-3 py-2 border-b border-[#EBEDF1]/60 last:border-0">
                    <span className="text-[#ACADB1] text-[9px] w-3">{o.rank}</span>
                    <span className="text-[#080808] text-[10px] font-medium flex-1">{o.title}</span>
                    <span className="text-[#080808] text-[9px] font-medium">{o.score}</span>
                  </div>
                ))}
              </div>

              <div className="w-36 bg-white rounded-xl border border-[#EBEDF1] flex flex-col flex-shrink-0">
                <div className="px-3 py-2 border-b border-[#EBEDF1]">
                  <span className="text-[#080808] text-[11px] font-medium block">Signals</span>
                </div>
                <div className="flex-1 flex items-end gap-1 px-3 pb-3 pt-4">
                  {barHeights.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className="rounded-sm w-full"
                        style={{
                          height: `${h}%`,
                          background: i === barHeights.length - 1 ? "#353536" : "#D4D8DF",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
