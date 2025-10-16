import React from 'react';
import { MapPin, MessageCircle, Heart, Calendar, Settings, User } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: 'chat', icon: MessageCircle, label: '聊天' },
    { id: 'map', icon: MapPin, label: '地图' },
    { id: 'favorites', icon: Heart, label: '收藏' },
    { id: 'calendar', icon: Calendar, label: '行程' },
    { id: 'settings', icon: Settings, label: '设置' },
  ];

  return (
    <aside className="w-16 border-r flex flex-col justify-between items-center py-4">
      <div className="flex flex-col items-center space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`p-2 rounded-lg transition-colors ${
              activeTab === item.id ? 'bg-blue-100 text-blue-500' : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            <item.icon className="w-6 h-6" />
          </button>
        ))}
      </div>
      <button className="p-2 text-gray-500 hover:text-blue-500">
        <User className="w-6 h-6" />
      </button>
    </aside>
  );
}
