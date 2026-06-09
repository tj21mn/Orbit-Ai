'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AuthenticateWithRedirectCallback, useAuth } from '@clerk/nextjs'
import AuthPageShell from '@/components/auth/auth-page-shell'
import SignInForm from '@/components/auth/sign-in-form'

export default function SignInPage() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/app')
    }
  }, [isLoaded, isSignedIn, router])

  if (pathname.includes('sso-callback')) {
    return <AuthenticateWithRedirectCallback signInFallbackRedirectUrl="/app" signUpFallbackRedirectUrl="/app" />
  }

  if (!isLoaded || isSignedIn) {
    return null
  }

  return (
    <AuthPageShell
      mode="signin"
      title="Welcome back"
      subtitle="Sign in to your workspace."
      alternate={{
        label: 'New to ORBIT?',
        href: '/sign-up',
        linkText: 'Create account',
      }}
    >
      <SignInForm />
    </AuthPageShell>
  )
}
