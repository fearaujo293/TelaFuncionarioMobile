import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatContext } from '../context/ChatContext';
import { Colors } from '../Utils/Theme';
import { FontAwesome } from '@expo/vector-icons';

const EmployeeChatsListScreen = () => {
  const { chats } = useContext(ChatContext);
  const navigation = useNavigation();

  // Convertendo o objeto de chats em um array para FlatList
  const chatList = Object.keys(chats).map(chatId => ({
    chatId,
    ...chats[chatId],
  }));

  const renderChatCard = ({ item }) => {
    const lastMessage = item.messages[item.messages.length - 1];
    const chatPartnerName = item.chatPartnerInfo?.name || 'Usuário Desconhecido';

    return (
      <TouchableOpacity
        style={styles.chatCard}
        onPress={() => navigation.navigate('EmployeeChatScreen', {
          chatId: item.chatId,
          chatPartnerInfo: item.chatPartnerInfo,
        })}
      >
        <View style={styles.chatCardContent}>
          <Text style={styles.chatPartnerName}>{chatPartnerName}</Text>
          {lastMessage && (
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage.text}
            </Text>
          )}
        </View>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Conversas</Text>
      </LinearGradient>
      {chatList.length > 0 ? (
        <FlatList
          data={chatList}
          keyExtractor={(item) => item.chatId}
          renderItem={renderChatCard}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyChatContainer}>
          <FontAwesome name="comments-o" size={80} color={Colors.lightGray} />
          <Text style={styles.emptyChatText}>Nenhuma conversa ativa no momento.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerGradient: {
    backgroundColor: Colors.primary,
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
  },
  listContent: {
    paddingVertical: 10,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chatCardContent: {
    flex: 1,
  },
  chatPartnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 5,
  },
  unreadBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyChatContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyChatText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default EmployeeChatsListScreen;