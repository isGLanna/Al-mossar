import { Request, Response } from 'express'
import { DishService } from '../services/dish-service'
import { createDishSchema, updateDishSchema, deleteDishSchema } from '../validations/dish.schemas'
import { AppError } from '../utils/app-error'

export class DishController {
  constructor(private service: DishService) {}

  async createDish (req: Request, res: Response) {
    const { enterpriseId, name, description } = createDishSchema.parse(req.body)
    try {
      await this.service.create(enterpriseId, name, description)

      res.sendStatus(204)
    } catch(error: unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async getAll(req: Request, res: Response) {
    if(!req.user) throw new AppError('Usuário não autenticado', null, 401)
    const enterpriseId = req.user.enterpriseId
    try {
      const listOfDishes = await this.service.getAllByMealType(enterpriseId)

      res.status(200).json(listOfDishes)
    } catch(error: unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async updateDish (req: Request, res: Response) {
    const { id, name, description } = updateDishSchema.parse(req.body)
    if (!req.user)  throw new AppError('Usuário não autenticado', null, 401)
    const enterpriseId = req.user.enterpriseId
    try {
      await this.service.update(enterpriseId, id, name, description)

      res.sendStatus(204)
    }catch(error: unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async getUnusedDishes(req: Request, res: Response) {
    if(!req.user) throw new AppError('Usuário não autenticado', null, 401)
    const enterpriseId = req.user.enterpriseId
    try {
      const unusedDishes = await this.service.getUnusedDishes(enterpriseId)

      res.status(200).json(unusedDishes)
    } catch (error: unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async deleteDish (req: Request, res: Response) {
    const { id } = deleteDishSchema.parse(req.body)
    if(!req.user) throw new AppError('Usuário não autorizado', null, 401)
    const enterpriseId = req.user.enterpriseId
    try {
      await this.service.delete(enterpriseId, id)

      res.sendStatus(200)
    } catch (error: unknown) {
      AppError.sendErrorResponse(res,error as AppError)
    }
  }
}