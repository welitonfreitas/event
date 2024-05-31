import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router/router.tsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className='flex flex-col min-h-screen'>
    <Router />
  </div>
)