import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { defaultPetImage } from '../assets/defaultPetImage';
import { Colors } from '../Utils/Theme';

const ConsultationCard = ({ consultation, onPress }) => {
  const statusLabel = (() => {
    switch (consultation.status) {
      case 'scheduled':
      case 'Agendada':
        return 'Agendada';
      case 'in_progress':
      case 'Andamento':
        return 'Andamento';
      case 'completed':
      case 'Concluída':
        return 'Concluída';
      case 'urgent':
      case 'Urgente':
        return 'Urgente';
      default:
        return consultation.status || '';
    }
  })();

  const getStatusStyle = (status) => {
    switch (statusLabel) {
      case 'Agendada':
        return styles.statusAgendada;
      case 'Andamento':
        return styles.statusAndamento;
      case 'Concluída':
        return styles.statusConcluida;
      case 'Urgente':
        return styles.statusUrgente;
      default:
        return {};
    }
  };

  const imageSource = consultation.imageSource || consultation.petImage || defaultPetImage;
  const petName = consultation.petName || consultation.pet || 'Pet';
  const service = consultation.service || consultation.type || '';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress && onPress(consultation)}>
      <Image source={imageSource} style={styles.petImage} />
      <View style={styles.cardContent}>
        <Text style={styles.petName}>{petName}</Text>
        <Text style={styles.service}>{service}</Text>
        <Text style={styles.time}>{consultation.time}</Text>
      </View>
      <View style={[styles.statusBadge, getStatusStyle(statusLabel)]}>
        <Text style={styles.statusText}>{statusLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGrayBorder,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  service: {
    fontSize: 14,
    color: Colors.darkGray,
    marginVertical: 4,
  },
  time: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusAgendada: {
    backgroundColor: Colors.purple,
  },
  statusAndamento: {
    backgroundColor: Colors.orange,
  },
  statusConcluida: {
    backgroundColor: Colors.green,
  },
  statusUrgente: {
    backgroundColor: '#FF0000',
  },
});

export default ConsultationCard;