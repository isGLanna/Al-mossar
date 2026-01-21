import { useState } from 'react'
import Timer from '../../../atoms/timer/timer'
import "../../../atoms/spinner.sass"

interface ForgotPasswordProps{
  email: string
  setEmail: (email: string) => void
  setCode: (code: string) => void
  handleNextStep: () => void
}

export default function ForgotPassword({email, setEmail, setCode, handleNextStep}: ForgotPasswordProps) {
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ emptyField, setEmptyField ] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(prev => !prev)
    setEmptyField(prev => !(email.trim().length !== 0))

    if (emptyField) return

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
    } finally {
      setLoading(prev => !prev)
    }
  }

  return (
    <div className="form-container">
      <h2 className="title-form__register">Recuperar senha</h2>
      <p className="text-wrap mb-[15px]">
        Para redefinir a sua senha, enviaremos um e-mail para a sua conta com o código de verificação. Por favor, não compartilhe este código.
      </p>
      
      <form className="form-group" onSubmit={handleSubmit}>
        <label className={emptyField ? 'empty-input' : ''} htmlFor='email-field'>Email</label>
        <div className="input-wrapper">
          <input
            className={emptyField ? 'empty-input' : ''}
            id='email-field'    name="email"    type="email"    value={email}
            placeholder="Digite seu email"
            autoComplete="email"
            onChange={e => {
              setEmail(e.target.value) 
              setEmptyField(false)}}
          />
        </div>

        <div className="form-group">
          <input className={loading ? 'loading' : ''} type="submit" value={loading ? '' : 'Enviar e-mail'} disabled={loading} />
          {loading && (<div className='spinner fixed mt-[5px]'></div>)}
        </div>
      </form>

    </div>
  )
}