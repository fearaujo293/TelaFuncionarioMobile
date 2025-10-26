import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeServicesScreen from '../screens/EmployeeServicesScreen';
import EmployeeChatScreen from '../screens/EmployeeChatScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import EmployeeChatsListScreen from '../screens/EmployeeChatsListScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();
const ChatStack = createStackNavigator();

const ChatFlow = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatStack.Screen name="EmployeeChatsList" component={EmployeeChatsListScreen} />
    <ChatStack.Screen name="EmployeeChatScreen" component={EmployeeChatScreen} />
  </ChatStack.Navigator>
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
        component={EmployeeServicesScreen}
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
        component={ConfigurationScreen}
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