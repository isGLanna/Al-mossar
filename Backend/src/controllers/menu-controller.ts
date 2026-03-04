import { Request, Response } from 'express'
import { MenuService } from '../services/menu-service'
import { AppError } from '../utils/app-error'

export class MenuController {
  constructor(private service: MenuService) {}

  async createMenu ( req: Request, res: Response ) {
    const { enterpriseId, day, dishes } = req.body

    try {
      await this.service.create(enterpriseId, day, dishes)

      res.status(201).json()
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async getMenu(req: Request, res: Response) {
    const { token, day } = req.query

    try {
      const menu = await this.service.getMenuByDate(token as string, day as string)

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

    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async updateMenu (req: Request, res: Response) {
    const { date, dishes, meal_type } = req.body

    try {

      const updated = await this.service.update(date, dishes, meal_type)

      res.status(200).json(updated)
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async deleteMenu (req: Request, res: Response ) {
    const { token, name, date } = req.body
    try {
      const result = await this.service.delete(token, name, date)
      res.status(200).json(result)
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async deleteBeforeThat (req: Request, res: Response) { 
  }
}