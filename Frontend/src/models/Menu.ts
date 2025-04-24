import axios from 'axios'

interface Dish {
  name: string
  description: string
}

interface MenuResponse {
  success: boolean,
  message: string,
  dishes?: Dish[]
}

export class Menu {
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
      const result = await axios.get('/menu', {
        params: { id_enterprise: this.idEnterprise, day: this.day }
      })
      // Armazena cardápio para evitar novas consultas
      this.dishes = result.data.dishes

    } catch (error) {
      
      this.dishes = []
    }
  }

  // POST - criar cardápio
  async createMenu(): Promise<void> {
    try {
      await axios.post('/menu', {
        id_enterprise: this.idEnterprise,
        date: this.day,
        dishes: this.dishes
      })
    } catch (error) {

    }
  }

  // Atualizar cardápio
  async updateMenu(): Promise<MenuResponse> {
    try {
      await axios.put('/menu', {
        id_enterprise: this.idEnterprise,
        day: this.day,
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
      await axios.delete('/menu', {
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

  addDishByName(name: string): void {
    this.dishes = this.dishes.filter(d => d.name !== name)
  }

  setDay(day: string): void {
    this.day = day
  }

  setEnterpriseId(id: number): void {
    this.idEnterprise = id
  }
}