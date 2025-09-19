import axios from 'axios'
import { getToken, setNewToken } from '../../../templates/login/api'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost'

// Helper para headers com token
function authHeaders() {
  const token = getToken()
  return { Authorization: `Bearer ${token}` }
}

// Buscar funcionários
export async function getEmployeesAPI() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/employee`, {
      headers: authHeaders(),
    })

    if (!response.data.token) {
      throw new Error('Token não encontrado na resposta, faça login novamente.')
    }

    setNewToken(response.data.token)
    return response.data
  } catch (error) {
    alert('Erro desconhecido ao buscar funcionários.')
  }
}

// Adicionar novo empregado (pré-cadastro com email e cargo)
export async function addEmployeeAPI(data: { email: string; role: string }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/employee`, data, {
      headers: authHeaders(),
    })
    return response.data
  } catch (error) {
    return { success: false, message: 'Erro desconhecido ao adicionar funcionário.' }
  }
}

// Excluir empregado por e-mail
export async function deleteEmployeeAPI(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/employee`, {
      headers: authHeaders(),
      data: { email }, // DELETE não aceita params com body vazio em alguns backends
    })
    return response.data
  } catch (error) {
    const message = 'Erro desconhecido ao excluir funcionário.'
    return { success: false, message }
  }
}

// Editar empregado por e-mail
export async function editEmployeeAPI(
  email: string,
  name?: string,
  surname?: string,
  role?: string
): Promise<{ success: boolean; message: string }> {
  try {
    await axios.put(
      `${API_BASE_URL}/api/employee`,
      { email, name, surname, role },
      { headers: authHeaders() }
    )

    return { success: true, message: 'Atualização concluída com êxito.' }
  } catch (error) {
    const message = 'Erro desconhecido ao atualizar funcionário.'
    return { success: false, message }
  }
}
