import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; // Assumindo que você tem @expo/vector-icons instalado
import { Colors } from '../Utils/Theme';
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

const EmployeeCard = ({ employee, onPress }) => (
  <TouchableOpacity style={styles.employeeCard} onPress={() => onPress(employee)}>
    <LinearGradient
      colors={['#E3F2FD', '#BBDEFB']} // Gradiente mais suave
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardGradient}
    >
      <Image source={{ uri: employee.photo }} style={styles.employeePhoto} />
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{employee.name}</Text>
        <Text style={styles.employeeSpecialty}>{employee.specialty}</Text>
        <View style={styles.employeeDetailRow}>
          <FontAwesome name="briefcase" size={12} color={Colors.darkGray} />
          <Text style={styles.employeeRole}>{employee.role}</Text>
        </View>
        <View style={styles.employeeDetailRow}>
          <FontAwesome name="star" size={12} color={Colors.yellow} />
          <Text style={styles.employeeRating}>{employee.rating}</Text>
        </View>
      </View>
      <View style={[styles.statusBadge, employee.status === 'Ativo' ? styles.statusActive : styles.statusVacation]}>
        <Text style={styles.statusText}>{employee.status}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const AdminListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigation = useNavigation(); // Inicializar useNavigation

  const handleAddEmployee = () => {
    navigation.navigate('AddEmployee'); // Navegar para a tela AddEmployee
  };

  const handleEmployeePress = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const filteredAdmins = initialEmployees.filter((func) => {
    const matchesSearch =
      func.name.toLowerCase().includes(searchText.toLowerCase()) ||
      func.specialty.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole =
      selectedRole === 'Todos' || func.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
  <FontAwesome name="search" size={20} color={Colors.darkGray} style={styles.searchIcon} />
  <TextInput
    style={styles.searchInput}
    placeholder="Buscar funcionário..."
    placeholderTextColor={Colors.darkGray}
    value={searchText}
    onChangeText={setSearchText}
  />
  {searchText !== '' && (
    <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
      <FontAwesome name="times" size={18} color={Colors.darkGray} />
    </TouchableOpacity>
  )}
</View>

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
        ))}
      </View>

      <FlatList
        data={filteredAdmins}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EmployeeCard employee={item} onPress={handleEmployeePress} />
        )}
        contentContainerStyle={styles.employeeList}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddEmployee}>
        <FontAwesome name="plus" size={20} color={Colors.white} />
        <Text style={styles.addButtonText}>Adicionar Funcionário</Text>
      </TouchableOpacity>

      {selectedEmployee && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <FontAwesome name="times-circle" size={28} color={Colors.darkGray} />
              </TouchableOpacity>
              <Image source={{ uri: selectedEmployee.photo }} style={styles.modalEmployeePhoto} />
              <Text style={styles.modalEmployeeName}>{selectedEmployee.name}</Text>
              <Text style={styles.modalEmployeeSpecialty}>{selectedEmployee.specialty}</Text>

              <View style={styles.modalDetailRow}>
                <FontAwesome name="briefcase" size={18} color={Colors.darkGray} />
                <Text style={styles.modalDetailText}>Cargo: {selectedEmployee.role}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <FontAwesome name="phone" size={18} color={Colors.darkGray} />
                <Text style={styles.modalDetailText}>Telefone: {selectedEmployee.phone || 'N/A'}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <FontAwesome name="envelope" size={18} color={Colors.darkGray} />
                <Text style={styles.modalDetailText}>Email: {selectedEmployee.email || 'N/A'}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <FontAwesome name="star" size={18} color={Colors.yellow} />
                <Text style={styles.modalDetailText}>Avaliação: {selectedEmployee.rating}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <FontAwesome
                  name="circle"
                  size={14}
                  color={selectedEmployee.status === 'Ativo' ? Colors.green : Colors.red}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalDetailText}>Status: {selectedEmployee.status}</Text>
              </View>

              <View style={styles.modalActionButtons}>
                <TouchableOpacity style={styles.editButton}>
                  <FontAwesome name="edit" size={20} color={Colors.white} style={{ marginRight: 5 }} />
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.contactButton}>
                  <FontAwesome name="comments" size={20} color={Colors.primary} style={{ marginRight: 5 }} />
                  <Text style={styles.contactButtonText}>Contato</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Usando a cor de fundo do tema
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 15,
    elevation: 6, // Mais elevação
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 60, // Altura ajustada para ser maior
    fontSize: 16,
    color: Colors.text,
  },
  clearButton: {
    marginLeft: 10,
    padding: 5,
  },
  filterScrollView: {
    marginVertical: 5,
    marginBottom: 10, // Mais espaço entre filtros e lista
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
    alignItems: 'center', // Adicionado para centralizar os itens
    flexWrap: 'wrap', // Adicionado para permitir que os itens quebrem a linha
  },
  filterButton: {
    backgroundColor: Colors.white,
    borderRadius: 15, // Borda mais suave
    paddingVertical: 6, // Aumentado
    paddingHorizontal: 12, // Aumentado
    marginRight: 2, // Espaçamento menor entre botões
    elevation: 0.5, // Sombra mais sutil
    shadowOpacity: 0.05,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    color: Colors.darkGray,
    fontSize: 12, // Aumentado
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  employeeList: {
    paddingBottom: 80,
  },
  employeeCard: {
    marginBottom: 8, // Reduzir espaçamento entre cards
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8, // Reduzir padding do card
    borderRadius: 10,
  },
  employeePhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 2,
    borderColor: Colors.white,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2, // Sombra na foto
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16, // Fonte menor
    fontWeight: 'bold',
    color: Colors.text,
  },
  employeeSpecialty: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 3,
  },
  employeeDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  employeeRole: {
    fontSize: 12,
    color: Colors.darkGray,
    marginLeft: 5,
  },
  employeeRating: {
    fontSize: 12,
    color: Colors.yellow,
    marginLeft: 5,
    fontWeight: 'bold',
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
    backgroundColor: Colors.green,
  },
  statusVacation: {
    backgroundColor: Colors.red,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.white,
  },
  addButton: {
    backgroundColor: Colors.primary, // Alterado para a cor roxa principal
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18, // Aumentado o preenchimento vertical
    paddingHorizontal: 25, // Aumentado o preenchimento horizontal
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    elevation: 8, // Aumentado a elevação para mais destaque
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Overlay mais escuro
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    width: '90%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 14,
    padding: 2, // Botão de fechamento com fundo
  },
  modalEmployeePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: Colors.primary,
  },
  modalEmployeeName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  modalEmployeeSpecialty: {
    fontSize: 18,
    color: Colors.darkGray,
    marginBottom: 25,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  modalDetailText: {
    fontSize: 17,
    color: Colors.text,
    marginLeft: 15,
  },
  modalActionButtons: {
    flexDirection: 'row',
    marginTop: 35,
  },
  editButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactButton: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  contactButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminListScreen;