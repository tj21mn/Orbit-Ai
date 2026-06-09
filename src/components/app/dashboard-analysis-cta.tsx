'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { useDashboard } from '@/components/app/dashboard-context'

export default function DashboardAnalysisCta() {
  const { isAnalyzing, statusMsg, runAnalysis } = useDashboard()

  return (
    <div className="mt-4 flex items-center justify-between rounded-xl bg-[#0A0A0A] p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8">
          <Sparkles size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">Run new analysis</p>
          <p className="mt-0.5 text-xs text-white/40">
            {statusMsg || 'Analyze signals from last 7 days'}
          </p>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Loader2 size={13} className="animate-spin" />
          {statusMsg}
        </div>
      ) : (
        <button
          type="button"
          onClick={runAnalysis}
          className="h-8 rounded-full bg-white px-4 text-xs font-medium text-[#0A0A0A] transition-opacity hover:opacity-85"
        >
          Run now →
        </button>
      )}
    </div>
  )
}
