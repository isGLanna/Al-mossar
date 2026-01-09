import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routeTree } from './routeTree.gen'
import { UserStateProvider } from './context/user-login-context'
import './styles/global.css'
import { Theme } from "@radix-ui/themes";

const route = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof route
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserStateProvider>
      <Theme>
        <RouterProvider router={route} />
      </Theme>
    </UserStateProvider>
  </StrictMode>
)
