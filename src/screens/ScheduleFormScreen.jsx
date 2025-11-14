// =====================================================
// ARQUIVO 1: ScheduleFormScreen.jsx
// =====================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { MaterialIcons } from '@expo/vector-icons';

const ScheduleFormScreen = ({ navigation, route }) => {
  const { date: paramDate, time: paramTime } = route.params || {};

  const [formData, setFormData] = useState({
    pet: '',
    specialty: '',
    date: paramDate ? new Date(paramDate + 'T12:00:00') : new Date(),
    time: paramTime && paramDate ? new Date(`${paramDate}T${paramTime}`) : new Date(),
    reason: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const pets = [
    { label: 'Selecione um pet', value: '' },
    { label: 'Luna', value: 'luna' },
    { label: 'Thor', value: 'thor' },
    { label: 'Bella', value: 'bella' }
  ];

  const specialties = [
    { label: 'Selecione uma especialidade', value: '' },
    { label: 'Consulta Geral', value: 'consulta_geral' },
    { label: 'Vacinação', value: 'vacinacao' },
    { label: 'Cirurgia', value: 'cirurgia' },
    { label: 'Dermatologia', value: 'dermatologia' },
  ];

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDateTime = new Date(selectedDate);
      const currentTime = new Date(formData.time);
      newDateTime.setHours(currentTime.getHours());
      newDateTime.setMinutes(currentTime.getMinutes());
      
      setFormData(prev => ({
        ...prev,
        date: newDateTime,
        time: newDateTime
      }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDateTime = new Date(formData.date);
      const newTime = new Date(selectedTime);
      newDateTime.setHours(newTime.getHours());
      newDateTime.setMinutes(newTime.getMinutes());

      setFormData(prev => ({
        ...prev,
        date: newDateTime,
        time: newDateTime
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.pet) {
      Alert.alert('Erro', 'Selecione um pet');
      return false;
    }
    if (!formData.specialty) {
      Alert.alert('Erro', 'Selecione uma especialidade');
      return false;
    }
    if (!formData.reason.trim()) {
      Alert.alert('Erro', 'Descreva o motivo da consulta');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      const petMap = {
        luna: { id: '1', name: 'Luna', image: 'https://images.unsplash.com/photo-1560809453-57b495cce980?w=100' },
        thor: { id: '2', name: 'Thor', image: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=100' },
        bella: { id: '3', name: 'Bella', image: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=100' }
      };
      
      navigation.navigate('VeteSelectScreen', {
        appointmentData: {
          ...formData,
          pet: petMap[formData.pet] || { id: 'unknown', name: formData.pet }
        }
      });
    }
  };

  const formatDate = (date) => date.toLocaleDateString('pt-BR');
  const formatTime = (date) => date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.container}>
      <LinearGradient colors={Colors.gradientPrimary} style={styles.header}>
        <Text style={styles.headerTitle}>Detalhes da Consulta</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Pet */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="pets" size={18} color="#A367F0" />
            <Text style={styles.label}>Pet</Text>
          </View>
          <View style={[styles.pickerContainer, !formData.pet && styles.inputErrorBorder]}>
            <Picker
              selectedValue={formData.pet}
              onValueChange={(value) => handleInputChange('pet', value)}
              style={styles.picker}
            >
              {pets.map((pet) => (
                <Picker.Item key={pet.value} label={pet.label} value={pet.value} />
              ))}
            </Picker>
          </View>
          {!formData.pet && (
            <Text style={styles.errorText}>Selecione um pet</Text>
          )}
        </View>

        {/* Especialidade */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="local-hospital" size={18} color="#A367F0" />
            <Text style={styles.label}>Especialidade</Text>
          </View>
          <View style={[styles.pickerContainer, !formData.specialty && styles.inputErrorBorder]}>
            <Picker
              selectedValue={formData.specialty}
              onValueChange={(value) => handleInputChange('specialty', value)}
              style={styles.picker}
            >
              {specialties.map((spec) => (
                <Picker.Item key={spec.value} label={spec.label} value={spec.value} />
              ))}
            </Picker>
          </View>
          {!formData.specialty && (
            <Text style={styles.errorText}>Selecione uma especialidade</Text>
          )}
        </View>

        {/* Data */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="date-range" size={18} color="#A367F0" />
            <Text style={styles.label}>Data</Text>
          </View>
          <TouchableOpacity
            style={[styles.dateTimeButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons name="calendar-today" size={18} color="#A367F0" />
            <Text style={styles.dateTimeText}>{formatDate(formData.date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Hora */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="access-time" size={18} color="#A367F0" />
            <Text style={styles.label}>Hora</Text>
          </View>
          <TouchableOpacity
            style={[styles.dateTimeButton]}
            onPress={() => setShowTimePicker(true)}
          >
            <MaterialIcons name="schedule" size={18} color="#A367F0" />
            <Text style={styles.dateTimeText}>{formatTime(formData.time)}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={formData.time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* Motivo */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <MaterialIcons name="description" size={18} color="#A367F0" />
            <Text style={styles.label}>Motivo da Consulta</Text>
            <Text style={styles.charCount}>{formData.reason.length}/200</Text>
          </View>
          <TextInput
            style={[styles.textInput, !formData.reason.trim() && styles.inputErrorBorder]}
            multiline
            numberOfLines={4}
            maxLength={200}
            placeholder="Descreva o motivo da consulta..."
            placeholderTextColor="#CCC"
            value={formData.reason}
            onChangeText={(text) => handleInputChange('reason', text)}
          />
          {!formData.reason.trim() && (
            <Text style={styles.errorText}>Informe o motivo da consulta</Text>
          )}
        </View>

        {/* Botão */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient colors={Colors.gradientPrimary} style={styles.buttonGradient}>
            <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
            <Text style={styles.nextButtonText}>Próximo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { paddingHorizontal: 20, paddingTop: 50, paddingBottom: 25 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  scrollView: { flex: 1, paddingHorizontal: 16 },
  inputGroup: { marginBottom: 20, backgroundColor: '#FFF', borderRadius: 12, padding: 16 },
  labelContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  charCount: { fontSize: 11, color: '#999', marginLeft: 'auto' },
  pickerContainer: { borderWidth: 1, borderColor: '#E8E1F5', borderRadius: 10, overflow: 'hidden' },
  picker: { height: 50 },
  dateTimeButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E8E1F5', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12, gap: 10 },
  dateTimeText: { fontSize: 14, color: '#1F2937', fontWeight: '500' },
  textInput: { borderWidth: 1, borderColor: '#E8E1F5', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, minHeight: 100, textAlignVertical: 'top', fontSize: 14, color: '#1F2937' },
  inputErrorBorder: { borderColor: '#F44336' },
  errorText: { fontSize: 12, color: '#F44336', marginTop: 6 },
  nextButton: { marginHorizontal: 16, marginVertical: 20, borderRadius: 12, overflow: 'hidden' },
  buttonGradient: { paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  nextButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default ScheduleFormScreen;

// =====================================================
// ARQUIVO 2: VeteSelectScreen.jsx
// =====================================================

// Este arquivo já existe no seu projeto
// Apenas atualize os gradientes para:
// colors={['#C49DF6', '#A367F0']}
// E as cores dos botões para #A367F0

// Mudanças principais:
// - Header gradiente roxo
// - Grid 2 colunas
// - Cards com avatares circulares
// - Ratings em destaque
// - Botão próximo com gradiente roxo

// =====================================================
// ARQUIVO 3: ReviewScreen.jsx
// =====================================================

// Este arquivo já existe no seu projeto
// Atualizações:
// - Header com gradiente roxo
// - Cards separados com espaçamento
// - Informações em grid visual
// - Botão confirmar com LinearGradient
// - Modal de sucesso com cores roxas

// =====================================================
// ARQUIVO 4: SuccessScreen.jsx
// =====================================================

// Este arquivo já existe no seu projeto
// Atualizações:
// - Checkmark com cor roxa #A367F0
// - Cards de informações separados
// - Informações em grid
// - Botões de ação com cores roxas
// - Background desfocado

// Notas importantes:
// 1. Todos usam gradiente #C49DF6 → #A367F0
// 2. Botões primários: #A367F0
// 3. Borders em cards: #E8E1F5
// 4. Backgrounds secundários: #F3E5F5
