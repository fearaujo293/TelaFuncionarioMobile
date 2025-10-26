import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '../Utils/Theme';

const chatData = [
  { id: '1', clientName: 'João Silva', lastMessage: 'Olá, gostaria de agendar um horário.', time: '10:30' },
  { id: '2', clientName: 'Maria Souza', lastMessage: 'Qual a disponibilidade para amanhã?', time: 'Ontem' },
  { id: '3', clientName: 'Pedro Lima', lastMessage: 'Obrigado pelo atendimento!', time: '2 dias atrás' },
  { id: '4', clientName: 'Ana Costa', lastMessage: 'Preciso reagendar minha consulta.', time: '3 dias atrás' },
];

const AdminAllChatsScreen = ({ navigation }) => {
  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatCard} onPress={() => navigation.navigate('UserChatScreen', { clientName: item.clientName })}>
      <View>
        <Text style={styles.clientName}>{item.clientName}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos os Chats</Text>
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Geologica_700Bold',
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  chatCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    paddingVertical: 10, // Added vertical padding
    marginBottom: 20, // Increased spacing between cards
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clientName: {
    fontSize: 20,
    fontFamily: 'Geologica_600SemiBold',
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 16,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
  },
  time: {
    fontSize: 14,
    fontFamily: 'Geologica_400Regular',
    color: Colors.textSecondary,
  },
});

export default AdminAllChatsScreen;