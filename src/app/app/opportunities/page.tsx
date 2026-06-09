'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2, RefreshCw, Sparkles } from 'lucide-react'
import OpportunityCard from '@/components/app/opportunity-card'
import PRDDrawer from '@/components/app/prd-drawer'
import type { Opportunity } from '@/types'

const CATEGORIES = ['All', 'Revenue risk', 'Churn risk', 'Retention', 'Growth unlock'] as const

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export default function OpportunitiesPage() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [workspaceId, setWorkspaceId] = useState('')
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const filtered =
    selectedCategory === 'All'
      ? opportunities
      : opportunities.filter((o) => o.category === selectedCategory)

  const showToastMessage = useCallback((message: string) => {
    setToastMsg(message)
    setShowToast(true)
  }, [])

  const loadOpportunities = useCallback(async (wsId: string) => {
    const res = await fetch(`/api/opportunities?workspaceId=${wsId}`)
    if (!res.ok) return []
    const data = (await res.json()) as Opportunity[]
    return Array.isArray(data) ? data : []
  }, [])

  useEffect(() => {
    async function init() {
      try {
        const wsRes = await fetch('/api/workspace')
        const ws = (await wsRes.json()) as { id?: string }
        if (!ws.id) return

        setWorkspaceId(ws.id)
        const opps = await loadOpportunities(ws.id)
        setOpportunities(opps)

        if (searchParams.get('fresh') === 'true' && opps.length > 0) {
          showToastMessage(`Found ${opps.length} opportunities`)
        }
      } finally {
        setLoading(false)
      }
    }
    void init()
  }, [loadOpportunities, searchParams, showToastMessage])

  useEffect(() => {
    if (!showToast) return
    const timer = setTimeout(() => setShowToast(false), 3000)
    return () => clearTimeout(timer)
  }, [showToast])

  const runAnalysis = async () => {
    if (!workspaceId) return

    setIsAnalyzing(true)
    setStatusMsg('Connecting to integrations...')
    await delay(700)
    setStatusMsg('Reading customer signals...')
    await delay(1000)
    setStatusMsg('Ranking by revenue impact...')

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId }),
      })
      const data = (await res.json()) as {
        success?: boolean
        opportunities?: Opportunity[]
        error?: string
      }

      if (!res.ok || !data.success || !data.opportunities?.length) {
        showToastMessage(data.error ?? 'Analysis failed')
        return
      }

      setOpportunities(data.opportunities)
      showToastMessage(`Found ${data.opportunities.length} opportunities`)
    } catch {
      showToastMessage('Analysis failed')
    } finally {
      setIsAnalyzing(false)
      setStatusMsg('')
    }
  }

  return (
    <div className="max-w-5xl p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-[#ACADB1]">Pipeline</p>
          <h1 className="text-2xl font-medium tracking-[-0.02em] text-[#080808]">Opportunities</h1>
          <p className="mt-1.5 text-sm text-[#706F70]">What your customers want built next</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={runAnalysis}
            disabled={isAnalyzing || !workspaceId}
            className="flex h-9 items-center gap-1.5 rounded-full border border-[#D4D8DF] px-4 text-xs text-[#080808] transition-colors hover:bg-white disabled:opacity-50"
          >
            <RefreshCw size={13} />
            Sync now
          </button>
          <button
            type="button"
            onClick={runAnalysis}
            disabled={isAnalyzing || !workspaceId}
            className="flex h-9 min-w-[180px] items-center justify-center gap-1.5 rounded-full bg-[#080808] px-4 text-xs text-white transition-opacity hover:opacity-80 disabled:opacity-60"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                {statusMsg}
              </>
            ) : (
              <>
                <Sparkles size={13} />
                Run analysis
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mb-6 flex w-fit gap-1 rounded-full border border-[#EBEDF1] bg-[#F5F6F8] p-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs transition-colors ${
              selectedCategory === cat
                ? 'border border-[#EBEDF1] bg-white font-medium text-[#080808]'
                : 'text-[#706F70] hover:text-[#080808]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isAnalyzing && (
        <div className="mb-3 rounded-xl border border-black/8 bg-white p-8 text-center">
          <Sparkles className="mx-auto size-7 animate-pulse text-[#0A0A0A]" />
          <p className="mt-3 text-sm font-medium text-[#0A0A0A]">{statusMsg}</p>
          <p className="mt-1 text-xs text-[#6B6B6B]">Usually takes 3-5 seconds</p>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-[#6B6B6B]">Loading opportunities...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-black/8 bg-white p-8 text-center">
          <p className="text-sm font-medium text-[#0A0A0A]">No opportunities yet</p>
          <p className="mt-1 text-xs text-[#6B6B6B]">
            Paste signals on the Signals page or run analysis from stored feedback.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((opp, index) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              rank={index + 1}
              onWritePRD={(o) => {
                setSelectedOpp(o)
                setDrawerOpen(true)
              }}
            />
          ))}
        </div>
      )}

      <PRDDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        opportunity={selectedOpp}
      />

      <div
        className={`fixed bottom-4 right-4 rounded-xl bg-[#0A0A0A] px-4 py-3 text-sm text-white transition-opacity ${
          showToast ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {toastMsg}
      </div>
    </div>
  )
}
