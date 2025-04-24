import { UserProfile } from '../../organismos/topbar/user-profile'
import '../../moleculas/cardapio.module.scss';
import { MenuCalendar } from './menuCalendar'
import { Employee } from '../../../models/Employee'

type Props = {
  employee: Employee
}

export function Menu({ employee }: Props) {

  return (
    <div className='mt-[70px]'>
      <h3 className='h3' style={{textAlign:'center', paddingTop:'20px'}}>
        "Esse aí vai ser cozinheiro igual um dia eu vou ser o papa" — Jacquin
      </h3>

      <header>
        <UserProfile employee={employee}/>
      </header>

      <main>
        <MenuCalendar user='' work-team=''/>
      </main>

      <p>Se chegou até aqui, o login foi realizado com sucesso!</p>
    </div>
  );
}