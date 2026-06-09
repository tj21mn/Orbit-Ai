import { Zap, BarChart3, FileText } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Reads everything automatically",
    body: "ORBIT connects to Slack, Intercom, Linear, and Gong. Every message, ticket, and call transcript is analyzed — you don't lift a finger.",
  },
  {
    icon: BarChart3,
    title: "Ranked by revenue impact, not volume",
    body: "Each request is scored by ARR risk, churn signal, and expansion opportunity. The loudest customer isn't always the most important one.",
  },
  {
    icon: FileText,
    title: "One click from insight to spec",
    body: "Approve an opportunity and ORBIT writes the PRD, creates the Linear tickets, and posts the update to Slack. Your job is to decide.",
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-white/40 text-xs font-medium uppercase tracking-widest text-center mb-3">
          How it works
        </p>
        <h2 className="text-[40px] font-medium text-white leading-[1.1] max-w-md mx-auto text-center mb-4">
          From signal chaos to shipping decisions
        </h2>
        <p className="text-white/50 text-base text-center mb-16">
          Connect your tools once. ORBIT handles the rest.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title}>
              <div className="w-10 h-10 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center mb-4">
                <f.icon size={18} className="text-white/70" />
              </div>
              <h3 className="text-base font-medium text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
