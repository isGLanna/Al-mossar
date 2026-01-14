import { useState } from 'react'

interface ResetPasswordProps {
  email: string,
  code: number,
  handleNextStep: () => void
}

type ResetPasswordResponse = {
  valid: boolean
  message?: string
}


export default function ResetPassword({email, code, handleNextStep}: ResetPasswordProps) {
  // criar um objeto que contem senha e confirmação de senha
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
      const response = await fetch('http://localhost:4001/api/verify-recovery-code', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, code, password, confirmPassword }), 
      })

      if (!response.ok) {
        throw new Error('Erro ao verificar o código de recuperação')
      }

      const data: ResetPasswordResponse = await response.json()

      if (!data.valid) {
        throw new Error(data.message || 'Código inválido')
      }

      handleNextStep()
    } catch (err: unknown) {
      alert(err)
    }
  }

  return (
    <section className="form-container">
      <h2 className="title-form__register">Recuperar senha</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input type="password" name="" id="" value={password} onChange={handleChange}/>
        <input type="password" name="" id="" value={confirmPassword} onChange={handleChange}/>
        <input type="submit" value="" />
      </form>
    </section>
  )
}