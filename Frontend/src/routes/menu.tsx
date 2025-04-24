import { createFileRoute } from '@tanstack/react-router'
import { Menu } from '../componentes/templates'
import { Employee } from '../models/Employee'


export const Route = createFileRoute('/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  const { employeeId } = Route.useParams()
  const { employee } = Route.useRouteContext() as { employee: Employee }

  return <Menu employee={employee}/>
}
