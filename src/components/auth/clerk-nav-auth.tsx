'use client'

import Link from 'next/link'
import { Show, UserButton } from '@clerk/nextjs'
import WaitlistButton from '@/components/ui/waitlist-button'

interface ClerkNavAuthProps {
  scrolled: boolean
}

export default function ClerkNavAuth({ scrolled }: ClerkNavAuthProps) {
  const signInClass = scrolled
    ? 'text-[11px] hidden sm:inline text-[#706F70] hover:text-[#080808] transition-colors'
    : 'text-xs text-white/60 hover:text-white transition-colors'

  const dashboardClass = scrolled
    ? 'text-[11px] hidden sm:inline text-[#706F70] hover:text-[#080808] transition-colors'
    : 'text-xs text-white/60 hover:text-white transition-colors'

  return (
    <>
      <Show when="signed-out">
        <Link href="/sign-in" className={signInClass}>
          Sign in
        </Link>
        <WaitlistButton size="sm" variant={scrolled ? 'dark' : 'primary'} />
      </Show>

      <Show when="signed-in">
        <Link href="/app" className={dashboardClass}>
          Dashboard
        </Link>
        <UserButton
          appearance={{
            elements: {
              avatarBox: scrolled ? 'h-7 w-7' : 'h-8 w-8',
            },
          }}
        />
      </Show>
    </>
  )
}
