import { createFileRoute } from '@tanstack/react-router'
import { Menu } from '../components/templates'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})


function RouteComponent() {
  return <Menu />
}
