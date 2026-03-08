import { useRef } from 'react'
import { motion } from 'framer-motion'

interface ServiceHeroProps {
  index: string
  eyebrow: string
  /** Use \n to split the heading across two lines */
  title: string
  tagline: string
  intro: string
}

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE_OUT    = [0.25, 0.46, 0.45, 0.94] as const
const EASE_REVEAL = [0.22, 1,    0.36, 1    ] as const

// ─── Abstract visual composition ─────────────────────────────────────────────
// Three overlapping rounded blocks — pure CSS — positioned absolutely
function HeroVisual({ index }: { index: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        right: '5%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'clamp(260px, 28vw, 440px)',
        aspectRatio: '3 / 4',
        pointerEvents: 'none',
      }}
    >
      {/* Primary block */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '28px',
          background:
            'linear-gradient(155deg, rgba(239,238,230,0.024) 0%, rgba(239,238,230,0.008) 100%)',
          border: '1px solid rgba(239,238,230,0.055)',
        }}
      />

      {/* Accent gradient band */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '-8%',
          right: '18%',
          height: '32%',
          borderRadius: '18px',
          background:
            'linear-gradient(135deg, rgba(159,0,74,0.22) 0%, rgba(80,0,120,0.14) 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* Small pill accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '-6%',
          width: '42%',
          height: '10%',
          borderRadius: '100px',
          background: 'rgba(159,0,74,0.12)',
          border: '1px solid rgba(159,0,74,0.18)',
        }}
      />

      {/* Horizontal rule */}
      <div
        style={{
          position: 'absolute',
          bottom: '35%',
          left: '14%',
          right: '14%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(239,238,230,0.1) 40%, rgba(239,238,230,0.1) 60%, transparent 100%)',
        }}
      />

      {/* Ghost index number inside the block */}
      <span
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '28px',
          fontFamily: "'Degular Display', sans-serif",
          fontSize: 'clamp(72px, 8vw, 110px)',
          fontWeight: 700,
          color: 'rgba(239,238,230,0.04)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
      >
        {index}
      </span>

      {/* Top label */}
      <span
        style={{
          position: 'absolute',
          top: '24px',
          left: '28px',
          fontSize: '10px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'rgba(239,238,230,0.18)',
          fontFamily: "'Helvetica Neue', sans-serif",
        }}
      >
        MALVEC
      </span>
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ServiceHero({
  index,
  eyebrow,
  title,
  tagline,
  intro,
}: ServiceHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleLines = title.split('\n')

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '130px 48px 80px',
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient orb — right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-15%',
          top: '-10%',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(159,0,74,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient gradient orb — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-10%',
          bottom: '0%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(80,0,120,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Abstract visual composition — desktop only */}
      <HeroVisual index={index} />

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
        >
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '1px',
              background: '#9f004a',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#9f004a',
            }}
          >
            {index} — {eyebrow}
          </span>
        </motion.div>

        {/* Title — mask reveal, line by line */}
        <div style={{ marginBottom: '48px' }}>
          {titleLines.map((line, i) => (
            <div
              key={i}
              style={{ overflow: 'hidden', lineHeight: 1, paddingBottom: '0.04em' }}
            >
              <motion.h1
                style={{
                  display: 'block',
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(60px, 9.5vw, 148px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  color: '#efeee6',
                }}
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.85,
                  delay: 0.3 + i * 0.1,
                  ease: EASE_REVEAL,
                }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Tagline + intro — constrained width */}
        <div style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <motion.p
            style={{
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(239,238,230,0.32)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {tagline}
          </motion.p>

          <motion.p
            style={{
              fontSize: '17px',
              lineHeight: 1.65,
              color: 'rgba(239,238,230,0.65)',
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78, ease: EASE_OUT }}
          >
            {intro}
          </motion.p>

          {/* Scroll prompt */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '16px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <a
              href="#overview"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(239,238,230,0.38)',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.7)')
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.38)')
              }
            >
              <span
                style={{
                  display: 'block',
                  width: '1px',
                  height: '32px',
                  background: 'rgba(239,238,230,0.14)',
                }}
              />
              Explore
            </a>
          </motion.div>
        </div>
      </div>

      {/* Ghost index watermark — background */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-2%',
          bottom: '-4%',
          fontFamily: "'Degular Display', sans-serif",
          fontSize: 'clamp(160px, 26vw, 400px)',
          fontWeight: 700,
          color: 'rgba(239,238,230,0.018)',
          lineHeight: 1,
          letterSpacing: '-0.06em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {index}
      </span>
    </section>
  )
}
