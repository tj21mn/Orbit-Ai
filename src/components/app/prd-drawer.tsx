'use client'

import { useState } from 'react'
import { FileText, X } from 'lucide-react'
import type { Opportunity } from '@/types'

interface PRDDrawerProps {
  open: boolean
  onClose: () => void
  opportunity: Opportunity | null
}

function PRDContent({ content, showCursor }: { content: string; showCursor: boolean }) {
  const lines = content.split('\n')

  return (
    <div>
      {lines.map((line, i) =>
        line.startsWith('##') ? (
          <h3 key={i} className="text-[#0A0A0A] text-sm font-medium mt-5 mb-1 first:mt-0">
            {line.replace(/^##\s*/, '')}
          </h3>
        ) : line.trim() ? (
          <p key={i} className="text-[#6B6B6B] text-sm leading-relaxed">
            {line}
          </p>
        ) : null
      )}
      {showCursor && <span className="text-[#0A0A0A] text-sm animate-pulse">▋</span>}
    </div>
  )
}

function PRDDrawerInner({ open, onClose, opportunity }: PRDDrawerProps) {
  const [prdContent, setPrdContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleClose = () => {
    setIsGenerating(false)
    setIsDone(false)
    setPrdContent('')
    onClose()
  }

  const handleGenerate = async () => {
    if (!opportunity) return

    setIsGenerating(true)
    setIsDone(false)
    setPrdContent('')

    try {
      const res = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opportunity),
      })

      if (!res.ok || !res.body) throw new Error('Stream failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setPrdContent((prev) => prev + chunk)
      }

      setIsDone(true)
      setIsGenerating(false)
    } catch {
      setPrdContent('Error generating PRD. Please try again.')
      setIsDone(true)
      setIsGenerating(false)
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={handleClose} aria-hidden="true" />
      )}
      <div
        className={`fixed right-0 top-0 h-screen w-[500px] bg-white border-l border-black/8 z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-4 border-b border-black/8 flex justify-between items-center">
          <span className="text-[#0A0A0A] text-sm font-medium">PRD Generator</span>
          <button type="button" onClick={handleClose} className="text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors">
            <X size={18} />
          </button>
        </div>

        {opportunity && (
          <div className="px-6 py-4 bg-[#F9F9F9] border-b border-black/6">
            <p className="text-[#0A0A0A] text-sm font-medium">{opportunity.title}</p>
            <p className="text-[#6B6B6B] text-xs mt-0.5">
              {opportunity.signal_count} signals · Impact: {opportunity.impact_score}/100
            </p>
          </div>
        )}

        <div className="px-6 py-5 flex-1 overflow-y-auto">
          {!isGenerating && !isDone && !prdContent && (
            <div className="border border-dashed border-black/10 rounded-xl p-8 text-center">
              <FileText className="text-[#B3B3B3] mx-auto" size={32} />
              <p className="text-[#B3B3B3] text-sm mt-3">Click Generate to create your PRD</p>
            </div>
          )}

          {(isGenerating || isDone) && (
            <PRDContent content={prdContent} showCursor={isGenerating} />
          )}
        </div>

        <div className="px-6 py-4 border-t border-black/8">
          {!isDone ? (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || !opportunity}
              className="w-full bg-[#0A0A0A] text-white h-11 rounded-full text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Generate PRD'}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                className="border border-black/15 text-[#0A0A0A] flex-1 h-10 rounded-full text-sm hover:bg-[#F3F3F3] transition-colors"
              >
                Copy PRD
              </button>
              <button
                type="button"
                disabled
                className="bg-[#0A0A0A] text-white flex-1 h-10 rounded-full text-sm opacity-50 cursor-not-allowed"
              >
                Create tickets
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function PRDDrawer(props: PRDDrawerProps) {
  return <PRDDrawerInner key={props.opportunity?.id ?? 'none'} {...props} />
}
