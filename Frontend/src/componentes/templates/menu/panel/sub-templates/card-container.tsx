import { Employee } from '../../../../../models/Employee'
import { IoPersonRemoveSharp } from "react-icons/io5"
import { MdPersonSearch } from "react-icons/md";
import { useState } from 'react'
import './card.scss'

type CardContainerProps = {
  handleEditChange?: (email: string, field: keyof Employee, value: string) => void
  handleDelete?: (email: string) => void
  employees: Employee[]
}

export function CardContainer({ handleEditChange, handleDelete, employees }: CardContainerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchIsFocus, setSearchIsFocus] = useState<boolean>(false)

  const filteredEmployees = employees.filter(emp => {
    const fullName = `${emp.name} ${emp.surname}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })


  return(
    <>
      <form className='search-bar'>
        <div>
          <label className={`floating-label ${searchIsFocus ? 'active' : ''}`}>
            Buscar empregado
          </label>
          <input 
            type='search' 
            autoComplete='on' 
            list="names"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchIsFocus(true)}
            onBlur={() => setSearchIsFocus(false)}
            />
        </div>
        <MdPersonSearch size={25} color='silver' style={{position: 'fixed', marginLeft:'12rem'}}/>
        <datalist id="names">
          {employees.map((emp) => (
            <option
              key={emp.email}
              value={`${emp.name} ${emp.surname}`}
            />
          ))}
        </datalist>
      </form>

      <div className='card-container'>
        {filteredEmployees.map((emp) => (
          <div key={emp.email} className='card' style={{ color: 'red'}}>
            <div className='image'></div>
            <span>{emp.name} {emp.surname}</span>
          </div>
          ))}
      </div>
    </>
  )
}