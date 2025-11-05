import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

  return (
    <View style={styles.container}>
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

          {/* Consultation Details */}
          <View style={styles.section}>
            <View style={styles.detailRow}>
              <FontAwesome name="calendar" size={14} color="#8D7EFB" />
              <Text style={styles.detailText}>{consultaData.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="clock-o" size={14} color="#8D7EFB" />
              <Text style={styles.detailText}>{consultaData.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="heartbeat" size={14} color="#8D7EFB" />
              <Text style={styles.detailText}>{consultaData.service}</Text>
            </View>
            <View style={styles.detailRow}>
              <FontAwesome name="user-md" size={14} color="#8D7EFB" />
              <Text style={styles.detailText}>{consultaData.veterinario}</Text>
            </View>
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
              <TouchableOpacity 
                style={[styles.actionButton, styles.confirmButton]}
                onPress={() => console.log('Consulta confirmada')}
              >
                <Text style={styles.actionButtonText}>✓ Confirmar</Text>
              </TouchableOpacity>
            )}
            
            {consultaData.status === 'Andamento' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.inProgressButton]}
                onPress={() => console.log('Consulta em andamento')}
              >
                <Text style={styles.actionButtonText}>⏳ Em Andamento</Text>
              </TouchableOpacity>
            )}
            
            {consultaData.status === 'Concluída' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.completedButton]}
                onPress={() => console.log('Consulta concluída')}
              >
                <Text style={styles.actionButtonText}>✓ Concluída</Text>
              </TouchableOpacity>
            )}

            {consultaData.status === 'Pendente' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.pendingButton]}
                onPress={() => console.log('Pendente de confirmação')}
              >
                <Text style={styles.actionButtonText}>⏱ Pendente</Text>
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
    borderColor: '#8D7EFB',
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
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  inProgressButton: {
    backgroundColor: '#FF9800',
  },
  completedButton: {
    backgroundColor: '#2196F3',
  },
  pendingButton: {
    backgroundColor: '#9C27B0',
  },
});
 
export default DetalhesConsultaScreen;