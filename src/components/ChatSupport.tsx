import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, User, Bot } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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

interface ChatSupportProps {
  orderId?: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ orderId, isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data untuk demo
  const mockMessages: Message[] = [
    {
      id: '1',
      orderId: orderId,
      userId: 'user1',
      userName: user?.user_metadata?.full_name || user?.email || 'Customer',
      message: 'Halo, saya mau tanya tentang pesanan saya',
      timestamp: new Date(Date.now() - 300000), // 5 menit yang lalu
      isAdmin: false,
      isRead: true
    },
    {
      id: '2',
      orderId: orderId,
      userId: 'admin1',
      userName: 'Admin Support',
      message: 'Halo! Terima kasih sudah menghubungi kami. Ada yang bisa saya bantu?',
      timestamp: new Date(Date.now() - 240000), // 4 menit yang lalu
      isAdmin: true,
      isRead: true
    },
    {
      id: '3',
      orderId: orderId,
      userId: 'user1',
      userName: user?.user_metadata?.full_name || user?.email || 'Customer',
      message: 'Pesanan saya sudah dibayar, kapan bisa diproses?',
      timestamp: new Date(Date.now() - 180000), // 3 menit yang lalu
      isAdmin: false,
      isRead: true
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setMessages(mockMessages);
      scrollToBottom();
    }
  }, [isOpen, orderId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      orderId: orderId,
      userId: user.id,
      userName: user.user_metadata?.full_name || user.email || 'Customer',
      message: newMessage.trim(),
      timestamp: new Date(),
      isAdmin: false,
      isRead: false
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulasi admin reply
    setTimeout(() => {
      const adminMessage: Message = {
        id: (Date.now() + 1).toString(),
        orderId: orderId,
        userId: 'admin1',
        userName: 'Admin Support',
        message: 'Terima kasih atas pesannya. Tim kami akan segera memproses pesanan Anda. Mohon tunggu sebentar ya.',
        timestamp: new Date(),
        isAdmin: true,
        isRead: false
      };
      setMessages(prev => [...prev, adminMessage]);
      setIsLoading(false);
      scrollToBottom();
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-roblox-red to-roblox-purple text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">Customer Support</h3>
            {orderId && (
              <p className="text-xs opacity-90">Order ID: {orderId}</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="h-[380px] overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isAdmin
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  : 'bg-roblox-red text-white'
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
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-medium opacity-75">Admin Support</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik pesan Anda..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-roblox-red focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
            className="px-4 py-2 bg-roblox-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Tekan Enter untuk kirim pesan
        </p>
      </div>
    </div>
  );
};

export default ChatSupport; 