import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Colors } from '../Utils/Theme';
import { useRoute } from '@react-navigation/native';

const TelaDetalhesConsulta = () => {
  const route = useRoute();
  const { consultationId } = route.params || {};
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular chamada de API para buscar detalhes da consulta
    const fetchConsultationDetails = async () => {
      setLoading(true);
      // Em um cenário real, você faria uma chamada de API aqui, por exemplo:
      // const response = await api.get(`/consultations/${consultationId}`);
      // setConsultationDetails(response.data);

      // Dados simulados para demonstração
      // const mockData = {
      //   petName: 'Rex',
      //   petBreed: 'Golden Retriever',
      //   petAge: '3 anos',
      //   petPhoto: 'https://via.placeholder.com/100',
      //   clientName: 'Ana Silva',
      //   clientPhone: '11987654321',
      //   clientEmail: 'ana.silva@example.com',
      //   date: '27/10/2023',
      //   time: '10:00',
      //   serviceType: 'Banho e Tosa',
      //   duration: '1 hora',
      //   status: 'Confirmado',
      //   notes: [
      //     { id: '1', text: 'Pet um pouco agitado, mas cooperou bem.', date: '2023-10-20' },
      //     { id: '2', text: 'Solicitado corte específico na tosa.', date: '2023-10-27' },
      //   ],
      // };

      try {
        const response = await fetch(`YOUR_ACTUAL_API_BASE_URL/consultations/${consultationId}`); // Substitua YOUR_ACTUAL_API_BASE_URL pela sua URL base da API real
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setConsultationDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da consulta:", error);
        // Optionally set an error state here
      } finally {
        setLoading(false);
      }
    };

    if (consultationId) {
      fetchConsultationDetails();
    } else {
      setLoading(false);
    }
  }, [consultationId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando detalhes da consulta...</Text>
      </View>
    );
  }

  if (!consultationDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Nenhum detalhe de consulta encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes da Consulta</Text>

      {/* Informações do Pet */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Pet</Text>
        <View style={styles.petInfoContainer}>
          <Image source={{ uri: consultationDetails.petPhoto }} style={styles.petPhoto} />
          <View>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Nome:</Text> {consultationDetails.petName}</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Raça:</Text> {consultationDetails.petBreed}</Text>
            <Text style={styles.infoText}><Text style={styles.infoLabel}>Idade:</Text> {consultationDetails.petAge}</Text>
          </View>
        </View>
      </View>

      {/* Informações do Cliente */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informações do Cliente</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <Text style={styles.infoValue}>{consultationDetails.clientName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Telefone:</Text>
          <Text style={styles.linkText} onPress={() => Linking.openURL(`tel:${consultationDetails.clientPhone}`)}>{consultationDetails.clientPhone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{consultationDetails.clientEmail}</Text>
        </View>
      </View>

      {/* Detalhes do Agendamento */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Detalhes do Agendamento</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Data e Hora:</Text>
          <Text style={styles.infoValue}>{consultationDetails.date} às {consultationDetails.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tipo de Serviço:</Text>
          <Text style={styles.infoValue}>{consultationDetails.serviceType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Duração:</Text>
          <Text style={styles.infoValue}>{consultationDetails.duration}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoValue}>{consultationDetails.status}</Text>
        </View>
      </View>

      {/* Notas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notas</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Adicionar nova nota..."
          multiline
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar Nota</Text>
        </TouchableOpacity>
        <View style={styles.notesHistory}>
          {consultationDetails.notes.map((note) => (
            <View key={note.id} style={styles.noteCard}>
              <Text style={styles.noteText}>{note.text}</Text>
              <Text style={styles.noteDate}>{note.date}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
          <Text style={styles.actionButtonText}>✓ Concluído</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={() => Linking.openURL(`tel:${consultationDetails.clientPhone}`)}>
          <Text style={styles.actionButtonText}>Ligar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.backButton]}>
          <Text style={styles.actionButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  petInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  petPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notesHistory: {
    marginTop: 10,
  },
  noteCard: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  completeButton: {
    backgroundColor: '#28A745', // Green
  },
  callButton: {
    backgroundColor: Colors.primary, // Blue
  },
  backButton: {
    backgroundColor: '#6C757D', // Gray
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default TelaDetalhesConsulta;