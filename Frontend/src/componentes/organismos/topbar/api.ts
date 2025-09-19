import axios from "axios"
import { getToken, setNewToken, logoutUser } from '../../templates/login/api'
import { Employee } from '../../../models/Employee'
import { createEmployee } from '../../../models/EmployeeFactory'

const API_URL = "http://localhost:4001"

// Função pura (sem hooks do React)
export const getUser = async (): Promise<Employee | null> => {
  try {
    const result = await axios.get(`${API_URL}/api/user-info`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    // Cria instância do empregado
    const { name, surname, email, role } = result.data
    return createEmployee(email, name, surname, role)
  } catch (error) {
    const status = (axios.isAxiosError(error) && error.response) ? error.response.status : null
    
    if (status === 401) {
      logoutUser()
      return null
    }

    return null
  }
}
