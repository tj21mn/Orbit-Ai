'use client'

import { usePathname } from 'next/navigation'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import AuthPageShell from '@/components/auth/auth-page-shell'
import SignUpForm from '@/components/auth/sign-up-form'

export default function SignUpPage() {
  const pathname = usePathname()

  if (pathname.includes('sso-callback')) {
    return <AuthenticateWithRedirectCallback />
  }

  return (
    <AuthPageShell
      mode="signup"
      title="Create a free account"
      subtitle="Your roadmap, written by AI."
      alternate={{
        label: 'Already have an account?',
        href: '/sign-in',
        linkText: 'Log in',
      }}
      terms
    >
      <SignUpForm />
    </AuthPageShell>
  )
}
