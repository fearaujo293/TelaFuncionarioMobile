import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await AsyncStorage.getItem('userData');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (token && userData) {
        // Verificar se o token está expirado e tentar renovar
        if (await isTokenExpired(token) && refreshToken) {
          try {
            await refreshAuthToken(refreshToken);
          } catch (error) {
            console.warn('Não foi possível renovar o token, fazendo logout:', error);
            await logout();
          }
        } else {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
    } finally {
      setLoading(false);
    }
  };

  // Verificar se o token está expirado (verificação básica)
  const isTokenExpired = async (token) => {
    try {
      // Decodificar o token JWT (parte do payload)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000; // Converter para milissegundos
      return Date.now() >= expirationTime;
    } catch (error) {
      console.warn('Erro ao verificar expiração do token:', error);
      return true; // Se não conseguir verificar, assume que está expirado
    }
  };

  // Renovar token de autenticação
  const refreshAuthToken = async (refreshToken) => {
    try {
      const response = await authAPI.refreshToken(refreshToken);
      
      // Armazenar novos tokens
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('refreshToken', response.refreshToken);
      
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      // Chamada real para a API de login
      const response = await authAPI.login(credentials);
      
      // Armazenar token e dados do usuário
      await AsyncStorage.setItem('userToken', response.token);
      await AsyncStorage.setItem('userData', JSON.stringify(response.user));
      await AsyncStorage.setItem('refreshToken', response.refreshToken);
      
      setIsAuthenticated(true);
      setUser(response.user);
      
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Chamada real para a API de logout
      await authAPI.logout();
    } catch (error) {
      console.warn('Erro ao fazer logout na API, continuando com limpeza local:', error);
    }
    
    try {
      // Limpar todos os dados de autenticação
      await AsyncStorage.multiRemove([
        'userToken',
        'userData',
        'refreshToken',
        'profileImage',
        'employeeProfileImage', 
        'veterinarianProfileImage',
        'adminProfileImage'
      ]);
      
      setIsAuthenticated(false);
      setUser(null);
      
      return true;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      return false;
    }
  };

  const deleteAccount = async () => {
    try {
      // Chamada real para a API de exclusão de conta
      await authAPI.deleteAccount();
    } catch (error) {
      console.warn('Erro ao excluir conta na API, continuando com limpeza local:', error);
    }
    
    try {
      // Limpar todos os dados do usuário
      await AsyncStorage.multiRemove([
        'userToken',
        'userData',
        'refreshToken',
        'profileImage',
        'employeeProfileImage',
        'veterinarianProfileImage',
        'adminProfileImage',
        // Adicione outros dados específicos do usuário aqui
      ]);
      
      setIsAuthenticated(false);
      setUser(null);
      
      return true;
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};