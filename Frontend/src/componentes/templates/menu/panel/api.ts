import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost'

export async function getEmployeesAPI(idEnterprise: number) {
  const res = await axios.get(`${API_BASE_URL}/api/employee`, {
    params: { idEnterprise },
  })

  return res.data
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
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro desconhecido ao excluir funcionário.'
    return { success: false, message }
  }
}


// Editar empregado por e-mail
export async function editEmployeeAPI(idEnterprise: number, email: string, name?: string, surname?: string, role?: string): Promise<{success: boolean, message: string}> {
  try{
    await axios.put(`${API_BASE_URL}/api/employee`, {idEnterprise, email, name, surname, role})

    return { success: true, message: 'Atualização concluída com êxito' }
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Error desconhecido'
    return { success: false, message }
  }
}
