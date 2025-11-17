import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { MaterialIcons } from '@expo/vector-icons';

const EmployeeServiceDetailsScreen = ({ route, navigation }) => {
  const { service } = route.params || {};
  const [available, setAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState('detalhes');

  const todayAppointments = useMemo(() => (
    [
      { id: 'a1', pet: 'Rex', time: '10:00', status: 'confirmado' },
      { id: 'a2', pet: 'Miau', time: '14:30', status: 'pendente' },
    ]
  ), []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <LinearGradient colors={Colors.gradientPrimary} style={styles.headerGradient}>
        <View style={styles.headerRow}>
          <View style={styles.serviceIconContainer}>
            <MaterialIcons name={service?.icon || 'build'} size={28} color={Colors.primary} />
          </View>
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle}>{service?.name || 'Serviço'}</Text>
            <Text style={styles.headerSubtitle}>{service?.description || 'Detalhes do serviço'}</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerChip, available && styles.headerChipActive]} onPress={() => setAvailable(!available)}>
            <Text style={[styles.headerChipText, available && styles.headerChipTextActive]}>{available ? 'Disponível' : 'Indisponível'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerActionBtn} onPress={() => navigation.navigate('AgendamentoScreen')}>
            <Text style={styles.headerActionBtnText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.tabsRow}>
        <TouchableOpacity style={[styles.tabBtn, activeTab === 'detalhes' && styles.tabBtnActive]} onPress={() => setActiveTab('detalhes')}>
          <Text style={[styles.tabText, activeTab === 'detalhes' && styles.tabTextActive]}>Detalhes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBtn, activeTab === 'agenda' && styles.tabBtnActive]} onPress={() => setActiveTab('agenda')}>
          <Text style={[styles.tabText, activeTab === 'agenda' && styles.tabTextActive]}>Agenda</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'detalhes' && (
        <View>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{service?.count || 0}</Text>
              <Text style={styles.metricLabel}>Hoje</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{service?.nextTime || '--:--'}</Text>
              <Text style={styles.metricLabel}>Próximo</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{service?.duration || '30 min'}</Text>
              <Text style={styles.metricLabel}>Duração</Text>
            </View>
          </View>

          <View style={styles.infoCard}> 
            <Text style={styles.infoTitle}>Configuração</Text>
            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Duração padrão</Text>
              <View style={styles.configValueRow}>
                <Text style={styles.configValue}>{service?.duration || '30 min'}</Text>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.configRow}>
              <Text style={styles.configLabel}>Preço</Text>
              <View style={styles.configValueRow}>
                <Text style={styles.configValue}>{service?.price || '—'}</Text>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.actionsRow}> 
              <TouchableOpacity style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Salvar alterações</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {activeTab === 'agenda' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consultas hoje</Text>
          {todayAppointments.map((a) => (
            <View key={a.id} style={styles.appointmentItem}>
              <View style={styles.appointmentLeft}>
                <MaterialIcons name="pets" size={20} color={Colors.primary} />
                <Text style={styles.appointmentPet}>{a.pet}</Text>
              </View>
              <View style={styles.appointmentRight}>
                <Text style={styles.appointmentTime}>{a.time}</Text>
                <View style={[styles.badge, a.status === 'confirmado' ? styles.badgeConfirmed : styles.badgePending]}>
                  <Text style={styles.badgeText}>{a.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 20 },
  headerGradient: { paddingTop: 50, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  serviceIconContainer: { width: 52, height: 52, borderRadius: 14, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  headerTextCol: { flexDirection: 'column' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: Colors.white },
  headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  headerActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  headerChip: { backgroundColor: Colors.white, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: Colors.lightGrayBorder },
  headerChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  headerChipText: { color: Colors.darkGray, fontWeight: '600' },
  headerChipTextActive: { color: Colors.white },
  headerActionBtn: { backgroundColor: Colors.white, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8 },
  headerActionBtnText: { color: Colors.darkGray, fontWeight: '700' },
  tabsRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, paddingHorizontal: 16, marginTop: 12 },
  tabBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.lightGrayBorder },
  tabBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { color: Colors.darkGray, fontWeight: '600' },
  tabTextActive: { color: Colors.white },
  metricsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: 16 },
  metricCard: { flex: 1, backgroundColor: Colors.white, borderRadius: 12, padding: 16, elevation: 2, shadowColor: Colors.purple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  metricNumber: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  metricLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
  infoCard: { backgroundColor: Colors.white, borderRadius: 14, padding: 16, marginHorizontal: 16, marginTop: 16, elevation: 3, shadowColor: Colors.purple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 4 },
  infoTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  primaryBtn: { flex: 1, backgroundColor: Colors.primary, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  primaryBtnText: { color: Colors.white, fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#f3f4f6', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8 },
  secondaryBtnText: { color: '#6B7280', fontWeight: '600' },
  section: { marginHorizontal: 16, marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  appointmentItem: { backgroundColor: Colors.white, borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, elevation: 2, shadowColor: Colors.purple, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 2 },
  appointmentLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appointmentPet: { fontSize: 14, color: '#1F2937', fontWeight: '600' },
  appointmentRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  appointmentTime: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  badge: { borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6 },
  badgeConfirmed: { backgroundColor: '#E6F4EA' },
  badgePending: { backgroundColor: '#FFE0B2' },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#374151' },
  configRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  configLabel: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  configValueRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  configValue: { fontSize: 14, color: '#1F2937', fontWeight: '600' },
});

export default EmployeeServiceDetailsScreen;
