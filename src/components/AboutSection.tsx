import { motion } from 'framer-motion'
import { BrainCircuit, GraduationCap } from 'lucide-react'

type AboutSectionProps = {
  about: string
  sectionClassName?: string
}

export function AboutSection({ about, sectionClassName = '' }: AboutSectionProps) {
  return (
    <motion.section
      id="about"
      initial={{ y: 32 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`h-full min-h-0 ${sectionClassName}`.trim()}
    >
      <div data-section-scrollable="true" className="glass-card hide-scrollbar max-h-full overflow-y-auto px-6 py-8 sm:px-10">
        <p className="mono-label text-xs uppercase tracking-[0.22em] text-emerald-300/85">About</p>
        <h2 className="mt-3 text-2xl font-bold text-zinc-100 sm:text-3xl">Education and technical focus</h2>

        <div className="mt-4 pr-1">
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-zinc-300 sm:text-base">{about}</p>

        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          I am especially interested in how complex emergent behaviors can arise from simple rules, particularly in
          reinforcement learning, dynamic simulations, and multi-agent systems. How to apply these emergent behaviours in both 
          real-world products, digital simulations and games? How can the capacity of learning make a difference in the user experience?
        </p>

        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            ML is a beautiful blend of theory and practice, and being able to see models dinamically evolve is incredibly rewarding.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-200/16 bg-zinc-900/55 p-4">
            <div className="inline-flex items-center gap-2 text-emerald-100">
              <GraduationCap size={18} />
              <span className="mono-label text-xs uppercase tracking-wide text-emerald-100/90">Education</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              Computer Science undergraduate at UFMG with a strong foundation in algorithms,
              modeling, and software engineering.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/16 bg-zinc-900/55 p-4">
            <div className="inline-flex items-center gap-2 text-emerald-100">
              <BrainCircuit size={18} />
              <span className="mono-label text-xs uppercase tracking-wide text-emerald-100/90">Research focus</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              Focused on NLP, foundation models, and applied machine learning, with strong
              experience in data analysis and exploratory workflows for decision support.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/16 bg-zinc-900/55 p-4">
            <div className="inline-flex items-center gap-2 text-emerald-100">
              <BrainCircuit size={18} />
              <span className="mono-label text-xs uppercase tracking-wide text-emerald-100/90">Engineering domains</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              Full-stack web development, cybersecurity-oriented systems,
              connecting technical depth with product-oriented execution.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200/16 bg-zinc-900/55 p-4">
            <div className="inline-flex items-center gap-2 text-emerald-100">
              <GraduationCap size={18} />
              <span className="mono-label text-xs uppercase tracking-wide text-emerald-100/90">Collaboration and delivery</span>
            </div>
            <p className="mt-2 text-sm text-zinc-300">
              I enjoy working in teams, collaborating across disciplines, and presenting products
              clearly to technical and non-technical stakeholders.
            </p>
          </div>
        </div>
        </div>
      </div>
    </motion.section>
  )
}
