import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import HomeAppointmentCard from '../components/HomeAppointmentCard';

// Ícones personalizados
import iconeHome from '../assets/icone.png';
import iconeMao from '../assets/ChatIcon.png';
import iconePet from '../assets/pet.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/vet_icon.png';

const PrincipalScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Olá Usuário!</Text>
        <Text style={styles.subtitle}>Bom Dia!</Text>
      </View>

      {/* Card Principal */}
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        style={styles.promoCard}
      >
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>Visite nosso Website</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Clique Aqui</Text>
          </TouchableOpacity>
        </View>
        {/* Placeholder para a imagem do card */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log('DogCat clicked')}>
          <Image source={require('../assets/DogCat.png')} style={styles.promoImage} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Seção de Categorias */}
      <View style={styles.categorySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
        </View>
        <View style={styles.categoryGrid}>
          {/* Category buttons now navigate to different tabs */}
          <CategoryButton
            icon={iconeHome}
            label="Home"
            styles={styles}
            onPress={() => navigation.navigate('Home')}
          />
          <CategoryButton
            icon={iconeMao}
            label="Cuidados"
            styles={styles}
            onPress={() => navigation.navigate('AddPet')}
          />
          <CategoryButton
            icon={iconeVeterinario}
            label="Veterinário"
            styles={styles}
            onPress={() => navigation.navigate('Veterinario')}
          />
          <CategoryButton
            icon={iconePessoa}
            label="Perfil"
            styles={styles}
            onPress={() => navigation.navigate('Configurações')}
          />
        </View>
      </View>

      {/* Seção de Notificações */}
      <View style={styles.notificacoesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <TouchableOpacity onPress={() => console.log('Ver Todas clicked')}>
            <Text style={styles.seeAllLink}>Ver Todas</Text>
          </TouchableOpacity>
        </View>
        <HomeAppointmentCard
          petName="Princesa"
          date="10/12/2025"
          message="A consulta da Princesa foi agendada, aguarde para mais informações"
          petImage={require('../assets/cat1.png')}
        />
      </View>


      {/* O rodapé será removido e a navegação será gerenciada pelo Tab.Navigator em App.jsx */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    paddingTop: 24, // Adjust for safe area if needed
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3C3633',
  },
  subtitle: {
    fontSize: 18,
    color: '#7D7C7C',
  },
  promoCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  promoTextContainer: {
    maxWidth: '50%',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  promoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 150,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    color: '#7F57F1',
    fontWeight: 'bold',
  },
  promoImage: {
    width: 150,
    height: 120,
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C3633',
  },
  seeAllLink: {
    fontSize: 14,
    color: '#7F57F1',
    fontWeight: 'bold',
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16, // This might not work directly, consider using margin for spacing
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    width: '23%', // Adjust as needed for 4 columns with spacing
  },
  categoryIconContainer: {
    backgroundColor: '#7F57F1',
    borderRadius: 20,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    tintColor: '#FFFFFF',
  },
  categoryIconCare: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#7D7C7C',
    fontWeight: '500',
  },
  notificacoesSection: {
      marginBottom: 32,
  },
  consultaCard: {
    backgroundColor: '#FFF7F1',
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3, // For Android shadow
  },
  doctorImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#7F57F1', // Replaced linear gradient with solid color for simplicity
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C3633',
    marginBottom: 4,
  },
  doctorSpec: {
    fontSize: 14,
    color: '#7D7C7C',
  },
  arrowIcon: {
    backgroundColor: '#7F57F1',
    color: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16, // Half of width/height for a circle
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PrincipalScreen;

  // Componente CategoryButton
  const CategoryButton = ({ icon, label, styles, onPress }) => (
    <TouchableOpacity style={styles.categoryButton} activeOpacity={0.6} onPress={onPress}>
      <View style={styles.categoryIconContainer}>
        <Image source={icon} style={label === 'Cuidados' ? styles.categoryIconCare : styles.categoryIcon} />
      </View>
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
