import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TimeOptionCard } from '../components/TimeOptionCard';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function AgendamentoScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('todos');

  const timeOptions = useMemo(() => [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00',
  ], []);

  const selectedDateDots = useMemo(() => {
    const hasMorning = timeOptions.some(t => parseInt(t.split(':')[0], 10) < 12);
    const hasAfternoon = timeOptions.some(t => parseInt(t.split(':')[0], 10) >= 12);
    const dots = [];
    if (hasMorning) dots.push({ key: 'manha', color: '#A367F0' });
    if (hasAfternoon) dots.push({ key: 'tarde', color: '#03DAC6' });
    return dots;
  }, [timeOptions]);

  const handleDateChange = useCallback((day) => {
    setSelectedDate(day.dateString);
    setShowTimeSelection(true);
    setSelectedTime(null);
  }, []);

  const handleTimeOptionSelect = useCallback((time) => {
    setSelectedTime(time);
  }, []);

  const handleConfirmSchedule = useCallback(() => {
    if (!selectedDate) {
      Alert.alert('Data não selecionada', 'Selecione uma data para continuar');
      return;
    }
    if (!selectedTime) {
      Alert.alert('Horário não selecionado', 'Selecione um horário para continuar');
      return;
    }

    navigation.navigate('ScheduleFormScreen', {
      date: selectedDate,
      time: selectedTime,
      fullDateTime: `${selectedDate} ${selectedTime}`,
    });
  }, [selectedDate, selectedTime, navigation]);

  const calendarTheme = useMemo(() => ({
    backgroundColor: '#F3E5F5',
    calendarBackground: '#FFFFFF',
    textSectionTitleColor: '#A367F0',
    selectedDayBackgroundColor: '#A367F0',
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#A367F0',
    dayTextColor: '#333333',
    textDisabledColor: '#D1C4E9',
    dotColor: '#A367F0',
    selectedDotColor: '#FFFFFF',
    arrowColor: '#A367F0',
    monthTextColor: '#A367F0',
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 12,
  }), []);

  const markedDates = useMemo(() => ({
    [selectedDate]: { 
      selected: true, 
      selectedColor: '#A367F0',
      selectedTextColor: '#FFFFFF',
      dots: selectedDate ? selectedDateDots : [],
    },
  }), [selectedDate, selectedDateDots]);

  const filteredTimes = useMemo(() => {
    if (selectedPeriod === 'manha') {
      return timeOptions.filter(t => parseInt(t.split(':')[0], 10) < 12);
    }
    if (selectedPeriod === 'tarde') {
      return timeOptions.filter(t => parseInt(t.split(':')[0], 10) >= 12);
    }
    return timeOptions;
  }, [selectedPeriod, timeOptions]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Agendar Consulta</Text>
        <Text style={styles.headerSubtitle}>Escolha data e horário</Text>
      </LinearGradient>

      {/* Step Indicator */}
      <View style={styles.stepContainer}>
        <View style={[styles.step, styles.activeStep]}>
          <LinearGradient colors={Colors.gradientPrimary} style={styles.stepNumberBox}>
            <Text style={[styles.stepNumber, styles.stepNumberActive]}>1</Text>
          </LinearGradient>
          <Text style={styles.stepLabel}>Data</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={[styles.step, showTimeSelection && styles.activeStep]}>
          {showTimeSelection ? (
            <LinearGradient colors={Colors.gradientPrimary} style={styles.stepNumberBox}>
              <Text style={[styles.stepNumber, styles.stepNumberActive]}>2</Text>
            </LinearGradient>
          ) : (
            <View style={styles.stepNumberBox}>
              <Text style={styles.stepNumber}>2</Text>
            </View>
          )}
          <Text style={styles.stepLabel}>Horário</Text>
        </View>
        <View style={styles.stepLine} />
        <View style={styles.step}>
          <View style={styles.stepNumberBox}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepLabel}>Detalhes</Text>
        </View>
      </View>

      {/* Seção de Data */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="calendar-today" size={32} color="#A367F0" />
          <Text style={styles.sectionTitle}>Selecione a Data</Text>
        </View>

        <View style={styles.calendarWrapper}>
          <Calendar
            onDayPress={handleDateChange}
            markedDates={markedDates}
            theme={calendarTheme}
            markingType="multi-dot"
            minDate={new Date().toISOString().split('T')[0]}
            maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split('T')[0]}
            enableSwipeMonths
            firstDay={1}
            renderArrow={(direction) => (
              <MaterialIcons
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                size={24}
                color="#A367F0"
              />
            )}
          />
        </View>
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#A367F0' }]} />
            <Text style={styles.legendText}>Manhã</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#03DAC6' }]} />
            <Text style={styles.legendText}>Tarde</Text>
          </View>
        </View>
      </View>

      {/* Seção de Horário */}
      {showTimeSelection && selectedDate && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="access-time" size={28} color="#10B981" />
            <Text style={styles.sectionTitle}>Selecione o Horário</Text>
          </View>

          <View style={styles.periodChipsRow}>
            <TouchableOpacity onPress={() => setSelectedPeriod('todos')} style={[styles.periodChipWrapper, selectedPeriod === 'todos' && styles.periodChipActiveWrapper]}>
              {selectedPeriod === 'todos' ? (
                <LinearGradient colors={Colors.gradientPrimary} style={styles.periodChipGradient}>
                  <Text style={styles.periodChipTextActive}>Todos</Text>
                </LinearGradient>
              ) : (
                <View style={styles.periodChipOutline}>
                  <Text style={styles.periodChipText}>Todos</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedPeriod('manha')} style={[styles.periodChipWrapper, selectedPeriod === 'manha' && styles.periodChipActiveWrapper]}>
              {selectedPeriod === 'manha' ? (
                <LinearGradient colors={Colors.gradientPrimary} style={styles.periodChipGradient}>
                  <Text style={styles.periodChipTextActive}>Manhã</Text>
                </LinearGradient>
              ) : (
                <View style={styles.periodChipOutline}>
                  <Text style={styles.periodChipText}>Manhã</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedPeriod('tarde')} style={[styles.periodChipWrapper, selectedPeriod === 'tarde' && styles.periodChipActiveWrapper]}>
              {selectedPeriod === 'tarde' ? (
                <LinearGradient colors={Colors.gradientPrimary} style={styles.periodChipGradient}>
                  <Text style={styles.periodChipTextActive}>Tarde</Text>
                </LinearGradient>
              ) : (
                <View style={styles.periodChipOutline}>
                  <Text style={styles.periodChipText}>Tarde</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.timeGrid}>
            {filteredTimes.map((time) => (
              <TimeOptionCard
                key={time}
                time={time}
                isSelected={selectedTime === time}
                onSelect={handleTimeOptionSelect}
              />
            ))}
          </View>
        </View>
      )}

      {/* Resumo */}
      {(selectedDate || selectedTime) && (
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>📋 Resumo</Text>
          {selectedDate && (
            <View style={styles.summaryItem}>
              <MaterialIcons name="date-range" size={18} color="#A367F0" />
              <Text style={styles.summaryText}>
                {new Date(selectedDate + 'T12:00:00').toLocaleDateString(
                  'pt-BR',
                  { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </Text>
            </View>
          )}
          {selectedTime && (
            <View style={styles.summaryItem}>
              <MaterialIcons name="access-time" size={18} color="#10B981" />
              <Text style={styles.summaryText}>{selectedTime}</Text>
            </View>
          )}
        </View>
      )}

      {/* Botão Confirmar */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          (!selectedDate || !selectedTime) && styles.disabledButton,
        ]}
        onPress={handleConfirmSchedule}
        disabled={!selectedDate || !selectedTime}
      >
        <LinearGradient
          colors={
            selectedDate && selectedTime
              ? Colors.gradientPrimary
              : ['#D1C4E9', '#B39DDB']
          }
          style={styles.buttonGradient}
        >
          <MaterialIcons name="arrow-forward" size={24} color="#FFF" />
          <Text style={styles.confirmButtonText}>Próximo</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
  },
  step: {
    alignItems: 'center',
    gap: 6,
    opacity: 0.5,
  },
  activeStep: {
    opacity: 1,
  },
  stepNumberBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E1F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberBoxActive: {
    backgroundColor: '#A367F0',
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A367F0',
  },
  stepNumberActive: {
    color: '#FFF',
  },
  stepLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '600',
  },
  stepLine: {
    width: 30,
    height: 2,
    backgroundColor: '#E8E1F5',
    marginHorizontal: 8,
  },
  section: {
    backgroundColor: '#FFF',
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  calendarWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E8E1F5',
    borderLeftWidth: 4,
    borderLeftColor: '#A367F0',
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  periodChipsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  periodChipWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  periodChipActiveWrapper: {},
  periodChipGradient: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  periodChipOutline: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E1F5',
    alignItems: 'center',
  },
  periodChipText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  periodChipTextActive: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '700',
  },
  timeButton: {
    flex: 1,
    minWidth: '30%',
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F3E5F5',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  selectedTimeButton: {
    backgroundColor: '#A367F0',
    borderColor: '#A367F0',
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A367F0',
  },
  selectedTimeButtonText: {
    color: '#FFF',
  },
  summarySection: {
    backgroundColor: '#FFF',
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#A367F0',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#A367F0',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  confirmButton: {
    marginHorizontal: 12,
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonGradient: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
