import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../Utils/Theme';

const WorkHoursScreen = () => {
  const [workHours, setWorkHours] = useState({
    monday: { active: false, start: new Date(), end: new Date() },
    tuesday: { active: false, start: new Date(), end: new Date() },
    wednesday: { active: false, start: new Date(), end: new Date() },
    thursday: { active: false, start: new Date(), end: new Date() },
    friday: { active: false, start: new Date(), end: new Date() },
    saturday: { active: false, start: new Date(), end: new Date() },
    sunday: { active: false, start: new Date(), end: new Date() },
  });

  const [holidays, setHolidays] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);
  const [pickerMode, setPickerMode] = useState('time');
  const [isStartTime, setIsStartTime] = useState(true);

  useEffect(() => {
    loadWorkHours();
    loadHolidays();
  }, []);

  useEffect(() => {
    saveWorkHours();
  }, [workHours]);

  useEffect(() => {
    saveHolidays();
  }, [holidays]);

  const saveWorkHours = async () => {
    try {
      const jsonValue = JSON.stringify(workHours, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      await AsyncStorage.setItem('@WorkHours', jsonValue);
    } catch (e) {
      console.error('Failed to save work hours', e);
    }
  };

  const loadWorkHours = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@WorkHours');
      if (jsonValue != null) {
        const storedWorkHours = JSON.parse(jsonValue, (key, value) => {
          if (key === 'start' || key === 'end') {
            return new Date(value);
          }
          return value;
        });
        setWorkHours(storedWorkHours);
      }
    } catch (e) {
      console.error('Failed to load work hours', e);
    }
  };

  const saveHolidays = async () => {
    try {
      const jsonValue = JSON.stringify(holidays);
      await AsyncStorage.setItem('@Holidays', jsonValue);
    } catch (e) {
      console.error('Failed to save holidays', e);
    }
  };

  const loadHolidays = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Holidays');
      if (jsonValue != null) {
        setHolidays(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load holidays', e);
    }
  };

  const daysOfWeek = [
    { key: 'monday', name: 'Segunda-feira' },
    { key: 'tuesday', name: 'Terça-feira' },
    { key: 'wednesday', name: 'Quarta-feira' },
    { key: 'thursday', name: 'Quinta-feira' },
    { key: 'friday', name: 'Sexta-feira' },
    { key: 'saturday', name: 'Sábado' },
    { key: 'sunday', name: 'Domingo' },
  ];

  const handleToggleDay = (dayKey) => {
    setWorkHours((prevHours) => ({
      ...prevHours,
      [dayKey]: { ...prevHours[dayKey], active: !prevHours[dayKey].active },
    }));
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setWorkHours((prevHours) => ({
        ...prevHours,
        [currentDay]: {
          ...prevHours[currentDay],
          [isStartTime ? 'start' : 'end']: selectedDate,
        },
      }));
    }
  };

  const showTimePicker = (dayKey, isStart) => {
    setCurrentDay(dayKey);
    setIsStartTime(isStart);
    setPickerMode('time');
    setShowDatePicker(true);
  };

  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleAddHoliday = (text) => {
    const [dateStr, ...descriptionParts] = text.split(' ');
    const description = descriptionParts.join(' ');
    if (dateStr && description) {
      // Basic date validation (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        Alert.alert('Erro', 'Formato de data inválido. Use YYYY-MM-DD.');
        return;
      }
      setHolidays((prevHolidays) => [...prevHolidays, { date: dateStr, description }]);
    } else {
      Alert.alert('Erro', 'Formato inválido. Use YYYY-MM-DD Descrição do feriado.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Horário de Trabalho</Text>

      {daysOfWeek.map((day) => (
        <View key={day.key} style={styles.dayContainer}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayName}>{day.name}</Text>
            <Switch
              trackColor={{ false: Colors.lightGray, true: Colors.primary }}
              thumbColor={workHours[day.key].active ? Colors.white : Colors.white}
              onValueChange={() => handleToggleDay(day.key)}
              value={workHours[day.key].active}
            />
          </View>
          {workHours[day.key].active && (
            <View style={styles.timeSelectors}>
              <TouchableOpacity onPress={() => showTimePicker(day.key, true)} style={styles.timeButton}>
                <Text style={styles.timeButtonText}>Início: {formatTime(workHours[day.key].start)}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showTimePicker(day.key, false)} style={styles.timeButton}>
                <Text style={styles.timeButtonText}>Fim: {formatTime(workHours[day.key].end)}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}

      {showDatePicker && (
        <DateTimePicker
          value={isStartTime ? workHours[currentDay].start : workHours[currentDay].end}
          mode={pickerMode}
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text style={styles.sectionTitle}>Feriados</Text>
      {holidays.map((holiday, index) => (
        <View key={index} style={styles.holidayItem}>
          <Text style={styles.holidayText}>{holiday.date} - {holiday.description}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={() => Alert.prompt(
        'Adicionar Feriado',
        'Digite a data (YYYY-MM-DD) e a descrição do feriado:',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Adicionar', onPress: handleAddHoliday },
        ],
        'plain-text'
      )}>
        <Text style={styles.buttonText}>Adicionar Feriado</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Geologica_600SemiBold',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 15,
  },
  dayContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayName: {
    fontSize: 16,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
  },
  timeSelectors: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  timeButton: {
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 5,
  },
  timeButtonText: {
    fontSize: 14,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textPrimary,
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Geologica_700Bold',
  },
  holidayItem: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  holidayText: {
    fontSize: 16,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
  },
});

export default WorkHoursScreen;