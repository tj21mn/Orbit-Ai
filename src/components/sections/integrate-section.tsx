'use client'

import { useState } from 'react'

const tabs = [
  { id: 'analyze', label: 'Analyze' },
  { id: 'webhook', label: 'Webhook' },
  { id: 'prd', label: 'PRD' },
] as const

type TabId = (typeof tabs)[number]['id']

const snippets: Record<TabId, string[]> = {
  analyze: [
    "import { Orbit } from '@orbit/sdk'",
    '',
    'const orbit = new Orbit(process.env.ORBIT_API_KEY)',
    '',
    'const { opportunities } = await orbit.analyze({',
    '  workspaceId: "ws_abc123",',
    '  sources: ["slack", "intercom", "linear"],',
    '})',
    '',
    'console.log(opportunities[0].impactScore) // 91',
  ],
  webhook: [
    '// POST /api/webhooks/slack',
    '',
    'export async function POST(req: Request) {',
    '  const signal = await req.json()',
    '',
    '  await orbit.ingest({',
    '    source: "slack",',
    '    content: signal.text,',
    '    customerTier: signal.tier,',
    '  })',
    '',
    '  return Response.json({ ok: true })',
    '}',
  ],
  prd: [
    'const prd = await orbit.generatePrd({',
    '  opportunityId: "opp_csv_export",',
    '  format: "linear-ready",',
    '})',
    '',
    'await orbit.sync.linear.createIssues({',
    '  prdId: prd.id,',
    '  project: "Q3 Retention",',
    '})',
    '',
    'await orbit.notify.slack({ channel: "#product" })',
  ],
}

export default function IntegrateSection() {
  const [active, setActive] = useState<TabId>('analyze')
  const lines = snippets[active]

  return (
    <section className="relative section-light py-28 px-6 grid-line-bg-light">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#6B6B6B] text-xs font-medium uppercase tracking-widest mb-3">
          Integrate
        </p>
        <h2 className="text-[40px] font-medium text-[#0A0A0A] leading-[1.1] max-w-lg mb-4">
          Start ranking your backlog in minutes
        </h2>
        <p className="text-[#6B6B6B] text-base max-w-xl mb-12 leading-relaxed">
          A simple API and native integrations for Slack, Intercom, and Linear.
          ORBIT fits right into your stack.
        </p>

        <div className="code-panel">
          <div className="flex items-center gap-1 border-b border-black/8 px-4 py-3 bg-[#F3F3F3]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  active === tab.id
                    ? 'bg-[#0A0A0A] text-white'
                    : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <span className="ml-auto text-[#B3B3B3] text-[10px] hidden sm:inline">
              Node.js · TypeScript
            </span>
          </div>
          <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed font-mono text-[#0A0A0A] bg-white">
            {lines.map((line, i) => (
              <div key={`${active}-${i}`} className="flex">
                <span className="select-none text-[#B3B3B3] w-8 flex-shrink-0 text-right pr-4">
                  {i + 1}
                </span>
                <code>{line || ' '}</code>
              </div>
            ))}
          </pre>
        </div>

        <p className="text-[#B3B3B3] text-xs mt-4">
          SDK coming soon · REST API available today via /api/analyze
        </p>
      </div>
    </section>
  )
}
