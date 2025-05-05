import { EnterpriseProfile } from '../../organismos/topbar/enterprise-profile'
import { Employee } from '../../../models/Employee'
import './topbar.sass'

interface Props {
  employee: Employee | null
}

export function TopBar({ employee }: Props) {
  
  return (
    <div className='window'>
      <h1 className='titulo'>Al-mossar</h1>
      <header> 
        {employee ? 
          <EnterpriseProfile employee={employee} />
        :
          <h3></h3>
        }
      </header>
    </div>
  )
}
