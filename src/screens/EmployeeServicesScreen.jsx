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
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';

const EmployeeServicesScreen = () => {
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
      nextTime: '11:30 AM',
      lastTime: '16:00 PM',
      duration: '30 min',
      badge: 'Confirmado',
    },
    {
      id: '2',
      name: 'Banho e Tosa',
      description: 'Higiene completa e tosa padrão.',
      status: 'confirmado',
      count: 1,
      nextTime: '14:30 PM',
      lastTime: '15:15 PM',
      duration: '45 min',
      badge: 'Confirmado',
    },
    {
      id: '3',
      name: 'Pequena Cirurgia',
      description: 'Procedimentos cirúrgicos simples.',
      status: 'pendente',
      count: 1,
      nextTime: '16:00 PM',
      lastTime: 'Amanhã 09:00',
      duration: '60 min',
      badge: 'Pendente',
    },
    {
      id: '4',
      name: 'Vacinação',
      description: 'Vacinação de rotina.',
      status: 'pendente',
      count: 0,
      nextTime: 'Amanhã 09:00',
      lastTime: 'Amanhã 10:00',
      duration: '15 min',
      badge: 'Pendente',
    },
  ];

  const getFilteredServices = () => {
    if (activeFilter === 'todas') return allServices;
    return allServices.filter(s => s.status === activeFilter);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado':
        return '#4CAF50';
      case 'pendente':
        return '#FBBC04';
      case 'concluido':
        return '#2196F3';
      case 'cancelado':
        return '#F44336';
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

  const renderServiceCard = (item) => (
    <View key={item.id} style={styles.serviceCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitle}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusBadgeText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <FontAwesome name="calendar" size={14} color={Colors.primary} />
          <Text style={styles.statText}>{item.count} hoje</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome name="clock-o" size={14} color={Colors.primary} />
          <Text style={styles.statText}>{item.nextTime}</Text>
        </View>
        <View style={styles.statItem}>
          <FontAwesome name="hourglass-half" size={14} color={Colors.primary} />
          <Text style={styles.statText}>{item.duration}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>Ver Agenda</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredServices = getFilteredServices();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <FontAwesome name="user" size={40} color={Colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{employeeData.name}</Text>
            <Text style={styles.role}>{employeeData.role}</Text>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.statusText}>
                {employeeData.status} • {employeeData.hours}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatLabel}>Hoje</Text>
            <Text style={styles.quickStatValue}>{employeeData.stats.today}</Text>
          </View>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatLabel}>Próxima</Text>
            <Text style={styles.quickStatValue}>{employeeData.stats.nextTime}</Text>
          </View>
          <View style={styles.quickStatItem}>
            <Text style={styles.quickStatLabel}>Taxa</Text>
            <Text style={styles.quickStatValue}>{employeeData.stats.rate}%</Text>
          </View>
        </View>
      </View>

      {/* SCROLL CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* RESUMO DO DIA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Dia</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total de Consultas:</Text>
              <Text style={styles.summaryValue}>{employeeData.stats.today}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Concluídas:</Text>
              <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
                {employeeData.stats.completed}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Pendentes:</Text>
              <Text style={[styles.summaryValue, { color: '#FBBC04' }]}>
                {employeeData.stats.pending}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Canceladas:</Text>
              <Text style={[styles.summaryValue, { color: '#F44336' }]}>
                {employeeData.stats.cancelled}
              </Text>
            </View>
          </View>
        </View>

        {/* FILTROS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meus Serviços Hoje</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
          >
            {['todas', 'confirmado', 'pendente', 'concluido'].map((filter) => (
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
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* SERVIÇOS */}
        <View style={styles.section}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => renderServiceCard(service))
          ) : (
            <View style={styles.emptyState}>
              <FontAwesome name="inbox" size={50} color={Colors.gray} />
              <Text style={styles.emptyText}>Nenhum serviço encontrado</Text>
            </View>
          )}
        </View>

        {/* ESPAÇO PARA SCROLL */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  statusText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  quickStatItem: {
    alignItems: 'center',
  },
  quickStatLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  summaryLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  filtersScroll: {
    marginBottom: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  serviceCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 10,
  },
  statusBadgeText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginBottom: 15,
    flexShrink: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
  viewButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  viewButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 16,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
});

export default EmployeeServicesScreen;