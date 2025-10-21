import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../Utils/Theme';
import { useNavigation, useRoute } from '@react-navigation/native';

const UserChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { clientName } = route.params;

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
    setMessages([
      {
        _id: 1,
        text: `Olá! Em que posso ajudar o ${clientName} hoje?`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Funcionário',
        },
      },
    ]);
  }, [clientName]);

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
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    backgroundColor: Colors.background,
  },
  inputToolbar: {
    backgroundColor: Colors.white,
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: Platform.OS === 'ios' ? 0 : 5,
  },
  textInput: {
    color: Colors.dark,
    backgroundColor: Colors.lightGray,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
  },
  sendButtonContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    backgroundColor: Colors.lightBlue,
    borderRadius: 24,
  },
});

export default UserChatScreen;