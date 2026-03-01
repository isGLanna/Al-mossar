import pool from '../database/database'

export class AppError {
  public readonly message: string
  public readonly statusCode: number
  
  constructor(message: string, statusCode = 500) {
    this.message = message
    this.statusCode = statusCode
    this.saveError()
  }

  async saveError() {
    let attempt = 0

    while (attempt < 3) {
      try {
        await pool.query(`
          INSERT INTO errors(message, status_code, created_at)
          VALUES ($1, $2, $3)`, [this.message, this.statusCode, new Date()])

        break
      } catch(error){
        attempt++
      }
    }
  }
}