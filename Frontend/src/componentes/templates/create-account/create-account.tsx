import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import '../../moleculas/formulario.sass'
import {registerUser} from './api'

export function CreateAccount() {
  const navigate = useNavigate()

  const roles = ['Administrador', 'Chefe', 'Cozinheiro', 'Auxiliar de cozinha', 'Limpeza', 'Outros']

  type User = {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmed_password: string;
    start_of_contract: string;
    id_enterprise: number;
    role: string;
  };

  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmed_password: '',
    start_of_contract: '',
    id_enterprise: 0,
    role: '',
  })

  // Entradas obrigatórias para barrar cadastro
  const [emptyField, setEmptyField] = useState<Record<string, boolean>>({
    name: false,
    surname: false,
    email: false,
    password: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.password !== user.confirmed_password){
      alert('As senhas estão diferentes')
      return
    }

    // atribui true para *field.atribute* vazio
    const fields = {
      name: !user.name.trim(),
      surname: !user.surname.trim(),
      email: !user.email.trim(),
      password: !user.password.trim(),
      confirmed_password: !user.confirmed_password.trim(),
      id_enterprise: user.id_enterprise === 0
    }
  
    setEmptyField(fields)
  
    try {
      // Verifica condição campo *field.attribute* é vazio?
      if(Object.values(fields).some(value => value)) {
        return
      } 
        
      const response = await registerUser(user)

      if (response.success) {
        navigate({to: '/'})
      } else {
        alert(response.message || 'Falha inexperada')
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <main className="formulario" style={{ color: 'var(--texto)'}}>

        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className='mb-[15px]'>Criar Conta</h2>
  
          <div className="form-group">
            <label className='requiredField'>Nome</label>
            
            <input
              className={emptyField.name ? 'empty-login' : ''}
              type="text"
              name="name"
              maxLength={16}
              placeholder="Digite seu nome"
              value={user.name}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label className='requiredField'>Sobrenome</label>
            <input
              className={emptyField.surname ? 'empty-login' : ''}
              type="text"
              name="surname"
              maxLength={48}
              placeholder="Digite seu sobrenome"
              style={{}}
              value={user.surname}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label className='requiredField'>Email</label>
            <input
              className={emptyField.email ? 'empty-login' : ''}
              type="email"
              name="email"
              placeholder="Digite seu email"
              style={{}}
              value={user.email}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label className='requiredField'>Senha</label>
            <input
              className={emptyField.password ? 'empty-login' : ''}
              type="password"
              name="password"
              minLength={4}
              maxLength={16}
              placeholder="Digite sua senha"
              style={{}}
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className='requiredField'>Repita sua senha</label>
            <input
              className={emptyField.confirmed_password ? 'empty-login' : ''}
              type="password"
              name="confirmed_password"
              minLength={4}
              maxLength={16}
              placeholder="Digite sua senha"
              style={{}}
              value={user.confirmed_password}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label className='requiredField'>Identificador da empresa</label>
            <input
              className={emptyField.id_enterprise ? 'empty-login' : ''}
              type="number"
              name="id_enterprise"
              placeholder="Digite o código da empresa"
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Início do contrato</label>
            <input
              type="date"
              name="start_of_contract"
              value={user.start_of_contract}
              style={{}}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Cargo</label>
            <select name="role" value={user.role} onChange={handleChange}>
              <option value='' disabled hidden>Selecione um cargo</option>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
  
          <div className="form-group">
            <input
              type="submit"
              value="Criar conta"
            />

          </div>
        </form>
      </main>
    </div>
  );  
}
