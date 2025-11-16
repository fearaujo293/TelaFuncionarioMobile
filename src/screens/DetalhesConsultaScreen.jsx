import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';
import GradientHeader from '../components/GradientHeader';

const DetalhesConsultaScreen = ({ route }) => {
  const navigation = useNavigation();
  const { consulta } = route.params || {};
  
  // Se não houver dados da consulta, usar dados padrão
  const consultaData = consulta || {
    petName: "Pet",
    service: "Serviço",
    time: "Horário",
    date: "Data",
    sintomas: "Sintomas não informados",
    localizacao: "Localização não informada",
    implementos: [],
    imageSource: require('../assets/cat1.png'),
    status: "Pendente",
    ownerName: "Cliente",
    veterinario: "Veterinário"
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Agendada':
        return { bg: '#FFF3E0', text: '#FF8C00' };
      case 'Andamento':
        return { bg: '#F3E5F5', text: '#A367F0' };
      case 'Concluída':
        return { bg: '#E8F5E9', text: '#2E7D32' };
      case 'Pendente':
        return { bg: '#F0F9FF', text: '#0EA5E9' };
      default:
        return { bg: '#F3E5F5', text: '#A367F0' };
    }
  };

  return (
    <View style={styles.container}>
      <GradientHeader title="Detalhes da Consulta" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Card */}
        <View style={styles.mainCard}>
          {/* Pet Info */}
          <View style={styles.petInfoContainer}>
            <Image
              source={consultaData.imageSource}
              style={styles.petImage}
            />
            <Text style={styles.petName}>{consultaData.petName}</Text>
            <Text style={styles.ownerName}>Dono: {consultaData.ownerName}</Text>
          </View>

          <View style={styles.parallelGridRow}>
            <View style={styles.parallelInfoCard}>
              <View style={styles.parallelInfoLine}>
                <FontAwesome name="calendar" size={14} color="#8D7EFB" />
                <Text style={styles.parallelInfoLabel}>Data</Text>
                <Text style={styles.parallelInfoValue}>{consultaData.date}</Text>
              </View>
              <View style={styles.parallelInfoLine}>
                <FontAwesome name="clock-o" size={14} color="#8D7EFB" />
                <Text style={styles.parallelInfoLabel}>Hora</Text>
                <Text style={styles.parallelInfoValue}>{consultaData.time}</Text>
              </View>
            </View>
            <View style={styles.parallelInfoCard}>
              <View style={styles.parallelInfoLine}>
                <FontAwesome name="heartbeat" size={14} color="#8D7EFB" />
                <Text style={styles.parallelInfoLabel}>Serviço</Text>
                <Text style={styles.parallelInfoValue}>{consultaData.service}</Text>
              </View>
              <View style={styles.parallelInfoLine}>
                <FontAwesome name="user-md" size={14} color="#8D7EFB" />
                <Text style={styles.parallelInfoLabel}>Veterinário</Text>
                <Text style={styles.parallelInfoValue}>{consultaData.veterinario}</Text>
              </View>
            </View>
          </View>
 
          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: getStatusBadgeStyle(consultaData.status).bg }]}>
            <Text style={[styles.statusText, { color: getStatusBadgeStyle(consultaData.status).text }]}>
              {consultaData.status}
            </Text>
          </View>

          {/* Symptom Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição dos Sintomas</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                {consultaData.sintomas}
              </Text>
            </View>
          </View>

          {/* Preparo para a Consulta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preparo para a Consulta</Text>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>
                Jejum de 4 horas para alimentos (água à vontade).
              </Text>
              <Text style={styles.descriptionText}>
                Não se esqueça de trazer a carteira de vacinação.
              </Text>
            </View>
          </View>
 
          {/* Required Implements */}
          {consultaData.implementos && consultaData.implementos.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Implementos Necessários</Text>
              <View style={styles.tagsContainer}>
                {consultaData.implementos.map((implemento, index) => (
                  <View key={index} style={[styles.tag, styles.tagGreen]}>
                    <Text style={styles.tagTextGreen}>{implemento}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
 
          {/* Observation */}
          <View style={styles.section}>
            <Text style={styles.observationText}>
              Dependendo do caso, recomendamos que você traga qualquer item adicional que considere levar.
            </Text>
          </View>
 
          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Localização</Text>
            <Text style={styles.locationText}>
              {consultaData.localizacao}
            </Text>
            <Text style={styles.contactText}>
              Contato da Clínica: (11) 5555-1234
            </Text>
          </View>

          {/* Botões de ação */}
          <View style={styles.actionButtonsContainer}>
            {consultaData.status === 'Agendada' && (
              <View />
            )}

            {consultaData.status === 'Andamento' && (
              <View style={styles.andamentoRow}>
                <Text style={styles.cancelText}>cancelar consulta</Text>
                <TouchableOpacity
                  style={styles.actionRedButton}
                  onPress={() =>
                    Alert.alert(
                      'Cancelar consulta',
                      'Tem certeza que deseja cancelar?',
                      [
                        { text: 'Não', style: 'cancel' },
                        { text: 'Sim', style: 'destructive', onPress: () => Alert.alert('Cancelada', 'A consulta foi cancelada.') },
                      ]
                    )
                  }
                >
                  <Text style={styles.actionRedButtonText}>Clique Aqui</Text>
                </TouchableOpacity>
              </View>
            )}

            {consultaData.status === 'Concluída' && (
              <TouchableOpacity
                style={styles.actionPurpleButton}
                onPress={() => Alert.alert('Relatório', 'Relatório gerado com sucesso')}
              >
                <Text style={styles.actionPurpleButtonText}>gerar relatorio</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderLeftWidth: 4,
    borderLeftColor: '#A367F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  petInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: '#A367F0',
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6E59D9',
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EBFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#8D7EFB',
  },
  detailText: {
    fontSize: 14,
    color: '#6E59D9',
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8D7EFB',
    marginBottom: 12,
  },
  descriptionBox: {
    backgroundColor: '#F7F5FF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E7E3FB',
  },
  descriptionText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  parallelGridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  parallelInfoCard: {
    flex: 1,
    backgroundColor: '#F0EBFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#8D7EFB',
  },
  parallelInfoLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  parallelInfoLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  parallelInfoValue: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '700',
    marginLeft: 'auto',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  tagGreen: {
    backgroundColor: '#F0ECFF',
  },
  tagTextGreen: {
    color: '#6E59D9',
    fontSize: 12,
    fontWeight: '500',
  },
  observationText: {
    fontSize: 13,
    color: '#6E59D9',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  locationText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 12,
  },
  actionButtonsContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  andamentoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  actionRedButton: {
    backgroundColor: Colors.red,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  actionRedButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  actionPurpleButton: {
    backgroundColor: Colors.purple,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  actionPurpleButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  actionButtonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  actionButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
 
export default DetalhesConsultaScreen;
