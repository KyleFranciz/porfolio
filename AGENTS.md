# AGENTS.md

## Commands
- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Start production**: `npm run start`
- **Lint**: `npm run lint`
- **Test**: No tests configured yet; add Jest or Vitest if needed

## Code Style
- **Language**: TypeScript with strict mode
- **Framework**: Next.js App Router
- **Components**: Functional React components with TypeScript props
- **Imports**: Group imports: React/Next first, then external libs, then internal (@/)
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Types**: Use explicit types, avoid `any`; prefer interfaces for objects
- **Styling**: Tailwind CSS classes; use dark mode variants
- **Error Handling**: Try-catch for async operations; console.error for debugging
- **Formatting**: ESLint with Next.js config; no semicolons, single quotes
- **Structure**: src/app/ for pages; public/ for static assets

No Cursor or Copilot rules found.