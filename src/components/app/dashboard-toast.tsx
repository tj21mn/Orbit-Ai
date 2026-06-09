'use client'

import { CheckCircle2 } from 'lucide-react'
import { useDashboard } from '@/components/app/dashboard-context'

export default function DashboardToast() {
  const { toastMessage, toastVisible } = useDashboard()

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-xs text-white transition-opacity duration-300 ${
        toastVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="status"
      aria-live="polite"
    >
      <CheckCircle2 size={13} className="text-[#28C840]" />
      <span>{toastMessage}</span>
    </div>
  )
}
