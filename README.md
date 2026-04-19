# Portfolio - Ian Paleta Starling

Personal portfolio built with React + TypeScript to present experience, skills, projects, and research focus in applied AI.

## Live Demo

Access the published version at:

https://portfolio-c6t4evxid-pl1ans-projects.vercel.app/

## Overview

This portfolio was built as a single-page interface with full-screen section transitions. The goal is to combine a strong visual identity with smooth navigation across desktop and mobile.

Site sections:

- Home
- About
- Skills
- Experience
- Projects
- Contact

## Features

- Section-based navigation with Framer Motion animations
- Section transitions through scroll, keyboard, and touch gestures
- Interactive background with a Conway's Game of Life canvas simulation
- Project cards with emphasis on public repositories
- Automatic horizontal project carousel (pauses on interaction)
- Responsive layout for desktop and mobile

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 (via the official Vite plugin)
- Framer Motion
- Lucide React
- ESLint

## Main Structure

```text
src/
  components/
    AboutSection.tsx
    ExperienceSection.tsx
    Footer.tsx
    GameOfLifeBackground.tsx
    Header.tsx
    HeroSection.tsx
    ProjectsSection.tsx
    SkillsSection.tsx
  data/
    portfolioData.ts
  App.tsx
  index.css
```

## How to Run Locally

### 1. Prerequisites

- Node.js 20+
- npm

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build locally

```bash
npm run preview
```

## Available Scripts

- `npm run dev`: starts the development server
- `npm run build`: runs type-checking and production build
- `npm run preview`: serves a local preview of the build
- `npm run lint`: runs project linting

## How to Update Portfolio Content

The main portfolio data (profile, experience, skills, and projects) is centralized in:

`src/data/portfolioData.ts`

If you want to change text, links, or add new projects, this is the primary file to maintain.

## Contact

- GitHub: https://github.com/pl1an
- LinkedIn: https://linkedin.com/in/ian-paleta-starling-0a65b52b3

---

Project created for professional and technical presentation.
