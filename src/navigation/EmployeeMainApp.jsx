import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EmployeeServicesScreen from '../screens/EmployeeServicesScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { heightPixel, widthPixel } from '../Utils/Responsive';

const Stack = createStackNavigator();

const EmployeeMainApp = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackground: () => (
          <LinearGradient
            colors={['#A367F0', '#8D7EFB']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        ),
        headerTitleStyle: { color: '#fff', fontSize: widthPixel(20) },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="EmployeeServices"
        component={EmployeeServicesScreen}
        options={{ headerTitle: 'Dashboard do Funcionário' }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeMainApp;