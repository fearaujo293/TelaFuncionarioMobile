import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Switch, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const VeterinarianConfigurationScreen = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [notifications, setNotifications] = useState({
        newAppointments: true,
    });
    const [isAvailable, setIsAvailable] = useState(true);

    useEffect(() => {
        const loadProfileImage = async () => {
            const savedImage = await AsyncStorage.getItem('veterinarianProfileImage');
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
            Alert.alert('Desculpe, precisamos de permissão para acessar sua galeria de fotos.');
            return;
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
            Alert.alert('Desculpe, precisamos de permissão para acessar sua câmera.');
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
        setProfileImage(result.assets[0].uri);
        await AsyncStorage.setItem('veterinarianProfileImage', result.assets[0].uri);
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
            <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
                <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
                    <Image source={profileImage ? { uri: profileImage } : require('../assets/vet_icon.png')} style={styles.avatar} />
                    <View style={styles.cameraIcon}>
                        <Icon name="camera" size={15} color="#FFF" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configurações do Veterinário</Text>
            </LinearGradient>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Perfil Profissional</Text>
                <MenuItem iconName="user-md" text="Editar Perfil" onPress={() => console.log('API call to edit veterinarian profile')} />
                <MenuItem iconName="stethoscope" text="Editar Especialidades" onPress={() => console.log('API call to edit specialties')} />
                <MenuItem iconName="star" text="Ver Avaliações" onPress={() => console.log('API call to get reviews')} />
                <MenuItem iconName="clinic-medical" text="Clínica/Consultório" onPress={() => console.log('API call to get clinic/office info')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Horários e Disponibilidade</Text>
                <MenuItem iconName="calendar-alt" text="Definir Horários de Atendimento" onPress={() => console.log('API call to set office hours')} />
                <MenuItem iconName="clock" text="Configurar Intervalos de Consulta" onPress={() => console.log('API call to set appointment intervals')} />
                <View style={styles.notificationOption}>
                    <Icon name="power-off" size={18} color={'#A367F0'} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Disponível para Agendamentos</Text>
                    <Switch
                        value={isAvailable}
                        onValueChange={setIsAvailable}
                        thumbColor={'#FFF'}
                        trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Consultas</Text>
                <MenuItem iconName="history" text="Histórico de Consultas" onPress={() => console.log('API call to get appointment history')} />
                <MenuItem iconName="chart-bar" text="Relatórios" onPress={() => console.log('API call to get reports')} />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notificações</Text>
                <View style={styles.notificationOption}>
                    <Icon name="bell" size={18} color={'#A367F0'} style={styles.menuIcon} />
                    <Text style={styles.menuText}>Nuevas Consultas</Text>
                    <Switch
                        value={notifications.newAppointments}
                        onValueChange={(value) => setNotifications(prev => ({ ...prev, newAppointments: value }))}
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

export default VeterinarianConfigurationScreen;