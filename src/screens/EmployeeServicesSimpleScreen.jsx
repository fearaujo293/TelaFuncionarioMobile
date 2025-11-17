import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const EmployeeServicesSimpleScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('hoje');

  // Dados de exemplo para serviços/consultas
  const servicesData = {
    hoje: [
      {
        id: '1',
        petName: 'Rex',
        owner: 'Ana Silva',
        service: 'Consulta Veterinária',
        time: '09:00',
        duration: '30 min',
        status: 'confirmado',
        petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop',
        notes: 'Check-up anual'
      },
      {
        id: '2',
        petName: 'Luna',
        owner: 'Carlos Santos',
        service: 'Vacinação',
        time: '10:30',
        duration: '15 min',
        status: 'confirmado',
        petImage: 'https://images.unsplash.com/photo-1560809453-675b4293f3df?w=150&h=150&fit=crop',
        notes: 'V8 + Raiva'
      },
      {
        id: '3',
        petName: 'Thor',
        owner: 'Mariana Oliveira',
        service: 'Banho e Tosa',
        time: '14:00',
        duration: '45 min',
        status: 'pendente',
        petImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=150&h=150&fit=crop',
        notes: 'Tosa higiênica'
      }
    ],
    proximos: [
      {
        id: '4',
        petName: 'Mel',
        owner: 'João Pereira',
        service: 'Consulta',
        time: '09:30',
        date: 'Amanhã',
        duration: '30 min',
        status: 'confirmado',
        petImage: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=150&h=150&fit=crop',
        notes: 'Problemas digestivos'
      },
      {
        id: '5',
        petName: 'Bobby',
        owner: 'Paula Costa',
        service: 'Castração',
        time: '11:00',
        date: '18/11',
        duration: '2 horas',
        status: 'confirmado',
        petImage: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=150&h=150&fit=crop',
        notes: 'Pré-operatório realizado'
      }
    ]
  };

  const currentServices = servicesData[activeTab];

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

  const renderServiceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => navigation.navigate('DetalhesConsulta', { consulta: item })}
    >
      <Image source={{ uri: item.petImage }} style={styles.petImage} />
      
      <View style={styles.serviceInfo}>
        <Text style={styles.petName}>{item.petName}</Text>
        <Text style={styles.ownerName}>{item.owner}</Text>
        <Text style={styles.serviceType}>{item.service}</Text>
        
        <View style={styles.timeStatusRow}>
          <View style={styles.timeBadge}>
            <MaterialIcons name="access-time" size={14} color="#6B7280" />
            <Text style={styles.timeText}>{item.time}</Text>
            {item.date && <Text style={styles.dateText}> • {item.date}</Text>}
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
        
        {item.notes && (
          <View style={styles.notesContainer}>
            <MaterialIcons name="notes" size={12} color="#6B7280" />
            <Text style={styles.notesText} numberOfLines={1}>{item.notes}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  const quickActions = [
    {
      title: 'Histórico',
      icon: 'history',
      color: Colors.primary,
      onPress: () => navigation.navigate('EmployeeHistorico')
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Meus Serviços</Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'hoje' && styles.activeTab]}
            onPress={() => setActiveTab('hoje')}
          >
            <Text style={[styles.tabText, activeTab === 'hoje' && styles.activeTabText]}>
              Hoje ({servicesData.hoje.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'proximos' && styles.activeTab]}
            onPress={() => setActiveTab('proximos')}
          >
            <Text style={[styles.tabText, activeTab === 'proximos' && styles.activeTabText]}>
              Próximos ({servicesData.proximos.length})
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickAction, { backgroundColor: action.color }]}
            onPress={action.onPress}
          >
            <Ionicons name={action.icon} size={20} color="white" />
            <Text style={styles.quickActionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={currentServices}
        renderItem={renderServiceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event-busy" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>
              Nenhum serviço {activeTab === 'hoje' ? 'para hoje' : 'agendado'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
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
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 10,
    gap: 12,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  listContent: {
    padding: 20,
    paddingTop: 0,
  },
  serviceCard: {
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
  serviceInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
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
    marginBottom: 8,
  },
  timeStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
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
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  durationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
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

export default EmployeeServicesSimpleScreen;