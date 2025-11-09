import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeServicesScreen from '../screens/EmployeeServicesScreen';
import EmployeeChatScreen from '../screens/EmployeeChatScreen';
import EmployeeConfigurationScreen from '../screens/EmployeeConfigurationScreen';
import EmployeeChatsListScreen from '../screens/EmployeeChatsListScreen';
import TelaHistoricoConsultas from '../screens/TelaHistoricoConsultas';
import DetalhesConsultaScreen from '../screens/DetalhesConsultaScreen';
import AgendamentoScreen from '../screens/AgendamentoScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import WorkHoursScreen from '../screens/WorkHoursScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import AppearanceSettingsScreen from '../screens/AppearanceSettingsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();
const ChatStack = createStackNavigator();
const ServicesStack = createStackNavigator();
const Stack = createStackNavigator();

const ServicesFlow = () => (
  <ServicesStack.Navigator screenOptions={{ headerShown: false }}>
    <ServicesStack.Screen name="EmployeeServices" component={EmployeeServicesScreen} />
    <ServicesStack.Screen name="TelaHistoricoConsultas" component={TelaHistoricoConsultas} />
    <ServicesStack.Screen name="DetalhesConsultaScreen" component={DetalhesConsultaScreen} />
    <ServicesStack.Screen name="AgendamentoScreen" component={AgendamentoScreen} />
  </ServicesStack.Navigator>
);

const ChatFlow = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatStack.Screen name="EmployeeChatsList" component={EmployeeChatsListScreen} />
    <ChatStack.Screen name="EmployeeChatScreen" component={EmployeeChatScreen} />
  </ChatStack.Navigator>
);

const EmployeeConfigurationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="EmployeeConfiguration" component={EmployeeConfigurationScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="WorkHours" component={WorkHoursScreen} />
    <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
    <Stack.Screen name="AppearanceSettings" component={AppearanceSettingsScreen} />
    <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
  </Stack.Navigator>
);

const EmployeeMainApp = () => {
  return (
    <Tab.Navigator
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
      }}>
      <Tab.Screen
        name="Serviços"
        component={ServicesFlow}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="briefcase" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatFlow}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="comments" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Configurações"
        component={EmployeeConfigurationStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default EmployeeMainApp;