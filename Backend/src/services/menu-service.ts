import { Menu, Dish } from '../repositories/menu'
import client from '../database/database'
import { PoolClient } from 'pg'
import { transactional } from '../decorators/transactional'
import { AppError } from '../utils/app-error'

type MealType = 'cafe_manha' | 'almoco' | 'cafe_tarde' | 'janta'

type MenuDish = {
  id: number
  name: string
  description: string
  meal_type: MealType
}

export class MenuService {

  @transactional
  async create(enterpriseId: number, day: string, dishes: { dishId: number; mealType: string }[], client?: PoolClient) {
    const menuResult = await client!.query(`
      SELECT m.id
      FROM menu m
      JOIN menu_dish md ON m.id = md.id_menu
      WHERE m.enterprise_id = $1
        AND m.day = $2
        AND md.meal_type = $3
      LIMIT 1`,
      [enterpriseId, day, dishes[0].mealType]
    );

    if (menuResult.rowCount) {
      throw new AppError('Cardápio para esse dia e tipo de refeição já existe', 'BadRequest', 400);
    }

    const insertMenuResult = await client!.query(
      `INSERT INTO menu(enterprise_id, day) VALUES ($1, $2) RETURNING id`,
      [enterpriseId, day]
    );
    
    const menuId = insertMenuResult.rows[0].id;

    await Promise.all(
      dishes.map(({ dishId, mealType }) => {
        return client!.query(`
          INSERT INTO menu_dish(id_menu, id_dish, meal_type)
          VALUES ($1, $2, $3)`,
          [menuId, dishId, mealType]
        );
      })
    );
  }

  async getMenuByDate(enterpriseId: number, day: string) {
    try {
      const menu = await client.query(`
        SELECT m.id, d.id, d.name, d.description, md.meal_type
        FROM menu m
          JOIN menu_dish md ON md.id_menu = m.id
          JOIN dish d ON md.id_dish = d.id
        WHERE m.enterprise_id = $1
          AND m.day = $2`, [enterpriseId, day])

      const listOfDishes: Record<MealType, MenuDish[]> = { cafe_manha: [], almoco: [], cafe_tarde: [], janta: []  }

      for (const dish of menu.rows as MenuDish[]) {
        if (dish.meal_type && listOfDishes[dish.meal_type] !== undefined) {
          listOfDishes[dish.meal_type].push(dish)
        }
      }

      return listOfDishes
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async insertMenuDish(menuId: number, dishes: { dishId: number, mealType: string }[]) {
    try {
      await Promise.all(dishes.map(({dishId, mealType}) =>
        client.query(`
          INSERT INTO menu_dish(id_menu, id_dish, meal_type)
          VALUES ($1, $2, $3)`, [menuId, dishId, mealType]))
      )

    }catch(error: AppError | any) {
      throw new AppError(error.message, error, error.status)
    }
  }

  // Remover relacionamentos entre menu e pratos
  async removeMenuDishes(menuId: number, dishes: {dishId: number, mealType: string}[]) {
    try {
      await Promise.all(dishes.map(({dishId, mealType}) => {
      return client.query(
        `DELETE FROM menu_dish md
        WHERE id_dish = $1
          AND id_menu = $2
          AND meal_type = $3`,
          [dishId, menuId, mealType]
        )
      }))
    } catch(error: AppError | any) {
      throw new AppError(error?.message || 'Falha ao remover pratos do cardápio', error, error.status || 500)
    }
  }

  async deleteBeforeThat(enterpriseId: number, day: string) {
    const today = new Date()
    const targetDate = new Date(day)
    try {
      if (targetDate > today) throw new AppError('A data deve ser anterior a atual', 'BadRequest', 400)

      const deleteResult = await client.query(
        `DELETE FROM menu
        WHERE enterprise_id = $1
          AND day < $2`, [enterpriseId, day])

      if(deleteResult.rowCount === 0)
        throw new AppError('Nenhum cardápio removido', 404)
    }catch(error: AppError | any) {
      throw new AppError(error?.message || 'Falha ao remover cardápios', error, error.status)
    }
  }
}
