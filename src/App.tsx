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

function App() {
  return (
    <div className="relative isolate">
      <GameOfLifeBackground />

      <div className="relative z-10">
        <Header navItems={navItems} name={profile.name} />

        <main className="mx-auto w-full max-w-6xl px-4 pt-28 sm:px-6 lg:px-8">
          <HeroSection
            name={profile.name}
            bio={profile.bio}
            github={profile.github}
            specialties={specialties}
          />
          <AboutSection about={profile.about} />
          <ExperienceSection experiences={experiences} />
          <ProjectsSection projects={projects} />
          <SkillsSection skills={skills} />
        </main>

        <Footer github={profile.github} email={profile.email} />
      </div>
    </div>
  )
}

export default App
