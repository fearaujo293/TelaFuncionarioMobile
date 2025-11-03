import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import { Colors, CommonStyles } from '../Utils/Theme';
import VetCard from '../components/VetCard';
import { veterinarians } from '../data/veterinarians';

const VeteSelectScreen = ({ navigation, route }) => {
  const [selectedVetId, setSelectedVetId] = useState(null);

  const handleNext = () => {
    if (!selectedVetId) {
      Alert.alert('Atenção', 'Selecione um veterinário para continuar');
      return;
    }

    const formData = route?.params?.appointmentData || {};
    const selectedVet = veterinarians.find(v => v.id === selectedVetId);
    navigation.navigate('ReviewScreen', { ...formData, vet: selectedVet });
  };

  const renderVetCard = ({ item }) => (
    <VetCard
      vet={item}
      isSelected={selectedVetId === item.id}
      onPress={() => setSelectedVetId(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Consultas</Text>
        </View>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Selecione o veterinário para a consulta
          </Text>
        </View>

        <FlatList
          data={veterinarians}
          renderItem={renderVetCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.vetList}
          scrollEnabled={false}
        />

        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedVetId && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!selectedVetId}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkPurple,
  },
  instructionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  vetList: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  nextButton: {
    ...CommonStyles.button,
    marginTop: 20,
    marginBottom: 30,
  },
  nextButtonDisabled: {
    backgroundColor: Colors.mediumGray,
  },
  nextButtonText: {
    ...CommonStyles.buttonText,
  },
});

export default VeteSelectScreen;