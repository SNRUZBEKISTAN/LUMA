import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ProfileTemplate } from './ProfileTemplate';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChatPreview {
  id: string;
  storeName: string;
  storeAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

interface MessagesScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function MessagesScreen({ onBack, onTabChange, activeTab }: MessagesScreenProps) {
  const chatPreviews: ChatPreview[] = [
    {
      id: '1',
      storeName: 'Urban',
      storeAvatar: '🏙️',
      lastMessage: 'Спасибо за заказ! Ваш товар будет доставлен завтра.',
      timestamp: '14:30',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: '2',
      storeName: 'Chic',
      storeAvatar: '💅',
      lastMessage: 'Да, этот товар есть в наличии в размере M.',
      timestamp: '12:15',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '3',
      storeName: 'Nova',
      storeAvatar: '✨',
      lastMessage: 'Добро пожаловать! Как дела?',
      timestamp: 'Вчера',
      unreadCount: 1,
      isOnline: true
    },
    {
      id: '4',
      storeName: 'Pink',
      storeAvatar: '🌸',
      lastMessage: 'Ваш заказ готов к получению!',
      timestamp: '2 дня назад',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: '5',
      storeName: 'Aura',
      storeAvatar: '🌟',
      lastMessage: 'Спасибо за покупку!',
      timestamp: '3 дня назад',
      unreadCount: 0,
      isOnline: false
    }
  ];

  const handleChatClick = (chatId: string) => {
    console.log('Open chat:', chatId);
  };

  return (
    <ProfileTemplate
      title="Сообщения"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="list"
      empty={chatPreviews.length === 0}
      emptyTitle="Нет сообщений"
      emptyDescription="Начните общение с магазинами"
    >
      <div className="space-y-2">
        {chatPreviews.map((chat) => (
          <Card
            key={chat.id}
            className="p-4 cursor-pointer hover:bg-luma-primary-200/10 transition-colors border-luma-border-200"
            onClick={() => handleChatClick(chat.id)}
          >
            <div className="flex items-center gap-3">
              {/* Store Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-luma-primary-200 rounded-full flex items-center justify-center text-lg">
                  {chat.storeAvatar}
                </div>
                {chat.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-luma-success-600 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-luma-text-900 truncate">
                    {chat.storeName}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-luma-text-600">
                      {chat.timestamp}
                    </span>
                    {chat.unreadCount > 0 && (
                      <Badge className="bg-luma-primary-600 text-white min-w-5 h-5 flex items-center justify-center text-xs">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-luma-text-600 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ProfileTemplate>
  );
}