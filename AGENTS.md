# AGENTS.md — Portfolio Codebase Guide

This file documents build commands, code style, and conventions for agentic coding agents operating in this repository.

---

## Project Overview

- **Framework:** Next.js 15.3.2 (App Router)
- **Language:** JavaScript (no TypeScript — use `jsconfig.json`, not `tsconfig.json`)
- **Styling:** Tailwind CSS v3 with custom animation utilities
- **Icons:** `lucide-react`
- **Font:** Inter via `next/font/google`
- **Deployment target:** Vercel

---

## Build, Dev, and Lint Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Create a production build
npm run build

# Serve the production build
npm run start

# Run ESLint
npm run lint
```

**There is no test suite.** No testing framework (Jest, Vitest, Playwright, etc.) is configured. Do not add test-related scripts unless explicitly asked.

---

## Project Structure

```
src/
  app/
    api/
      contact/
        route.js      # POST /api/contact — server-side API Route Handler
    globals.css       # Tailwind directives + global styles
    layout.js         # Root layout (Server Component): fonts, metadata
    page.js           # Entire UI (Client Component): all sections, components, data
public/               # Static assets served at /
tailwind.config.js    # Custom animations and Tailwind plugin
jsconfig.json         # Path alias: @/* → ./src/*
eslint.config.mjs     # ESLint 9 flat config
next.config.mjs       # Next.js config
```

### Key architectural facts

- **`src/app/page.js` is a monolith.** All UI components (`Header`, `HeroSection`, `ProjectsSection`, `ProjectCard`, etc.) and all portfolio data (`resumeData`) live in this single file. Do not create a `src/components/` directory unless explicitly asked to refactor.
- **`page.js` is a Client Component** (`"use client"` at line 1). Hooks (`useState`, `useEffect`, `useRef`) are used freely throughout.
- **`layout.js` is a Server Component** — no `"use client"` directive, no hooks.
- **`route.js` is a Route Handler** (server-side) — no React, uses the Web `Response` API.
- There is no client-side routing. The site is a single page with one API route.
- State is local React state only — no Context, Redux, or Zustand.

---

## Code Style

### Language

- **JavaScript only.** Never introduce TypeScript (`.ts`/`.tsx` files, type annotations, or `tsconfig.json`).
- No `PropTypes`, no JSDoc type annotations. Types are implicit.
- ES Module syntax everywhere (`import`/`export`, not `require`/`module.exports`).
- Config files use `.mjs` extension for ESM (e.g., `eslint.config.mjs`, `next.config.mjs`).

### Formatting

- No Prettier or automated formatter is configured. Match the style of the surrounding code.
- Indentation: 2 spaces (as used throughout the project).
- Quotes: mixed single and double quotes are present in the codebase — prefer single quotes for JS strings, double quotes inside JSX attribute values.
- Semicolons: not used (ASI — automatic semicolon insertion).
- Trailing commas: used in multi-line arrays and objects.

### ESLint

Config: `eslint.config.mjs` uses ESLint 9 flat config extending `next/core-web-vitals` only. No extra rules.

When using raw `<img>` tags for external images (not `next/image`), suppress the lint warning with:
```js
// eslint-disable-next-line @next/next/no-img-element
```

Run lint before committing: `npm run lint`.

---

## Naming Conventions

| Entity | Convention | Examples |
|---|---|---|
| Source files | `camelCase.js` | `page.js`, `layout.js`, `route.js` |
| Config files | `camelCase.mjs` / `camelCase.js` | `tailwind.config.js`, `next.config.mjs` |
| React components | `PascalCase` function declarations | `HeroSection`, `ProjectCard`, `SocialButton` |
| Default-exported component | Named `PascalCase` (not anonymous) | `export default function Portfolio()` |
| Variables / state | `camelCase` | `activeSection`, `isScrolled`, `hasMounted` |
| Event handlers | `handle` + noun/action | `handleScroll`, `handleSubmit`, `handleChange` |
| Toggle handlers | `toggle` + noun | `toggleMenu`, `handleThemeToggle` |
| Data constants | `camelCase` object | `resumeData` |
| CSS utility classes | Tailwind inline | No BEM, no CSS Modules, no `className` strings |

---

## Imports

```js
// React hooks — named imports
import { useState, useEffect, useRef } from 'react'

