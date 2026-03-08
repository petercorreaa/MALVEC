export interface Service {
  id: string
  index: string
  name: string
  tagline: string
  description: string
  capabilities: string[]
  tags: string[]
  cta: string
  ctaHref: string
}

export const services: Service[] = [
  {
    id: 'web-experience',
    index: '01',
    name: 'Web Experience',
    tagline: 'Where strategy meets craft.',
    description:
      'We design and build websites where every decision — from layout to motion — serves a purpose. Structure, aesthetics and technology converge into experiences that feel effortless for the user and powerful for the brand. The result is a digital presence that doesn\'t just look good, but performs.',
    capabilities: [
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
    tags: ['Websites', 'Landing Pages', 'UX/UI', 'Development', 'Strategy'],
    cta: 'View service',
    ctaHref: '#contact',
  },
  {
    id: 'brand-identity',
    index: '02',
    name: 'Brand Identity',
    tagline: 'Presence before words.',
    description:
      'Your brand is the first thing people feel before they read a single word. We craft visual identities that are strategic, coherent and built to last — from logo and color system to typography and brand voice. Everything aligned to make your brand impossible to ignore.',
    capabilities: [
      'Brand strategy',
      'Positioning',
      'Visual identity design',
      'Logo system',
      'Color & typography systems',
      'Art direction',
      'Brand guidelines',
      'Brand assets for digital',
    ],
    tags: ['Visual Identity', 'Logo', 'Typography', 'Color System', 'Brand Guidelines'],
    cta: 'View service',
    ctaHref: '#contact',
  },
  {
    id: 'ecommerce',
    index: '03',
    name: 'Ecommerce',
    tagline: 'Built to convert, designed to trust.',
    description:
      'An online store should feel as good as buying in person. We build commerce experiences that guide customers naturally from discovery to purchase — removing friction, building confidence and turning browsers into buyers. Performance and design, inseparable.',
    capabilities: [
      'Ecommerce strategy',
      'Store design',
      'Shopify / WooCommerce',
      'Product page optimization',
      'Checkout experience',
      'Conversion optimization (CRO)',
      'Ecommerce analytics',
      'Payment & shipping integrations',
    ],
    tags: ['Shopify', 'Product Pages', 'CRO', 'Checkout UX', 'Catalog Design'],
    cta: 'View service',
    ctaHref: '#contact',
  },
  {
    id: 'marketing',
    index: '04',
    name: 'Marketing',
    tagline: 'Visibility that compounds.',
    description:
      'Growth doesn\'t happen by accident. We design data-driven marketing systems that put your brand in front of the right people, at the right moment, with the right message. SEO, paid media and performance strategy working together with one goal: results that compound.',
    capabilities: [
      'SEO strategy',
      'Technical SEO',
      'Paid advertising',
      'SEM campaigns',
      'Landing page optimization',
      'Conversion tracking',
      'Marketing analytics',
      'Growth strategy',
    ],
    tags: ['SEO', 'Paid Media', 'Strategy', 'Campaigns', 'Analytics'],
    cta: 'View service',
    ctaHref: '#contact',
  },
  {
    id: 'content',
    index: '05',
    name: 'Content',
    tagline: 'Perception is the product.',
    description:
      'Content is the voice of your brand — and it needs to earn attention. We develop content strategies and creative systems that communicate with clarity, build genuine authority and keep your audience coming back. From copywriting to visual storytelling, every piece works harder.',
    capabilities: [
      'Content strategy',
      'Website copywriting',
      'SEO content',
      'Social media content',
      'Visual content direction',
      'Creative assets for campaigns',
      'Editorial content production',
    ],
    tags: ['Social Content', 'Creative Direction', 'Copywriting', 'Brand Content', 'Campaign Assets'],
    cta: 'View service',
    ctaHref: '#contact',
  },
]
