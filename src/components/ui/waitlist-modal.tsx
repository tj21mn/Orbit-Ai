'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import WaitlistForm from './waitlist-form'

interface WaitlistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [success, setSuccess] = useState(false)

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setSuccess(false)
    onOpenChange(nextOpen)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#0A0A0A]/40 z-50 transition-opacity" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[420px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl border border-black/8 p-6 focus:outline-none">
          <Dialog.Title className="text-[#0A0A0A] text-xl font-medium tracking-[-0.02em]">
            Get Early Access
          </Dialog.Title>
          <Dialog.Description className="text-[#6B6B6B] text-sm mt-2 mb-6">
            Be first to ship with AI-ranked roadmaps.
          </Dialog.Description>

          {success ? (
            <div className="py-4 text-center">
              <p className="text-[#0A0A0A] text-sm font-medium">You&apos;re on the list.</p>
              <p className="text-[#6B6B6B] text-sm mt-2">
                We&apos;ll reach out when ORBIT opens up.
              </p>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-6 text-[#6B6B6B] text-sm hover:text-[#0A0A0A] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <WaitlistForm onSuccess={() => setSuccess(true)} />
          )}

          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 text-[#B3B3B3] hover:text-[#6B6B6B] transition-colors text-xl leading-none"
            >
              ×
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