// Next.js built-ins
import Image from 'next/image'
import { Inter } from 'next/font/google'

// Third-party — named imports
import { Github, ExternalLink, ChevronRight } from "lucide-react"

// CSS side-effects
import './globals.css'
```

- The `@/` path alias is defined in `jsconfig.json` (`@/*` → `./src/*`) but is **not currently used** anywhere. Prefer relative imports to stay consistent with the existing codebase.
- Do not add new third-party packages without explicit instruction.

---

## Styling (Tailwind CSS)

- All styles are Tailwind utility classes applied inline via `className`.
- Dark mode uses class strategy — the `dark` class is toggled on `<html>`. Use `dark:` prefix variants.
- Responsive design is mobile-first. Use breakpoints `sm:`, `md:`, `lg:` as needed.
- Custom animations (`animate-fadeInUp`, `animate-fadeIn`) and delay utilities (`animation-delay-100`, `animation-delay-500`, etc.) are registered in `tailwind.config.js` via a plugin. Add new animations there.
- Global base styles and Tailwind directives are in `src/app/globals.css`.
- Do not introduce CSS Modules, styled-components, or other CSS-in-JS solutions.

---

## Error Handling Patterns

### Server-side (API Route Handler)

Use `try/catch` and return a `Response` with an explicit HTTP status:

```js
export async function POST(request) {
  try {
    // ...logic
    return new Response(JSON.stringify({ success: true, message: "..." }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error("API Error:", error)
    return new Response(JSON.stringify({ success: false, message: "Server error." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
```

### Client-side (React components)

Use `try/catch` with React state for user-facing error messages:

```js
const [error, setError] = useState('')
const [isSubmitting, setIsSubmitting] = useState(false)

try {
  // async operation
} catch (err) {
  setError(err.message || 'An error occurred. Please try again.')
} finally {
  setIsSubmitting(false)
}
```

Display errors in a styled `role="alert"` div. Do not use `throw` to propagate UI errors — surface them via state.

---

## SSR / Hydration Safety

The entire `page.js` is a Client Component, but Next.js still renders it on the server first. Guard any `window` or `localStorage` access with the `hasMounted` pattern:

```js
const [hasMounted, setHasMounted] = useState(false)
useEffect(() => { setHasMounted(true) }, [])

// Later in render or effect:
if (!hasMounted) return null  // or return a skeleton
const saved = localStorage.getItem('theme')
```

Never read `window`, `document`, or `localStorage` at the module level or outside a `useEffect`/`hasMounted` guard.

---

## Data Pattern

Portfolio content is stored in the `resumeData` constant at the top of `page.js`. It is a plain JavaScript object with arrays for experience, projects, skills, education, and social links. JSX (e.g., icon elements like `<Github size={16} />`) can appear as values inside this data object — this is intentional and ties content to the React render tree.

When adding new content (projects, experience, etc.), edit the `resumeData` object rather than hardcoding values inside JSX.

---

## What Not to Do

- Do not introduce TypeScript.
- Do not add a testing framework unless asked.
- Do not create `src/components/` or split `page.js` into multiple files unless explicitly asked to refactor.
- Do not add Prettier or change the ESLint config without instruction.
- Do not use `next/image` for external/remote images without configuring `remotePatterns` in `next.config.mjs`.
- Do not access `window`/`localStorage` outside a `useEffect` or `hasMounted` guard.
- Do not use the `@/` alias for new imports — use relative paths to match the existing codebase.
