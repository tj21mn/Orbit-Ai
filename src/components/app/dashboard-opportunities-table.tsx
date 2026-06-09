'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useDashboard } from '@/components/app/dashboard-context'

export default function DashboardOpportunitiesTable() {
  const { opportunities, totalSignals } = useDashboard()
  const signalSum = opportunities.reduce((sum, o) => sum + o.signals, 0)

  return (
    <div className="overflow-hidden rounded-xl border border-black/8 bg-white">
      <div className="flex items-center justify-between border-b border-black/6 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-medium text-[#0A0A0A]">Top opportunities</span>
          <span className="rounded-full bg-[#F3F3F3] px-2 py-0.5 text-[10px] text-[#6B6B6B]">
            {signalSum || totalSignals} signals
          </span>
        </div>
        <Link
          href="/app/opportunities"
          className="flex items-center gap-1 text-xs text-[#6B6B6B] transition-colors hover:text-[#0A0A0A]"
        >
          View all
          <ArrowUpRight size={11} />
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-4 border-b border-black/6 bg-[#F9F9F9] px-5 py-2.5">
        <span className="col-span-1 text-[10px] font-medium uppercase tracking-wider text-[#ACADB1]">#</span>
        <span className="col-span-6 text-[10px] font-medium uppercase tracking-wider text-[#ACADB1]">
          Request
        </span>
        <span className="col-span-2 text-right text-[10px] font-medium uppercase tracking-wider text-[#ACADB1]">
          Signals
        </span>
        <span className="col-span-3 text-right text-[10px] font-medium uppercase tracking-wider text-[#ACADB1]">
          Impact
        </span>
      </div>

      {opportunities.map((opp, index) => (
        <Link
          key={`${opp.rank}-${opp.title}`}
          href="/app/opportunities"
          className={`grid grid-cols-12 items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[#F9F9F9] ${
            index < opportunities.length - 1 ? 'border-b border-black/[0.04]' : ''
          }`}
        >
          <span className="col-span-1 text-xs text-[#ACADB1]">{opp.rank}</span>
          <div className="col-span-6 flex min-w-0 items-center gap-2">
            <span className="truncate text-xs font-medium text-[#0A0A0A]">{opp.title}</span>
            <span className="rounded-full bg-[#F3F3F3] px-2 py-0.5 text-[10px] text-[#6B6B6B]">{opp.tag}</span>
          </div>
          <span className="col-span-2 text-right text-xs text-[#6B6B6B]">{opp.signals}</span>
          <div className="col-span-3 flex items-center justify-end gap-2.5">
            <div className="h-[3px] w-16 rounded-full bg-[#F3F3F3]">
              <div
                className="h-full rounded-full bg-[#0A0A0A]"
                style={{ width: `${opp.score}%` }}
              />
            </div>
            <span className="w-5 text-right text-xs font-medium text-[#0A0A0A]">{opp.score}</span>
          </div>
        </Link>
      ))}

      <div className="flex items-center justify-between border-t border-black/6 bg-[#F9F9F9] px-5 py-3">
        <span className="text-[10px] text-[#ACADB1]">Ranked by revenue impact</span>
        <Link
          href="/app/opportunities"
          className="text-[10px] font-medium text-[#0A0A0A] transition-opacity hover:opacity-70"
        >
          See all {opportunities.length} →
        </Link>
      </div>
    </div>
  )
}
