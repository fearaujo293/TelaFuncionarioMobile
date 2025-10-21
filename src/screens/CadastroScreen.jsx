import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, CommonStyles } from '../Utils/Theme';

const CadastroScreen = () => {
  const navigation = useNavigation(); // Obtenha o objeto de navegação
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('usuario');

  const handleNameChange = (text) => {
    // Remove all non-alphabetic characters
    const cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
    setName(cleanedText);
  };
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handlePhoneChange = (text) => {
    // Remove all non-numeric characters
    let cleanedText = text.replace(/[^0-9]/g, '');
    
    // Add space after first 2 digits if length > 2
    if (cleanedText.length > 2) {
      cleanedText = cleanedText.substring(0, 2) + ' ' + cleanedText.substring(2);
    }
    
    setPhone(cleanedText);
  };
  const [password, setPassword] = useState('');

  // Handles the "Cadastrar" (Register) button click.
  const handleRegister = () => {
    // Lógica de registro aqui
    // Se o registro for bem-sucedido, navegue para a tela principal
    navigation.navigate('Login', { userType });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Vector.png')}
        style={styles.fullScreenImage}
        accessibilityLabel="Desenho de uma pessoa com um gato"
      />

      <View style={styles.loginContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/petvita2.png')}
            style={styles.logoImage}
            accessibilityLabel="Logo Pet Vita com desenhos de um cachorro e um gato"
          />
        </View>

        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'usuario' && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType('usuario')}
          >
            <Text
              style={[
                styles.userTypeButtonText,
                userType === 'usuario' && styles.userTypeButtonTextActive,
              ]}
            >
              Usuário
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'veterinario' && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType('vete')}
          >
            <Text
              style={[
                styles.userTypeButtonText,
                userType === 'vete' && styles.userTypeButtonTextActive,
              ]}
            >
              Vete
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor={Colors.lightPurple}
            value={name}
            onChangeText={handleNameChange}
            maxLength={50} // Limit name to 50 characters
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Exemplo@gmail.com"
            placeholderTextColor={Colors.lightPurple}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            maxLength={35} // Limit email to 100 characters
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="00 00000-0000"
            placeholderTextColor={Colors.lightPurple}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={handlePhoneChange}
            maxLength={12} // Limit phone to 11 digits
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={Colors.lightPurple}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            maxLength={20} // Limit password to 20 characters
          />
        </View>
        
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
        >
          <Text style={styles.registerButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  fullScreenImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 1,
  },
  loginContainer: {
    ...CommonStyles.card,
    width: '90%',
    maxWidth: 400,
    backgroundColor: Colors.white,
    padding: 30,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  userTypeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.bluePurple,
    marginHorizontal: 5,
  },
  userTypeButtonActive: {
    backgroundColor: Colors.bluePurple,
  },
  userTypeButtonText: {
    color: Colors.bluePurple,
    fontWeight: '600',
  },
  userTypeButtonTextActive: {
    color: Colors.white,
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.veryLightPurple,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
  },
  registerButton: {
    ...CommonStyles.button,
    width: '100%',
    height: 50,
    backgroundColor: Colors.bluePurple,
    marginBottom: 15,
  },
  registerButtonText: {
    ...CommonStyles.buttonText,
    color: Colors.white,
  },
  backButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.bluePurple,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CadastroScreen;
