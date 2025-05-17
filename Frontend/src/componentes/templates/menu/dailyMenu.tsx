import { useState, useEffect, useRef  } from 'react'
import { GrFormNext, GrFormPrevious, TfiWrite, FaTrashArrowUp, IoMdAddCircleOutline, MdClose } from './icons'
import { MenuDish, Dish } from '../../../models/Menu'
import './calendar.sass'


export function DailyMenu({ idEnterprise }: { idEnterprise: number }){
  const today = new Date()
  const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

  const [dishes, setDishes] = useState<Dish[]>([])
  const menuDishRef = useRef<MenuDish | null>(null)
  const [openDescription, setOpenDescription] = useState<number | null>(null)
  const [newDish, setNewDish] = useState<Dish | null>(null)

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
  const [ deleted, setDeleted ] = useState(false)

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
    menuDishRef.current = menuDish
  }

  // Lidar com expansão de descrição de pratos
  const handleDescription = (id: number) => {
    if (openDescription === id)
      setOpenDescription(null)
    else
      setOpenDescription(id)
  }

  useEffect(() => {
    fetchMenuForDay(today.getDate()) // Ao montar o componente, busca o cardápio do dia
  }, [currentMonth, currentYear])

  // Adicionar novo prato
  const handleNewDishChange  = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (newDish) setNewDish( {
      ...newDish, [e.target.name]: e.target.value
    })}

  // Salvar novo prato e atualizar backend
  const handleSaveNewDish = async () => {
    if (!newDish || !newDish.name.trim()) return;

    menuDishRef.current = new MenuDish(idEnterprise, `${currentYear}-${currentMonth + 1}-${selectedDay}`);
    await menuDishRef.current.fetchMenu();

    const menuDish = menuDishRef.current;
    menuDish.addDishByName(newDish.id, newDish.name.trim(), newDish.description.trim());

    const response = dishes.length === 0 ?
      await menuDish.createMenu() :
      await menuDish.updateMenu()

    if (response.success) {
      setNewDish(null);
      setDishes(menuDish.getDishes());
    } else {
      alert(response.message);
    }
  }

  const handleCancelNewDish = () => {
    setNewDish(null);
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
        <header className='menu-header'>Cardápio</header>
      
      {/* Verifica tamanho do array, caso esteja vazio, informa não ter */}
        { dishes.length > 0 ? 
        (dishes.map((dish) => (
          <div className={`dish ${openDescription === dish.id ? 'expanded' : ''} ${deleted ? 'active' : ''}`} key={dish.id} onClick={() => handleDescription(dish.id)}>
            {dish.name}
            <p>{dish.description}</p>
          </div>
        ))) :
        (<div className='dish'>Nenhuma refeição foi encontrada</div>)}

        {newDish && (
          <div className="dish expanded">
            <div className='flex flex-col gap-2'>
              <input
                name='name'
                placeholder="Nome do prato"
                value={newDish.name}
                onChange={handleNewDishChange}
              />
              <textarea
                name="description"
                placeholder="Modo de preparo"
                value={newDish.description}
                onChange={handleNewDishChange}
                rows={2}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'center' }}>
              <button onClick={handleSaveNewDish}>Salvar</button>
              <button onClick={handleCancelNewDish}>Cancelar</button>
            </div>
          </div>
        )}

        <footer className='menu-footer'>
          <TfiWrite cursor={'pointer'}/>
          <IoMdAddCircleOutline cursor={'pointer'} size={25} onClick={() => setNewDish({ id: Date.now(), name: '', description: '' })}/>
          <FaTrashArrowUp cursor={'pointer'} onClick={() => setDeleted(!deleted)}/>
        </footer>

      </article>

    </section>
  )

}