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

      <View style={styles.filtersRow}> 
        {['Hoje','Esta Semana','Este Mês'].map((label, idx) => (
          <TouchableOpacity key={label} style={[styles.filterChip, idx === 0 && styles.filterChipActive]}> 
            <Text style={[styles.filterChipText, idx === 0 && styles.filterChipTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório de Consultas</Text>
        <Text style={styles.reportDescription}>Visão geral das consultas agendadas, concluídas e canceladas.</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Consultas')}>
            <Text style={styles.buttonText}>Ver Relatório</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton} onPress={() => console.log('Exportar Consultas PDF')}>
            <Text style={styles.exportButtonText}>PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButtonOutline} onPress={() => console.log('Exportar Consultas CSV')}>
            <Text style={styles.exportButtonOutlineText}>CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório de Clientes</Text>
        <Text style={styles.reportDescription}>Informações sobre novos clientes, clientes ativos e inativos.</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Clientes')}>
            <Text style={styles.buttonText}>Ver Relatório</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton} onPress={() => console.log('Exportar Clientes PDF')}>
            <Text style={styles.exportButtonText}>PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButtonOutline} onPress={() => console.log('Exportar Clientes CSV')}>
            <Text style={styles.exportButtonOutlineText}>CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório de Funcionários</Text>
        <Text style={styles.reportDescription}>Desempenho e atividades dos funcionários.</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Funcionários')}>
            <Text style={styles.buttonText}>Ver Relatório</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton} onPress={() => console.log('Exportar Funcionários PDF')}>
            <Text style={styles.exportButtonText}>PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButtonOutline} onPress={() => console.log('Exportar Funcionários CSV')}>
            <Text style={styles.exportButtonOutlineText}>CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Relatório Financeiro</Text>
        <Text style={styles.reportDescription}>Receitas, despesas e lucros.</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.viewReportButton} onPress={() => handleViewReport('Financeiro')}>
            <Text style={styles.buttonText}>Ver Relatório</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton} onPress={() => console.log('Exportar Financeiro PDF')}>
            <Text style={styles.exportButtonText}>PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButtonOutline} onPress={() => console.log('Exportar Financeiro CSV')}>
            <Text style={styles.exportButtonOutlineText}>CSV</Text>
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
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  filterChip: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.lightGrayBorder,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    color: Colors.darkGray,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: Colors.white,
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
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  exportButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  exportButtonText: {
    color: Colors.black,
    fontWeight: '700',
  },
  exportButtonOutline: {
    borderWidth: 1,
    borderColor: Colors.lightGrayBorder,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  exportButtonOutlineText: {
    color: Colors.darkGray,
    fontWeight: '600',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Geologica_500Medium',
    fontSize: 16,
  },
});

export default AdminReportsScreen;