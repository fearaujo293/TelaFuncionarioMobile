import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const WorkScheduleScreen = () => {
  const navigation = useNavigation();
  const [schedule, setSchedule] = useState([
    { id: '1', day: 'Segunda-feira', start: '09:00', end: '18:00', active: true },
    { id: '2', day: 'Terça-feira', start: '09:00', end: '18:00', active: true },
    { id: '3', day: 'Quarta-feira', start: '09:00', end: '18:00', active: true },
    { id: '4', day: 'Quinta-feira', start: '09:00', end: '18:00', active: true },
    { id: '5', day: 'Sexta-feira', start: '09:00', end: '18:00', active: true },
    { id: '6', day: 'Sábado', start: 'Fechado', end: 'Fechado', active: false },
    { id: '7', day: 'Domingo', start: 'Fechado', end: 'Fechado', active: false },
  ]);

  const toggleDayActive = (id) => {
    setSchedule(schedule.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  const handleSaveSchedule = () => {
    // Lógica para salvar o horário de trabalho
    alert('Horário de trabalho salvo!');
  };

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <Text style={styles.dayText}>{item.day}</Text>
      <TouchableOpacity
        style={[styles.statusButton, { backgroundColor: item.active ? '#4CAF50' : '#F44336' }]} // Verde para ativo, vermelho para inativo
        onPress={() => toggleDayActive(item.id)}
      >
        <Text style={styles.statusButtonText}>{item.active ? 'Ativo' : 'Inativo'}</Text>
      </TouchableOpacity>
      {item.active ? (
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{item.start}</Text>
          <Text style={styles.timeText}> - </Text>
          <Text style={styles.timeText}>{item.end}</Text>
        </View>
      ) : (
        <Text style={styles.closedText}>Fechado</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Horário de Trabalho</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Defina seu horário de trabalho</Text>
        {schedule.map(item => renderScheduleItem({ item }))}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSchedule}>
          <Text style={styles.saveButtonText}>Salvar Horário</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  section: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#555',
  },
  closedText: {
    fontSize: 16,
    color: '#F44336',
    fontWeight: 'bold',
  },
  statusButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  statusButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#6D52E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkScheduleScreen;