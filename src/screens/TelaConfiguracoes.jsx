import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';

const TelaConfiguracoes = () => {
  const [appointmentRemindersEnabled, setAppointmentRemindersEnabled] = useState(true);
  const [newAppointmentsEnabled, setNewAppointmentsEnabled] = useState(true);
  const [cancellationsEnabled, setCancellationsEnabled] = useState(true);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Editar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Editar Nome/Dados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionButtonText}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>

      {/* Nova seção para Avaliações e Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Avaliações e Feedback</Text>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('TelaAvaliacoesFeedback')}>
          <Text style={styles.optionButtonText}>Ver Avaliações</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações</Text>
        <View style={styles.notificationOption}>
          <Text style={styles.optionButtonText}>Lembretes de agendamentos</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.primary }}
            thumbColor={appointmentRemindersEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setAppointmentRemindersEnabled}
            value={appointmentRemindersEnabled}
          />
        </View>
        <View style={styles.notificationOption}>
          <Text style={styles.optionButtonText}>Novos agendamentos</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.primary }}
            thumbColor={newAppointmentsEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setNewAppointmentsEnabled}
            value={newAppointmentsEnabled}
          />
        </View>
        <View style={styles.notificationOption}>
          <Text style={styles.optionButtonText}>Cancelamentos</Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.primary }}
            thumbColor={cancellationsEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setCancellationsEnabled}
            value={cancellationsEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Horários</Text>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <Text style={styles.optionText}>Editar Horário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <Text style={styles.optionText}>Dias de Trabalho</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <Text style={[styles.optionText, { color: '#FF3B30' }]}>Sair</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => {}}>
            <Text style={[styles.optionText, { color: '#FF3B30' }]}>Deletar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  optionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#333',
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});

export default TelaConfiguracoes;