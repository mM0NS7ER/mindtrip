import React from 'react';

interface MessageBubbleProps {
  role: 'user' | 'ai';
  text: string;
}

export default function MessageBubble({ role, text }: MessageBubbleProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-2xl shadow-sm max-w-xs whitespace-pre-wrap ${
          role === 'user'
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {text}
      </div>
    </div>
  );
}
