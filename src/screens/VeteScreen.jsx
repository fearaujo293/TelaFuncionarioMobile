import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { useRoute } from '@react-navigation/native';
import { useVeterinarianContext } from '../context/VeterinarianContext';

const VeteScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Agendada');
  const { appointments } = useVeterinarianContext();
  const route = useRoute();
  const highlightId = route?.params?.highlightId;
  const hideHeader = route?.params?.hideHeader;

  const tabData = [
    { id: 'Agendada', label: 'Agendadas', icon: 'calendar-today', count: appointments?.Agendada?.length || 0 },
    { id: 'Andamento', label: 'Andamento', icon: 'schedule', count: appointments?.Andamento?.length || 0 },
    { id: 'Concluídas', label: 'Concluídas', icon: 'check-circle', count: appointments?.Concluídas?.length || 0 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada': return '#FFA500';
      case 'Andamento': return '#A367F0';
      case 'Concluídas': return '#4CAF50';
      default: return '#A367F0';
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Agendada':
        return { bg: '#FFF3E0', text: '#FF8C00' };
      case 'Andamento':
        return { bg: '#F3E5F5', text: '#A367F0' };
      case 'Concluídas':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      default:
        return { bg: '#F3E5F5', text: '#A367F0' };
    }
  };

  const renderConsultationCard = ({ item }) => {
    const statusStyle = getStatusBadgeStyle(item.status);
    
    return (
      <TouchableOpacity
        style={[
          styles.card,
          { borderLeftColor: getStatusColor(item.status) },
          highlightId && item.id === highlightId && styles.cardHighlight
        ]}
        onPress={() => navigation.navigate('DetalhesConsulta', { consulta: item })}
        activeOpacity={0.85}
      >
        {/* Header com Avatar e Status */}
        <View style={styles.cardHeader}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              {item.imageSource ? (
                <Image source={item.imageSource} style={styles.avatar} />
              ) : (
                <Text style={styles.avatarText}>🐾</Text>
              )}
            </View>

            <View style={styles.petInfo}>
              <Text style={styles.petName}>{item.petName}</Text>
              <Text style={styles.petType}>{item.service}</Text>
            </View>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.compactInfoRow}>
          <View style={styles.compactItem}>
            <MaterialIcons name="date-range" size={26} color="#6B7280" />
            <Text style={styles.compactText}>{item.date}</Text>
          </View>
          <View style={styles.compactItem}>
            <MaterialIcons name="access-time" size={26} color="#6B7280" />
            <Text style={styles.compactText}>{item.time}</Text>
          </View>
          <View style={styles.compactItem}>
            <FontAwesome5 name="user" size={18} color="#6B7280" />
            <Text style={styles.compactText} numberOfLines={1}>{item.ownerName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const currentConsultations = appointments?.[activeTab] || [];
  const todayStr = new Date().toISOString().split('T')[0];

  React.useEffect(() => {
    if (route?.params?.activeTab) {
      setActiveTab(route.params.activeTab);
    }
  }, [route?.params?.activeTab]);

  return (
    <View style={styles.container}>
      {!hideHeader && (
        <LinearGradient
          colors={Colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Minhas Consultas</Text>
          <Text style={styles.headerSubtitle}>Gerencie seus agendamentos</Text>
        </LinearGradient>
      )}

      {/* Tabs Customizadas */}
      <View style={styles.tabsContainer}>
        {tabData.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => setActiveTab(tab.id)}
            activeOpacity={0.85}
          >
            {activeTab === tab.id ? (
              <LinearGradient colors={Colors.gradientPrimary} style={styles.tabContent}>
                <MaterialIcons name={tab.icon} size={24} color="#FFF" />
                <Text style={[styles.tabText, styles.activeTabText]}>{tab.label}</Text>
                <View style={[styles.tabBadge, styles.activeTabBadge]}>
                  <Text style={[styles.tabBadgeText, styles.activeTabBadgeText]}>{tab.count}</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={[styles.tabContent, styles.tabContentInactive]}>
                <MaterialIcons name={tab.icon} size={24} color="#999" />
                <Text style={styles.tabText}>{tab.label}</Text>
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.count}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {(activeTab === 'Andamento' || activeTab === 'Concluídas') && (
        <View style={styles.statusStatsContainer}>
          <View style={styles.statusStatCard}>
            <Text style={styles.statNumber}>{currentConsultations.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statusStatCard}>
            <Text style={styles.statNumber}>{currentConsultations.filter(c => c.date === todayStr).length}</Text>
            <Text style={styles.statLabel}>Hoje</Text>
          </View>
        </View>
      )}

      {/* Lista de Consultas */}
      <FlatList
        data={currentConsultations}
        renderItem={renderConsultationCard}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="event-busy" size={64} color="#DDD" />
            <Text style={styles.emptyText}>Nenhuma consulta</Text>
            <Text style={styles.emptySubtext}>
              Não há {activeTab.toLowerCase()} no momento
            </Text>
          </View>
        }
      />

      {/* Botão central de Agendar Consulta */}
      <TouchableOpacity
        style={styles.scheduleButtonWrapper}
        onPress={() => navigation.navigate('Agendamento')}
      >
        <LinearGradient colors={Colors.gradientPrimary} style={styles.scheduleButtonGradient}>
          <Text style={styles.scheduleButtonText}>Agendar Consulta</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  tab: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    gap: 6,
  },
  tabContentInactive: {
    backgroundColor: '#EEF2FF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
  tabBadge: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabBadgeText: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#A367F0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardHighlight: {
    borderWidth: 1,
    borderColor: '#A367F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F3E5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E1BEE7',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  avatarText: {
    fontSize: 28,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  petType: {
    fontSize: 13,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  compactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 6,
  },
  compactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  compactText: {
    fontSize: 12,
    color: '#1F2937',
    fontWeight: '600',
  },
  statusStatsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusStatCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#A367F0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 60,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#A367F0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  scheduleButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#CCC',
    marginTop: 8,
  },
});

export default VeteScreen;

