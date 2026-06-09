'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { useSignIn } from '@clerk/nextjs/legacy'
import AuthButton from './auth-button'
import AuthDivider from './auth-divider'
import AuthError from './auth-error'
import AuthField from './auth-field'
import AuthSocialButtons from './auth-social-buttons'

export default function SignInForm() {
  const router = useRouter()
  const { setActive } = useClerk()
  const { isLoaded, signIn } = useSignIn()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleError = (err: unknown) => {
    const clerkErr = err as { errors?: { message: string; longMessage?: string }[] }
    setError(
      clerkErr.errors?.[0]?.longMessage ??
        clerkErr.errors?.[0]?.message ??
        'Invalid email or password.',
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !signIn) return
    setLoading(true)
    setError('')
    try {
      const result = await signIn.create({ identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId, redirectUrl: '/app' })
        router.replace('/app')
      }
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthSocialButtons mode="signin" onError={setError} />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="email"
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />

        <AuthField
          id="password"
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          required
        />

        {error && <AuthError message={error} />}

        <div className="pt-2">
          <AuthButton disabled={loading || !email || !password}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : 'Sign in'}
          </AuthButton>
        </div>
      </form>
    </>
  )
}
