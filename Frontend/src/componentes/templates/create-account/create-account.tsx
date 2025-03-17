import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import '../../moleculas/formulario.sass'

export function CreateAccount() {
  const roles = ['Chefe', 'Cozinheiro', 'Auxiliar de cozinha', 'Limpeza', 'Outro'];

  type User = {
    name: string;
    surname: string;
    email: string;
    password: string;
    startOfContract: string;
    idEnterprise: number;
    role: string;
  };

  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    email: '',
    password: '',
    startOfContract: '',
    idEnterprise: 0,
    role: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="container">
      <main className="formulario" style={{ color: 'var(--texto)' }}>

        <form className="form-container" style={{ textAlign: 'center', alignItems: 'center' }}>
          <h2>Criar Conta</h2>
  
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              style={{ fontWeight: '400' }}
              value={user.name}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Sobrenome</label>
            <input
              type="text"
              name="surname"
              placeholder="Digite seu sobrenome"
              style={{ fontWeight: '400' }}
              value={user.surname}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              style={{ fontWeight: '400' }}
              value={user.email}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              style={{ fontWeight: '400' }}
              value={user.password}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Identificador da empresa</label>
            <input
              type="number"
              name="idEnterprise"
              placeholder="Digite o código da empresa"
              value={user.idEnterprise == 0 ? '' : user.idEnterprise}
              onChange={handleChange}
            />
          </div>
  
          <div className="form-group">
            <label>Início do contrato</label>
            <input
              type="date"
              name="startOfContract"
              value={user.startOfContract}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Cargo</label>
            <select name="role" value={user.role} onChange={handleChange}>
              {roles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
  
          <div className="form-group">
            <Link to='/menu'>
              <input
                type="submit"
                value="Criar conta"
              />
            </Link>
          </div>
        </form>
      </main>
    </div>
  );  
}
