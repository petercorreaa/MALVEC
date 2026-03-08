import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ServiceCapabilityItem } from '../../data/services'

interface ServiceCapabilitiesProps {
  capabilities: ServiceCapabilityItem[]
  deliverables: string[]
}

const EASE_OUT    = [0.25, 0.46, 0.45, 0.94] as const
const EASE_REVEAL = [0.22, 1,    0.36, 1    ] as const

export default function ServiceCapabilities({
  capabilities,
  deliverables,
}: ServiceCapabilitiesProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        background: '#0a0a0a',
        padding: 'clamp(80px, 10vw, 140px) 48px',
        borderTop: '1px solid rgba(239,238,230,0.05)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Section header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 'clamp(60px, 7vw, 100px)',
            paddingBottom: '32px',
            borderBottom: '1px solid rgba(239,238,230,0.07)',
          }}
          className="caps-header"
        >
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1px',
                background: 'rgba(239,238,230,0.2)',
              }}
            />
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(239,238,230,0.3)',
              }}
            >
              Capabilities
            </span>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              style={{
                fontFamily: "'Degular Display', sans-serif",
                fontSize: 'clamp(28px, 3vw, 48px)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#efeee6',
              }}
              initial={{ y: '106%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE_REVEAL }}
            >
              What we do.
            </motion.h2>
          </div>
        </div>

        {/* Two-column layout: capability cards | deliverables list */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: 'clamp(48px, 6vw, 96px)',
            alignItems: 'start',
          }}
          className="caps-grid"
        >
          {/* Left — capability cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                style={{
                  padding: '36px 0',
                  borderBottom: '1px solid rgba(239,238,230,0.06)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px',
                  alignItems: 'start',
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: EASE_OUT }}
                className="cap-card-inner"
              >
                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Degular Display', sans-serif",
                    fontSize: 'clamp(18px, 1.8vw, 24px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#efeee6',
                    lineHeight: 1.2,
                  }}
                >
                  {cap.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: 'rgba(239,238,230,0.52)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right — deliverables list */}
          <motion.div
            style={{
              padding: '36px 32px',
              background: 'rgba(239,238,230,0.028)',
              borderRadius: '20px',
              border: '1px solid rgba(239,238,230,0.06)',
              position: 'sticky',
              top: '100px',
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: EASE_OUT }}
          >
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(239,238,230,0.3)',
                marginBottom: '28px',
              }}
            >
              Deliverables
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {deliverables.map((item, i) => (
                <motion.li
                  key={item}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 0',
                    borderBottom: i < deliverables.length - 1
                      ? '1px solid rgba(239,238,230,0.055)'
                      : 'none',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(239,238,230,0.55)',
                    fontWeight: 500,
                  }}
                  initial={{ opacity: 0, x: 8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: EASE_OUT }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'rgba(159,0,74,0.6)',
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .caps-grid {
            grid-template-columns: 1fr !important;
          }
          .caps-grid > div:last-child {
            position: static !important;
          }
        }
        @media (max-width: 640px) {
          .cap-card-inner {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .caps-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
