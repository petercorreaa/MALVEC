import { AnimatePresence, motion } from 'framer-motion'
import { type Service } from '../../data/serviceData'

interface ServicePreviewProps {
  service: Service
}

// ─── Easing curves ───────────────────────────────────────────────────────────
const EASE_OUT    = [0.25, 0.46, 0.45, 0.94] as const  // smooth deceleration
const EASE_IN     = [0.55, 0,    1,    0.45]  as const  // accelerates out
const EASE_REVEAL = [0.22, 1,    0.36, 1]     as const  // expo-out, mask flip

// ─── Variants ────────────────────────────────────────────────────────────────

// Outer container: stagger orchestration only — no transforms on the wrapper
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1 as const,
    },
  },
}

// Standard item: opacity + subtle translateY
const itemVariants = {
  hidden:   { opacity: 0, y: 14 },
  visible:  { opacity: 1, y: 0,  transition: { duration: 0.5,  ease: EASE_OUT } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.2,  ease: EASE_IN  } },
}

// Tagline: faster, tighter travel
const taglineVariants = {
  hidden:   { opacity: 0, y: 10 },
  visible:  { opacity: 1, y: 0,  transition: { duration: 0.38, ease: EASE_OUT } },
  exit:     { opacity: 0, y: -6, transition: { duration: 0.16, ease: EASE_IN  } },
}

// Title: pure mask reveal — slides up into overflow:hidden clip, no opacity needed
const titleRevealVariants = {
  hidden:   { y: '106%' },
  visible:  { y: '0%',    transition: { duration: 0.62, ease: EASE_REVEAL } },
  exit:     { y: '-106%', transition: { duration: 0.22, ease: EASE_IN     } },
}

// Separator line: draws in from left, retracts to right on exit
const lineVariants = {
  hidden:   { scaleX: 0, originX: '0%' as const  },
  visible:  { scaleX: 1, originX: '0%' as const,  transition: { duration: 0.5,  ease: EASE_OUT } },
  exit:     { scaleX: 0, originX: '100%' as const, transition: { duration: 0.18, ease: EASE_IN  } },
}

// Individual tags: staggered via custom prop
const tagVariants = {
  hidden:   { opacity: 0, y: 8  },
  visible:  (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE_OUT, delay: i * 0.045 },
  }),
  exit:     { opacity: 0, y: -4, transition: { duration: 0.15, ease: EASE_IN } },
}

// Ghost watermark number
const ghostVariants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: EASE_OUT } },
  exit:    { opacity: 0, x: -16, transition: { duration: 0.2,  ease: EASE_IN  } },
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ServicePreview({ service }: ServicePreviewProps) {
  return (
    <div className="service-preview relative h-full flex flex-col justify-center">

      {/* Ghost index watermark */}
      <AnimatePresence mode="wait">
        <motion.span
          key={`ghost-${service.id}`}
          className="absolute -top-6 right-0 select-none pointer-events-none font-bold"
          style={{
            fontFamily: "'Degular Display', sans-serif",
            fontSize: 'clamp(110px, 16vw, 200px)',
            color: 'rgba(22,0,38,0.038)',
            lineHeight: 1,
          }}
          variants={ghostVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {service.index}
        </motion.span>
      </AnimatePresence>

      {/* Main content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={service.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10"
        >

          {/* Tagline */}
          <motion.p
            variants={taglineVariants}
            className="text-[11px] tracking-[0.28em] uppercase font-medium mb-5"
            style={{ color: '#92004a' }}
          >
            {service.tagline}
          </motion.p>

          {/* Title — overflow-hidden parent clips the upward reveal */}
          <div className="overflow-hidden mb-6" style={{ paddingBottom: '0.04em' }}>
            <motion.h3
              variants={titleRevealVariants}
              className="font-bold leading-[1.0]"
              style={{
                fontFamily: "'Degular Display', sans-serif",
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                color: '#160026',
                letterSpacing: '-0.02em',
              }}
            >
              {service.name}
            </motion.h3>
          </div>

          {/* Separator — draws in left-to-right */}
          <div className="mb-7 w-12 h-px overflow-hidden">
            <motion.div
              variants={lineVariants}
              className="h-full w-full"
              style={{ background: 'rgba(22,0,38,0.18)' }}
            />
          </div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-[15px] leading-[1.78] mb-9 max-w-[460px]"
            style={{ color: 'rgba(22,0,38,0.62)' }}
          >
            {service.description}
          </motion.p>

          {/* Tags — each tag is its own staggered motion element */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-[7px] mb-10"
          >
            {service.tags.map((tag, i) => (
              <motion.span
                key={tag}
                custom={i}
                variants={tagVariants}
                className="px-4 py-[7px] text-[10px] tracking-[0.14em] uppercase rounded-full"
                style={{
                  border: '1px solid rgba(22,0,38,0.12)',
                  color: 'rgba(22,0,38,0.46)',
                  background: 'transparent',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <a
              href={service.ctaHref}
              className="inline-flex items-center gap-3 group"
              style={{ color: '#160026', textDecoration: 'none' }}
            >
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: '#160026', transition: 'letter-spacing 0.4s ease' }}
              >
                {service.cta}
              </span>

              {/* Expanding line */}
              <span
                className="relative h-px min-w-[44px]"
                style={{ background: 'rgba(22,0,38,0.18)' }}
              >
                <motion.span
                  className="absolute inset-0 origin-left"
                  style={{ background: '#92004a' }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.38, ease: EASE_OUT }}
                />
              </span>

              <span
                className="text-sm"
                style={{ color: '#92004a' }}
              >
                →
              </span>
            </a>
          </motion.div>

        </motion.div>
      </AnimatePresence>

      {/* Corner arc — decorative */}
      <svg
        className="absolute bottom-0 right-0 pointer-events-none"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <AnimatePresence>
          <motion.path
            key={`arc-${service.id}`}
            d="M 100 0 Q 100 100 0 100"
            stroke="rgba(146,0,74,0.08)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          />
        </AnimatePresence>
      </svg>

    </div>
  )
}

