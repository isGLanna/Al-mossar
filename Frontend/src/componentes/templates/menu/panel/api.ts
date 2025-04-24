import axios from 'axios'
import { getToken, getEnterpriseId } from '../../login/api'

const API_BASE_URL = 'http://localhost:3001'

export async function getEmployeesAPI() {
  const enterpriseId = getEnterpriseId()
  const res = await axios.get(`${API_BASE_URL}/api/employee`, {
    params: { enterpriseId },
  })
  return res.data
}


// Adicionar novo empregado (pré-cadastro com email e cargo)
export async function addEmployeeAPI(data: { email: string, role: string }) {
  const enterpriseId = getEnterpriseId()
  const res = await axios.post(`${API_BASE_URL}/api/employee`, {
    ...data,
    enterpriseId,
  })
  return res.data
}

// Excluir empregado por e-mail
export async function deleteEmployeeAPI(email: string) {
  const enterpriseId = getEnterpriseId()
  const res = await axios.delete(`${API_BASE_URL}/api/employee/${email}`, {
    params: { enterpriseId },
  })
  return res.data
}


// Editar empregado por e-mail
export async function editEmployeeAPI(
  email: string,
  updatedData: { name?: string; surname?: string; role?: string }
) {
  const res = await axios.put(`${API_BASE_URL}/api/employee/${email}`, updatedData)
  return res.data
}
