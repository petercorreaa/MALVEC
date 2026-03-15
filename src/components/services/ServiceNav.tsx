import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface ServiceNavProps {
  serviceName: string
}

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const

export default function ServiceNav({ serviceName: _serviceName }: ServiceNavProps) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 50) {
          navRef.current.style.padding = '16px 48px'
        } else {
          navRef.current.style.padding = '24px 48px'
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
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      style={{
        position: 'fixed',
        top: '12px',
        left: '16px',
        right: '16px',
        zIndex: 500,
        padding: '24px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: 'rgba(22, 0, 38, 0.62)',
        border: '1px solid rgba(239, 238, 230, 0.20)',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.22)',
        transition: 'padding 0.4s ease',
      }}
    >
      {/* Logo — matches home page */}
      <a
        href="/"
        aria-label="MALVEC — back to home"
        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
      >
        <img
          src="/Logo_MALVEC_Completo.png"
          alt="Malvec"
          style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
        />
      </a>

      {/* Links — matches home page */}
      <ul
        style={{
          display: 'flex',
          gap: '36px',
          listStyle: 'none',
          alignItems: 'center',
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <a
            href="/#services"
            style={{
              color: 'rgba(239,238,230,0.6)',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#efeee6')}
            onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.6)')}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/#about"
            style={{
              color: 'rgba(239,238,230,0.6)',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#efeee6')}
            onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.6)')}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/#process"
            style={{
              color: 'rgba(239,238,230,0.6)',
              textDecoration: 'none',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => ((e.target as HTMLAnchorElement).style.color = '#efeee6')}
            onMouseLeave={e => ((e.target as HTMLAnchorElement).style.color = 'rgba(239,238,230,0.6)')}
          >
            Process
          </a>
        </li>
        <li>
          <a
            href="/#contact"
            style={{
              padding: '10px 24px',
              background: 'linear-gradient(270deg, #ff0040, #7b00ff, #ff0040, #c8000a, #7b00ff)',
              backgroundSize: '400% 400%',
              color: '#efeee6',
              borderRadius: '100px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textDecoration: 'none',
              animation: 'navCtaGradientMove 2.5s ease infinite, glowPulse 2.5s ease-in-out infinite',
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              const el = e.target as HTMLAnchorElement
              el.style.boxShadow = '0 0 30px 10px rgba(123, 0, 255, 0.6)'
            }}
            onMouseLeave={e => {
              const el = e.target as HTMLAnchorElement
              el.style.boxShadow = ''
            }}
          >
            Let's Work
          </a>
        </li>
      </ul>

      {/* Keyframe animations for the CTA button */}
      <style>{`
        @keyframes navCtaGradientMove {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes glowPulse {
          0%   { box-shadow: 0 0 8px 2px rgba(255, 0, 64, 0.4); }
          50%  { box-shadow: 0 0 22px 6px rgba(123, 0, 255, 0.5); }
          100% { box-shadow: 0 0 8px 2px rgba(255, 0, 64, 0.4); }
        }
      `}</style>
    </motion.nav>
  )
}
