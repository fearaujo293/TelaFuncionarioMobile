import React, { useContext, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChatContext } from '../context/ChatContext';
import { Colors } from '../Utils/Theme';
import { FontAwesome } from '@expo/vector-icons';

const EmployeeChatsListScreen = () => {
  const { chats } = useContext(ChatContext);
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  // Convertendo o objeto de chats em um array para FlatList
  const chatList = useMemo(() => {
    const arr = Object.keys(chats).map(chatId => ({ chatId, ...chats[chatId] }));
    return arr
      .filter((c) => (c.chatPartnerInfo?.name || '').toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (b.unreadCount || 0) - (a.unreadCount || 0));
  }, [chats, query]);

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
        colors={Colors.gradientPrimary}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Conversas</Text>
      </LinearGradient>
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="Buscar por nome"
          placeholderTextColor={'#888'}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>
      {chatList.length > 0 ? (
        <FlatList
          data={chatList}
          keyExtractor={(item) => item.chatId}
          renderItem={renderChatCard}
          contentContainerStyle={styles.listContent}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => setRefreshing(false), 800);
          }}
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
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  searchWrapper: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 6,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGrayBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: Colors.darkGray,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  chatCardContent: {
    flex: 1,
  },
  chatPartnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
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
    color: '#6B7280',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default EmployeeChatsListScreen;