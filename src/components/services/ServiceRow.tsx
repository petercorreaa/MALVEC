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

const EASE_OUT    = [0.25, 0.46, 0.45, 0.94] as const
const EASE_REVEAL = [0.22, 1,    0.36, 1    ] as const

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
        {/* ── Collapsed row (always visible) ── */}
        <div
          className="relative flex items-center px-12"
          style={{ minHeight: '150px' }}
        >
          {/* Left accent bar */}
          <motion.span
            className="absolute left-0 top-0 bottom-0 w-[5px]"
            style={{ background: '#92004a', transformOrigin: 'top' }}
            animate={{ scaleY: isActive ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Three-column row: name | spacer | index */}
          <div className="flex items-center w-full">

            {/* Service name — dual-layer mask reveal + tab shift */}
            <motion.div
              className="flex-1"
              style={{ overflow: 'hidden', paddingBottom: '0.04em', paddingLeft: '28px' }}
              animate={{ x: isActive ? 18 : 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Muted layer — sets height */}
              <motion.span
                className="block font-semibold leading-none select-none"
                style={{
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(20px, 2.4vw, 38px)',
                  letterSpacing: '-0.02em',
                }}
                animate={{ color: isActive ? 'transparent' : 'rgba(22,0,38,0.82)' }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                aria-hidden={isActive ? 'true' : undefined}
              >
                {service.name}
              </motion.span>

              {/* Active layer — clips upward */}
              <span className="absolute inset-0" style={{ overflow: 'hidden' }} aria-hidden="true">
                <motion.span
                  className="absolute inset-0 font-semibold leading-none flex items-center"
                  style={{
                    fontFamily: "'Degular Display', sans-serif",
                    fontSize: 'clamp(20px, 2.4vw, 38px)',
                    letterSpacing: '-0.02em',
                    color: '#160026',
                  }}
                  animate={{ y: isActive ? '0%' : '105%' }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                >
                  {service.name}
                </motion.span>
              </span>
            </motion.div>

            {/* Index + arrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: '32px' }}>
              <motion.span
                className="text-[1.4rem] tracking-[0.2em] font-mono tabular-nums"
                animate={{ color: isActive ? '#92004a' : 'rgba(22,0,38,0.28)' }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                {service.index}
              </motion.span>

              {/* Arrow — appears on hover */}
              <motion.span
                style={{
                  fontSize: '16px',
                  color: '#92004a',
                  display: 'block',
                  lineHeight: 1,
                }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                aria-hidden="true"
              >
                →
              </motion.span>
            </div>
          </div>
        </div>


      </motion.a>
    </motion.div>
  )
}
