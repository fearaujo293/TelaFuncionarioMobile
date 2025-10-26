import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';

const TelaHistoricoConsultas = () => {
  const [activeFilter, setActiveFilter] = useState('Todas');

  const consultations = [
    {
      id: '1',
      petName: 'Buddy',
      clientName: 'João Silva',
      date: '2023-10-26',
      time: '10:00',
      serviceType: 'Consulta Geral',
      duration: '30 min',
      rating: 4.5,
      notes: 'Pet com tosse, receitado antibiótico.',
    },
    {
      id: '2',
      petName: 'Mia',
      clientName: 'Maria Souza',
      date: '2023-10-25',
      time: '14:30',
      serviceType: 'Vacinação',
      duration: '15 min',
      rating: 5.0,
      notes: 'Vacina anual V8 aplicada.',
    },
    {
      id: '3',
      petName: 'Thor',
      clientName: 'Pedro Santos',
      date: '2023-10-24',
      time: '09:00',
      serviceType: 'Exame de Rotina',
      duration: '45 min',
      rating: 4.0,
      notes: 'Check-up geral, tudo ok.',
    },
    {
      id: '4',
      petName: 'Luna',
      clientName: 'Ana Costa',
      date: '2023-10-23',
      time: '11:00',
      serviceType: 'Banho e Tosa',
      duration: '60 min',
      rating: 3.5,
      notes: 'Tosa higiênica e banho.',
    },
    {
      id: '5',
      petName: 'Max',
      clientName: 'Carlos Oliveira',
      date: '2023-10-22',
      time: '16:00',
      serviceType: 'Pequena Cirurgia',
      duration: '90 min',
      rating: 5.0,
      notes: 'Remoção de cisto.',
    },
    {
      id: '6',
      petName: 'Daisy',
      clientName: 'Fernanda Lima',
      date: '2023-10-21',
      time: '13:00',
      serviceType: 'Consulta de Retorno',
      duration: '20 min',
      rating: 4.8,
      notes: 'Reavaliação da tosse, melhora significativa.',
    },
    {
      id: '7',
      petName: 'Rocky',
      clientName: 'Gustavo Pereira',
      date: '2023-10-20',
      time: '10:30',
      serviceType: 'Vacinação',
      duration: '15 min',
      rating: 5.0,
      notes: 'Vacina antirrábica.',
    },
    {
      id: '8',
      petName: 'Bella',
      clientName: 'Helena Almeida',
      date: '2023-10-19',
      time: '15:00',
      serviceType: 'Exame de Sangue',
      duration: '30 min',
      rating: 4.2,
      notes: 'Coleta para hemograma completo.',
    },
    {
      id: '9',
      petName: 'Charlie',
      clientName: 'Isabela Rocha',
      date: '2023-10-18',
      time: '11:30',
      serviceType: 'Consulta de Emergência',
      duration: '60 min',
      rating: 3.9,
      notes: 'Atropelamento, sutura e medicação.',
    },
    {
      id: '10',
      petName: 'Lucy',
      clientName: 'Juliana Martins',
      date: '2023-10-17',
      time: '09:30',
      serviceType: 'Consulta Dermatológica',
      duration: '40 min',
      rating: 4.7,
      notes: 'Alergia na pele, receitado antialérgico.',
    },
    {
      id: '11',
      petName: 'Zoe',
      clientName: 'Lucas Fernandes',
      date: '2023-10-16',
      time: '14:00',
      serviceType: 'Castração',
      duration: '120 min',
      rating: 5.0,
      notes: 'Cirurgia de castração realizada com sucesso.',
    },
    {
      id: '12',
      petName: 'Oliver',
      clientName: 'Mariana Gomes',
      date: '2023-10-15',
      time: '10:00',
      serviceType: 'Consulta Odontológica',
      duration: '50 min',
      rating: 4.6,
      notes: 'Limpeza de tártaro.',
    },
    {
      id: '13',
      petName: 'Coco',
      clientName: 'Nicole Pires',
      date: '2023-10-14',
      time: '16:30',
      serviceType: 'Vacinação',
      duration: '15 min',
      rating: 5.0,
      notes: 'Reforço de vacina.',
    },
    {
      id: '14',
      petName: 'Teddy',
      clientName: 'Otávio Rodrigues',
      date: '2023-10-13',
      time: '09:00',
      serviceType: 'Fisioterapia',
      duration: '60 min',
      rating: 4.3,
      notes: 'Sessão de fisioterapia para recuperação de cirurgia.',
    },
    {
      id: '15',
      petName: 'Ruby',
      clientName: 'Patrícia Alves',
      date: '2023-10-12',
      time: '12:00',
      serviceType: 'Consulta de Nutrição',
      duration: '40 min',
      rating: 4.9,
      notes: 'Plano alimentar para perda de peso.',
    },
    {
      id: '16',
      petName: 'Duke',
      clientName: 'Rafael Costa',
      date: '2023-10-11',
      time: '14:00',
      serviceType: 'Exame de Imagem',
      duration: '30 min',
      rating: 4.0,
      notes: 'Radiografia de tórax.',
    },
    {
      id: '17',
      petName: 'Milo',
      clientName: 'Sofia Pereira',
      date: '2023-10-10',
      time: '10:00',
      serviceType: 'Consulta de Comportamento',
      duration: '60 min',
      rating: 4.1,
      notes: 'Problemas de ansiedade de separação.',
    },
    {
      id: '18',
      petName: 'Penny',
      clientName: 'Thiago Lima',
      date: '2023-10-09',
      time: '15:30',
      serviceType: 'Vacinação',
      duration: '15 min',
      rating: 5.0,
      notes: 'Vacina contra gripe canina.',
    },
    {
      id: '19',
      petName: 'Gus',
      clientName: 'Vitória Santos',
      date: '2023-10-08',
      time: '11:00',
      serviceType: 'Consulta de Rotina',
      duration: '30 min',
      rating: 4.5,
      notes: 'Check-up anual.',
    },
    {
      id: '20',
      petName: 'Willow',
      clientName: 'Wallace Rocha',
      date: '2023-10-07',
      time: '14:00',
      serviceType: 'Banho e Tosa',
      duration: '60 min',
      rating: 4.0,
      notes: 'Banho e corte de unhas.',
    },
  ];

  const getFilteredConsultations = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setHours(0, 0, 0, 0);

    return consultations.filter(consultation => {
      const consultationDate = new Date(consultation.date);
      consultationDate.setHours(0, 0, 0, 0);

      if (activeFilter === 'Todas') {
        return true;
      } else if (activeFilter === 'Hoje') {
        return consultationDate.getTime() === today.getTime();
      } else if (activeFilter === 'Semana') {
        return consultationDate.getTime() >= sevenDaysAgo.getTime() && consultationDate.getTime() <= today.getTime();
      } else if (activeFilter === 'Mês') {
        return consultationDate.getTime() >= startOfMonth.getTime() && consultationDate.getTime() <= today.getTime();
      }
      return false;
    });
  };

  const renderConsultationCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.petName}>{item.petName} - {item.clientName}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={styles.cardText}>Data: {item.date} às {item.time}</Text>
      <Text style={styles.cardText}>Serviço: {item.serviceType}</Text>
      <Text style={styles.cardText}>Duração: {item.duration}</Text>
      <Text style={styles.cardText}>Notas: {item.notes}</Text>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredConsultations = getFilteredConsultations();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Consultas</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContentContainer}
      >
        {['Todas', 'Hoje', 'Semana', 'Mês'].map((filter) => (
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
      </ScrollView>
      <FlatList
        data={filteredConsultations}
        renderItem={renderConsultationCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
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
  filterContainer: {
    marginBottom: 15,
  },
  filterContentContainer: {
    paddingRight: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailsButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default TelaHistoricoConsultas;