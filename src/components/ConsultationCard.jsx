import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../Utils/Theme';

const ConsultationCard = ({ consultation, onPress }) => {
  if (!consultation) {
    return null;
  }

  const { pet, time, type, petImage, status } = consultation;

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return Colors.mediumPurple;
      case 'urgent':
        return '#FF0000';
      case 'completed':
        return Colors.gray;
      default:
        return Colors.mediumPurple;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(consultation)}>
      <View style={styles.cardContent}>
        {petImage && (
          <Image source={petImage} style={styles.petImage} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.petName}>{pet}</Text>
          <Text style={styles.consultationTime}>{time}</Text>
          <Text style={styles.consultationType}>{type}</Text>
        </View>
      </View>
      <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(status) }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  petImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkHighlightPurple,
  },
  consultationTime: {
    fontSize: 14,
    color: Colors.mediumPurple,
    marginTop: 2,
  },
  consultationType: {
    fontSize: 12,
    color: Colors.lightPurple,
    marginTop: 2,
  },
  statusIndicator: {
    width: 10,
    height: '100%',
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default ConsultationCard;