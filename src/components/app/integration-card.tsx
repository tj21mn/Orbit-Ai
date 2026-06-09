import { CheckCircle2, Clock, type LucideIcon, Radio } from 'lucide-react'

export interface Integration {
  name: string
  description: string
  icon: LucideIcon
  color: string
  bg: string
  connected: boolean
  signals?: number
  lastSync?: string
}

interface IntegrationCardProps {
  integration: Integration
  onConnect: (name: string) => void
}

export default function IntegrationCard({ integration, onConnect }: IntegrationCardProps) {
  const Icon = integration.icon

  return (
    <div className="bg-white rounded-xl border border-[#D4D8DF] p-6 flex flex-col hover:border-[#ACADB1] transition-colors">
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: integration.bg }}
        >
          <Icon size={22} style={{ color: integration.color }} />
        </div>
        {integration.connected && (
          <span className="flex items-center gap-1.5 bg-[#F5F6F8] border border-[#EBEDF1] text-[#080808] text-xs font-medium px-2.5 py-1 rounded-full">
            <CheckCircle2 size={13} className="text-[#28C840]" />
            Connected
          </span>
        )}
      </div>

      <h3 className="text-[#080808] text-base font-medium mt-5">{integration.name}</h3>
      <p className="text-[#706F70] text-sm leading-relaxed mb-4 mt-1.5">{integration.description}</p>

      {integration.connected && integration.signals !== undefined && (
        <div className="flex items-center gap-4 mb-4 bg-[#F5F6F8] rounded-lg px-3 py-2">
          <span className="flex items-center gap-1.5 text-[#706F70] text-xs">
            <Radio size={12} />
            {integration.signals} signals synced
          </span>
          <span className="flex items-center gap-1.5 text-[#706F70] text-xs">
            <Clock size={12} />
            Synced {integration.lastSync}
          </span>
        </div>
      )}

      <div className="mt-auto">
        {integration.connected ? (
          <button
            type="button"
            className="border border-[#D4D8DF] text-[#706F70] text-xs h-9 px-4 rounded-full hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            Disconnect
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onConnect(integration.name)}
            className="bg-[#080808] text-white text-xs h-9 px-5 rounded-full hover:opacity-80 transition-opacity"
          >
            Connect {integration.name}
          </button>
        )}

        <div className="mt-5 pt-4 border-t border-[#EBEDF1]">
          <p className="text-[#ACADB1] text-[11px]">Syncs every 30 minutes</p>
        </div>
      </div>
    </div>
  )
}
