import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tasks from './Tasks/Tasks'
//import './index.css'
//import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Tasks />
  </StrictMode>,
)
