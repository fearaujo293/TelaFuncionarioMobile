import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { defaultPetImage } from '../assets/defaultPetImage';

const HomeAppointmentCard = ({
  petName = 'Princesa',
  date = '10/12/2025',
  message = 'A consulta da Princesa foi agendada, aguarde para mais informações',
  petImage,
}) => {
  const imageSrc = petImage || defaultPetImage;
  return (
    <View style={styles.card}>
      <View style={styles.imageCircle}>
        <Image source={imageSrc} style={styles.petImage} />
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.petName}>{petName}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <Text style={styles.message} numberOfLines={2}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 360,
    height: 120,
    backgroundColor: '#8D7EFB',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  imageCircle: {
    position: 'absolute',
    left: 16,
    top: 16,
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textBlock: {
    position: 'absolute',
    left: 108,
    top: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  petName: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 12,
  },
  dateText: {
    color: '#F0ECFF',
    fontSize: 15,
    fontWeight: '600',
  },
  message: {
    position: 'absolute',
    left: 108,
    top: 52,
    right: 16,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default HomeAppointmentCard;