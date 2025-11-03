import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { consultationsData } from '../data/consultations';

const ConsultasScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Pendentes');
  const [consultas, setConsultas] = useState({
    Pendentes: [
      {
        id: '1',
        petName: 'Luna',
        ownerName: 'João Silva',
        date: '2025-02-10',
        time: '10:00',
        service: 'Consulta de Rotina',
        status: 'Pendente',
        imageSource: require('../assets/cat1.png'),
        veterinario: 'Dr. Silva',
        sintomas: 'Meu gato acordou vomitando, está dormindo mais que o normal.',
        localizacao: 'R. Bento Branco, 379 – Santo Amaro, São Paulo – SP',
        implementos: ['Termômetro', 'Estetoscópio', 'Soro'],
      },
      {
        id: '2',
        petName: 'Rex',
        ownerName: 'Maria Souza',
        date: '2025-02-11',
        time: '14:30',
        service: 'Vacinação',
        status: 'Pendente',
        imageSource: require('../assets/dog1.png'),
        veterinario: 'Dra. Costa',
        sintomas: 'Vacinação anual de rotina.',
        localizacao: 'Av. Paulista, 1000 – Bela Vista, São Paulo – SP',
        implementos: ['Vacina', 'Algodão', 'Álcool'],
      },
    ],
    Aceitas: [
      {
        id: '3',
        petName: 'Buddy',
        ownerName: 'Carlos Santos',
        date: '2025-02-08',
        time: '09:00',
        service: 'Exame de Sangue',
        status: 'Aceita',
        imageSource: require('../assets/dog2.png'),
        veterinario: 'Dr. Oliveira',
        sintomas: 'Exames de rotina para check-up.',
        localizacao: 'R. Augusta, 2000 – Cerqueira César, São Paulo – SP',
        implementos: ['Coletor de sangue', 'Tubos de ensaio'],
      },
    ],
    Concluídas: [
      {
        id: '4',
        petName: 'Milo',
        ownerName: 'Fernanda Lima',
        date: '2025-01-20',
        time: '11:00',
        service: 'Tosa Higiênica',
        status: 'Concluída',
        veterinario: 'Dra. Almeida',
        sintomas: 'Tosa para manter a higiene do pet.',
        localizacao: 'Av. Brasil, 500 – Jardim América, Rio de Janeiro – RJ',
        implementos: ['Máquina de tosa', 'Tesoura', 'Pente'],
      },
    ],
  });
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o carregamento de dados
    setTimeout(() => {
      setConsultations(consultationsData);
      setLoading(false);
    }, 2000);
  }, []);

  const renderConsultationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalhesConsulta', { consultation: item })}
    >
      <Image source={item.imageSource} style={styles.petImage} />
      <View style={styles.cardContent}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada':
        return '#4CAF50'; // Verde
      case 'Pendente':
        return '#FFC107'; // Amarelo
      case 'Cancelada':
        return '#F44336'; // Vermelho
      default:
        return '#9E9E9E'; // Cinza
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando consultas...</Text>
      </View>
    );
  }

  if (consultations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="clipboard-outline" size={80} color={Colors.textGray} />
        <Text style={styles.emptyTitle}>Nenhuma consulta encontrada</Text>
        <Text style={styles.emptySubtitle}>Parece que você não tem consultas agendadas.</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={Colors.gradientPrimary} style={styles.container}>
      <FlatList
        data={consultations}
        keyExtractor={(item) => item.id}
        renderItem={renderConsultationItem}
        contentContainerStyle={styles.flatListContent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Geologica_600SemiBold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.textGray,
  },
  time: {
    fontSize: 14,
    color: Colors.textGray,
    marginBottom: 8,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Geologica_500Medium',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textGray,
    fontFamily: 'Geologica_400Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Geologica_600SemiBold',
    color: Colors.textPrimary,
    marginTop: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textGray,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ConsultasScreen;