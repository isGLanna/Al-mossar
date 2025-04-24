import { createFileRoute } from '@tanstack/react-router'
import { Menu } from '../componentes/templates'

export type Employee = {
  id: number; 
  idEnterprise: number;
  email: string;
  name: string;
  surname: string; 
  role: string;
  employees: { name: string; surname: string; role: string} [];
  token: string
}

export const Route = createFileRoute('/menu')({
  validateSearch: (search): { employee: Employee } => {
    if (!search.employee) throw new Error('Funcionário não informado.');
    return search as { employee: Employee };
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { employee } = Route.useSearch();

  return <Menu employee={employee}/>
}
