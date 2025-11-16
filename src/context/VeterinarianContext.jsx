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
        const parsed = JSON.parse(stored);
        let updated = { Agendada: [], Andamento: [], Concluídas: [], ...parsed };
        let changed = false;
        if (!updated.Andamento || updated.Andamento.length === 0) {
          updated.Andamento = [
            {
              id: 'and-1',
              petName: 'Rex',
              service: 'Consulta de Rotina',
              date: '2025-11-20',
              time: '10:00',
              ownerName: 'João Silva',
              status: 'Andamento',
              imageSource: require('../assets/dog1.png'),
            },
            {
              id: 'and-2',
              petName: 'Miau',
              service: 'Vacinação',
              date: '2025-11-20',
              time: '14:30',
              ownerName: 'Maria Souza',
              status: 'Andamento',
              imageSource: require('../assets/cat1.png'),
            },
          ];
          changed = true;
        }
        if (!updated.Concluídas || updated.Concluídas.length === 0) {
          updated.Concluídas = [
            {
              id: 'conc-1',
              petName: 'Thor',
              service: 'Exame de Sangue',
              date: '2025-11-18',
              time: '09:00',
              ownerName: 'Carlos Mendes',
              status: 'Concluídas',
              imageSource: require('../assets/dog2.png'),
            },
          ];
          changed = true;
        }
        setAppointments(updated);
        if (changed) {
          await AsyncStorage.setItem('vet_appointments', JSON.stringify(updated));
        }
      } else {
        const defaults = {
          Agendada: [],
          Andamento: [
            {
              id: 'and-1',
              petName: 'Rex',
              service: 'Consulta de Rotina',
              date: '2025-11-20',
              time: '10:00',
              ownerName: 'João Silva',
              status: 'Andamento',
              imageSource: require('../assets/dog1.png'),
            },
            {
              id: 'and-2',
              petName: 'Miau',
              service: 'Vacinação',
              date: '2025-11-20',
              time: '14:30',
              ownerName: 'Maria Souza',
              status: 'Andamento',
              imageSource: require('../assets/cat1.png'),
            },
          ],
          Concluídas: [
            {
              id: 'conc-1',
              petName: 'Thor',
              service: 'Exame de Sangue',
              date: '2025-11-18',
              time: '09:00',
              ownerName: 'Carlos Mendes',
              status: 'Concluídas',
              imageSource: require('../assets/dog2.png'),
            },
          ],
        };
        setAppointments(defaults);
        await AsyncStorage.setItem('vet_appointments', JSON.stringify(defaults));
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

  const addAppointment = (status, appointment) => {
    setAppointments(prev => {
      const updated = { ...prev };
      updated[status] = [...(updated[status] || []), appointment];
      AsyncStorage.setItem('vet_appointments', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <VeterinarianContext.Provider
      value={{
        appointments,
        updateAppointment,
        moveAppointment,
        addAppointment,
        setAppointments
      }}
    >
      {children}
    </VeterinarianContext.Provider>
  );
};
