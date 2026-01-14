import '../../molecules/formulario.scss'
import ForgotPassword from './sub-templates/forgot-password'
import ResetPassword from './sub-templates/reset-password'
import VerifyRecoveryCode from './sub-templates/verify-recovery-code'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export function PasswordRecovery() {
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<number>(0)
  const [nextStep, setNextStep] = useState<number>(1)
  const navigate = useNavigate()

  const handleNextStep = () => {
    setNextStep(prevStep => prevStep + 1)
  }


  return (
    <div className="container">
      {(() => {
        switch (nextStep) {
          case 1:
            return <ForgotPassword email={email} setEmail={setEmail} setCode={setCode} handleNextStep={handleNextStep}/>
          case 2:
            return <VerifyRecoveryCode email={email} code={code} handleNextStep={handleNextStep}/>
          case 3:
            return <ResetPassword email={email} code={code} handleNextStep={handleNextStep}/>
          case 4:
            navigate({ to: '/' })
            break
        }
      })()}
    </div>
  )
}