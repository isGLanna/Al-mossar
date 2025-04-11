import axios from "axios";

const API_URL = 'http://localhost:3001';

export const loginUser = async (user: { email: string; password: string; remember: boolean }) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, user);

    const authData = JSON.stringify(response.data);

    if (user.remember) {
      localStorage.setItem('authData', authData);
    } else {
      sessionStorage.setItem('authData', authData);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Pega o token do localStorage ou sessionStorage
export const getToken = () => {
  const data = localStorage.getItem('authData') || sessionStorage.getItem('authData');
  if (!data) return null;

  const parsed = JSON.parse(data);
  return parsed.token || null;
};

// Pega todos os dados de autenticação
export const getAuthData = () => {
  const data = localStorage.getItem('authData') || sessionStorage.getItem('authData');
  return data ? JSON.parse(data) : null;
};

// Remove todos os dados de autenticação
export const logoutUser = () => {
  localStorage.removeItem('authData');
  sessionStorage.removeItem('authData');
};

// Remove dados extras, mantendo apenas o token
export const clearAuthExtras = () => {
  const rawData = localStorage.getItem('authData') || sessionStorage.getItem('authData');
  if (!rawData) return;

  try {
    const parsed = JSON.parse(rawData);
    const newData = {
      token: parsed.token,
    };

    // Salva de volta no lugar certo
    if (localStorage.getItem('authData')) {
      localStorage.setItem('authData', JSON.stringify(newData));
    } else {
      sessionStorage.setItem('authData', JSON.stringify(newData));
    }

  } catch (error) {
    throw 'Erro ao limpar dados extras de autenticação';
  }
};
