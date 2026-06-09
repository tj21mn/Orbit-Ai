import Link from 'next/link'
import OrbitLogo from '@/components/ui/orbit-logo'

const columns = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Integrations'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security'],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <OrbitLogo href="/" size="sm" variant="light" />
            <p className="text-white/40 text-xs mt-4 leading-relaxed max-w-[200px]">
              Your roadmap, ranked by revenue — not noise.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-white/50 text-xs font-medium mb-4">{col.title}</p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={
                        link === 'Features'
                          ? '#features'
                          : link === 'Pricing'
                            ? '/#pricing'
                            : link === 'Changelog'
                              ? '#changelog'
                              : '#'
                      }
                      className="text-white/30 text-xs hover:text-white/60 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8 border-t border-white/8">
          <p className="text-white/25 text-xs">© 2026 ORBIT. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
            <span className="text-white/30 text-xs">All systems normal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
