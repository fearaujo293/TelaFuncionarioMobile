import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentMethodsScreen = () => {
    const navigation = useNavigation();
    const [paymentMethods, setPaymentMethods] = useState([
        { id: '1', type: 'credit_card', last4: '1234', brand: 'Visa', isDefault: true },
        { id: '2', type: 'paypal', email: 'user@example.com', isDefault: false },
    ]);

    const renderPaymentMethod = ({ item }) => (
        <View style={styles.paymentMethodItem}>
            <Icon
                name={item.type === 'credit_card' ? 'credit-card' : 'paypal'}
                size={24}
                color="#A367F0"
                style={styles.paymentIcon}
            />
            <View style={styles.paymentDetails}>
                {item.type === 'credit_card' ? (
                    <Text style={styles.paymentText}>{item.brand} **** {item.last4}</Text>
                ) : (
                    <Text style={styles.paymentText}>PayPal ({item.email})</Text>
                )}
                {item.isDefault && <Text style={styles.defaultBadge}>Padrão</Text>}
            </View>
            <TouchableOpacity onPress={() => handleEditPaymentMethod(item.id)} style={styles.editButton}>
                <Icon name="edit" size={18} color="#8E8E93" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeletePaymentMethod(item.id)} style={styles.deleteButton}>
                <Icon name="trash-alt" size={18} color="#D9534F" />
            </TouchableOpacity>
        </View>
    );

    const handleAddPaymentMethod = () => {
        navigation.navigate('AddPaymentMethodScreen');
    };

    const handleEditPaymentMethod = (id) => {
        navigation.navigate('EditPaymentMethodScreen', { id });
    };

    const handleDeletePaymentMethod = (id) => {
        Alert.alert(
            'Excluir Método de Pagamento',
            'Tem certeza que deseja excluir este método de pagamento?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', onPress: () => {
                    setPaymentMethods(prev => prev.filter(method => method.id !== id));
                    Alert.alert('Sucesso', 'Método de pagamento excluído.');
                }, style: 'destructive' },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <LinearGradient colors={['#A367F0', '#6D52E8']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Métodos de Pagamento</Text>
            </LinearGradient>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Seus Métodos</Text>
                {paymentMethods.length > 0 ? (
                    <FlatList
                        data={paymentMethods}
                        renderItem={renderPaymentMethod}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                ) : (
                    <Text style={styles.noMethodsText}>Nenhum método de pagamento adicionado.</Text>
                )}
                <TouchableOpacity style={styles.addButton} onPress={handleAddPaymentMethod}>
                    <Icon name="plus-circle" size={20} color="#FFF" style={styles.addIcon} />
                    <Text style={styles.addButtonText}>Adicionar Novo Método</Text>
                </TouchableOpacity>
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
    paymentMethodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
    },
    paymentIcon: {
        marginRight: 15,
    },
    paymentDetails: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentText: {
        fontSize: 16,
        color: '#000',
    },
    defaultBadge: {
        marginLeft: 10,
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
        fontSize: 12,
        color: '#8E8E93',
    },
    editButton: {
        padding: 5,
        marginLeft: 10,
    },
    deleteButton: {
        padding: 5,
        marginLeft: 10,
    },
    noMethodsText: {
        textAlign: 'center',
        color: '#8E8E93',
        paddingVertical: 20,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#A367F0',
        padding: 15,
        borderRadius: 12,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    addIcon: {
        marginRight: 10,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentMethodsScreen;