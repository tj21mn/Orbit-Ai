import Link from 'next/link'

interface OrbitLogoProps {
  href?: string
  size?: 'xs' | 'sm' | 'md'
  showText?: boolean
  variant?: 'dark' | 'light'
}

export default function OrbitLogo({ href, size = 'md', showText = true, variant = 'dark' }: OrbitLogoProps) {
  const box = size === 'xs' ? 'w-6 h-6' : size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'
  const icon = size === 'xs' ? 11 : size === 'sm' ? 13 : 14
  const isLight = variant === 'light'

  const content = (
    <div className="flex items-center gap-2.5">
      <div className={`${box} rounded-lg flex items-center justify-center flex-shrink-0 ${isLight ? 'bg-white' : 'bg-[#080808]'}`}>
        <svg width={icon} height={icon} viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="2.2" fill={isLight ? '#080808' : 'white'} />
          <circle cx="7" cy="7" r="5.2" stroke={isLight ? '#080808' : 'white'} strokeWidth="1" fill="none" opacity="0.35" />
        </svg>
      </div>
      {showText && (
        <span className={`font-medium tracking-[-0.01em] ${size === 'xs' ? 'text-xs' : 'text-sm'} ${isLight ? 'text-white' : 'text-[#080808]'}`}>Orbit</span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        {content}
      </Link>
    )
  }

  return content
}
