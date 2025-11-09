import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutAppScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Sobre o Aplicativo</Text>
            <Text style={styles.paragraph}>
                Bem-vindo ao nosso aplicativo! Nosso objetivo é fornecer a melhor experiência para você e seus pets.
                Estamos constantemente trabalhando para melhorar e adicionar novos recursos.
            </Text>
            <Text style={styles.paragraph}>
                Versão: 1.0.0
            </Text>
            <Text style={styles.paragraph}>
                Desenvolvido por: [Seu Nome/Empresa]
            </Text>
            <Text style={styles.paragraph}>
                Agradecemos por usar nosso aplicativo!
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2F2F7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
        color: '#555',
    },
});

export default AboutAppScreen;