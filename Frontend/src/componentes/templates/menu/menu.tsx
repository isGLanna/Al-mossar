import '../../moleculas/cardapio.module.scss'
import { NavActions } from '../../organismos/topbar/nav-actions'
import { createEmployee } from '../../../models/EmployeeFactory'
import { useAuthStore } from '../../../store/auth-store.ts'
import { DailyMenu } from './daily-menu.tsx'

export function Menu() {
  const employee = useAuthStore((state) => state.employee)

  if (!employee) return <p>Usuário não encontrado</p>

  const user = createEmployee(
    employee.idEnterprise,
    employee.email,
    employee.name,
    employee.surname,
    employee.role,
    employee.token
  )
  
  return (
    <div>
      <NavActions employee={user} />
      <div className='mt-[70px]'>
        <h3 className='h3' style={{textAlign:'center', paddingTop:'20px'}}>
          "Esse aí vai ser cozinheiro igual um dia eu vou ser o papa" — Jacquin
        </h3>

        <main>
          <DailyMenu />
        </main>

      </div>
    </div>
  );
}