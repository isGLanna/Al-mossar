import { Request, Response } from 'express'
import { getMenuByDate, createMenu, updateMenu, deleteMenu } from '../services/menu-service'

// Selecionar o menu
export async function get ( req: Request, res: Response ): Promise<void> {
  const { day, id_enterprise } = req.query

  try {
    const menu = await getMenuByDate(String(day), Number(id_enterprise))

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

    console.log(formattedDishes)

    res.status(200).json({ dishes: formattedDishes, success: true })

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
    const updated = await updateMenu(id_enterprise, date, dishes)

    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar cardápio' })
  }
}

export async function deleted(req: Request, res: Response ): Promise<void> {
  const { id_enterprise, date } = req.body

  try {
    const result = await deleteMenu(date, id_enterprise)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cardápio'})
  }
}