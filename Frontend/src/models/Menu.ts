import axios from 'axios'
import { getToken, setNewToken } from '../componentes/templates/login/api'

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost'

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
  private dishes: Dish[] = []

  constructor(day: string) {
    this.day = day
  }

  // GET - query do cardápio do dia
  async fetchMenu(): Promise<void> {
    try {
      const result = await axios.get(`${API_URL}/api/menu/`, {
        params: { 
          token: getToken(), 
          day: this.day 
        }}
      )

      this.dishes = result.data.dishes
      setNewToken(result.data.token)

    } catch (error) {
      this.dishes = []
    }
  }

  // POST - criar cardápio
  async createMenu(): Promise<MenuResponse> {
    try {
      const result = await axios.post(`${API_URL}/api/menu/`, {
        token: getToken(),
        date: this.day, 
        dishes: this.dishes,
      })

      setNewToken(result.data.token)

      return { success: true, message: 'Cardápio criado'}
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || 'Erro ao atualizar'}
    }
  }

  // Atualizar cardápio
  async updateMenu(): Promise<MenuResponse> {
    try {
      const result = await axios.put(`${API_URL}/api/menu/`, {
                    token: getToken(),
                    date: this.day,
                    dishes: this.dishes
                  })
        
      setNewToken(result.data.token)

      return { success: true, message: 'Cardápio atualizado'}
    } catch (error: any) {
      return { success: false, message: error?.response?.data?.message || 'Erro ao atualizar'}
    }
  }

  // Deletar cardápio
  async deleteMenu(): Promise<MenuResponse> {
    try {
       const result = await axios.delete(`${API_URL}/api/menu`, {
        params: 
        { token: getToken(),
          day: this.day
        }
      })
      this.dishes = []

      setNewToken(result.data.token)
      
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
}