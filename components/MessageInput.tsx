
import React, { useState } from 'react';
import { SendIcon } from './icons';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText('');
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full bg-gray-100 dark:bg-gray-700 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-full bg-blue-500 p-3 text-white transition-colors duration-200 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={!text.trim()}
        >
          <SendIcon className="h-6 w-6" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
