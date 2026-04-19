import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

const SECTION_ORDER = ['#home', '#about', '#skills', '#experience', '#projects'] as const
const TRANSITION_LOCK_MS = 200
const MOBILE_BREAKPOINT_PX = 900
const DESKTOP_WHEEL_THRESHOLD = 42
const MOBILE_SWIPE_THRESHOLD = 56
const DESKTOP_TOUCH_THRESHOLD = 45
const OVERFLOW_EPSILON = 2

function App() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT_PX : false,
  )
  const [sectionHasOverflow, setSectionHasOverflow] = useState(false)
  const isTransitioningRef = useRef(false)
  const wheelAccumulatorRef = useRef(0)
  const touchStartPointRef = useRef<{ x: number; y: number } | null>(null)
  const sectionScrollRef = useRef<HTMLDivElement | null>(null)
  const focusNavItems = navItems.filter((item) => item.href !== '#contact')
  const activeSectionId = SECTION_ORDER[activeSectionIndex].slice(1)

  const getActiveScrollableElement = useCallback(() => {
    const container = sectionScrollRef.current
    if (!container || container.dataset.sectionId !== activeSectionId) {
      return null
    }

    const sectionScrollable = container.querySelector<HTMLElement>('[data-section-scrollable="true"]')
    return sectionScrollable ?? container
  }, [activeSectionId])

  const setSectionContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      return
    }

    if (node.dataset.sectionId === activeSectionId) {
      sectionScrollRef.current = node
    }
  }, [activeSectionId])

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

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`)

    const updateLayout = () => {
      setIsMobileLayout(mediaQuery.matches)
    }

    updateLayout()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateLayout)

      return () => {
        mediaQuery.removeEventListener('change', updateLayout)
      }
    }

    mediaQuery.addListener(updateLayout)

    return () => {
      mediaQuery.removeListener(updateLayout)
    }
  }, [])

  const updateSectionOverflow = useCallback(() => {
    const container = getActiveScrollableElement()

    if (!container) {
      setSectionHasOverflow(false)
      return
    }

    setSectionHasOverflow(container.scrollHeight - container.clientHeight > OVERFLOW_EPSILON)
  }, [getActiveScrollableElement])

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

    const index = SECTION_ORDER.indexOf(href as (typeof SECTION_ORDER)[number])
    if (index !== -1) {
      navigateToSection(index)
    }
  }, [navigateToSection])

  useEffect(() => {
    const container = getActiveScrollableElement()
    if (container) {
      container.scrollTop = 0
    }

    const frame = window.requestAnimationFrame(updateSectionOverflow)
    const lateFrame = window.setTimeout(updateSectionOverflow, 70)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(lateFrame)
    }
  }, [activeSectionIndex, getActiveScrollableElement, isMobileLayout, updateSectionOverflow])

  useEffect(() => {
    const container = getActiveScrollableElement()
    if (!container || typeof ResizeObserver === 'undefined') {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      updateSectionOverflow()
    })

    resizeObserver.observe(container)
    if (container.firstElementChild) {
      resizeObserver.observe(container.firstElementChild)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [activeSectionIndex, getActiveScrollableElement, updateSectionOverflow])

  useEffect(() => {
    wheelAccumulatorRef.current = 0
  }, [activeSectionIndex, sectionHasOverflow, isMobileLayout])

  const handleSectionWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    if (isMobileLayout || sectionHasOverflow) {
      return
    }

    event.preventDefault()

    if (isTransitioningRef.current) {
      return
    }

    wheelAccumulatorRef.current += event.deltaY

    if (wheelAccumulatorRef.current > DESKTOP_WHEEL_THRESHOLD) {
      wheelAccumulatorRef.current = 0
      navigateToSection(activeSectionIndex + 1)
    } else if (wheelAccumulatorRef.current < -DESKTOP_WHEEL_THRESHOLD) {
      wheelAccumulatorRef.current = 0
      navigateToSection(activeSectionIndex - 1)
    }
  }

  const hasHorizontalScrollableAncestor = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) {
      return false
    }

    let current: HTMLElement | null = target

    while (current && current !== sectionScrollRef.current) {
      const style = window.getComputedStyle(current)
      const supportsHorizontalScroll = style.overflowX === 'auto' || style.overflowX === 'scroll'
      const actuallyScrollable = current.scrollWidth - current.clientWidth > OVERFLOW_EPSILON

      if (supportsHorizontalScroll && actuallyScrollable) {
        return true
      }

      current = current.parentElement
    }

    return false
  }

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const firstTouch = event.touches[0]

    touchStartPointRef.current = firstTouch
      ? { x: firstTouch.clientX, y: firstTouch.clientY }
      : null
  }

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (isTransitioningRef.current || touchStartPointRef.current == null) {
      return
    }

    const touchEnd = event.changedTouches[0]
    if (!touchEnd) {
      return
    }

    const deltaX = touchStartPointRef.current.x - touchEnd.clientX
    const deltaY = touchStartPointRef.current.y - touchEnd.clientY
    touchStartPointRef.current = null

    if (isMobileLayout) {
      if (hasHorizontalScrollableAncestor(event.target)) {
        return
      }

      if (Math.abs(deltaX) < MOBILE_SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return
      }

      if (deltaX > 0) {
        navigateToSection(activeSectionIndex + 1)
      } else {
        navigateToSection(activeSectionIndex - 1)
      }

      return
    }

    if (sectionHasOverflow || Math.abs(deltaY) < DESKTOP_TOUCH_THRESHOLD || Math.abs(deltaY) <= Math.abs(deltaX)) {
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

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault()
        navigateToSection(activeSectionIndex + 1)
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'PageUp') {
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
          onViewAbout={() => handleNavigateByHref('#about')}
        />
      ),
    },
    {
      id: 'about',
      content: <AboutSection about={profile.about} />,
    },
    {
      id: 'skills',
      content: <SkillsSection skills={skills} />,
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
          onNavigate={handleNavigateByHref}
        />

        <main
          className={`mx-auto h-full w-full max-w-6xl overflow-hidden ${
            isMobileLayout ? 'px-3 pb-32 pt-24' : 'px-4 pb-28 pt-32 sm:px-6 lg:px-8'
          }`}
        >
          <div className="relative h-full w-full overflow-hidden">
            {sectionHasOverflow && (
              <div className={`pointer-events-none absolute z-30 flex gap-2 ${isMobileLayout ? 'bottom-20 right-1' : 'right-1 top-1'}`}>
                <button
                  type="button"
                  onClick={() => navigateToSection(activeSectionIndex - 1)}
                  disabled={activeSectionIndex === 0}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/35 bg-zinc-950/72 text-emerald-100 transition hover:bg-zinc-900/90 disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label="Previous section"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => navigateToSection(activeSectionIndex + 1)}
                  disabled={activeSectionIndex === SECTION_ORDER.length - 1}
                  className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300/35 bg-zinc-950/72 text-emerald-100 transition hover:bg-zinc-900/90 disabled:cursor-not-allowed disabled:opacity-45"
                  aria-label="Next section"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

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
                <div
                  ref={setSectionContainerRef}
                  data-section-id={activeSectionId}
                  onWheel={handleSectionWheel}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  className={`h-full overflow-hidden ${isMobileLayout ? 'pb-4 pr-0' : 'pb-3 pr-1'}`}
                >
                  {currentSection.content}
                </div>
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
