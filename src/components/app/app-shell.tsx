'use client'

import { DashboardProvider } from '@/components/app/dashboard-context'
import DashboardToast from '@/components/app/dashboard-toast'
import Sidebar from '@/components/app/sidebar'

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <Sidebar />
      <main className="min-h-screen pl-[220px]">{children}</main>
      <DashboardToast />
    </DashboardProvider>
  )
}
