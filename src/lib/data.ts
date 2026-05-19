import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

export const NAME = "Alex Wallace";
export const ROLE = "UI & UX Designer";
export const LOCATION = "Manila, Philippines";
export const EMAIL = "hello@alexwallace.design";

export type NavItem = {
  label: string;
  to: "/" | "/about" | "/resume" | "/projects" | "/blog" | "/gallery";
  icon: "Home" | "User" | "FileText" | "FolderOpen" | "BookOpen" | "Image";
};

export const navLinks: NavItem[] = [
  { label: "Home", to: "/", icon: "Home" },
  { label: "About", to: "/about", icon: "User" },
  { label: "Resume", to: "/resume", icon: "FileText" },
  { label: "Projects", to: "/projects", icon: "FolderOpen" },
  { label: "Blog", to: "/blog", icon: "BookOpen" },
  { label: "Gallery", to: "/gallery", icon: "Image" },
];

export const stats = [
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "Projects Shipped", value: 215, suffix: "+" },
  { label: "Happy Clients", value: 97, suffix: "+" },
];

export const orbitSkills = ["Figma", "React", "Tailwind", "Framer", "Webflow", "GSAP"];

export type Service = {
  id: string;
  title: string;
  count: string;
  description: string;
  featured?: boolean;
  icon: "Palette" | "PenTool" | "MonitorSmartphone" | "Sparkles" | "Wand2" | "LineChart";
};

export const services: Service[] = [
  { id: "s1", title: "UI & UX Design", count: "126 Projects", description: "End-to-end product design from research and wireframes through pixel-perfect interface systems.", icon: "Palette", featured: true },
  { id: "s2", title: "Brand Identity", count: "48 Projects", description: "Logo systems, type, color and rules that scale across digital and print touch-points.", icon: "PenTool" },
  { id: "s3", title: "Web Design", count: "72 Projects", description: "Marketing sites and dashboards crafted for performance, conversion and clarity.", icon: "MonitorSmartphone" },
  { id: "s4", title: "Motion Design", count: "31 Projects", description: "Micro-interactions, scroll choreography and Lottie animations that bring products alive.", icon: "Sparkles" },
  { id: "s5", title: "Design Systems", count: "19 Projects", description: "Token-based component libraries built in Figma and shipped in code with your team.", icon: "Wand2" },
  { id: "s6", title: "SEO & Analytics", count: "24 Projects", description: "Technical SEO, schema, and analytics setups that turn beautiful sites into growth engines.", icon: "LineChart" },
];

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: "UI & UX" | "Branding" | "Web Dev" | "Graphic";
  tags: string[];
  image: string;
  description: string;
  role: string;
  tools: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  { id: "pr1", slug: "northwind-banking", title: "Northwind Banking", category: "UI & UX", tags: ["Fintech", "Mobile"], image: p1, description: "A complete redesign of a regional banking app — onboarding flows, biometrics, and a card management hub used by 1.2M people.", role: "Lead Product Designer", tools: ["Figma", "Principle", "Lottie"], liveUrl: "#", githubUrl: "#" },
  { id: "pr2", slug: "sapling-identity", title: "Sapling Identity", category: "Branding", tags: ["Logo", "Print"], image: p2, description: "A monochrome identity system with a single moss-green accent for an agroforestry startup.", role: "Brand Designer", tools: ["Illustrator", "Figma"], liveUrl: "#" },
  { id: "pr3", slug: "rails-analytics", title: "Rails Analytics", category: "Web Dev", tags: ["SaaS", "Dashboard"], image: p3, description: "Real-time analytics dashboard rebuilt from scratch — sub-200ms perceived load and a 38% lift in weekly active use.", role: "Design Lead", tools: ["Figma", "React", "D3"], liveUrl: "#", githubUrl: "#" },
  { id: "pr4", slug: "treblend-studio", title: "Treblend Studio", category: "Web Dev", tags: ["E-commerce", "Headless"], image: p4, description: "A headless commerce storefront with motion-rich product pages, built with Shopify Hydrogen.", role: "Designer + Developer", tools: ["Shopify", "Hydrogen", "Tailwind"], liveUrl: "#" },
  { id: "pr5", slug: "cryptid-wallet", title: "Cryptid Wallet", category: "UI & UX", tags: ["Crypto", "iOS"], image: p5, description: "A non-custodial crypto wallet focused on calm UX, recoverable seeds, and transparent fees.", role: "Sr. Product Designer", tools: ["Figma", "Swift UI"], liveUrl: "#" },
  { id: "pr6", slug: "aurora-type-poster", title: "Aurora Type Poster", category: "Graphic", tags: ["Poster", "Motion"], image: p6, description: "An exhibition poster series exploring fluid type and gradient motion for a Manila design week showcase.", role: "Graphic + Motion", tools: ["After Effects", "Cinema 4D"] },
];

