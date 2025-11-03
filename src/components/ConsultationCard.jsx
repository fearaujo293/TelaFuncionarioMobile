import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { defaultPetImage } from '../assets/defaultPetImage';
import { Colors } from '../Utils/Theme';

const ConsultationCard = ({ consultation, onPress }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Agendada':
        return styles.statusAgendada;
      case 'Andamento':
        return styles.statusAndamento;
      case 'Concluída':
        return styles.statusConcluida;
      default:
        return {};
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={consultation.imageSource || defaultPetImage} style={styles.petImage} />
      <View style={styles.cardContent}>
        <Text style={styles.petName}>{consultation.petName}</Text>
        <Text style={styles.service}>{consultation.service}</Text>
        <Text style={styles.time}>{consultation.time}</Text>
      </View>
      <View style={[styles.statusBadge, getStatusStyle(consultation.status)]}>
        <Text style={styles.statusText}>{consultation.status}</Text>
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
});

export default ConsultationCard;