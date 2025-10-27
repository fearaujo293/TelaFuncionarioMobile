import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Alert } from 'react-native';
// Recomenda-se usar uma biblioteca de ícones como react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome5'; // Ou similar
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { Colors, CommonStyles } from '../Utils/Theme';

// --- Definições de Cores ---
const COLORS = {
  background: Colors.white, // BRANCO PURO
  text: Colors.darkGray,
  border: Colors.lightPurple,
  delete: Colors.red, // Vermelho/Laranja para "Excluir"
  iconSafe: Colors.purple, // Roxo/Azul escuro para ícones normais
  avatarBg: Colors.veryLightPurple, // Branco-rosado claro do círculo superior
};
// --- Componente de Item de Menu ---
const MenuItem = ({ iconName, text, isDelete = false, onPress }) => (
  <TouchableOpacity 
    style={[
      styles.menuItem,
      isDelete && styles.deleteItemContainer // Aplica estilos extras se for "Excluir"
    ]}
    onPress={onPress} // Agora usa a prop onPress
  >
    <Icon 
      name={iconName} 
      size={20} 
      style={[
        styles.icon,
        { color: isDelete ? COLORS.delete : COLORS.iconSafe }
      ]}
    />
    <Text 
      style={[
        styles.menuText,
        isDelete && styles.deleteText // Aplica cor de texto se for "Excluir"
      ]}
    >
      {text}
    </Text>

  </TouchableOpacity>
);

// --- Componente da Tela de Configuração Principal ---
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';

const ConfigurationScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [userImage, setUserImage] = useState(null);

  const handleDeleteAccount = () => {
    // Lógica para excluir a conta
    console.log('Conta excluída!');
    setModalVisible(false);
  };

  const pickImage = async () => {
    try {
      // Solicitar permissão para acessar a galeria
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para selecionar uma imagem.');
        return;
      }

      // Abrir a galeria para seleção de imagem
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setUserImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        style={styles.headerGradient}
      >
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.userAvatar} />
          ) : (
            <View style={styles.userAvatar}>
              <Icon name="user" size={40} color={Colors.primary} />
            </View>
          )}
          <View style={styles.cameraIcon}>
            <Icon name="camera" size={16} color={Colors.white} />
          </View>
        </TouchableOpacity>
        <Text style={styles.username}>Usuario</Text>
      </LinearGradient>

      {/* Menu de Opções */}
      <View style={styles.menuContainer}>
        <MenuItem iconName="fingerprint" text="Segurança" onPress={() => navigation.navigate('Security')} />
        <MenuItem iconName="paw" text="Pets" onPress={() => navigation.navigate('Home') } />
        <MenuItem iconName="calendar-alt" text="Consultas Agendadas" onPress={() => navigation.navigate('Veterinario', { screen: 'Consultas' })} />
        <MenuItem 
          iconName="sign-out-alt" 
          text="Sair" 
          onPress={() => navigation.navigate('Login')} // Navega para a tela de Login
        />
        <MenuItem 
          iconName="trash-alt" 
          text="Excluir Conta" 
          isDelete={true} 
          onPress={() => setModalVisible(true)} // Abre o modal
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <DeleteConfirmationModal
          onCancel={() => setModalVisible(false)}
          onDelete={handleDeleteAccount}
        />
      </Modal>
    </View>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white, // Fundo BRANCO
  },

  // Cabeçalho e Avatar
  headerGradient: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: Colors.primary,
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  userAvatar: {
    width: 100,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.white,
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginTop: -30,
  },
  menuItem: {
    ...CommonStyles.card,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: Colors.cardBackground,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 20,
    width: 28,
    textAlign: 'center',
  },
  menuText: {
    flexGrow: 1,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  deleteText: {
    color: COLORS.delete,
    fontWeight: 'bold',
  },
});

export default ConfigurationScreen;