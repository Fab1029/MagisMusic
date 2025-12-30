import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from 'virtual:pwa-register'

registerSW({ 
  immediate: true,
  onRegistered(r) {
    r && setInterval(() => {
      r.update(); // Buscar actualizaciones del SW cada cierto tiempo
    }, 60 * 60 * 1000); 
  }
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    }
  }
});

createRoot(document.getElementById("root")!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>

);



