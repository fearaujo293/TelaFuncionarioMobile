import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../Utils/Theme';
import { defaultVetImage } from '../assets/defaultVetImage';

const VetCard = ({ vet, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.vetCard,
        isSelected && styles.selectedVetCard
      ]}
      onPress={onPress}
    >
      <Image
        source={vet.photo ? { uri: vet.photo } : defaultVetImage}
        style={styles.vetImage}
        resizeMode="cover"
      />
      <View style={styles.vetInfo}>
        <Text style={styles.vetName}>{vet.name}</Text>
        <Text style={styles.vetSpecialty}>{vet.specialty}</Text>
        <Text style={styles.vetRating}>⭐ {vet.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vetCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.lightGrayBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  selectedVetCard: {
    borderColor: Colors.darkPurple,
    backgroundColor: Colors.lightPurpleBackground,
  },
  vetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  vetInfo: {
    alignItems: 'center',
  },
  vetName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 4,
  },
  vetSpecialty: {
    fontSize: 12,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 4,
  },
  vetRating: {
    fontSize: 12,
    color: Colors.orange,
    fontWeight: '600',
  },
});

export default VetCard;