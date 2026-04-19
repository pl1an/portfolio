import { motion } from 'framer-motion'
import type { NavItem } from '../data/portfolioData'

type HeaderProps = {
  navItems: NavItem[]
  name: string
}

export function Header({ navItems, name }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-4 z-30 px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="glass-card-strong mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <a
          href="#home"
          className="mono-label text-[0.67rem] font-semibold uppercase tracking-[0.24em] text-teal-200/90"
        >
          {name}
        </a>

        <nav aria-label="Main navigation" className="overflow-x-auto">
          <ul className="flex min-w-max items-center gap-1.5 text-sm text-slate-300 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  )
}
