import '../../molecules/formulario.scss'
import ForgotPassword from './sub-templates/forgot-password'
import ResetPassword from './sub-templates/reset-password'
import VerifyRecoveryCode from './sub-templates/verify-recovery-code'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export function PasswordRecovery() {
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [nextStep, setNextStep] = useState<number>(1)
  const navigate = useNavigate()

  const handleStep = (number: number) => {
    setNextStep(prevStep => prevStep + number)
  }


  return (
    <div className="container">
      {(() => {
        switch (nextStep) {
          case 1:
            return <ForgotPassword email={email} setEmail={setEmail} setCode={setCode} handleStep={handleStep}/>
          case 2:
            return <VerifyRecoveryCode email={email} code={code} setCode={setCode} handleStep={handleStep}/>
          case 3:
            return <ResetPassword email={email} code={code} handleStep={handleStep}/>
          case 4:
            navigate({ to: '/' })
            break
        }
      })()}
    </div>
  )
}