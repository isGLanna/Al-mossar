import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import '../../molecules/formulario.scss'
import { registerUser } from './api'

export function CreateAccount() {
  const navigate = useNavigate()

  type User = {
    name: string
    surname: string
    email: string
    password: string
    confirmed_password: string
    start_of_contract: string
    id_enterprise: number
  }

  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmed_password: '',
    start_of_contract: '',
    id_enterprise: 0
  })

  const [emptyField, setEmptyField] = useState<Record<string, boolean>>({
    name: false,
    surname: false,
    email: false,
    password: false,
    confirmed_password: false,
    id_enterprise: false
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setUser(prev => ({
      ...prev,
      [name]: name === 'id_enterprise' ? Number(value) : value
    }))

    setEmptyField(prev => ({
      ...prev,
      [name]: false
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (user.password !== user.confirmed_password) {
      alert('As senhas estão diferentes')
      return
    }

    const fields = {
      name: !user.name.trim(),
      surname: !user.surname.trim(),
      email: !user.email.trim(),
      password: !user.password.trim(),
      confirmed_password: !user.confirmed_password.trim(),
      id_enterprise: user.id_enterprise === 0
    }

    setEmptyField(fields)

    if (Object.values(fields).some(Boolean)) return

    try {
      const response = await registerUser(user)

      if (response.success) {
        navigate({ to: '/' })
      } else {
        alert(response.message || 'Falha inesperada')
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="title-form__register">Criar Conta</h1>

        {/* Nome */}
        <div className="form-group">
          <label>Nome</label>
          <div className="input-wrapper requiredField">
            <input
              className={emptyField.name ? 'empty-input' : ''}
              type="text"
              name="name"
              maxLength={16}
              placeholder="Digite seu nome"
              value={user.name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Sobrenome */}
        <div className="form-group">
          <label>Sobrenome</label>
          <div className="input-wrapper requiredField">
            <input
              className={emptyField.surname ? 'empty-input' : ''}
              type="text"
              name="surname"
              maxLength={48}
              placeholder="Digite seu sobrenome"
              value={user.surname}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <div className="input-wrapper requiredField">
            <input
              className={emptyField.email ? 'empty-input' : ''}
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Senha */}
        <div className="form-group">
          <label>Senha</label>
          <div className="input-wrapper requiredField">
            <input
              className={emptyField.password ? 'empty-input' : ''}
              type="password"
              name="password"
              minLength={4}
              maxLength={16}
              placeholder="Digite sua senha"
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Confirmar senha */}
        <div className="form-group">
          <label>Repita sua senha</label>
          <div className="input-wrapper requiredField">
            <input
              className={emptyField.confirmed_password ? 'empty-input' : ''}
              type="password"
              name="confirmed_password"
              minLength={4}
              maxLength={16}
              placeholder="Digite sua senha"
              value={user.confirmed_password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ID Empresa */}
        <div className="form-group">
          <label>Identificador da empresa</label>
          <div className="input-wrapper requiredField">
            <input
              className={emptyField.id_enterprise ? 'empty-input' : ''}
              type="number"
              name="id_enterprise"
              placeholder="Digite o código da empresa"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Data */}
        <div className="form-group">
          <label>Início do contrato</label>
          <div className="input-wrapper">
            <input
              type="date"
              name="start_of_contract"
              value={user.start_of_contract}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="form-group">
          <input type="submit" value="Criar conta" />
        </div>
      </form>
    </div>
  )
}
