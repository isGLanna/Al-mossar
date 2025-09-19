import { useState, useEffect, useRef } from "react"
import {TfiWrite, FaTrashArrowUp, IoMdAddCircleOutline, FaArrowRightLong} from "./icons"
import { MenuDish, Dish } from "../../../models/Menu"
import { Calendar } from "./sub-template/calendar"
import "./calendar.scss"

export function DailyMenu() {
  const today = new Date()
  const [dishes, setDishes] = useState<Dish[]>([])
  const menuDishRef = useRef<MenuDish | null>(null)
  const [openDescription, setOpenDescription] = useState<number | null>(null)
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

  // Expansão de descrição
  const handleDescription = (id: number) => {
    setOpenDescription(openDescription === id ? null : id)
  }

  useEffect(() => {
    fetchMenuForDay(today.getDate())
  }, [currentMonth, currentYear])

  // Novo prato
  const handleNewDishChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      newDish.description.trim()
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
      {/* Calendário modularizado */}
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

        {dishes.length > 0 ? (
          dishes.map((dish) => (
            <div
              className={`dish ${
                openDescription === dish.id ? "expanded" : ""
              }`}
              key={dish.id}
              onClick={() => handleDescription(dish.id)}
            >
              <span>
                {dish.name}{" "}
                {deleted && (
                  <FaArrowRightLong
                    className="btn-delete"
                    onClick={() => handleDeleteDish(dish.id)}
                  />
                )}
              </span>
              <p>{dish.description}</p>
            </div>
          ))
        ) : (
          <div className="dish">Nenhuma refeição foi encontrada</div>
        )}

        {newDish && (
          <div className="dish new-dish">
            <div className="flex flex-col gap-2">
              <input
                name="name"
                placeholder="Nome do prato"
                value={newDish.name}
                onChange={handleNewDishChange}
              />
              <textarea
                name="description"
                placeholder="Modo de preparo"
                value={newDish.description}
                onChange={handleNewDishChange}
              />
            </div>
            <div className="flex gap-2 justify-center mt-2">
              <button onClick={handleSaveNewDish}>Salvar</button>
              <button onClick={() => setNewDish(null)}>Cancelar</button>
            </div>
          </div>
        )}

        <footer className="menu-footer">
          <TfiWrite cursor={"pointer"} />
          <button
            aria-label="Adicionar prato"
            onClick={() =>
              newDish
                ? setNewDish(null)
                : setNewDish({ id: 0, name: "", description: "" })
            }
          >
            <IoMdAddCircleOutline cursor={"pointer"} size={25} />
          </button>
          <FaTrashArrowUp cursor={"pointer"} onClick={() => setDeleted(!deleted)} />
        </footer>
      </article>
    </section>
  )
}
