import { Pool } from 'pg'
import { AppError } from '../utils/app-error'
import { transactional } from '../decorators/transactional'

export class DishService {
  async create(name: string, description: string) {
    const client = await new Pool()
    try {
      const result = await client.query(
        `INSERT INTO dishes(name, description) VALUES ($1, $2) RETURNING id`, [name, description]
      )
      return result.rows[0].id
    }catch (error) {
      throw new AppError('Erro ao criar prato', 500)
    }
  }

  // Retornar pratos da empresa por cada tipo de refeição, caso não exista relação relação prato/tipo de refeição, retornar como others
  @transactional
  async getAll(enterpriseId: number, client: Pool) {
    try {
      const menuResult = await client.query(
        `SELECT d.id, d.name, d.description, md.meal_type
        FROM menu_dish md
          JOIN dish d ON md.id_dish = d.id
        WHERE d.enterprise_id = $1
        GROUP BY d.id, d.name, d.description, md.meal_type`, [enterpriseId]
      )
    } catch(error) {

    }
  }
}