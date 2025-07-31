import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatSupport from './ChatSupport';

interface ChatButtonProps {
  orderId?: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ orderId }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-roblox-red to-roblox-purple text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
        title="Customer Support"
      >
        <MessageCircle className="w-6 h-6 mx-auto group-hover:scale-110 transition-transform" />
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-roblox-yellow text-black text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
          1
        </div>
      </button>

      {/* Chat Support Component */}
      <ChatSupport
        orderId={orderId}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default ChatButton; 