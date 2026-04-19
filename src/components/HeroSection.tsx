import { motion } from 'framer-motion'
import { ArrowRight, Link2 } from 'lucide-react'

type HeroSectionProps = {
  name: string
  bio: string
  github: string
  specialties: string[]
  onViewProjects: () => void
}

const easeCurve = [0.22, 1, 0.36, 1] as const

export function HeroSection({ name, bio, github, specialties, onViewProjects }: HeroSectionProps) {
  return (
    <motion.section
      id="home"
      initial={{ y: 30 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: easeCurve }}
      className="relative flex min-h-[86svh] flex-col justify-center"
    >
      <div className="glass-card-strong relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 top-8 h-44 w-44 rounded-full bg-emerald-400/16 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: easeCurve }}
          className="mono-label text-xs uppercase tracking-[0.25em] text-emerald-300/85"
        >
          ML Researcher · FullStack Engineer · Game Developer 
        </motion.p>

        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: easeCurve }}
          className="mt-4 text-4xl font-extrabold leading-tight text-zinc-100 sm:text-6xl"
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.28, ease: easeCurve }}
          className="mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg"
        >
          {bio}
        </motion.p>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.36, ease: easeCurve }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {specialties.map((specialty) => (
            <span
              key={specialty}
              className="mono-label rounded-full border border-emerald-300/30 bg-emerald-300/12 px-3 py-1.5 text-xs uppercase tracking-wide text-emerald-100"
            >
              {specialty}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, delay: 0.44, ease: easeCurve }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={onViewProjects}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-emerald-300"
          >
            View projects
            <ArrowRight size={16} />
          </button>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200/30 px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
          >
            GitHub
            <Link2 size={16} />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
