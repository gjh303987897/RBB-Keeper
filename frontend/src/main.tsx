import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'
import './i18n'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container missing')
}

createRoot(container).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>
)