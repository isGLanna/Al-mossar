interface VerifyRecoveryCodeProps {
  email: string,
  code: number,
  handleNextStep: () => void
}

export default function VerifyRecoveryCode({email, code, handleNextStep}: VerifyRecoveryCodeProps) {
  return (
    <section className="form-container">
      <h2>Preencher código</h2>
      <form className="form-group">
        <label>Código</label>
        <input className="text-center" type="text" name="" id="" maxLength={6}/>
      </form>
    </section>
  )
}