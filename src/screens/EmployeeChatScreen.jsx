import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../Utils/Theme';
import { useNavigation } from '@react-navigation/native';
import { ChatContext } from '../context/ChatContext';

const EmployeeChatScreen = () => {
  const { chats, sendMessage, markChatRead } = useContext(ChatContext);
  const navigation = useNavigation();
  const employeeChatId = 'employee_user_chat';
  const chatPartnerInfo = { id: 'user_id', name: 'Usuário' };

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

  const quickAction = (type) => {
    if (type === 'marcar') {
      sendMessage(employeeChatId, chatPartnerInfo, 'Consulta marcada. Confirma presença?', 'employee');
    }
    if (type === 'retorno') {
      sendMessage(employeeChatId, chatPartnerInfo, 'Vamos agendar um retorno? Quais horários prefere?', 'employee');
    }
    if (type === 'agendar') {
      markChatRead(employeeChatId);
      navigation.navigate('Agendamento');
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
        colors={Colors.gradientPrimary}
        style={styles.headerGradient}
      >
        <View style={styles.headerRow}>
          <Image source={{ uri: currentChat.chatPartnerInfo?.avatar }} style={styles.headerAvatar} />
          <View style={styles.headerTextCol}>
            <Text style={styles.headerTitle}>Chat com {chatPartnerInfo.name}</Text>
            <Text style={styles.headerSubtitle}>Ativo agora</Text>
          </View>
        </View>
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
      <View style={styles.quickActionsRow}>
        <TouchableOpacity style={styles.quickButton} onPress={() => quickAction('marcar')}>
          <FontAwesome name="calendar" size={16} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => quickAction('retorno')}>
          <FontAwesome name="refresh" size={16} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => quickAction('agendar')}>
          <FontAwesome name="plus" size={16} color={Colors.white} />
        </TouchableOpacity>
      </View>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.lightGray,
  },
  headerTextCol: {
    flexDirection: 'column',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
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
    elevation: 2,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  employeeMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef2ff',
    borderTopLeftRadius: 5,
    marginRight: 40,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#8b5cf6',
    borderTopRightRadius: 5,
    marginLeft: 40,
  },
  messageText: {
    fontSize: 16,
    color: '#1f1f1f',
  },
  messageTime: {
    fontSize: 12,
    color: '#6B7280',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingTop: 6,
    gap: 8,
  },
  quickButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
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
    color: Colors.darkGray,
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
    backgroundColor: Colors.white,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
});

export default EmployeeChatScreen;
