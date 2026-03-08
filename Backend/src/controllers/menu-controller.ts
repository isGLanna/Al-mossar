import { Request, Response } from 'express'
import { MenuService } from '../services/menu-service'
import { AppError } from '../utils/app-error'
import { createMenuSchema, queryMenuSchema, modifyMenuSchema, deleteMenuSchema, deleteBeforeThat } from '../validations/menu.schemas'

export class MenuController {
  constructor(private service: MenuService) {}

  async create ( req: Request, res: Response ) {
    const { day, dishes } = createMenuSchema.parse(req.body)
    try {
      if (!req.user)  throw new AppError('Usuário não autenticado', 401)

      const enterpriseId = req.user.enterpriseId

      await this.service.create(enterpriseId, day, dishes)

      res.status(201).json()
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async getMenuByDate(req: Request, res: Response) {
    const { day } = queryMenuSchema.parse(req.params)
    try {
      if (!req.user)  throw new AppError('Usuário não autenticado', 401)

      const enterpriseId = req.user.enterpriseId

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
    const { menuId, dishes } = deleteMenuSchema.parse(req.params)
    try {
      await this.service.removeMenuDishes(menuId, dishes)
      res.sendStatus(204)
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async deleteBeforeThat (req: Request, res: Response) {
    const { beforeDate } = deleteBeforeThat.parse(req.query)
    try {
      if (!req.user)  throw new AppError('Usuário não autenticado', 401)

      const enterpriseId = req.user.enterpriseId

      await this.service.deleteBeforeThat(enterpriseId, beforeDate)
      res.sendStatus(204)
    } catch(error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }
}