import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

const mockClients = [
  { id: '1', name: 'João Silva', petName: 'Rex', phone: '(11) 98765-4321', email: 'joao.silva@example.com' },
  { id: '2', name: 'Maria Souza', petName: 'Miau', phone: '(11) 91234-5678', email: 'maria.souza@example.com' },
  { id: '3', name: 'Carlos Pereira', petName: 'Bob', phone: '(11) 99887-6655', email: 'carlos.p@example.com' },
  { id: '4', name: 'Ana Costa', petName: 'Luna', phone: '(11) 97766-5544', email: 'ana.c@example.com' },
  { id: '5', name: 'Pedro Santos', petName: 'Thor', phone: '(11) 96655-4433', email: 'pedro.s@example.com' },
];

const UserListScreen = () => {
  const navigation = useNavigation();
  const [clients, setClients] = useState(mockClients);

  const handleViewClientDetails = (client) => {
    navigation.navigate('EmployeeChatTab', { screen: 'UserChatScreen', params: { clientId: client.id, clientName: client.name } });
  };

  const renderClientItem = ({ item }) => (
    <TouchableOpacity style={styles.clientCard} onPress={() => handleViewClientDetails(item)}>
      <FontAwesome name="user-circle" size={24} color={Colors.primary} style={styles.cardIcon} />
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{item.name}</Text>
        <View style={styles.petInfoContainer}>
          <FontAwesome name="paw" size={14} color={Colors.darkGray} style={styles.petIcon} />
          <Text style={styles.clientPet}>{item.petName}</Text>
        </View>
        <Text style={styles.clientContact}><FontAwesome name="phone" size={12} color={Colors.gray} /> {item.phone}</Text>
        <Text style={styles.clientContact}><FontAwesome name="envelope" size={12} color={Colors.gray} /> {item.email}</Text>
      </View>
      <FontAwesome name="chevron-right" size={16} color={Colors.gray} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      <FlatList
        data={clients}
        renderItem={renderClientItem}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  clientCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2, // Adiciona a largura da borda
    borderColor: Colors.primary, // Define a cor da borda como roxa
  },
  cardIcon: {
    marginRight: 15,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  petInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  petIcon: {
    marginRight: 5,
  },
  clientPet: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  clientContact: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UserListScreen;