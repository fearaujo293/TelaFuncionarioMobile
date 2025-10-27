import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewAppointmentScreen = () => {
  const navigation = useNavigation();

  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleSaveAppointment = () => {
    if (!petName || !ownerName || !appointmentType || !date || !time) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Tenta parsear a data e hora
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    // Cria um objeto Date (mês é 0-indexado)
    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);

    if (isNaN(appointmentDateTime.getTime())) {
      Alert.alert('Erro', 'Formato de data ou hora inválido. Use DD/MM/AAAA e HH:MM.');
      return;
    }

    const formattedDate = appointmentDateTime.toLocaleDateString('pt-BR');
    const formattedTime = appointmentDateTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    Alert.alert(
      'Agendamento Salvo',
      `Consulta para ${petName} (Dono: ${ownerName}) de ${appointmentType} agendada para ${formattedDate} às ${formattedTime}.`,
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nova Consulta</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do Pet:</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="paw" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: Rex"
            value={petName}
            onChangeText={setPetName}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome do Dono:</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: João Silva"
            value={ownerName}
            onChangeText={setOwnerName}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tipo de Consulta:</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="stethoscope" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ex: Vacinação, Rotina, Cirurgia"
            value={appointmentType}
            onChangeText={setAppointmentType}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Data da Consulta:</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hora da Consulta:</Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="clock-o" size={20} color={Colors.gray} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            value={time}
            onChangeText={setTime}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAppointment}>
        <Text style={styles.saveButtonText}>Salvar Agendamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
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
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 17,
    color: Colors.darkGray,
    marginBottom: 5,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 15,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  cancelButtonText: {
    color: Colors.darkGray,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewAppointmentScreen;