import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';

const EmployeeDashboardScreen = ({ navigation }) => {
  const [todayStats] = useState({
    totalAppointments: 8,
    completed: 3,
    inProgress: 2,
    pending: 3,
    nextAppointment: '14:30 - Thor (Vacinação)'
  });

  const quickActions = [
    { 
      title: 'Minhas Consultas', 
      icon: 'calendar', 
      color: '#4CAF50',
      onPress: () => navigation.navigate('AllAppointments')
    },
    { 
      title: 'Serviços', 
      icon: 'medical-bag', 
      color: '#2196F3',
      onPress: () => navigation.navigate('EmployeeServices')
    },
    { 
      title: 'Mensagens', 
      icon: 'chat', 
      color: '#FF9800',
      onPress: () => navigation.navigate('Chat')
    },
    { 
      title: 'Configurações', 
      icon: 'cog', 
      color: '#9C27B0',
      onPress: () => navigation.navigate('Configurações')
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header com Gradiente */}
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.welcomeText}>Bem-vindo,</Text>
            <Text style={styles.nameText}>Dr. Felipe Almeida</Text>
            <Text style={styles.roleText}>Clínico Geral</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Estatísticas do Dia */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Hoje</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{todayStats.totalAppointments}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            
            <View style={[styles.statCard, styles.statCompleted]}>
              <Text style={styles.statNumber}>{todayStats.completed}</Text>
              <Text style={styles.statLabel}>Concluídas</Text>
            </View>
            
            <View style={[styles.statCard, styles.statProgress]}>
              <Text style={styles.statNumber}>{todayStats.inProgress}</Text>
              <Text style={styles.statLabel}>Andamento</Text>
            </View>
            
            <View style={[styles.statCard, styles.statPending]}>
              <Text style={styles.statNumber}>{todayStats.pending}</Text>
              <Text style={styles.statLabel}>Pendentes</Text>
            </View>
          </View>

          <View style={styles.nextAppointment}>
            <MaterialIcons name="access-time" size={20} color="#666" />
            <Text style={styles.nextAppointmentText}>
              Próxima: {todayStats.nextAppointment}
            </Text>
          </View>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionButton}
                onPress={action.onPress}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <FontAwesome5 name={action.icon} size={20} color="white" />
                </View>
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Status de Disponibilidade */}
        <View style={styles.availabilitySection}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.availabilityCard}>
            <View style={styles.availabilityInfo}>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, styles.statusOnline]} />
                <Text style={styles.statusText}>Online</Text>
              </View>
              <Text style={styles.availabilityTime}>08:00 - 18:00</Text>
            </View>
            <TouchableOpacity style={styles.changeStatusButton}>
              <Text style={styles.changeStatusText}>Alterar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileInfo: {
    marginLeft: 15,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  nameText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  roleText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginTop: 2,
  },
  content: {
    flex: 1,
    marginTop: -20,
  },
  statsSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    minWidth: 70,
  },
  statCompleted: {
    backgroundColor: '#E6F4EA',
  },
  statProgress: {
    backgroundColor: '#FFF3E0',
  },
  statPending: {
    backgroundColor: '#FFEBEE',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  nextAppointment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  nextAppointmentText: {
    marginLeft: 8,
    color: '#0369A1',
    fontWeight: '600',
  },
  actionsSection: {
    margin: 16,
    marginTop: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  availabilitySection: {
    margin: 16,
    marginTop: 8,
  },
  availabilityCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  availabilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusOnline: {
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  availabilityTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  changeStatusButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changeStatusText: {
    color: '#374151',
    fontWeight: '600',
  },
});

export default EmployeeDashboardScreen;