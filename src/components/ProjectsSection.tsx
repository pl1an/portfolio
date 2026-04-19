import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import type { ProjectItem } from '../data/portfolioData'

type ProjectsSectionProps = {
  projects: ProjectItem[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="pt-14"
    >
      <div className="glass-card px-6 py-8 sm:px-10">
        <div className="flex items-center gap-2 text-teal-100">
          <Rocket size={18} />
          <p className="mono-label text-xs uppercase tracking-[0.22em] text-teal-100/85">Featured projects</p>
        </div>

        <h2 className="mt-3 text-2xl font-bold text-slate-100 sm:text-3xl">Products and applied research</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.46, delay: index * 0.06, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/20 bg-slate-900/58 p-5 backdrop-blur-md"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-teal-300/12 blur-2xl transition group-hover:bg-teal-200/20" />

              <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/95">{project.outcome}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((stackItem) => (
                  <span
                    key={stackItem}
                    className="mono-label rounded-full border border-teal-200/25 bg-teal-100/8 px-2.5 py-1 text-[0.64rem] uppercase tracking-[0.08em] text-teal-100"
                  >
                    {stackItem}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
