import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import MapComponent from "./components/MapComponent";
import Message from "./types/Message";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState("chat");

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { role: "user", text: message }]);
    
    // 模拟AI回复
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: `你问了：${message}` }]);
    }, 600);
  };

  return (
    <div className="flex h-screen bg-white text-gray-800">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === "chat" ? (
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
        />
      ) : (
        <div className="flex-1 flex items-center justify-center border-r p-6">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold">功能开发中</h2>
            <p className="text-gray-500">此功能正在开发中，敬请期待！</p>
          </div>
        </div>
      )}
      
      <MapComponent />
    </div>
  );
}