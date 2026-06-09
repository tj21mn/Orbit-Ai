'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import AuthError from '@/components/auth/auth-error'
import AuthField from '@/components/auth/auth-field'

interface WaitlistFormProps {
  onSuccess: () => void
}

export default function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      onSuccess()
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const isDisabled = loading || !email

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AuthField
        id="waitlist-email"
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
        required
      />

      {error && <AuthError message={error} />}

      <button
        type="submit"
        disabled={isDisabled}
        className="cta-shine-btn relative flex h-11 w-full items-center justify-center gap-2 rounded-full border border-black/8 bg-[#0A0A0A] text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:hover:opacity-100"
      >
        <span className={isDisabled ? 'text-white/40' : 'text-white'}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : 'Get Early Access'}
        </span>
      </button>
    </form>
  )
}
