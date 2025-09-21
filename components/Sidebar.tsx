
import React from 'react';
import { User } from '../types';
import UserAvatar from './UserAvatar';

interface SidebarProps {
  users: User[];
  currentUser: User;
  onSelectConversation: (user: User) => void;
  activeConversationId: string | null | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ users, currentUser, onSelectConversation, activeConversationId }) => {
  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <UserAvatar user={currentUser} />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{currentUser.name}</h2>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h3 className="px-2 py-2 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            Direct Messages
          </h3>
          <ul>
            {users.map((user) => {
              const conversationId = [currentUser.id, user.id].sort().join('-');
              const isActive = activeConversationId === conversationId;
              return (
                <li key={user.id}>
                  <button
                    onClick={() => onSelectConversation(user)}
                    className={`flex w-full items-center rounded-lg p-3 text-left transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <UserAvatar user={user} />
                    <span className="ml-4 font-medium">{user.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
