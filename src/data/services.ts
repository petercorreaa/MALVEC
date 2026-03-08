// ─── Types ────────────────────────────────────────────────────────────────────

export interface ServiceCapabilityItem {
  title: string
  description: string
}

export interface ServiceProject {
  title: string
  category: string
  year: string
  /** CSS gradient value used as the card background */
  gradient: string
  /** Accent tint (single rgba string) for the card overlay */
  accentTint: string
}

export interface ServiceDetail {
  slug: string
  index: string
  eyebrow: string
  /** Use \n to force a line break in the hero heading */
  title: string
  tagline: string
  intro: string
  overview: {
    heading: string
    body: string
  }
  capabilities: ServiceCapabilityItem[]
  deliverables: string[]
  projects: ServiceProject[]
  cta: {
    heading: string
    subheading: string
    label: string
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const serviceDetails: ServiceDetail[] = [
  // ── 01 Web Experience ────────────────────────────────────────────────────
  {
    slug: 'web-experience',
    index: '01',
    eyebrow: 'Web Experience',
    title: 'WEB\nEXPERIENCE',
    tagline: 'Where strategy meets craft.',
    intro:
      'Strategic websites and digital experiences designed to position brands, communicate clearly and convert with intention.',
    overview: {
      heading: 'Not just a website.\nA brand asset.',
      body: 'We approach every web project as a business problem first. What does this brand need to communicate? Who needs to feel compelled by it? How does it perform under pressure?\n\nThen we build. Structure, aesthetics and technology converge into an experience that feels effortless for the visitor and works hard for the business.',
    },
    capabilities: [
      {
        title: 'Strategy & Architecture',
        description:
          'We map the full user journey before a single line of code is written. Content hierarchy, conversion logic and navigation — all decided with clear intent.',
      },
      {
        title: 'Design & Motion',
        description:
          'Editorial layouts, refined typography and purposeful motion that makes your brand feel premium, considered and unmistakably intentional.',
      },
      {
        title: 'Engineering & Performance',
        description:
          'Modern development stack built for speed, scalability and clean code. Fast to load, easy to manage, built to last.',
      },
    ],
    deliverables: [
      'Website strategy',
      'UX / UI design',
      'Conversion architecture',
      'Responsive web design',
      'Website development',
      'CMS implementation',
      'Landing pages',
      'Performance optimization',
      'Analytics setup',
    ],
    projects: [
      {
        title: 'Ardent Studio',
        category: 'Branding + Web',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 28% 38%, rgba(159,0,74,0.38) 0%, transparent 62%), linear-gradient(155deg, #0e0608 0%, #1a0c14 100%)',
        accentTint: 'rgba(159,0,74,0.18)',
      },
      {
        title: 'Forma Lab',
        category: 'Web Experience',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 72% 28%, rgba(80,0,120,0.32) 0%, transparent 62%), linear-gradient(225deg, #07090f 0%, #0e1020 100%)',
        accentTint: 'rgba(80,0,120,0.18)',
      },
      {
        title: 'Nucleus',
        category: 'Product + Web',
        year: '2023',
        gradient:
          'radial-gradient(ellipse at 50% 62%, rgba(159,0,74,0.28) 0%, transparent 58%), linear-gradient(160deg, #0a0a0a 0%, #14080e 100%)',
        accentTint: 'rgba(159,0,74,0.12)',
      },
    ],
    cta: {
      heading: "Let's build something\nthat works.",
      subheading:
        "Tell us about your project and we'll show you exactly how we approach it.",
      label: 'Start a conversation',
    },
  },

  // ── 02 Brand Identity ────────────────────────────────────────────────────
  {
    slug: 'brand-identity',
    index: '02',
    eyebrow: 'Brand Identity',
    title: 'BRAND\nIDENTITY',
    tagline: 'Presence before words.',
    intro:
      'Identity systems that create recognition, coherence and distinction across every touchpoint.',
    overview: {
      heading: 'A brand that\ncannot be ignored.',
      body: "Your brand is the first thing people feel before they read a single word. We craft visual identities that are strategic, coherent and built to endure — from the core mark to every touchpoint that follows.\n\nDistinction isn't an aesthetic choice. It's a competitive advantage.",
    },
    capabilities: [
      {
        title: 'Brand Strategy & Positioning',
        description:
          'We define what your brand stands for, who it speaks to and how it communicates. The strategic foundation that makes everything else hold.',
      },
      {
        title: 'Visual Identity Design',
        description:
          'A complete visual system built around your brand\'s essence — logo and mark, color palette, typography, art direction and graphic language.',
      },
      {
        title: 'Brand Systems & Guidelines',
        description:
          'Every rule, every use case, every application — documented and systematized so your brand stays coherent across every team and every touchpoint.',
      },
    ],
    deliverables: [
      'Brand strategy',
      'Positioning framework',
      'Visual identity design',
      'Logo system',
      'Color & typography systems',
      'Art direction',
      'Brand guidelines',
      'Digital brand assets',
    ],
    projects: [
      {
        title: 'Mara Collective',
        category: 'Brand Identity',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 35% 45%, rgba(100,0,60,0.42) 0%, transparent 65%), linear-gradient(145deg, #0e0610 0%, #180a14 100%)',
        accentTint: 'rgba(100,0,60,0.2)',
      },
      {
        title: 'Strata Labs',
        category: 'Identity + Web',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 65% 30%, rgba(50,0,100,0.35) 0%, transparent 60%), linear-gradient(200deg, #080810 0%, #100c18 100%)',
        accentTint: 'rgba(50,0,100,0.18)',
      },
      {
        title: 'Oleum',
        category: 'Brand Strategy + Identity',
        year: '2023',
        gradient:
          'radial-gradient(ellipse at 42% 55%, rgba(140,0,50,0.3) 0%, transparent 60%), linear-gradient(170deg, #0c0808 0%, #180e0c 100%)',
        accentTint: 'rgba(140,0,50,0.15)',
      },
    ],
    cta: {
      heading: "Let's build your\nidentity.",
      subheading:
        "Tell us who you are and what you want to become. We'll take it from there.",
      label: 'Start a conversation',
    },
  },

  // ── 03 Ecommerce ──────────────────────────────────────────────────────────
  {
    slug: 'ecommerce',
    index: '03',
    eyebrow: 'Ecommerce',
    title: 'ECOMMERCE',
    tagline: 'Built to convert, designed to trust.',
    intro:
      'Premium online stores built for trust, conversion and seamless buying experiences.',
    overview: {
      heading: 'Friction costs you sales.\nWe remove it.',
      body: "An online store should feel as good as buying in person. We build commerce experiences that guide customers naturally from discovery to purchase — removing every point of resistance along the way.\n\nPerformance and design are inseparable. A beautiful store that doesn't convert isn't a store. It's a gallery.",
    },
    capabilities: [
      {
        title: 'Commerce Strategy & UX',
        description:
          'We design the full buying journey — from landing to checkout — with conversion architecture and friction-removal at every step.',
      },
      {
        title: 'Store Design & Development',
        description:
          'Premium Shopify and WooCommerce experiences built for conversion, speed and a level of design that makes people trust and buy.',
      },
      {
        title: 'Performance & Optimization',
        description:
          'Post-launch, we measure, test and refine. CRO, A/B testing, analytics and continuous iteration to maximize revenue.',
      },
    ],
    deliverables: [
      'Ecommerce strategy',
      'Store design',
      'Shopify / WooCommerce',
      'Product page optimization',
      'Checkout experience',
      'Conversion optimization (CRO)',
      'Ecommerce analytics',
      'Payment & shipping integrations',
    ],
    projects: [
      {
        title: 'Ceret Studio',
        category: 'Ecommerce + Brand',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 30% 50%, rgba(159,0,74,0.35) 0%, transparent 60%), linear-gradient(150deg, #0e0808 0%, #1a0e0c 100%)',
        accentTint: 'rgba(159,0,74,0.16)',
      },
      {
        title: 'Planta',
        category: 'Shopify Store',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 68% 35%, rgba(0,80,60,0.3) 0%, transparent 58%), linear-gradient(210deg, #060e0a 0%, #0a1410 100%)',
        accentTint: 'rgba(0,80,60,0.15)',
      },
      {
        title: 'Velour',
        category: 'Ecommerce Redesign',
        year: '2023',
        gradient:
          'radial-gradient(ellipse at 50% 40%, rgba(90,0,80,0.32) 0%, transparent 62%), linear-gradient(165deg, #0a0810 0%, #140c18 100%)',
        accentTint: 'rgba(90,0,80,0.16)',
      },
    ],
    cta: {
      heading: "Let's build your\nstore.",
      subheading:
        'Tell us about your product and we\'ll design an experience that sells.',
      label: 'Start a conversation',
    },
  },

  // ── 04 Marketing ─────────────────────────────────────────────────────────
  {
    slug: 'marketing',
    index: '04',
    eyebrow: 'Marketing',
    title: 'MARKETING',
    tagline: 'Visibility that compounds.',
    intro:
      'Growth systems focused on visibility, acquisition and performance across digital channels.',
    overview: {
      heading: 'Growth built\non systems.',
      body: "Growth doesn't happen by accident. We build data-driven marketing systems that put your brand in front of the right people, at the right moment, with the right message.\n\nSEO, paid media and performance strategy work together with one goal: results that don't just spike — they compound.",
    },
    capabilities: [
      {
        title: 'SEO & Content Strategy',
        description:
          'We build search visibility that accumulates over time — technical SEO, content architecture and keyword strategy working in concert.',
      },
      {
        title: 'Paid Media & Performance',
        description:
          'Precision-targeted paid campaigns across Google, Meta and beyond — built around ROI, measured rigorously and optimized continuously.',
      },
      {
        title: 'Analytics & Growth Systems',
        description:
          'Conversion tracking, attribution modeling and marketing analytics that give you real intelligence on what moves the needle.',
      },
    ],
    deliverables: [
      'SEO strategy',
      'Technical SEO',
      'Paid advertising',
      'SEM campaigns',
      'Landing page optimization',
      'Conversion tracking',
      'Marketing analytics',
      'Growth strategy',
    ],
    projects: [
      {
        title: 'Kora Skin',
        category: 'Growth + SEO',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 38% 42%, rgba(159,0,74,0.3) 0%, transparent 60%), linear-gradient(145deg, #0e0808 0%, #180c10 100%)',
        accentTint: 'rgba(159,0,74,0.14)',
      },
      {
        title: 'Trellis Co.',
        category: 'Performance Marketing',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 65% 40%, rgba(0,60,120,0.28) 0%, transparent 60%), linear-gradient(200deg, #060810 0%, #0a0e1a 100%)',
        accentTint: 'rgba(0,60,120,0.14)',
      },
      {
        title: 'Moderno',
        category: 'Paid Media + SEO',
        year: '2023',
        gradient:
          'radial-gradient(ellipse at 50% 55%, rgba(100,0,100,0.28) 0%, transparent 58%), linear-gradient(160deg, #0a080c 0%, #140a16 100%)',
        accentTint: 'rgba(100,0,100,0.14)',
      },
    ],
    cta: {
      heading: "Let's grow\nyour brand.",
      subheading:
        "Tell us where you are and where you want to go. We'll build the system to get you there.",
      label: 'Start a conversation',
    },
  },

  // ── 05 Content ────────────────────────────────────────────────────────────
  {
    slug: 'content',
    index: '05',
    eyebrow: 'Content',
    title: 'CONTENT',
    tagline: 'Perception is the product.',
    intro:
      'Creative and strategic content that shapes perception, drives engagement and strengthens brand presence.',
    overview: {
      heading: 'Content that earns\nattention.',
      body: "Content is the voice of your brand — and it needs to do more than fill space. We build creative and strategic content systems that communicate with clarity, build genuine authority and keep audiences coming back.\n\nFrom copywriting to visual storytelling, every piece works harder and says more.",
    },
    capabilities: [
      {
        title: 'Content Strategy',
        description:
          'We define the architecture — what to say, to whom, when and how. Strategy that connects every content decision to a business outcome.',
      },
      {
        title: 'Creative Production',
        description:
          'From web copy to campaign assets, editorial content to social — everything produced at a standard of excellence that reflects the brand.',
      },
      {
        title: 'Brand Storytelling',
        description:
          'The narrative that defines who you are, what you believe and why it matters — told with consistency across every channel.',
      },
    ],
    deliverables: [
      'Content strategy',
      'Website copywriting',
      'SEO content',
      'Social media content',
      'Visual content direction',
      'Creative assets for campaigns',
      'Editorial content production',
    ],
    projects: [
      {
        title: 'Lunar Agency',
        category: 'Brand Content',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 35% 38%, rgba(80,0,120,0.35) 0%, transparent 62%), linear-gradient(150deg, #08060e 0%, #120c1a 100%)',
        accentTint: 'rgba(80,0,120,0.18)',
      },
      {
        title: 'Mara Collective',
        category: 'Social + Editorial',
        year: '2024',
        gradient:
          'radial-gradient(ellipse at 62% 45%, rgba(159,0,74,0.32) 0%, transparent 60%), linear-gradient(210deg, #0e0608 0%, #1a0c14 100%)',
        accentTint: 'rgba(159,0,74,0.16)',
      },
      {
        title: 'Esfera',
        category: 'Content Direction',
        year: '2023',
        gradient:
          'radial-gradient(ellipse at 45% 58%, rgba(0,80,100,0.3) 0%, transparent 58%), linear-gradient(165deg, #060a0c 0%, #0a1016 100%)',
        accentTint: 'rgba(0,80,100,0.15)',
      },
    ],
    cta: {
      heading: "Let's tell\nyour story.",
      subheading:
        "Tell us about your brand and the audience you're trying to reach.",
      label: 'Start a conversation',
    },
  },
]