export const portfolioFilters = ["All", "UI & UX", "Branding", "Web Dev", "Graphic"] as const;

export const skills = [
  { name: "Product & UX Design", percentage: 96 },
  { name: "Interface Engineering (React / TS)", percentage: 88 },
  { name: "Design Systems", percentage: 93 },
  { name: "Motion & Interaction", percentage: 84 },
  { name: "Brand & Visual Identity", percentage: 79 },
];

export const techStack = [
  "Figma", "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "GSAP", "Node.js", "PostgreSQL", "Three.js", "Webflow", "After Effects",
];

export const testimonials = [
  { id: "t1", quote: "Alex turned a years-old codebase and a confused product into something our team is proud to ship. He works like a partner, not a vendor.", name: "Mira Tanaka", role: "VP Product", company: "Rails Analytics", rating: 5 },
  { id: "t2", quote: "The redesign moved our conversion 22% in the first month. The craft on every screen made the difference — nothing felt generic.", name: "Daniel Reyes", role: "CEO", company: "Treblend Studio", rating: 5 },
  { id: "t3", quote: "Calm, fast, and ridiculously good at translating fuzzy ideas into shipped UI. We rehired him for two more projects in a row.", name: "Sofia Aquino", role: "Head of Design", company: "Northwind", rating: 5 },
  { id: "t4", quote: "He wrote our design system, then shipped the React components himself. One designer doing the work of three.", name: "Owen Park", role: "CTO", company: "Cryptid", rating: 5 },
];

export const socials = [
  { label: "GitHub", href: "https://github.com", icon: "Github" as const },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" as const },
  { label: "Twitter", href: "https://twitter.com", icon: "Twitter" as const },
  { label: "Dribbble", href: "https://dribbble.com", icon: "Dribbble" as const },
  { label: "Instagram", href: "https://instagram.com", icon: "Instagram" as const },
];

// ============ Resume ============

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    id: "e1",
    role: "Independent Product Designer",
    company: "Alex Wallace Studio",
    period: "2022 — Present",
    bullets: [
      "Lead design for 8+ venture-backed teams across Manila, Singapore and SF.",
      "Ship Figma systems and React components on the same engagement.",
      "Average engagement: 12 weeks. Average NPS from founders: 72.",
    ],
  },
  {
    id: "e2",
    role: "Senior Product Designer",
    company: "Rails Analytics",
    period: "2020 — 2022",
    bullets: [
      "Rebuilt the dashboard from scratch — 38% lift in weekly active use.",
      "Wrote the v1 design system in Figma and partnered with platform engineering on the React port.",
    ],
  },
  {
    id: "e3",
    role: "Product Designer",
    company: "Northwind Bank",
    period: "2018 — 2020",
    bullets: [
      "Redesigned onboarding, biometrics and card management for the iOS app (1.2M MAU).",
      "Built the bank's first accessibility audit and remediation programme.",
    ],
  },
  {
    id: "e4",
    role: "Junior Designer",
    company: "Folk & Field",
    period: "2017 — 2018",
    bullets: [
      "Brand identities, marketing sites and packaging for hospitality clients.",
      "First year as a designer — learned to ship on a deadline.",
    ],
  },
];

