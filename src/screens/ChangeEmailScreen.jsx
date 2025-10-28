import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando um ícone

const ChangeEmailScreen = () => {
  const navigation = useNavigation();
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');

  const handleChangeEmail = () => {
    if (newEmail !== confirmNewEmail) {
      Alert.alert('Erro', 'O novo email e a confirmação do email não coincidem.');
      return;
    }
    // Lógica para mudar o email
    console.log('Email atual:', currentEmail);
    console.log('Novo email:', newEmail);
    Alert.alert('Sucesso', 'Seu email foi alterado com sucesso!');
    // Limpar campos
    setCurrentEmail('');
    setNewEmail('');
    setConfirmNewEmail('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Mudar Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Atual"
        keyboardType="email-address"
        value={currentEmail}
        onChangeText={setCurrentEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Novo Email"
        keyboardType="email-address"
        value={newEmail}
        onChangeText={setNewEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Novo Email"
        keyboardType="email-address"
        value={confirmNewEmail}
        onChangeText={setConfirmNewEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
        <Text style={styles.buttonText}>Salvar Novo Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 30,
    marginTop: 40, // Ajuste para o botão de voltar
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangeEmailScreen;