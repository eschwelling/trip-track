import React from 'react'
import { createRoot } from 'react-dom/client'

import App from '../react/containers/App'

document.addEventListener('DOMContentLoaded', () => {
  const reactElement = document.getElementById('app')

  if (reactElement) {
    createRoot(reactElement).render(<App />)
  }
})
