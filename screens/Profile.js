import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot, getDocs, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Profile() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState(null);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign name="logout" size={24} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        email: doc.data().email,
      }));
      const filteredUsersList = usersList.filter(user => user.email !== auth.currentUser.email);
      setUsers(filteredUsersList);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchChat = async () => {
        const q = query(collection(db, 'chats'), orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        
        let chatDoc = null;
        
        querySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.participants.includes(auth.currentUser.email) && data.participants.includes(selectedUser.email)) {
            chatDoc = doc;
          }
        });

        if (chatDoc) {
          setChatId(chatDoc.id);

          const unsubscribe = onSnapshot(doc(db, 'chats', chatDoc.id), (doc) => {
            const data = doc.data();
            if (data) {
              setMessages(data.messages.map(message => ({
                _id: message._id,
                createdAt: message.createdAt.toDate(),
                text: message.text,
                user: message.user
              })).reverse());
            }
          });

          return () => unsubscribe();
        } else {
          const newChatDoc = await addDoc(collection(db, 'chats'), {
            participants: [auth.currentUser.email, selectedUser.email],
            lastMessage: '',
            createdAt: new Date(),
            messages: []
          });

          setChatId(newChatDoc.id);
        }
      };

      fetchChat();
    }
  }, [selectedUser]);

  const onSend = useCallback(async (messages = []) => {
    const { _id, createdAt, text, user } = messages[0];

    if (chatId) {
      const messageDoc = {
        _id,
        createdAt,
        text,
        user
      };

      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion(messageDoc),
        lastMessage: text,
        createdAt
      });
    }
  }, [chatId]);

  if (!selectedUser) {
    return (
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedUser(item)}>
            <View style={styles.userItem}>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      messagesContainerStyle={{ backgroundColor: '#fff' }}
      textInputStyle={{ backgroundColor: '#fff', borderRadius: 20 }}
      user={{
        _id: auth?.currentUser?.email ?? 'anonymous',
        avatar: 'https://i.pravatar.cc/300'
      }}
    />
  );
}

const styles = StyleSheet.create({
  userItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  userEmail: {
    fontSize: 18
  }
});
