import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { Colors } from '../Utils/Theme';

// Telas
import VeteScreen from '../screens/VeteScreen';
import AllAppointmentsScreen from '../screens/AllAppointmentsScreen';
import AgendaScreen from '../screens/AgendaScreen';
import EmployeeChatsListScreen from '../screens/EmployeeChatsListScreen';
import EmployeeChatScreen from '../screens/EmployeeChatScreen';
import VeterinarianConfigurationScreen from '../screens/VeterinarianConfigurationScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';

// Ícones
import iconeHome from '../assets/pet.png';
import iconeConsulta from '../assets/CalendarioIcon.png';
import iconeAgenda from '../assets/CalendarioIcon.png'; 
import iconeChat from '../assets/ChatIcon.png';
import iconeConfig from '../assets/pessoa.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeVeterinarianTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeVeterinarian" component={VeteScreen} />
  </Stack.Navigator>
);

const MinhasConsultasStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MinhasConsultas" component={AllAppointmentsScreen} />
  </Stack.Navigator>
);

const AgendaVeterinarianTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AgendaVeterinarian" component={AgendaScreen} />
  </Stack.Navigator>
);

const ChatVeterinarianTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChatListVeterinarian" component={EmployeeChatsListScreen} />
    <Stack.Screen name="ChatVeterinarian" component={EmployeeChatScreen} />
  </Stack.Navigator>
);

const ConfigurationVeterinarianTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ConfigurationVeterinarian" component={VeterinarianConfigurationScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} />
  </Stack.Navigator>
);

const VeterinarianTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.purple,
        tabBarInactiveTintColor: Colors.gray,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = iconeHome;
          } else if (route.name === 'Minhas Consultas') {
            iconName = iconeConsulta;
          } else if (route.name === 'Agenda') {
            iconName = iconeAgenda;
          } else if (route.name === 'Chat') {
            iconName = iconeChat;
          } else if (route.name === 'Configurações') {
            iconName = iconeConfig;
          }
          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeVeterinarianTabStack} />
      <Tab.Screen name="Minhas Consultas" component={MinhasConsultasStack} />
      <Tab.Screen name="Agenda" component={AgendaVeterinarianTabStack} />
      <Tab.Screen name="Chat" component={ChatVeterinarianTabStack} />
      <Tab.Screen name="Configurações" component={ConfigurationVeterinarianTabStack} />
    </Tab.Navigator>
  );
};

export default VeterinarianTabNavigator;