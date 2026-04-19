export type NavItem = {
  label: string
  href: string
}

export type ExperienceItem = {
  organization: string
  role: string
  period: string
  highlights: string[]
}

type BaseProjectItem = {
  title: string
  description: string
  outcome: string
  stack: string[]
}

type PublicProjectItem = BaseProjectItem & {
  visibility: 'public'
  repositoryUrl: string
}

type PrivateProjectItem = BaseProjectItem & {
  visibility: 'private'
  repositoryUrl?: undefined
}

export type ProjectItem = PublicProjectItem | PrivateProjectItem

export type SkillItem = {
  key:
    | 'python'
    | 'javascript-typescript'
    | 'react'
    | 'nodejs'
    | 'c-cpp'
    | 'docker'
    | 'git'
  label: string
}

export const profile = {
  name: 'Ian Paleta Starling',
  bio: 'Computer Science undergraduate at UFMG. Researcher focused on Reinforcement Learning, Complex Systems, and Cybersecurity.',
  about:
    'I work at the intersection of Applied AI and Theoretical Computer Science, combining research and engineering to build robust, readable, impact-driven digital products.',
  github: 'https://github.com/pl1an',
  email: 'paletaian56@gmail.com',
}

export const specialties = [
  'Reinforcement Learning',
  'Complex Systems',
  'Cybersecurity',
]

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const experiences: ExperienceItem[] = [
  {
    organization: 'iJunior',
    role: 'Front-End Developer',
    period: '04/2024 - 07/2025',
    highlights: [
      'Built responsive interfaces focused on performance and visual clarity.',
      'Integrated APIs for real-time data flows and a consistent user experience.',
      'Led trainees technically through code reviews and architecture best practices.',
    ],
  },
  {
    organization: 'UFMG',
    role: 'Programming Teaching Assistant',
    period: '07/2025 - 12/2025',
    highlights: [
      'Supported students in Python and core logic fundamentals in introductory classes.',
      'Mentored students in developing algorithmic reasoning and problem-solving skills.',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'World3',
    description:
      'A 2D combat simulator in Godot designed to study emergent behavior and adaptive strategies.',
    outcome:
      'Reinforcement Learning experiments to evaluate decision dynamics in complex systems.',
    stack: ['Godot', 'RL', '2D Simulation'],
    visibility: 'private',
  },
  {
    title: 'PCremote',
    description:
      'A React Native app with a Python backend for remote control and data exchange.',
    outcome:
      'Encrypted socket communication for secure operations between devices.',
    stack: ['React Native', 'Python', 'Sockets'],
    visibility: 'public',
    repositoryUrl: 'https://github.com/pl1an/PCremote',
  },
  {
    title: 'Remunera',
    description:
      'A financial dashboard focused on decision-making with business metrics and visual analytics.',
    outcome:
      'Automated forecasting using AI models for revenue and cost scenarios.',
    stack: ['React', 'Node.js', 'AI Models'],
    visibility: 'private',
  },
  {
    title: 'eventOS',
    description:
      'A scheduling app focused on usability, accessibility, and daily productivity.',
    outcome:
      'Gesture-driven interactions and a smooth navigation flow for high-quality mobile experiences.',
    stack: ['React Native', 'Advanced UX', 'Gestures'],
    visibility: 'public',
    repositoryUrl: 'https://github.com/pl1an/eventOS-revamped',
  },
  {
    title: 'Hemlock Nox',
    description:
      'Action roguelike game built during Coco Code Game Jam #1.',
    outcome:
      'Designed combat loops and progression systems for a complete jam-ready release.',
    stack: ['Godot', 'GDScript', 'Roguelike'],
    visibility: 'public',
    repositoryUrl: 'https://github.com/pl1an/hemlock_nox',
  },
  {
    title: 'I Just Need to Get to Work',
    description:
      'Puzzle game created for Brackeys Game Jam 2025.1.',
    outcome:
      'Implemented level mechanics and gameplay polish for a compact puzzle experience.',
    stack: ['Godot', 'GDScript', 'Puzzle Game'],
    visibility: 'public',
    repositoryUrl: 'https://github.com/pl1an/i_just_need_to_get_to_work',
  },
]

export const skills: SkillItem[] = [
  { key: 'python', label: 'Python' },
  { key: 'javascript-typescript', label: 'JavaScript / TypeScript' },
  { key: 'react', label: 'React' },
  { key: 'nodejs', label: 'Node.js' },
  { key: 'c-cpp', label: 'C / C++' },
  { key: 'docker', label: 'Docker' },
  { key: 'git', label: 'Git' },
]
