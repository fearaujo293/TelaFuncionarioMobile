import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VeteScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Agendada');

  // Dados das consultas
  const consultasData = {
    Agendada: [
      {
        id: 1,
        petName: "Luna",
        service: "Consulta Geral", 
        time: "10:00 AM",
        imageSource: require('../assets/cat1.png'),
        status: "Agendada",
        date: "2025-02-15",
        sintomas: "Meu gato acordou vomitando, está dormindo mais que o normal e não está comendo nada.",
        localizacao: "R. Bento Branco de Andrade Filho, 379 – Santo Amaro, São Paulo – SP, 04757-000",
        implementos: ["Termômetro", "Estetoscópio", "Soro"],
        ownerName: "João Silva",
        veterinario: "Dr. Silva"
      },
      {
        id: 2,
        petName: "Rex", 
        service: "Vacinação",
        time: "02:30 PM",
        imageSource: require('../assets/dog1.png'),
        status: "Agendada",
        date: "2025-02-16",
        sintomas: "Vacinação anual de rotina para meu cachorro.",
        localizacao: "Av. Paulista, 1000 – Bela Vista, São Paulo – SP, 01310-000",
        implementos: ["Vacina", "Algodão", "Álcool"],
        ownerName: "Maria Souza",
        veterinario: "Dra. Costa"
      }
    ],
    Andamento: [
      {
        id: 3,
        petName: "Buddy",
        service: "Exame de Sangue", 
        time: "09:00 AM",
        imageSource: require('../assets/dog2.png'),
        status: "Andamento",
        date: "2025-02-10",
        sintomas: "Meu cachorro está com fraqueza e perda de apetite, precisa de exame de sangue.",
        localizacao: "R. Augusta, 500 – Consolação, São Paulo – SP, 01305-000",
        implementos: ["Agulha", "Tubo de coleta", "Algodão"],
        ownerName: "Carlos Santos",
        veterinario: "Dr. Oliveira"
      }
    ],
    Concluídas: [
      {
        id: 4,
        petName: "Miau",
        service: "Tosa", 
        time: "04:00 PM",
        imageSource: require('../assets/cat1.png'),
        status: "Concluída",
        date: "2025-02-05",
        sintomas: "Tosa de rotina para meu gato de pelo longo.",
        localizacao: "R. Oscar Freire, 800 – Jardim Paulista, São Paulo – SP, 01426-000",
        implementos: ["Tesoura", "Máquina de tosa", "Pente"],
        ownerName: "Ana Costa",
        veterinario: "Dra. Lima"
      },
      {
        id: 5,
        petName: "Max",
        service: "Banho", 
        time: "01:00 PM",
        imageSource: require('../assets/dog1.png'),
        status: "Concluída",
        date: "2025-02-04",
        sintomas: "Banho e higienização completa para meu cachorro.",
        localizacao: "R. Haddock Lobo, 500 – Jardim Paulista, São Paulo – SP, 01414-000",
        implementos: ["Shampoo", "Condicionador", "Toalha"],
        ownerName: "Pedro Lima",
        veterinario: "Dr. Pereira"
      }
    ]
  };

  const handleCardPress = (consulta) => {
    // Formatar data para o formato esperado
    const formattedConsulta = {
      ...consulta,
      data: consulta.date.split('-').reverse().join('/'),
    };
    // Navegar para tela de detalhes (nome de rota unificado)
    navigation.navigate('DetalhesConsulta', { consulta: formattedConsulta });
  };

  const handleAgendarConsulta = () => {
    // Navegar para tela de agendamento (nome de rota unificado)
    navigation.navigate('Agendamento');
  };

  const renderConsultaCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => handleCardPress(item)}
      activeOpacity={0.7}
    >
      <Image source={item.imageSource} style={styles.petImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.petName}>{item.petName}</Text>
        <Text style={styles.service}>{item.service}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={[styles.statusBadgeCard, styles[`status${item.status}`]]}>
        <Text style={styles.statusTextCard}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  const currentConsultas = consultasData[activeTab] || [];

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Agendada' && styles.activeTab]}
          onPress={() => setActiveTab('Agendada')}
        >
          <Text style={[styles.tabText, activeTab === 'Agendada' && styles.activeTabText]}>
            Agendada
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Andamento' && styles.activeTab]}
          onPress={() => setActiveTab('Andamento')}
        >
          <Text style={[styles.tabText, activeTab === 'Andamento' && styles.activeTabText]}>
            Andamento
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Concluídas' && styles.activeTab]}
          onPress={() => setActiveTab('Concluídas')}
        >
          <Text style={[styles.tabText, activeTab === 'Concluídas' && styles.activeTabText]}>
            Concluídas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Consultas */}
      <FlatList
        data={currentConsultas}
        renderItem={renderConsultaCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />

      {/* Botão de Agendar */}
      <TouchableOpacity 
        style={styles.scheduleButton} 
        onPress={handleAgendarConsulta}
        activeOpacity={0.8}
      >
        <Text style={styles.scheduleButtonText}>+ Agendar Consulta</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 12,
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
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#A367F0',
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8D7EFB',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    height: 80,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C79DFD',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  petName: {
    fontWeight: 'bold',
    color: '#A367F0',
    fontSize: 14,
    marginBottom: 2,
  },
  service: {
    fontSize: 12,
    color: '#8D7EFB',
    marginBottom: 2,
  },
  time: {
    fontSize: 11,
    color: '#C49DF6',
  },
  statusBadgeCard: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  statusTextCard: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusAgendada: {
    backgroundColor: 'rgba(141, 126, 251, 0.85)',
  },
  statusAndamento: {
    backgroundColor: 'rgba(196, 157, 246, 0.85)',
  },
  statusConcluída: {
    backgroundColor: 'rgba(163, 103, 240, 0.85)',
  },
  scheduleButton: {
    position: 'absolute',
    bottom: 20,
    left: '10%',
    right: '10%',
    backgroundColor: '#A367F0',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VeteScreen;