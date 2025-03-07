
import React, { useState } from 'react';
import Chat from '@/pages/Chat';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 shadow-2xl w-[90%] sm:w-[450px] max-h-[80vh] transition-all duration-300 ease-in-out animate-fade-in">
      <Card className="relative h-[600px] overflow-hidden border border-primary/30">
        <div className="absolute top-2 right-2 z-10">
          <button 
            onClick={onClose}
            className="rounded-full bg-zinc-800 p-1.5 text-white hover:bg-zinc-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-full overflow-hidden">
          <Chat isPopup={true} />
        </div>
      </Card>
    </div>
  );
};

export default ChatPopup;
