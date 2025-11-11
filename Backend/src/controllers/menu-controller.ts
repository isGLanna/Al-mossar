import { Request, Response } from 'express'
import { MenuService } from '../services/menu-service'

const service = new MenuService()

// Selecionar o menu
export async function get ( req: Request, res: Response ): Promise<void> {
  const { token, day } = req.query

  try {
    const menu = await service.getMenuByDate(token as string, day as string)

    const allDishes = [
      ...menu.cafe_manha,
      ...menu.almoco,
      ...menu.cafe_tarde,
      ...menu.janta
    ]

    const formattedDishes = allDishes.map((dish:any) => ({
      id: dish.id,
      name: dish.name,
      description: dish.description,
      meal_type: dish.meal_type
    }))

    res.status(200).json({ dishes: formattedDishes, success: true })

  } catch (error) {
    res.status(500).json({ message: error, success: false })
  }
}

// Cria o menu
export async function create ( req: Request, res: Response ): Promise<void> {
  const { token, date, dishes } = req.body

  try {
    const newMenu = await service.createMenu( token, date, dishes)

    res.status(201).json(newMenu)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cardápio', success: false})
  }
}

export async function update ( req: Request, res: Response ): Promise<void> {
  const { token, date, dishes } = req.body

  try {
    console.log(req.body)
    console.log(dishes.meal_type)
    const updated = await service.updateMenu(token, date, dishes)

    res.status(201).json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cardápio' })
  }
}

export async function deleted (req: Request, res: Response ): Promise<void> {
  const { token, name, date } = req.body

  try {
    const result = await service.deleteMenu(token, name, date)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cardápio'})
  }
}