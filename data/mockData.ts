
import { User } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'user-1', name: 'You', avatarUrl: 'https://picsum.photos/seed/user1/100/100', isOnline: true },
  { id: 'user-2', name: 'Alice', avatarUrl: 'https://picsum.photos/seed/user2/100/100', isOnline: true },
  { id: 'user-3', name: 'Bob', avatarUrl: 'https://picsum.photos/seed/user3/100/100', isOnline: false },
  { id: 'user-4', name: 'Charlie', avatarUrl: 'https://picsum.photos/seed/user4/100/100', isOnline: true },
  { id: 'user-5', name: 'Diana', avatarUrl: 'https://picsum.photos/seed/user5/100/100', isOnline: false },
  { id: 'user-6', name: 'Edward', avatarUrl: 'https://picsum.photos/seed/user6/100/100', isOnline: true },
];

export const MOCK_MESSAGES = [
  { id: 'msg-1', senderId: 'user-1', recipientId: 'user-2', text: 'Hey Alice, how are you?', timestamp: Date.now() - 1000 * 60 * 50 },
  { id: 'msg-2', senderId: 'user-2', recipientId: 'user-1', text: 'Hey! I am good, thanks for asking. How about you?', timestamp: Date.now() - 1000 * 60 * 49 },
  { id: 'msg-3', senderId: 'user-1', recipientId: 'user-2', text: 'Doing great! Just working on this chat app.', timestamp: Date.now() - 1000 * 60 * 48 },
  { id: 'msg-4', senderId: 'user-2', recipientId: 'user-1', text: 'Oh cool! It looks amazing.', timestamp: Date.now() - 1000 * 60 * 47 },
  { id: 'msg-5', senderId: 'user-3', recipientId: 'user-1', text: 'Hey, did you see my email?', timestamp: Date.now() - 1000 * 60 * 120 },
  { id: 'msg-6', senderId: 'user-1', recipientId: 'user-3', text: 'Hi Bob, yes I did. I will get back to you shortly.', timestamp: Date.now() - 1000 * 60 * 119 },
  { id: 'msg-7', senderId: 'user-4', recipientId: 'user-1', text: 'Lunch today?', timestamp: Date.now() - 1000 * 60 * 10 },
];
