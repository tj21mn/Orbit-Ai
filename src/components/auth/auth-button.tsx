'use client'

import { cn } from '@/lib/utils'

interface AuthButtonProps {
  children: React.ReactNode
  type?: 'submit' | 'button'
  disabled?: boolean
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
}

export default function AuthButton({
  children,
  type = 'submit',
  disabled,
  variant = 'primary',
  className = '',
  onClick,
}: AuthButtonProps) {
  if (variant === 'ghost') {
    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="w-full text-[#6B6B6B] text-sm hover:text-[#0A0A0A] transition-colors disabled:opacity-40 py-2"
      >
        {children}
      </button>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-full bg-[#0A0A0A] text-white rounded-full h-11 text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2',
        className,
      )}
    >
      {children}
    </button>
  )
}
