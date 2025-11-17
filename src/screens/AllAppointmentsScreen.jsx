import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';
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
  {
    id: '6',
    petName: 'Princesa',
    ownerName: 'Ana Clara',
    date: '2023-10-29',
    time: '08:30',
    type: 'Consulta de Rotina',
    status: 'Andamento',
    petImage: 'https://via.placeholder.com/150/AA00AA/FFFFFF?text=Princesa',
  },
  {
    id: '7',
    petName: 'Buddy',
    ownerName: 'Marcos Lima',
    date: '2023-10-29',
    time: '13:15',
    type: 'Retorno',
    status: 'Andamento',
    petImage: 'https://via.placeholder.com/150/8888FF/FFFFFF?text=Buddy',
  },
];

const AppointmentItem = ({ appointment, onPress, onReschedule, onMessage }) => (
  <View style={styles.appointmentCard}>
    <Image source={{ uri: appointment.petImage }} style={styles.petAvatar} />
    <View style={styles.appointmentInfo}>
      <Text style={styles.petName}>{appointment.petName}</Text>
      <Text style={styles.ownerName}>Dono: {appointment.ownerName}</Text>
      <Text style={styles.appointmentDateTime}>{appointment.date} às {appointment.time}</Text>
      <Text style={styles.appointmentType}>Tipo: {appointment.type}</Text>
      <View style={styles.cardActionsRow}>
        <TouchableOpacity style={styles.cardActionBtn} onPress={() => onPress(appointment)}>
          <Text style={styles.cardActionText}>Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardActionBtn} onPress={() => onReschedule(appointment)}>
          <Text style={styles.cardActionText}>Reagendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardActionBtn} onPress={() => onMessage(appointment)}>
          <Text style={styles.cardActionText}>Mensagens</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={[
      styles.statusBadge,
      appointment.status === 'Agendada'
        ? styles.statusScheduled
        : appointment.status === 'Andamento'
          ? styles.statusInProgress
          : appointment.status === 'Concluída'
            ? styles.statusCompleted
            : styles.statusCancelled
    ]}>
      <Text style={styles.statusText}>{appointment.status}</Text>
    </View>
  </View>
);

const AllAppointmentsScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [refreshing, setRefreshing] = useState(false);

  const handleCardPress = (appointment) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleReschedule = (appointment) => {
    navigation.navigate('Agendamento');
  };

  const handleMessage = (appointment) => {
    navigation.navigate('Chat');
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAppointment(null);
  };

  const filteredAppointments = mockAllAppointments.filter((a) => {
    const matchesQuery = a.petName.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' ? true : a.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      {/* HEADER ÚNICO COM GRADIENTE */}
      <LinearGradient
        colors={Colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Todas as Consultas</Text>
        <Text style={styles.headerSubtitle}>Filtre por status e busque por pet</Text>
      </LinearGradient>

      <View style={styles.controlsRow}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="Buscar por pet"
            placeholderTextColor={'#888'}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>
        <View style={styles.filtersRow}>
          {['Todos','Agendada','Andamento','Concluída','Cancelada'].map((st) => (
            <TouchableOpacity
              key={st}
              onPress={() => setStatusFilter(st)}
              style={[styles.filterChip, statusFilter === st && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, statusFilter === st && styles.filterChipTextActive]}>{st}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentItem
            appointment={item}
            onPress={handleCardPress}
            onReschedule={handleReschedule}
            onMessage={handleMessage}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 16, // Added padding to match the new header's horizontal padding
  },
  controlsRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  searchWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGrayBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 10,
  },
  searchInput: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightGrayBorder,
    backgroundColor: Colors.white,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    color: Colors.darkGray,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  petAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: Colors.lightGray,
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
  cardActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  cardActionBtn: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cardActionText: {
    color: Colors.darkGray,
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  statusScheduled: {
    backgroundColor: Colors.lightBlue,
  },
  statusInProgress: {
    backgroundColor: Colors.lightOrangeBackground,
  },
  statusCompleted: {
    backgroundColor: Colors.lightGreen,
  },
  statusCancelled: {
    backgroundColor: Colors.lightRed,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default AllAppointmentsScreen;
