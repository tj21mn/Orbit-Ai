'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, FileText, Plug2, Plus } from 'lucide-react'

const actions = [
  {
    label: 'Add signals',
    sub: 'Paste customer feedback',
    icon: Plus,
    href: '/app/signals',
  },
  {
    label: 'Generate PRD',
    sub: 'From top opportunity',
    icon: FileText,
    href: '/app/opportunities',
  },
  {
    label: 'Connect tool',
    sub: 'Add Intercom or Linear',
    icon: Plug2,
    href: '/app/integrations',
  },
]

export default function DashboardQuickActions() {
  const router = useRouter()

  return (
    <div className="overflow-hidden rounded-xl border border-black/8 bg-white">
      <div className="border-b border-black/6 px-4 py-3">
        <span className="text-sm font-medium text-[#0A0A0A]">Quick actions</span>
      </div>

      {actions.map((action, index) => {
        const Icon = action.icon

        return (
          <button
            key={action.label}
            type="button"
            onClick={() => router.push(action.href)}
            className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[#F9F9F9] ${
              index < actions.length - 1 ? 'border-b border-black/[0.04]' : ''
            }`}
          >
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#F3F3F3]">
              <Icon size={13} className="text-[#6B6B6B]" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-[#0A0A0A]">{action.label}</p>
              <p className="mt-0.5 text-[10px] text-[#ACADB1]">{action.sub}</p>
            </div>
            <ArrowRight size={11} className="text-[#ACADB1]" />
          </button>
        )
      })}
    </div>
  )
}
