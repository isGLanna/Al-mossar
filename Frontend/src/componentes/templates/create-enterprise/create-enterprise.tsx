import { useNavigate } from '@tanstack/react-router'
import { IoAddCircleSharp, IoRemove } from "react-icons/io5";
import { useState } from 'react'
import '../../moleculas/formulario.sass'
import { registerEnterprise } from './api'

export function CreateEnterprise() {
  const navigate = useNavigate()

  type Enterprise = {
    name: string,
    email: string,
    password: string
  }

  const [enterprise, setEnterprise] = useState<Enterprise>({
    name: '',
    email: '',
    password: ''
  })

  const [emptyField, setEmptyField] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    password: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEnterprise({
      ...enterprise,
      [e.target.name]: e.target.value,
    })
  }

  const [employees, setEmployees] = useState<{ email: string, role: string }[]>([])

  const roles = ['Gerente', 'Cozinheiro','Auxiliar de cozinha', 'Limpeza', 'Outros' ]

  // Adiciona um novo funcionário com campos vazios
  const addEmployee = () => {
    setEmployees([...employees, { email: '', role: '' }])
  }

  // Remove funcionário pelo índice
  const removeEmployee = (index: number) => {
    const items = [...employees]
    items.splice(index, 1)
    setEmployees(items)
  }

  // Atualiza e-mail ou cargo de um funcionário específico
  const updateEmployeeField = (index: number, field: 'email' | 'role', value: string) => {
    const updated = [...employees]
    updated[index][field] = value
    setEmployees(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const fields = {
      name: !enterprise.name.trim(),
      email: !enterprise.email.trim(),
      password: !enterprise.password.trim()
    }

    setEmptyField(fields)

    if (Object.values(fields).some(value => value)) {
      return
    }

    const filteredEmployees = employees.filter(emp => emp.email.trim() !== '' && emp.role.trim() !== '')

    const payload = {
      ...enterprise,
      employees: filteredEmployees
    }

    try {
      const response = await registerEnterprise(payload)

      if (response.success) {
        navigate({ to: '/' })
      } else {
        throw response.message || 'Falha inesperada'
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='container'>
      <main className='formulario'>
        <form className='form-container' onSubmit={handleSubmit}>
          <h2 className='mb-[15px]'>Criar Empresa</h2>

          <div className='form-group'>
            <label className='requiredField'>Nome</label>
            <input
              className={emptyField.name ? 'empty-input' : ''}
              type='text'
              name='name'
              maxLength={32}
              placeholder='Digite o nome da empresa'
              value={enterprise.name}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label className='requiredField'>Email</label>
            <input
              className={emptyField.email ? 'empty-input' : ''}
              type='email'
              name='email'
              maxLength={32}
              placeholder='Digite o e-mail corporativo'
              value={enterprise.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label className='requiredField'>Senha</label>
            <input
              className={emptyField.password ? 'empty-input' : ''}
              type='password'
              name='password'
              minLength={4}
              maxLength={16}
              placeholder='Digite a senha'
              value={enterprise.password}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Pré-cadastro de funcionários</label>

            {employees.map((employee, index) => (
              <div key={index} className='input-with-remove'>
                <input
                  type='email'
                  placeholder={`E-mail do funcionário ${index + 1}`}
                  value={employee.email}
                  onChange={(e) => updateEmployeeField(index, 'email', e.target.value)}
                />

                <select
                  value={employee.role}
                  style={{margin:'10px 0 25px 0'}}
                  onChange={(e) => updateEmployeeField(index, 'role', e.target.value)}
                >
                  <option value='' disabled hidden>Selecione um cargo</option>
                  {roles.map((role, i) => (
                    <option key={i} value={role}>{role}</option>
                  ))}
                </select>

                <IoRemove className='remove-icon' onClick={() => removeEmployee(index)} />
              </div>
            ))}
          </div>

          {employees.length < 10 && (
            <IoAddCircleSharp
              className='btn-add-employee'
              onClick={addEmployee}
            />
          )}

          <div className='form-group'>
            <input
              type='submit'
              value='Criar empresa'
            />
          </div>
        </form>
      </main>
    </div>
  )
}
