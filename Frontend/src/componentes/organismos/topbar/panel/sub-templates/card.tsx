import { memo } from 'react'
import { IoPersonRemoveSharp } from "react-icons/io5"
import {Employee} from "../../../../../models/Employee.ts";
import './card.scss'


type EmployeeCardProps = {
  emp: Employee
  index: number
  selectedCard: number
  setSelectedCard: (index: number) => void
}

export const EmployeeCard = memo(({ emp, index, selectedCard, setSelectedCard }: EmployeeCardProps) => {

  const getFormattedDate = (rawDate: Date, hours: boolean)=> {
    const date = new Date(rawDate)

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2)

    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2,'0')
    const second = date.getSeconds().toString().padStart(2, '0')

    if (hours) {
      return day+'/'+month+'/'+year+' - '+ hour + ':'+minute+':'+second
    } else {
      return day + '/' + month + '/' + year
    }
  }

  const getSalary = () => {
    if (!emp.salary?.amount) return 'R$ 0,00'

    const amount: number = emp.salary.amount

    return `R$ ${amount}`
  }

  return (
    <div
      key={emp.email}
      className={`card ${selectedCard == index ? "active" : ""}`}
      onClick={() => index == selectedCard ? setSelectedCard(-1) : setSelectedCard(index)}
    >
      <div className="image-container area-a image">
        {emp.photo ? (
          <img src={emp.photo} alt={`${emp.name} ${emp.surname}`} />

        ) : (
          <div className="label">
            {emp.name && emp.surname ? `${emp.name.charAt(0)}${emp.surname.charAt(0)}`.toUpperCase() : ''}
          </div>
        )}
      </div>

      <div className='card__content area-b'>
        <span className='text-green-950'>{emp.name} {emp.surname}</span>
        <span>{emp.role.charAt(0).toUpperCase() + emp.role.slice(1)}</span>
      </div>

      <div className='card__content justify-center area-d'>
        <span>Contato</span>
        <span>Endereço</span>
      </div>
      <div className='card__content justify-center area-e'>
        <span>{emp.email}</span>
        <span>{emp.telefone}</span>
        <span>{emp.endereco}</span>
      </div>

      <div className='card__content justify-center area-f'>
        <span>Contrato</span>
        <span>Salário</span>
        <span>Última alteração</span>
      </div>
      <div className='card__content justify-center area-g'>
        <span>
          {emp.start_of_contract ? getFormattedDate(emp.start_of_contract, false) : '--/--'}
          {' até '}
          {emp.end_of_contract ? getFormattedDate(emp.end_of_contract, false) : '--/--/--'}
        </span>
        <span>{getSalary()}</span>
        <span>{emp.salary?.updated_at ? getFormattedDate(emp.salary.updated_at, true) : ''}</span>
      </div>
    </div>
  )
})