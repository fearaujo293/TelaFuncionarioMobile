import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import cat1 from '../assets/cat1.png';
import dog1 from '../assets/dog1.png';
import dog2 from '../assets/dog2.png';
import { useNavigation } from '@react-navigation/native';

const TelaHistoricoConsultas = () => {
  const [activeFilter, setActiveFilter] = useState('Agendada');
  const navigation = useNavigation();

  const consultations = [
    {
      id: '1',
      petName: 'Mascote 1',
      serviceType: 'Consulta Geral',
      time: '10:00 AM',
      status: 'Agendada',
      image: cat1
    },
    {
      id: '2',
      petName: 'Mascote 2',
      serviceType: 'Vacinação',
      time: '02:30 PM',
      status: 'Agendada',
      image: dog1
    },
    {
      id: '3',
      petName: 'Mascote 3',
      serviceType: 'Exame de Rotina',
      time: '09:00 AM',
      status: 'Andamento',
      image: dog2
    },
    {
      id: '4',
      petName: 'Mascote 4',
      serviceType: 'Banho e Tosa',
      time: '11:00 AM',
      status: 'Concluída',
      image: cat1
    }
  ];

  const getFilteredConsultations = () => {
    return consultations.filter(consultation => {
      if (activeFilter === 'Agendada') {
        return consultation.status === 'Agendada';
      } else if (activeFilter === 'Andamento') {
        return consultation.status === 'Andamento';
      } else if (activeFilter === 'Concluídas') {
        return consultation.status === 'Concluída';
      }
      return true;
    });
  };

  const renderConsultationCard = ({ item }) => {
    let statusColor;
    switch (item.status) {
      case 'Agendada':
        statusColor = Colors.info; // Blue for scheduled
        break;
      case 'Andamento':
        statusColor = Colors.primary; // Primary color for in progress
        break;
      case 'Concluída':
        statusColor = Colors.success; // Green for completed
        break;
      default:
        statusColor = Colors.gray;
    }

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetalhesConsultaScreen', { consultation: item })}>
        <View style={styles.cardImageContainer}>
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        </View>
        <View style={styles.cardInfoContainer}>
          <Text style={styles.petName}>{item.petName}</Text>
          <Text style={styles.serviceType}>{item.serviceType}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredConsultations = getFilteredConsultations();

  console.log('Active Filter:', activeFilter);
  console.log('Filtered Consultations Length:', filteredConsultations.length);
  if (filteredConsultations.length > 0) {
    console.log('First Filtered Consultation:', filteredConsultations[0]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Consultas</Text>
      <View style={styles.filterContainer}>
        {['Agendada', 'Andamento', 'Concluídas'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              activeFilter === filter && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredConsultations}
        renderItem={renderConsultationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('AgendamentoScreen')}>
        <Text style={styles.scheduleButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  filterContentContainer: {
    // This style is no longer needed as filterContainer is not a ScrollView
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 0,
    backgroundColor: 'transparent',
    marginHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.primaryLight,
  },
  filterText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.textPrimary,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 100,
  },
  cardImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    marginRight: 20,
    borderWidth: 2,
    borderColor: Colors.lightGray,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  serviceType: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  time: {
    fontSize: 15,
    color: Colors.gray,
  },
  statusBadge: {
    backgroundColor: Colors.success, // Green for success status
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.white, // White text for status
  },
  scheduleButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default TelaHistoricoConsultas;