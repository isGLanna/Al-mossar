import { useState } from 'react'
import { GrFormNext, GrFormPrevious } from './icons'
import './calendar.sass'

export function MenuCalendar({ user }: { user: string }){
  const today = new Date()
  const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const [dishes] = useState([
    {
      id: 1,
      name: 'Feijoada',
      descricao: 'Feijão preto com carnes e arroz',
      dia: 10
    },
    {
      id: 2,
      name: 'Estrogonofe',
      descricao: 'Frango ao creme com batata palha',
      dia: 11
    },
    {
      id: 3,
      name: 'Lasanha',
      descricao: 'Carne, queijo e molho de tomate',
      dia: 11
    }
  ])

  // Seleciona dia da semana
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Pega nome do mês
  const getMonthName = (month: number) => {
    return new Date(0, month).toLocaleString("default", { month: "long" })
  }

  // lida com consulta do calendário
  const [ currentMonth, setCurrentMonth ] = useState(today.getMonth())
  const [ currentYear, setCurrentYear ] = useState(today.getFullYear())
  const [ selectedDay, setSelectedDay ] = useState(today.getDate());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()

  const daysArray = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ]

  // Decrementar mês
  const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentYear((y) => y - 1)
        setCurrentMonth(11)
      }else{
        setCurrentMonth(currentMonth - 1)
      }
  }

  // Incrementar mês
  const handleNextMonth = () => {

    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1)
      setCurrentMonth(0)
    }else{
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Alterar dia selecionado
  const handleDayClick = (day: number) => {
    setSelectedDay(day)
  }

  return (
    <section className='menuContainer'>
      
      <article className='calendar'>
        <header className='header'>
          <button onClick={handlePrevMonth}> <GrFormPrevious size={25}/> </button>
          <span>{getMonthName(currentMonth)} / {currentYear}</span>
          <button onClick={handleNextMonth}> <GrFormNext size={25}/> </button>
        </header>

        <div className='week'>
          {week.map((day) => (
            <div key={day}> 
              {day}
            </div>
          ))}
        </div>

        <div className='days'>
          {daysArray.map((day, index) => (
            day ? (
            <button
              key={day}
              className={`day ${ day === selectedDay  ? 'selected' : ''}`}
              onClick={() => handleDayClick(day)}
              >
                {day}
            </button>
            ) : (
              <div key={`empty-${index}`} className='empty' />
            )))}
        </div>

      </article>

      <article className='menu'>
        <header className='header'>Cardápio</header>

        {dishes.map((dish) => (
          <div className='dish' key={dish.id}>
            {dish.name}
          </div>
        ))}
      </article>
    </section>
  )

}