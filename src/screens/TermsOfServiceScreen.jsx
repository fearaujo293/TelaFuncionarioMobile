import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsOfServiceScreen = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Termos de Serviço</Text>
            <Text style={styles.paragraph}>
                Bem-vindo aos Termos de Serviço do nosso aplicativo. Ao acessar ou usar nosso serviço, você concorda em cumprir e estar vinculado a estes termos.
            </Text>
            <Text style={styles.subtitle}>1. Aceitação dos Termos</Text>
            <Text style={styles.paragraph}>
                Ao usar o aplicativo, você reconhece que leu, entendeu e concorda em estar vinculado a estes Termos de Serviço.
            </Text>
            <Text style={styles.subtitle}>2. Alterações nos Termos</Text>
            <Text style={styles.paragraph}>
                Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. É sua responsabilidade verificar periodicamente as alterações.
            </Text>
            <Text style={styles.subtitle}>3. Sua Conta</Text>
            <Text style={styles.paragraph}>
                Você é responsável por manter a confidencialidade de sua conta e senha e por restringir o acesso ao seu dispositivo.
            </Text>
            <Text style={styles.paragraph}>
                Para mais detalhes, por favor, consulte a versão completa dos Termos de Serviço em nosso site.
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

export default TermsOfServiceScreen;