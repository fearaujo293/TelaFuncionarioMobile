import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Telas de Funcionários
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AdminListScreen from '../screens/AdminListScreen';
import AdminChatScreen from '../screens/AdminChatScreen';
import AddAdminScreen from '../screens/AddAdminScreen'; // Importar a nova tela
import UserListScreen from '../screens/UserListScreen'; // Import UserListScreen
import AllAppointmentsScreen from '../screens/AllAppointmentsScreen'; // Import AllAppointmentsScreen
import NewAppointmentScreen from '../screens/NewAppointmentScreen'; // Import NewAppointmentScreen
import UserChatScreen from '../screens/UserChatScreen'; // Import UserChatScreen

// Ícones personalizados (usando os existentes por enquanto)
import iconeHome from '../assets/icone.png'; // Para Dashboard
import iconePessoa from '../assets/pessoa.png'; // Para Funcionários
import iconeMao from '../assets/Chat.png.png'; // Para Chat

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

function EmployeeDashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="UserListScreen" component={UserListScreen} options={{ title: 'Lista de Clientes', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="AllAppointmentsScreen" component={AllAppointmentsScreen} options={{ title: 'Todas as Consultas', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="NewAppointmentScreen" component={NewAppointmentScreen} options={{ title: 'Nova Consulta', headerBackVisible: true, headerLeft: undefined }} />
    </Stack.Navigator>
  );
}

function EmployeeListStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminList" component={AdminListScreen} options={{ title: 'Administradores' }} />
      <Stack.Screen name="AddAdmin" component={AddAdminScreen} options={{ title: 'Adicionar Administrador' }} />
    </Stack.Navigator>
  );
}

function EmployeeChatStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminChat" component={AdminChatScreen} options={{ title: 'Chat' }} />
      <Stack.Screen name="UserChatScreen" component={UserChatScreen} options={({ route }) => ({ title: route.params.clientName, headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

function EmployeeMainTabs({ route }) {
  const { initialTab } = route.params || {};

  return (
    <Tab.Navigator
      initialRouteName={initialTab || "DashboardTab"}
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
        name="DashboardTab"
        component={EmployeeDashboardStack}
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
        name="EmployeeListTab"
        component={EmployeeListStack}
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

      <Tab.Screen
        name="EmployeeChatTab"
        component={EmployeeChatStack}
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
    </Tab.Navigator>
  );
}

const AdminMainApp = ({ route }) => {
  return (
    <EmployeeMainTabs route={route} />
  );
};

export default AdminMainApp;