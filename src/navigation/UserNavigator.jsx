import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PrincipalScreen from '../screens/PrincipalScreen';
import DetalhesConsultaScreen from '../screens/DetalhesConsultaScreen';
import AdminConsultasScreen from '../screens/AdminConsultasScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Principal">
      <Stack.Screen
        name="Principal"
        component={PrincipalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalhesConsulta"
        component={DetalhesConsultaScreen}
        options={{ title: 'Detalhes da Consulta' }}
      />
      <Stack.Screen
        name="UserConsultas"
        component={AdminConsultasScreen}
        options={{ title: 'Minhas Consultas' }}
      />
      <Stack.Screen
        name="ChatsList"
        component={ChatsListScreen}
        options={{ title: 'Lista de Conversas' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.vet.name })}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;