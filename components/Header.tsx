
import React from 'react';
import { Conversation, User } from '../types';
import UserAvatar from './UserAvatar';
import { MenuIcon } from './icons';

interface HeaderProps {
  activeConversation: Conversation | null;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeConversation, onMenuClick }) => {
    const otherUser = activeConversation?.participants.find(p => p.id !== 'user-1');

    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center">
                <button onClick={onMenuClick} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MenuIcon className="h-6 w-6 text-gray-600 dark:text-gray-300"/>
                </button>
                {otherUser ? (
                    <>
                        <UserAvatar user={otherUser} />
                        <div className="ml-4">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{otherUser.name}</h2>
                            <p className={`text-sm ${otherUser.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                                {otherUser.isOnline ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </>
                ) : (
                     <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">React Chat</h2>
                )}
            </div>
        </header>
    );
};

export default Header;
