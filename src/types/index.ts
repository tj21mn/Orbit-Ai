export interface WaitlistEntry {
  id: string
  email: string
  created_at: string
}

export interface Opportunity {
  id: string
  workspace_id: string
  title: string
  description: string
  signal_count: number
  impact_score: number
  category: 'Revenue risk' | 'Churn risk' | 'Retention' | 'Growth unlock'
  customer_quotes: string[]
  is_approved: boolean
  created_at: string
}
