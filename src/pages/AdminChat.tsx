import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, User, Bot, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ChatSession {
  id: string;
  orderId?: string;
  customerName: string;
  customerEmail: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isActive: boolean;
}

interface Message {
  id: string;
  orderId?: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: Date;
  isAdmin: boolean;
  isRead: boolean;
}

const AdminChat: React.FC = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  // Mock data untuk demo
  const mockChatSessions: ChatSession[] = [
    {
      id: '1',
      orderId: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      lastMessage: 'Pesanan saya sudah dibayar, kapan bisa diproses?',
      lastMessageTime: new Date(Date.now() - 300000),
      unreadCount: 2,
      isActive: true
    },
    {
      id: '2',
      orderId: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      lastMessage: 'Ada masalah dengan pembayaran QRIS',
      lastMessageTime: new Date(Date.now() - 600000),
      unreadCount: 0,
      isActive: true
    },
    {
      id: '3',
      orderId: 'ORD-003',
      customerName: 'Bob Wilson',
      customerEmail: 'bob@example.com',
      lastMessage: 'Terima kasih, pesanan sudah diterima',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 0,
      isActive: false
    }
  ];

  const mockMessages: { [key: string]: Message[] } = {
    '1': [
      {
        id: '1',
        orderId: 'ORD-001',
        userId: 'user1',
        userName: 'John Doe',
        message: 'Halo, saya mau tanya tentang pesanan saya',
        timestamp: new Date(Date.now() - 300000),
        isAdmin: false,
        isRead: true
      },
      {
        id: '2',
        orderId: 'ORD-001',
        userId: 'admin1',
        userName: 'Admin Support',
        message: 'Halo! Terima kasih sudah menghubungi kami. Ada yang bisa saya bantu?',
        timestamp: new Date(Date.now() - 240000),
        isAdmin: true,
        isRead: true
      },
      {
        id: '3',
        orderId: 'ORD-001',
        userId: 'user1',
        userName: 'John Doe',
        message: 'Pesanan saya sudah dibayar, kapan bisa diproses?',
        timestamp: new Date(Date.now() - 180000),
        isAdmin: false,
        isRead: false
      }
    ]
  };

  useEffect(() => {
    setChatSessions(mockChatSessions);
  }, []);

  useEffect(() => {
    if (selectedChat && mockMessages[selectedChat]) {
      setMessages(mockMessages[selectedChat]);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const adminMessage: Message = {
      id: Date.now().toString(),
      orderId: chatSessions.find(s => s.id === selectedChat)?.orderId,
      userId: user?.id || 'admin1',
      userName: 'Admin Support',
      message: newMessage.trim(),
      timestamp: new Date(),
      isAdmin: true,
      isRead: false
    };

    setMessages(prev => [...prev, adminMessage]);
    setNewMessage('');

    // Update chat session
    setChatSessions(prev => prev.map(session => 
      session.id === selectedChat 
        ? { ...session, lastMessage: newMessage.trim(), lastMessageTime: new Date(), unreadCount: 0 }
        : session
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Baru saja';
    if (minutes < 60) return `${minutes}m yang lalu`;
    if (hours < 24) return `${hours}j yang lalu`;
    return `${days}h yang lalu`;
  };

  // Check if user is admin
  if (!user || user.user_metadata?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Akses Ditolak</h1>
          <p className="text-gray-600 dark:text-gray-400">Anda tidak memiliki akses ke halaman admin chat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-roblox-red to-roblox-purple text-white p-6">
            <h1 className="text-2xl font-bold flex items-center space-x-2">
              <MessageCircle className="w-8 h-8" />
              <span>Admin Chat Support</span>
            </h1>
            <p className="text-white/80 mt-1">Kelola chat dengan customer</p>
          </div>

          <div className="flex h-[600px]">
            {/* Chat Sessions List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-white">Chat Sessions</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {chatSessions.filter(s => s.unreadCount > 0).length} unread messages
                </p>
              </div>
              
              <div className="overflow-y-auto h-full">
                {chatSessions.map((session) => (
                  <div
                    key={session.id}
                    onClick={() => setSelectedChat(session.id)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedChat === session.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {session.customerName}
                      </h3>
                      {session.unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                          {session.unreadCount}
                        </span>
                      )}
                    </div>
                    
                    {session.orderId && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Order: {session.orderId}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate mb-2">
                      {session.lastMessage}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(session.lastMessageTime)}
                      </span>
                      <div className="flex items-center space-x-1">
                        {session.isActive ? (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {chatSessions.find(s => s.id === selectedChat)?.customerName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {chatSessions.find(s => s.id === selectedChat)?.customerEmail}
                        </p>
                        {chatSessions.find(s => s.id === selectedChat)?.orderId && (
                          <p className="text-xs text-blue-600 dark:text-blue-400">
                            Order: {chatSessions.find(s => s.id === selectedChat)?.orderId}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Online</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.isAdmin
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            {message.isAdmin ? (
                              <Bot className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                            <span className="text-xs font-medium opacity-75">
                              {message.userName}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                          <p className="text-xs opacity-60 mt-1">
                            {message.timestamp.toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ketik pesan untuk customer..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Pilih chat session
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Klik pada salah satu chat di sidebar untuk mulai chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChat; 