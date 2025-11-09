import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const AppearanceSettingsScreen = () => {
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const [textSize, setTextSize] = useState('medium'); // 'small', 'medium', 'large'

    const handleSave = () => {
        // Implement save logic here, e.g., update user preferences in AsyncStorage or API
        console.log('Appearance settings saved:', { darkMode, textSize });
        alert('Configurações de Aparência salvas!');
    };

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Aparência</Text>
            </LinearGradient>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tema</Text>
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Modo Escuro</Text>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        thumbColor={'#FFF'}
                        trackColor={{ false: '#C7C7CD', true: '#A367F0' }}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tamanho do Texto</Text>
                <View style={styles.textSizeOptions}>
                    <TouchableOpacity
                        style={[styles.textSizeButton, textSize === 'small' && styles.textSizeButtonActive]}
                        onPress={() => setTextSize('small')}
                    >
                        <Text style={[styles.textSizeButtonText, textSize === 'small' && styles.textSizeButtonTextActive]}>Pequeno</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.textSizeButton, textSize === 'medium' && styles.textSizeButtonActive]}
                        onPress={() => setTextSize('medium')}
                    >
                        <Text style={[styles.textSizeButtonText, textSize === 'medium' && styles.textSizeButtonTextActive]}>Médio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.textSizeButton, textSize === 'large' && styles.textSizeButtonActive]}
                        onPress={() => setTextSize('large')}
                    >
                        <Text style={[styles.textSizeButtonText, textSize === 'large' && styles.textSizeButtonTextActive]}>Grande</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
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
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    section: {
        marginTop: 10,
        marginHorizontal: 20,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#8E8E93',
        marginBottom: 10,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingText: {
        fontSize: 16,
        color: '#000',
    },
    textSizeOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    textSizeButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
    },
    textSizeButtonActive: {
        backgroundColor: '#A367F0',
    },
    textSizeButtonText: {
        color: '#000',
        fontSize: 14,
    },
    textSizeButtonTextActive: {
        color: '#FFF',
    },
    saveButton: {
        backgroundColor: '#A367F0',
        padding: 15,
        borderRadius: 12,
        marginHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AppearanceSettingsScreen;