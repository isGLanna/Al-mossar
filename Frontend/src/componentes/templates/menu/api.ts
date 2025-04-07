import axios from 'axios'
import {getToken} from '../login/api'

const API_URL = 'https://localhost:3001'

type User = {
  name: string;
  surname: string;
  enterprise: string;
  role: string;
}

export const menuQuery = async () => {
  try {

    const token = getToken()

    if (!token){
      throw ('Token não encontrado. Faça login novamente.')
    }

    // Envia requisição do cardápio enviando o token para confirmação
    const response = await axios.get(`${API_URL}/api/menu`, {
      headers: {
        Authorization: `${token}`
      }
    })

    return response.data
  } catch (error) {
    return null
  }
}