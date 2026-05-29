# InkDropPH - AI Agent Instructions (GEMINI.md)

This file provides foundational mandates and project-specific guidance for AI agents working on the InkDropPH codebase. These instructions take precedence over general workflows.

## Core Architectural Principles
- **Separation of Concerns:** Keep the Next.js frontend strictly decoupled from the automation logic. The frontend should trigger webhooks or API calls, while n8n handles the heavy lifting of data synchronization.
- **Single Source of Truth:** Airtable is the primary CRM and database. Never store persistent business state locally in the Next.js application.
- **Automation-First:** When adding new features (e.g., a new service type), always consider the corresponding n8n workflow and Airtable schema updates required.

## Tech Stack Guidelines
- **Framework:** Next.js 16 (App Router). Use Server Components by default; only use Client Components when interactivity is strictly necessary.
- **Styling:** Tailwind CSS 4. Adhere to the brand color palette:
    - **Orange (#E87F24):** Primary action color, highlights, and branding.
    - **Yellow (#FFC81E):** Accents and interactive indicators.
    - **Blue (#73A5CA):** Secondary theme color, gradients, and subtle borders.
    - Use `-light` variants (e.g., `bg-brand-blue-light`) for clean, branded backgrounds instead of generic greys.
- **State Management:** Prefer React Server Actions for data mutations and standard React hooks for local UI state.
- **Type Safety:** TypeScript is mandatory. Ensure all API responses (from n8n or Airtable) are properly typed.

## Integration Patterns
- **n8n Webhooks:** Use secure POST requests to trigger n8n workflows. Ensure sensitive data is handled according to security mandates.
- **Airtable Connectivity:** Interact with Airtable primarily through n8n to centralize logic and security, unless direct client-side interaction is explicitly required for performance reasons.
- **Notion Documentation:** Maintain the `ABOUT.md` and this `GEMINI.md` file to reflect any major architectural changes so they can be synced to Notion if needed.

## Development Workflow
- **Verification:** Always run `npm run lint` and `npm run build` before finalizing any changes to ensure the project remains deployable.
- **UI/UX:** Maintain a mobile-first, responsive design. Use `next/image` for all visual assets to ensure performance optimization.

## File Roles
- `ABOUT.md`: High-level business and technical overview for humans.
- `GEMINI.md`: (This file) Operational instructions for AI agents.
- `app/`: Contains the Next.js application logic using the App Router.
- `public/`: Assets and static files.
