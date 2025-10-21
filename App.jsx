import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Geologica_700Bold } from '@expo-google-fonts/geologica';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import InicialScreen from './src/screens/InicialScreen';
import { ChatProvider } from './src/context/ChatContext';
import AdminUserMainApp from './src/navigation/AdminUserMainApp';
import VeterinarianMainApp from './src/navigation/VeterinarianMainApp';
import AdminMainApp from './src/navigation/AdminMainApp';
import PrincipalScreen from './src/screens/PrincipalScreen';

const RootStack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Geologica_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ChatProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Inicial" component={InicialScreen} />
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Cadastro" component={CadastroScreen} />
          <RootStack.Screen name="AdminUserMainApp" component={AdminUserMainApp} />
          <RootStack.Screen name="VeterinarianMainApp" component={VeterinarianMainApp} />
          <RootStack.Screen name="AdminMainApp" component={AdminMainApp} />
          <RootStack.Screen name="PrincipalScreen" component={PrincipalScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ChatProvider>
  );
}