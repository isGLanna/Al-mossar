import pool from '../database/database'
import { Response } from 'express'

export class AppError extends Error {
  public readonly error: any
  public readonly statusCode: number
  
  constructor(message: string, error: any, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.error = error
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
        setInterval(() => {attempt++}, 1000)
      }
    }
  }
}