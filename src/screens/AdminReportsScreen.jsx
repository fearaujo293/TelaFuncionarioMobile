import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';

const AdminReportsScreen = () => {
  const handleViewReport = (reportType) => {
    console.log(`Ver relatório de: ${reportType}`);
    // Aqui você pode adicionar a lógica para navegar para a tela de detalhes do relatório
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Relatórios Administrativos</Text>
        <Text style={styles.headerSubtitle}>Visualize e gerencie os relatórios</Text>
      </LinearGradient>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório de Consultas</Text>
        <Text style={styles.reportDescription}>Visão geral das consultas agendadas, concluídas e canceladas.</Text>
        <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Consultas')}>
          <Text style={styles.buttonText}>Ver Relatório</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório de Clientes</Text>
        <Text style={styles.reportDescription}>Informações sobre novos clientes, clientes ativos e inativos.</Text>
        <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Clientes')}>
          <Text style={styles.buttonText}>Ver Relatório</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório de Funcionários</Text>
        <Text style={styles.reportDescription}>Desempenho e atividades dos funcionários.</Text>
        <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Funcionários')}>
          <Text style={styles.buttonText}>Ver Relatório</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório Financeiro</Text>
        <Text style={styles.reportDescription}>Receitas, despesas e lucros.</Text>
        <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Financeiro')}>
          <Text style={styles.buttonText}>Ver Relatório</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },
  reportCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reportTitle: {
    fontSize: 20,
    fontFamily: 'Geologica_600SemiBold',
    color: Colors.text,
    marginBottom: 5,
  },
  reportDescription: {
    fontSize: 16,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
    marginBottom: 10,
  },
  viewReportButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    zIndex: 1,
    width: '100%',
    flex: 1,
    height: 40,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Geologica_500Medium',
    fontSize: 16,
  },
});

export default AdminReportsScreen;