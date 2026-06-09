'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import WaitlistModal from './waitlist-modal'

interface WaitlistButtonProps {
  size?: 'sm' | 'md'
  variant?: 'primary' | 'inverse' | 'dark'
  label?: string
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2.5 6h7M6.5 3L9.5 6l-3 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function WaitlistButton({
  size = 'md',
  variant = 'primary',
  label = 'Get Early Access',
}: WaitlistButtonProps) {
  const [open, setOpen] = useState(false)

  const sizeClasses =
    size === 'sm'
      ? 'text-[11px] h-7 px-3.5'
      : 'text-sm h-11 px-6'

  const variantClasses =
    variant === 'inverse'
      ? 'bg-[#F3F3F3] text-[#0A0A0A] border border-white/30 hover:bg-[#EBEDF1] hover:border-white/50'
      : variant === 'dark'
        ? 'bg-[#0A0A0A] text-white border border-black/8 hover:opacity-80'
        : 'bg-[#EBEDF1] text-[#0A0A0A] border border-white/30 hover:bg-[#D4D8DF] hover:border-white/50'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'cta-shine-btn group relative inline-flex items-center justify-center rounded-full font-medium transition-colors',
          sizeClasses,
          variantClasses,
        )}
      >
        <span
          className={cn(
            'relative z-10 inline-flex items-center',
            size === 'sm' ? 'gap-1.5' : 'gap-2',
          )}
        >
          <span
            className={cn(
              'rounded-full bg-[#28C840] flex-shrink-0 opacity-80 transition-opacity group-hover:opacity-100',
              size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
            )}
          />
          <span>{label}</span>
          <span className="opacity-80 transition-opacity group-hover:opacity-100">
            <ArrowIcon />
          </span>
        </span>
      </button>

      <WaitlistModal open={open} onOpenChange={setOpen} />
    </>
  )
}
