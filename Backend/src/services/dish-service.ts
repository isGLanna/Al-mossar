import { Pool } from 'pg'
import { AppError } from '../utils/app-error'
import client from '../database/database'

type MealType = 'cafe_manha' | 'almoco' | 'cafe_tarde' | 'janta'

type MenuDish = {
  id: number
  name: string
  description: string
  meal_type: MealType
}


export class DishService {
  async create(enterpriseId: number, name: string, description: string) {
    const client = await new Pool()
    try {
      const result = await client.query(
        `INSERT INTO dish(enterprise_id, name, description) VALUES ($1, $2, $3) RETURNING id`, [enterpriseId, name, description]
      )
      return result.rows[0].id
    }catch (error) {
      throw new AppError('Erro ao criar prato', 500)
    }
  }

  // Retornar pratos da empresa por cada tipo de refeição, caso não exista relação relação prato/tipo de refeição, retornar como others
  async getAllByMealType(enterpriseId: number) {
    try {
      const dishes = await client.query(
        `SELECT d.id, d.name, d.description, md.meal_type
        FROM dish d
          JOIN menu_dish md ON d.id = md.id_dish
        WHERE d.enterprise_id = $1`, [enterpriseId]
      )

      const listOfDishes: Record<MealType, MenuDish[]> = {cafe_manha: [], almoco: [], cafe_tarde: [], janta: []}

      for(const dish of dishes.rows as MenuDish[]) {
        if(dish.meal_type && listOfDishes[dish.meal_type] !== undefined) {
          listOfDishes[dish.meal_type].push(dish)
        }
      }

      return listOfDishes
    } catch(error: AppError | any) {
      throw new AppError("Falha ao consultar pratos", error, error.status || 500)
    }
  }

  async update(enterpriseId: number, id: number, name: string, description: string) {
    try {
      client.query(`
        UPDATE dish(name, description)
        SET name = $3 AND description = $4
        WHERE enterprise_id = $1
          id = $2`, [enterpriseId, id, name, description])
    } catch(error: AppError | any) {
      throw new AppError("Falha ao atualizar o prato", error, 500)
    }
  }

  async getUnusedDishes(enterpriseId: number) {
    try {
      const unusedDishes = await client.query(`
        SELECT d.id, d.name, d.description
        FROM dish d
          LEFT JOIN menu_dish md ON d.id = md.id_dish
        WHERE md.id_dish IS NULL
          AND d.enterprise_id = $1`, [enterpriseId])

      return unusedDishes.rows
    } catch(error: AppError | any) {
      throw new AppError("Falha ao retornar pratos não utilizados", error, error.status || 500)
    }
  }

  async delete(enterpriseId: number, id: number) {
    try{
      const client = await new Pool()

      const deleteRelation = await client.query(`
        DELETE FROM dish
        WHERE enterpriseId = $1
          AND id = $2`, [enterpriseId, id])

      if(deleteRelation.rowCount === 0)
        throw new AppError('Prato não encontrado', null, 404)
    } catch (error: AppError | any) {
      throw new AppError(error.message || 'Falha ao remover prato', error, error.status || 500 )
    }
  }
}