import { Request, Response } from 'express'
import { getMenuByDate, createMenu, updateMenu, deleteMenu } from '../services/menu-service'
import { refreshToken } from '../services/authenticator'

// Selecionar o menu
export async function get ( req: Request, res: Response ): Promise<void> {
  const { token, day } = req.query

  try {
    const menu = await getMenuByDate(token as string, day as string)

    // Retorna operação efetuada com sucesso ou nenhum valor encontrado
    if (!menu) {
      res.status(404).json({ message: 'Não há refeições para o dia.', success: true })
      return
    }

    const formattedDishes = menu.dishes.map((dish: any) => ({
      id: dish.id,
      name: dish.name,
      description: dish.description
    }))

    const result = await refreshToken(token as string)

    if (!result || result.success === false) {
      res.status(401).json({ message: 'Invalid token or expired', success: false })
    }

    res.status(200).json({ token: result.token, dishes: formattedDishes, success: true })

  } catch (error) {
    res.status(500).json({ message: error, success: false })
  }
}

// Cria o menu
export async function create ( req: Request, res: Response ): Promise<void> {
  const { date, id_enterprise, dishes } = req.body

  try {
    const newMenu = await createMenu(date, id_enterprise, dishes)

    res.status(201).json(newMenu)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar cardápio', success: false})
  }
}

export async function update ( req: Request, res: Response ): Promise<void> {
  const { date, id_enterprise, dishes } = req.body

  try {
    const updated = await updateMenu(date, id_enterprise, dishes)

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cardápio' })
  }
}

export async function deleted(req: Request, res: Response ): Promise<void> {
  const { id_enterprise, name, date } = req.body

  try {
    const result = await deleteMenu(id_enterprise, name, date)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cardápio'})
  }
}