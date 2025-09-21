
import React from 'react';
import { User } from '../types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'h-8 w-8' : 'h-12 w-12';
  const statusSizeClasses = size === 'sm' ? 'h-2 w-2 right-0' : 'h-3 w-3 right-0.5';

  return (
    <div className="relative flex-shrink-0">
      <img
        className={`rounded-full object-cover ${sizeClasses}`}
        src={user.avatarUrl}
        alt={user.name}
      />
      {user.isOnline && (
        <span
          className={`absolute bottom-0 block rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-800 ${statusSizeClasses}`}
        />
      )}
    </div>
  );
};

export default UserAvatar;
