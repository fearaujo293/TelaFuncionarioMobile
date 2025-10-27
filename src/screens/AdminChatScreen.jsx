import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const AdminChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { clientName, clientId } = route.params || {};

  const adminUser = {
    _id: 1, // ID do administrador logado
    name: 'Administrador', // Nome do administrador logado
    avatar: 'https://placeimg.com/140/140/admin',
  };

  const clientUser = {
    _id: clientId || 2, // ID do cliente
    name: clientName || 'Cliente Desconhecido', // Nome do cliente
    avatar: 'https://placeimg.com/140/140/client',
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <FontAwesome name="user-circle" size={24} color={Colors.white} style={{ marginRight: 10 }} />
          <Text style={styles.headerTitleText}>{clientName || 'Chat'}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.white,
    });
  }, [navigation, clientName]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Substitua YOUR_ACTUAL_API_BASE_URL pela sua URL base da API real
        const response = await fetch(`YOUR_ACTUAL_API_BASE_URL/chats/${clientId}/messages`);
        if (!response.ok) {
          throw new Error('Falha ao buscar mensagens.');
        }
        const data = await response.json();
        // Formate as mensagens para o formato do GiftedChat
        const formattedMessages = data.map(msg => ({
          _id: msg.id,
          text: msg.text,
          createdAt: new Date(msg.createdAt),
          user: msg.senderId === adminUser._id ? adminUser : clientUser,
        }));
        setMessages(formattedMessages.reverse()); // Mensagens mais recentes por último
      } catch (err) {
        console.error('Erro ao buscar mensagens:', err);
        setError('Não foi possível carregar as mensagens.');
        Alert.alert('Erro', 'Não foi possível carregar as mensagens.');
      } finally {
        setLoading(false);
      }
    };

    if (clientId) {
      fetchMessages();
    }
  }, [clientId]);

  const onSend = useCallback(async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    const messageToSend = newMessages[0];
    try {
      // Substitua YOUR_ACTUAL_API_BASE_URL pela sua URL base da API real
      const response = await fetch(`YOUR_ACTUAL_API_BASE_URL/chats/${clientId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: clientId,
          senderId: adminUser._id,
          receiverId: clientUser._id,
          text: messageToSend.text,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem.');
      }
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
      // Opcional: remover a mensagem da UI se o envio falhar
      setMessages(previousMessages => previousMessages.filter(msg => msg._id !== messageToSend._id));
    }
  }, [clientId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando mensagens...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.errorButton}>
          <Text style={styles.errorButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={adminUser}
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
        renderAvatar={null} // Oculta o avatar nas mensagens para um visual mais limpo
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
    marginBottom: Platform.OS === 'ios' ? 0 : 5, // Ajuste para Android
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
    backgroundColor: Colors.info, // Changed from Colors.lightBlue
    borderRadius: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.darkGray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  errorButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminChatScreen;