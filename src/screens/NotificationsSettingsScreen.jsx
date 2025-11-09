import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const NotificationsSettingsScreen = () => {
  const navigation = useNavigation();
  const [appointmentReminders, setAppointmentReminders] = useState(false);
  const [newAppointments, setNewAppointments] = useState(false);
  const [cancellations, setCancellations] = useState(false);
  const [chatMessages, setChatMessages] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(false);
  const [weeklySummaryEmail, setWeeklySummaryEmail] = useState(false);
  const [monthlyReportsEmail, setMonthlyReportsEmail] = useState(false);

  const handleSave = () => {
    // Logic to save notification settings (e.g., to AsyncStorage or API)
    Alert.alert('Sucesso', 'Configurações de notificação salvas!');
    // In a real app, you would save the state here
    console.log('Notification settings saved:', {
      appointmentReminders,
      newAppointments,
      cancellations,
      chatMessages,
      systemUpdates,
      weeklySummaryEmail,
      monthlyReportsEmail,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações no Aplicativo</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Lembretes de Agendamentos</Text>
          <Switch
            onValueChange={setAppointmentReminders}
            value={appointmentReminders}
            thumbColor={'#FFF'}
            trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Novos Agendamentos</Text>
          <Switch
            onValueChange={setNewAppointments}
            value={newAppointments}
            thumbColor={'#FFF'}
            trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Cancelamentos</Text>
          <Switch
            onValueChange={setCancellations}
            value={cancellations}
            thumbColor={'#FFF'}
            trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Mensagens de Chat</Text>
          <Switch
            onValueChange={setChatMessages}
            value={chatMessages}
            thumbColor={'#FFF'}
            trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Atualizações do Sistema</Text>
          <Switch
            onValueChange={setSystemUpdates}
            value={systemUpdates}
            thumbColor={'#FFF'}
            trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificações por Email</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Resumo Semanal</Text>
          <Switch
            onValueChange={setWeeklySummaryEmail}
            value={weeklySummaryEmail}
            thumbColor={'#FFF'}
            trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Relatórios Mensais</Text>
          <Switch
            onValueChange={setMonthlyReportsEmail}
            value={monthlyReportsEmail}
            thumbColor={'#FFF'}
            trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingText: {
    fontSize: 16,
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#A367F0',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NotificationsSettingsScreen;