'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Layers, MessageCircle, MessageSquare, Mic, Plug2 } from 'lucide-react'

const integrations = [
  { name: 'Slack', icon: MessageSquare, connected: true },
  { name: 'Intercom', icon: MessageCircle, connected: false },
  { name: 'Linear', icon: Layers, connected: false },
  { name: 'Gong', icon: Mic, connected: false },
]

export default function DashboardIntegrationsCard() {
  const router = useRouter()

  return (
    <div className="rounded-xl border border-black/8 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plug2 size={13} className="text-[#ACADB1]" />
          <span className="text-sm font-medium text-[#0A0A0A]">Integrations</span>
        </div>
        <Link href="/app/integrations" className="text-xs text-[#6B6B6B] transition-colors hover:text-[#0A0A0A]">
          Manage
        </Link>
      </div>

      {integrations.map((item, index) => {
        const Icon = item.icon
        const isConnected = item.connected

        return (
          <div
            key={item.name}
            className={`flex items-center justify-between py-2.5 ${
              index < integrations.length - 1 ? 'border-b border-black/[0.05]' : ''
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#F3F3F3]">
                <Icon size={12} className="text-[#6B6B6B]" />
              </div>
              <span className="text-xs text-[#0A0A0A]">{item.name}</span>
            </div>

            {isConnected ? (
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
                <span className="text-[10px] text-[#28C840]">Connected</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => router.push('/app/integrations')}
                className="cursor-pointer text-[10px] text-[#6B6B6B] transition-colors hover:text-[#0A0A0A]"
              >
                Connect
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}
