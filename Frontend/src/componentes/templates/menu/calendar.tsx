import { useState } from 'react'
import { GrFormNext, GrFormPrevious } from './icons'
import './calendar.sass'

export function MenuCalendar(){
  const today = new Date()
  const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getMonthName = (month: number) => {
    return new Date(0, month).toLocaleString("default", { month: "long" })
  }

  // lida com o calendário
  const [ currentMonth, setCurrentMonth ] = useState(today.getMonth())
  const [ currentYear, setCurrentYear ] = useState(today.getFullYear())
  const [ selectedDay, setSelectedDay ] = useState(today.getDate());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()

  const daysArray = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ]

  const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentYear((y) => y - 1)
        setCurrentMonth(11)
      }else{
        setCurrentMonth(currentMonth - 1)
      }
  }

  const handleNextMonth = () => {

    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1)
      setCurrentMonth(0)
    }else{
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day)
  }

  

  return (
    <div className='menuContainer'>
      <div className='calendar'>
        <div className='header'>
          <button onClick={handlePrevMonth}> <GrFormPrevious size={25}/> </button>
          <span>{getMonthName(currentMonth)} / {currentYear}</span>
          <button onClick={handleNextMonth}> <GrFormNext size={25}/> </button>
        </div>

        <div className='week'>
          {week.map((dayName) => (
            <div key={dayName}> 
              {dayName}
            </div>
          ))}
        </div>

        <div className='days'>
          {daysArray.map((day, index) => (
            day ? (<button
              key={day}
              className={`day ${ day === selectedDay  ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
              >
                {day}
              </button>
            ) : (
              <div key={`empty-${index}`} className='empty' />
            )
          ))}
        </div>

      </div>
    </div>
  )

}