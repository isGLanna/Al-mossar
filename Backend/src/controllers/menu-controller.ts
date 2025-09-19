import { Request, Response } from 'express'
import { getMenuByDate, createMenu, updateMenu, deleteMenu } from '../services/menu-service'
import { refreshToken } from '../services/authenticator'

// Selecionar o menu
export async function get ( req: Request, res: Response ): Promise<void> {
  const { token, day } = req.query

  try {
    const menu = await getMenuByDate(token as string, day as string)

    const formattedDishes = menu?.dishes?.map((dish: any) => ({
      id: dish.id,
      name: dish.name,
      description: dish.description
    })) || []

    const result = await refreshToken(token as string)

    res.status(200).json({ token: result.token, dishes: formattedDishes, success: true })

  } catch (error) {
    res.status(500).json({ message: error, success: false })
  }
}

// Cria o menu
export async function create ( req: Request, res: Response ): Promise<void> {
  const { token, date, dishes } = req.body

  try {
    const newMenu = await createMenu( token, date, dishes)

    res.status(201).json(newMenu)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cardápio', success: false})
  }
}

export async function update ( req: Request, res: Response ): Promise<void> {
  const { token, date, dishes } = req.body

  try {
    const updated = await updateMenu(token, date, dishes)

    res.status(201).json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cardápio' })
  }
}

export async function deleted(req: Request, res: Response ): Promise<void> {
  const { token, name, date } = req.body

  try {
    const result = await deleteMenu(token, name, date)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cardápio'})
  }
}