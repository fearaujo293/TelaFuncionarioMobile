import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';

const SuccessScreen = ({ route }) => {
  // Recebe os dados do agendamento da tela anterior
  const { date, time, vet, createdAppointmentId } = route?.params || {};
  const navigation = useNavigation();
  
  // Usa os dados recebidos ou valores padrão
  const displayDate = date || 'Data não especificada';
  const displayTime = time || 'Horário não especificado';
  const displayVet = vet?.name || 'Veterinário não especificado';
  return (
    <View style={styles.container}>
      {/* Background com imagem desfocada */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1560809453-57b495cce980?w=400&h=800&fit=crop' }}
        style={styles.backgroundImage}
        blurRadius={10}
      >
        {/* Overlay escuro */}
        <View style={styles.overlay} />
        
        {/* Card central */}
        <View style={styles.successCard}>
          {/* Ícone de check */}
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#9C4DFF" />
          </View>
          
          {/* Mensagem de sucesso */}
          <Text style={styles.successTitle}>Consulta agendada</Text>
          <Text style={styles.successMessage}>
            Sua consulta foi agendada com sucesso!
          </Text>
          
          {/* Informações adicionais */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{displayDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{displayTime}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#6B7280" />
              <Text style={styles.infoText}>{displayVet}</Text>
            </View>
          </View>

          {/* Próximas Ações */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButtonWrapper} onPress={() => navigation.navigate('Consultas', { activeTab: 'Agendada', highlightId: createdAppointmentId })}>
              <LinearGradient colors={Colors.gradientPrimary} style={styles.actionButtonGradient}>
                <Text style={styles.actionButtonText}>Ver Minhas Consultas</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonWrapper} onPress={() => navigation.navigate('Agendamento')}>
              <LinearGradient colors={Colors.gradientPrimary} style={styles.actionButtonGradient}>
                <Text style={styles.actionButtonText}>Agendar Nova</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Instrução de navegação */}
        <View style={styles.navigationHint}>
          <Text style={styles.hintText}>
            Use a barra de navegação abaixo para continuar
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    maxWidth: 350,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 10,
    fontWeight: '500',
  },
  actionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 12,
    marginTop: 12,
  },
  actionButtonWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  navigationHint: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SuccessScreen;
