'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Sparkles } from 'lucide-react'

type StoredSignal = {
  id: string
  source: string
  content: string
  customer_name: string | null
  customer_tier: string | null
  created_at: string
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function SignalsPage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')
  const [workspaceId, setWorkspaceId] = useState('')
  const [storedSignals, setStoredSignals] = useState<StoredSignal[]>([])
  const [loadingSignals, setLoadingSignals] = useState(true)
  const [error, setError] = useState('')

  const lineCount = text.split('\n').filter((l) => l.trim()).length

  const loadSignals = useCallback(async (wsId: string) => {
    const res = await fetch(`/api/signals?workspaceId=${wsId}`)
    if (!res.ok) return
    const data = (await res.json()) as StoredSignal[]
    setStoredSignals(Array.isArray(data) ? data : [])
  }, [])

  useEffect(() => {
    fetch('/api/workspace')
      .then((r) => r.json())
      .then((d: { id?: string; error?: string }) => {
        if (d.id) {
          setWorkspaceId(d.id)
          return loadSignals(d.id)
        }
        setError(d.error ?? 'Could not load workspace')
      })
      .catch(() => setError('Could not load workspace'))
      .finally(() => setLoadingSignals(false))
  }, [loadSignals])

  const handleAnalyze = async () => {
    const lines = text.split('\n').filter((l) => l.trim())
    if (!lines.length || !workspaceId) return

    setError('')
    setIsAnalyzing(true)
    setStatusMsg('Saving signals...')
    await delay(500)
    setStatusMsg('Reading customer feedback...')
    await delay(800)
    setStatusMsg('Ranking by revenue impact...')

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signals: lines,
          workspaceId,
        }),
      })
      const data = (await res.json()) as { success?: boolean; error?: string }

      if (!res.ok || !data.success) {
        setError(data.error ?? 'Analysis failed')
        setIsAnalyzing(false)
        setStatusMsg('')
        return
      }

      router.push('/app/opportunities?fresh=true')
    } catch (e) {
      console.error(e)
      setError('Analysis failed — check your connection')
      setIsAnalyzing(false)
      setStatusMsg('')
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] px-8 py-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-[#ACADB1]">Workspace</p>
          <h1 className="text-xl font-medium text-[#0A0A0A]">Signals</h1>
          <p className="mt-1 text-sm text-[#6B6B6B]">
            Paste customer feedback — one signal per line — then run analysis.
          </p>
        </div>
        <span className="rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs text-[#6B6B6B]">
          {lineCount} signals
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="rounded-xl border border-black/8 bg-white p-5">
            <label htmlFor="signal-input" className="text-sm font-medium text-[#0A0A0A]">
              Paste signals
            </label>
            <p className="mt-1 text-xs text-[#ACADB1]">
              One feedback item per line. Example: We need CSV export for finance reporting.
            </p>
            <textarea
              id="signal-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={'Customer asked for bulk user management\nFinance team blocked without CSV export\nSlack notifications would help our team stay aligned'}
              rows={14}
              disabled={isAnalyzing}
              className="mt-4 w-full resize-none rounded-xl border border-black/8 bg-[#F9F9F9] px-4 py-3 text-sm text-[#0A0A0A] placeholder:text-[#ACADB1] focus:border-[#0A0A0A] focus:outline-none disabled:opacity-60"
            />
            {error && <p className="mt-3 text-xs text-[#706F70]">{error}</p>}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-[#6B6B6B]">
                {lineCount === 0 ? 'Add at least one signal to analyze' : `${lineCount} signals ready`}
              </span>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing || lineCount === 0 || !workspaceId}
                className="flex h-9 items-center gap-1.5 rounded-full bg-[#0A0A0A] px-4 text-xs font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
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
        </div>

        <div className="col-span-1">
          <div className="rounded-xl border border-black/8 bg-white p-4">
            <p className="text-sm font-medium text-[#0A0A0A]">Saved signals</p>
            <p className="mt-0.5 text-xs text-[#ACADB1]">From this workspace</p>
            {loadingSignals ? (
              <p className="mt-4 text-xs text-[#6B6B6B]">Loading...</p>
            ) : storedSignals.length === 0 ? (
              <p className="mt-4 text-xs text-[#6B6B6B]">No signals yet. Paste and analyze to save.</p>
            ) : (
              <ul className="mt-4 max-h-[420px] space-y-2 overflow-y-auto">
                {storedSignals.map((signal) => (
                  <li
                    key={signal.id}
                    className="rounded-lg border border-black/[0.04] bg-[#F9F9F9] px-3 py-2"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-[#ACADB1]">
                      {signal.source}
                    </p>
                    <p className="mt-1 text-xs text-[#0A0A0A]">{signal.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
