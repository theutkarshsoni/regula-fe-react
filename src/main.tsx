import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from "./app/providers/AppProviders";
import AppRoutes from "./app/routes";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  </StrictMode>,
)