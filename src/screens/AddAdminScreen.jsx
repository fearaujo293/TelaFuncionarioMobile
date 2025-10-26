import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddAdminScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { employee } = route.params || {}; // Get employee data if in edit mode

  const [name, setName] = useState(employee?.name || '');
  const [specialty, setSpecialty] = useState(employee?.specialty || '');
  const [role, setRole] = useState(employee?.role || '');
  const [phone, setPhone] = useState(employee?.phone || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setSpecialty(employee.specialty);
      setRole(employee.role);
      setPhone(employee.phone);
      setEmail(employee.email);
    }
  }, [employee]);

  const handleSaveEmployee = async () => {
    if (!name || !specialty || !role || !phone || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    const employeeData = { name, specialty, role, phone, email };
    const url = employee?.id ? `YOUR_ACTUAL_API_BASE_URL/employees/${employee.id}` : 'YOUR_ACTUAL_API_BASE_URL/employees'; // Substitua YOUR_ACTUAL_API_BASE_URL pela sua URL base da API real
    const method = employee?.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error('Falha ao salvar funcionário.');
      }

      Alert.alert('Sucesso', `Funcionário ${employee?.id ? 'atualizado' : 'adicionado'} com sucesso!`);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o funcionário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{employee?.id ? 'Editar Funcionário' : 'Adicionar Novo Funcionário'}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome Completo</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Nome do funcionário"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Especialidade</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="briefcase" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: Clínico Geral, Dermatologista"
            value={specialty}
            onChangeText={setSpecialty}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cargo</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="id-badge" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: Veterinário, Recepcionista, Auxiliar"
            value={role}
            onChangeText={setRole}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="(XX) XXXXX-XXXX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="email@exemplo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveEmployee} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <>
            <FontAwesome name="save" size={20} color={Colors.white} style={styles.saveIcon} />
            <Text style={styles.saveButtonText}>{employee?.id ? 'Atualizar Funcionário' : 'Salvar Funcionário'}</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 30,
    marginTop: 10,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
  },
  saveButton: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 30,
    width: '100%',
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  saveIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddAdminScreen;