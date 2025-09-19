import { useState, useEffect } from 'react'
import { IoMdPersonAdd } from "react-icons/io"
import { Employee } from '../../../../models/Employee'
import { addEmployeeAPI, deleteEmployeeAPI, getEmployeesAPI, editEmployeeAPI } from './api'
import { CardContainer } from './sub-templates/card-container'
import '../../../moleculas/formulario.sass'
import './panel.scss'

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
  const [editedEmployees, setEditedEmployees] = useState<{ [email: string]: Partial<Employee> }>({})

  const roles = ['Gerente', 'Cozinheiro', 'Auxiliar de cozinha', 'Garçom', 'Limpeza', 'Outros']

  // Delay para transição de saída
  useEffect(() => {

    if (isOpen) {
      setVisible(true)
      fetchEmployees()
    } else {
      // Ao fechar, salvar alterações antes de fechar
      saveAllChanges()
      const timeout = setTimeout(() => setVisible(false), 200)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  // Busca e converte o objeto employee para um array
  const fetchEmployees = async () => {
    const data = await getEmployeesAPI()
    const employeesArray = Array.isArray(data.employees) ? data.employees : []
    setEmployees(employeesArray)
  }

  // Cria novo usuário
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

  // Atualiza o estado de edição dos funcionários
  const handleEditChange = (email: string, field: keyof Employee, value: string) => {
    setEditedEmployees(prev => ({
      ...prev,
      [email]: {
        ...prev[email],
        [field]: value,
      },
    }))
  }

  const handleDelete = async (email: string) => {
    try {
      const result = await deleteEmployeeAPI(email)

      if (!result.success) {
        return
      }
      
      fetchEmployees()
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro desconhecido ao excluir funcionário.'
      alert(message)
    } finally {
      fetchEmployees()      // Para qualquer caso, atualizar o conteúdo da tabela para prevenção de erros
    }
  }

  const saveAllChanges = async () => {
    const updates = Object.entries(editedEmployees)
    for (const [email, data] of updates) {

      // Procura email que sofreu evento
      const original = employees.find(e => e.email === email)
      if (!original) continue
  
      const hasChanges = Object.keys(data).some(key => data[key as keyof Employee] !== (original[key as keyof Employee] ?? ''))
      if (hasChanges) {
        try {
          await editEmployeeAPI(email, data.name, data.surname, data.role) // Edita baseado no e-mail
        } catch (error) {
          console.error(`Erro ao salvar alterações para ${email}`, error)
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
          <h2>Gestão de Funcionários</h2>
        </header>

        <CardContainer employees={employees} handleEditChange={handleEditChange} handleDelete={handleDelete}/>

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

        <div className='flex row justify-center'>
          {employee.canEditEmployeePanel() && (
            <>
              <button
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
            </button>

            { addEmployee && (
              <button className="remove-button" onClick={(e) => {
                  e.preventDefault()
                  if (addEmployee)
                    setAddEmployee(false)
                }}>
                  Cancelar
              </button>)}
          </>
        )}
        </div>
        
      </div>
    </section>
  )
}
