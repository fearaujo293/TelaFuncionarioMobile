import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, CommonStyles } from '../Utils/Theme';
import { useChatContext } from '../context/ChatContext';

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const { chats } = useChatContext();

  const userChats = Object.entries(chats)
    .filter(([, chat]) => chat.type === 'user')
    .map(([chatId, chat]) => ({
      id: chatId,
      name: chat.partnerName,
      avatar: chat.partnerAvatar || require('../assets/veterinario.png'), // Default avatar
      lastMessage: chat.messages.length > 0 ? chat.messages[0].text : 'Nenhuma mensagem',
      time: chat.messages.length > 0 ? new Date(chat.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      unread: false, // Implement unread logic if needed
    }));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('UserChatScreen', { clientName: item.name, chatId: item.id })}
    >
      <Image source={item.avatar} style={styles.avatar} />
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
      <FlatList
        data={userChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
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
});

export default ChatsListScreen;