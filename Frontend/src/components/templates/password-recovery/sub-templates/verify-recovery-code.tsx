import { TimeUtils } from "../../../../models/TimeUtils"
import { useState } from "react"

interface VerifyRecoveryCodeProps {
  email: string,
  code: string,
  setCode: (code: string) => void
  handleNextStep: () => void
}

export default function VerifyRecoveryCode({email, code, setCode, handleNextStep}: VerifyRecoveryCodeProps) {
  const [scheduler, setScheduler] = useState<string>(TimeUtils.scheduler(3))

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
      <h2>Preencher código</h2>
      <section className="scheduler">{scheduler}</section>
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