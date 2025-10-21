import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importe o hook de navegação
import { Colors, CommonStyles } from '../Utils/Theme';

const LoginScreen = () => {
  const navigation = useNavigation(); // Obtenha o objeto de navegação
  const route = useRoute();
  const [userType, setUserType] = useState(route.params?.userType || 'usuario'); // 'usuario', 'veterinario' ou 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleBackPress = () => {
    navigation.goBack(); // Volta para a tela anterior na pilha
  };

  const handleLogin = () => {
    // Limpa erros anteriores
    setEmailError('');
    setPasswordError('');

    let valid = true;

    // Validação de Email
    if (!email) {
      setEmailError('O email é obrigatório.');
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Formato de email inválido.');
      valid = false;
    }

    // Validação de Senha (exemplo: mínimo de 6 caracteres)
    if (!password) {
      setPasswordError('A senha é obrigatória.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres.');
      valid = false;
    }

    if (valid) {
      // Lógica de autenticação simulada
      if (userType === 'usuario') {
        navigation.navigate('AdminUserMainApp');
      } else if (userType === 'veterinario') {
        navigation.navigate('VeterinarianMainApp');
      } else if (userType === 'admin') {
        navigation.navigate('AdminMainApp');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem de fundo que ocupa a tela inteira */}
      <Image
        source={require('../assets/Vector.png')}
        style={styles.fullScreenImage}
        accessibilityLabel="Desenho de uma pessoa com um gato"
      />

      {/* O container de login completo sobre a imagem */}
      <View style={styles.loginContainer}>
        {/* Botões de seleção de tipo de usuário */}
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'usuario' && styles.userTypeButtonActive]}
            onPress={() => setUserType('usuario')}
          >
            <Text style={[styles.userTypeButtonText, userType === 'usuario' && styles.userTypeButtonTextActive]}>
              Usuário
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'veterinario' && styles.userTypeButtonActive]}
            onPress={() => setUserType('veterinario')}
          >
            <Text style={[styles.userTypeButtonText, userType === 'veterinario' && styles.userTypeButtonTextActive]}>
              Veterinário
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.userTypeButton, userType === 'admin' && styles.userTypeButtonActive]}
            onPress={() => setUserType('admin')}
          >
            <Text style={[styles.userTypeButtonText, userType === 'admin' && styles.userTypeButtonTextActive]}>
              Funcionário
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logo Pet Vita agora é uma imagem */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/petvita2.png')} // Caminho da nova imagem
            style={styles.logoImage}
            accessibilityLabel="Logo Pet Vita com desenhos de um cachorro e um gato"
          />
        </View>

        {/* Campo de Email */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, emailError ? styles.inputError : {}]}
            placeholder="Exemplo@gmail.com"
            placeholderTextColor={Colors.lightPurple}
            keyboardType="email-address"
            maxLength={35}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        {/* Campo de Senha */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, passwordError ? styles.inputError : {}]}
            placeholder="Senha"
            placeholderTextColor={Colors.lightPurple}
            secureTextEntry
            maxLength={20}
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        {/* Lembre-me e Esqueci a Senha */}
        <View style={styles.rememberForgotContainer}>
          <View style={styles.rememberMeContainer}>
            <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
            <Text style={styles.rememberMeText}>Lembre-me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Esqueci a Senha</Text>
          </TouchableOpacity>
        </View>

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão Voltar */}
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
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
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.purple,
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
  rememberForgotContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    marginRight: 10,
  },
  rememberMeText: {
    fontSize: 14,
    color: Colors.purple,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.bluePurple,
    fontWeight: '600',
  },
  loginButton: {
    ...CommonStyles.button,
    width: '100%',
    height: 50,
    backgroundColor: Colors.bluePurple,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    ...CommonStyles.buttonText,
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
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
  inputError: {
    borderColor: Colors.red,
    borderWidth: 1,
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default LoginScreen;
