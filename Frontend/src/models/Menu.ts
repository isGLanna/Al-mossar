import axios from 'axios'

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001'

export interface Dish {
  id: number
  name: string
  description: string
}

interface MenuResponse {
  success: boolean,
  message: string,
  dishes?: Dish[]
}

export interface Dish {
  id: number
  name: string
  description: string
}

export class MenuDish {
  private day: string = ''
  private idEnterprise: number = 0
  private dishes: Dish[] = []

  constructor(idEnterprise: number, day: string) {
    this.idEnterprise = idEnterprise
    this.day = day
  }

  // GET - query do cardápio do dia
  async fetchMenu(): Promise<void> {
    try {
      const result = await axios.get(`${API_URL}/api/menu/`, {
        params: { id_enterprise: this.idEnterprise, day: this.day }
      })

      this.dishes = result.data.dishes

    } catch (error) {
      this.dishes = []
    }
  }

  // POST - criar cardápio
  async createMenu(): Promise<MenuResponse> {
    try {
      if (typeof this.idEnterprise !== 'number' || typeof this.day !== 'string' || !Array.isArray(this.dishes)) {
        throw { success: false, message: 'Erro ao criar cardápio' }
      }

      await axios.post(`${API_URL}/api/menu/`, {
        date: this.day,
        id_enterprise: this.idEnterprise,
        dishes: this.dishes,
      })

      return { success: true, message: 'Cardápio criado'}
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || 'Erro ao atualizar'}
    }
  }

  // Atualizar cardápio
  async updateMenu(): Promise<MenuResponse> {
    try {
      await axios.put(`${API_URL}/api/menu/`, {
        date: this.day,
        id_enterprise: this.idEnterprise,
        dishes: this.dishes
      })
      return { success: true, message: 'Cardápio atualizado'}
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || 'Erro ao atualizar'}
    }
  }

  // Deletar cardápio
  async deleteMenu(): Promise<MenuResponse> {
    try {
      await axios.delete(`${API_URL}/api/menu`, {
        params: 
        { id_enterprise: this.idEnterprise,
          day: this.day
        }
      })
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

  addDishByName(id: number, name: string, description: string): void {
    const newDish: Dish = { id, name, description };
    this.dishes.push(newDish);
  }

  setDay(day: string): void {
    this.day = day
  }

  setEnterpriseId(id: number): void {
    this.idEnterprise = id
  }
}