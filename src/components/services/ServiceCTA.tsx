import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ServiceCTAProps {
  heading: string
  subheading: string
  label: string
}

const EASE_OUT    = [0.25, 0.46, 0.45, 0.94] as const
const EASE_REVEAL = [0.22, 1,    0.36, 1    ] as const

export default function ServiceCTA({ heading, subheading, label }: ServiceCTAProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const headingLines = heading.split('\n')

  return (
    <section
      ref={ref}
      style={{
        background: '#0a0a0a',
        padding: 'clamp(100px, 12vw, 180px) 48px',
        borderTop: '1px solid rgba(239,238,230,0.05)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(159,0,74,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
      >
        {/* Label */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '1px',
              background: 'rgba(239,238,230,0.15)',
            }}
          />
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(239,238,230,0.28)',
            }}
          >
            Start a project
          </span>
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '1px',
              background: 'rgba(239,238,230,0.15)',
            }}
          />
        </motion.div>

        {/* Heading — mask reveal */}
        <div style={{ marginBottom: '32px' }}>
          {headingLines.map((line, i) => (
            <div
              key={i}
              style={{ overflow: 'hidden', paddingBottom: '0.04em', display: 'block' }}
            >
              <motion.h2
                style={{
                  display: 'block',
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(40px, 5.5vw, 88px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                  color: '#efeee6',
                }}
                initial={{ y: '106%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: EASE_REVEAL }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Subheading */}
        <motion.p
          style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            lineHeight: 1.7,
            color: 'rgba(239,238,230,0.45)',
            letterSpacing: '-0.01em',
            maxWidth: '480px',
            marginBottom: '52px',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
        >
          {subheading}
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.52, ease: EASE_OUT }}
        >
          <a
            href="/#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 40px',
              borderRadius: '100px',
              background: '#efeee6',
              color: '#0a0a0a',
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
              boxShadow: '0 0 0 0 rgba(239,238,230,0)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#fff'
              el.style.transform = 'scale(1.03)'
              el.style.boxShadow = '0 12px 40px rgba(239,238,230,0.12)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#efeee6'
              el.style.transform = 'scale(1)'
              el.style.boxShadow = '0 0 0 0 rgba(239,238,230,0)'
            }}
          >
            {label}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M1 7h12M7 1l6 6-6 6"
                stroke="#0a0a0a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

        {/* Footer-level nav */}
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(239,238,230,0.06)',
            width: '100%',
            justifyContent: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.65, ease: EASE_OUT }}
        >
          {[
            { label: 'Home', href: '/' },
            { label: 'All Services', href: '/#services' },
            { label: 'About', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(239,238,230,0.28)',
                textDecoration: 'none',
                transition: 'color 0.22s ease',
              }}
              onMouseEnter={e =>
                ((e.target as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.7)')
              }
              onMouseLeave={e =>
                ((e.target as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.28)')
              }
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
