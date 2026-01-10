import { createFileRoute } from '@tanstack/react-router'
import { CreateAccount } from '../components/templates'

export const Route = createFileRoute('/create-account')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateAccount />
}
