import { motion } from 'framer-motion'
import { type Service } from '../../data/serviceData'

interface ServiceRowProps {
  service: Service
  index: number
  isActive: boolean
  isMobile: boolean
  isInView: boolean
  onHover: (index: number | null) => void
}

const EASE_OUT  = [0.25, 0.46, 0.45, 0.94] as const
const EASE_PUSH = [0.23, 1, 0.32, 1] as const
const PUSH_DUR  = 0.5

export default function ServiceRow({
  service,
  index,
  isActive,
  isMobile,
  isInView,
  onHover,
}: ServiceRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_OUT, delay: index * 0.07 }}
    >
      <motion.a
        href={`/services/${service.id}`}
        className="w-full text-left relative focus:outline-none block"
        style={{
          borderBottom: '1px solid rgba(22,0,38,0.08)',
          cursor: 'pointer',
          background: 'transparent',
          textDecoration: 'none',
          display: 'block',
        }}
        onHoverStart={() => onHover(index)}
        onHoverEnd={() => onHover(null)}
        aria-label={`${service.name} — view service detail`}
        initial={false}
      >
        {/* ── Row layout ── */}
        <div
          className="relative flex items-center px-12"
          style={{ minHeight: '150px' }}
        >
          {/* Left accent bar */}
          <motion.span
            className="absolute left-0 top-0 bottom-0 w-[5px]"
            style={{ background: '#92004a', transformOrigin: 'top' }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE_PUSH }}
          />

          {/* Three-column row: name | spacer | index */}
          <div className="flex items-center w-full">

            {/* Service name — slide-up push with two layers */}
            <div
              className="flex-1 relative"
              style={{
                overflow: 'hidden',
                paddingLeft: '48px',    /* mirrors the marginLeft: 32px on the number div */
              }}
            >
              {/* Invisible sizer — keeps row height stable at all times */}
              <span
                className="block font-semibold leading-none select-none pointer-events-none"
                style={{
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(20px, 2.4vw, 38px)',
                  letterSpacing: '-0.02em',
                  visibility: 'hidden',
                }}
                aria-hidden="true"
              >
                {service.name}
              </span>

              {/* Layer 1 — default visible, slides up on hover */}
              <motion.span
                className="absolute inset-0 font-semibold leading-none flex items-center"
                style={{
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(20px, 2.4vw, 38px)',
                  letterSpacing: '-0.02em',
                  color: '#160026',
                  paddingLeft: '48px',
                }}
                animate={{
                  y: isActive ? '-100%' : '0%',
                  opacity: isActive ? 0 : 1,
                }}
                transition={{ duration: PUSH_DUR, ease: EASE_PUSH }}
                aria-hidden="true"
              >
                {service.name}
              </motion.span>

              {/* Layer 2 — clone below, slides up into place on hover */}
              <motion.span
                className="absolute inset-0 font-semibold leading-none flex items-center"
                style={{
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(20px, 2.4vw, 38px)',
                  letterSpacing: '-0.02em',
                  color: '#160026',
                  paddingLeft: '48px',
                }}
                animate={{
                  y: isActive ? '0%' : '100%',
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: PUSH_DUR, ease: EASE_PUSH }}
                aria-hidden="true"
              >
                {service.name}
              </motion.span>

              {/* Screen-reader label */}
              <span className="sr-only">{service.name}</span>
            </div>

            {/* Index + arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0, marginLeft: '32px', paddingRight: '48px' }}>
              {/* Arrow — appears on hover, now sits left of the number */}
              <motion.span
                style={{ fontSize: '16px', color: '#92004a', display: 'block', lineHeight: 1, marginRight: '10px' }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                transition={{ duration: 0.8, ease: EASE_PUSH }}
                aria-hidden="true"
              >
                →
              </motion.span>

              <motion.span
                className="text-[1.4rem] tracking-[0.2em] font-mono tabular-nums"
                animate={{ color: isActive ? '#92004a' : 'rgba(22,0,38,0.28)' }}
                transition={{ duration: 0.8, ease: EASE_PUSH }}
              >
                {service.index}
              </motion.span>
            </div>
          </div>
        </div>

      </motion.a>
    </motion.div>
  )
}