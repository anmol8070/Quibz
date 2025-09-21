
import React from 'react';
import { Message, User, Conversation } from '../types';
import UserAvatar from './UserAvatar';

interface MessageProps {
  message: Message;
  currentUser: User;
  conversation: Conversation;
}

const MessageBubble: React.FC<MessageProps> = ({ message, currentUser, conversation }) => {
  const isSentByCurrentUser = message.senderId === currentUser.id;
  const sender = conversation.participants.find(p => p.id === message.senderId) || currentUser;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const bubbleClasses = isSentByCurrentUser
    ? 'bg-blue-500 text-white'
    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  
  const containerClasses = isSentByCurrentUser
    ? 'justify-end'
    : 'justify-start';

  return (
    <div className={`flex items-end gap-3 ${containerClasses}`}>
       {!isSentByCurrentUser && <UserAvatar user={sender} size="sm" />}
      <div className={`flex flex-col ${isSentByCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${bubbleClasses} ${isSentByCurrentUser ? 'rounded-br-lg' : 'rounded-bl-lg'}`}>
          <p className="text-sm">{message.text}</p>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-1">
          {formatDate(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
