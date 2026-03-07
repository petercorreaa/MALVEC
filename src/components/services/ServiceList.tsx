import { motion } from 'framer-motion'
import { type Service } from '../../data/serviceData'

interface ServiceListProps {
  services: Service[]
  activeIndex: number
  onHover: (index: number) => void
  onClick: (index: number) => void
  isMobile: boolean
}

// Easing curves
const EASE_OUT   = [0.25, 0.46, 0.45, 0.94] as const  // smooth deceleration
const EASE_REVEAL = [0.22, 1, 0.36, 1]       as const  // expo-out for mask flip

export default function ServiceList({
  services,
  activeIndex,
  onHover,
  onClick,
  isMobile,
}: ServiceListProps) {
  return (
    <div className="service-list flex flex-col justify-center">

      {/* Section label */}
      <div className="flex items-center gap-3 mb-14">
        <span className="block w-6 h-px" style={{ background: '#92004a' }} />
        <span
          className="text-[11px] tracking-[0.3em] uppercase font-medium"
          style={{ color: '#92004a' }}
        >
          Services
        </span>
      </div>

      {/* Service items */}
      <ul className="flex flex-col" role="list">
        {services.map((service, i) => {
          const isActive = activeIndex === i
          const FONT_SIZE = 'clamp(36px, 4.4vw, 64px)'

          return (
            <li key={service.id} role="listitem">
              <motion.button
                className="w-full text-left relative flex items-center gap-5 py-9 border-b border-[rgba(22,0,38,0.07)] focus:outline-none"
                onHoverStart={() => !isMobile && onHover(i)}
                onClick={() => onClick(i)}
                aria-pressed={isActive}
                aria-label={`${service.name} — ${service.tagline}`}
                initial={false}
              >
                {/* Active indicator bar — scaleY from top */}
                <motion.span
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ background: '#92004a', transformOrigin: 'top' }}
                  animate={{ scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: EASE_REVEAL }}
                />

                {/*
                  Dual-layer text mask reveal:
                  - Muted layer (in flow, sets height): always at y:0, color fades to
                    transparent when active so only one layer is "visible" at a time.
                  - Active dark layer (absolute, clipped): slides from y:105% → y:0
                    on activation; retreats to y:105% on deactivation.
                  The parent `overflow-hidden` clips the active layer's travel,
                  creating the masked upward reveal.
                */}
                <span
                  className="relative flex-1"
                  style={{ overflow: 'hidden', paddingBottom: '0.05em' }}
                >
                  {/* Layer 1 — muted (defines height, fades when active) */}
                  <motion.span
                    className="block font-semibold leading-none select-none"
                    style={{
                      fontFamily: "'Degular Display', sans-serif",
                      fontSize: FONT_SIZE,
                    }}
                    animate={{
                      color: isActive
                        ? 'transparent'
                        : 'rgba(22,0,38,0.28)',
                    }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    aria-hidden={isActive ? 'true' : undefined}
                  >
                    {service.name}
                  </motion.span>

                  {/* Layer 2 — active dark (absolute, mask-reveals upward) */}
                  <span
                    className="absolute inset-0"
                    style={{ overflow: 'hidden', paddingBottom: '0.05em' }}
                    aria-hidden="true"
                  >
                    <motion.span
                      className="absolute inset-0 font-semibold leading-none flex items-center"
                      style={{
                        fontFamily: "'Degular Display', sans-serif",
                        fontSize: FONT_SIZE,
                        color: '#160026',
                      }}
                      animate={{ y: isActive ? '0%' : '110%' }}
                      transition={{ duration: 0.52, ease: EASE_REVEAL }}
                    >
                      {service.name}
                    </motion.span>
                  </span>
                </span>

                {/* Arrow — fade only, no x drift */}
                <motion.span
                  className="text-[11px] tracking-[0.15em] uppercase font-medium self-center shrink-0"
                  style={{ color: '#92004a' }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  →
                </motion.span>
              </motion.button>
            </li>
          )
        })}
      </ul>

      {/* Footer caption */}
      <motion.p
        className="mt-10 text-[12px] tracking-[0.08em] leading-relaxed max-w-[320px]"
        style={{ color: 'rgba(22,0,38,0.35)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.9, ease: EASE_OUT }}
      >
        End-to-end solutions to build, grow and dominate your digital space.
      </motion.p>
    </div>
  )
}
