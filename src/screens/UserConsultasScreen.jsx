import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const UserConsultasScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Pendentes');

  // Dados das consultas com informações únicas para cada pet
  const consultasData = {
    Pendentes: [
      {
        id: 1,
        petName: "Mascote 1",
        service: "Consulta Geral com Dr. Felipe A.", 
        doctorName: "Dr. Felipe A.",
        time: "10:00 AM",
        date: "2025-02-05",
        imageSource: require('../assets/cat1.png'),
        status: "Pendente",
        sintomas: "Meu gato acordou vomitando, está dormindo mais que o normal e não está comendo nada.",
        localizacao: "R. Bento Branco de Andrade Filho, 379 – Santo Amaro, São Paulo – SP, 04757-000",
        implementos: ["Termômetro", "Estetoscópio", "Soro"]
      },
      {
        id: 2,
        petName: "Mascote 2", 
        service: "Vacinação com Dra. Ana C.",
        doctorName: "Dra. Ana C.",
        time: "02:30 PM",
        date: "2025-02-06",
        imageSource: require('../assets/dog1.png'),
        status: "Pendente",
        sintomas: "Vacinação anual de rotina para meu cachorro.",
        localizacao: "Av. Paulista, 1000 – Bela Vista, São Paulo – SP, 01310-000",
        implementos: ["Vacina", "Algodão", "Álcool"]
      }
    ],
    Aceitas: [
      {
        id: 3,
        petName: "Mascote 3",
        service: "Exame de Sangue com Dr. João P.", 
        doctorName: "Dr. João P.",
        time: "09:00 AM",
        date: "2025-02-05",
        imageSource: require('../assets/dog2.png'),
        status: "Aceita",
        sintomas: "Meu cachorro está com fraqueza e perda de apetite, precisa de exame de sangue.",
        localizacao: "R. Augusta, 500 – Consolação, São Paulo – SP, 01305-000",
        implementos: ["Agulha", "Tubo de coleta", "Algodão"]
      }
    ],
    Andamento: [
      {
        id: 3,
        petName: "Mascote 3",
        service: "Exame de Sangue", 
        time: "09:00 AM",
        imageSource: require('../assets/dog2.png'),
        status: "Andamento",
        data: "09:00 | 05/02/2025",
        sintomas: "Meu cachorro está com fraqueza e perda de apetite, precisa de exame de sangue.",
        localizacao: "R. Augusta, 500 – Consolação, São Paulo – SP, 01305-000",
        implementos: ["Agulha", "Tubo de coleta", "Algodão"]
      }
    ],
    Concluídas: [
      {
        id: 4,
        petName: "Mascote 4",
        service: "Tosa com Dra. Ana C.", 
        doctorName: "Dra. Ana C.",
        time: "04:00 PM",
        date: "2025-02-04",
        imageSource: require('../assets/cat1.png'),
        status: "Concluída",
        sintomas: "Tosa de rotina para meu gato de pelo longo.",
        localizacao: "R. Oscar Freire, 800 – Jardim Paulista, São Paulo – SP, 01426-000",
        implementos: ["Tesoura", "Máquina de tosa", "Pente"]
      },
      {
        id: 5,
        petName: "Mascote 5",
        service: "Banho com Dr. João P.", 
        doctorName: "Dr. João P.",
        time: "01:00 PM",
        date: "2025-02-04",
        imageSource: require('../assets/dog1.png'),
        status: "Concluída",
        sintomas: "Banho e higienização completa para meu cachorro.",
        localizacao: "R. Haddock Lobo, 500 – Jardim Paulista, São Paulo – SP, 01414-000",
        implementos: ["Shampoo", "Condicionador", "Toalha"]
      }
    ]
  };

  const renderContent = () => {
    const Card = ({ consulta }) => {
      const navigateToDetails = () => {
        navigation.navigate('DetalhesConsulta', { consulta: { ...consulta, time: consulta.time, date: consulta.date } });
      };
  
      return (
        activeTab !== 'Pendentes' ? (
          <TouchableOpacity onPress={navigateToDetails} style={styles.card}>
            <Image source={consulta.imageSource} style={styles.petImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.petName}>{consulta.petName}</Text>
              <Text style={styles.service}>{consulta.service}</Text>
              <Text style={styles.time}>{consulta.time}</Text>
            </View>
            <View style={[styles.statusBadgeCard, styles[`status${consulta.status}`]]}>
              <Text style={styles.statusTextCard}>{consulta.status}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={navigateToDetails} style={styles.card}>
            <Image source={consulta.imageSource} style={styles.petImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.petName}>{consulta.petName}</Text>
              <Text style={styles.service}>{consulta.service}</Text>
              <Text style={styles.time}>{consulta.time}</Text>
            </View>
            <View style={[styles.statusBadgeCard, styles[`status${consulta.status}`]]}>
              <Text style={styles.statusTextCard}>{consulta.status}</Text>
            </View>
          </TouchableOpacity>
        )
      );
    };

    const currentConsultas = consultasData[activeTab] || [];
    
    return (
      <ScrollView style={styles.container}>
        {currentConsultas.map((consulta) => (
          <Card key={consulta.id} consulta={consulta} />
        ))}
      </ScrollView>
    );
  };

  const handleAgendarConsulta = () => {
    navigation.navigate('Agendamento');
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

      <ScrollView style={styles.contentContainer}>{renderContent()}</ScrollView>

      {/* <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('Agendamento')}>
        <Text style={styles.scheduleButtonText}>Agendar Consulta</Text>
      </TouchableOpacity> */}
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
    fontSize: 12,
    color: '#8D7EFB',
  },
  time: {
    fontSize: 12,
    color: '#C49DF6',
  },
  statusBadgeCard: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusTextCard: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusPendentes: {
    backgroundColor: 'rgba(141, 126, 251, 0.8)' // #8D7EFB with opacity
  },
  statusAceitas: {
    backgroundColor: 'rgba(196, 157, 246, 0.8)', // #C49DF6 with opacity
  },
  statusConcluída: {
    backgroundColor: 'rgba(163, 103, 240, 0.8)' // #A367F0 with opacity
  },
  scheduleButton: {
    backgroundColor: '#A367F0', // Gradient would be 'linear-gradient(to right, #A367F0, #8D7EFB)'
    height: 44,
    width: '80%',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24, // Added for bottom spacing
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Changed to row for side-by-side buttons
    justifyContent: 'space-between', // Distribute buttons evenly
    // Removed marginLeft: 10
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 20, // Increased padding for wider buttons
    borderRadius: 15, // Adjusted for a slightly oval shape
    marginHorizontal: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  acceptButton: {
    backgroundColor: '#4CAF50', // Green
  },
  rejectButton: {
    backgroundColor: '#F44336', // Red
  },
  detailsButton: {
    backgroundColor: '#C49DF6', // Light Purple
  },
});

export default UserConsultasScreen;