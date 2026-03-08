import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { serviceDetails } from '../data/services'
import ServiceNav from '../components/services/ServiceNav'
import ServiceHero from '../components/services/ServiceHero'
import ServiceOverview from '../components/services/ServiceOverview'
import ServiceCapabilities from '../components/services/ServiceCapabilities'
import ServiceProjects from '../components/services/ServiceProjects'
import ServiceCTA from '../components/services/ServiceCTA'

// Page-level fade-in transition
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  // Scroll to top on every slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  const service = serviceDetails.find(s => s.slug === slug)

  if (!service) {
    return <Navigate to="/" replace />
  }

  // Readable name for the nav breadcrumb (remove newline)
  const readableName = service.title.replace('\n', ' ')

  return (
    <motion.main
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{ background: '#0a0a0a', minHeight: '100vh' }}
    >
      {/* Fixed navigation */}
      <ServiceNav serviceName={readableName} />

      {/* Hero — full screen dark opener */}
      <ServiceHero
        index={service.index}
        eyebrow={service.eyebrow}
        title={service.title}
        tagline={service.tagline}
        intro={service.intro}
      />

      {/* Strategic overview — 2-col */}
      <ServiceOverview
        heading={service.overview.heading}
        body={service.overview.body}
      />

      {/* Capabilities grid + deliverables list */}
      <ServiceCapabilities
        capabilities={service.capabilities}
        deliverables={service.deliverables}
      />

      {/* Selected work — large project cards */}
      <ServiceProjects projects={service.projects} />

      {/* Final CTA — full-width dark closer */}
      <ServiceCTA
        heading={service.cta.heading}
        subheading={service.cta.subheading}
        label={service.cta.label}
      />
    </motion.main>
  )
}
