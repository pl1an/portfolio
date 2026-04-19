import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Footer } from './components/Footer'
import { GameOfLifeBackground } from './components/GameOfLifeBackground'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import {
  experiences,
  navItems,
  profile,
  projects,
  skills,
  specialties,
} from './data/portfolioData'

const SECTION_ORDER = ['#home', '#about', '#experience', '#projects'] as const
const TRANSITION_LOCK_MS = 860

function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const isTransitioningRef = useRef(false)
  const wheelAccumulatorRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const focusNavItems = navItems.filter((item) => item.href !== '#contact')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousOverscrollY = document.body.style.overscrollBehaviorY

    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehaviorY = 'none'

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.overscrollBehaviorY = previousOverscrollY
    }
  }, [])

  const navigateToSection = useCallback((nextIndex: number) => {
    const boundedIndex = Math.min(Math.max(nextIndex, 0), SECTION_ORDER.length - 1)

    if (boundedIndex === activeSectionIndex || isTransitioningRef.current) {
      return
    }

    isTransitioningRef.current = true
    setDirection(boundedIndex > activeSectionIndex ? 1 : -1)
    setActiveSectionIndex(boundedIndex)

    window.setTimeout(() => {
      isTransitioningRef.current = false
    }, TRANSITION_LOCK_MS)
  }, [activeSectionIndex])

  const handleNavigateByHref = useCallback((href: string) => {
    if (href === '#contact') {
      return
    }

    const normalizedHref = href === '#skills' ? '#about' : href

    const index = SECTION_ORDER.indexOf(normalizedHref as (typeof SECTION_ORDER)[number])
    if (index !== -1) {
      navigateToSection(index)
    }
  }, [navigateToSection])

  const handleWheel: React.WheelEventHandler<HTMLElement> = (event) => {
    event.preventDefault()

    if (isTransitioningRef.current) {
      return
    }

    wheelAccumulatorRef.current += event.deltaY

    if (wheelAccumulatorRef.current > 42) {
      wheelAccumulatorRef.current = 0
      navigateToSection(activeSectionIndex + 1)
    } else if (wheelAccumulatorRef.current < -42) {
      wheelAccumulatorRef.current = 0
      navigateToSection(activeSectionIndex - 1)
    }
  }

  const handleTouchStart: React.TouchEventHandler<HTMLElement> = (event) => {
    touchStartYRef.current = event.touches[0]?.clientY ?? null
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLElement> = (event) => {
    if (isTransitioningRef.current || touchStartYRef.current == null) {
      return
    }

    const touchEndY = event.changedTouches[0]?.clientY
    if (typeof touchEndY !== 'number') {
      return
    }

    const deltaY = touchStartYRef.current - touchEndY
    touchStartYRef.current = null

    if (Math.abs(deltaY) < 45) {
      return
    }

    if (deltaY > 0) {
      navigateToSection(activeSectionIndex + 1)
    } else {
      navigateToSection(activeSectionIndex - 1)
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTransitioningRef.current) {
        return
      }

      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        navigateToSection(activeSectionIndex + 1)
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        navigateToSection(activeSectionIndex - 1)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeSectionIndex, navigateToSection])

  const currentSection = [
    {
      id: 'home',
      content: (
        <HeroSection
          name={profile.name}
          bio={profile.bio}
          github={profile.github}
          specialties={specialties}
          onViewProjects={() => handleNavigateByHref('#projects')}
        />
      ),
    },
    {
      id: 'about',
      content: (
        <div className="hide-scrollbar h-full overflow-y-auto pr-1">
          <div className="flex flex-col gap-6">
            <AboutSection about={profile.about} sectionClassName="pt-0" />
            <SkillsSection skills={skills} sectionClassName="pt-0" />
          </div>
        </div>
      ),
    },
    {
      id: 'experience',
      content: <ExperienceSection experiences={experiences} />,
    },
    {
      id: 'projects',
      content: <ProjectsSection projects={projects} />,
    },
  ][activeSectionIndex]

  return (
    <div className="relative isolate h-[100svh] overflow-hidden">
      <GameOfLifeBackground />

      <div className="relative z-10 h-full">
        <Header
          navItems={focusNavItems}
          name={profile.name}
          activeHref={SECTION_ORDER[activeSectionIndex]}
          activeAliasHrefs={SECTION_ORDER[activeSectionIndex] === '#about' ? ['#skills'] : undefined}
          onNavigate={handleNavigateByHref}
        />

        <main
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="mx-auto h-full w-full max-w-6xl overflow-hidden px-4 pb-28 pt-32 sm:px-6 lg:px-8"
        >
          <div className="relative h-full w-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={currentSection.id}
                custom={direction}
                variants={{
                  enter: (currentDirection: 1 | -1) => ({
                    x: currentDirection > 0 ? '115%' : '-115%',
                  }),
                  center: {
                    x: 0,
                  },
                  exit: (currentDirection: 1 | -1) => ({
                    x: currentDirection > 0 ? '-115%' : '115%',
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.82,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 h-full w-full will-change-transform"
              >
                {currentSection.content}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <div className="fixed inset-x-0 bottom-4 z-20 px-4 sm:px-6 lg:px-8">
          <Footer github={profile.github} linkedin={profile.linkedin} docked />
        </div>
      </div>
    </div>
  )
}

export default App
