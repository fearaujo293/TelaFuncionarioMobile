import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Suas telas originais
import PetList from '../screens/PetList';
import AgendamentoScreen from '../screens/AgendamentoScreen.jsx';
import PetsScreen from '../screens/Petscreen';  // Tela de detalhes do pet
import ConfigurationScreen from '../screens/ConfigurationScreen';
import ConsultasScreen from '../screens/VeteScreen';
import DetalhesConsultaSharedScreen from '../screens/DetalhesConsultaSharedScreen';
import AdicionarPetScreen from '../screens/AdicionarPetScreen'; // Nova tela de adicionar pet
import PrincipalScreen from '../screens/PrincipalScreen'; // Importando PrincipalScreen
import AdminConsultasScreen from '../screens/AdminConsultasScreen';
import ChatScreen from '../screens/ChatScreen';

// Novas telas do fluxo de agendamento
import ScheduleFormScreen from '../screens/ScheduleFormScreen';
import VeteSelectScreen from '../screens/VeteSelectScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SuccessScreen from '../screens/SuccessScreen';

// Ícones personalizados
import iconeHome from '../assets/icone.png';
import iconePet from '../assets/pet.png';
import iconeMao from '../assets/Chat.png.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/veterinario.png';

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
  headerBackVisible: false,
  headerLeft: () => null,
};

// Configurações de transição suave
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

// Stack interno para a aba Pets (lista, adicionar, detalhes)
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
      {/* Removido AgendamentoScreen daqui */}
      <Stack.Screen
        name="PetDetails"
        component={PetsScreen}
        options={{ title: 'Detalhes do Pet' }}
      />
    </Stack.Navigator>
  );
}

function HomeTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="HomeTab" component={PrincipalScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

function ChatTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ChatsList" component={require('../screens/ChatsListScreen').default} options={{ title: 'Conversas' }} />
      <Stack.Screen name="Chat" component={require('../screens/ChatScreen').default} options={({ route }) => ({ title: route.params?.vet?.name || 'Chat', headerBackVisible: true, headerLeft: undefined })} />
      <Stack.Screen name="UserChatScreen" component={require('../screens/UserChatScreen').default} options={({ route }) => ({ title: route.params?.clientName || 'Chat', headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

function ConfigurationTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ConfigurationTab" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="Security" component={require('../screens/SecurityScreen').default} options={{ title: 'Segurança' }} />
    </Stack.Navigator>
  );
}

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
        headerShown: false, // Cabeçalho está dentro das stacks quando necessário
        tabBarShowLabel: false, // Somente ícones
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeVeterinario}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {() => (
          <Stack.Navigator
            screenOptions={newHeaderOptions}
            initialRouteName="Consultas" // Explicitly set initial route
          >
            <Stack.Screen
              name="Consultas"
              component={ConsultasScreen}
              options={{ title: 'Minhas Consultas' }}
            />
            <Stack.Screen
              name="Agendamento"
              component={AgendamentoScreen}
              options={{ title: 'Agendar Consulta', headerBackVisible: true, headerLeft: undefined }}
            />
            <Stack.Screen
              name="ScheduleFormScreen"
              component={ScheduleFormScreen}
              options={{ title: 'Detalhes do Agendamento', headerBackVisible: true, headerLeft: undefined }}
            />
            <Stack.Screen
              name="VeteSelectScreen"
              component={VeteSelectScreen}
              options={{ title: 'Selecionar Veterinário', headerBackVisible: true, headerLeft: undefined }}
            />
            <Stack.Screen
              name="ReviewScreen"
              component={ReviewScreen}
              options={{ title: 'Revisar Agendamento' }}
            />
            <Stack.Screen
              name="SuccessScreen"
              component={SuccessScreen}
              options={{ title: 'Agendamento Concluído' }}
            />
            <Stack.Screen
              name="DetalhesConsulta"
              component={DetalhesConsultaSharedScreen}
              options={{ title: 'Detalhes da Consulta', headerBackVisible: true, headerLeft: undefined }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

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