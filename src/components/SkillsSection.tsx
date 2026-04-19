import { motion } from 'framer-motion'
import {
  Atom,
  Binary,
  BrainCircuit,
  Braces,
  Container,
  FolderGit2,
  Rocket,
  Server,
  TerminalSquare,
  type LucideIcon,
} from 'lucide-react'
import type { SkillItem } from '../data/portfolioData'

type SkillsSectionProps = {
  skills: SkillItem[]
  sectionClassName?: string
}

const toolSkillKeys = new Set<SkillItem['key']>([
  'docker',
  'git',
  'postman',
  'vercel',
  'wireshark',
  'latex',
  'figma',
])

const technicalAbilities = [
  {
    title: 'Model training and experimentation',
    description:
      'Design, train, and evaluate machine learning models with a practical research approach focused on measurable impact.',
  },
  {
    title: 'Full-stack product development',
    description:
      'Build end-to-end applications across frontend, backend, and deployment pipelines with maintainable architecture.',
  },
  {
    title: 'Data analysis and exploration',
    description:
      'Work with exploratory analysis, feature understanding, and data-driven insights to support better technical and business decisions.',
  },
  {
    title: 'Game design and simulations',
    description:
      'Create engaging game experiences and simulate complex scenarios for research and development purposes.',
  },
]

const iconMap: Record<SkillItem['key'], LucideIcon> = {
  python: TerminalSquare,
  'javascript-typescript': Braces,
  react: Atom,
  nodejs: Server,
  'c-cpp': Binary,
  docker: Container,
  git: FolderGit2,
  postman: Server,
  vercel: Rocket,
  wireshark: BrainCircuit,
  latex: TerminalSquare,
  figma: Atom,
}

export function SkillsSection({ skills, sectionClassName = 'pt-14' }: SkillsSectionProps) {
  const developmentStack = skills.filter((skill) => !toolSkillKeys.has(skill.key))
  const tools = skills.filter((skill) => toolSkillKeys.has(skill.key))

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
        <p className="mono-label text-xs uppercase tracking-[0.22em] text-emerald-300/85">Skills</p>
        <h2 className="mt-3 text-2xl font-bold text-zinc-100 sm:text-3xl">Development stack, tools, and technical abilities</h2>

        <div className="mt-7">
          <h3 className="mono-label text-xs uppercase tracking-[0.2em] text-zinc-300">Development stack</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {developmentStack.map((skill, index) => {
              const Icon = iconMap[skill.key]

              return (
                <motion.div
                  key={skill.key}
                  initial={{ scale: 0.94 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.34, delay: index * 0.05, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-zinc-200/18 bg-zinc-900/52 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/25 bg-emerald-100/8 text-emerald-100">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium text-zinc-100">{skill.label}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mono-label text-xs uppercase tracking-[0.2em] text-zinc-300">Tools</h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((skill, index) => {
              const Icon = iconMap[skill.key]

              return (
                <motion.div
                  key={skill.key}
                  initial={{ scale: 0.94 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.34, delay: index * 0.05, ease: 'easeOut' }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-zinc-200/18 bg-zinc-900/52 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/25 bg-emerald-100/8 text-emerald-100">
                      <Icon size={20} />
                    </span>
                    <span className="text-sm font-medium text-zinc-100">{skill.label}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mono-label text-xs uppercase tracking-[0.2em] text-zinc-300">Technical abilities</h3>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            {technicalAbilities.map((ability, index) => (
              <motion.article
                key={ability.title}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                className="rounded-xl border border-zinc-200/18 bg-zinc-900/52 p-4"
              >
                <h4 className="text-sm font-semibold text-zinc-100">{ability.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">{ability.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
