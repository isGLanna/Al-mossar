import axios from "axios";

const API_URL = 'http://localhost:3001';

export const loginUser = async (user: { email: string; password: string; remember: boolean}) => {
  try {
    
    // Requisição POST para o endpoint /api/login
    const response = await axios.post(`${API_URL}/api/login`, user);

    // Armazena o token em localStorage caso "remember" for true
    if (user.remember) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    // Resposta do backend
    return response.data;

  } catch (error) {
    console.error('Falha no login:', error);
    throw error;
  }
};

// Recupera o token armazenado
export const getToken = () => {
  return localStorage.getItem('authToken');
}

// Desloga usuário, removendo o token
export const logoutUser = () => {
  localStorage.removeItem('authToken');
}