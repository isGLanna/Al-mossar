import { Request, Response } from 'express'
// { BudgetService } from '../services/budget-service'
import { AppError } from '../utils/app-error'

export class BudgetController {
  constructor(private service: any) {}
}