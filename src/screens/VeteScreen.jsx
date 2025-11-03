import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Colors, CommonStyles } from '../Utils/Theme';
import ConsultationCard from '../components/ConsultationCard';
import { consultationsData } from '../data/consultations';
import { format, parse } from 'date-fns';

const VeteScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Agendada');

// ... (imports)

const VeteScreen = ({ navigation }) => {
  // ... (state)

  const handleCardPress = (consulta) => {
    const date = parse(consulta.data, 'HH:mm | dd/MM/yyyy', new Date());
    const formattedDate = format(date, 'yyyy-MM-dd');
    navigation.navigate('DetalhesConsulta', { consulta: { ...consulta, data: formattedDate } });
  };

  const renderContent = () => {
    const currentConsultas = consultasData[activeTab] || [];
    
    return (
      <ScrollView style={styles.container}>
        {currentConsultas.map((consulta) => (
          <ConsultationCard 
            key={consulta.id} 
            consultation={consulta} 
            onPress={() => handleCardPress(consulta)} 
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Agendada' && styles.activeTab]}
          onPress={() => setActiveTab('Agendada')}
        >
          <Text style={[styles.tabText, activeTab === 'Agendada' && styles.activeTabText]}>Agendada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Andamento' && styles.activeTab]}
          onPress={() => setActiveTab('Andamento')}
        >
          <Text style={[styles.tabText, activeTab === 'Andamento' && styles.activeTabText]}>Andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Concluídas' && styles.activeTab]}
          onPress={() => setActiveTab('Concluídas')}
        >
          <Text style={[styles.tabText, activeTab === 'Concluídas' && styles.activeTabText]}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>{renderContent()}</ScrollView>

      <TouchableOpacity style={styles.scheduleButton} onPress={() => navigation.navigate('Agendamento')}>
        <Text style={styles.scheduleButtonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
  },
  activeTab: {
    backgroundColor: Colors.darkPurple,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.mediumPurple,
  },
  activeTabText: {
    color: Colors.white,
  },
  contentContainer: {
    flex: 1,
  },
  scheduleButton: {
    ...CommonStyles.button,
    height: 44,
    width: '80%',
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  scheduleButtonText: {
    ...CommonStyles.buttonText,
  },
});
}
export default VeteScreen;