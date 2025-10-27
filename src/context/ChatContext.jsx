import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChatContext = createContext();

export const useChatContext = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState({}); // { chatId: { messages: [...], unread: bool, chatPartnerInfo: {} } }

  // Carregar chats do storage na inicialização
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('chats');
        console.log('Chats carregados do storage:', stored);
        // Dados de exemplo (só usados quando não há nada no storage)
        const dummyChats = {
          'chat_user_1': {
            messages: [
              { id: '1', text: 'Olá, preciso de ajuda com meu pet.', sender: 'Usuário 1', role: 'user', timestamp: Date.now() - 60000 },
              { id: '2', text: 'Claro! Como posso ajudar?', sender: 'employee', role: 'employee', timestamp: Date.now() - 30000 },
            ],
            unread: false,
            chatPartnerInfo: { id: 'user_1', name: 'Usuário 1' },
          },
          'chat_user_2': {
            messages: [
              { id: '3', text: 'Minha consulta é amanhã, está confirmada?', sender: 'Usuário 2', role: 'user', timestamp: Date.now() - 90000 },
              { id: '4', text: 'Sim, está confirmada para as 10h.', sender: 'employee', role: 'employee', timestamp: Date.now() - 80000 },
            ],
            unread: true,
            chatPartnerInfo: { id: 'user_2', name: 'Usuário 2' },
          },
          'chat_user_3': {
            messages: [
              { id: '5', text: 'Gostaria de agendar um banho e tosa.', sender: 'Usuário 3', role: 'user', timestamp: Date.now() - 120000 },
              { id: '6', text: 'Para qual dia e horário seria?', sender: 'employee', role: 'employee', timestamp: Date.now() - 110000 },
              { id: '7', text: 'Na próxima terça, às 14h.', sender: 'Usuário 3', role: 'user', timestamp: Date.now() - 100000 },
            ],
            unread: false,
            chatPartnerInfo: { id: 'user_3', name: 'Usuário 3' },
          },
          'chat_user_4': {
            chatPartnerInfo: { id: 'user4', name: 'Ana Paula', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
            messages: [
              { id: '1', text: 'Olá, preciso de ajuda com um agendamento.', sender: 'user', role: 'user', timestamp: Date.now() - 120000 },
              { id: '2', text: 'Claro, qual o horário desejado?', sender: 'employee', role: 'employee', timestamp: Date.now() - 110000 }
            ],
            unreadCount: 0
          },
          'chat_employee_1': {
            chatPartnerInfo: { id: 'employee1', name: 'Carlos Silva', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
            messages: [
              { id: '1', text: 'Bom dia, alguma atualização sobre o caso do Rex?', sender: 'employee', role: 'employee', timestamp: Date.now() - 90000 },
              { id: '2', text: 'Sim, o Rex está se recuperando bem. A medicação está funcionando.', sender: 'user', role: 'user', timestamp: Date.now() - 80000 },
              { id: '3', text: 'Ótima notícia! Fico feliz em saber.', sender: 'employee', role: 'employee', timestamp: Date.now() - 70000 }
            ],
            unreadCount: 1
          },
          'chat_employee_2': {
            chatPartnerInfo: { id: 'employee2', name: 'Mariana Costa', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
            messages: [
              { id: '1', text: 'Preciso de ajuda com a agenda de hoje.', sender: 'employee', role: 'employee', timestamp: Date.now() - 60000 },
              { id: '2', text: 'Verifiquei, você tem duas consultas pela manhã e uma à tarde.', sender: 'user', role: 'user', timestamp: Date.now() - 50000 }
            ],
            unreadCount: 0
          },
        };

        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && Object.keys(parsed).length > 0) {
            setChats(parsed);
          } else {
            setChats(dummyChats);
            AsyncStorage.setItem('chats', JSON.stringify(dummyChats));
          }
        } else {
          setChats(dummyChats);
          AsyncStorage.setItem('chats', JSON.stringify(dummyChats));
        }
      } catch (e) {
        console.log('Erro ao carregar chats', e);
      }
    })();
  }, []);

  // Salvar chats sempre que alterarem
  useEffect(() => {
    AsyncStorage.setItem('chats', JSON.stringify(chats)).catch((e) =>
      console.log('Erro ao salvar chats', e)
    );
  }, [chats]);

  const sendMessage = (chatId, chatPartnerInfo, text, senderRole) => {
    setChats((prev) => {
      const existing = prev[chatId] || { messages: [], chatPartnerInfo: chatPartnerInfo };
      const newMessage = {
        id: Date.now().toString(),
        text,
        sender: senderRole === 'user' ? 'Você' : chatPartnerInfo.name, // Display name of the sender
        role: senderRole, // 'user' or 'employee'
        timestamp: Date.now(),
      };
      const updated = {
        ...prev,
        [chatId]: {
          messages: [...existing.messages, newMessage],
          unread: senderRole !== 'employee', // Mark unread if sent by user, assuming employee is viewing
          chatPartnerInfo: chatPartnerInfo,
        },
      };
      return updated;
    });
  };

  const markChatRead = (chatId) => {
    setChats((prev) => {
      const existing = prev[chatId];
      if (!existing) return prev;
      return {
        ...prev,
        [chatId]: {
          ...existing,
          unread: false,
        },
      };
    });
  };

  // Atualizar mensagens de um chat (usado pelo UserChatScreen)
  const updateChatMessages = (chatId, newMessages) => {
    setChats((prev) => {
      const existing = prev[chatId] || { messages: [], chatPartnerInfo: { id: chatId, name: 'Usuário' } };
      return {
        ...prev,
        [chatId]: {
          ...existing,
          messages: newMessages,
          unread: false,
        },
      };
    });
  };

  // Criar uma nova conversa de usuário (quando não há cards)
  const createUserChat = (chatPartnerInfoParam) => {
    // Para o app do usuário, o parceiro é o Veterinário (employee)
    const partnerId = chatPartnerInfoParam?.id || `vet_${Date.now()}`;
    const partner = {
      id: partnerId,
      name: chatPartnerInfoParam?.name || 'Veterinário',
      avatar: chatPartnerInfoParam?.avatar,
    };
    const newId = `chat_employee_${partnerId}`;
    let created = false;
    setChats((prev) => {
      if (prev[newId]) {
        return prev; // já existe
      }
      created = true;
      return {
        ...prev,
        [newId]: {
          messages: [],
          unread: false,
          chatPartnerInfo: partner,
        },
      };
    });
    return { id: newId, chatPartnerInfo: partner, created };
  };

  return (
    <ChatContext.Provider value={{ chats, sendMessage, markChatRead, updateChatMessages, createUserChat }}>
      {children}
    </ChatContext.Provider>
  );
};