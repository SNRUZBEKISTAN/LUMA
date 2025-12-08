import React from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { ListItem } from './ListItem';
import { SafeBottomSpacer } from './SafeBottomSpacer';
import { 
  Store, 
  User, 
  Truck, 
  CreditCard, 
  Users, 
  Crown, 
  Bell, 
  FileText, 
  Shield,
  LogOut,
  HelpCircle
} from 'lucide-react';

interface SellerSettingsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export function SellerSettings({ 
  activeTab, 
  onTabChange, 
  onBack, 
  onNavigate, 
  onLogout 
}: SellerSettingsProps) {
  const settingsItems = [
    {
      icon: <Store className="w-5 h-5 text-luma-primary-600" />,
      title: 'Магазины',
      subtitle: 'Управление магазинами и выбор активного',
      action: () => onNavigate('stores')
    },
    {
      icon: <User className="w-5 h-5 text-blue-600" />,
      title: 'Профиль магазина',
      subtitle: 'Логотип, описание, ссылки',
      action: () => onNavigate('storeProfile')
    },
    {
      icon: <Truck className="w-5 h-5 text-green-600" />,
      title: 'Логистика',
      subtitle: 'Доставка, тарифы, зоны',
      action: () => onNavigate('logistics')
    },
    {
      icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      title: 'Оплаты',
      subtitle: 'Способы оплаты, Payme, Click',
      action: () => onNavigate('payments')
    },
    {
      icon: <Users className="w-5 h-5 text-orange-600" />,
      title: 'Сотрудники и роли',
      subtitle: 'Приглашения, права доступа',
      action: () => onNavigate('staff')
    },
    {
      icon: <Crown className="w-5 h-5 text-yellow-600" />,
      title: 'Подписка',
      subtitle: 'Текущий план, лимиты, продление',
      action: () => onNavigate('subscription')
    },
    {
      icon: <Bell className="w-5 h-5 text-luma-primary-600" />,
      title: 'Уведомления',
      subtitle: 'Настройки push и email уведомлений',
      action: () => onNavigate('notificationSettings')
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-600" />,
      title: 'Юридическое',
      subtitle: 'KYC, документы, ИНН',
      action: () => onNavigate('legal')
    },
    {
      icon: <Shield className="w-5 h-5 text-red-600" />,
      title: 'Безопасность',
      subtitle: 'Пароль, 2FA, активные сессии',
      action: () => onNavigate('security')
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Настройки"
        onBack={onBack}
        storeSelector={false}
        rightIcons={['bell']}
        onBellClick={() => onNavigate('notifications')}
      />
      
      <div className="flex-1 overflow-y-auto safe-bottom">
        {/* Profile Section */}
        <div className="px-4 py-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-luma-primary-600 rounded-2xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">U</span>
              </div>
              <div className="flex-1">
                <h2 className="luma-type-title-16 text-luma-text-900">Urban Store</h2>
                <p className="luma-type-body-14 text-luma-text-600">Основатель · Активен</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="px-2 py-1 bg-green-50 rounded-lg">
                    <span className="luma-type-micro-10 text-luma-success-600">Официальный</span>
                  </div>
                  <div className="px-2 py-1 bg-blue-50 rounded-lg">
                    <span className="luma-type-micro-10 text-blue-600">Доставка сегодня</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Items */}
        <div className="px-4">
          <div className="space-y-3">
            {settingsItems.map((item, index) => (
              <ListItem
                key={index}
                leftIcon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onClick={item.action}
              />
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="px-4 mt-6">
          <ListItem
            leftIcon={<HelpCircle className="w-5 h-5 text-luma-text-600" />}
            title="Помощь и поддержка"
            subtitle="FAQ, техподдержка, контакты"
            onClick={() => onNavigate('help')}
          />
        </div>

        {/* Logout */}
        <div className="px-4 mt-6 pb-6">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-4 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-luma-danger-600" />
            <span className="luma-type-title-14 text-luma-danger-600">Выйти из аккаунта</span>
          </button>

          {/* App Version */}
          <div className="mt-6 text-center">
            <p className="luma-type-micro-10 text-luma-text-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              luma Seller v1.0.0
            </p>
          </div>
        </div>

        {/* Safe Bottom Spacer */}
        <SafeBottomSpacer />
      </div>

      <SellerBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}