import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const EditSpecialtiesScreen = () => {
  const navigation = useNavigation();
  const [specialties, setSpecialties] = useState([
    { id: '1', name: 'Clínico Geral' },
    { id: '2', name: 'Cardiologia Veterinária' },
    { id: '3', name: 'Dermatologia Veterinária' },
  ]);
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira uma especialidade.');
      return;
    }
    setSpecialties([...specialties, { id: String(specialties.length + 1), name: newSpecialty.trim() }]);
    setNewSpecialty('');
  };

  const handleDeleteSpecialty = (id) => {
    Alert.alert(
      'Remover Especialidade',
      'Tem certeza que deseja remover esta especialidade?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => setSpecialties(specialties.filter(item => item.id !== id)) },
      ],
      { cancelable: true }
    );
  };

  const renderSpecialtyItem = ({ item }) => (
    <View style={styles.specialtyItem}>
      <Text style={styles.specialtyName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDeleteSpecialty(item.id)} style={styles.deleteButton}>
        <Icon name="trash-alt" size={18} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Especialidades</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suas Especialidades</Text>
        {specialties.length > 0 ? (
          <FlatList
            data={specialties}
            renderItem={renderSpecialtyItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.noSpecialtiesText}>Nenhuma especialidade adicionada.</Text>
        )}

        <View style={styles.addSpecialtyContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nova Especialidade"
            value={newSpecialty}
            onChangeText={setNewSpecialty}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddSpecialty}>
            <Icon name="plus-circle" size={20} color="#FFF" />
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  section: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 10,
  },
  specialtyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  specialtyName: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  noSpecialtiesText: {
    textAlign: 'center',
    color: '#8E8E93',
    paddingVertical: 20,
  },
  addSpecialtyContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#6D52E8',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default EditSpecialtiesScreen;