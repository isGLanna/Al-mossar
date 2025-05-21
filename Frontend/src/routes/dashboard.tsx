import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../componentes/templates'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />
}
