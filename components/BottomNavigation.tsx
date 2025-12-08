import React from 'react';
import { Home, Grid3x3, Package, Heart, User, Bell } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadNotificationsCount?: number;
}

export function BottomNavigation({ activeTab, onTabChange, unreadNotificationsCount = 0 }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Дом' },
    { id: 'categories', icon: Grid3x3, label: 'Категории' },
    { id: 'orders', icon: Package, label: 'Заказы' },
    { id: 'notifications', icon: Bell, label: 'Уведомления', badge: unreadNotificationsCount },
    { id: 'profile', icon: User, label: 'Профиль' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-luma-primary/10 px-4 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-luma-primary' 
                  : 'text-luma-text-secondary hover:text-luma-primary/70'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'fill-current' : ''}`} />
                {tab.badge && tab.badge > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}