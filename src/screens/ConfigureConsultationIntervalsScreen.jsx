import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const ConfigureConsultationIntervalsScreen = () => {
  const navigation = useNavigation();

  const [selectedInterval, setSelectedInterval] = useState('30'); // Default to 30 minutes
  const intervals = ['15', '30', '45', '60'];

  const handleSaveInterval = () => {
    Alert.alert('Intervalo Salvo', `O intervalo de consulta foi configurado para ${selectedInterval} minutos.`);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Intervalos de Consulta</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selecione o intervalo padrão para suas consultas:</Text>
        <View style={styles.intervalContainer}>
          {intervals.map((interval) => (
            <TouchableOpacity
              key={interval}
              style={[
                styles.intervalButton,
                selectedInterval === interval && styles.selectedIntervalButton,
              ]}
              onPress={() => setSelectedInterval(interval)}
            >
              <Text
                style={[
                  styles.intervalButtonText,
                  selectedInterval === interval && styles.selectedIntervalButtonText,
                ]}
              >
                {interval} min
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveInterval}>
          <Text style={styles.saveButtonText}>Salvar Intervalo</Text>
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
  intervalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  intervalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A367F0',
  },
  selectedIntervalButton: {
    backgroundColor: '#A367F0',
  },
  intervalButtonText: {
    color: '#A367F0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedIntervalButtonText: {
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#6D52E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ConfigureConsultationIntervalsScreen;