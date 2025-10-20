import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme'; // Importar as cores do tema

const EmployeeDashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard do Funcionário</Text>

      {/* Seção de Resumo do Dia */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Resumo do Dia</Text>
        <View style={styles.summaryItem}>
          <FontAwesome name="calendar-check-o" size={22} color={Colors.primary} />
          <Text style={styles.summaryText}>5 Consultas Agendadas</Text>
        </View>
        <View style={styles.summaryItem}>
          <FontAwesome name="users" size={22} color={Colors.primary} />
          <Text style={styles.summaryText}>2 Novos Clientes</Text>
        </View>
        <View style={styles.summaryItem}>
          <FontAwesome name="paw" size={22} color={Colors.primary} />
          <Text style={styles.summaryText}>8 Pets Atendidos</Text>
        </View>
      </View>

      {/* Seção de Próximas Consultas */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Próximas Consultas</Text>
        <View style={styles.consultationItem}>
          <FontAwesome name="clock-o" size={20} color={Colors.darkGray} />
          <Text style={styles.consultationText}>10:00 - Rex (Consulta Geral)</Text>
        </View>
        <View style={styles.consultationItem}>
          <FontAwesome name="clock-o" size={20} color={Colors.darkGray} />
          <Text style={styles.consultationText}>11:30 - Mia (Vacinação)</Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllButtonText}>Ver Todas as Consultas</Text>
        </TouchableOpacity>
      </View>

      {/* Seção de Ações Rápidas */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton}>
            <FontAwesome name="plus-circle" size={35} color={Colors.accent} />
            <Text style={styles.quickActionButtonText}>Nova Consulta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <FontAwesome name="address-book" size={35} color={Colors.accent} />
            <Text style={styles.quickActionButtonText}>Ver Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <FontAwesome name="comments" size={35} color={Colors.accent} />
            <Text style={styles.quickActionButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Usando a cor de fundo do tema
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.text,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 18,
    elevation: 6,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.text,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 17,
    marginLeft: 12,
    color: Colors.darkGray,
  },
  consultationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  consultationText: {
    fontSize: 17,
    marginLeft: 12,
    color: Colors.darkGray,
  },
  viewAllButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  viewAllButtonText: {
    color: Colors.darkGray,
    fontWeight: 'bold',
    fontSize: 15,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 10,
  },
  quickActionButtonText: {
    fontSize: 15,
    color: Colors.darkGray,
    marginTop: 8,
    fontWeight: '500',
  },
});

export default EmployeeDashboardScreen;