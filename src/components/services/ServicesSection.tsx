import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { services } from '../../data/serviceData'
import ServiceRow from './ServiceRow'

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [popupTop, setPopupTop] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (activeIndex === null) return
    const row = rowRefs.current[activeIndex]
    const section = sectionRef.current
    if (!row || !section) return
    const rowRect = row.getBoundingClientRect()
    const sectionRect = section.getBoundingClientRect()
    setPopupTop(rowRect.top - sectionRect.top + rowRect.height / 2)
  }, [activeIndex])

  const handleHover = useCallback((index: number | null) => {
    if (!isMobile) setActiveIndex(index)
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section relative"
      style={{ background: '#efeee6' }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* Section header */}
      <motion.div
        className="relative z-10 flex items-center justify-center gap-6 px-12"
        style={{
          borderBottom: '1px solid rgba(22,0,38,0.08)',
          paddingTop: '42px',
          paddingBottom: '18px',
          marginBottom: '60px',
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="block w-14 h-px" style={{ background: '#92004a' }} />
        <span
          className="tracking-[0.36em] uppercase font-semibold"
          style={{ color: '#92004a', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
        >
          Services
        </span>
        <span className="block w-14 h-px" style={{ background: '#92004a' }} />
      </motion.div>

      {/* Service rows */}
      <div className="relative z-10">
        {services.map((service, i) => (
          <div key={service.id} ref={el => { rowRefs.current[i] = el }}>
            <ServiceRow
              service={service}
              index={i}
              isActive={activeIndex === i}
              isMobile={isMobile}
              isInView={isInView}
              onHover={handleHover}
            />
          </div>
        ))}
      </div>

      {/* ── Popup — aligned to active service row ── */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            right: '200px',
            top: `${popupTop}px`,
            transform: 'translateY(-50%)',
            transition: 'top 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '56px' }}>
            <AnimatePresence mode="wait">
              {activeIndex !== null && (
                <>
                  {/* Image card */}
                  <motion.div
                    key={`img-${services[activeIndex].id}`}
                    initial={{ opacity: 0, scale: 0.9, rotateX: 8 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      transformPerspective: 1000,
                      width: '340px',
                      aspectRatio: '4/3',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'transparent',
                      boxShadow: '0 20px 56px rgba(22,0,38,0.12)',
                      flexShrink: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`/MALVEC%20Previews-${services[activeIndex].index}.png`}
                      alt={services[activeIndex].name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'inherit',
                        display: 'block',
                      }}
                    />
                  </motion.div>

                  {/* Free text */}
                  <motion.div
                    key={`text-${services[activeIndex].id}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    style={{ width: '200px', flexShrink: 0 }}
                  >
                    <p style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#92004a', marginBottom: '14px', fontWeight: 600 }}>
                      {services[activeIndex].name}
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {services[activeIndex].capabilities.map((cap, i) => (
                        <motion.li
                          key={cap}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.22, delay: 0.08 + i * 0.025, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ fontSize: '12px', color: 'rgba(22,0,38,0.65)', lineHeight: '1.45', fontFamily: "'Degular Display', sans-serif", fontWeight: 500 }}
                        >
                          {cap}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Bottom padding */}
      <div style={{ height: '80px' }} />
    </section>
  )
}
