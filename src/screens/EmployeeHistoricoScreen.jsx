import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const EmployeeHistoricoScreen = () => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const navigation = useNavigation();

  // Dados de exemplo - histórico de todas as consultas da clínica
  const todasConsultas = [
    {
      id: '1',
      petName: 'Rex',
      owner: 'Ana Silva',
      service: 'Consulta Veterinária',
      date: '15/11/2024',
      time: '09:00',
      status: 'concluido',
      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop',
      employee: 'Dr. Felipe'
    },
    {
      id: '2',
      petName: 'Luna',
      owner: 'Carlos Santos',
      service: 'Vacinação',
      date: '15/11/2024',
      time: '10:30',
      status: 'concluido',
      petImage: 'https://images.unsplash.com/photo-1560809453-675b4293f3df?w=150&h=150&fit=crop',
      employee: 'Dr. Felipe'
    },
    {
      id: '3',
      petName: 'Thor',
      owner: 'Mariana Oliveira',
      service: 'Banho e Tosa',
      date: '16/11/2024',
      time: '14:00',
      status: 'concluido',
      petImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&h=150&fit=crop',
      employee: 'Dra. Carla'
    },
    {
      id: '4',
      petName: 'Mel',
      owner: 'João Pereira',
      service: 'Consulta',
      date: '16/11/2024',
      time: '09:30',
      status: 'cancelado',
      petImage: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=150&h=150&fit=crop',
      employee: 'Dr. Felipe'
    },
    {
      id: '5',
      petName: 'Bobby',
      owner: 'Paula Costa',
      service: 'Castração',
      date: '17/11/2024',
      time: '11:00',
      status: 'concluido',
      petImage: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=150&h=150&fit=crop',
      employee: 'Dra. Carla'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado': return '#10B981';
      case 'pendente': return '#F59E0B';
      case 'concluido': return '#3B82F6';
      case 'cancelado': return '#EF4444';
      default: return Colors.gray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmado': return 'Confirmado';
      case 'pendente': return 'Pendente';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      default: return status;
    }
  };

  const filteredConsultations = activeFilter === 'todas' 
    ? todasConsultas 
    : todasConsultas.filter(consulta => consulta.status === activeFilter);

  const renderConsultaCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.consultaCard}
      onPress={() => navigation.navigate('DetalhesConsulta', { consulta: item })}
    >
      <Image source={{ uri: item.petImage }} style={styles.petImage} />
      
      <View style={styles.consultaInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.petName}>{item.petName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.ownerName}>Dono: {item.owner}</Text>
        <Text style={styles.serviceType}>{item.service}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <MaterialIcons name="calendar-today" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="access-time" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <MaterialIcons name="person" size={14} color="#6B7280" />
            <Text style={styles.detailText}>{item.employee}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Histórico da Clínica</Text>
        </View>
        
        <View style={styles.tabContainer}>
          {['todas', 'concluido', 'cancelado'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.tab, activeFilter === filter && styles.activeTab]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.tabText, activeFilter === filter && styles.activeTabText]}>
                {filter === 'todas' ? 'Todas' : getStatusText(filter)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <FlatList
        data={filteredConsultations}
        renderItem={renderConsultaCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event-busy" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>
              Nenhuma consulta {activeFilter !== 'todas' ? getStatusText(activeFilter).toLowerCase() : 'encontrada'}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  activeTabText: {
    color: Colors.primary,
  },
  listContent: {
    padding: 20,
  },
  consultaCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  consultaInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ownerName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.primary,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default EmployeeHistoricoScreen;