
import React from 'react';
import { User } from '../types';
import UserAvatar from './UserAvatar';

interface TypingIndicatorProps {
  user: User;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ user }) => {
  return (
    <div className="flex items-end gap-3 justify-start">
      <UserAvatar user={user} size="sm" />
      <div className="flex items-center space-x-1 max-w-xs lg:max-w-md px-4 py-3 rounded-2xl rounded-bl-lg bg-gray-200 dark:bg-gray-700">
        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
