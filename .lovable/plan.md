
## Personal Developer Portfolio — Dacera Jerick

A dark-themed, modern portfolio inspired by bryllim.com with electric cyan accents, built as a multi-route TanStack Start site for proper SEO and shareability.

### Routes
- `/` — Home (hero + condensed previews of each section)
- `/about` — Full about page
- `/projects` — All projects (placeholders)
- `/stack` — Full tech stack
- `/contact` — Contact CTAs and social links

### Home page sections (in order, mirroring bryllim.com)
1. **Sticky top nav** — "Jerick" logo left, anchor/route links right (About, Stack, Projects, Contact), subtle blur backdrop.
2. **Hero** — Large name "Dacera Jerick", subtitle "Full-Stack Developer · Student", tagline "Also known as Uchiha Jerick. Building web apps from Cantilan, Philippines." Animated cyan radial-gradient glow behind. Two CTAs: "Schedule a Call" and "Send Email" (mailto).
3. **About** — Short bio card with the provided text, location pill (Cantilan, Surigao del Sur) and school pill (NEMSU Cantilan Campus, 3rd Year). "View All" → /about.
4. **Tech Stack** — Categorized pill groups (Frontend, Backend, AI & ML, Developer Tools) on bordered cards. "View All" → /stack.
5. **Recent Projects** — 3 placeholder cards ("Coming Soon" / "In Development") with title, short description, disabled link. "View All" → /projects.
6. **Certifications** — Single muted card: "Certifications coming soon."
7. **Connect / Social** — GitHub, LinkedIn, Facebook icon buttons + "Read my blog" placeholder + "Send Email" mailto.
8. **Footer** — Name, year, tiny tagline.

### Design system
- Background `#0a0a0a`, surface `#111`, border `rgba(255,255,255,0.08)`
- Accent cyan `#00d4ff` with subtle glow shadow
- Foreground white / muted gray `#9ca3af`
- Inter font (Google Fonts)
- Subtle hover: border lights to cyan/30, slight translate-y, glow
- Fade-in-on-scroll using IntersectionObserver utility
- Smooth scroll via `scroll-behavior: smooth`
- Fully responsive, mobile-first; hamburger drawer for nav on mobile

### Technical notes
- Update `src/styles.css` with the dark palette + Inter import + cyan accent tokens + fade-in keyframes
- Replace placeholder `index.tsx` with real homepage
- Create route files for `/about`, `/projects`, `/stack`, `/contact` each with their own `head()` meta
- Shared `Header` and `Footer` components in `src/components/`
- Reusable `SectionHeader`, `TechPillGroup`, `ProjectCard`, `FadeIn` components
- Update root `__root.tsx` meta to "Dacera Jerick — Full-Stack Developer"
