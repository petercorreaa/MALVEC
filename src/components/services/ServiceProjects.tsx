import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { ServiceProject } from '../../data/services'

interface ServiceProjectsProps {
  projects: ServiceProject[]
}

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const

// ─── Single project card ──────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: ServiceProject
  index: number
  isInView: boolean
}) {
  return (
    <motion.article
      style={{
        // Stagger cards vertically for editorial feel
        marginTop: index % 2 === 1 ? 'clamp(32px, 4vw, 64px)' : '0',
        borderRadius: '28px',
        overflow: 'hidden',
        aspectRatio: '3 / 4',
        position: 'relative',
        cursor: 'default',
        background: project.gradient,
        border: '1px solid rgba(239,238,230,0.06)',
        flexShrink: 0,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.1 + index * 0.12, ease: EASE_OUT }}
      whileHover={{ scale: 1.025, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }}
    >
      {/* Abstract inner shapes */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          borderRadius: '28px',
        }}
      >
        {/* Top-left accent circle */}
        <div
          style={{
            position: 'absolute',
            top: '-25%',
            left: '-25%',
            width: '70%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: project.accentTint,
            filter: 'blur(24px)',
          }}
        />

        {/* Bottom-right accent circle */}
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-15%',
            width: '55%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: project.accentTint,
            filter: 'blur(32px)',
          }}
        />

        {/* Subtle grid lines */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(239,238,230,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239,238,230,0.025) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Horizontal rule */}
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '14%',
            right: '14%',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(239,238,230,0.08) 30%, rgba(239,238,230,0.08) 70%, transparent)',
          }}
        />
      </div>

      {/* Year badge — top right */}
      <div
        style={{
          position: 'absolute',
          top: '22px',
          right: '22px',
          padding: '6px 14px',
          borderRadius: '100px',
          background: 'rgba(239,238,230,0.06)',
          border: '1px solid rgba(239,238,230,0.08)',
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: 'rgba(239,238,230,0.4)',
        }}
      >
        {project.year}
      </div>

      {/* Bottom text overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '28px 28px 28px',
          background:
            'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 60%, transparent 100%)',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(239,238,230,0.4)',
            marginBottom: '8px',
          }}
        >
          {project.category}
        </p>
        <h3
          style={{
            fontFamily: "'Degular Display', sans-serif",
            fontSize: 'clamp(20px, 2vw, 26px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#efeee6',
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </h3>
      </div>
    </motion.article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ServiceProjects({ projects }: ServiceProjectsProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        background: '#0d0d0d',
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
            marginBottom: 'clamp(48px, 6vw, 80px)',
            paddingBottom: '32px',
            borderBottom: '1px solid rgba(239,238,230,0.07)',
          }}
          className="proj-header"
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
              Selected Work
            </span>
          </motion.div>

          <motion.p
            style={{
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              color: 'rgba(239,238,230,0.3)',
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          >
            {projects.length} projects
          </motion.p>
        </div>

        {/* Cards grid — 3 columns, staggered */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(16px, 2.5vw, 32px)',
            alignItems: 'start',
          }}
          className="projects-grid"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .projects-grid > *:nth-child(2) {
            margin-top: clamp(24px, 4vw, 48px) !important;
          }
        }
        @media (max-width: 540px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-grid > * {
            margin-top: 0 !important;
          }
          .proj-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
