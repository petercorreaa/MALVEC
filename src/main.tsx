import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './services.css'
import ServicesSection from './components/services/ServicesSection'

const rootEl = document.getElementById('services-react-root')

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ServicesSection />
    </StrictMode>
  )
}
