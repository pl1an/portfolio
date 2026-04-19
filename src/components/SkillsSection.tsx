import { motion } from 'framer-motion'
import {
  Atom,
  Binary,
  Braces,
  Container,
  FolderGit2,
  Server,
  TerminalSquare,
  type LucideIcon,
} from 'lucide-react'
import type { SkillItem } from '../data/portfolioData'

type SkillsSectionProps = {
  skills: SkillItem[]
  sectionClassName?: string
}

const iconMap: Record<SkillItem['key'], LucideIcon> = {
  python: TerminalSquare,
  'javascript-typescript': Braces,
  react: Atom,
  nodejs: Server,
  'c-cpp': Binary,
  docker: Container,
  git: FolderGit2,
}

export function SkillsSection({ skills, sectionClassName = 'pt-14' }: SkillsSectionProps) {
  return (
    <motion.section
      id="skills"
      initial={{ y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={sectionClassName}
    >
      <div className="glass-card px-6 py-8 sm:px-10">
        <p className="mono-label text-xs uppercase tracking-[0.22em] text-teal-100/85">Skills</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-100 sm:text-3xl">Development stack</h2>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.key]

            return (
              <motion.div
                key={skill.key}
                initial={{ scale: 0.94 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.34, delay: index * 0.05, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-slate-200/18 bg-slate-900/52 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-teal-200/25 bg-teal-100/8 text-teal-100">
                    <Icon size={20} />
                  </span>
                  <span className="text-sm font-medium text-slate-100">{skill.label}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}
