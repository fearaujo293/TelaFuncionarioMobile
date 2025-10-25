import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../Utils/Theme';
import { FontAwesome } from '@expo/vector-icons';

const mockServices = [
  { id: '1', name: 'Consulta Veterinária', price: 'R$ 100,00', description: 'Exame completo e diagnóstico.' },
  { id: '2', name: 'Banho e Tosa', price: 'R$ 80,00', description: 'Higiene completa e tosa padrão.' },
  { id: '3', name: 'Pequena Cirurgia', price: 'R$ 300,00', description: 'Procedimentos cirúrgicos simples.' },
  { id: '4', name: 'Vacinação', price: 'R$ 70,00', description: 'Aplicação de vacinas essenciais.' },
  { id: '5', name: 'Exames Laboratoriais', price: 'R$ 150,00', description: 'Análises clínicas diversas.' },
];

const EmployeeServicesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { employeeId, employeeName, employeeRole, employeePhoto } = route.params || {};

  const displayEmployeeName = employeeName || 'Nome do Funcionário';
  const displayEmployeeRole = employeeRole || 'Cargo do Funcionário';
  const displayEmployeePhoto = employeePhoto || 'https://via.placeholder.com/150'; // Imagem padrão

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceCard}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <Text style={styles.servicePrice}>{item.price}</Text>
      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={styles.scheduleButtonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: displayEmployeePhoto }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.employeeName}>{displayEmployeeName}</Text>
          <Text style={styles.employeeRole}>{displayEmployeeRole}</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Serviços Oferecidos</Text>
      </View>

      <FlatList
        data={mockServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.servicesList}
        scrollEnabled={false} // Para que o ScrollView pai possa rolar tudo
      />

      <TouchableOpacity style={styles.chatButton}>
        <FontAwesome name="comments" size={24} color={Colors.white} />
        <Text style={styles.chatButtonText}>Conversar com {displayEmployeeName}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 20,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  employeeRole: {
    fontSize: 17,
    color: Colors.darkGray,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.lightBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  servicesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  serviceName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 15,
    color: Colors.darkGray,
    marginBottom: 5,
  },
  servicePrice: {
    fontSize: 17,
    color: Colors.primary,
    fontWeight: '700',
    marginTop: 5,
  },
  scheduleButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  scheduleButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
  chatButton: {
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    padding: 18,
    borderRadius: 18,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  chatButtonText: {
    color: Colors.white,
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default EmployeeServicesScreen;