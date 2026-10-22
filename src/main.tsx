import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary> 
    <App />
  </ErrorBoundary>
)
