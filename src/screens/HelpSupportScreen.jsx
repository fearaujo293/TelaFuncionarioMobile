import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Colors } from '../Utils/Theme';

const HelpSupportScreen = () => {
  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Ajuda e Suporte</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Perguntas Frequentes (FAQ)</Text>
        <Text style={styles.cardText}>
          Encontre respostas para as perguntas mais comuns sobre o uso do aplicativo.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLinkPress('https://example.com/faq')}
        >
          <Text style={styles.buttonText}>Ver FAQ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Entrar em Contato</Text>
        <Text style={styles.cardText}>
          Se você não encontrou o que procurava, entre em contato com nossa equipe de suporte.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLinkPress('mailto:support@example.com')}
        >
          <Text style={styles.buttonText}>Enviar Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLinkPress('tel:+5511999999999')}
        >
          <Text style={styles.buttonText}>Ligar para Suporte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Termos de Serviço</Text>
        <Text style={styles.cardText}>
          Leia nossos termos de serviço para entender seus direitos e responsabilidades.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLinkPress('https://example.com/terms')}
        >
          <Text style={styles.buttonText}>Ver Termos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Política de Privacidade</Text>
        <Text style={styles.cardText}>
          Saiba como coletamos, usamos e protegemos suas informações.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLinkPress('https://example.com/privacy')}
        >
          <Text style={styles.buttonText}>Ver Política</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Geologica_700Bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Geologica_600SemiBold',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
    marginBottom: 15,
  },
  button: {
    backgroundColor: Colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Geologica_700Bold',
  },
});

export default HelpSupportScreen;