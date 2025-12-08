import React from 'react';
import { Badge } from './ui/badge';
import { Home, Play, ShoppingCart, User } from 'lucide-react';

interface NavigationItem {
  id: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

interface NavigationBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavigationBar({ activeTab, onTabChange }: NavigationBarProps) {
  const navigationItems: NavigationItem[] = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'feed', icon: Play, label: 'Лента' },
    { id: 'cart', icon: ShoppingCart, label: 'Корзина', badge: 2 },
    { id: 'profile', icon: User, label: 'Профиль' }
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 safe-area-bottom">
      <div 
        className="bg-luma-card rounded-luma-lg mx-auto px-6 py-4 shadow-luma-floating border border-gray-100/50 backdrop-blur-sm"
        style={{ 
          maxWidth: '90%'
        }}
      >
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-luma transition-all relative ${
                  isActive 
                    ? 'text-luma-primary scale-105' 
                    : 'text-luma-text-secondary hover:text-luma-primary/70 hover:scale-102'
                }`}
              >
                <Icon 
                  className={`w-6 h-6 mb-1 transition-colors ${
                    isActive ? 'text-luma-primary' : 'text-luma-text-secondary'
                  }`} 
                />
                <span 
                  className={`text-xs font-medium transition-colors ${
                    isActive ? 'text-luma-primary' : 'text-luma-text-secondary'
                  }`}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center bg-luma-coral text-white text-xs rounded-full">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}