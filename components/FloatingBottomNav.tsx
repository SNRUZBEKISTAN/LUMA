import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, Play, ShoppingCart, User, Wallet } from 'lucide-react';

interface FloatingBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartItemCount?: number;
  className?: string;
  removeRounding?: boolean;
}

export function FloatingBottomNav({ 
  activeTab, 
  onTabChange, 
  cartItemCount = 0,
  className = '',
  removeRounding = false
}: FloatingBottomNavProps) {
  
  const tabs = [
    {
      id: 'home',
      label: 'Дом',
      icon: Home
    },
    {
      id: 'feed',
      label: 'Лента',
      icon: Play
    },
    {
      id: 'cart',
      label: 'Корзина',
      icon: ShoppingCart,
      badge: cartItemCount > 0 ? cartItemCount : undefined
    },
    {
      id: 'wallet',
      label: 'Кошелёк',
      icon: Wallet
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: User
    }
  ];

  const formatBadgeCount = (count: number) => {
    if (count > 9) return '9+';
    return count.toString();
  };

  return (
    <div 
      className={`fixed left-0 right-0 bottom-0 bg-luma-surface-0 border-t border-luma-border-200 z-50 ${className}`}
      style={{
        height: '72px',
        borderRadius: removeRounding ? '0' : 'var(--luma-space-radius-floating) var(--luma-space-radius-floating) 0 0',
        boxShadow: '0 -4px 24px rgba(0,0,0,.08)',
        padding: '8px 8px 16px 8px'
      }}
    >
      <div className="flex items-center justify-between h-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <div key={tab.id} className="relative flex items-center justify-center flex-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  console.log('🖱️ FloatingBottomNav: кнопка нажата, tab:', tab.id);
                  onTabChange(tab.id);
                }}
                className={`w-16 h-16 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-500' 
                    : 'text-luma-text-600 hover:bg-luma-primary-200/50 hover:text-luma-primary-600'
                }`}
              >
                <Icon className={tab.id === 'home' ? "w-40 h-40" : "w-28 h-28"} />
              </Button>
              
              {/* Badge for cart */}
              {tab.badge && (
                <div 
                  className="absolute -top-1 -right-1 bg-luma-danger-600 text-white rounded-full min-w-5 h-5 flex items-center justify-center"
                  style={{ fontSize: '10px', fontWeight: '600' }}
                >
                  {formatBadgeCount(tab.badge)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}