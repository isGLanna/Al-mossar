import { RootLayout } from '../componentes/templates'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { Employee } from '../models/Employee'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { location } = useRouterState()
  const employee = (location.search?.employee ?? null) as Employee | null

  return (
    <RootLayout employee={employee}>
      <Outlet />
    </RootLayout>
  )
}