import { useState, useEffect, useRef } from "react"
import { MenuDish, Dish } from "../../../models/Menu"
import { Calendar } from "./sub-template/calendar/calendar"
import { NewDish } from "./sub-template/menu/new-dish"
import { MenuFooter } from "./sub-template/menu/menu-footer"
import { DishList } from "./sub-template/menu/dish-list"
import "./style/menuContainer.scss"

export function DailyMenu() {
  const today = new Date()
  const [dishes, setDishes] = useState<Dish[]>([])
  const menuDishRef = useRef<MenuDish | null>(null)
  const [newDish, setNewDish] = useState<Dish | null>(null)
  const [deleted, setDeleted] = useState(false)

  // Estados do calendário
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  // Alterar dia selecionado
  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    fetchMenuForDay(day)
  }

  // Buscar cardápio do dia
  const fetchMenuForDay = async (day: number) => {
    const menuDish = new MenuDish(`${currentYear}-${currentMonth + 1}-${day}`)
    await menuDish.fetchMenu()
    setDishes(menuDish.getDishes() || [])
    menuDishRef.current = menuDish
  }

  useEffect(() => {
    fetchMenuForDay(today.getDate())
  }, [currentMonth, currentYear])

  // Novo prato
  const handleNewDishChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (newDish) setNewDish({ ...newDish, [e.target.name]: e.target.value })
  }

  const handleSaveNewDish = async () => {
    if (!newDish || !newDish.name.trim()) return

    menuDishRef.current = new MenuDish(
      `${currentYear}-${currentMonth + 1}-${selectedDay}`
    )
    await menuDishRef.current.fetchMenu()

    const menuDish = menuDishRef.current
    menuDish.addDishByName(
      newDish.id,
      newDish.name.trim(),
      newDish.description.trim(),
      newDish.meal_type
    )

    try {
      const response =
        dishes.length === 0
          ? await menuDish.createMenu()
          : await menuDish.updateMenu()

      if (response.success) {
        setNewDish(null)
        setDishes(menuDish.getDishes())
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      alert(error)
    }
  }

  // Excluir prato
  const handleDeleteDish = async (id: number) => {
    if (!menuDishRef.current) return
    const menuDish = menuDishRef.current

    try {
      const updatedDishes = menuDish.getDishes().filter((dish) => dish.id !== id)
      menuDish.setDishes(updatedDishes)
      const response = await menuDish.updateMenu()
      if (response.success) setDishes(updatedDishes)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <section className="menuContainer">

      <Calendar
        currentMonth={currentMonth}
        currentYear={currentYear}
        selectedDay={selectedDay}
        onMonthChange={(year, month) => {
          setCurrentYear(year)
          setCurrentMonth(month)
        }}
        onDaySelect={handleDayClick}
      />

      <article className="menu">
        <header className="menu-header">Cardápio</header>

        <DishList
          dishes={dishes}
          deleted={deleted}
          handleDeleteDish={handleDeleteDish}
        />

        {newDish && (
          <NewDish 
            newDish={newDish} 
            handleNewDishChange={handleNewDishChange} 
            handleSaveNewDish={handleSaveNewDish}
            setNewDish={setNewDish}
          />
        )}

        <MenuFooter
          newDish={newDish}
          setNewDish={setNewDish}
          deleted={deleted}
          setDeleted={setDeleted}
        />


      </article>
    </section>
  )
}
