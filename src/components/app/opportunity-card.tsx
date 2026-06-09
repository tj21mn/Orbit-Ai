import { MessageSquare } from 'lucide-react'
import type { Opportunity } from '@/types'

const categoryStyles: Record<Opportunity['category'], string> = {
  'Revenue risk': 'bg-red-50 text-red-600',
  'Churn risk': 'bg-orange-50 text-orange-600',
  'Retention': 'bg-blue-50 text-blue-600',
  'Growth unlock': 'bg-emerald-50 text-emerald-600',
}

interface OpportunityCardProps {
  opportunity: Opportunity
  rank: number
  onWritePRD: (opp: Opportunity) => void
}

export default function OpportunityCard({ opportunity, rank, onWritePRD }: OpportunityCardProps) {
  const sources = ['Slack', 'Intercom', 'Linear']

  return (
    <div className="bg-white rounded-xl border border-[#D4D8DF] p-6 hover:border-[#ACADB1] transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#F5F6F8] border border-[#EBEDF1] text-[#706F70] text-xs flex items-center justify-center flex-shrink-0">
            {rank}
          </div>
          <span className="text-[#080808] text-base font-medium ml-3">{opportunity.title}</span>
          <span className={`ml-3 text-[11px] px-2.5 py-0.5 rounded-full flex-shrink-0 ${categoryStyles[opportunity.category]}`}>
            {opportunity.category}
          </span>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-[#EBEDF1] bg-[#F5F6F8] flex flex-col items-center justify-center flex-shrink-0 ml-4">
          <span className="text-[#080808] text-sm font-medium leading-none">{opportunity.impact_score}</span>
          <span className="text-[#ACADB1] text-[9px] uppercase mt-0.5">score</span>
        </div>
      </div>

      <p className="text-[#706F70] text-sm leading-relaxed mt-3">{opportunity.description}</p>

      <div className="mt-3 flex items-center gap-6 min-w-0">
        <span className="flex items-center gap-1 text-[#ACADB1] text-xs flex-shrink-0">
          <MessageSquare size={12} />
          {opportunity.signal_count} customer signals
        </span>
        {opportunity.customer_quotes[0] && (
          <span className="text-[#ACADB1] text-xs italic truncate">
            &ldquo;{opportunity.customer_quotes[0]}&rdquo;
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {sources.map((source) => (
            <span key={source} className="text-[10px] bg-[#F5F6F8] border border-[#EBEDF1] text-[#706F70] px-2 py-0.5 rounded-full">
              {source}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="border border-[#D4D8DF] text-[#706F70] text-xs h-8 px-4 rounded-full hover:bg-[#F5F6F8] transition-colors"
          >
            View signals
          </button>
          <button
            type="button"
            onClick={() => onWritePRD(opportunity)}
            className="bg-[#080808] text-white text-xs h-8 px-4 rounded-full hover:opacity-80 transition-opacity"
          >
            Write PRD →
          </button>
        </div>
      </div>
    </div>
  )
}
