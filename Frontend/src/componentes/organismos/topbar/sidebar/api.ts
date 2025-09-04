import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost'

export const getPhoto = async () => {
  try {
    let token = sessionStorage.getItem('authToken')

    if(!token)
      token = localStorage.getItem('authToken')

    const response = await axios.get(`${API_URL}/api/user/photo`, {
      headers: { Authorization: `Bearer ${token}`}
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
    let token = localStorage.getItem('authToken')
    const response = await axios.get(`${API_URL}/employee/permission`, {
      headers: { Authorization: `Bearer ${token}` }})
    
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