import { createFileRoute } from '@tanstack/react-router'
import { Menu } from '../componentes/templates'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Menu></Menu>
}
