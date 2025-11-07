import { Employee } from '../../../../models/Employee.ts'
import { MdPersonSearch } from "react-icons/md"
import { useState } from 'react'
import { EmployeeCard} from "./card.tsx"
import './card.scss'

type CardContainerProps = {
  handleEditChange?: (email: string, field: keyof Employee, value: string) => void
  handleDelete?: (email: string) => void
  employees: Employee[]
}

export function CardContainer({ handleEditChange, handleDelete, employees }: CardContainerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCard, setSelectedCard] = useState<number>(-1)

  const filteredEmployees = employees.filter(emp => {
    const fullName = `${emp.name} ${emp.surname}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })

  return(
    <>
      <form className='search-bar'>
        <div className="input-wrapper">
          <input
            type='search'
            id='search'
            placeholder=" "
            autoComplete='on'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor='search'>Buscar empregado</label>
          <MdPersonSearch className="icon" size={25} color='silver'/>
        </div>
        <datalist id="names">
          {employees.map((emp) => (
            <option
              key={emp.email}
              value={`${emp.name} ${emp.surname}`}
            />
          ))}
        </datalist>
      </form>

      <section className='card-container'>
        {filteredEmployees.map((emp, index) => (
          <EmployeeCard
            key={emp.email}
            emp={emp}
            index={index}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}>
          </EmployeeCard>
        ))}
      </section>
    </>
  )
}