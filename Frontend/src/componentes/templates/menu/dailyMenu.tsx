import { useState, useEffect } from 'react'
import { GrFormNext, GrFormPrevious } from './icons'
import { MenuDish, Dish } from '../../../models/Menu'
import './calendar.sass'


export function DailyMenu({ idEnterprise }: { idEnterprise: number }){
  const today = new Date()
  const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const [dishes, setDishes] = useState<Dish[]>([])

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
    fetchMenuForDay(day)
  }

  // Criar uma função para buscar cardápio do dia no backend
  const fetchMenuForDay = async (day: number) => {
    const menuDish = new MenuDish(idEnterprise, `${currentYear}-${currentMonth + 1}-${day}`)
    await menuDish.fetchMenu()
    setDishes(menuDish.getDishes() || [])
  }

  useEffect(() => {
    fetchMenuForDay(today.getDate()) // Ao montar o componente, busca o cardápio do dia
  }, [currentMonth, currentYear])

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

        { dishes.length > 0 ? 
        (dishes.map((dish) => (
          <div className='dish' key={dish.id}>
            {dish.name}
          </div>
        ))) :
        (<div className='dish'>Nenhuma refeição foi encontrada</div>)}

      </article>
    </section>
  )

}