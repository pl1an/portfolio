import { motion } from 'framer-motion'
import type { NavItem } from '../data/portfolioData'

type HeaderProps = {
  navItems: NavItem[]
  name: string
  activeHref: string
  activeAliasHrefs?: string[]
  onNavigate: (href: string) => void
}

export function Header({ navItems, name, activeHref, activeAliasHrefs, onNavigate }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-4 z-30 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="glass-card-strong mx-auto flex w-full max-w-6xl items-center justify-between gap-5 px-5 py-4 sm:px-7"
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('#home')
          }}
          className="mono-label text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-teal-200/90"
        >
          {name}
        </a>

        <nav aria-label="Main navigation" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-2 text-[0.95rem] text-slate-300 sm:gap-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                {(() => {
                  const isActive = activeHref === item.href || activeAliasHrefs?.includes(item.href)

                  return (
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault()
                    onNavigate(item.href)
                  }}
                  className={`rounded-full px-3.5 py-2 transition hover:bg-white/10 hover:text-white ${
                    isActive ? 'bg-white/12 text-white' : ''
                  }`}
                >
                  {item.label}
                </a>
                  )
                })()}
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  )
}
