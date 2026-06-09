'use client'

import { Loader2, Mail } from 'lucide-react'
import AuthButton from './auth-button'
import AuthError from './auth-error'
import AuthOtpInput from './auth-otp-input'

interface AuthVerifyStepProps {
  email: string
  code: string
  onCodeChange: (code: string) => void
  onVerify: () => void
  onResend: () => void
  loading: boolean
  error: string
}

export default function AuthVerifyStep({
  email,
  code,
  onCodeChange,
  onVerify,
  onResend,
  loading,
  error,
}: AuthVerifyStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 rounded-xl bg-[#F9F9F9] border border-black/8">
        <div className="w-10 h-10 rounded-xl bg-white border border-black/8 flex items-center justify-center flex-shrink-0">
          <Mail size={18} className="text-[#6B6B6B]" />
        </div>
        <div>
          <p className="text-[#0A0A0A] text-sm font-medium mb-0.5">Check your email</p>
          <p className="text-[#6B6B6B] text-sm leading-relaxed">
            We sent a 6-digit code to{' '}
            <span className="text-[#0A0A0A]">{email}</span>
          </p>
        </div>
      </div>

      <div>
        <label className="text-[#0A0A0A] text-sm mb-3 block">Verification code</label>
        <AuthOtpInput value={code} onChange={onCodeChange} />
      </div>

      {error && <AuthError message={error} />}

      <AuthButton type="button" disabled={loading || code.length < 6} onClick={onVerify}>
        {loading ? <Loader2 className="size-4 animate-spin" /> : 'Verify email'}
      </AuthButton>

      <AuthButton type="button" variant="ghost" disabled={loading} onClick={onResend}>
        Didn&apos;t receive it? Resend code
      </AuthButton>
    </div>
  )
}
