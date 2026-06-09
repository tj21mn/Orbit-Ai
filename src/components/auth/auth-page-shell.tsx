import Link from 'next/link'
import OrbitLogo from '@/components/ui/orbit-logo'
import AuthPreviewPanel from './auth-preview-panel'

interface AuthPageShellProps {
  children: React.ReactNode
  title: string
  subtitle: string
  mode: 'signin' | 'signup'
  alternate: { label: string; href: string; linkText: string }
  terms?: boolean
}

export default function AuthPageShell({
  children,
  title,
  subtitle,
  mode,
  alternate,
  terms = false,
}: AuthPageShellProps) {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[1080px] bg-white rounded-xl border border-black/8 overflow-hidden flex min-h-[min(680px,100vh-3rem)]">
        <div className="flex-1 flex flex-col px-8 sm:px-12 py-10 lg:py-12">
          <div className="mb-10">
            <OrbitLogo href="/" size="sm" />
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-[400px] mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-[#0A0A0A] text-[28px] font-medium tracking-[-0.02em] leading-tight">
                {title}
              </h1>
              <p className="text-[#6B6B6B] text-sm mt-2">{subtitle}</p>
            </div>

            {children}

            <p className="mt-8 text-center text-[#6B6B6B] text-sm">
              {alternate.label}{' '}
              <Link
                href={alternate.href}
                className="text-[#0A0A0A] font-medium underline underline-offset-4 decoration-[#B3B3B3] hover:opacity-80 transition-opacity"
              >
                {alternate.linkText}
              </Link>
            </p>

            {terms && (
              <p className="mt-4 text-center text-[#B3B3B3] text-xs leading-relaxed">
                By creating an account, you agree to our{' '}
                <Link href="#" className="text-[#6B6B6B] underline underline-offset-2 hover:opacity-80 transition-opacity">
                  terms of use
                </Link>
                .
              </p>
            )}
          </div>
        </div>

        <div className="hidden lg:flex flex-1 bg-[#F3F3F3] border-l border-black/8 items-center justify-center p-10">
          <AuthPreviewPanel mode={mode} />
        </div>
      </div>
    </div>
  )
}
