import { createFileRoute } from '@tanstack/react-router'
import { CreateEnterprise } from '../componentes/templates'

export const Route = createFileRoute('/create-enterprise')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateEnterprise />
}
