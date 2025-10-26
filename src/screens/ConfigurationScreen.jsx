import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// Recomenda-se usar uma biblioteca de ícones como react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome5'; // Ou similar
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

  const handleDeleteAccount = () => {
    // Lógica para excluir a conta
    console.log('Conta excluída!');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.userAvatar} />
        <Text style={styles.username}>Usuario</Text>
      </View>

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
    paddingTop: 50, // Espaço do topo da tela
    backgroundColor: Colors.white, // Fundo BRANCO
  },

  // Cabeçalho e Avatar
  header: {
    alignItems: 'center',
    marginBottom: 50,
    backgroundColor: Colors.primary,
    paddingTop: 60,
    paddingBottom: 30,
  },
  userAvatar: {
    width: 100,
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
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