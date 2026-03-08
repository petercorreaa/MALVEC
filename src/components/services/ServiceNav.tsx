import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ServiceNavProps {
  serviceName: string
}

// ─── Easing ───────────────────────────────────────────────────────────────────
const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const

export default function ServiceNav({ serviceName }: ServiceNavProps) {
  const scrollRef = useRef<boolean>(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      if (scrolled !== scrollRef.current) {
        scrollRef.current = scrolled
        if (navRef.current) {
          navRef.current.style.background = scrolled
            ? 'rgba(10, 10, 10, 0.88)'
            : 'rgba(10, 10, 10, 0.0)'
          navRef.current.style.borderBottomColor = scrolled
            ? 'rgba(239, 238, 230, 0.06)'
            : 'transparent'
          navRef.current.style.backdropFilter = scrolled ? 'blur(24px)' : 'blur(0px)'
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      ref={navRef}
      aria-label="Service page navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '72px',
        background: 'rgba(10, 10, 10, 0.0)',
        borderBottom: '1px solid transparent',
        transition:
          'background 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease',
      }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      {/* Logo */}
      <a
        href="/"
        aria-label="MALVEC — back to home"
        style={{
          fontFamily: "'Degular Display', sans-serif",
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          color: '#efeee6',
          textDecoration: 'none',
        }}
      >
        MALVEC
      </a>

      {/* Breadcrumb */}
      <span
        aria-hidden="true"
        style={{
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(239,238,230,0.28)',
          display: 'none',
        }}
        className="md:block"
      >
        Services / {serviceName}
      </span>

      {/* Right links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <a
          href="/#services"
          style={{
            fontSize: '12px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(239,238,230,0.45)',
            textDecoration: 'none',
            transition: 'color 0.25s ease',
          }}
          onMouseEnter={e =>
            ((e.target as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.9)')
          }
          onMouseLeave={e =>
            ((e.target as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.45)')
          }
        >
          All Services
        </a>

        <a
          href="/#contact"
          style={{
            fontSize: '12px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: '#efeee6',
            textDecoration: 'none',
            padding: '9px 22px',
            borderRadius: '100px',
            border: '1px solid rgba(239,238,230,0.18)',
            transition: 'background 0.25s ease, border-color 0.25s ease',
          }}
          onMouseEnter={e => {
            const el = e.target as HTMLAnchorElement
            el.style.background = 'rgba(239,238,230,0.08)'
            el.style.borderColor = 'rgba(239,238,230,0.35)'
          }}
          onMouseLeave={e => {
            const el = e.target as HTMLAnchorElement
            el.style.background = 'transparent'
            el.style.borderColor = 'rgba(239,238,230,0.18)'
          }}
        >
          Contact
        </a>
      </div>
    </motion.nav>
  )
}
