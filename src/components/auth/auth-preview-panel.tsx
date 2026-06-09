'use client'

import { ArrowUp, Copy, MoreHorizontal, RefreshCw, Search, Volume2 } from 'lucide-react'

interface AuthPreviewPanelProps {
  mode: 'signin' | 'signup'
}

export default function AuthPreviewPanel({ mode }: AuthPreviewPanelProps) {
  return (
    <div className="w-full max-w-[420px]">
      <div className="bg-white rounded-xl border border-black/8 p-6 flex flex-col min-h-[480px]">
        <div className="flex items-center gap-1.5 mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-16 rounded-full bg-[#0A0A0A] flex items-center justify-center mb-6">
            <svg width="28" height="28" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="2.2" fill="white" />
              <circle cx="7" cy="7" r="5.2" stroke="white" strokeWidth="1" fill="none" opacity="0.45" />
            </svg>
          </div>

          <p className="text-[#0A0A0A] text-sm leading-relaxed max-w-[280px]">
            {mode === 'signup'
              ? 'Hello and welcome! I analyze signals from Slack, Intercom, Linear, and Gong — then rank what to build next.'
              : 'Welcome back. Your opportunities and PRDs are ready. Pick up where you left off.'}
          </p>

          <div className="flex items-center gap-4 mt-8">
            {[Volume2, RefreshCw, Copy, MoreHorizontal].map((Icon, i) => (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="text-[#B3B3B3] hover:text-[#6B6B6B] transition-colors"
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex items-center gap-3 h-11 px-4 rounded-full border border-black/8 bg-[#F9F9F9]">
            <Search size={15} className="text-[#B3B3B3] flex-shrink-0" />
            <span className="text-[#B3B3B3] text-sm flex-1 text-left">Ask me anything</span>
            <span className="w-7 h-7 rounded-full bg-[#0A0A0A] flex items-center justify-center flex-shrink-0">
              <ArrowUp size={13} className="text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