export const education = [
  {
    id: "ed1",
    degree: "BFA, Visual Communication",
    school: "Ateneo de Manila University",
    period: "2013 — 2017",
    note: "Minor in human-computer interaction. Thesis on calm interfaces for online banking.",
  },
  {
    id: "ed2",
    degree: "Interaction Design Certificate",
    school: "Interaction Design Foundation",
    period: "2019",
    note: "200-hour curriculum across UX research, IA, and accessibility.",
  },
];

export const skillGroups = [
  {
    label: "Design Tools",
    items: [
      { name: "Figma", percentage: 98 },
      { name: "Sketch / XD", percentage: 78 },
      { name: "After Effects", percentage: 82 },
      { name: "Cinema 4D", percentage: 64 },
    ],
  },
  {
    label: "Development",
    items: [
      { name: "React / TypeScript", percentage: 88 },
      { name: "Tailwind CSS", percentage: 94 },
      { name: "Framer Motion", percentage: 86 },
      { name: "Node.js / APIs", percentage: 72 },
    ],
  },
  {
    label: "Soft Skills",
    items: [
      { name: "Stakeholder Workshops", percentage: 92 },
      { name: "Design Critique", percentage: 95 },
      { name: "Async Writing", percentage: 90 },
      { name: "Mentorship", percentage: 84 },
    ],
  },
];

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  icon: "Award" | "BadgeCheck" | "ShieldCheck";
};

export const certifications: Certification[] = [
  { id: "c1", name: "Google UX Design Professional", issuer: "Google / Coursera", year: "2021", icon: "Award" },
  { id: "c2", name: "Nielsen Norman UX Master", issuer: "Nielsen Norman Group", year: "2022", icon: "BadgeCheck" },
  { id: "c3", name: "Accessibility Specialist (WAS)", issuer: "IAAP", year: "2023", icon: "ShieldCheck" },
];

// ============ Gallery ============

export type GalleryItem = {
  id: string;
  title: string;
  category: "UI Design" | "Illustrations" | "Photography" | "3D Work" | "Branding";
  src: string;
  description: string;
};

export const galleryFilters = ["All", "UI Design", "Illustrations", "Photography", "3D Work", "Branding"] as const;

