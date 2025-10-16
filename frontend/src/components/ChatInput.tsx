import React, { useState } from 'react';
import { Send, Mic, Plus } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4 flex items-center space-x-2 max-w-2xl mx-auto w-full">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Plus className="w-5 h-5" />
      </button>
      <textarea
        placeholder="Ask anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1 border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={1}
      />
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Mic className="w-5 h-5" />
      </button>
      <button
        onClick={handleSend}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}
