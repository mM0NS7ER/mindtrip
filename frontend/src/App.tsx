import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatInterface from "./components/ChatInterface";
import MapComponent from "./components/MapComponent";
import Message from "./types/Message";

/**
 * 主应用组件，包含聊天界面和地图组件的布局
 */
export default function App() {

  // 使用useState管理消息列表和当前激活的标签页
  const [messages, setMessages] = useState<Message[]>([]); // 存储聊天消息的数组
  const [activeTab, setActiveTab] = useState("chat"); // 当前激活的标签页，默认为"chat"

  /**
   * 处理发送消息的函数
   * @param message - 用户输入的消息内容
   */
  const handleSendMessage = (message: string) => {
    // 将用户消息添加到消息列表
    setMessages([...messages, { role: "user", text: message }]);
    
    // 模拟AI回复，使用setTimeout延迟600ms后添加AI回复
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "ai", text: `你问了：${message}` }]);
    }, 600);
  };

  return (
    // 主容器，使用flex布局，全屏高度，白色背景，灰色文字
    <div className="flex h-screen bg-white text-gray-800">
      {/* 侧边栏组件，传入当前激活标签和标签切换回调 */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 根据激活的标签页渲染不同内容 */}
      {activeTab === "chat" ? (
        // 聊天界面组件，传入消息列表和发送消息回调
        <ChatInterface 
          messages={messages} 
          onSendMessage={handleSendMessage} 
        />
      ) : (
        // 开发中功能的占位界面
        <div className="flex-1 flex items-center justify-center border-r p-6">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold">功能开发中</h2>
            <p className="text-gray-500">此功能正在开发中，敬请期待！</p>
          </div>
        </div>
      )}
      
      {/* 地图组件 */}
      <MapComponent />
    </div>
  );
}