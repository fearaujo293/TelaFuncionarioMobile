import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração base da API
const BASE_URL = 'http://localhost:8080';

// Headers padrão
const getHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Função para fazer requisições HTTP com retry automático para tokens expirados
const apiRequest = async (endpoint, options = {}, retryCount = 0) => {
  try {
    const headers = await getHeaders();
    const url = `${BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    // Se for erro 401 (Unauthorized) e ainda não tentou renovar o token
    if (response.status === 401 && retryCount === 0) {
      try {
        // Tentar renovar o token
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const refreshResponse = await authAPI.refreshToken(refreshToken);
          
          // Armazenar novo token
          await AsyncStorage.setItem('userToken', refreshResponse.token);
          await AsyncStorage.setItem('refreshToken', refreshResponse.refreshToken);
          
          // Tentar a requisição original novamente com o novo token
          return apiRequest(endpoint, options, retryCount + 1);
        }
      } catch (refreshError) {
        console.warn('Falha ao renovar token:', refreshError);
        // Se falhar ao renovar, continuar com o erro original
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Serviços de Autenticação
export const authAPI = {
  // Login
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Cadastro
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Logout
  logout: async () => {
    return apiRequest('/auth/logout', { method: 'POST' });
  },
  // Excluir conta
  deleteAccount: async () => {
    return apiRequest('/auth/delete-account', { method: 'DELETE' });
  },
  // Refresh token
  refreshToken: async (refreshToken) => {
    return apiRequest('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
};

// Serviços de Usuário
export const userAPI = {
  // Obter perfil do usuário
  getProfile: async () => {
    return apiRequest('/users/profile');
  },

  // Atualizar perfil
  updateProfile: async (profileData) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Alterar senha
  changePassword: async (passwordData) => {
    return apiRequest('/users/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  },
};

// Serviços de Pets
export const petsAPI = {
  // Listar pets do usuário
  getPets: async () => {
    return apiRequest('/pets');
  },

  // Adicionar pet
  addPet: async (petData) => {
    return apiRequest('/pets', {
      method: 'POST',
      body: JSON.stringify(petData),
    });
  },

  // Atualizar pet
  updatePet: async (petId, petData) => {
    return apiRequest(`/pets/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(petData),
    });
  },

  // Excluir pet
  deletePet: async (petId) => {
    return apiRequest(`/pets/${petId}`, {
      method: 'DELETE',
    });
  },
};

// Serviços de Consultas
export const consultationsAPI = {
  // Listar consultas do usuário
  getConsultations: async () => {
    return apiRequest('/consultations');
  },

  // Agendar consulta
  scheduleConsultation: async (consultationData) => {
    return apiRequest('/consultations', {
      method: 'POST',
      body: JSON.stringify(consultationData),
    });
  },

  // Cancelar consulta
  cancelConsultation: async (consultationId) => {
    return apiRequest(`/consultations/${consultationId}/cancel`, {
      method: 'POST',
    });
  },

  // Obter detalhes da consulta
  getConsultationDetails: async (consultationId) => {
    return apiRequest(`/consultations/${consultationId}`);
  },
};

// Serviços de Clínicas
export const clinicsAPI = {
  // Listar clínicas
  getClinics: async () => {
    return apiRequest('/clinics');
  },

  // Obter detalhes da clínica
  getClinicDetails: async (clinicId) => {
    return apiRequest(`/clinics/${clinicId}`);
  },
};

// Serviços de Veterinários
export const veterinariansAPI = {
  // Listar veterinários
  getVeterinarians: async () => {
    return apiRequest('/veterinarians');
  },

  // Obter detalhes do veterinário
  getVeterinarianDetails: async (veterinarianId) => {
    return apiRequest(`/veterinarians/${veterinarianId}`);
  },

  // Obter disponibilidade do veterinário
  getAvailability: async (veterinarianId, date) => {
    return apiRequest(`/veterinarians/${veterinarianId}/availability?date=${date}`);
  },
};

export default apiRequest;