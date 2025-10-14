import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, CommonStyles } from '../Utils/Theme';

const mockVets = [
  {
    id: '1',
    name: 'Dr. João Silva',
    avatar: require('../assets/veterinario.png'),
    lastMessage: 'Olá! Como está o Rex hoje?',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: '2',
    name: 'Dra. Ana Souza',
    avatar: require('../assets/veterinario.png'),
    lastMessage: 'Não se esqueça da consulta amanhã.',
    time: 'Ontem',
    unread: false,
  },
  {
    id: '3',
    name: 'Dr. Carlos Lima',
    avatar: require('../assets/veterinario.png'),
    lastMessage: 'Resultados dos exames disponíveis.',
    time: '2 dias atrás',
    unread: true,
  },
];

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const [vets, setVets] = useState(mockVets);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Chat', { vet: item })}
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
        data={vets}
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