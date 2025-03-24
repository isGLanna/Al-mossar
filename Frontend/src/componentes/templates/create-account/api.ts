import axios from 'axios'

const API_URL = "http://localhost:3001"

export const registerUser = async (
  user: {
    name: string;
    surname: string;
    email: string;
    password: string;
    idEnterprise: number;
    startOfContract: string;
    role: string;
  }) => {
  try{
    // Requisição POST para endpoint /api/register
    const response = await axios.post(`${API_URL}/api/register`, user)

    return response.data
  } catch (error) {
    throw error
  }
}