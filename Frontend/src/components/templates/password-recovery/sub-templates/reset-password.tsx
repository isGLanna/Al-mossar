import { useState } from 'react'

interface ResetPasswordProps {
  email: string,
  code: string,
  handleStep: (number: number) => void
}

export default function ResetPassword({email, code, handleStep}: ResetPasswordProps) {
  const url = import.meta.env.VITE_API_GO || 'https://localhost:4001'
  const [ formData, setFormData ] = useState<{ password: string; confirmPassword: string }>({
    password: '',
    confirmPassword: ''
  })

  const { password, confirmPassword } = formData

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/api/password-reset`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, code, account_type:"employee", password, confirmPassword }), 
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      if (!data.valid) throw new Error(data.message || 'Código inválido')

      handleStep(1)
    } catch (err: unknown) {
      alert(err)
    }
  }

  return (
    <section className="form-container">
      <h2 className="title-form__register">Recuperar senha</h2>
      <p className="wrapper">Após a verificação do código, o seu código irá expirar em 30 minutos por segurança.</p>
      
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password"> Senha </label>
          <input type="password" name="password" id="password"
           value={password}
           min={4} max={16} onChange={handleChange}/>
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword"> Confirmar senha </label>
          <input type="password" name="confirmPassword" id="confirmPassword"
           value={confirmPassword} 
           min={4} max={16} onChange={handleChange}/>
        </div>
        
        <input type="submit" value="Alterar senha" />
      </form>
    </section>
  )
}