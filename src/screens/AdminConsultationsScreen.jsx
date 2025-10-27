import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '../Utils/Colors';

const consultationsData = [
  { id: '1', clientName: 'João Silva', service: 'Corte de Cabelo', date: '2023-10-26', time: '10:00' },
  { id: '2', clientName: 'Maria Souza', service: 'Manicure', date: '2023-10-26', time: '11:30' },
  { id: '3', clientName: 'Pedro Lima', service: 'Barba', date: '2023-10-27', time: '14:00' },
  { id: '4', clientName: 'Ana Costa', service: 'Coloração', date: '2023-10-27', time: '16:00' },
];

const AdminConsultationsScreen = () => {
  const renderConsultationItem = ({ item }) => (
    <View style={styles.consultationCard}>
      <Text style={styles.clientName}>{item.clientName}</Text>
      <Text style={styles.service}>{item.service}</Text>
      <Text style={styles.dateTime}>{item.date} às {item.time}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consultas Agendadas</Text>
      <FlatList
        data={consultationsData}
        renderItem={renderConsultationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Geologica_700Bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  consultationCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20, // Increased spacing between cards
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clientName: {
    fontSize: 20,
    fontFamily: 'Geologica_600SemiBold',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  service: {
    fontSize: 16,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Changed to space-between
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
    marginHorizontal: 5, // Added horizontal margin
  },
  viewButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Geologica_500Medium',
    fontSize: 14,
  },
});

export default AdminConsultationsScreen;