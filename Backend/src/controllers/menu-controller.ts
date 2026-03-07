import { Request, Response } from 'express'
import { MenuService } from '../services/menu-service'
import { AppError } from '../utils/app-error'
import { createMenuSchema, queryMenuSchema, modifyMenuSchema, deleteMenuSchema } from '../validations/menu.schemas'

export class MenuController {
  constructor(private service: MenuService) {}

  async createMenu ( req: Request, res: Response ) {
    const { enterpriseId, day, dishes } = createMenuSchema.parse(req.body)

    try {
      await this.service.create(enterpriseId, day, dishes)

      res.status(201).json()
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async getMenu(req: Request, res: Response) {
    const { enterpriseId, day } = queryMenuSchema.parse(req.body)

    try {
      const menu = await this.service.getMenuByDate(enterpriseId, day)

      const formattedDishes = Object.values(menu).flat().map(dish => ({
        id: dish.id,
        name: dish.name,
        description: dish.description,
        meal_type: dish.meal_type
      }))

      res.status(200).json({ dishes: formattedDishes })

    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async insert (req: Request, res: Response) {
    const { menuIds, dishes } = modifyMenuSchema.parse(req.body)

    try {
      await this.service.insertMenuDish(menuIds, dishes.map(d => ({ dishId: d.dishId, mealType: d.mealType })))

      res.status(204).json()
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async delete (req: Request, res: Response ) {
    const { removals: {menuId, dishes{dishId, mealType}[]}[]} = req.body
    try {
      await this.service.removeMenuDishes(removals)
      res.status(204).json()
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async deleteBeforeThat (req: Request, res: Response) {
    const { enterpriseId, day } = deleteMenuSchema.parse(req.body)
    try {
      await this.service.deleteBeforeThat(enterpriseId, day)
    }
  }
}