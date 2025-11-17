import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { LinearGradient } from 'expo-linear-gradient';

  const EmployeeServicesScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState('todas');

  // Dados do funcionário
  const employeeData = {
    name: 'Dr. Felipe Almeida',
    role: 'Clínico Geral',
    status: 'Online',
    hours: '08:00 - 18:00',
    stats: {
      today: 5,
      completed: 3,
      pending: 2,
      cancelled: 0,
      rate: 92,
      nextTime: '09:00',
    },
  };

  // Serviços/Consultas do dia
  const allServices = [
    {
      id: '1',
      name: 'Consulta Veterinária',
      description: 'Exame completo e diagnóstico.',
      status: 'confirmado',
      count: 3,
      nextTime: '11:30',
      duration: '30 min',
      badge: 'Confirmado',
      icon: 'medical-bag',
    },
    {
      id: '2',
      name: 'Banho e Tosa',
      description: 'Higiene completa e tosa padrão.',
      status: 'confirmado',
      count: 1,
      nextTime: '14:30',
      duration: '45 min',
      badge: 'Confirmado',
      icon: 'pets',
    },
    {
      id: '3',
      name: 'Pequena Cirurgia',
      description: 'Procedimentos cirúrgicos simples.',
      status: 'pendente',
      count: 1,
      nextTime: '16:00',
      duration: '60 min',
      badge: 'Pendente',
      icon: 'healing',
    },
    {
      id: '4',
      name: 'Vacinação',
      description: 'Vacinação de rotina.',
      status: 'pendente',
      count: 0,
      nextTime: 'Amanhã 09:00',
      duration: '15 min',
      badge: 'Pendente',
      icon: 'local-hospital',
    },
  ];

  const getFilteredServices = () => {
    if (activeFilter === 'todas') return allServices;
    return allServices.filter(s => s.status === activeFilter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado':
        return '#10B981';
      case 'pendente':
        return '#F59E0B';
      case 'concluido':
        return '#3B82F6';
      case 'cancelado':
        return '#EF4444';
      default:
        return Colors.gray;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado';
      case 'pendente':
        return 'Pendente';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleServicePress = (item) => {
    navigation.navigate('EmployeeServiceDetails', { service: item });
  };

  const renderServiceCard = (item) => (
    <TouchableOpacity key={item.id} style={styles.serviceCard} onPress={() => handleServicePress(item)}>
      <View style={styles.cardContent}>
        <View style={styles.serviceHeader}>
          <View style={styles.serviceIconContainer}>
            <MaterialIcons name={item.icon} size={28} color={Colors.primary} />
          </View>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
          </View>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
        </View>

        <View style={styles.serviceStats}>
          <View style={styles.statChip}>
            <MaterialIcons name="today" size={18} color="#6B7280" />
            <Text style={styles.statChipText}>{item.count} hoje</Text>
          </View>
          <View style={styles.statChip}>
            <MaterialIcons name="schedule" size={18} color="#6B7280" />
            <Text style={styles.statChipText}>{item.nextTime}</Text>
          </View>
          <View style={styles.statChip}>
            <MaterialIcons name="timer" size={18} color="#6B7280" />
            <Text style={styles.statChipText}>{item.duration}</Text>
          </View>
        </View>
        <View style={styles.cardActionsRow}>
          <TouchableOpacity style={styles.cardActionBtn} onPress={() => navigation.navigate('AgendamentoScreen')}>
            <Text style={styles.cardActionText}>Agendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardActionBtn} onPress={() => navigation.navigate('EmployeeServiceDetails', { service: item })}>
            <Text style={styles.cardActionText}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredServices = getFilteredServices();

  return (
    <View style={styles.container}>
      {/* HEADER MODERNO */}
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <LinearGradient
                colors={['#ffffff', '#f8fafc']}
                style={styles.avatar}
              >
                <FontAwesome name="user" size={28} color={Colors.primary} />
              </LinearGradient>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.employeeName}>{employeeData.name}</Text>
              <Text style={styles.employeeRole}>{employeeData.role}</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.statusText}>{employeeData.status}</Text>
                <Text style={styles.hoursText}>• {employeeData.hours}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* ESTATÍSTICAS RÁPIDAS */}
      <View style={styles.quickStatsContainer}>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('TelaHistoricoConsultas')}>
          <Text style={styles.statNumber}>{employeeData.stats.today}</Text>
          <Text style={styles.statLabel}>Consultas Hoje</Text>
        </TouchableOpacity>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{employeeData.stats.completed}</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{employeeData.stats.pending}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{employeeData.stats.rate}%</Text>
          <Text style={styles.statLabel}>Taxa Sucesso</Text>
        </View>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('AdminListScreen')}>
          <Text style={styles.statLabel}>Ver Funcionários</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('AgendamentoScreen')}>
          <Text style={styles.statLabel}>Agendar Consulta</Text>
        </TouchableOpacity>
      </View>

      {/* CONTEÚDO PRINCIPAL */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* FILTROS MODERNOS */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Meus Serviços</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            {[
              { key: 'todas', label: 'Todas', icon: 'view-list' },
              { key: 'confirmado', label: 'Confirmadas', icon: 'check-circle' },
              { key: 'pendente', label: 'Pendentes', icon: 'schedule' },
              { key: 'concluido', label: 'Concluídas', icon: 'done' }
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterChip,
                  activeFilter === filter.key && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(filter.key)}
              >
                <MaterialIcons 
                  name={filter.icon} 
                  size={18} 
                  color={activeFilter === filter.key ? '#ffffff' : '#6B7280'} 
                />
                <Text
                  style={[
                    styles.filterChipText,
                    activeFilter === filter.key && styles.filterChipTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* LISTA DE SERVIÇOS */}
        <View style={styles.servicesSection}>
          {filteredServices.length > 0 ? (
            filteredServices.map(renderServiceCard)
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="event-busy" size={64} color="#D1D5DB" />
              <Text style={styles.emptyText}>Nenhum serviço encontrado</Text>
              <Text style={styles.emptySubtext}>Não há serviços para o filtro selecionado</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  employeeRole: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  hoursText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 4,
  },
  quickStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: -18,
    zIndex: 1,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  filtersSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginRight: 12,
    elevation: 2,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 6,
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  servicesSection: {
    flex: 1,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardContent: {
    padding: 20,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  serviceIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 12,
  },
  serviceStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
  },
  statChipText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
    marginLeft: 4,
  },
  cardActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  cardActionBtn: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardActionText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default EmployeeServicesScreen;
