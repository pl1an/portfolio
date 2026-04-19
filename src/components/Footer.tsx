import { motion } from 'framer-motion'
import { Link2, Mail } from 'lucide-react'

type FooterProps = {
  github: string
  email: string
}

export function Footer({ github, email }: FooterProps) {
  return (
    <motion.footer
      id="contact"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="pb-14 pt-12"
    >
      <div className="glass-card mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-6 text-slate-300 sm:flex-row sm:px-8">
        <p className="mono-label text-[0.68rem] uppercase tracking-[0.22em] text-slate-400">
          Ian Paleta Starling · {new Date().getFullYear()}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/20 px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            <Link2 size={16} /> GitHub
          </a>

          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/20 px-4 py-2 transition hover:bg-white/10 hover:text-white"
          >
            <Mail size={16} /> {email}
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
