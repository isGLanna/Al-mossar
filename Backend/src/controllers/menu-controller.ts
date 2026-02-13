import { Request, Response } from 'express'
import { MenuService } from '../services/menu-service'
// import { z } from 'zod';

export class MenuController {
  constructor(private service: MenuService) {}

  async create ( req: Request, res: Response ) {
      const { token, date, dishes } = req.body

      try {
        const newMenu = await this.service.createMenu( token, date, dishes)

        res.status(201).json(newMenu)
      } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cardápio', success: false})
    }
  }

  async get(req: Request, res: Response) {
    const { token, day } = req.query
// import { z } from 'zod';

export class MenuController {
  constructor(private service: MenuService) {}

  async create ( req: Request, res: Response ) {
      const { token, date, dishes } = req.body

      try {
        const newMenu = await this.service.createMenu( token, date, dishes)

        res.status(201).json(newMenu)
      } catch (error) {
        res.status(500).json({ error: 'Erro ao criar cardápio', success: false})
    }
  }

  async get(req: Request, res: Response) {
    const { token, day } = req.query

      try {
        const menu = await this.service.getMenuByDate(token as string, day as string)
      try {
        const menu = await this.service.getMenuByDate(token as string, day as string)

        const allDishes = [
          ...menu.cafe_manha,
          ...menu.almoco,
          ...menu.cafe_tarde,
          ...menu.janta
        ]
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
        const formattedDishes = allDishes.map((dish:any) => ({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          meal_type: dish.meal_type
        }))

        res.status(200).json({ dishes: formattedDishes, success: true })
        res.status(200).json({ dishes: formattedDishes, success: true })

      } catch (error) {
        res.status(500).json({ message: error, success: false })
      }
  }
      } catch (error) {
        res.status(500).json({ message: error, success: false })
      }
  }


  async update (req: Request, res: Response) {
    const { token, date, dishes } = req.body

  async update (req: Request, res: Response) {
    const { token, date, dishes } = req.body

    try {
      console.log(req.body)
      console.log(dishes.meal_type)
      const updated = await this.service.updateMenu(token, date, dishes)
    try {
      console.log(req.body)
      console.log(dishes.meal_type)
      const updated = await this.service.updateMenu(token, date, dishes)

      res.status(201).json(updated)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cardápio' })
    }
  }
      res.status(201).json(updated)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar cardápio' })
    }
  }

  async delete (req: Request, res: Response ) {
  const { token, name, date } = req.body

  try {
    const result = await this.service.deleteMenu(token, name, date)
    const result = await this.service.deleteMenu(token, name, date)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cardápio'})
  }
}
  }
}
}