import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Switch, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const EmployeeConfigurationScreen = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [notifications, setNotifications] = useState({
        taskAlerts: true,
    });
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        const loadProfileImage = async () => {
            const savedImage = await AsyncStorage.getItem('employeeProfileImage');
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
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'É necessário permitir o acesso à galeria para alterar a foto de perfil.');
            return;
        }

        try {
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibraryStatus !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar sua galeria de fotos.');
      return;
    }

    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
      alert('Desculpe, precisamos de permissão para acessar sua câmera.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        await AsyncStorage.setItem('employeeProfileImage', result.assets[0].uri);
        // Simulate API call
        console.log("Uploading image to the server: ", result.assets[0].uri);
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

    const handleDeleteAccount = () => {
        Alert.alert(
            "Excluir Conta",
            "Tem certeza que deseja excluir sua conta? Esta ação é irreversível.",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "Excluir", onPress: () => console.log("API call to delete account"), style: "destructive" }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={Colors.gradientPrimary} style={styles.header}>
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                    <Image source={profileImage ? { uri: profileImage } : require('../assets/pet.png')} style={styles.avatar} />
                    <View style={styles.cameraIcon}>
                        <Icon name="camera" size={15} color="#FFF" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações do Funcionário</Text>
            </LinearGradient>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Perfil</Text>
                <MenuItem iconName="user-edit" text="Editar Perfil" onPress={() => navigation.navigate('EditProfile')} />
                <MenuItem iconName="calendar-day" text="Horário de Trabalho" onPress={() => navigation.navigate('WorkHours')} />
                <MenuItem iconName="credit-card" text="Métodos de Pagamento" onPress={() => navigation.navigate('PaymentMethods')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Privacidade</Text>
                <MenuItem iconName="user-secret" text="Privacidade" onPress={() => navigation.navigate('PrivacySettings')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Aparência</Text>
                <MenuItem iconName="paint-brush" text="Aparência" onPress={() => navigation.navigate('AppearanceSettings')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Suporte</Text>
                <MenuItem iconName="question-circle" text="Ajuda e Suporte" onPress={() => navigation.navigate('HelpSupport')} />
                <View style={styles.notificationOption}>
                    <Icon name="toggle-on" size={18} color={'#A367F0'} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Status Online</Text>
                    <Switch
                        value={isAvailable}
                        onValueChange={setIsAvailable}
                        thumbColor={'#FFF'}
                        trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Desempenho</Text>
                <MenuItem iconName="chart-line" text="Meu Desempenho" onPress={() => console.log('API call to get performance data')} />
                <MenuItem iconName="comments" text="Avaliações e Feedback" onPress={() => console.log('API call to get reviews and feedback')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notificações</Text>
                <View style={styles.notificationOption}>
                    <Icon name="bell" size={18} color={'#A367F0'} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Alertas de Tarefas</Text>
                    <Switch
                        value={notifications.taskAlerts}
                        onValueChange={(value) => setNotifications(prev => ({ ...prev, taskAlerts: value }))}
                        thumbColor={'#FFF'}
                        trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Segurança</Text>
                <MenuItem iconName="lock" text="Mudar Senha" onPress={() => navigation.navigate('ChangePasswordScreen')} />
                <MenuItem iconName="envelope" text="Mudar Email" onPress={() => navigation.navigate('ChangeEmailScreen')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Conta</Text>
                <MenuItem iconName="sign-out-alt" text="Sair" onPress={handleLogout} isDanger />
                <MenuItem iconName="trash-alt" text="Excluir Conta" onPress={handleDeleteAccount} isDanger />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
        backgroundColor: Colors.white,
        borderRadius: 14,
        padding: 16,
        shadowColor: Colors.purple,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 12,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    menuIcon: {
        marginRight: 15,
        width: 20,
        textAlign: 'center',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    dangerText: {
        color: '#D9534F',
    },
    notificationOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
});

export default EmployeeConfigurationScreen;