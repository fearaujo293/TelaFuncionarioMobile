import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
import DetalhesConsultaScreen from '../screens/DetalhesConsultaScreen';
import AgendamentoScreen from '../screens/AgendamentoScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import WorkHoursScreen from '../screens/WorkHoursScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import AppearanceSettingsScreen from '../screens/AppearanceSettingsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';

// Ícones
import iconeHome from '../assets/pet.png';
import iconeVeterinario from '../assets/vet_icon.png';
import iconeAgenda from '../assets/CalendarioIcon.png'; 
import iconeChat from '../assets/ChatIcon.png';
import iconeConfig from '../assets/pessoa.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeVeterinarianTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeVeterinarian" component={VeteScreen} />
    {/* Aliases para compatibilidade com VeteScreen dentro de diferentes navegadores */}
    <Stack.Screen name="DetalhesConsulta" component={DetalhesConsultaScreen} />
    <Stack.Screen name="Agendamento" component={AgendamentoScreen} />
    {/* Mantém nomes antigos se algum fluxo ainda referenciar */}
    <Stack.Screen name="DetalhesConsultaScreen" component={DetalhesConsultaScreen} />
    <Stack.Screen name="AgendamentoScreen" component={AgendamentoScreen} />
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
    <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    <Stack.Screen name="WorkHoursScreen" component={WorkHoursScreen} />
    <Stack.Screen name="PaymentMethodsScreen" component={PaymentMethodsScreen} />
    <Stack.Screen name="PrivacySettingsScreen" component={PrivacySettingsScreen} />
    <Stack.Screen name="AppearanceSettingsScreen" component={AppearanceSettingsScreen} />
    <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
  </Stack.Navigator>
);

const VeterinarianTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={Colors.gradientPrimary}
            style={{ flex: 1 }}
          />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = iconeHome;
          } else if (route.name === 'Agenda') {
            iconName = iconeAgenda;
          } else if (route.name === 'Minhas Consultas') {
            iconName = iconeVeterinario;
          } else if (route.name === 'Chat') {
            iconName = iconeChat;
          } else if (route.name === 'Configurações') {
            iconName = iconeConfig;
          }
          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
      })}
    >
      {/* Ordem ajustada: Home, Agenda, Minhas Consultas, Chat, Configurações */}
      <Tab.Screen name="Home" component={HomeVeterinarianTabStack} />
      <Tab.Screen name="Agenda" component={AgendaVeterinarianTabStack} />
      <Tab.Screen name="Minhas Consultas" component={MinhasConsultasStack} />
      <Tab.Screen name="Chat" component={ChatVeterinarianTabStack} />
      <Tab.Screen name="Configurações" component={ConfigurationVeterinarianTabStack} />
    </Tab.Navigator>
  );
};

export default VeterinarianTabNavigator;