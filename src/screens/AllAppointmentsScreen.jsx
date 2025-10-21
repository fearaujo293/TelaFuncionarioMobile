import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import AppointmentDetailModal from '../components/AppointmentDetailModal';

const mockAllAppointments = [
  {
    id: '1',
    petName: 'Rex',
    ownerName: 'João Silva',
    date: '2023-10-26',
    time: '10:00',
    type: 'Consulta de Rotina',
    status: 'Agendada',
    petImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Rex', // Exemplo de imagem
  },
  {
    id: '2',
    petName: 'Miau',
    ownerName: 'Maria Souza',
    date: '2023-10-26',
    time: '14:30',
    type: 'Vacinação',
    status: 'Concluída',
    petImage: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Miau', // Exemplo de imagem
  },
  {
    id: '3',
    petName: 'Thor',
    ownerName: 'Carlos Mendes',
    date: '2023-10-27',
    time: '09:00',
    type: 'Exame de Sangue',
    status: 'Agendada',
    petImage: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Thor', // Exemplo de imagem
  },
  {
    id: '4',
    petName: 'Luna',
    ownerName: 'Ana Paula',
    date: '2023-10-27',
    time: '11:00',
    type: 'Retorno',
    status: 'Cancelada',
    petImage: 'https://via.placeholder.com/150/FFFF00/000000?text=Luna', // Exemplo de imagem
  },
  {
    id: '5',
    petName: 'Bob',
    ownerName: 'Fernanda Lima',
    date: '2023-10-28',
    time: '16:00',
    type: 'Cirurgia',
    status: 'Agendada',
    petImage: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=Bob', // Exemplo de imagem
  },
];

const AppointmentItem = ({ appointment, onPress }) => (
  <TouchableOpacity style={styles.appointmentCard} onPress={() => onPress(appointment)}>
    <FontAwesome name="paw" size={24} color={Colors.primary} style={styles.cardIcon} />
    <View style={styles.appointmentInfo}>
      <Text style={styles.petName}>{appointment.petName}</Text>
      <Text style={styles.ownerName}>Dono: {appointment.ownerName}</Text>
      <Text style={styles.appointmentDateTime}>{appointment.date} às {appointment.time}</Text>
      <Text style={styles.appointmentType}>Tipo: {appointment.type}</Text>
    </View>
    <View style={[styles.statusBadge, appointment.status === 'Agendada' ? styles.statusScheduled : appointment.status === 'Concluída' ? styles.statusCompleted : styles.statusCancelled]}>
      <Text style={styles.statusText}>{appointment.status}</Text>
    </View>
  </TouchableOpacity>
);

const AllAppointmentsScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCardPress = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todas as Consultas</Text>
      <FlatList
        data={mockAllAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppointmentItem appointment={item} onPress={handleCardPress} />}
        contentContainerStyle={styles.listContent}
      />
      <AppointmentDetailModal
        visible={isModalVisible}
        onClose={closeModal}
        appointment={selectedAppointment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    marginRight: 15,
  },
  appointmentInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  ownerName: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 5,
  },
  appointmentDateTime: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 3,
  },
  appointmentType: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 3,
    fontWeight: '500',
  },
  statusBadge: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  statusScheduled: {
    backgroundColor: Colors.blue,
  },
  statusCompleted: {
    backgroundColor: Colors.green,
  },
  statusCancelled: {
    backgroundColor: Colors.red,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default AllAppointmentsScreen;