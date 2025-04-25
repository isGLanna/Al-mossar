import { useState, useEffect } from 'react'
import { HiOutlineTrash } from "react-icons/hi"
import { IoMdPersonAdd } from "react-icons/io"
import { Employee } from '../../../../models/Employee'
import { addEmployeeAPI, deleteEmployeeAPI, getEmployeesAPI, editEmployeeAPI } from './api'
import '../../../moleculas/formulario.sass'
import './employee-panel.scss'

type EmployeePanelProps = {
  isOpen: boolean
  employee: Employee
  onClose: () => void
}

export function EmployeePanel({ isOpen, employee, onClose }: EmployeePanelProps) {
  const [visible, setVisible] = useState(isOpen)
  const [addEmployee, setAddEmployee] = useState(false)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editedEmployees, setEditedEmployees] = useState<{ [id: number]: Partial<Employee> }>({})

  const roles = ['Gerente', 'Cozinheiro', 'Auxiliar de cozinha', 'Limpeza', 'Outros']

  // Delay para transição de saída
  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      fetchEmployees()
    } else {
      // Ao fechar, salvar alterações antes de sumir
      saveAllChanges()
      const timeout = setTimeout(() => setVisible(false), 200)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  const fetchEmployees = async () => {
    try {
      const data = await getEmployeesAPI()
      setEmployees(data)
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error)
    }
  }

  const handleSubmit = async () => {
    if (!email || !role) return
    try {
      await addEmployeeAPI({ email, role })
      setEmail('')
      setRole('')
      setAddEmployee(false)
      fetchEmployees()
    } catch (error) {
      alert(error)
    }
  }

  const handleEditChange = (id: number, field: keyof Employee, value: string) => {
    setEditedEmployees((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const handleDelete = async (email: string) => {
    try {
      await deleteEmployeeAPI(email)
      fetchEmployees()
    } catch (error) {
      alert('Erro ao excluir funcionário')
    }
  }

  const saveAllChanges = async () => {
    const updates = Object.entries(editedEmployees)
    for (const [idStr, data] of updates) {
      const original = employees.find(e => e.id === parseInt(idStr))
      if (!original) continue

      const hasChanges = Object.keys(data).some(key => data[key as keyof Employee] !== (original[key as keyof Employee] ?? ''))
      if (hasChanges) {
        try {
          await editEmployeeAPI(original.email, data)
        } catch (error) {
          console.error(`Erro ao salvar alterações para ${original.email}`, error)
        }
      }
    }

    // Limpa alterações após salvar
    setEditedEmployees({})
  }

  const handlePanelClose = () => {
    // Garante que salva antes de notificar fechamento
    saveAllChanges().then(onClose)
  }

  if (!visible) return null

  return (
    <section className={`panelOverlay ${isOpen ? 'fadeIn' : 'fadeOut'}`} onClick={handlePanelClose}>
      <div className='panel' onClick={(e) => e.stopPropagation()}>
        <header className='header'>
          <h2>Gerenciamento de Funcionários</h2>
        </header>

        <table className='table'>
          <thead>
            <tr>
              <th style={{ width: '8rem' }}>Nome</th>
              <th style={{ width: '20rem' }}>Sobrenome</th>
              <th style={{ width: '18rem' }}>Email</th>
              <th style={{ width: '11rem' }}>Cargo</th>
              {employee.canEditEmployeePanel() && (<th style={{ width: '5rem' }}></th>)}
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>
                  <input
                    value={editedEmployees[emp.id]?.name ?? emp.name}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    value={editedEmployees[emp.id]?.surname ?? emp.surname}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    value={editedEmployees[emp.id]?.email ?? emp.email}
                    readOnly
                  />
                </td>
                <td>
                  {employee.canEditEmployeePanel() ? (<select
                    value={
                      roles.includes(editedEmployees[emp.id]?.role ?? emp.role)
                        ? (editedEmployees[emp.id]?.role ?? emp.role)
                        : ''}
                    onChange={(e) => handleEditChange(emp.id, 'role', e.target.value)}
                  >

                      {!roles.includes(editedEmployees[emp.id]?.role ?? emp.role) && (
                        <option disabled value="">
                          {editedEmployees[emp.id]?.role ?? emp.role}
                        </option>
                      )}

                      {roles.map((r, i) => (
                        <option key={i} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  ) :
                  (
                    <span>{emp.role}</span>
                  )
                  }
                </td>
                
                {employee.canEditEmployeePanel() && (<td>
                  <HiOutlineTrash onClick={() => handleDelete(emp.email)} color={'#a33'} size={20} />
                </td>)}
              </tr>
            ))}
          </tbody>
        </table>

        {employee.canEditEmployeePanel() && (<form className='add-form' onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            {addEmployee && (
              <>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email do funcionário"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ margin: '25px 0px 0px 0px', border: '2px solid #aaa' }}
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ margin: '25px 0px 0px 0px', border: '2px solid #aaa' }}
                    required
                  >
                    <option value='' disabled hidden>Selecione um cargo</option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </form>
        )}

        {employee.canEditEmployeePanel() && (<button
          className="add-button"
          onClick={(e) => {
            e.preventDefault()
            if (addEmployee) {
              handleSubmit()
            } else {
              setAddEmployee(true)
            }
          }}
        >
          {addEmployee ? 'Confirmar' : <IoMdPersonAdd size={20}/>}
        </button>)}
        
      </div>
    </section>
  )
}
