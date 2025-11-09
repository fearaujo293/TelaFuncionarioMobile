import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Switch, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const AdminConfigurationScreen = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [notifications, setNotifications] = useState({
        systemAlerts: true,
    });
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    useEffect(() => {
        const loadProfileImage = async () => {
            const savedImage = await AsyncStorage.getItem('adminProfileImage');
            if (savedImage) {
                setProfileImage(savedImage);
            }
        };
        loadProfileImage();
    }, []);

    useEffect(() => {
        console.log('Notification settings changed:', notifications);
    }, [notifications]);

    const pickImage = async () => {
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryStatus !== 'granted') {
          Alert.alert('Permissão necessária', 'Desculpe, precisamos de permissão para acessar sua galeria de fotos.');
          return;
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          Alert.alert('Permissão necessária', 'Desculpe, precisamos de permissão para acessar sua câmera.');
          return;
        }

        try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setProfileImage(imageUri);
        await AsyncStorage.setItem('adminProfileImage', imageUri);
        // Simulate API call
        console.log("Uploading image to the server: ", imageUri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      // Handle error (e.g., show a notification to the user)
    }
    };

    const MenuItem = ({ iconName, text, onPress, isDanger = false }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <Icon name={iconName} size={18} color={isDanger ? '#D9534F' : '#A367F0'} style={styles.menuIcon} />
            <Text style={[styles.menuText, isDanger && styles.dangerText]}>{text}</Text>
            <Icon name="chevron-right" size={16} color="#C7C7CD" />
        </TouchableOpacity>
    );

    const handleLogout = () => {
        Alert.alert(
          "Sair",
          "Tem certeza que deseja sair?",
          [
            {
              text: "Cancelar",
              style: "cancel"
            },
            { text: "Sair", onPress: () => {
          console.log("Cleaning up session...");
          navigation.navigate('Login');
        } }
      ]
        );
    };

    const handleResetSystem = () => {
        Alert.alert(
          "Resetar Sistema",
          "Tem certeza que deseja resetar o sistema? Todos os dados serão perdidos.",
          [
            {
              text: "Cancelar",
              style: "cancel"
            },
            { text: "Resetar", onPress: () => console.log("API call to reset system"), style: "destructive" }
          ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#A367F0', '#D9534F']} style={styles.header}>
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                    <Image source={profileImage ? { uri: profileImage } : require('../assets/pessoa.png')} style={styles.avatar} />
                    <View style={styles.cameraIcon}>
                        <Icon name="camera" size={15} color="#FFF" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações do Administrador</Text>
            </LinearGradient>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Administrador</Text>
                <MenuItem iconName="user-cog" text="Editar Perfil" onPress={() => navigation.navigate('EditProfile')} />
          <MenuItem iconName="clock" text="Horário de Trabalho" onPress={() => navigation.navigate('WorkHours')} />
          <MenuItem iconName="credit-card" text="Métodos de Pagamento" onPress={() => navigation.navigate('PaymentMethods')} />
                <MenuItem iconName="user-shield" text="Permissões Admin" onPress={() => console.log('API call to manage admin permissions')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Gerenciamento de Usuários</Text>
                <MenuItem iconName="users" text="Listar Usuários" onPress={() => console.log('API call to list users')} />
                <MenuItem iconName="user-plus" text="Adicionar Usuário" onPress={() => console.log('API call to add user')} />
                <MenuItem iconName="user-tie" text="Gerenciar Funcionários" onPress={() => console.log('API call to manage employees')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sistema</Text>
                <MenuItem iconName="database" text="Backup de Dados" onPress={() => console.log('API call to backup data')} />
                <MenuItem iconName="file-alt" text="Logs do Sistema" onPress={() => console.log('API call to view system logs')} />
                <MenuItem iconName="server" text="Status do Servidor" onPress={() => console.log('API call to check server status')} />
                <View style={styles.notificationOption}>
                    <Icon name="tools" size={18} color={'#A367F0'} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Modo Manutenção</Text>
                    <Switch
                        value={maintenanceMode}
                        onValueChange={setMaintenanceMode}
                        thumbColor={'#FFF'}
                        trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Relatórios</Text>
                <MenuItem iconName="chart-pie" text="Relatório Geral" onPress={() => console.log('API call to generate general report')} />
                <MenuItem iconName="file-export" text="Exportar Dados" onPress={() => console.log('API call to export data')} />
                <MenuItem iconName="analytics" text="Análise de Uso" onPress={() => console.log('API call for usage analysis')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Configurações Gerais</Text>
                <MenuItem iconName="cogs" text="Configurações do App" onPress={() => console.log('API call to manage app settings')} />
                <MenuItem iconName="palette" text="Temas e Aparência" onPress={() => console.log('API call to manage themes')} />
                <MenuItem iconName="envelope-open-text" text="Email e Notificações" onPress={() => console.log('API call to manage email and notifications')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notificações</Text>
                <View style={styles.notificationOption}>
                    <Icon name="bell" size={18} color={'#A367F0'} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Alertas do Sistema</Text>
                    <Switch
                        value={notifications.systemAlerts}
                        onValueChange={(value) => setNotifications(prev => ({ ...prev, systemAlerts: value }))}
                        thumbColor={'#FFF'}
                        trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Segurança</Text>
                <MenuItem iconName="lock" text="Mudar Senha" onPress={() => navigation.navigate('ChangePasswordScreen')} />
                <MenuItem iconName="envelope" text="Mudar Email" onPress={() => navigation.navigate('ChangeEmailScreen')} />
                <MenuItem iconName="shield-alt" text="Autenticação de 2 Fatores" onPress={() => {}} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Suporte</Text>
                <MenuItem iconName="question-circle" text="Central de Ajuda" onPress={() => {}} />
                <MenuItem iconName="bug" text="Reportar Bug" onPress={() => {}} />
                <MenuItem iconName="info-circle" text="Sobre o Sistema" onPress={() => {}} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Conta</Text>
                <MenuItem iconName="sign-out-alt" text="Sair" onPress={handleLogout} isDanger />
                <MenuItem iconName="exclamation-triangle" text="Resetar Sistema" onPress={handleResetSystem} isDanger />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        padding: 20,
        paddingTop: 50,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FFF',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#A367F0',
        padding: 8,
        borderRadius: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    section: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8E8E93',
        marginBottom: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
    },
    menuIcon: {
        marginRight: 15,
        width: 20,
        textAlign: 'center',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    dangerText: {
        color: '#D9534F',
    },
    notificationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
});

export default AdminConfigurationScreen;