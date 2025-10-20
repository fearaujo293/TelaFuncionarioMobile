import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme'; // Assuming Colors.js exists in ../Utils

const EmployeeChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Olá! Como posso ajudar hoje?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Preciso de informações sobre a consulta do Rex.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Employee',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Digite sua mensagem..."
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: Colors.lightGray,
              },
              right: {
                backgroundColor: Colors.primary,
              },
            }}
            textStyle={{
              left: {
                color: Colors.dark,
              },
              right: {
                color: Colors.white,
              },
            }}
          />
        )}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbar}
            primaryStyle={{ alignItems: 'center' }}
          />
        )}
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={styles.sendButtonContainer}
          >
            <FontAwesome name="send" size={20} color={Colors.primary} style={styles.sendButtonIcon} />
          </Send>
        )}
        textInputStyle={styles.textInput}
        messagesContainerStyle={styles.messagesContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messagesContainer: {
    backgroundColor: Colors.background,
  },
  inputToolbar: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    paddingVertical: 5,
  },
  textInput: {
    color: Colors.dark,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 20, // Ensure text input aligns well
  },
  sendButtonContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  sendButtonIcon: {
    // No additional styles needed here, color is set in renderSend
  },
});

export default EmployeeChatScreen;