import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const ReportsScreen = () => {
  const navigation = useNavigation();

  const [reports, setReports] = useState([
    { id: '1', title: 'Relatório Mensal de Consultas', date: 'Outubro 2023', value: '120 consultas' },
    { id: '2', title: 'Relatório de Faturamento', date: 'Outubro 2023', value: 'R$ 15.000,00' },
    { id: '3', title: 'Relatório de Novos Clientes', date: 'Outubro 2023', value: '30 novos clientes' },
    { id: '4', title: 'Relatório de Serviços Mais Solicitados', date: 'Outubro 2023', value: 'Vacinação, Consultas de Rotina' },
  ]);

  const handleViewDetails = (reportId) => {
    alert(`Detalhes do relatório ${reportId} serão exibidos aqui!`);
  };

  const renderReportItem = ({ item }) => (
    <View style={styles.reportCard}>
      <Text style={styles.reportTitle}>{item.title}</Text>
      <Text style={styles.reportDate}>{item.date}</Text>
      <Text style={styles.reportValue}>{item.value}</Text>
      <TouchableOpacity style={styles.detailsButton} onPress={() => handleViewDetails(item.id)}>
        <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Relatórios</Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seus relatórios e estatísticas</Text>
        <FlatList
          data={reports}
          keyExtractor={item => item.id}
          renderItem={renderReportItem}
          contentContainerStyle={styles.reportList}
        />
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
  reportList: {
    paddingVertical: 10,
  },
  reportCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  reportDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  reportValue: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: '#6D52E8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ReportsScreen;