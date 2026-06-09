'use client'

import { Activity, TrendingUp } from 'lucide-react'
import { useDashboard } from '@/components/app/dashboard-context'

const weeks = [8, 12, 6, 18, 24, 15, 22, 35, 31, 24, 38, 52]
const max = Math.max(...weeks)

export default function DashboardActivityCard() {
  const { totalSignals, weeklyDelta } = useDashboard()

  return (
    <div className="rounded-xl border border-black/8 bg-white p-4">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={13} className="text-[#ACADB1]" />
          <span className="text-sm font-medium text-[#0A0A0A]">Signal activity</span>
        </div>
        <span className="text-xs text-[#ACADB1]">Last 12 weeks</span>
      </div>

      <div className="flex h-16 items-end gap-[3px]">
        {weeks.map((value, index) => {
          const isLast = index === weeks.length - 1
          const height = Math.max(4, (value / max) * 100)

          return (
            <div
              key={index}
              className={`flex-1 rounded-sm transition-all ${
                isLast ? 'bg-[#0A0A0A]' : 'bg-[#F3F3F3] hover:bg-[#E8E8E8]'
              }`}
              style={{ height: `${height}%` }}
              aria-label={`Week ${index + 1}: ${value} signals`}
            />
          )
        })}
      </div>

      <div className="mt-2 flex justify-between">
        <span className="text-[10px] text-[#ACADB1]">W1</span>
        <span className="text-[10px] text-[#ACADB1]">W12</span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-black/6 pt-3">
        <span className="text-xs text-[#6B6B6B]">{totalSignals.toLocaleString('en-US')} total signals</span>
        <div className="flex items-center gap-1">
          <TrendingUp size={11} className="text-[#28C840]" />
          <span className="text-xs text-[#28C840]">+{weeklyDelta} this week</span>
        </div>
      </div>
    </div>
  )
}
