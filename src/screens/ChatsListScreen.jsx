import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, CommonStyles } from '../Utils/Theme';
import { useChatContext } from '../context/ChatContext';

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const { chats, createUserChat } = useChatContext();

  console.log('Chats disponíveis:', Object.keys(chats));
  
  const userChats = Object.entries(chats)
    .filter(([chatId]) => chatId.includes('employee')) // Para o usuário, listar veterinários
    .map(([chatId, chat]) => {
      const last = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
      return {
        id: chatId,
        name: chat.chatPartnerInfo?.name || 'Veterinário',
        avatar: chat.chatPartnerInfo?.avatar || require('../assets/vet_icon.png'), // Default avatar
        lastMessage: last ? last.text : 'Nenhuma mensagem',
        time: last ? new Date(last.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        // Para o usuário, considerar não lida quando a última mensagem é do veterinário
        unread: last ? last.role === 'employee' : false,
      };
    });

  const handleStartChat = () => {
    const { id, chatPartnerInfo } = createUserChat();
    navigation.navigate('UserChatScreen', { clientName: chatPartnerInfo.name, chatId: id });
  };

  console.log('Chats de usuários filtrados:', userChats);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('UserChatScreen', { clientName: item.name, chatId: item.id })}
    >
      <Image source={typeof item.avatar === 'string' ? { uri: item.avatar } : item.avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.rowBetween}>
            {item.unread && <View style={styles.unreadDot} />}
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
        <Text
          style={[styles.subtitle, item.unread && styles.unreadSubtitle]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {userChats.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Você não tem conversas ainda</Text>
          <Text style={styles.emptySubtitle}>Toque abaixo para iniciar um chat</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStartChat}>
            <Text style={styles.startButtonText}>Iniciar conversa</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={userChats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 12 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.veryLightPurple, paddingTop: 8 },
  itemContainer: {
    ...CommonStyles.card,
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.lightPurple,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  avatar: { width: 66, height: 66, borderRadius: 33, marginRight: 18 },
  textContainer: { flex: 1 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 17, fontWeight: 'bold', color: Colors.purple },
  time: { fontSize: 12, color: Colors.lightPurple },
  subtitle: { fontSize: 14, color: Colors.darkGray, marginTop: 6 },
  unreadSubtitle: { color: '#000', fontWeight: '600' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.bluePurple,
    marginRight: 6,
  },
  separator: { height: 1, backgroundColor: 'transparent' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: Colors.purple, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: Colors.darkGray, marginBottom: 16 },
  startButton: { backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 24 },
  startButtonText: { color: Colors.white, fontSize: 16, fontWeight: '600' },
});

export default ChatsListScreen;