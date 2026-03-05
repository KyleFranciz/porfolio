# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- No tests configured.

## Architecture

This is a **Next.js 16 App Router** single-page portfolio with snap-scroll sections. The entire site lives in `src/app/page.tsx` as a client component that renders four full-screen sections in order: `HomeSection → AboutSection → ProjectSection → SkillsSection`.

**Key architectural patterns:**

- **Snap scrolling**: The page wrapper uses `snap-y snap-mandatory overflow-y-scroll` with each section using `snap-start`. Scroll progress is tracked via `window.scrollY` to drive a top progress bar (via `motion` library).
- **Two animation libraries coexist**: GSAP (with ScrollTrigger + SplitText plugins) is used for scroll-triggered animations in section components. Framer Motion (`motion/react`) is used for the startup splash screen and the scroll progress bar.
- **GSAP ScrollTrigger pattern**: Animation components in `src/components/animations/` register GSAP plugins inside `useLayoutEffect` with `useGSAP` from `@gsap/react`. Trigger is typically `"bottom center"` (element bottom hits viewport center). Always wrap in a `ref` container.
- **No Tailwind config file**: Uses Tailwind CSS v4 with theme defined entirely in `src/app/globals.css` via `@theme inline {}`. Color tokens: `background` (#e0e2d9 beige), `foreground` (#1e1e1e dark), `mouse`/`loadingbar` (#98975f olive). Font tokens: `satoshi`, `mono`, `display`.
- **Custom cursor**: A global `CircularMouse` component replaces the OS cursor (CSS sets `cursor: none` globally). Keep this in mind when testing hover interactions.
- **Font setup**: Satoshi (body) and Clash Display (headings) are local fonts loaded in `src/app/layout.tsx` and exposed as CSS variables. Use `font-satoshi` and `font-display` Tailwind classes.
- **Path alias**: `@/*` maps to `src/*`.

## Styling Conventions

- Use `text-foreground`, `bg-background`, `text-mouse` / `bg-mouse` (olive) for color. Avoid raw hex values.
- `font-satoshi` for body text, `font-display` (Clash Display) for large headings.
- The `HomeSection` uses `bg-theme-beige text-theme-dark` class names — these are the same colors via different token names.

## Animation Components (`src/components/animations/`)

| Component | Purpose |
|---|---|
| `scrollTriggerTitle` | Splits text into chars, animates in with random Y-rotation on scroll |
| `scrollSeperatorLine` | Expands a line from 0→100% width on scroll |
| `animatedLink` | Same char-split animation but wraps a Next.js `<Link>` |
| `ProjectCardsReveal` | Wraps project cards; staggers opacity/Y/scale in on scroll |
| `ProjectArrowReveal` | Same but for arrow buttons, uses X offset |
| `StartupAnimation` | Framer Motion splash screen, runs once on first load (2500ms) |
| `PercentageCounter` | Framer Motion 0→100% counter used inside startup animation |
