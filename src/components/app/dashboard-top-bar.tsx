'use client'

import { Sparkles } from 'lucide-react'
import { useDashboard } from '@/components/app/dashboard-context'

export default function DashboardTopBar() {
  const { isAnalyzing, statusMsg, runAnalysis } = useDashboard()

  return (
    <header className="sticky top-0 z-30 flex h-11 items-center justify-between border-b border-black/6 bg-white/90 px-8 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#ACADB1]">Overview</span>
        <span className="text-xs text-[#ACADB1]">/</span>
        <span className="text-xs font-medium text-[#0A0A0A]">Dashboard</span>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#28C840]" />
          Week of Jun 9
        </div>

        <div className="h-4 w-px bg-black/10" />

        <button
          type="button"
          onClick={runAnalysis}
          disabled={isAnalyzing}
          className="flex h-7 items-center gap-1.5 rounded-full bg-[#0A0A0A] px-3.5 text-xs text-white transition-opacity hover:opacity-80 disabled:opacity-60"
        >
          <Sparkles size={11} />
          {isAnalyzing ? statusMsg || 'Analyzing...' : 'Run analysis'}
        </button>
      </div>
    </header>
  )
}
