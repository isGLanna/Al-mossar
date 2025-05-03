import { createFileRoute } from '@tanstack/react-router'
import { Dashboard } from '../componentes/templates'

export const Route = createFileRoute('/financial-control')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Dashboard />
}
