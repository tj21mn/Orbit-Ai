'use client'

import { useCallback, useEffect, useState } from 'react'
import { Layers, MessageCircle, MessageSquare, Mic } from 'lucide-react'
import IntegrationCard, { type Integration } from '@/components/app/integration-card'

const INTEGRATIONS: Integration[] = [
  {
    name: 'Slack',
    description: 'Monitor #feedback and #support channels for product signals',
    icon: MessageSquare,
    color: '#4A154B',
    bg: '#F4E6F7',
    connected: false,
  },
  {
    name: 'Intercom',
    description: 'Sync support conversations and feature requests automatically',
    icon: MessageCircle,
    color: '#1F8EEA',
    bg: '#E6F4FD',
    connected: true,
    signals: 312,
    lastSync: '4 min ago',
  },
  {
    name: 'Linear',
    description: 'Read issues and write back tickets when you approve a PRD',
    icon: Layers,
    color: '#5E6AD2',
    bg: '#EDEEF9',
    connected: false,
  },
  {
    name: 'Gong',
    description: 'Analyze sales call transcripts for feature requests and blockers',
    icon: Mic,
    color: '#FF5B00',
    bg: '#FFF0E6',
    connected: false,
  },
]

const CONNECTED_COUNT = INTEGRATIONS.filter((i) => i.connected).length
const TOTAL_COUNT = INTEGRATIONS.length
const PROGRESS = (CONNECTED_COUNT / TOTAL_COUNT) * 100

export default function IntegrationsPage() {
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = useCallback(() => {
    setToastVisible(true)
  }, [])

  useEffect(() => {
    if (!toastVisible) return
    const timer = setTimeout(() => setToastVisible(false), 2500)
    return () => clearTimeout(timer)
  }, [toastVisible])

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-[#ACADB1] text-xs uppercase tracking-widest mb-2">Workspace</p>
        <h1 className="text-[#080808] text-2xl font-medium tracking-[-0.02em]">Integrations</h1>
        <p className="text-[#706F70] text-sm mt-1.5 leading-relaxed">
          Connect your tools so ORBIT can read your customer signals.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-[#D4D8DF] p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#080808] text-sm font-medium">
              {CONNECTED_COUNT} of {TOTAL_COUNT} connected
            </p>
            <p className="text-[#ACADB1] text-xs mt-0.5">Connect more to improve accuracy</p>
          </div>
          <span className="text-[#080808] text-2xl font-medium">{Math.round(PROGRESS)}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#EBEDF1] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#080808] transition-colors"
            style={{ width: `${PROGRESS}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {INTEGRATIONS.map((integration) => (
          <IntegrationCard
            key={integration.name}
            integration={integration}
            onConnect={showToast}
          />
        ))}
      </div>

      <div
        className={`fixed bottom-5 right-5 bg-[#080808] text-white text-sm px-4 py-3 rounded-xl transition-opacity duration-300 ${
          toastVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="status"
        aria-live="polite"
      >
        OAuth coming soon
      </div>
    </div>
  )
}
