import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ServiceOverviewProps {
  heading: string
  body: string
}

const EASE_OUT    = [0.25, 0.46, 0.45, 0.94] as const
const EASE_REVEAL = [0.22, 1,    0.36, 1    ] as const

export default function ServiceOverview({ heading, body }: ServiceOverviewProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const headingLines = heading.split('\n')
  // Split paragraphs on \n\n
  const paragraphs = body.split('\n\n')

  return (
    <section
      id="overview"
      ref={ref}
      style={{
        background: '#0d0d0d',
        padding: 'clamp(80px, 10vw, 140px) 48px',
        borderTop: '1px solid rgba(239,238,230,0.05)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="overview-grid"
      >
        {/* Left — large heading */}
        <div style={{ position: 'sticky', top: '100px' }}>
          {/* Section label */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '40px',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
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
              Overview
            </span>
          </motion.div>

          {/* Heading — mask reveal */}
          <div>
            {headingLines.map((line, i) => (
              <div
                key={i}
                style={{ overflow: 'hidden', paddingBottom: '0.04em' }}
              >
                <motion.h2
                  style={{
                    display: 'block',
                    fontFamily: "'Degular Display', sans-serif",
                    fontSize: 'clamp(32px, 3.6vw, 58px)',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.05,
                    color: '#efeee6',
                  }}
                  initial={{ y: '106%' }}
                  animate={isInView ? { y: '0%' } : {}}
                  transition={{
                    duration: 0.75,
                    delay: 0.1 + i * 0.1,
                    ease: EASE_REVEAL,
                  }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>
        </div>

        {/* Right — body copy */}
        <div style={{ paddingTop: '80px' }}>
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              style={{
                fontSize: 'clamp(15px, 1.4vw, 18px)',
                lineHeight: 1.75,
                color: 'rgba(239,238,230,0.6)',
                letterSpacing: '-0.01em',
                marginBottom: i < paragraphs.length - 1 ? '28px' : 0,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: EASE_OUT }}
            >
              {para}
            </motion.p>
          ))}

          {/* Subtle divider */}
          <motion.div
            style={{
              width: '48px',
              height: '1px',
              background: 'rgba(159,0,74,0.5)',
              marginTop: '48px',
            }}
            initial={{ scaleX: 0, originX: '0%' }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE_OUT }}
          />
        </div>
      </div>

      {/* Mobile stacking via inline style override */}
      <style>{`
        @media (max-width: 768px) {
          .overview-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .overview-grid > div:first-child {
            position: static !important;
          }
          .overview-grid > div:last-child {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
