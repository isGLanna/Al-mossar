import axios from 'axios'
import { getToken, setNewToken } from '../../../templates/login/api'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost'

export async function getEmployeesAPI(idEnterprise: number) {
  try {
    const token = getToken()
    const response = await axios.get(`${API_BASE_URL}/api/employee`, {
      params: { token, idEnterprise },
    })

    if(!response.data.token) {
      throw new Error('Token not found in response, please log in again.')
    }
    
    setNewToken(response.data.token)

    return response.data
  } catch (error) {
    alert('Erro desconhecido ao buscar funcionários.')
  }
}

// Adicionar novo empregado (pré-cadastro com email e cargo)
export async function addEmployeeAPI(data: { email: string, role: string, idEnterprise: number}) {
  const response = await axios.post(`${API_BASE_URL}/api/employee`, data)
  return response.data
}

// Excluir empregado por e-mail
export async function deleteEmployeeAPI(email: string, idEnterprise: number): Promise<{success: boolean, message: string}> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/employee`, {
      params: { idEnterprise, email},
    })
    return response.data
  } catch (error) {
    const message = 'Erro desconhecido ao excluir funcionário.'
    return { success: false, message }
  }
}


// Editar empregado por e-mail
export async function editEmployeeAPI(idEnterprise: number, email: string, name?: string, surname?: string, role?: string): Promise<{success: boolean, message: string}> {
  try{
    await axios.put(`${API_BASE_URL}/api/employee`, {idEnterprise, email, name, surname, role})

    return { success: true, message: 'Atualização concluída com êxito' }
  } catch (error) {
    const message = 'Error desconhecido'
    return { success: false, message }
  }
}
