import { createFileRoute } from "@tanstack/react-router";
import { ForgotPassword } from  "../components/templates"

export const Route = createFileRoute('/forgot-password') ({
  component: RouteComponent,
})

function RouteComponent() {
  return <ForgotPassword />
}


