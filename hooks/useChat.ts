
import { useState, useEffect, useCallback } from 'react';
import { User, Message, Conversation } from '../types';
import { MOCK_USERS, MOCK_MESSAGES } from '../data/mockData';

const CURRENT_USER_ID = 'user-1';

const useChat = () => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [currentUser] = useState<User>(() => users.find(u => u.id === CURRENT_USER_ID)!);
  const [conversations, setConversations] = useState<Map<string, Conversation>>(new Map());
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [typingUser, setTypingUser] = useState<User | null>(null);

  useEffect(() => {
    const initialConversations = new Map<string, Conversation>();
    MOCK_MESSAGES.forEach((msg) => {
      const otherUserId = msg.senderId === CURRENT_USER_ID 
        ? MOCK_USERS.find(u => u.id !== CURRENT_USER_ID && MOCK_MESSAGES.some(m => (m.senderId === u.id && m.recipientId === CURRENT_USER_ID) || (m.senderId === CURRENT_USER_ID && m.recipientId === u.id)))?.id 
        : msg.senderId;

      const recipientId = msg.recipientId;

      if (!otherUserId || !recipientId) return;

      const conversationId = [CURRENT_USER_ID, otherUserId === CURRENT_USER_ID ? recipientId : otherUserId].sort().join('-');
      
      if (!initialConversations.has(conversationId)) {
        const participant1 = users.find(u => u.id === CURRENT_USER_ID);
        const participant2 = users.find(u => u.id === (otherUserId === CURRENT_USER_ID ? recipientId : otherUserId));
        if (participant1 && participant2) {
            initialConversations.set(conversationId, {
              id: conversationId,
              participants: [participant1, participant2],
              messages: [],
            });
        }
      }
      
      const convo = initialConversations.get(conversationId);
      if (convo) {
         const message: Message = { id: msg.id, senderId: msg.senderId, text: msg.text, timestamp: msg.timestamp };
         convo.messages.push(message);
      }
    });

    initialConversations.forEach(convo => convo.messages.sort((a, b) => a.timestamp - b.timestamp));
    setConversations(initialConversations);
    
    // Select the first conversation by default
    if (initialConversations.size > 0) {
      setActiveConversationId(initialConversations.keys().next().value);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const selectConversation = useCallback((userId: string) => {
    const conversationId = [CURRENT_USER_ID, userId].sort().join('-');
    if (!conversations.has(conversationId)) {
        const user1 = users.find(u => u.id === CURRENT_USER_ID);
        const user2 = users.find(u => u.id === userId);
        if (user1 && user2) {
             const newConversation: Conversation = {
                id: conversationId,
                participants: [user1, user2],
                messages: []
             };
             setConversations(prev => new Map(prev).set(conversationId, newConversation));
        }
    }
    setActiveConversationId(conversationId);
  }, [conversations, users]);

  const sendMessage = useCallback((text: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      text,
      timestamp: Date.now(),
    };

    setConversations(prev => {
        const newConversations = new Map(prev);
        const conversation = newConversations.get(activeConversationId);
        if (conversation) {
            const updatedConversation = { ...conversation, messages: [...conversation.messages, newMessage] };
            newConversations.set(activeConversationId, updatedConversation);
        }
        return newConversations;
    });

    // Simulate a reply
    const conversation = conversations.get(activeConversationId);
    if (conversation) {
        const otherUser = conversation.participants.find(p => p.id !== CURRENT_USER_ID);
        if (otherUser) {
            setTypingUser(otherUser);
            setTimeout(() => {
                setTypingUser(null);
                const replyMessage: Message = {
                    id: `msg-${Date.now() + 1}`,
                    senderId: otherUser.id,
                    text: `This is a simulated reply to "${text.substring(0, 20)}..."`,
                    timestamp: Date.now(),
                };
                setConversations(prev => {
                    const newConversations = new Map(prev);
                    const currentConvo = newConversations.get(activeConversationId);
                    if (currentConvo) {
                         const updatedConversation = { ...currentConvo, messages: [...currentConvo.messages, replyMessage] };
                         newConversations.set(activeConversationId, updatedConversation);
                    }
                    return newConversations;
                });
            }, 1000 + Math.random() * 1500);
        }
    }
  }, [activeConversationId, conversations]);

  const activeConversation = activeConversationId ? conversations.get(activeConversationId) : null;
  const messages = activeConversation ? activeConversation.messages : [];

  return {
    users: users.filter(u => u.id !== CURRENT_USER_ID),
    currentUser,
    activeConversation,
    messages,
    typingUser: activeConversationId && typingUser?.id !== currentUser.id && activeConversation?.participants.some(p => p.id === typingUser?.id) ? typingUser : null,
    selectConversation,
    sendMessage
  };
};

export default useChat;
