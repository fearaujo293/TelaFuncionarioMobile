import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Telas do usuário
import PetList from '../screens/PetList';
import AgendamentoScreen from '../screens/AgendamentoScreen.jsx';
import PetsScreen from '../screens/Petscreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import ConsultasScreen from '../screens/VeteScreen';
import DetalhesConsultaScreen from '../screens/DetalhesConsultaScreen';
import AdicionarPetScreen from '../screens/AdicionarPetScreen';
import PrincipalScreen from '../screens/PrincipalScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import UserChatScreen from '../screens/UserChatScreen';
import SecurityScreen from '../screens/SecurityScreen';

// Fluxo de agendamento
import ScheduleFormScreen from '../screens/ScheduleFormScreen';
import VeteSelectScreen from '../screens/VeteSelectScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SuccessScreen from '../screens/SuccessScreen';

// Ícones
import iconeHome from '../assets/icone.png';
import iconePet from '../assets/pet.png';
import iconeMao from '../assets/ChatIcon.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/vet_icon.png';
import { VeterinarianProvider } from '../context/VeterinarianContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const newHeaderOptions = {
  headerBackground: () => (
    <LinearGradient
      colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
      style={{ flex: 1 }}
    />
  ),
  headerTitleStyle: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Geologica_700Bold',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  headerBackVisible: true,
};

const slideTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

// Stack para Pets
function PetsStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...newHeaderOptions, ...slideTransition }}
    >
      <Stack.Screen
        name="PetList"
        component={PetList}
        options={{ title: 'Meus Pets' }}
      />
      <Stack.Screen
        name="AddPet"
        component={AdicionarPetScreen}
        options={{ title: 'Adicionar Pet' }}
      />
      <Stack.Screen
        name="PetDetails"
        component={PetsScreen}
        options={{ title: 'Detalhes do Pet' }}
      />
    </Stack.Navigator>
  );
}

// Stack para Home
function HomeTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen 
        name="HomeTab" 
        component={PrincipalScreen} 
        options={{ title: 'Home' }} 
      />
    </Stack.Navigator>
  );
}

// Stack para Chat
function ChatTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen 
        name="ChatsList" 
        component={ChatsListScreen} 
        options={{ title: 'Conversas' }} 
      />
      <Stack.Screen 
        name="UserChatScreen" 
        component={UserChatScreen} 
        options={({ route }) => ({ 
          title: route.params?.clientName || 'Chat',
          headerBackVisible: true,
        })} 
      />
    </Stack.Navigator>
  );
}

// Stack para Configurações
function ConfigurationTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen 
        name="ConfigurationTab" 
        component={ConfigurationScreen} 
        options={{ title: 'Configurações' }} 
      />
      <Stack.Screen 
        name="Security" 
        component={SecurityScreen} 
        options={{ title: 'Segurança' }} 
      />
    </Stack.Navigator>
  );
}

// Stack para Veterinário/Consultas
function ConsultasTabStack() {
  return (
    <VeterinarianProvider>
      <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
        <Stack.Screen
          name="Consultas"
          component={ConsultasScreen}
          options={{ title: 'Minhas Consultas' }}
        />
      <Stack.Screen
        name="Agendamento"
        component={AgendamentoScreen}
        options={{ 
          title: 'Agendar Consulta',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="ScheduleFormScreen"
        component={ScheduleFormScreen}
        options={{ 
          title: 'Detalhes do Agendamento',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="VeteSelectScreen"
        component={VeteSelectScreen}
        options={{ 
          title: 'Selecionar Veterinário',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={{ 
          title: 'Revisar Agendamento',
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ 
          title: 'Agendamento Concluído',
          headerBackVisible: false,
        }}
      />
        <Stack.Screen
          name="DetalhesConsulta"
          component={DetalhesConsultaScreen}
          options={{ 
            title: 'Detalhes da Consulta',
            headerBackVisible: true,
          }}
        />
      </Stack.Navigator>
    </VeterinarianProvider>
  );
}

// Navegação Principal com Tabs
function MainTabs({ route }) {
  const { initialTab } = route.params || {};

  return (
    <Tab.Navigator
      initialRouteName={initialTab || "Home"}
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
            style={{ flex: 1 }}
          />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={PetsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeHome}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat"
        component={ChatTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeMao}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Pets"
        component={HomeTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconePet}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Veterinario"
        component={ConsultasTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeVeterinario}
              style={{
                width: size + 8,
                height: size + 8,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Configurações"
        component={ConfigurationTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconePessoa}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AdminUserMainApp = ({ route }) => {
  return (
    <MainTabs route={route} />
  );
};

export default AdminUserMainApp;
