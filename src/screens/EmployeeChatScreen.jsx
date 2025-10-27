import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { ChatContext } from '../context/ChatContext';

const EmployeeChatScreen = () => {
  const { chats, sendMessage, markChatRead } = useContext(ChatContext);
  const employeeChatId = 'employee_user_chat'; // Um ID fixo para o chat entre funcionário e usuário
  const chatPartnerInfo = { id: 'user_id', name: 'Usuário' }; // Informações do parceiro de chat (usuário)

  const currentChat = chats[employeeChatId] || { messages: [] };
  const messages = currentChat.messages;

  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
    markChatRead(employeeChatId);
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendMessage(employeeChatId, chatPartnerInfo, inputText.trim(), 'employee');
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.role === 'employee' ? styles.employeeMessage : styles.userMessage,
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time || new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Ajuste conforme necessário
    >
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Chat com {chatPartnerInfo.name}</Text>
      </LinearGradient>
      {messages.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        />
      ) : (
        <View style={styles.content}>
          <FontAwesome name="comments" size={80} color={Colors.lightGray} />
          <Text style={styles.emptyChatText}>Nenhuma conversa ativa no momento.</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Digite sua mensagem..."
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <FontAwesome name="paper-plane" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  messageList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 1,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  employeeMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGray,
    borderTopLeftRadius: 5,
    marginRight: 40,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderTopRightRadius: 5,
    marginLeft: 40,
  },
  messageText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  messageTime: {
    fontSize: 12,
    color: Colors.textSecondary,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  emptyChatText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 12,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: Colors.cardBackground,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmployeeChatScreen;