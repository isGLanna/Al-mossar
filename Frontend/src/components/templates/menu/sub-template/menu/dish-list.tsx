import { useState, useMemo } from "react"
import { MdDoubleArrow } from "react-icons/md";
import { Dish } from "../../../../../models/Menu"
import "./style/_menu.scss"
import "./style/dish-list.scss"

interface DishListProps {
  dishes: Dish[]
  deleted: boolean
  handleDeleteDish: (dishID: number) => void
}

export function DishList({ dishes, deleted, handleDeleteDish }: DishListProps) {
  const [openDescription, setOpenDescription] = useState<number[]>([])
  const mealTypes = useMemo(() => [  
    { label: "Café da manhã", value: "cafe_manha" },
    { label: "Almoço", value: "almoco" },
    { label: "Café da tarde", value: "cafe_tarde" },
    { label: "Janta", value: "janta" }
  ], [])

  const dishesByMealType = useMemo(() => {
    const map: Record<string, Dish[]> = {
      cafe_manha: [],
      almoco: [],
      cafe_tarde: [],
      janta: []
    }

    dishes.forEach(dish => map[dish.meal_type]?.push(dish))
    return map
  }, [dishes])

  return (
    <div className="dish-list">
        {/* Iterar sobre os pratos disponíveis, caso contrário, informar que não há pratos disponíveis*/}
        {dishes.length > 0 ? (

          mealTypes.map(({ label, value }) => {
            const filtered = dishesByMealType[value]
            
            if (!filtered.length) return null

            return (
              <section className="meal-section" key={value}>
                <h4 className="text-lg my-[5px]">{label}</h4>

                  {filtered.map((dish) => (
                    <article
                      className={`dish ${openDescription?.includes(dish.id) ? "expanded" : ""}`}
                      key={dish.id}
                      onClick={() => setOpenDescription(prev => prev.includes(dish.id) ? prev.filter(id => id !== dish.id) : [...prev, dish.id])}>

                      <span>
                        {dish.name}{" "}
                        {deleted && (
                          <button className="btn-delete" onClick={() => handleDeleteDish(dish.id)}>
                            <MdDoubleArrow className="btn-delete"/>
                          </button>
                        )}
                      </span>
                      <p>{dish.description}</p>

                    </article>
                ))}
              </section>)

          })
        ) : (
          <div className="dish">Nenhuma refeição foi encontrada</div>
        )}
    </div>
  )
}