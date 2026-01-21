import Timer from '../../../atoms/timer/timer'

interface VerifyRecoveryCodeProps {
  email: string,
  code: string,
  setCode: (code: string) => void
  handleNextStep: () => void
}

export default function VerifyRecoveryCode({email, code, setCode, handleNextStep}: VerifyRecoveryCodeProps) {

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:4001/api/check-code-recovery', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: email, code: code }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)
        
      handleNextStep()
        
    } catch (err: unknown) {
      alert(err)
    }
  }

  return (
    <section className="form-container">
      <h2  className="title-form__register">Preencher código</h2>
      <p className="text-wrap">Insira o código enviado no seu e-mail. Caso não seja enviado a tempo, solicite novamente.</p>
      <Timer className='my-[15px] py-[5px] px-[36px] text-[var(--branding-600)] font-bold text-[18px] rounded-[5px] border-2 border-[var(--branding-600)]' seconds={300} />

      <form className="form-group" onSubmit={handleSubmit}>
        <label>Código</label>
        <div className="input-wrapper">
          <input 
            className="text-center" 
            type="text" 
            name="code" 
            value={code} maxLength={5}
            onChange={e => setCode(e.target.value)}
            />
        </div>

        <div className="form-group">
          <input
            type="submit" value="Enviar código" />
        </div>
      </form>
    </section>
  )
}