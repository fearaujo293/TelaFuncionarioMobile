import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Telas de Funcionários
import EmployeeDashboardScreen from '../screens/EmployeeDashboardScreen';
import EmployeeListScreen from '../screens/EmployeeListScreen';
import EmployeeChatScreen from '../screens/EmployeeChatScreen';
import AddEmployeeScreen from '../screens/AddEmployeeScreen'; // Importar a nova tela

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
      <Stack.Screen name="Dashboard" component={EmployeeDashboardScreen} options={{ title: 'Dashboard' }} />
    </Stack.Navigator>
  );
}

function EmployeeListStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="EmployeeList" component={EmployeeListScreen} options={{ title: 'Funcionários' }} />
      <Stack.Screen name="AddEmployee" component={AddEmployeeScreen} options={{ title: 'Adicionar Funcionário' }} />
    </Stack.Navigator>
  );
}

function EmployeeChatStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="EmployeeChat" component={EmployeeChatScreen} options={{ title: 'Chat' }} />
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

const EmployeeMainApp = ({ route }) => {
  return (
    <EmployeeMainTabs route={route} />
  );
};

export default EmployeeMainApp;