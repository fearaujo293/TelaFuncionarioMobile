import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, RefreshControl, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const [scheduledAppointments, setScheduledAppointments] = useState(0);
  const [attendedPets, setAttendedPets] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]); // State for upcoming appointments

  // Animation for skeleton loader
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    startAnimation();
    loadSummaryData();
  }, []);

  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  const loadSummaryData = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const appointments = await AsyncStorage.getItem('scheduledAppointments');
      const pets = await AsyncStorage.getItem('attendedPets');

      setScheduledAppointments(appointments ? parseInt(appointments) : 5);
      setAttendedPets(pets ? parseInt(pets) : 3);

      // Mock upcoming appointments data
      const mockAppointments = [
        { time: '10:00 AM', details: 'Rex - Golden Retriever (Dono: João)' },
        { time: '11:30 AM', details: 'Miau - Gato Persa (Dono: Maria)' },
        { time: '13:00 PM', details: 'Thor - Bulldog Francês (Dono: Pedro)' },
        { time: '14:30 PM', details: 'Luna - Labrador (Dono: Ana)' },
        { time: '16:00 PM', details: 'Bob - Poodle (Dono: Carlos)' },
      ];
      setUpcomingAppointments(mockAppointments);

    } catch (error) {
      console.error('Error loading summary data:', error);
      setScheduledAppointments(5);
      setAttendedPets(3);
      setUpcomingAppointments([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    loadSummaryData();
  };

  const handleViewAllAppointments = () => {
    navigation.navigate('AllAppointmentsScreen');
  };

  const handleNewAppointment = () => {
    navigation.navigate('NewAppointmentScreen');
  };

  const handleViewClients = () => {
    navigation.navigate('UserListScreen'); // Navigate to UserListScreen
  };

  const handleChat = () => {
    navigation.navigate('EmployeeChatTab', { screen: 'AdminChat' });
  };

  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 1, 0.5],
  });

  const SkeletonLoader = () => (
    <Animated.View style={[styles.skeletonItem, { opacity }]}>
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, { width: '60%' }]} />
    </Animated.View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
          tintColor={Colors.primary}
        />
      }
    >
      <Text style={styles.header}>Dashboard do Funcionário</Text>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Resumo do Dia</Text>
        {isLoading ? (
          <View>
            <SkeletonLoader />
            <SkeletonLoader />
          </View>
        ) : (
          scheduledAppointments > 0 || attendedPets > 0 ? (
            <>
              <View style={styles.summaryItem}>
                <FontAwesome name="calendar-check-o" size={20} color={Colors.primary} />
                <Text style={styles.summaryText}>Consultas Agendadas: {scheduledAppointments}</Text>
              </View>
              <View style={styles.summaryItem}>
                <FontAwesome name="paw" size={20} color={Colors.secondary} />
                <Text style={styles.summaryText}>Pets Atendidos: {attendedPets}</Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyStateContainer}>
              <FontAwesome name="info-circle" size={50} color={Colors.gray} />
              <Text style={styles.emptyStateText}>Nenhum resumo de atividades para hoje.</Text>
            </View>
          )
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Próximas Consultas</Text>
        {isLoading ? (
          <View>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </View>
        ) : (
          upcomingAppointments.length > 0 ? (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.appointmentsScrollView}>
              {upcomingAppointments.map((appointment, index) => (
                <View key={index} style={styles.appointmentItem}>
                  <Text style={styles.appointmentTime}>{appointment.time}</Text>
                  <Text style={styles.appointmentDetails}>{appointment.details}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyStateContainer}>
              <FontAwesome name="calendar-o" size={50} color={Colors.gray} />
              <Text style={styles.emptyStateText}>Nenhuma consulta agendada para hoje.</Text>
            </View>
          )
        )}
        <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllAppointments}>
          <Text style={styles.viewAllButtonText}>Ver Todas as Consultas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton} onPress={handleNewAppointment} activeOpacity={0.7}>
            <FontAwesome name="plus-circle" size={30} color={Colors.primary} />
            <Text style={styles.quickActionButtonText}>Nova Consulta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton} onPress={handleViewClients} activeOpacity={0.7}>
            <FontAwesome name="users" size={30} color={Colors.secondary} />
            <Text style={styles.quickActionButtonText}>Ver Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton} onPress={handleChat} activeOpacity={0.7}>
            <FontAwesome name="comments" size={30} color={Colors.accent} />
            <Text style={styles.quickActionButtonText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 25,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    elevation: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: Colors.darkGray,
    marginLeft: 10,
  },
  appointmentsScrollView: {
    maxHeight: 150,
    marginBottom: 10,
  },
  appointmentItem: {
    backgroundColor: Colors.lightBackground,
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 250,
    justifyContent: 'center',
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 5,
  },
  appointmentDetails: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  viewAllButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  viewAllButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  quickActionButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    width: '30%',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickActionButtonText: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  skeletonItem: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    marginBottom: 10,
    height: 20,
    width: '100%',
  },
  skeletonLine: {
    backgroundColor: Colors.gray,
    height: 10,
    borderRadius: 4,
    marginVertical: 5,
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.darkGray,
    marginTop: 10,
  },
});

export default AdminDashboardScreen;