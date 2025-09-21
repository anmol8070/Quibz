
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';
import useChat from './hooks/useChat';
import { User } from './types';

const App: React.FC = () => {
  const {
    users,
    currentUser,
    activeConversation,
    messages,
    typingUser,
    selectConversation,
    sendMessage,
  } = useChat();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectConversation = (user: User) => {
    selectConversation(user.id);
    setSidebarOpen(false); // Close sidebar on selection in mobile view
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      <div className="relative md:flex">
        <div
          className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`fixed top-0 left-0 h-full z-30 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-80 lg:w-96 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar
            users={users}
            currentUser={currentUser}
            onSelectConversation={handleSelectConversation}
            activeConversationId={activeConversation?.id}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <Header
          activeConversation={activeConversation}
          onMenuClick={() => setSidebarOpen(true)}
        />
        {activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            messages={messages}
            currentUser={currentUser}
            onSendMessage={sendMessage}
            typingUser={typingUser}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2 className="text-2xl font-semibold">Welcome to Chat</h2>
            <p className="mt-2 max-w-sm">Select a conversation from the sidebar to start messaging. Your chat history will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
