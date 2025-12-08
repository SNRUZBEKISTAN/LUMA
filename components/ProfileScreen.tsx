import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FloatingBottomNav } from './FloatingBottomNav';
import {
  User,
  ShoppingBag,
  Heart,
  MessageSquare,
  Bell,
  CreditCard,
  MapPin,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit3,
  Star,
  ArrowLeft
} from 'lucide-react';

interface ProfileScreenProps {
  userName: string;
  userAvatar?: string;
  userRating: number;
  totalOrders: number;
  onLogout: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onBack: () => void;
  onOpenOrders: () => void;
  onOpenFavs: () => void;
  onOpenMessages: () => void;
  onOpenNotifSet: () => void;
  onOpenPayments: () => void;
  onOpenAddresses: () => void;
  onOpenSecurity: () => void;
  onOpenHelp: () => void;
  onEditProfile: () => void;
  cartItemCount?: number;
}

export function ProfileScreen({ 
  userName, 
  userAvatar, 
  userRating = 4.8, 
  totalOrders = 15,
  onLogout,
  onTabChange,
  activeTab,
  onBack,
  onOpenOrders,
  onOpenFavs,
  onOpenMessages,
  onOpenNotifSet,
  onOpenPayments,
  onOpenAddresses,
  onOpenSecurity,
  onOpenHelp,
  onEditProfile,
  cartItemCount = 0
}: ProfileScreenProps) {
  const profileMenuItems = [
    {
      id: 'orders',
      title: 'Мои заказы',
      subtitle: `${totalOrders} заказов`,
      icon: ShoppingBag,
      color: 'text-luma-primary',
      bgColor: 'bg-luma-primary/10',
      badge: totalOrders > 0 ? totalOrders.toString() : undefined
    },
    {
      id: 'favorites',
      title: 'Избранное',
      subtitle: '12 товаров',
      icon: Heart,
      color: 'text-luma-coral',
      bgColor: 'bg-luma-coral/10',
      badge: '12'
    },
    {
      id: 'messages',
      title: 'Сообщения',
      subtitle: '3 новых сообщения',
      icon: MessageSquare,
      color: 'text-luma-mint',
      bgColor: 'bg-luma-mint/10',
      badge: '3'
    }
  ];

  const settingsItems = [
    {
      id: 'notifications',
      title: 'Уведомления',
      subtitle: 'Настройка push-уведомлений',
      icon: Bell,
      color: 'text-luma-yellow',
      bgColor: 'bg-luma-yellow/10'
    },
    {
      id: 'payment',
      title: 'Способы оплаты',
      subtitle: '2 карты привязано',
      icon: CreditCard,
      color: 'text-luma-primary',
      bgColor: 'bg-luma-primary/10'
    },
    {
      id: 'addresses',
      title: 'Адреса доставки',
      subtitle: 'Дом, Работа',
      icon: MapPin,
      color: 'text-luma-mint',
      bgColor: 'bg-luma-mint/10'
    },
    {
      id: 'security',
      title: 'Безопасность',
      subtitle: 'Пароль, двухфакторная аутентификация',
      icon: Shield,
      color: 'text-luma-coral',
      bgColor: 'bg-luma-coral/10'
    },
    {
      id: 'help',
      title: 'Помощь и поддержка',
      subtitle: 'FAQ, связаться с нами',
      icon: HelpCircle,
      color: 'text-luma-text-secondary',
      bgColor: 'bg-gray-100'
    }
  ];

  const handleMenuItemClick = (itemId: string) => {
    switch (itemId) {
      case 'orders':
        onOpenOrders();
        break;
      case 'favorites':
        onOpenFavs();
        break;
      case 'messages':
        onOpenMessages();
        break;
      case 'notifications':
        onOpenNotifSet();
        break;
      case 'payment':
        onOpenPayments();
        break;
      case 'addresses':
        onOpenAddresses();
        break;
      case 'security':
        onOpenSecurity();
        break;
      case 'help':
        onOpenHelp();
        break;
      default:
        console.log('Menu item clicked:', itemId);
    }
  };

  return (
    <div className="h-full bg-luma-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-luma-card px-6 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-luma">
            <ArrowLeft className="w-6 h-6 text-luma-primary" />
          </Button>
          <h1 className="text-xl font-bold text-luma-text-dark">Профиль</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="w-16 h-16 bg-luma-primary/10">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-luma-primary" />
              )}
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-luma-mint rounded-full flex items-center justify-center shadow-luma">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-luma-text-dark">{userName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-luma-yellow text-luma-yellow" />
                <span className="text-sm font-medium text-luma-text-dark">{userRating}</span>
              </div>
              <div className="w-1 h-1 bg-luma-text-secondary rounded-full" />
              <span className="text-sm text-luma-text-secondary">
                {totalOrders} заказов
              </span>
            </div>
          </div>

          {/* Edit Profile Icon */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onEditProfile}
            className="w-10 h-10 rounded-full text-luma-text-900 hover:bg-luma-primary-200"
            aria-label="Редактировать профиль"
          >
            <Edit3 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ paddingBottom: '104px' }}>
        {/* Main Menu Items */}
        <div className="space-y-3">
          {profileMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.id}
                className="p-4 rounded-luma-lg shadow-luma-soft hover:shadow-luma transition-shadow cursor-pointer bg-luma-card"
                onClick={() => handleMenuItemClick(item.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.bgColor} rounded-luma flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-luma-text-dark">{item.title}</h3>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="bg-luma-primary/10 text-luma-primary text-xs"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-luma-text-secondary mt-1">{item.subtitle}</p>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-luma-text-secondary" />
                </div>
              </Card>
            );
          })}
        </div>

        <Separator className="my-6" />

        {/* Settings Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-luma-text-dark px-2">Настройки</h2>
          
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.id}
                className="p-4 rounded-luma-lg shadow-luma-soft hover:shadow-luma transition-shadow cursor-pointer bg-luma-card"
                onClick={() => handleMenuItemClick(item.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${item.bgColor} rounded-luma flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-luma-text-dark">{item.title}</h3>
                    <p className="text-xs text-luma-text-secondary mt-1">{item.subtitle}</p>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 text-luma-text-secondary" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="pt-6">
          <Button
            onClick={onLogout}
            variant="destructive"
            className="w-full bg-luma-coral hover:bg-luma-coral/90 text-white py-4 rounded-luma-lg shadow-luma-coral font-medium"
            size="lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Выйти из аккаунта
          </Button>
        </div>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-xs text-luma-text-secondary">
            LUMA версия 1.0.0
          </p>
        </div>
      </div>

      {/* Navigation Bar */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
        cartItemCount={cartItemCount}
      />
    </div>
  );
}
