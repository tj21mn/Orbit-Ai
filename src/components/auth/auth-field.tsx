'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface AuthFieldProps {
  id: string
  label: string
  type?: string
  name: string
  placeholder?: string
  error?: string
  autoComplete?: string
  value?: string
  onChange?: (value: string) => void
  required?: boolean
}

export default function AuthField({
  id,
  label,
  type = 'text',
  name,
  placeholder,
  error,
  autoComplete,
  value,
  onChange,
  required = false,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-[#0A0A0A] text-sm">
        {label}
        {required && <span className="text-[#6B6B6B]">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          required={required}
          className={`w-full bg-white border text-[#0A0A0A] rounded-xl h-11 px-4 text-sm placeholder:text-[#B3B3B3] transition-colors focus:outline-none focus:border-[#0A0A0A] ${
            error ? 'border-[#0A0A0A]' : 'border-black/8 hover:border-black/15'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-[#6B6B6B] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-[#6B6B6B] text-xs">{error}</p>}
    </div>
  )
}
