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

export const navLinks = [
  { label: "Hello", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
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
  { id: "pr1", title: "Northwind Banking", category: "UI & UX", tags: ["Fintech", "Mobile"], image: p1, description: "A complete redesign of a regional banking app — onboarding flows, biometrics, and a card management hub used by 1.2M people.", role: "Lead Product Designer", tools: ["Figma", "Principle", "Lottie"], liveUrl: "#", githubUrl: "#" },
  { id: "pr2", title: "Saplng Identity", category: "Branding", tags: ["Logo", "Print"], image: p2, description: "A monochrome identity system with a single moss-green accent for an agroforestry startup.", role: "Brand Designer", tools: ["Illustrator", "Figma"], liveUrl: "#" },
  { id: "pr3", title: "Rails Analytics", category: "Web Dev", tags: ["SaaS", "Dashboard"], image: p3, description: "Real-time analytics dashboard rebuilt from scratch — sub-200ms perceived load and a 38% lift in weekly active use.", role: "Design Lead", tools: ["Figma", "React", "D3"], liveUrl: "#", githubUrl: "#" },
  { id: "pr4", title: "Treblend Studio", category: "Web Dev", tags: ["E-commerce", "Headless"], image: p4, description: "A headless commerce storefront with motion-rich product pages, built with Shopify Hydrogen.", role: "Designer + Developer", tools: ["Shopify", "Hydrogen", "Tailwind"], liveUrl: "#" },
  { id: "pr5", title: "Cryptid Wallet", category: "UI & UX", tags: ["Crypto", "iOS"], image: p5, description: "A non-custodial crypto wallet focused on calm UX, recoverable seeds, and transparent fees.", role: "Sr. Product Designer", tools: ["Figma", "Swift UI"], liveUrl: "#" },
  { id: "pr6", title: "Aurora Type Poster", category: "Graphic", tags: ["Poster", "Motion"], image: p6, description: "An exhibition poster series exploring fluid type and gradient motion for a Manila design week showcase.", role: "Graphic + Motion", tools: ["After Effects", "Cinema 4D"] },
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
