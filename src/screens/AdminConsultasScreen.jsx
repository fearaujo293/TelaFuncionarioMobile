import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AdminConsultasScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Pendentes');
  const [consultas, setConsultas] = useState({
    Pendentes: [],
    Aceitas: [],
    Concluídas: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConsultas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Substitua pela sua URL de API real para buscar consultas
      const response = await fetch('https://api.example.com/consultas');
      if (!response.ok) {
        throw new Error('Falha ao buscar consultas.');
      }
      const data = await response.json();

      const organizedConsultas = {
        Pendentes: data.filter(c => c.status === 'Pendente'),
        Aceitas: data.filter(c => c.status === 'Aceita'),
        Concluídas: data.filter(c => c.status === 'Concluída'),
      };
      setConsultas(organizedConsultas);
    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
      setError('Não foi possível carregar as consultas.');
      Alert.alert('Erro', 'Não foi possível carregar as consultas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchConsultas();
    }, [fetchConsultas])
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#A367F0" />
          <Text style={styles.loadingText}>Carregando consultas...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchConsultas} style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const Card = ({ consulta }) => {
      const navigateToDetails = () => {
        navigation.navigate('DetalhesConsulta', { consulta: { ...consulta, time: consulta.time, date: consulta.date } });
      };
  
      return (
        <TouchableOpacity onPress={navigateToDetails} style={styles.card}>
          <Image source={{ uri: consulta.imageSource }} style={styles.petImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.petName}>{consulta.petName}</Text>
            <Text style={styles.service}>{consulta.service}</Text>
            <Text style={styles.time}>{consulta.time} | {consulta.date}</Text>
          </View>
          <View style={[styles.statusBadgeCard, styles[`status${consulta.status}`]]}>
            <Text style={styles.statusTextCard}>{consulta.status}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    const currentConsultas = consultas[activeTab] || [];
    
    if (currentConsultas.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma consulta {activeTab.toLowerCase()} encontrada.</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        {currentConsultas.map((consulta) => (
          <Card key={consulta.id} consulta={consulta} />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Pendentes' && styles.activeTab]}
          onPress={() => setActiveTab('Pendentes')}
        >
          <Text style={[styles.tabText, activeTab === 'Pendentes' && styles.activeTabText]}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Aceitas' && styles.activeTab]}
          onPress={() => setActiveTab('Aceitas')}
        >
          <Text style={[styles.tabText, activeTab === 'Aceitas' && styles.activeTabText]}>Aceitas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Concluídas' && styles.activeTab]}
          onPress={() => setActiveTab('Concluídas')}
        >
          <Text style={[styles.tabText, activeTab === 'Concluídas' && styles.activeTabText]}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribuição uniforme entre as abas
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10, // Espaçamento das bordas do container
  },
  tab: {
    width: '30%', // Largura ajustada para melhor distribuição
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0, // Espaçamento controlado por justifyContent
  },
  activeTab: {
    backgroundColor: '#A367F0',
    transform: [{ scale: 1.05 }], // Destaque sutil
    paddingVertical: 16, // Menor altura
    paddingHorizontal: 10, // Menor largura
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8D7EFB',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  contentContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 75, // Aumentado em mais 20px
    padding: 20, // Ajustado para um preenchimento maior
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C79DFD',
  },
  petImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10, // Added margin to separate from buttons
  },
  petName: {
    fontWeight: 'bold',
    color: '#A367F0',
  },
  service: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  statusBadgeCard: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusTextCard: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusPendente: {
    backgroundColor: '#FFC107',
  },
  statusAceita: {
    backgroundColor: '#28A745',
  },
  statusConcluída: {
    backgroundColor: '#6C757D',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorButton: {
    backgroundColor: '#A367F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  errorButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default AdminConsultasScreen;