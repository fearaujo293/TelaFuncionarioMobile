import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const AdminConsultasScreen = ({ navigation }) => {
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
        sintomas: 'Fraqueza e perda de apetite.',
        localizacao: 'R. Augusta, 500 – Consolação, São Paulo – SP',
        implementos: ['Agulha', 'Tubo de coleta', 'Algodão'],
      },
    ],
    Concluídas: [
      {
        id: '4',
        petName: 'Miau',
        ownerName: 'Ana Costa',
        date: '2025-02-05',
        time: '16:00',
        service: 'Tosa',
        status: 'Concluída',
        imageSource: require('../assets/cat1.png'),
        veterinario: 'Dra. Lima',
        sintomas: 'Tosa de rotina.',
        localizacao: 'R. Oscar Freire, 800 – Jardim Paulista, São Paulo – SP',
        implementos: ['Tesoura', 'Máquina de tosa', 'Pente'],
      },
      {
        id: '5',
        petName: 'Max',
        ownerName: 'Pedro Lima',
        date: '2025-02-04',
        time: '13:00',
        service: 'Banho',
        status: 'Concluída',
        imageSource: require('../assets/dog1.png'),
        veterinario: 'Dr. Pereira',
        sintomas: 'Banho e higienização.',
        localizacao: 'R. Haddock Lobo, 500 – Jardim Paulista, São Paulo – SP',
        implementos: ['Shampoo', 'Condicionador', 'Toalha'],
      },
    ],
  });
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchConsultas();
    }, [])
  );

  const fetchConsultas = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
      Alert.alert('Erro', 'Não foi possível carregar as consultas.');
      setLoading(false);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return '#FFC107';
      case 'Aceita':
        return '#03DAC6';
      case 'Concluída':
        return '#4CAF50';
      default:
        return '#A367F0';
    }
  };

  const handleCardPress = (consulta) => {
    navigation.navigate('DetalhesConsulta', { consulta });
  };

  const renderConsultaCard = ({ item }) => {
    const formattedDate = new Date(item.date + 'T12:00:00').toLocaleDateString('pt-BR');
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.7}
      >
        <Image source={item.imageSource} style={styles.petImage} />
        
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.petName}>{item.petName}</Text>
              <Text style={styles.ownerName}>
                <FontAwesome name="user" size={11} color="#666" /> {item.ownerName}
              </Text>
              <Text style={styles.service}>{item.service}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={13} color="#999" />
              <Text style={styles.infoText}>{item.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={13} color="#999" />
              <Text style={styles.infoText}>{formattedDate}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="user-md" size={11} color="#999" />
              <Text style={styles.infoText}>{item.veterinario}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusBadgeText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const currentConsultas = consultas[activeTab] || [];

  return (
    <View style={styles.container}>
      {/* TABS SIMPLES */}
      <View style={styles.tabContainer}>
        {['Pendentes', 'Aceitas', 'Concluídas'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LISTA DE CONSULTAS */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A367F0" />
          <Text style={styles.loadingText}>Carregando consultas...</Text>
        </View>
      ) : currentConsultas.length > 0 ? (
        <FlatList
          data={currentConsultas}
          renderItem={renderConsultaCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="file-tray-outline" size={80} color="#DDD" />
          <Text style={styles.emptyTitle}>Nenhuma consulta</Text>
          <Text style={styles.emptySubtitle}>
            Você não tem consultas {activeTab.toLowerCase()}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: '#A367F0',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8D7EFB',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C79DFD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    marginBottom: 8,
  },
  petName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#A367F0',
    marginBottom: 2,
  },
  ownerName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
  },
  service: {
    fontSize: 12,
    color: '#8D7EFB',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default AdminConsultasScreen;