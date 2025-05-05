import '../../moleculas/cardapio.module.scss'
import { DailyMenu } from './dailyMenu'
import { Employee } from '../../../routes/menu'
import { createEmployee } from '../../../models/EmployeeFactory'

interface MenuProps {
  employee: Employee;
}

export function Menu({ employee }: MenuProps) {
  const { id, idEnterprise, email, name, surname, role, token } = employee;

  const user = createEmployee(id, idEnterprise, email, name, surname, role, token)

  return (
    <div className='mt-[70px]'>
      <h3 className='h3' style={{textAlign:'center', paddingTop:'20px'}}>
        "Esse aí vai ser cozinheiro igual um dia eu vou ser o papa" — Jacquin
      </h3>

      <main>
        <DailyMenu idEnterprise={user.getIdEnterprise()}/>
      </main>


    </div>
  );
}