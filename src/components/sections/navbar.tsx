'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ClerkNavAuth from '@/components/auth/clerk-nav-auth'
import OrbitLogo from '@/components/ui/orbit-logo'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Changelog', href: '#changelog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-[padding] duration-500 ease-out ${
        scrolled ? 'pt-3 px-4' : 'pt-0 px-0'
      }`}
    >
      <nav
        className={`flex items-center justify-between transition-all duration-500 ease-out ${
          scrolled
            ? 'w-full max-w-3xl h-11 px-4 rounded-full border border-[#D4D8DF] bg-white/95'
            : 'w-full max-w-7xl h-14 px-8 border-b border-white/10 bg-[#0A0A0A]/50 rounded-none'
        }`}
        style={{ backdropFilter: 'blur(14px)' }}
      >
        <div
          className={`transition-transform duration-500 ease-out ${
            scrolled ? 'scale-[0.88] origin-left' : 'scale-100'
          }`}
        >
          <OrbitLogo href="/" size={scrolled ? 'xs' : 'sm'} variant={scrolled ? 'dark' : 'light'} />
        </div>

        <div
          className={`hidden md:flex items-center transition-all duration-500 ease-out ${
            scrolled
              ? 'gap-5'
              : 'gap-0.5 bg-white/10 rounded-full px-1.5 py-1 border border-white/10'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors ${
                scrolled
                  ? 'text-[11px] uppercase tracking-wide text-[#706F70] hover:text-[#080808]'
                  : 'text-xs px-3.5 py-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div
            className={`hidden lg:flex items-center gap-1.5 rounded-full px-3 py-1 transition-opacity duration-500 ${
              scrolled
                ? 'opacity-0 w-0 overflow-hidden pointer-events-none'
                : 'opacity-100 bg-white/10 border border-white/10'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] flex-shrink-0" />
            <span className="text-white/50 text-[11px] whitespace-nowrap">All systems normal</span>
          </div>

          <ClerkNavAuth scrolled={scrolled} />
        </div>
      </nav>
    </header>
  )
}
