import { getToken } from '../components/templates/login/api'

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3000'

interface MenuResponse {
  success: boolean,
  message: string,
  dishes?: Dish[],
}

export interface Dish {
  id: number
  name: string
  description: string
  meal_type: string
}

export class MenuDish {
  private day: string = ''
  private dishes: Dish[] = []

  constructor(day: string) {
    this.day = MenuDish.normalizeDay(day)
  }

  private static normalizeDay(day: string): string {
    const [year, month, date] = day.split('-')
    if (!year || !month || !date) return day

    return `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`
  }

  private static authHeaders() {
    const token = getToken()
    return { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  private toApiDishes() {
    return this.dishes.map((dish) => ({
      dishId: dish.id,
      mealType: dish.meal_type,
    }))
  }

  // GET - query do cardápio do dia
  async fetchMenu(): Promise<void> {
    try {
      const result = await fetch(`${API_URL}/api/menus/${encodeURIComponent(this.day)}`, {
        method: 'GET',
        headers: MenuDish.authHeaders(),
      })

      if (!result.ok) throw new Error('Falha ao buscar cardápio')

      const data = await result.json()
      const cafeManha = Array.isArray(data.cafe_manha) ? data.cafe_manha : []
      const almoco = Array.isArray(data.almoco)
        ? data.almoco
        : Array.isArray(data['almoço'])
          ? data['almoço']
          : []
      const cafeTarde = Array.isArray(data.cafe_tarde) ? data.cafe_tarde : []
      const janta = Array.isArray(data.janta) ? data.janta : []

      this.dishes = [...cafeManha, ...almoco, ...cafeTarde, ...janta]

    } catch (error) {
      this.dishes = []
    }
  }

  // POST - criar cardápio
  async createMenu(): Promise<MenuResponse> {
    try {
      const result = await fetch(`${API_URL}/api/menus`, {
        method: 'POST',
        headers: MenuDish.authHeaders(),
        body: JSON.stringify({
          day: this.day,
          dishes: this.toApiDishes(),
        })
      })

      if (!result.ok) throw new Error('Falha ao criar cardápio')

      return { success: true, message: 'Cardápio criado'}
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || 'Erro ao atualizar'}
    }
  }

  // Atualizar cardápio
  async updateMenu(): Promise<MenuResponse> {
    try {
      const result = await fetch(`${API_URL}/api/menus`, {
        method: 'PUT',
        headers: MenuDish.authHeaders(),
        body: JSON.stringify({
          day: this.day,
          dishes: this.toApiDishes(),
        })
      })

      if (!result.ok) throw new Error('Falha ao atualizar cardápio')

      return { success: true, message: 'Cardápio atualizado'}
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || 'Erro ao atualizar'}
    }
  }

  // Deletar cardápio
  async deleteMenu(): Promise<MenuResponse> {
    try {
      const result = await fetch(`${API_URL}/api/menus?beforeDate=${encodeURIComponent(this.day)}`, {
        method: 'DELETE',
        headers: MenuDish.authHeaders(),
      })

      if (!result.ok) throw new Error('Falha ao excluir cardápio')

      this.dishes = []
      
      return { success: true, message: 'Cardápio excluido'}
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Erro ao deletar o cardápio.'}
    }
  }

  getDishes(): Dish[] {
    return this.dishes
  }

  getDay(): string {
    return this.day
  }

  setDishes(dishes: Dish[]): void {
    this.dishes = dishes
  }

  addDishByName(id: number, name: string, description: string, meal_type: string): void {
    const newDish: Dish = { id, name, description, meal_type };
    this.dishes.push(newDish);
  }

  setDay(day: string): void {
    this.day = MenuDish.normalizeDay(day)
  }
}