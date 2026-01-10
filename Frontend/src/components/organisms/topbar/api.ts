import axios from "axios"
import { getToken, setNewToken, logoutUser } from '../../templates/login/api'
import { Employee } from '../../../models/Employee'
import { createEmployee } from '../../../models/EmployeeFactory'

const API_URL = "http://localhost:4001"

export const getUser = async (): Promise<Employee | null> => {
  try {
    const result = await axios.get(`${API_URL}/api/user-info`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    const { user } = result.data
    if (!user) return null

    return createEmployee(user.email, user.name, user.surname, user.role)
  } catch (error) {
    const status = (axios.isAxiosError(error) && error.response) ? error.response.status : null
    
    if (status === 401) {
      logoutUser()
      return null
    }

    return null
  }
}
