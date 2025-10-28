import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Animated,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors, CommonStyles } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    scheduledAppointments: 12,
    attendedPets: 8,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const handleNavigate = (screenName, params = {}) => {
    navigation.navigate(screenName, params);
  };

  const ActionButton = ({ icon, label, onPress, color = Colors.primary }) => (
    <TouchableOpacity 
      style={styles.actionButton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.actionButtonGradient}
      >
        <MaterialIcons name={icon} size={28} color={Colors.primary} />
        <Text style={styles.actionButtonText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
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
      {/* RESUMO DO DIA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Resumo</Text>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { borderLeftColor: Colors.primary }]}>
            <View style={[styles.statIcon, { backgroundColor: Colors.primaryLight }]}>
              <MaterialIcons name="calendar-today" size={24} color={Colors.primary} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Agendadas</Text>
              <Text style={styles.statValue}>{stats.scheduledAppointments}</Text>
            </View>
          </View>

          <View style={[styles.statCard, { borderLeftColor: Colors.secondary }]}>
            <View style={[styles.statIcon, { backgroundColor: '#E0F7F6' }]}>
              <MaterialIcons name="pets" size={24} color={Colors.secondary} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Pets Atendidos</Text>
              <Text style={styles.statValue}>{stats.attendedPets}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* AÇÕES RÁPIDAS - GRID 2x3 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚡ Ações Rápidas</Text>
        </View>
        
        <View style={styles.actionsGrid}>
          <ActionButton
            icon="add-circle-outline"
            label="Ver Funcionários"
            onPress={() => handleNavigate('AdminListScreen')}
          />

          <ActionButton
            icon="people"
            label="Ver Clientes"
            onPress={() => handleNavigate('UserListScreen')}
            color={Colors.info}
          />

          <ActionButton
            icon="event-note"
            label="Consultas"
            onPress={() => handleNavigate('AdminConsultations')}
            color={Colors.warning}
          />

          <ActionButton
            icon="chat-bubble"
            label="Todos Chats"
            onPress={() => handleNavigate('AdminAllChats')}
            color={Colors.success}
          />

          <ActionButton
            icon="list-alt"
            label="Todas Consultas"
            onPress={() => handleNavigate('AllAppointmentsScreen')}
            color={Colors.secondary}
          />

          <ActionButton
            icon="settings"
            label="Configurações"
            onPress={() => handleNavigate('Configuration')}
            color={Colors.darkGray}
          />


        </View>
      </View>

      {/* INFORMAÇÕES ÚTEIS */}
      <View style={styles.section}>
        <View style={[styles.infoCard, { backgroundColor: Colors.primaryLight }]}>
          <MaterialIcons name="info" size={24} color={Colors.primary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: Colors.primary }]}>Sistema Ativo</Text>
            <Text style={styles.infoSubtitle}>Todas as funcionalidades estão operacionais</Text>
          </View>
        </View>
      </View>

      <View style={styles.spacing} />
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
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  statsContainer: {
    gap: 12,
  },
  statCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    backgroundColor: 'transparent',
  },
  actionButtonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },
  infoCard: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 14,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  spacing: {
    height: 40,
  },
});

export default AdminDashboardScreen;