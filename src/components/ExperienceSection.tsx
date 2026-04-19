import { motion } from 'framer-motion'
import { BriefcaseBusiness, Calendar } from 'lucide-react'
import type { ExperienceItem } from '../data/portfolioData'

type ExperienceSectionProps = {
  experiences: ExperienceItem[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <motion.section
      id="experience"
      initial={{ y: 30 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="pt-14"
    >
      <div className="glass-card px-6 py-8 sm:px-10">
        <div className="flex items-center gap-2 text-teal-100">
          <p className="mono-label text-xs uppercase tracking-[0.22em] text-teal-100/85">Experience</p>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-slate-100 sm:text-3xl">Professional journey</h2>

        <div className="mt-8 space-y-4">
          {experiences.map((item, index) => (
            <motion.article
              key={`${item.organization}-${item.period}`}
              initial={{ x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
              className="rounded-xl border border-slate-200/18 bg-slate-900/52 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{item.role}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.organization}</p>
                </div>
                <span className="mono-label inline-flex items-center gap-1 rounded-full border border-teal-200/24 bg-teal-100/8 px-2.5 py-1 text-[0.66rem] uppercase tracking-wide text-teal-100">
                  <Calendar size={14} />
                  {item.period}
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-200/80" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
