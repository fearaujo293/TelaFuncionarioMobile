import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';

const consultationsData = [
  { id: '1', clientName: 'João Silva', service: 'Corte de Cabelo', date: '2023-10-26', time: '10:00' },
  { id: '2', clientName: 'Maria Souza', service: 'Manicure', date: '2023-10-26', time: '11:30' },
  { id: '3', clientName: 'Pedro Lima', service: 'Barba', date: '2023-10-27', time: '14:00' },
  { id: '4', clientName: 'Ana Costa', service: 'Coloração', date: '2023-10-27', time: '16:00' },
];

const AdminConsultationsScreen = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const renderConsultationItem = ({ item }) => (
    <View style={styles.consultationCard}>
      <Text style={styles.clientName}>{item.clientName}</Text>
      <Text style={styles.service}>{item.service}</Text>
      <Text style={styles.dateTime}>{item.date} às {item.time}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.viewButton]}>
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredConsultations = consultationsData.filter(consultation => {
    if (activeTab === 'pending') return consultation.status === 'Agendada';
    if (activeTab === 'accepted') return consultation.status === 'Aceita';
    if (activeTab === 'completed') return consultation.status === 'Concluída';
    return true;
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Consultas</Text>
        <Text style={styles.headerSubtitle}>Gerencie as consultas</Text>
      </LinearGradient>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'pending' && styles.activeTabButton]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'pending' && styles.activeTabButtonText]}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'accepted' && styles.activeTabButton]}
          onPress={() => setActiveTab('accepted')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'accepted' && styles.activeTabButtonText]}>Aceitas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'completed' && styles.activeTabButton]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'completed' && styles.activeTabButtonText]}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredConsultations}
        renderItem={renderConsultationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrayBorder,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: Colors.primary,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTabButtonText: {
    color: Colors.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  consultationCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clientName: {
    fontSize: 20,
    // fontFamily: 'Geologica_600SemiBold',
    color: Colors.text,
    marginBottom: 5,
  },
  service: {
    fontSize: 16,
    // fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    // fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  viewButton: {
    backgroundColor: Colors.primary,
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: Colors.white,
    // fontFamily: 'Geologica_500Medium',
    fontSize: 14,
  },
});

export default AdminConsultationsScreen;