import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';

// Telas de Funcionários
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AdminListScreen from '../screens/AdminListScreen';
import AdminChatScreen from '../screens/AdminChatScreen';
import AddAdminScreen from '../screens/AddAdminScreen'; // Importar a nova tela
import UserListScreen from '../screens/UserListScreen'; // Import UserListScreen
import AllAppointmentsScreen from '../screens/AllAppointmentsScreen'; // Import AllAppointmentsScreen

import UserChatScreen from '../screens/UserChatScreen'; // Import UserChatScreen
import AdminConsultationsScreen from '../screens/AdminConsultationsScreen'; // Import AdminConsultationsScreen
import AdminAllChatsScreen from '../screens/AdminAllChatsScreen'; // Import AdminAllChatsScreen
import AdminReportsScreen from '../screens/AdminReportsScreen'; // Import AdminReportsScreen
import AdminConfigurationScreen from '../screens/AdminConfigurationScreen'; // Import AdminConfigurationScreen
import ChangePasswordScreen from '../screens/ChangePasswordScreen'; // Import ChangePasswordScreen
import ChangeEmailScreen from '../screens/ChangeEmailScreen'; // Import ChangeEmailScreen
import EditProfileScreen from '../screens/EditProfileScreen';
import WorkHoursScreen from '../screens/WorkHoursScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';

// Ícones personalizados (usando os existentes por enquanto)
import iconeHome from '../assets/icone.png'; // Para Dashboard
import iconePessoa from '../assets/pessoa.png'; // Para Funcionários
import iconeMao from '../assets/ChatIcon.png'; // Para Chat
import iconeCalendario from '../assets/CalendarioIcon.png'; // Para Agenda
import iconeVet from '../assets/vet_icon.png'; // Para Relatórios (temporário)

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const newHeaderOptions = {
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

function AdminDashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="UserListScreen" component={UserListScreen} options={{ title: 'Lista de Clientes', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="AllAppointmentsScreen" component={AllAppointmentsScreen} options={{ title: 'Todas as Consultas', headerBackVisible: true, headerLeft: undefined }} />

      <Stack.Screen name="AdminConsultations" component={AdminConsultationsScreen} options={{ title: 'Consultas', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="AdminAllChats" component={AdminAllChatsScreen} options={{ title: 'Todos os Chats', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="AdminListScreen" component={AdminListScreen} options={{ title: 'Funcionários', headerBackVisible: true, headerLeft: undefined }} />


    </Stack.Navigator>
  );
}

function AdminListStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminList" component={AdminListScreen} options={{ title: 'Funcionários' }} />
       <Stack.Screen name="AddAdmin" component={AddAdminScreen} options={{ title: 'Adicionar Administrador' }} />
    </Stack.Navigator>
  );
}

function AdminChatStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminChat" component={AdminChatScreen} options={{ title: 'Chat' }} />
      <Stack.Screen name="AdminAllChats" component={AdminAllChatsScreen} options={{ title: 'Todos os Chats', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="UserChatScreen" component={UserChatScreen} options={({ route }) => ({ title: route.params.clientName, headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

function AdminConfigurationStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminConfiguration" component={AdminConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Mudar Senha', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} options={{ title: 'Mudar Email', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Editar Perfil', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="WorkHours" component={WorkHoursScreen} options={{ title: 'Horário de Trabalho', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: 'Métodos de Pagamento', headerBackVisible: true, headerLeft: undefined }} />
    </Stack.Navigator>
  );
}

function AdminReportsStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AdminReports" component={AdminReportsScreen} options={{ title: 'Relatórios' }} />
    </Stack.Navigator>
  );
}

function AdminAgendaStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="AllAppointments" component={AllAppointmentsScreen} options={{ title: 'Agenda' }} />
    </Stack.Navigator>
  );
}

function AdminMainTabs({ route }) {
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
            colors={Colors.gradientPrimary}
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
        component={AdminDashboardStack}
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
        component={AdminListStack}
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
        component={AdminChatStack}
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
        name="AgendaTab"
        component={AdminAgendaStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeCalendario}
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
        name="ReportsTab"
        component={AdminReportsStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeVet}
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
        name="ConfigurationTab"
        component={AdminConfigurationStack}
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

const AdminApp = ({ route }) => {
  return (
    <AdminMainTabs route={route} />
  );
};

export default AdminApp;