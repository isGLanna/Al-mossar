import { Request, Response } from 'express'
import { DishService } from '../service/dish-service'
import { AppError } from '../utils/app-error'

export class DishController {
  constructor(private service: DishService) {}

  async createDish (req: Request, res: Response) {
  }

  async getDish (req: Request, res: Response) {
  }

  async updateDish (req: Request, res: Response) {
  }

  async deleteDish (req: Request, res: Response) {
  }
}