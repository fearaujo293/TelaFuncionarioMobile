import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../Utils/Theme';

const PrivacySettingsScreen = () => {
  const [isProfilePublic, setIsProfilePublic] = useState(false);
  const [showReviews, setShowReviews] = useState(true);
  const [showSpecialties, setShowSpecialties] = useState(true);
  const [shareLocation, setShareLocation] = useState(false);
  const [trackActivity, setTrackActivity] = useState(true);

  useEffect(() => {
    loadPrivacySettings();
  }, []);

  const savePrivacySettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(`@PrivacySettings:${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save privacy setting', e);
    }
  };

  const loadPrivacySettings = async () => {
    try {
      const profilePublic = await AsyncStorage.getItem('@PrivacySettings:isProfilePublic');
      const reviews = await AsyncStorage.getItem('@PrivacySettings:showReviews');
      const specialties = await AsyncStorage.getItem('@PrivacySettings:showSpecialties');
      const location = await AsyncStorage.getItem('@PrivacySettings:shareLocation');
      const activity = await AsyncStorage.getItem('@PrivacySettings:trackActivity');

      setIsProfilePublic(profilePublic !== null ? JSON.parse(profilePublic) : false);
      setShowReviews(reviews !== null ? JSON.parse(reviews) : true);
      setShowSpecialties(specialties !== null ? JSON.parse(specialties) : true);
      setShareLocation(location !== null ? JSON.parse(location) : false);
      setTrackActivity(activity !== null ? JSON.parse(activity) : true);
    } catch (e) {
      console.error('Failed to load privacy settings', e);
    }
  };

  const handleToggleSwitch = async (setter, key, value) => {
    setter(value);
    await savePrivacySettings(key, value);
  };

  const handleDownloadData = () => {
    Alert.alert('Baixar Dados', 'Seus dados serão preparados para download.');
    // Implement actual data download logic here
  };

  const handleRequestDeletion = () => {
    Alert.alert(
      'Solicitar Exclusão',
      'Sua conta será excluída em 7 dias. Tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => console.log('Exclusão solicitada') },
      ]
    );
    // Implement actual account deletion request logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Configurações de Privacidade</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Perfil Público</Text>
        <Switch
          trackColor={{ false: Colors.lightGray, true: Colors.primary }}
          thumbColor={isProfilePublic ? Colors.white : Colors.white}
          onValueChange={(value) => handleToggleSwitch(setIsProfilePublic, 'isProfilePublic', value)}
          value={isProfilePublic}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Mostrar Avaliações</Text>
        <Switch
          trackColor={{ false: Colors.lightGray, true: Colors.primary }}
          thumbColor={showReviews ? Colors.white : Colors.white}
          onValueChange={(value) => handleToggleSwitch(setShowReviews, 'showReviews', value)}
          value={showReviews}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Mostrar Especialidades</Text>
        <Switch
          trackColor={{ false: Colors.lightGray, true: Colors.primary }}
          thumbColor={showSpecialties ? Colors.white : Colors.white}
          onValueChange={(value) => handleToggleSwitch(setShowSpecialties, 'showSpecialties', value)}
          value={showSpecialties}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Compartilhar Localização</Text>
        <Switch
          trackColor={{ false: Colors.lightGray, true: Colors.primary }}
          thumbColor={shareLocation ? Colors.white : Colors.white}
          onValueChange={(value) => handleToggleSwitch(setShareLocation, 'shareLocation', value)}
          value={shareLocation}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Rastrear Atividades</Text>
        <Switch
          trackColor={{ false: Colors.lightGray, true: Colors.primary }}
          thumbColor={trackActivity ? Colors.white : Colors.white}
          onValueChange={(value) => handleToggleSwitch(setTrackActivity, 'trackActivity', value)}
          value={trackActivity}
        />
      </View>

      <Text style={styles.sectionTitle}>Gerenciamento de Dados</Text>

      <TouchableOpacity style={styles.button} onPress={handleDownloadData}>
        <Text style={styles.buttonText}>Baixar Meus Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleRequestDeletion}>
        <Text style={styles.buttonText}>Solicitar Exclusão da Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Geologica_600SemiBold',
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: Colors.red,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Geologica_700Bold',
  },
});

export default PrivacySettingsScreen;