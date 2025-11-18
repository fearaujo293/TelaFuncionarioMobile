import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const DeleteAccountScreen = () => {
  const navigation = useNavigation();

  const [confirmationText, setConfirmationText] = useState('');

  const handleDeleteAccount = () => {
    if (confirmationText.toLowerCase() === 'excluir minha conta') {
      Alert.alert(
        'Conta Excluída',
        'Sua conta foi excluída permanentemente.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert(
        'Erro',
        'Por favor, digite "excluir minha conta" para confirmar.'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Excluir Conta</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Excluir sua conta permanentemente</Text>
        <Text style={styles.warningText}>
          Ao excluir sua conta, todos os seus dados serão removidos permanentemente e não poderão ser recuperados.
        </Text>
        <Text style={styles.instructionText}>
          Para confirmar a exclusão, digite "excluir minha conta" no campo abaixo:
        </Text>
        <TextInput
          style={styles.confirmationInput}
          value={confirmationText}
          onChangeText={setConfirmationText}
          placeholder="excluir minha conta"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.deleteButton, confirmationText.toLowerCase() !== 'excluir minha conta' && styles.deleteButtonDisabled]}
          onPress={handleDeleteAccount}
          disabled={confirmationText.toLowerCase() !== 'excluir minha conta'}
        >
          <Text style={styles.deleteButtonText}>Excluir Conta</Text>
        </TouchableOpacity>
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
  placeholderText: {
    textAlign: 'center',
    color: '#8E8E93',
    paddingVertical: 20,
  },
  warningText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
  },
  confirmationInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    backgroundColor: '#FF3B3050',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DeleteAccountScreen;