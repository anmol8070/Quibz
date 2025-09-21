
import React, { useEffect, useRef } from 'react';
import { Conversation, Message, User } from '../types';
import MessageBubble from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  currentUser: User;
  onSendMessage: (text: string) => void;
  typingUser: User | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, messages, currentUser, onSendMessage, typingUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUser]);
  
  const otherUser = conversation.participants.find(p => p.id !== currentUser.id);

  return (
    <div className="flex h-full flex-1 flex-col bg-white dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} currentUser={currentUser} conversation={conversation}/>
        ))}
        {typingUser && <TypingIndicator user={typingUser} />}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
