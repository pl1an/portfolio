import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link2, Rocket } from 'lucide-react'
import type { ProjectItem } from '../data/portfolioData'

type ProjectsSectionProps = {
  projects: ProjectItem[]
}

const AUTO_SCROLL_SPEED = 80
const MAX_DELTA_SECONDS = 0.05

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const isAutoScrollPausedRef = useRef(false)
  const renderedProjects = projects.length > 1 ? [...projects, ...projects] : projects

  const pauseAutoScroll = () => {
    isAutoScrollPausedRef.current = true
  }

  const resumeAutoScroll = () => {
    isAutoScrollPausedRef.current = false
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container || projects.length <= 1) {
      return
    }

    let frameId = 0
    let previousTime = performance.now()

    const animate = (time: number) => {
      const deltaSeconds = Math.min((time - previousTime) / 1000, MAX_DELTA_SECONDS)
      previousTime = time

    if (document.hidden) {
        previousTime = time
        frameId = requestAnimationFrame(animate)
        return
    }

    if (!isAutoScrollPausedRef.current) {
        const loopWidth = container.scrollWidth / 2

        if (loopWidth > 0) {
          container.scrollLeft += AUTO_SCROLL_SPEED * deltaSeconds

          if (container.scrollLeft >= loopWidth) {
            container.scrollLeft -= loopWidth
          }
        }
      }

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [projects.length])

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

        <div
          ref={scrollContainerRef}
          onPointerLeave={resumeAutoScroll}
          onPointerEnter={pauseAutoScroll}
          className="hide-scrollbar mt-8 overflow-x-auto pb-2 pt-3"
        >
          <div className="grid w-max min-w-full auto-cols-[minmax(280px,360px)] grid-flow-col grid-rows-2 gap-4 pr-1 overflow-visible">
            {renderedProjects.map((project, index) => (
              project.visibility === 'public' ? (
                <motion.a
                  key={`${project.title}-${index}`}
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${project.title} repository`}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.46, delay: index * 0.06, ease: 'easeOut' }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-visible rounded-2xl border border-slate-200/20 bg-slate-900/58 p-5 pb-14 backdrop-blur-md"
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

                  <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full border border-teal-200/30 bg-teal-200/10 p-2 text-teal-100/90">
                    <Link2 size={14} />
                  </span>
                </motion.a>
              ) : (
                <motion.article
                  key={`${project.title}-${index}`}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.46, delay: index * 0.06, ease: 'easeOut' }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/20 bg-slate-900/58 p-5 pb-14 backdrop-blur-md"
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

                  <span className="mono-label absolute bottom-4 right-4 text-[0.62rem] uppercase tracking-[0.16em] text-slate-300/70">
                    private
                  </span>
                </motion.article>
              )
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