const u = (id: string, w = 1200, h = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

export const gallery: GalleryItem[] = [
  { id: "g1",  title: "Banking onboarding",  category: "UI Design",     src: u("photo-1551288049-bebda4e38f71", 1200, 1500), description: "Hi-fi mockups exploring biometric onboarding states." },
  { id: "g2",  title: "Sapling marks",       category: "Branding",      src: u("photo-1626785774573-4b799315345d", 1200, 1200), description: "Logomark exploration sheet for Sapling." },
  { id: "g3",  title: "Tokyo at night",      category: "Photography",   src: u("photo-1542051841857-5f90071e7989", 1200, 1700), description: "Shinjuku, shot on a borrowed FM2." },
  { id: "g4",  title: "Aurora — frame 12",   category: "3D Work",       src: u("photo-1620121692029-d088224ddc74", 1200, 900),  description: "Cinema 4D Redshift render for the Aurora series." },
  { id: "g5",  title: "Field notes 03",      category: "Illustrations", src: u("photo-1513364776144-60967b0f800f", 1200, 1500), description: "Daily sketchbook entry, Procreate." },
  { id: "g6",  title: "Treblend hero",       category: "UI Design",     src: u("photo-1559028012-481c04fa702d", 1200, 1400), description: "Hero composition for the Treblend storefront." },
  { id: "g7",  title: "Wallet — dark",       category: "UI Design",     src: u("photo-1611162617213-7d7a39e9b1d7", 1200, 1500), description: "Dark-mode exploration for Cryptid Wallet." },
  { id: "g8",  title: "Manila monsoon",      category: "Photography",   src: u("photo-1480714378408-67cf0d13bc1b", 1200, 800),  description: "Roxas Boulevard, August." },
  { id: "g9",  title: "Type, untitled",      category: "Illustrations", src: u("photo-1611224923853-80b023f02d71", 1200, 1500), description: "Variable-type poster, work in progress." },
  { id: "g10", title: "Glass studies",       category: "3D Work",       src: u("photo-1618005182384-a83a8bd57fbe", 1200, 1200), description: "Material study, 18 frames a day." },
  { id: "g11", title: "Folk & Field",        category: "Branding",      src: u("photo-1561070791-2526d30994b8", 1200, 1300), description: "Hospitality identity, archived." },
  { id: "g12", title: "Empty plate",         category: "Photography",   src: u("photo-1504754524776-8f4f37790ca0", 1200, 1400), description: "After dinner. Cebu." },
  { id: "g13", title: "Cards, sketched",     category: "Illustrations", src: u("photo-1503602642458-232111445657", 1200, 900),  description: "Loose card studies from a banking workshop." },
  { id: "g14", title: "Northwind teardown",  category: "UI Design",     src: u("photo-1551288049-bebda4e38f71", 1300, 900),  description: "Heuristic audit board for Northwind v3." },
  { id: "g15", title: "Brutal ceramics",     category: "3D Work",       src: u("photo-1635322966219-b75ed372eb01", 1200, 1500), description: "Personal series, Blender." },
  { id: "g16", title: "Sapling press kit",   category: "Branding",      src: u("photo-1517292987719-0369a794ec0f", 1200, 1100), description: "Print collateral and stationery system." },
];

// ============ Blog ============

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  tag: "Design" | "Engineering" | "Process" | "Notes";
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "calm-interfaces",
    title: "Notes on calm interfaces",
    excerpt: "Why the most useful products feel like nothing at all.",
    date: "2026-04-12",
    readMinutes: 6,
    tag: "Design",
    body: "A calm interface tells you what changed, what you can do next, and nothing else. It is the absence of fuss. After eight years of shipping products, I keep coming back to the same instinct: when in doubt, remove. The brief is rarely 'more'. The brief is almost always 'less, but better placed'.",
  },
  {
    slug: "design-systems-debt",
    title: "Design systems as technical debt",
    excerpt: "A design system is a contract. Most teams break it within a quarter.",
    date: "2026-03-02",
    readMinutes: 9,
    tag: "Process",
    body: "Design systems pay for themselves only when the team enforces them. The component library is the easy part. The hard part is the weekly review where someone says 'this new screen needs a one-off card style' and you say no.",
  },
  {
    slug: "from-figma-to-react",
    title: "From Figma to React, in one afternoon",
    excerpt: "A pragmatic workflow for one-person teams.",
    date: "2026-02-18",
    readMinutes: 7,
    tag: "Engineering",
    body: "I design in Figma in the morning and ship in React in the afternoon. Here is the loop I actually use, including the small Figma tokens plugin I keep nudging the team to adopt.",
  },
  {
    slug: "manila-design-week",
    title: "Field notes — Manila Design Week",
    excerpt: "Six conversations I had at MDW that I'm still thinking about.",
    date: "2026-01-09",
    readMinutes: 5,
    tag: "Notes",
    body: "A list, lightly annotated. The best work this year was small, local, and unconcerned with the algorithm.",
  },
  {
    slug: "the-cost-of-animation",
    title: "The cost of animation",
    excerpt: "Motion is rent, not a one-time purchase.",
    date: "2025-11-22",
    readMinutes: 8,
    tag: "Design",
    body: "Every animation you ship has to be maintained. A short field guide for deciding when motion is worth it and when it is decoration.",
  },
  {
    slug: "writing-for-buttons",
    title: "Writing for buttons",
    excerpt: "Microcopy is the most under-respected craft in product design.",
    date: "2025-10-04",
    readMinutes: 4,
    tag: "Design",
    body: "Three rules for button copy that has earned its place: use a verb, predict the next screen, and never use 'submit'.",
  },
];
