
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
}
