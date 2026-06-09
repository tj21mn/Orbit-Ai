'use client'

import { useUser } from '@clerk/nextjs'
import DashboardTopBar from '@/components/app/dashboard-top-bar'
import DashboardStatCards from '@/components/app/dashboard-stat-cards'
import DashboardOpportunitiesTable from '@/components/app/dashboard-opportunities-table'
import DashboardAnalysisCta from '@/components/app/dashboard-analysis-cta'
import DashboardIntegrationsCard from '@/components/app/dashboard-integrations-card'
import DashboardActivityCard from '@/components/app/dashboard-activity-card'
import DashboardQuickActions from '@/components/app/dashboard-quick-actions'

export default function DashboardPage() {
  const { user } = useUser()
  const firstName = user?.firstName ?? 'there'

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <DashboardTopBar />

      <div className="px-8 py-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-[22px] font-medium tracking-[-0.01em] text-[#0A0A0A]">
              Good morning, {firstName}
            </h1>
            <p className="mt-0.5 text-sm text-[#6B6B6B]">
              Here&apos;s your product intelligence for this week.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28C840]" />
            <span className="text-xs text-[#ACADB1]">Synced 4 min ago</span>
          </div>
        </div>

        <DashboardStatCards />

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <DashboardOpportunitiesTable />
            <DashboardAnalysisCta />
          </div>

          <div className="col-span-1 space-y-4">
            <DashboardIntegrationsCard />
            <DashboardActivityCard />
            <DashboardQuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}
