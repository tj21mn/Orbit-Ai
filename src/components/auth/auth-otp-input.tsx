'use client'

import { useRef } from 'react'

interface AuthOtpInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

export default function AuthOtpInput({ value, onChange, error }: AuthOtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const digits = value.padEnd(6, ' ').split('').slice(0, 6)

  const updateDigit = (index: number, char: string) => {
    const cleaned = char.replace(/\D/g, '').slice(-1)
    const next = value.split('')
    next[index] = cleaned
    const joined = next.join('').slice(0, 6)
    onChange(joined)

    if (cleaned && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted)
    const focusIndex = Math.min(pasted.length, 5)
    inputsRef.current[focusIndex]?.focus()
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 justify-between">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit.trim()}
            onChange={(e) => updateDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
          className={`w-full aspect-square max-w-[52px] text-center text-lg font-medium bg-white border border-black/8 rounded-xl transition-colors focus:outline-none focus:border-[#0A0A0A] ${
            error ? 'border-[#0A0A0A]' : 'hover:border-black/15'
            }`}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
      {error && <p className="text-[#706F70] text-xs text-center">{error}</p>}
    </div>
  )
}
