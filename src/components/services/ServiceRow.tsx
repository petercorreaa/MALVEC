import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { type Service } from '../../data/serviceData'

interface ServiceRowProps {
  service: Service
  index: number
  isActive: boolean
  isMobile: boolean
  isInView: boolean
  onHover: (index: number | null) => void
}

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const

// Words cycled during the spin phase — generic enough to work for all services
const SPIN_POOL = ['Motion', 'Impact', 'Signal', 'Growth', 'Vision', 'Scale', 'Drive', 'Reach', 'Edge', 'Bold']

export default function ServiceRow({
  service,
  index,
  isActive,
  isMobile,
  isInView,
  onHover,
}: ServiceRowProps) {
  const slotRef   = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const t1Ref       = useRef<ReturnType<typeof setTimeout> | null>(null)
  const t2Ref       = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = slotRef.current
    if (!el) return

    // Clear any in-flight timers
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
    if (t1Ref.current)       { clearTimeout(t1Ref.current);        t1Ref.current = null }
    if (t2Ref.current)       { clearTimeout(t2Ref.current);        t2Ref.current = null }

    if (!isActive) {
      // Instant restore — no reverse animation
      el.style.transition = 'none'
      el.textContent = service.name
      el.style.transform = 'translateY(0)'
      el.style.opacity = '1'
      return
    }

    // ── Phase 1: spin ──────────────────────────────────────────
    const pool = SPIN_POOL.filter(w => w !== service.name)
    let spinCount = 0
    const SPINS = 3

    const showSpinWord = () => {
      const word = pool[spinCount % pool.length]
      // Snap to below, invisible
      el.style.transition = 'none'
      el.textContent = word
      el.style.transform = 'translateY(100%)'
      el.style.opacity = '0'
      void el.offsetHeight // force reflow
      // Slide up to centre, partially visible
      el.style.transition = 'transform 38ms ease, opacity 38ms ease'
      el.style.transform = 'translateY(0)'
      el.style.opacity = '0.45'
      // Continue upward and vanish
      t1Ref.current = setTimeout(() => {
        el.style.transition = 'transform 38ms ease, opacity 38ms ease'
        el.style.transform = 'translateY(-100%)'
        el.style.opacity = '0'
      }, 38)
    }

    showSpinWord()

    intervalRef.current = setInterval(() => {
      spinCount++
      if (spinCount >= SPINS) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null

        // ── Phase 2: land ────────────────────────────────────────
        t2Ref.current = setTimeout(() => {
          // Snap to below with actual name
          el.style.transition = 'none'
          el.textContent = service.name
          el.style.transform = 'translateY(100%)'
          el.style.opacity = '0'
          void el.offsetHeight
          // Slide to overshoot position with full opacity
          el.style.transition = 'transform 0.26s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.15s ease'
          el.style.transform = 'translateY(-4px)'
          el.style.opacity = '1'
          // Settle to rest
          t1Ref.current = setTimeout(() => {
            el.style.transition = 'transform 0.12s ease'
            el.style.transform = 'translateY(0)'
          }, 260)
        }, 30) // tiny gap so last spin word fully exits
      } else {
        showSpinWord()
      }
    }, 80)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (t1Ref.current)       clearTimeout(t1Ref.current)
      if (t2Ref.current)       clearTimeout(t2Ref.current)
    }
  }, [isActive, service.name])

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

            {/* Service name — slot machine reel */}
            <motion.div
              className="flex-1"
              style={{ overflow: 'hidden', paddingBottom: '0.04em', paddingLeft: '28px' }}
              animate={{ x: isActive ? 18 : 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Height anchor — always invisible but keeps row height stable */}
              <span
                className="block font-semibold leading-none select-none pointer-events-none"
                style={{
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(20px, 2.4vw, 38px)',
                  letterSpacing: '-0.02em',
                  visibility: 'hidden',
                  userSelect: 'none',
                }}
                aria-hidden="true"
              >
                {service.name}
              </span>

              {/* Slot span — driven imperatively */}
              <span
                ref={slotRef}
                className="absolute inset-0 font-semibold leading-none flex items-center"
                style={{
                  fontFamily: "'Degular Display', sans-serif",
                  fontSize: 'clamp(20px, 2.4vw, 38px)',
                  letterSpacing: '-0.02em',
                  color: '#160026',
                  willChange: 'transform, opacity',
                }}
                aria-hidden="true"
              >
                {service.name}
              </span>

              {/* Accessible label always present */}
              <span className="sr-only">{service.name}</span>
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
