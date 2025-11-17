import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useOrientation } from '../Utils/Responsive';
import { Colors, CommonStyles } from '../Utils/Theme';
import ConsultationCard from '../components/ConsultationCard';

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

const AgendaScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showSmallModal, setShowSmallModal] = useState(false);
  const [smallModalContent, setSmallModalContent] = useState(null);
  const { width, height } = useWindowDimensions();
  const orientation = useOrientation();
  const isLandscape = orientation === 'landscape';

  const markedDates = useMemo(() => ({
    '2025-07-05': { marked: true, dotColor: Colors.gray, activeOpacity: 0, completed: true, consultation: { id: '1', time: '10:00', pet: 'Rex', vet: 'Dr. Smith', type: 'Consulta de Rotina', status: 'completed', petImage: require('../assets/dog1.png') } }, // Consulta concluída (acinzentada)
    '2025-12-10': { selected: true, selectedColor: Colors.highlightCoral, selectedTextColor: Colors.darkHighlightPurple, consultation: { id: '2', time: '14:30', pet: 'Miau', vet: 'Dra. Johnson', type: 'Vacinação', status: 'scheduled', petImage: require('../assets/cat1.png') } }, // Exemplo de dia 10 com destaque
    '2025-10-15': { marked: true, dotColor: Colors.mediumPurple, activeOpacity: 0, consultation: { id: '3', time: '09:00', pet: 'Buddy', vet: 'Dr. Brown', type: 'Exame de Sangue', status: 'scheduled', petImage: require('../assets/dog2.png') } }, // Consulta marcada (roxo)
    '2025-11-20': { marked: true, dotColor: '#FF0000', activeOpacity: 0, consultation: { id: '4', time: '11:00', pet: 'Princesa', vet: 'Dra. White', type: 'Emergência', status: 'urgent', petImage: require('../assets/cat1.png') } }, // Consulta urgente (vermelho)
  }), []);

  const allConsultations = useMemo(() => {
    return Object.values(markedDates).map(marking => marking.consultation);
  }, [markedDates]);

  const calendarTheme = useMemo(() => ({
    backgroundColor: Colors.softLilac, // Fundo roxo/lilás suave que envolve toda a área do calendário
    calendarBackground: Colors.softLilac, // Fundo roxo/lilás suave que envolve toda a área do calendário
    textSectionTitleColor: Colors.lightHeaderPurple, // Dias da Semana: Cor roxa clara
    selectedDayBackgroundColor: Colors.highlightCoral, // Dia 10 em roxo mais escuro
    selectedDayTextColor: Colors.darkHighlightPurple,
    todayTextColor: Colors.purple,
    dayTextColor: Colors.mediumPurple, // Números dos Dias: Cor roxa predominante
    textDisabledColor: Colors.lightPurple,
    dotColor: Colors.purple,
    selectedDotColor: Colors.white,
    arrowColor: Colors.mediumPurple,
    monthTextColor: Colors.mediumPurple,
    indicatorColor: 'blue',
    textDayFontWeight: '600',
    textMonthFontWeight: '700',
    textDayHeaderFontWeight: '500',
    textDayFontSize: 14,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 12,
  }), []);

  const renderDay = (day, marking) => {
    const dayStyle = [styles.dayContainer];
    const dayTextStyle = [styles.dayText];

    if (day.dateString === '2024-07-10') {
      dayStyle.push(styles.highlightedDay);
      dayTextStyle.push(styles.highlightedDayText);
    }

    return (
      <TouchableOpacity 
        style={dayStyle}
        onPress={() => {
          // Manually trigger onDayPress for the Calendar component
          // This ensures the main onDayPress logic is executed for all days
          const dateString = day.dateString;
          const markingForDay = markedDates[dateString];
          const consultation = markingForDay?.consultation;

          setSelectedDate(dateString); // Always set selected date when a day is pressed

          if (consultation) {
            if (markingForDay.dotColor === Colors.mediumPurple) {
              // Show small modal for purple dot (scheduled)
              setSmallModalContent({
                petImage: consultation.petImage,
                time: consultation.time,
                date: day.dateString,
              });
              setShowSmallModal(true);
              setSelectedConsultation(null); // Clear detailed modal content
              setShowDetailsModal(false); // Ensure detailed modal is closed
            } else {
              // Show detailed modal for other marked dates
              setSelectedConsultation(consultation);
              setShowDetailsModal(true);
              setShowSmallModal(false); // Ensure small modal is closed
            }
          } else {
            // No consultation, close both modals
            setSelectedConsultation(null);
            setShowDetailsModal(false);
            setSmallModalContent(null);
            setShowSmallModal(false);
          }
        }}
      >
        <Text style={dayTextStyle}>{day.day}</Text>
        {marking && marking.marked && (
          <View style={[styles.dot, { backgroundColor: marking.dotColor }]} />
        )}
      </TouchableOpacity>
    );
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient colors={Colors.gradientPrimary} style={styles.headerGradient}>
        <Text style={styles.headerTitle}>Agenda</Text>
        <Text style={styles.headerSubtitle}>Visualize e gerencie suas consultas</Text>
      </LinearGradient>
      <View style={[CommonStyles.card, styles.calendarWrapper]}>
        <Calendar
          onDayPress={(day) => {
            const dateString = day.dateString;
            const markingForDay = markedDates[dateString];
            const consultation = markingForDay?.consultation;

            setSelectedDate(dateString); // Always set selected date when a day is pressed

            if (consultation) {
              if (markingForDay.dotColor === Colors.mediumPurple) {
                // Show small modal for purple dot (scheduled)
                setSmallModalContent({
                  petImage: consultation.petImage,
                  time: consultation.time,
                  date: day.dateString,
                  pet: consultation.pet,
                });
                setShowSmallModal(true);
                setSelectedConsultation(null); // Clear detailed modal content
                setShowDetailsModal(false); // Ensure detailed modal is closed
              } else {
                // Show detailed modal for other marked dates
                setSelectedConsultation(consultation);
                setShowDetailsModal(true);
                setShowSmallModal(false); // Ensure small modal is closed
              }
            } else {
              // No consultation, close both modals
              setSelectedConsultation(null);
              setShowDetailsModal(false);
              setSmallModalContent(null);
              setShowSmallModal(false);
            }
          }}
          markedDates={markedDates}
          theme={calendarTheme}
          style={styles.calendar}
          minDate={getMinDate()}
          maxDate={getMaxDate()}
          enableSwipeMonths
          firstDay={1}
          showWeekNumbers={false}
          hideExtraDays={true}
          // disableAllTouchEventsForDisabledDays={true} // Remove this line to make all days clickable
          dayComponent={({ date, marking }) => renderDay(date, marking)}
        />
      </View>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.mediumPurple }]} />
          <Text style={styles.legendText}>Agendada</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF0000' }]} />
          <Text style={styles.legendText}>Urgente</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.gray }]} />
          <Text style={styles.legendText}>Concluída</Text>
        </View>
      </View>

      {/* Small Modal for Purple Dot Consultations */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSmallModal}
        onRequestClose={() => setShowSmallModal(false)}
      >
        <TouchableOpacity
          style={styles.smallModalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowSmallModal(false)}
        >
          <View style={styles.smallModalContent}>
            {smallModalContent && (
              <>
                {smallModalContent.petImage && (
                  <Image source={smallModalContent.petImage} style={styles.smallModalPetImage} />
                )}
                <Text style={styles.modalTitle}>Consulta Agendada</Text>
                <Text style={styles.smallModalText}>Pet: {smallModalContent.pet}</Text>
                <Text style={styles.smallModalText}>Horário: {smallModalContent.time}</Text>
                <Text style={styles.smallModalText}>Data: {smallModalContent.date}</Text>
                <TouchableOpacity
                  style={styles.smallModalCloseButton}
                  onPress={() => setShowSmallModal(false)}
                >
                  <Text style={styles.smallModalCloseButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Existing Detailed Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showDetailsModal}
        onRequestClose={() => setShowDetailsModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setShowDetailsModal(false)}
        >
          <View style={styles.modalContent}>
            {selectedConsultation && (
              <> 
                {selectedConsultation.petImage && (
                  <Image 
                    source={selectedConsultation.petImage} 
                    style={styles.modalPetImage} 
                  />
                )}
                <Text style={styles.modalTitle}>Detalhes da Consulta</Text>
                {selectedConsultation.status === 'scheduled' && (
                  <Text style={[styles.modalText, styles.statusScheduled]}>
                    📅 Marcada para {selectedConsultation.pet} às {selectedConsultation.time}
                  </Text>
                )}
                {selectedConsultation.status === 'urgent' && (
                  <Text style={[styles.modalText, styles.statusUrgent]}>
                    ⚠️ Urgente para {selectedConsultation.pet} às {selectedConsultation.time}!
                  </Text>
                )}
                {selectedConsultation.status === 'completed' && (
                  <Text style={[styles.modalText, styles.statusCompleted]}>
                    ✅ Concluída para {selectedConsultation.pet} às {selectedConsultation.time}
                  </Text>
                )}
                <Text style={styles.modalText}>Veterinário: {selectedConsultation.vet}</Text>
                <Text style={styles.modalText}>Tipo: {selectedConsultation.type}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowDetailsModal(false)}
                >
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.consultationsList}>
        {allConsultations.map((consultation, index) => (
          <ConsultationCard 
            key={index} 
            consultation={consultation} 
            onPress={(consultation) => {
              setSelectedConsultation(consultation);
              setShowDetailsModal(true);
            }} 
          />
        ))}
      </View>
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('Agendamento')}>
        <LinearGradient colors={Colors.gradientPrimary} style={styles.fabGradient}>
          <FontAwesome name="calendar" size={22} color={Colors.white} />
          <Text style={styles.fabText}>Agendar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  fabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 28,
  },
  fabText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  calendarWrapper: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 0,
    padding: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.softLilac,
    // width: '100%', // Make calendar wrapper take full width
    // height: 'auto', // Adjust height automatically
  },
  calendar: {
    borderRadius: 24,
    // width: '100%', // Make calendar take full width of its wrapper
    // height: 350, // Set a fixed height for the calendar
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'left',
    width: '100%',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
  },
  dayContainer: {
    flex: 1,
    aspectRatio: 1,
    // width: 40,
    // height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white, // Células brancas
    marginHorizontal: 2,
    marginVertical: 2,
  },
  dayText: {
    color: Colors.mediumPurple, // Números roxos
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  highlightedDay: {
    backgroundColor: Colors.highlightCoral, // Fundo coral/salmão para destaque
  },
  highlightedDayText: {
    color: Colors.darkHighlightPurple, // Roxo mais escuro para destaque
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    color: Colors.mediumPurple,
    fontSize: 12,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxHeight: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  modalPetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: Colors.lightPurple,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusScheduled: {
    backgroundColor: Colors.softLilac,
    padding: 8,
    borderRadius: 4,
    color: Colors.mediumPurple,
  },
  statusUrgent: {
    backgroundColor: Colors.lightRed,
    padding: 8,
    borderRadius: 4,
    color: '#FF0000',
  },
  statusCompleted: {
    backgroundColor: Colors.lightGreen,
    padding: 8,
    borderRadius: 4,
    color: Colors.gray,
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: Colors.highlightCoral,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  smallModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  smallModalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  smallModalPetImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: Colors.lightPurple,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  smallModalText: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.mediumPurple,
    textAlign: 'center',
  },
  smallModalCloseButton: {
    marginTop: 24,
    backgroundColor: Colors.highlightCoral,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  smallModalCloseButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 12,
    color: Colors.mediumPurple,
    textAlign: 'center',
  },
  modalTextUrgent: {
    fontSize: 16,
    marginBottom: 12,
    color: '#FF0000',
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: Colors.lightRed,
    padding: 8,
    borderRadius: 4,
  },
});

export default AgendaScreen;