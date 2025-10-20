import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Colors } from '../Utils/Theme';
import { FontAwesome } from '@expo/vector-icons'; // Importar ícones

const AddEmployeeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('Ativo'); // Default status
  const [photoUri, setPhotoUri] = useState(null); // Para a foto do funcionário

  const handleSaveEmployee = () => {
    if (name && specialty && role && phone && email) {
      Alert.alert('Sucesso', `Funcionário ${name} (${role}) salvo com sucesso!`);
      // Aqui você adicionaria a lógica para salvar o funcionário no seu estado global ou API
      navigation.goBack(); // Volta para a tela anterior após salvar
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  // Função para selecionar imagem (placeholder por enquanto)
  const handleSelectPhoto = () => {
    Alert.alert('Selecionar Foto', 'Funcionalidade de seleção de foto será implementada aqui.');
    // setPhotoUri('https://randomuser.me/api/portraits/men/7.jpg'); // Exemplo de foto
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Adicionar Novo Funcionário</Text>

        <TouchableOpacity style={styles.photoContainer} onPress={handleSelectPhoto}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.profilePhoto} />
          ) : (
            <FontAwesome name="user-circle" size={80} color={Colors.lightGray} />
          )}
          <Text style={styles.addPhotoText}>Adicionar Foto</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor={Colors.darkGray}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Especialidade (Ex: Clínico Geral)"
          placeholderTextColor={Colors.darkGray}
          value={specialty}
          onChangeText={setSpecialty}
        />
        <TextInput
          style={styles.input}
          placeholder="Cargo (Ex: Veterinário, Recepcionista)"
          placeholderTextColor={Colors.darkGray}
          value={role}
          onChangeText={setRole}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor={Colors.darkGray}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor={Colors.darkGray}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo para Status - pode ser um Picker ou SegmentedControl no futuro */}
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status:</Text>
          <TouchableOpacity
            style={[styles.statusOption, status === 'Ativo' && styles.statusOptionActive]}
            onPress={() => setStatus('Ativo')}
          >
            <Text style={[styles.statusText, status === 'Ativo' && styles.statusTextActive]}>Ativo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statusOption, status === 'Férias' && styles.statusOptionActive]}
            onPress={() => setStatus('Férias')}
          >
            <Text style={[styles.statusText, status === 'Férias' && styles.statusTextActive]}>Férias</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveEmployee}>
          <Text style={styles.saveButtonText}>Salvar Funcionário</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: 20,
  },
  container: {
    width: '90%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 25,
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.lightGray,
    marginBottom: 10,
  },
  addPhotoText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.primary, // Alterado para a cor roxa principal
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
  },
  statusLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    marginRight: 10,
  },
  statusOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginRight: 10,
  },
  statusOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusText: {
    color: Colors.darkGray,
    fontSize: 14,
    fontWeight: '500',
  },
  statusTextActive: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: Colors.primary, // Alterado para a cor roxa principal
    width: '100%',
    paddingVertical: 18, // Aumentado o preenchimento vertical
    paddingHorizontal: 25, // Adicionado preenchimento horizontal
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5, // Aumentado a elevação para mais destaque
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddEmployeeScreen;