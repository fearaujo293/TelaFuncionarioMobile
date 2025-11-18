import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const SetServiceHoursScreen = () => {
  const navigation = useNavigation();

  const [serviceHours, setServiceHours] = useState([
    { id: '1', day: 'Segunda-feira', start: '09:00', end: '18:00', active: true },
    { id: '2', day: 'Terça-feira', start: '09:00', end: '18:00', active: true },
    { id: '3', day: 'Quarta-feira', start: '09:00', end: '18:00', active: true },
    { id: '4', day: 'Quinta-feira', start: '09:00', end: '18:00', active: true },
    { id: '5', day: 'Sexta-feira', start: '09:00', end: '18:00', active: true },
    { id: '6', day: 'Sábado', start: 'Fechado', end: 'Fechado', active: false },
    { id: '7', day: 'Domingo', start: 'Fechado', end: 'Fechado', active: false },
  ]);

  const handleTimeChange = (id, type, value) => {
    setServiceHours(serviceHours.map(day =>
      day.id === id ? { ...day, [type]: value } : day
    ));
  };

  const toggleDayActive = (id) => {
    setServiceHours(serviceHours.map(day =>
      day.id === id ? { ...day, active: !day.active } : day
    ));
  };

  const handleSaveHours = () => {
    Alert.alert('Horários Salvos', 'Seus horários de atendimento foram atualizados com sucesso!');
  };

  const renderDayHours = ({ item }) => (
    <View style={styles.dayContainer}>
      <TouchableOpacity onPress={() => toggleDayActive(item.id)} style={styles.dayToggle}>
        <Text style={styles.dayText}>{item.day}</Text>
        <Icon
          name={item.active ? 'toggle-on' : 'toggle-off'}
          size={24}
          color={item.active ? '#6D52E8' : '#CCC'}
        />
      </TouchableOpacity>
      {item.active ? (
        <View style={styles.timeInputs}>
          <TextInput
            style={styles.timeInput}
            value={item.start}
            onChangeText={(text) => handleTimeChange(item.id, 'start', text)}
            placeholder="HH:MM"
            keyboardType="numbers-and-punctuation"
          />
          <Text style={styles.timeSeparator}>-</Text>
          <TextInput
            style={styles.timeInput}
            value={item.end}
            onChangeText={(text) => handleTimeChange(item.id, 'end', text)}
            placeholder="HH:MM"
            keyboardType="numbers-and-punctuation"
          />
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
        <Text style={styles.headerTitle}>Horários de Atendimento</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Defina seus horários de atendimento para cada dia da semana:</Text>
        <FlatList
          data={serviceHours}
          keyExtractor={item => item.id}
          renderItem={renderDayHours}
          contentContainerStyle={styles.hoursList}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveHours}>
          <Text style={styles.saveButtonText}>Salvar Horários</Text>
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
  placeholderText: {
    textAlign: 'center',
    color: '#8E8E93',
    paddingVertical: 20,
  },
  hoursList: {
    paddingVertical: 10,
  },
  dayContainer: {
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dayToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
  },
  timeSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#555',
  },
  closedText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingVertical: 5,
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

export default SetServiceHoursScreen;