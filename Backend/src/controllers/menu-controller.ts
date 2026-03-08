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

      const formattedMenu = {
        cafe_manha: menu.cafe_manha,
        almoço: menu.almoco,
        cafe_tarde: menu.cafe_tarde,
        janta: menu.janta}

      res.status(200).json(formattedMenu)

    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async insert (req: Request, res: Response) {
    const { menuId, dishes } = modifyMenuSchema.parse(req.body)

    try {
      await this.service.insertMenuDish(menuId, dishes)

      res.sendStatus(204)
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }



  async delete (req: Request, res: Response ) {
    const { menuId, dishes } = modifyMenuSchema.parse(req.body)
    try {
      await this.service.removeMenuDishes(menuId, dishes)
      res.sendStatus(204)
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async deleteBeforeThat (req: Request, res: Response) {
    const { enterpriseId, day } = deleteMenuSchema.parse(req.body)
    try {
      await this.service.deleteBeforeThat(enterpriseId, day)
      res.sendStatus(204)
    } catch(error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }
}