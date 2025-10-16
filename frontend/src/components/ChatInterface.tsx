import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import Message from '../types/Message';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export default function ChatInterface({ messages, onSendMessage }: ChatInterfaceProps) {
  return (
    <main className="flex flex-col flex-1 border-r">
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center space-y-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/201/201623.png"
              alt="travel"
              className="w-20 h-20 mx-auto opacity-80"
            />
            <h1 className="text-2xl font-semibold">今天去哪儿？</h1>
            <p className="text-gray-500">嗨，我来帮你规划你的旅行。任何旅行相关的问题都可以问我。</p>
          </div>
        ) : (
          <div className="w-full max-w-xl space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} text={msg.text} />
            ))}
          </div>
        )}
      </div>

      <ChatInput onSend={onSendMessage} />
      <p className="text-center text-xs text-gray-400 pb-2">
        Mindtrip 模拟界面示例。请勿输入敏感信息。
      </p>
    </main>
  );
}
