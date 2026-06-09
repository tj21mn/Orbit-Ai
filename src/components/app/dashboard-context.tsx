'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Opportunity } from '@/types'

export type DashboardRow = {
  rank: number
  title: string
  tag: string
  signals: number
  score: number
}

export const DEFAULT_OPPORTUNITIES: DashboardRow[] = [
  { rank: 1, title: 'CSV export', tag: 'Revenue risk', signals: 94, score: 91 },
  { rank: 2, title: 'Bulk user management', tag: 'Churn risk', signals: 67, score: 78 },
  { rank: 3, title: 'Slack notifications', tag: 'Retention', signals: 52, score: 65 },
  { rank: 4, title: 'Mobile app', tag: 'Growth unlock', signals: 41, score: 54 },
  { rank: 5, title: 'API webhooks', tag: 'Growth unlock', signals: 38, score: 48 },
]

const DEFAULT_TOTAL_SIGNALS = 1247
const DEFAULT_WEEKLY_DELTA = 18

function mapOpportunities(opportunities: Opportunity[]): DashboardRow[] {
  return opportunities.map((opp, index) => ({
    rank: index + 1,
    title: opp.title,
    tag: opp.category,
    signals: opp.signal_count,
    score: opp.impact_score,
  }))
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type DashboardContextValue = {
  opportunities: DashboardRow[]
  totalSignals: number
  weeklyDelta: number
  isAnalyzing: boolean
  statusMsg: string
  toastMessage: string
  toastVisible: boolean
  connectedCount: number
  runAnalysis: () => Promise<void>
}

const DashboardContext = createContext<DashboardContextValue | null>(null)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [opportunities, setOpportunities] = useState(DEFAULT_OPPORTUNITIES)
  const [totalSignals, setTotalSignals] = useState(DEFAULT_TOTAL_SIGNALS)
  const [weeklyDelta, setWeeklyDelta] = useState(DEFAULT_WEEKLY_DELTA)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = useCallback((message: string) => {
    setToastMessage(message)
    setToastVisible(true)
    window.setTimeout(() => setToastVisible(false), 3000)
  }, [])

  const runAnalysis = useCallback(async () => {
    if (isAnalyzing) return

    setIsAnalyzing(true)
    setStatusMsg('Connecting to integrations...')
    await delay(700)
    setStatusMsg('Reading customer signals...')
    await delay(1000)
    setStatusMsg('Ranking by impact...')

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
      const data = (await res.json()) as {
        opportunities?: Opportunity[]
        total_signals?: number
        error?: string
      }

      if (!res.ok || !data.opportunities?.length) {
        showToast(data.error ?? 'Analysis failed — try again')
        return
      }

      const mapped = mapOpportunities(data.opportunities)
      setOpportunities(mapped)
      setTotalSignals(data.total_signals ?? mapped.reduce((sum, o) => sum + o.signals, 0))
      setWeeklyDelta(Math.max(1, Math.round(mapped.length * 3.6)))
      showToast(`Analysis complete — ${mapped.length} opportunities found`)
    } catch {
      showToast('Analysis failed — check your connection')
    } finally {
      setIsAnalyzing(false)
      setStatusMsg('')
    }
  }, [isAnalyzing, showToast])

  const value = useMemo(
    () => ({
      opportunities,
      totalSignals,
      weeklyDelta,
      isAnalyzing,
      statusMsg,
      toastMessage,
      toastVisible,
      connectedCount: 1,
      runAnalysis,
    }),
    [
      opportunities,
      totalSignals,
      weeklyDelta,
      isAnalyzing,
      statusMsg,
      toastMessage,
      toastVisible,
      runAnalysis,
    ],
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export function useDashboard() {
  const ctx = useContext(DashboardContext)
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider')
  return ctx
}
