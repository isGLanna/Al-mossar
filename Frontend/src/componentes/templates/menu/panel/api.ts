import axios from 'axios'
import { getToken, setNewToken } from '../../login/api'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost'

export async function getEmployeesAPI(idEnterprise: number) {
  try {
    const token = getToken()
    const res = await axios.get(`${API_BASE_URL}/api/employee`, {
      params: { token, idEnterprise },
    })

    if(!res.data.token) {
      throw new Error('Token not found in response, please log in again.')
    }
    
    setNewToken(res.data.token)

    return res.data
  } catch (error) {
    alert(error?.response?.data?.message || 'Erro desconhecido ao buscar funcionários.')
  }
}

// Adicionar novo empregado (pré-cadastro com email e cargo)
export async function addEmployeeAPI(data: { email: string, role: string, idEnterprise: number}) {
  const res = await axios.post(`${API_BASE_URL}/api/employee`, data)
  return res.data
}

// Excluir empregado por e-mail
export async function deleteEmployeeAPI(email: string, idEnterprise: number): Promise<{success: boolean, message: string}> {
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/employee`, {
      params: { idEnterprise, email},
    })
    return res.data
  } catch (error) {
    const message = error?.response?.data?.message || 'Erro desconhecido ao excluir funcionário.'
    return { success: false, message }
  }
}


// Editar empregado por e-mail
export async function editEmployeeAPI(idEnterprise: number, email: string, name?: string, surname?: string, role?: string): Promise<{success: boolean, message: string}> {
  try{
    await axios.put(`${API_BASE_URL}/api/employee`, {idEnterprise, email, name, surname, role})

    return { success: true, message: 'Atualização concluída com êxito' }
  } catch (error) {
    const message = error?.response?.data?.message || 'Error desconhecido'
    return { success: false, message }
  }
}
