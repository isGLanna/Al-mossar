import { useState } from "react"
import { FaArrowRightLong } from "../../icons"
import { Dish } from "../../../../../models/Menu"
import "../../style/_menu.scss"

interface DishListProps {
  dishes: Dish[]
  deleted: boolean
  handleDeleteDish: (dishID: number) => void
}

export function DishList({ dishes, deleted, handleDeleteDish }: DishListProps) {
  const [openDescription, setOpenDescription] = useState<number | null>(null)

  return (
    <div className="dish-list">
      {dishes.length > 0 ? (
        dishes.map((dish) => (
          <div
            className={`dish ${
              openDescription === dish.id ? "expanded" : ""
            }`}
            key={dish.id}
            onClick={() => setOpenDescription(dish.id === openDescription ? null : dish.id)}
          >
            <span>
              {dish.name}{" "}
              {deleted && (
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteDish(dish.id)}
                >
                  <FaArrowRightLong className="btn-delete"/>
                </button>
              )}
            </span>
            <p>{dish.description}</p>
          </div>
        ))
      ) : (
        <div className="dish">Nenhuma refeição foi encontrada</div>
      )}
    </div>
  )
}