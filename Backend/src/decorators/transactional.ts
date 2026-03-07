import { AppError } from '../utils/app-error'
import pool from '../database/database'

export function transactional(target: any, propertyKey: string , descriptor: PropertyDescriptor){
  const originalMethod = descriptor.value

  descriptor.value = async function(...args: any[]) {
    const client = await pool.connect()

    try {
      await client.query('BEGIN')

      const result = await originalMethod.apply(this, [...args, client])

      await client.query('COMMIT')

      return result
    } catch(error: Error | AppError | any) {
      try {
        await client.query('ROLLBACK')
      } catch(error) {
        console.log('Critical failure: unsuccessfull rollback', error)
      }
        
      if (error instanceof AppError) throw error

      throw new AppError(error.message || "Erro interno do servidor", error, 500)
    } finally {
      client.release()
    }
  }

  return descriptor
}