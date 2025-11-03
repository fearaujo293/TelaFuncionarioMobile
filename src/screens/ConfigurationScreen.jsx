import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Switch, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ConfigurationScreen = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [notifications, setNotifications] = useState({
        global: true,
        reminders: true,
    });

    useEffect(() => {
        const loadProfileImage = async () => {
            const savedImage = await AsyncStorage.getItem('profileImage');
            if (savedImage) {
                setProfileImage(savedImage);
            }
        };
        loadProfileImage();
    }, []);

    useEffect(() => {
        console.log('Notification settings changed:', notifications);
    }, [notifications]);

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

    const pickImage = async () => {
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaLibraryStatus !== 'granted') {
            Alert.alert('Permissão necessária', 'É necessário permitir o acesso à galeria para alterar a foto de perfil.');
            return;
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
            Alert.alert('Permissão necessária', 'É necessário permitir o acesso à câmera para alterar a foto de perfil.');
            return;
        }

        try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        await AsyncStorage.setItem('profileImage', result.assets[0].uri);
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

    const NotificationOption = ({ label, value, onValueChange, iconName }) => (
        <View style={styles.notificationOption}>
            <Icon name={iconName} size={18} color={'#A367F0'} style={styles.menuIcon} />
            <Text style={styles.menuText}>{label}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                thumbColor={'#FFF'}
                trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
            />
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#A367F0', '#6A5ACD']} style={styles.header}>
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                    <Image source={profileImage ? { uri: profileImage } : require('../assets/pet.png')} style={styles.avatar} />
                    <View style={styles.cameraIcon}>
                        <Icon name="camera" size={15} color="#FFF" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações</Text>
            </LinearGradient>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Perfil</Text>
                <MenuItem iconName="user-edit" text="Editar Perfil" onPress={() => console.log('API call to edit profile')} />
                <MenuItem iconName="camera" text="Alterar Foto de Perfil" onPress={pickImage} />
                <MenuItem iconName="paw" text="Meus Pets" onPress={() => navigation.navigate('PetList')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Segurança</Text>
                <MenuItem iconName="lock" text="Mudar Senha" onPress={() => navigation.navigate('ChangePasswordScreen')} />
                <MenuItem iconName="envelope" text="Mudar Email" onPress={() => navigation.navigate('ChangeEmailScreen')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notificações</Text>
                <NotificationOption
                    label="Ativar Notificações"
                    value={notifications.global}
                    onValueChange={(value) => setNotifications(prev => ({ ...prev, global: value }))}
                    iconName="bell"
                />
                <NotificationOption
                    label="Lembretes de Consultas"
                    value={notifications.reminders}
                    onValueChange={(value) => setNotifications(prev => ({ ...prev, reminders: value }))}
                    iconName="calendar-check"
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sobre</Text>
                <MenuItem iconName="info-circle" text="Sobre o App" onPress={() => console.log('API call to get app info')} />
                <MenuItem iconName="file-contract" text="Termos de Serviço" onPress={() => console.log('API call to get terms of service')} />
                <MenuItem iconName="user-secret" text="Política de Privacidade" onPress={() => console.log('API call to get privacy policy')} />
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

export default ConfigurationScreen;