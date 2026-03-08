import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './service-detail.css'
import ServiceDetailPage from './pages/ServiceDetailPage'

function ServiceApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        {/* Fallback — send unknown paths back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

const rootEl = document.getElementById('service-root')
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ServiceApp />
    </StrictMode>
  )
}
