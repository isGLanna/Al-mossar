import { useNavigate } from '@tanstack/react-router'
import { IoAddCircleSharp, IoRemove } from "react-icons/io5";
import { useState } from 'react'
import '../../moleculas/formulario.sass'
import { registerEnterprise } from './api'

export function CreateEnterprise(){
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

  const [ emptyField, setEmptyField ] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    password: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEnterprise({...enterprise,
      [e.target.name]: e.target.value,
    })
  }

  // Emails de funcionários para o pré-cadastro
  const [employeeEmails, setEmployeeEmails] = useState<string[]>([])

  // Adiciona campo para empregado
  const addEmployeeEmail = () => {
    setEmployeeEmails([
      ...employeeEmails, ''])
  }

  // Remove campo para empregado
  const removeEmployee = (index: number) => {
    const items = [...employeeEmails]
    items.splice(index, 1)
    setEmployeeEmails(items)
  }
  

  const handleEmployeeEmail = (index: number, value: string) => {
    const updateEmails = [...employeeEmails]
    updateEmails[index] = value
    setEmployeeEmails(updateEmails)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()  // Impedir recarregamento de página (me deu dor de cabeça, logo, não esquecer)

    // atribue true para *field.atribute* vazio
    const fields = {
      name: !enterprise.name.trim(),
      email: !enterprise.email.trim(),
      password: !enterprise.password.trim()
    }

    setEmptyField(fields)

    const payload = {
      ...enterprise,
      employees: employeeEmails.filter(email => email.trim() !== '')
    }

    try {
      // Verifica condição campo *field.attribute* é vazio?
      if (Object.values(fields).some(value => value)){
        return
      }

      const response = await registerEnterprise(payload)

      if (response.success){
        navigate({to: '/'})
      } else {
        throw response.message || 'Falha inesperada'
      } 
    } catch (error) {

      alert(error)
    }
  }


  return(
    <div className='container'>
      <main className='formulario' >
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

            {employeeEmails.map((email, index) => (
              <div key={index} className='input-with-remove'>
                <input
                  type='email'
                  placeholder={`E-mail do funcionário ${index + 1}`}
                  value={email}
                  onChange={(e) => handleEmployeeEmail(index, e.target.value)}
                />
                <IoRemove className='remove-icon' onClick={() => removeEmployee(index)} />
              </div>
              ))}

          </div>

          {employeeEmails.length < 10 && (
            <IoAddCircleSharp
              className='btn-add-employee'
              onClick={addEmployeeEmail}
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