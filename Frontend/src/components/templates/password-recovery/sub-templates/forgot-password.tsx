import { useState } from 'react'

interface ForgotPasswordProps{
  email: string
  setEmail: (email: string) => void
  setCode: (code: string) => void
  handleNextStep: () => void
}

export default function ForgotPassword({email, setEmail, setCode, handleNextStep}: ForgotPasswordProps) {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:4001/api/password-recovery', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, account_type: 'employee' }),
      })

      if (!response.ok) throw new Error('Erro ao enviar o código de recuperação')
      handleNextStep()
      
    } catch (err: unknown) {
      alert(err)
    }
  }

  return (
    <div className="form-container">
      <h2 className="title-form__register">Recuperar senha</h2>
      <p className="text-wrap mb-[15px]">
        Para redefinir a sua senha, enviaremos um e-mail para a sua conta com o código de verificação. Por favor, não compartilhe este código.
      </p>
      
      <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor='email-field'>Email</label>
        <div className="input-wrapper">
          <input
            id='email-field'
            type="email"
            name="email"
            value={email}
            placeholder="Digite seu email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="submit" value={'Enviar código'}/>
        </div>
      </form>

    </div>
  )
}