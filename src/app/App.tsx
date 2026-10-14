import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/lib/queryClient'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (

     <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
           <AppRoutes />
        </BrowserRouter>
     </QueryClientProvider>

  )
}

export default App