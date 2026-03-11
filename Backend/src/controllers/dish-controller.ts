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
    } catch(error: AppError | any) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async getAll(req: Request, res: Response) {
    const { enterpriseId } = req.body
    try {
      const listOfDishes = await this.service.getAllByMealType(enterpriseId)

      res.status(200).json(listOfDishes)
    } catch(error: AppError | any) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async updateDish (req: Request, res: Response) {
    const { id, name, description } = updateDishSchema.parse(req.body)
    try {
      await this.service.update(id, name, description)

      res.sendStatus(204)
    }catch(error: AppError | any) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async getUnusedDishes(req: Request, res: Response) {
    const  { enterpriseId } = req.body
    try {
      const unusedDishes = await this.service.getUnusedDishes(enterpriseId)

      res.status(200).json(unusedDishes)
    } catch (error: AppError | unknown) {
      AppError.sendErrorResponse(res, error as AppError)
    }
  }

  async deleteDish (req: Request, res: Response) {
  }
}