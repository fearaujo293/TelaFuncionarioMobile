import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Política de Privacidade</Text>
            <Text style={styles.paragraph}>
                Sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações.
            </Text>
            <Text style={styles.subtitle}>1. Coleta de Informações</Text>
            <Text style={styles.paragraph}>
                Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail e informações de perfil.
            </Text>
            <Text style={styles.subtitle}>2. Uso das Informações</Text>
            <Text style={styles.paragraph}>
                Usamos as informações coletadas para fornecer, manter e melhorar nossos serviços, processar suas transações e enviar comunicações.
            </Text>
            <Text style={styles.subtitle}>3. Compartilhamento de Informações</Text>
            <Text style={styles.paragraph}>
                Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para fornecer nossos serviços ou conforme exigido por lei.
            </Text>
            <Text style={styles.paragraph}>
                Para mais detalhes, por favor, consulte a versão completa da Política de Privacidade em nosso site.
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
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
        color: '#555',
    },
});

export default PrivacyPolicyScreen;