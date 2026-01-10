import { RootLayout } from '../components/templates'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}