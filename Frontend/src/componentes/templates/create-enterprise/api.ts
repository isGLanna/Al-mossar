import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://localhost'

// Formato de entrada
type EnterpriseRegisterData = {
  name: string,
  email: string,
  password: string,
  employees: {
    email: string
    role: string
  }[]
}

// Formato de retorno
type RegisterResponse = {
  success: boolean;
  message?: string;
  status?: number
}

export const registerEnterprise = async (
  user: EnterpriseRegisterData
  ): Promise<RegisterResponse> => {
  try{
    // Requisição POST para endpoint /api/register
    const response = await axios.post<RegisterResponse>(`${API_URL}/api/registerEnterprise`, user)
    
    return response.data
  } catch (error) {
    // Tratamento de saída de erro
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message,
        status: error.response.status,
      }
    }
    return {
      success: false,
      message: 'Falha ao conectar com servidor',
      status: 500
    }
  }
}