'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'
import {
  ChevronsUpDown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Map,
  Plug2,
  Radio,
  Settings2,
  Sparkles,
} from 'lucide-react'
import { useDashboard } from '@/components/app/dashboard-context'

const workspaceName = 'Acme Corp'

const workspaceNav = [
  { label: 'Overview', icon: LayoutDashboard, href: '/app' },
  { label: 'Opportunities', icon: Sparkles, href: '/app/opportunities', badge: true },
  { label: 'Signals', icon: Radio, href: '/app/signals' },
  { label: 'Roadmap', icon: Map, href: '/app/roadmap' },
  { label: 'Integrations', icon: Plug2, href: '/app/integrations' },
]

const accountNav = [
  { label: 'Settings', icon: Settings2, href: '/app/settings' },
  { label: 'Help', icon: HelpCircle, href: '#' },
]

function NavLink({
  href,
  label,
  icon: Icon,
  badge,
  badgeCount,
  pathname,
}: {
  href: string
  label: string
  icon: typeof LayoutDashboard
  badge?: boolean
  badgeCount?: number
  pathname: string
}) {
  const isActive = href === '/app' ? pathname === '/app' : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-xs transition-all duration-100 ${
        isActive
          ? 'bg-white/8 text-white'
          : 'text-white/35 hover:bg-white/[0.04] hover:text-white/70'
      }`}
    >
      <Icon size={13} className="shrink-0" />
      <span>{label}</span>
      {badge && badgeCount !== undefined && (
        <span className="ml-auto rounded-full bg-white/8 px-1.5 py-0.5 text-[10px] text-white/50">
          {badgeCount}
        </span>
      )}
    </Link>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()
  const { user } = useUser()
  const { opportunities } = useDashboard()

  const firstName = user?.firstName ?? 'User'
  const initial = firstName.charAt(0).toUpperCase()
  const workspaceInitial = workspaceName.charAt(0).toUpperCase()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-white/8 bg-[#0A0A0A]">
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
            <span className="text-xs font-medium text-[#0A0A0A]">O</span>
          </div>
          <span className="text-sm font-medium text-white">Orbit</span>
        </div>

        <button
          type="button"
          className="mt-3 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-2 transition-colors hover:bg-white/[0.07]"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10">
            <span className="text-[10px] font-medium text-white/60">{workspaceInitial}</span>
          </div>
          <span className="flex-1 truncate text-left text-xs text-white/60">{workspaceName}</span>
          <ChevronsUpDown size={11} className="text-white/20" />
        </button>
      </div>

      <div className="mx-4 my-2 border-b border-white/8" />

      <nav className="flex-1 overflow-y-auto px-2 pt-2">
        <p className="mb-1.5 px-2 text-[9px] font-medium tracking-widest text-white/20">WORKSPACE</p>
        <div className="flex flex-col gap-0.5">
          {workspaceNav.map((item) => (
            <NavLink
              key={item.href}
              pathname={pathname}
              badgeCount={item.badge ? opportunities.length : undefined}
              {...item}
            />
          ))}
        </div>

        <p className="mb-1.5 mt-5 px-2 text-[9px] font-medium tracking-widest text-white/20">ACCOUNT</p>
        <div className="flex flex-col gap-0.5">
          {accountNav.map((item) => (
            <NavLink key={item.href} pathname={pathname} {...item} />
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t border-white/8 p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
            <span className="text-[10px] font-medium text-white/50">{initial}</span>
          </div>
          <span className="flex-1 truncate text-xs text-white/50">{firstName}</span>
          <button
            type="button"
            onClick={handleSignOut}
            className="cursor-pointer text-white/20 transition-colors hover:text-white/40"
            aria-label="Sign out"
          >
            <LogOut size={12} />
          </button>
        </div>
      </div>
    </aside>
  )
}
