import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useChatContext } from '../context/ChatContext';

const UserChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { clientName, chatId } = route.params;
  const { chats, updateChatMessages } = useChatContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <FontAwesome name="user-circle" size={24} color={Colors.white} style={{ marginRight: 10 }} />
          <Text style={styles.headerTitleText}>{clientName}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.white,
    });
  }, [navigation, clientName]);

  useEffect(() => {
    if (chatId && chats[chatId]) {
      setMessages(chats[chatId].messages);
    }
  }, [chatId, chats]);

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    if (chatId) {
      updateChatMessages(chatId, GiftedChat.append(messages, newMessages));
    }
  }, [chatId, messages, updateChatMessages]);

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
                borderBottomLeftRadius: 2,
              },
              right: {
                backgroundColor: Colors.primary,
                borderBottomRightRadius: 2,
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
            <FontAwesome name="paper-plane" size={22} color={Colors.primary} />
          </Send>
        )}
        textInputStyle={styles.textInput}
        messagesContainerStyle={styles.messagesContainer}
        renderAvatar={null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  messagesContainer: {
    backgroundColor: Colors.background,
  },
  inputToolbar: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: Platform.OS === 'ios' ? 0 : 5,
  },
  textInput: {
    color: Colors.dark,
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 5,
    fontSize: 15,
    lineHeight: 18,
    flex: 1,
  },
  sendButtonContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
});

export default UserChatScreen;