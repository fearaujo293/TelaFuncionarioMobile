import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VeterinarianContext = createContext();

export const useVeterinarianContext = () => {
  const context = React.useContext(VeterinarianContext);
  if (!context) {
    throw new Error('useVeterinarianContext deve ser usado dentro de VeterinarianProvider');
  }
  return context;
};

export const VeterinarianProvider = ({ children }) => {
  const [appointments, setAppointments] = useState({
    Agendada: [],
    Andamento: [],
    Concluídas: []
  });

  // Carregar dados apenas quando necessário
  useEffect(() => {
    loadVeterinarianAppointments();
  }, []);

  const loadVeterinarianAppointments = async () => {
    try {
      const stored = await AsyncStorage.getItem('vet_appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.log('Erro ao carregar agendamentos vet:', e);
    }
  };

  const updateAppointment = (status, updatedAppointment) => {
    setAppointments(prev => {
      const updated = { ...prev };
      const index = updated[status]?.findIndex(a => a.id === updatedAppointment.id);
      if (index !== -1) {
        updated[status][index] = updatedAppointment;
      }
      AsyncStorage.setItem('vet_appointments', JSON.stringify(updated));
      return updated;
    });
  };

  const moveAppointment = (fromStatus, toStatus, appointmentId) => {
    setAppointments(prev => {
      const updated = { ...prev };
      const appointment = updated[fromStatus]?.find(a => a.id === appointmentId);
      
      if (appointment) {
        updated[fromStatus] = updated[fromStatus].filter(a => a.id !== appointmentId);
        updated[toStatus] = [...(updated[toStatus] || []), appointment];
        AsyncStorage.setItem('vet_appointments', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  return (
    <VeterinarianContext.Provider
      value={{
        appointments,
        updateAppointment,
        moveAppointment,
        setAppointments
      }}
    >
      {children}
    </VeterinarianContext.Provider>
  );
};