import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Tasks from './Tasks/Tasks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
//import './index.css'
//import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Tasks />
  </QueryClientProvider>
  // <StrictMode>
    
  // </StrictMode>,
)
