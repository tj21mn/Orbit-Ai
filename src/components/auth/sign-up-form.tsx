'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'
import { useSignUp } from '@clerk/nextjs/legacy'
import AuthButton from './auth-button'
import AuthDivider from './auth-divider'
import AuthError from './auth-error'
import AuthField from './auth-field'
import AuthSocialButtons from './auth-social-buttons'
import AuthVerifyStep from './auth-verify-step'

export default function SignUpForm() {
  const router = useRouter()
  const { setActive } = useClerk()
  const { isLoaded, signUp } = useSignUp()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'form' | 'verify'>('form')
  const [code, setCode] = useState('')

  const handleError = (err: unknown) => {
    const clerkErr = err as { errors?: { message: string; longMessage?: string }[] }
    setError(
      clerkErr.errors?.[0]?.longMessage ??
        clerkErr.errors?.[0]?.message ??
        'Something went wrong. Please try again.',
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded || !signUp) return
    setLoading(true)
    setError('')
    try {
      await signUp.create({ emailAddress: email, password, firstName: name })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setStep('verify')
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (verificationCode?: string) => {
    const activeCode = verificationCode ?? code
    if (!isLoaded || !signUp || activeCode.length < 6) return
    setLoading(true)
    setError('')
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: activeCode })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/app')
      }
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!isLoaded || !signUp) return
    setLoading(true)
    setError('')
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCodeChange = (nextCode: string) => {
    setCode(nextCode)
    if (nextCode.length === 6 && step === 'verify' && !loading) {
      void handleVerify(nextCode)
    }
  }

  if (step === 'verify') {
    return (
      <AuthVerifyStep
        email={email}
        code={code}
        onCodeChange={handleCodeChange}
        onVerify={handleVerify}
        onResend={handleResend}
        loading={loading}
        error={error}
      />
    )
  }

  return (
    <>
      <AuthSocialButtons mode="signup" onError={setError} />
      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="name"
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={setName}
          autoComplete="given-name"
          required
        />

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
          placeholder="Create a password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          required
        />

        {error && <AuthError message={error} />}

        <div className="pt-2">
          <AuthButton disabled={loading || !name || !email || password.length < 8}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : 'Sign up'}
          </AuthButton>
        </div>

        <div id="clerk-captcha" />
      </form>
    </>
  )
}
