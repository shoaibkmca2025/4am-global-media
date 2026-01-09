import { Service, Client, NavItem, Article, Project } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#projects' },
  { label: 'Insights', href: '#insights' },
  { label: 'Network', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Quantum Nexus",
    category: "Software Development",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2564&auto=format&fit=crop",
    description: "Enterprise-grade blockchain middleware for secure data synchronization.",
    challenge: "Developing a low-latency system that could handle 10k+ concurrent transactions while maintaining 100% data integrity across decentralized nodes.",
    solution: "We engineered a custom Rust-based consensus layer and a React-powered monitoring dashboard that reduced processing overhead by 60%.",
    technologies: ["Rust", "React", "Node.js", "AWS"]
  },
  {
    id: 2,
    title: "Vanguard Growth",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    description: "Multi-channel ROAS optimization for a global FinTech disruptor.",
    challenge: "The client was seeing diminishing returns on Meta and Google Ads, with customer acquisition costs (CAC) rising by 40% year-over-year.",
    solution: "We implemented an AI-driven attribution model and a viral content strategy that pivoted on user-generated content, slashing CAC by 55%.",
    technologies: ["Meta Ads", "Google Analytics", "AI Copywriting", "SEO"]
  },
  {
    id: 3,
    title: "Aura Commerce",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
    description: "A luxury fashion marketplace with integrated AR try-on features.",
    challenge: "High return rates due to customers misjudging fit and style during online shopping.",
    solution: "Created a React Native app with Spark AR integration allowing real-time virtual try-ons, increasing conversion rates by 22%.",
    technologies: ["React Native", "Three.js", "Spark AR", "Firebase"]
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Algorithmic Shift: Marketing in 2025',
    excerpt: 'How proprietary AI models are replacing traditional SEO strategies in the battle for the top spot.',
    content: 'The digital landscape is no longer just about keywords; it is about intent and context. At 4AM Global Media, we have seen a 300% increase in efficiency when moving from traditional SEO to LLM-optimized content frameworks...',
    author: 'Sarah Devlin',
    date: 'Jan 15, 2024',
    category: 'Marketing',
    readTime: '6 min read',
  },
  {
    id: '2',
    title: 'Scaling from Zero to 1M Users',
    excerpt: 'A technical blueprint for architects building the next generation of SaaS platforms.',
    content: 'Scaling isn\'t just about bigger servers; it\'s about smarter code. This article dives into the exact stack we use at our software company to ensure horizontal scalability from day one...',
    author: 'David Zhang',
    date: 'Feb 02, 2024',
    category: 'Technology',
    readTime: '10 min read',
  }
];

export const SERVICES: Service[] = [
  {
    id: 'development',
    title: 'Custom Software Engineering',
    description: 'Bespoke web and mobile applications engineered for high performance and infinite scale.',
    icon: 'code',
    longDescription: 'We build the backbone of your business. From complex CRM systems to consumer-facing mobile apps, our engineering team uses cutting-edge technologies like React, Node, and Rust to deliver robust products.',
    features: ['SaaS Architecture', 'Cross-Platform Mobile Apps', 'API Integration & Design', 'Cloud Infrastructure', 'Legacy System Modernization']
  },
  {
    id: 'marketing',
    title: 'Digital Growth & Ads',
    description: 'Data-driven marketing strategies that prioritize ROAS and sustainable brand scaling.',
    icon: 'trending-up',
    longDescription: 'Our digital marketing division is obsessed with ROI. We combine high-velocity ad testing with deep psychological insights to capture and convert your ideal audience.',
    features: ['Google & Meta Ads Management', 'Full-Funnel CRO', 'Advanced Data Analytics', 'Retargeting Strategies', 'Email Automation']
  },
  {
    id: 'seo',
    title: 'Content & SEO Mastery',
    description: 'Command the search results and dominate your niche with authority-building content.',
    icon: 'target',
    longDescription: 'SEO is more than just ranking; it\'s about being the definitive answer to your customer\'s questions. We build content ecosystems that establish your startup as a category leader.',
    features: ['Technical SEO Audits', 'Keyword Intent Analysis', 'High-Authority Backlinking', 'AI-Augmented Content', 'Local SEO Dominance']
  },
  {
    id: 'crypto',
    title: 'Web3 & Blockchain',
    description: 'Strategic advisory and development for decentralized finance and NFT ecosystems.',
    icon: 'bitcoin',
    longDescription: 'Navigate the frontier of finance. We help startups launch tokens, build dApps, and integrate blockchain technology to create transparent, trustless user experiences.',
    features: ['Smart Contract Auditing', 'dApp Development', 'Tokenomics Design', 'DeFi Integration', 'Layer 2 Scaling']
  }
];

export const CLIENTS: Client[] = [
  { id: 1, name: "Nexus Labs", url: "#" },
  { id: 2, name: "Growth Corp", url: "#" },
  { id: 3, name: "Innovate AI", url: "#" },
  { id: 4, name: "Cloud Tech", url: "#" }
];