import axios from 'axios';
import { getToken } from '../../templates/login/api'

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3000'
const API_URL_GO = import.meta.env.VITE_API_GO || 'http://localhost:4001'

export const getPhoto = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user/photo`, {
      headers: { Authorization: `${getToken()}`}
    })

    return response.data
  } catch (error) {
    console.log(error)
    if(axios.isAxiosError(error)) {
      const status = error.response?.status

      if (status === 401) {
        alert('Token inválido ou expirado. Faça login novamente.')
      } else if (status === 404) {
        alert('Usuário não encontrado.')
      } else {
        alert('Erro desconhecido')
      }
    }
  }
}

export const getPermission = async () => {
  try {
    const response = await axios.get(`${API_URL_GO}/employee/permission`, {
      headers: { Authorization: `${getToken()}` }})
    
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status

      if (status === 401) {
        alert('Token inválido ou expirado. Faça login novamente.')
      } else if (status === 404) {
        alert('Usuário não encontrado.')
      } else {
        alert('Erro desconhecido')
      }
    }
  }
}

export const getUser = async (): Promise<{ email: string, name: string, surname: string, role: string } | null> => {
  try {
    const result = await axios.get(`${API_URL_GO}/api/user-info`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    const { user } = result.data
    if (!user) return null

    return { email: user.email, name: user.name, surname: user.surname, role: user.role }
  } catch (error) {
    const status = (axios.isAxiosError(error) && error.response) ? error.response.status : null

    return null
  }
}