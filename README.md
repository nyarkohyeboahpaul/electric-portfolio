# Electric Portfolio

Build me a stunning, modern, fully responsive personal portfolio website from scratch using Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Framer Motion, GSAP (for scroll-triggered animations), and shadcn/ui components. This is a dark-themed designer/developer portfolio inspired by a clean dark UI with electric green (#00E5A0) as the primary accent color. Make it significantly better than a typical template — it must feel premium, animated, and production-ready.

━━━━━━━━━━━━━━━━━━━━━━━━━
TECH STACK & ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━

Framework: Next.js 14 App Router (SSR + SSG hybrid)
Language: TypeScript (strict mode)
Styling: Tailwind CSS v3 with a custom design system in tailwind.config.ts
Animation: Framer Motion (page transitions, element reveals) + GSAP with ScrollTrigger
UI Components: shadcn/ui (Dialog, Sheet, Tooltip, Badge)
Icons: Lucide React
Forms: React Hook Form + Zod validation
Email: Resend API for contact form
3D/Visual effects: Three.js (subtle particle canvas in hero section only)
SEO: next-seo or native Next.js metadata API
Font: Inter (body) + Syne (headings) from Google Fonts via next/font
Linting: ESLint + Prettier pre-configured
Deployment-ready: Vercel config, sitemap.xml, robots.txt

━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━

Color palette (extend Tailwind config):
  - bg-primary: #0A0A0A (near black)
  - bg-secondary: #111111 (card surfaces)
  - bg-tertiary: #1A1A1A (hover states)
  - accent: #00E5A0 (electric green — CTAs, highlights, active states)
  - accent-dim: #00E5A020 (translucent accent for glows)
  - text-primary: #F5F5F5
  - text-muted: #888888
  - border: #1F1F1F

Typography:
  - Headings: Syne, bold, tight tracking
  - Body: Inter, regular, 1.7 line-height
  - Code: JetBrains Mono

Spacing: 4px base grid, 80px section vertical padding
Border radius: 12px cards, 8px buttons, 999px pills
Transitions: cubic-bezier(0.25, 0.46, 0.45, 0.94) for all hovers

━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE SECTIONS — FULL DETAIL
━━━━━━━━━━━━━━━━━━━━━━━━━

1. NAVIGATION (sticky, glassmorphism)
- Frosted glass effect: backdrop-blur-md, bg-black/60, border-b border-white/5
- Logo: stylized "A" monogram in accent green, animated on hover
- Nav links: Hello / About / Services / Portfolio / Blog / Contact
- Active link: underline animation in accent color
- CTA button: "Let's Talk" — accent green with subtle pulse ring animation
- Mobile: hamburger → full-screen overlay menu with staggered link animation
- Scroll behavior: shrinks slightly on scroll-down, reappears on scroll-up

2. HERO SECTION (full-viewport)
- Two-column layout (60/40 split) on desktop, stacked on mobile
- Left side:
  · Eyebrow text: "HELLO, I'M A" — small uppercase, accent color, letter-spacing wide
  · H1: "UI & UX" on first line, "Designer." on second — Syne font, 72px desktop / 42px mobile
  · "Designer." word has a typewriter animation that cycles through roles: Designer. / Developer. / Creator.
  · 3–4 line bio paragraph, text-muted color
  · Two CTA buttons: "View Portfolio" (accent fill) and "Download CV" (ghost outline)
  · Animated stats row: 5+ Years Experience | 215+ Projects | 97+ Happy Clients — numbers count-up on viewport entry
- Right side:
  · Profile photo in a circular/organic blob-shaped frame with animated gradient border in accent color
  · Floating skill badges orbiting the photo frame (CSS keyframe orbit animation): Figma, React, Tailwind, etc.
  · Subtle particle canvas behind the photo using Three.js (low-opacity white dots, slow drift)
- Background: honeycomb / hexagon SVG pattern at 3% opacity

3. ABOUT SECTION
- Two-column grid: photo left, content right
- Photo: large portrait in a card with accent border-left highlight; floating stat chips overlaid (16+ Years, 215+ Projects, 97+ Clients) — each chip entrance animated with spring physics
- Content right:
  · Section eyebrow: "LET ME INTRODUCE MYSELF"
  · H2: "About me"
  · Subheading: "A story of hardwork and perseverance." — accent color
  · Two paragraphs of bio
  · Contact line with email address (clickable mailto link)
  · Two buttons: "Hire Me" (accent fill) + "Download CV" (outline)
- Skills progress bars below: horizontal animated bars (fill on scroll-into-view) for top 4–6 skills with percentage labels

4. SERVICES SECTION
- Section eyebrow + H2: "Services"
- 3-column card grid (stacks to 1 col on mobile)
- Each card:
  · Icon: Lucide icon at top, inside a 48px accent-dim circle
  · Small tag: "126 PROJECTS" in muted text
  · Service title (H3, white)
  · Short description
  · Hover: card lifts (translateY -8px), accent left-border slides in, icon rotates 15deg
  · First card: accent green background as the "featured" card
- Services: UI & UX Design / Graphic Design / Web Design / Brand Identity / Motion Design / SEO & Analytics
- Staggered entrance animation (each card delays 100ms from previous)

5. PORTFOLIO / WORK SECTION
- Section eyebrow + H2: "Portfolio"
- Horizontal filter tabs: All / UI & UX Design / Branding / Graphic Design / Web Dev
- Masonry-style or 4-column grid of project cards
- Each project card:
  · Image fills the card (16:10 ratio)
  · On hover: overlay fades in with project title + category tags + an "arrow right" icon
  · Hover overlay uses accent green at 90% opacity with dark text
  · Clicking opens a Dialog modal with full project details: description, role, tools used, live link, GitHub link
- Smooth filter transition: AnimatePresence with layout animation
- Load more button if projects exceed 8

6. SKILLS / TECH STACK SECTION
- Horizontal infinite-scroll ticker (marquee effect) of technology logos/names
- Two rows scrolling in opposite directions
- Items: React, Next.js, TypeScript, Figma, Tailwind CSS, Node.js, PostgreSQL, Framer Motion, Python, Three.js, Adobe XD, Webflow

7. TESTIMONIALS SECTION
- H2: "What Clients Say"
- Card carousel (Embla Carousel or custom) — auto-plays, pause on hover
- Each card: quote text, client avatar circle, name, job title, 5-star rating icons
- Dot indicators below

8. BLOG SECTION (optional, data from MDX or hardcoded)
- 3-column grid of blog post preview cards
- Each: cover image, category badge, title, excerpt, date, read time, "Read more →" link

9. CONTACT SECTION
- Two-column: left = CTA text + social links, right = contact form
- Left:
  · H2: "Let's Work Together"
  · Short paragraph
  · Social icon links: GitHub, LinkedIn, Twitter/X, Dribbble, Instagram — icons in a row, each has hover lift + accent color
  · Contact info with icons: email, phone, location
- Right:
  · Form fields: Name, Email, Subject, Message (textarea)
  · All fields: dark bg, 1px border-white/10, focus ring in accent color
  · Submit button: full-width, accent green, animated loading spinner on submit
  · Success toast notification after send (shadcn Toast)
  · Validation errors inline using React Hook Form + Zod

10. FOOTER
- Logo + 1-line bio
- Nav links in columns
- Social icons row
- Copyright line: "© 2025 [Name]. All rights reserved." + "Built with Next.js & ♥"
- Top: subtle 1px divider

━━━━━━━━━━━━━━━━━━━━━━━━━
ANIMATIONS — DETAILED
━━━━━━━━━━━━━━━━━━━━━━━━━

Page load:
- Preloader: brief 1.2s screen wipe in accent green, fades out
- Hero elements stagger in with Framer Motion (opacity 0 → 1, y: 40 → 0)

Scroll animations (GSAP ScrollTrigger):
- Section headings: slide up + fade in on scroll
- Cards: staggered reveal from bottom
- Stat numbers: count-up animation
- Skill bars: width animates from 0% to value

Micro-interactions:
- Cursor: custom cursor dot that scales on hover over interactive elements
- Magnetic buttons: slight pull effect on CTA buttons near mouse
- Smooth scroll: Lenis smooth scroll library
- Image parallax: subtle parallax on hero photo and section backgrounds

━━━━━━━━━━━━━━━━━━━━━━━━━
SEO — PRODUCTION GRADE
━━━━━━━━━━━━━━━━━━━━━━━━━

- Metadata API in layout.tsx: title, description, keywords, author, canonical URL
- Open Graph tags: og:title, og:description, og:image (1200×630 static), og:url, og:type
- Twitter card meta tags
- JSON-LD structured data: Person schema with name, jobTitle, url, sameAs (social links)
- Dynamic sitemap.xml at /sitemap.xml (generated via next-sitemap or Route Handler)
- robots.txt: allow all crawlers, point to sitemap
- next/image for all images: lazy loading, proper alt text, WebP format, width/height set
- Semantic HTML5 elements: 
, 
, 
, 

- Heading hierarchy: one H1 per page, logical H2 → H3 structure
- All links descriptive (no "click here")
- Core Web Vitals optimized: code-split by section, dynamic imports for heavy libs (Three.js, GSAP)
- Google Analytics 4 integration (via next/script with Strategy afterInteractive)
- Accessibility: focus-visible styles, ARIA labels on icon buttons, reduced-motion media query respects prefers-reduced-motion

━━━━━━━━━━━━━━━━━━━━━━━━━
FILE STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━

src/
  app/
    layout.tsx         ← root layout with metadata, fonts, providers
    page.tsx           ← main portfolio page (imports all sections)
    globals.css
    sitemap.ts         ← dynamic sitemap
    robots.ts
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      CustomCursor.tsx
      Preloader.tsx
    sections/
      Hero.tsx
      About.tsx
      Services.tsx
      Portfolio.tsx
      Skills.tsx
      Testimonials.tsx
      Contact.tsx
    ui/                ← shadcn/ui components live here
  lib/
    utils.ts           ← cn() helper
    data.ts            ← all portfolio data (projects, skills, testimonials)
    animations.ts      ← reusable Framer Motion variants
  hooks/
    useScrollProgress.ts
    useMagneticEffect.ts
  types/
    index.ts

━━━━━━━━━━━━━━━━━━━━━━━━━
DATA LAYER (data.ts)
━━━━━━━━━━━━━━━━━━━━━━━━━

Export typed arrays for:
- projects[]: id, title, description, image, tags[], category, liveUrl, githubUrl, role, tools[]
- services[]: id, icon, count, title, description, featured
- skills[]: name, percentage, icon
- testimonials[]: id, quote, name, role, company, avatar, rating
- stats[]: label, value, suffix (e.g. "+")

All placeholder data should be professional and realistic.

━━━━━━━━━━━━━━━━━━━━━━━━━
PERFORMANCE REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━

- Lighthouse score target: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- Three.js loaded with dynamic import + Suspense
- GSAP loaded only client-side (useEffect guard)
- All images use next/image with priority flag on hero image
- Font display: swap on all custom fonts
- No layout shift: all image containers have fixed aspect ratios
- Bundle analyze: @next/bundle-analyzer configured in next.config.ts

━━━━━━━━━━━━━━━━━━━━━━━━━
ENVIRONMENT VARIABLES (.env.local)
━━━━━━━━━━━━━━━━━━━━━━━━━

RESEND_API_KEY=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_SITE_URL=https://yourname.com

━━━━━━━━━━━━━━━━━━━━━━━━━
FINAL NOTES FOR LOVABLE
━━━━━━━━━━━━━━━━━━━━━━━━━

- Do NOT use any CSS frameworks other than Tailwind — no Bootstrap, no MUI
- Use placeholder images from picsum.photos or unsplash source URLs until real ones are added
- All animations must respect prefers-reduced-motion: reduce
- The accent color (#00E5A0) must be consistent everywhere — buttons, underlines, icon accents, borders, stat numbers
- Use real-looking placeholder copy (not Lorem Ipsum) — portfolio of a fictional UI/UX designer named "Alex Wallace" based in Philippines
- Generate the full project end-to-end, not just components — a running Next.js app I can deploy to Vercel immediately
- Include a README.md with setup instructions, env variable docs, and deployment steps

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dfaa1207-9267-4ba2-9328-e7a43a5ef842).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
