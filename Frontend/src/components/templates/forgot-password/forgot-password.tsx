import '../../molecules/formulario.scss'
import { useState } from 'react'

export function ForgotPassword() {
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://localhost:4001/api/password-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, account_type: 'employee' }),
      })

    } catch (err: unknown) {
      alert(err)
    } finally {
      setEmail('')
      setLoading(false)
    }
  }
  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title-form__register">Recuperar senha</h2>
        <label className="text-wrap mb-[15px]">
          Para redefinir a sua senha, enviaremos um e-mail para a sua conta com o código de verificação. Por favor, não compartilhe este código.
        </label>
        
        <form className="form-group" onSubmit={handleSubmit}>
          <label>Email</label>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Digite seu email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              className={loading ? 'loading' : ''} type="submit" value={loading ? '' : 'Enviar código'} disabled={loading}/>
              {loading && (<div className='spinner fixed mt-[5px]'></div>)}
          </div>
        </form>

      </div>
    </div>
  )
}