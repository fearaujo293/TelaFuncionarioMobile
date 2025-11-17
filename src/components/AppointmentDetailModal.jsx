import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../Utils/Theme';
import { FontAwesome } from '@expo/vector-icons';

const AppointmentDetailModal = ({ visible, onClose, appointment }) => {
  if (!appointment) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <FontAwesome name="times-circle" size={24} color={Colors.darkGray} />
          </TouchableOpacity>

          {appointment.petImage ? (
            <Image source={{ uri: appointment.petImage }} style={styles.petImage} />
          ) : (
            <FontAwesome name="paw" size={80} color={Colors.primary} style={styles.petImagePlaceholder} />
          )}

          <Text style={styles.petName}>{appointment.petName}</Text>
          <Text style={styles.ownerName}>Dono: {appointment.ownerName}</Text>
          <Text style={styles.detailText}>Data: {appointment.date}</Text>
          <Text style={styles.detailText}>Hora: {appointment.time}</Text>
          <Text style={styles.detailText}>Tipo: {appointment.type}</Text>
          <Text style={styles.detailText}>Status: {appointment.status}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo preto semi-transparente
  },
  modalContainer: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  petImagePlaceholder: {
    marginBottom: 15,
    padding: 20,
    backgroundColor: Colors.lightGray,
    borderRadius: 60,
  },
  petName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  ownerName: {
    fontSize: 18,
    color: Colors.darkGray,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 5,
  },
});

export default AppointmentDetailModal;