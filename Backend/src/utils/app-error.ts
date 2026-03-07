import pool from '../database/database'
import { Response } from 'express'

export class AppError {
  public readonly message: string
  public readonly error: any
  public readonly statusCode: number
  
  constructor(message: string, error: any, statusCode = 500) {
    this.message = message
    this.error = error
    this.statusCode = statusCode
    this.saveError()
  }

  async saveError() {
    let attempt = 0

    while (attempt < 3) {
      try {
        await pool.query(`
          INSERT INTO errors(message, log_error, status_code, created_at)
          VALUES ($1, $2, $3, $4)`, [this.message, this.error, this.statusCode, new Date()])

        break
      } catch(error){
        attempt++
      }
    }
  }

  static sendErrorResponse(res: Response, error: AppError) {
    res.status(error.statusCode).json({ success: false, message: error.message})
  }
}