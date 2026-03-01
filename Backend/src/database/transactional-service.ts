import { AppError } from '../utils/app-error'
import pool from './database'

export abstract class TransactionalService {
  async transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      const result = await callback(client)

      await client.query('COMMIT')

      return result
    } catch(error) {
      await client.query('ROLLBACK')
    
      if (error instanceof AppError) {
        throw error
      }

      const err = error instanceof Error ? error : new Error('Erro desconhecido')
      throw new AppError(err.message, 500)

    } finally {
      client.release()
    }
  }
}