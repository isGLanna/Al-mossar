import '../style/_menu.scss'

interface NewDishProps {
  newDish: {
    id: number
    name: string
    description: string
    meal_type: string
  }
  handleNewDishChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  handleSaveNewDish: () => void
  setNewDish(dish: NewDishProps["newDish"] | null): void
}

export function NewDish({newDish, handleNewDishChange, handleSaveNewDish, setNewDish}: NewDishProps) {
  return (
    <div className="dish new-dish">
      <div className="flex flex-col gap-2">
        <input
          name="name"
          placeholder="Nome do prato"
          value={newDish.name}
          onChange={handleNewDishChange}
        />
        <select name="meal_type" onChange={handleNewDishChange} value={newDish.meal_type}>
          <option value="cafe_manha">Café da manhã</option>
          <option value="almoco">Almoço</option>
          <option value="cafe_tarde">Café da tarde</option>
          <option value="janta">Janta</option>
        </select>

        <textarea
          name="description"
          placeholder="Modo de preparo"
          value={newDish.description}
          onChange={handleNewDishChange}
        />
      </div>
      <div className="flex my-3 justify-evenly">
        <button onClick={handleSaveNewDish}>Salvar</button>
        <button onClick={() => setNewDish(null)}>Cancelar</button>
      </div>
    </div>
  )
}