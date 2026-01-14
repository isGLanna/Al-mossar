import { createFileRoute } from "@tanstack/react-router";
import { PasswordRecovery } from  "../components/templates"

export const Route = createFileRoute('/password-recovery') ({
  component: RouteComponent,
})

function RouteComponent() {
  return <PasswordRecovery />
}


