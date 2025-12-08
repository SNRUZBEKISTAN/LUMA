import React from 'react';
import { 
  Home, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  User 
} from 'lucide-react';

type SellerTab = 'dashboard' | 'inventory' | 'orders' | 'analytics' | 'profile';

interface SellerBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function SellerBottomNav({ activeTab, onTabChange, className = '' }: SellerBottomNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'inventory', label: 'Товары', icon: Package },
    { id: 'orders', label: 'Заказы', icon: ShoppingBag },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 },
    { id: 'profile', label: 'Профиль', icon: User },
  ];

  return (
    <div className={`seller-nav bg-luma-surface-0 border-t border-luma-border-200 ${className}`}>
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-luma-primary-200 text-luma-primary-600' 
                  : 'text-luma-text-600 hover:bg-luma-bg-0'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="luma-type-micro-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}