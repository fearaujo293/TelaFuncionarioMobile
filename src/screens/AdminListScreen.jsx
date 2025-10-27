import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // Assumindo que você tem @expo/vector-icons instalado
import Colors from '../Utils/Colors';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

const initialEmployees = [
  {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Clínico Geral',
    role: 'Veterinário',
    rating: 4.8,
    status: 'Ativo',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    phone: '(11) 98765-4321',
    email: 'joao.silva@vet.com',
  },
  {
    id: '2',
    name: 'Dra. Maria Souza',
    specialty: 'Dermatologista',
    role: 'Veterinário',
    rating: 4.9,
    status: 'Ativo',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    phone: '(11) 98765-1234',
    email: 'maria.souza@vet.com',
  },
  {
    id: '3',
    name: 'Ana Paula',
    specialty: 'Atendimento',
    role: 'Recepcionista',
    rating: 4.5,
    status: 'Férias',
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    phone: '(11) 99887-6655',
    email: 'ana.paula@vet.com',
  },
  {
    id: '4',
    name: 'Carlos Mendes',
    specialty: 'Auxiliar',
    role: 'Auxiliar',
    rating: 4.2,
    status: 'Ativo',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    phone: '(11) 97788-5544',
    email: 'carlos.mendes@vet.com',
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    specialty: 'Atendimento',
    role: 'Recepcionista',
    rating: 4.7,
    status: 'Ativo',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    phone: '(11) 96655-4433',
    email: 'fernanda.lima@vet.com',
  },
];

const roles = ['Todos', 'Veterinário', 'Recepcionista', 'Auxiliar'];
const employeeStatuses = ['Todos', 'Em Serviço', 'Livre para Atendimento', 'De Férias'];

const mockEmployees = [
  {
    id: '1',
    name: 'Dr. Ana Silva',
    specialty: 'Cardiologia',
    role: 'Veterinário',
    phone: '(11) 98765-4321',
    email: 'ana.silva@example.com',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 4.8,
    status: 'Em Serviço',
  },
  {
    id: '2',
    name: 'João Santos',
    specialty: 'Atendimento',
    role: 'Recepcionista',
    phone: '(11) 91234-5678',
    email: 'joao.santos@example.com',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 4.5,
    status: 'Livre para Atendimento',
  },
  {
    id: '3',
    name: 'Dra. Carla Lima',
    specialty: 'Cirurgia',
    role: 'Veterinário',
    phone: '(11) 99876-1234',
    email: 'carla.lima@example.com',
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 4.9,
    status: 'De Férias',
  },
  {
    id: '4',
    name: 'Pedro Almeida',
    specialty: 'Suporte',
    role: 'Auxiliar',
    phone: '(11) 97654-3210',
    email: 'pedro.almeida@example.com',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    rating: 4.2,
    status: 'Em Serviço',
  },
  {
    id: '5',
    name: 'Mariana Costa',
    specialty: 'Dermatologia',
    role: 'Veterinário',
    phone: '(11) 96543-2109',
    email: 'mariana.costa@example.com',
    photo: 'https://randomuser.me/api/portraits/women/5.jpg',
    rating: 4.7,
    status: 'Livre para Atendimento',
  },
];

const EmployeeCard = ({ employee, getStatusStyle }) => (
  <TouchableOpacity style={styles.employeeCard}>
    <Image source={{ uri: employee.photo }} style={styles.employeePhoto} />
    <View style={styles.employeeInfo}>
      <Text style={styles.employeeName}>{employee.name}</Text>
      <Text style={styles.employeeRole}>{employee.role}</Text>
      <View style={[styles.statusBadge, getStatusStyle(employee.status)]}>
        <Text style={styles.statusText}>{employee.status}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const AdminListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos'); // Novo estado para o status selecionado
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState(mockEmployees); // Usando dados mockados
  const navigation = useNavigation();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Em Serviço':
        return styles.statusEmServico;
      case 'Livre para Atendimento':
        return styles.statusLivreParaAtendimento;
      case 'De Férias':
        return styles.statusDeFerias;
      case 'Ativo':
        return styles.statusActive;
      default:
        return {};
    }
  };

  const handleAddEmployee = () => {
    navigation.navigate('AddAdmin');
  };

  const handleEmployeePress = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const filteredAdmins = employees.filter((func) => {
    const matchesSearch =
      func.name.toLowerCase().includes(searchText.toLowerCase()) ||
      func.specialty.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole =
      selectedRole === 'Todos' || func.role === selectedRole;

    const matchesStatus =
      selectedStatus === 'Todos' || func.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar funcionário..."
        value={searchText}
        onChangeText={setSearchText}
      />

      <View
        style={styles.filterContainer}
      >
        {roles.map((role) => (
          <TouchableOpacity
            key={role}
            style={[
              styles.filterButton,
              selectedRole === role && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedRole(role)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedRole === role && styles.filterButtonTextActive,
              ]}
            >
              {role}
            </Text>
          </TouchableOpacity>
        ))}</View>


      <FlatList
        data={filteredAdmins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmployeeCard
            key={item.id}
            employee={item}
            getStatusStyle={getStatusStyle}
          />
        )}
        contentContainerStyle={styles.listContentContainer}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
        <FontAwesome name="plus" size={24} color={Colors.white} />
      </TouchableOpacity>

      {selectedEmployee && (
        <EmployeeDetailModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          employee={selectedEmployee}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterButtonText: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  filterButtonTextActive: {
    color: Colors.white,
  },
  listContent: {
    paddingBottom: 80,
  },
  employeeCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  employeePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  employeeSpecialty: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 5,
  },
  employeeDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  employeeRole: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginLeft: 5,
  },
  employeeRating: {
    fontSize: 12,
    color: Colors.mediumGray,
    marginLeft: 5,
  },
  statusBadge: {
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginTop: 3,
    minWidth: 60,
    alignItems: 'center',
  },
  statusActive: {
    backgroundColor: Colors.success,
  },
  statusVacation: {
    backgroundColor: Colors.error,
  },
  statusEmServico: {
    backgroundColor: Colors.success, // Ou outra cor para 'Em Serviço'
  },
  statusLivreParaAtendimento: {
    backgroundColor: Colors.info, // Ou outra cor para 'Livre para Atendimento'
  },
  statusDeFerias: {
    backgroundColor: Colors.error, // Ou outra cor para 'De Férias'
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.white,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AdminListScreen;