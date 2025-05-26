import axios from 'axios'

// Formato de entrada
type UserRegisterData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  id_enterprise: number;
  start_of_contract: string;
}

// Formato de retorno
type RegisterResponse = {
  success: boolean;
  message?: string;
  status?: number
}

const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001'

export const registerUser = async (
  user: UserRegisterData
  ): Promise<RegisterResponse> => {
  try{
    // Requisição POST para endpoint /api/register
    const response = await axios.post<RegisterResponse>(`${API_URL}/api/register`, user)
    
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