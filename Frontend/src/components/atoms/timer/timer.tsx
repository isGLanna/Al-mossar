import { useEffect, useState } from "react"
import { TimeUtils } from "../../../models/TimeUtils"

interface TimerProps {
  seconds: number
  className?: string
}

export default function Timer({seconds, className}: TimerProps) {
  const [ remainingTime, setRemainingTime ] = useState<number>(seconds)

  useEffect(() => {
    const interval = setTimeout(() => {
      setRemainingTime(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(interval)
  }, [remainingTime])
  
  return (
    <div className={className}>{TimeUtils.formatRemainingTime(remainingTime)}</div>
  )
}