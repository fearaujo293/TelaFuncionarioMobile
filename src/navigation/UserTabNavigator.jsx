import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { ThemeProvider, useAppTheme } from '../context/ThemeContext';
import AdminDashboardUsuario from '../screens/AdminDashboardUsuario';
import AgendaScreen from '../screens/AgendaScreen';
import AgendamentoScreen from '../screens/AgendamentoScreen';
import ScheduleFormScreen from '../screens/ScheduleFormScreen';
import VeteSelectScreen from '../screens/VeteSelectScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SuccessScreen from '../screens/SuccessScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';
import UserChatScreen from '../screens/UserChatScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import SecurityScreen from '../screens/SecurityScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsSettingsScreen from '../screens/NotificationsSettingsScreen';
import PrivacySettingsScreen from '../screens/PrivacySettingsScreen';
import AppearanceSettingsScreen from '../screens/AppearanceSettingsScreen';
import HelpSupportScreen from '../screens/HelpSupportScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangeEmailScreen from '../screens/ChangeEmailScreen';
import AboutAppScreen from '../screens/AboutAppScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import PetList from '../screens/PetList';
import PrincipalScreen from '../screens/PrincipalScreen';
import ConsultasScreen from '../screens/AdminConsultasScreen';
import DetalhesConsultaScreen from '../screens/DetalhesConsultaScreen';
import TelaHistoricoConsultas from '../screens/TelaHistoricoConsultas';
import WorkScheduleScreen from '../screens/WorkScheduleScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import EditSpecialtiesScreen from '../screens/EditSpecialtiesScreen';
import ViewReviewsScreen from '../screens/ViewReviewsScreen';
import ClinicOfficeScreen from '../screens/ClinicOfficeScreen';
import SetServiceHoursScreen from '../screens/SetServiceHoursScreen';
import ConfigureConsultationIntervalsScreen from '../screens/ConfigureConsultationIntervalsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';

// Ícones personalizados
import iconeAgenda from '../assets/CalendarioIcon.png';
import iconeChat from '../assets/ChatIcon.png';
import icone from '../assets/icone.png';
import iconePet from '../assets/pet.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/vet_icon.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const newHeaderOptions = (colors) => ({
  headerBackground: () => (
    <LinearGradient colors={colors.gradientPrimary} style={{ flex: 1 }} />
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
})

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

function HomeUserTabStack() {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions(colors), ...slideTransition, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="Principal" component={PrincipalScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

function ConsultasUserTabStack() {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions(colors), ...slideTransition, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="MinhasConsultas" component={TelaHistoricoConsultas} options={{ title: 'Minhas Consultas' }} />
      <Stack.Screen name="DetalhesConsulta" component={DetalhesConsultaScreen} options={{ title: 'Detalhes da Consulta', headerBackVisible: true, headerLeft: undefined }} />
    </Stack.Navigator>
  );
}

function ChatUserTabStack() {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions(colors), ...slideTransition, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="ChatsList" component={ChatsListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="UserChatScreen" component={UserChatScreen} options={({ route }) => ({ title: route.params?.clientName || 'Chat', headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

function ConfigurationUserTabStack() {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions(colors), ...slideTransition, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="Configuration" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Editar Perfil', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} options={{ title: 'Notificações', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={{ title: 'Privacidade', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="AppearanceSettings" component={AppearanceSettingsScreen} options={{ title: 'Aparência', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ title: 'Ajuda e Suporte', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ title: 'Mudar Senha', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ChangeEmailScreen" component={ChangeEmailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PetList" component={PetList} options={{ title: 'Meus Pets', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="WorkSchedule" component={WorkScheduleScreen} options={{ title: 'Horário de Trabalho', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: 'Métodos de Pagamento', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="EditSpecialties" component={EditSpecialtiesScreen} options={{ title: 'Editar Especialidades', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="ViewReviews" component={ViewReviewsScreen} options={{ title: 'Ver Avaliações', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="ClinicOffice" component={ClinicOfficeScreen} options={{ title: 'Clínica/Consultório', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="SetServiceHours" component={SetServiceHoursScreen} options={{ title: 'Definir Horários de Atendimento', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="ConfigureConsultationIntervals" component={ConfigureConsultationIntervalsScreen} options={{ title: 'Configurar Intervalos de Consulta', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: 'Relatórios', headerBackVisible: true, headerLeft: undefined }} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ title: 'Excluir Conta', headerBackVisible: true, headerLeft: undefined }} />
        </Stack.Navigator>
  );
}

function AgendaUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
      <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ title: 'Agendar Consulta', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ScheduleFormScreen" component={ScheduleFormScreen} options={{ title: 'Detalhes do Agendamento', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="VeteSelectScreen" component={VeteSelectScreen} options={{ title: 'Selecionar Veterinário', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ title: 'Revisar Agendamento' }} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ title: 'Agendamento Concluído' }} />
    </Stack.Navigator>
  );
}

// Removido PetsUserTabStack; a aba Agenda permanece como original

const UserTabNavigator = () => {
  const { colors } = useAppTheme();
  return (
    <ThemeProvider scope="user">
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient colors={colors.gradientPrimary} style={{ flex: 1 }} />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Agenda"
        component={AgendaUserTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={icone}
              style={{
                width: size * 1.2,
                height: size * 1.2,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Minhas Consultas"
        component={ConsultasUserTabStack}
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
      />

      <Tab.Screen
        name="Principal"
        component={PrincipalScreen}
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
        name="Chat"
        component={ChatUserTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeChat}
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
        name="Configurações"
        component={ConfigurationUserTabStack}
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
    </ThemeProvider>
  );
};

export default UserTabNavigator;