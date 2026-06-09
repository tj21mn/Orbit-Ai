'use client'

import {
  Activity,
  Clock,
  Flame,
  FileText,
  Plug2,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { useDashboard } from '@/components/app/dashboard-context'

function formatNumber(value: number) {
  return value.toLocaleString('en-US')
}

export default function DashboardStatCards() {
  const { opportunities, totalSignals, weeklyDelta, connectedCount } = useDashboard()
  const highImpact = opportunities.filter((o) => o.score >= 70).length

  return (
    <div className="mb-5 grid grid-cols-4 gap-3">
      <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-4">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-medium tracking-widest text-[#ACADB1]">TOTAL SIGNALS</span>
          <Activity size={13} className="text-[#ACADB1]" />
        </div>
        <p className="mt-3 text-2xl font-medium tracking-[-0.02em] text-[#0A0A0A]">
          {formatNumber(totalSignals)}
        </p>
        <div className="mt-1.5 flex items-center gap-1">
          <TrendingUp size={11} className="text-[#28C840]" />
          <span className="text-[11px] text-[#28C840]">+{weeklyDelta} this week</span>
        </div>
      </div>

      <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-4">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-medium tracking-widest text-[#ACADB1]">OPPORTUNITIES</span>
          <Sparkles size={13} className="text-[#ACADB1]" />
        </div>
        <p className="mt-3 text-2xl font-medium tracking-[-0.02em] text-[#0A0A0A]">{opportunities.length}</p>
        <div className="mt-1.5 flex items-center gap-1">
          <Flame size={11} className="text-[#ACADB1]" />
          <span className="text-[11px] text-[#6B6B6B]">{highImpact} high-impact</span>
        </div>
      </div>

      <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-4">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-medium tracking-widest text-[#ACADB1]">PRDS WRITTEN</span>
          <FileText size={13} className="text-[#ACADB1]" />
        </div>
        <p className="mt-3 text-2xl font-medium tracking-[-0.02em] text-[#0A0A0A]">3</p>
        <div className="mt-1.5 flex items-center gap-1">
          <Clock size={11} className="text-[#ACADB1]" />
          <span className="text-[11px] text-[#6B6B6B]">1 pending review</span>
        </div>
      </div>

      <div className="rounded-xl border border-[rgba(0,0,0,0.08)] bg-white p-4">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-medium tracking-widest text-[#ACADB1]">INTEGRATIONS</span>
          <Plug2 size={13} className="text-[#ACADB1]" />
        </div>
        <p className="mt-3 text-2xl font-medium tracking-[-0.02em] text-[#0A0A0A]">
          {connectedCount}/4
        </p>
        <div className="mt-2 flex gap-1">
          <span className="h-1 w-6 rounded-full bg-[#0A0A0A]" />
          <span className="h-1 w-6 rounded-full border border-black/8 bg-[#F3F3F3]" />
          <span className="h-1 w-6 rounded-full border border-black/8 bg-[#F3F3F3]" />
          <span className="h-1 w-6 rounded-full border border-black/8 bg-[#F3F3F3]" />
        </div>
      </div>
    </div>
  )
}
