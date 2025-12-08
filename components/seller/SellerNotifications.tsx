import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  MessageCircle, 
  Star, 
  Shield, 
  Settings as SettingsIcon,
  CheckSquare,
  Square,
  Clock,
  Toggle
} from 'lucide-react';

const notificationCategories = [
  { id: 'all', label: 'Все' },
  { id: 'orders', label: 'Заказы' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'returns', label: 'Возвраты' },
  { id: 'chats', label: 'Чаты' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'moderation', label: 'Модерация' },
  { id: 'system', label: 'Система' },
];

interface NotificationItem {
  id: string;
  type: 'orders' | 'delivery' | 'returns' | 'chats' | 'reviews' | 'moderation' | 'system';
  title: string;
  subtitle: string;
  time: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'critical';
  actions: { label: string; variant: 'primary' | 'secondary' | 'danger' }[];
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    type: 'orders',
    title: 'Новый заказ №A-274593',
    subtitle: 'Платье миди • 640 000 сум',
    time: '2 мин назад',
    isRead: false,
    priority: 'high',
    actions: [{ label: 'Принять', variant: 'primary' }]
  },
  {
    id: '2',
    type: 'delivery',
    title: 'Курьер назначен',
    subtitle: 'Заказ №A-274591 • Экспресс',
    time: '15 мин назад',
    isRead: false,
    priority: 'normal',
    actions: [{ label: 'Трек', variant: 'secondary' }]
  },
  {
    id: '3',
    type: 'returns',
    title: 'Запрос возврата',
    subtitle: 'Кроссовки белые • 1 200 000 сум',
    time: '1 час назад',
    isRead: false,
    priority: 'high',
    actions: [
      { label: 'Рассмотреть', variant: 'primary' },
      { label: 'Отклонить', variant: 'danger' }
    ]
  },
  {
    id: '4',
    type: 'chats',
    title: 'Новое сообщение',
    subtitle: 'Анна К.: "Доступен ли размер M?"',
    time: '2 часа назад',
    isRead: true,
    priority: 'normal',
    actions: [{ label: 'Ответить', variant: 'primary' }]
  },
  {
    id: '5',
    type: 'reviews',
    title: 'Новый отзыв ⭐⭐⭐⭐⭐',
    subtitle: 'Блузка шелковая белая',
    time: '3 часа назад',
    isRead: true,
    priority: 'low',
    actions: [{ label: 'Ответить', variant: 'secondary' }]
  },
  {
    id: '6',
    type: 'moderation',
    title: 'Карточка отклонена',
    subtitle: 'Сумка кожаная черная • Описание',
    time: '4 часа назад',
    isRead: false,
    priority: 'critical',
    actions: [{ label: 'Исправить', variant: 'primary' }]
  }
];

interface SellerNotificationsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function SellerNotifications({ 
  activeTab, 
  onTabChange, 
  onBack, 
  onNavigate 
}: SellerNotificationsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // Settings state
  const [quietHours, setQuietHours] = useState({ start: '22:00', end: '08:00' });
  const [criticalOnly, setCriticalOnly] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'orders':
        return <ShoppingBag className="w-5 h-5 text-luma-primary-600" />;
      case 'delivery':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'returns':
        return <RotateCcw className="w-5 h-5 text-orange-600" />;
      case 'chats':
        return <MessageCircle className="w-5 h-5 text-green-600" />;
      case 'reviews':
        return <Star className="w-5 h-5 text-yellow-600" />;
      case 'moderation':
        return <Shield className="w-5 h-5 text-red-600" />;
      case 'system':
        return <SettingsIcon className="w-5 h-5 text-gray-600" />;
      default:
        return <ShoppingBag className="w-5 h-5 text-luma-text-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-l-red-500';
      case 'high':
        return 'border-l-orange-500';
      case 'normal':
        return 'border-l-blue-500';
      case 'low':
        return 'border-l-gray-300';
      default:
        return 'border-l-gray-300';
    }
  };

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesCategory = selectedCategory === 'all' || notification.type === selectedCategory;
    const matchesFilter = criticalOnly ? notification.priority === 'critical' : true;
    return matchesCategory && matchesFilter;
  });

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action}`, selectedItems);
    setSelectedItems([]);
    setIsSelectMode(false);
  };

  const unreadCount = filteredNotifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Уведомления"
        onBack={onBack}
        rightIcons={['settings']}
        onSettingsClick={() => setShowSettings(true)}
        storeSelector={false}
      />

      <div className="pb-20">
        {/* Filter Categories */}
        <div className="px-4 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {notificationCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-2xl luma-type-cap-12 whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-luma-primary-600 text-white'
                    : 'bg-luma-surface-0 text-luma-text-600 border border-luma-border-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Mode & Bulk Actions */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsSelectMode(!isSelectMode);
                  setSelectedItems([]);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors"
              >
                <CheckSquare className="w-4 h-4 text-luma-text-600" />
                <span className="luma-type-title-14 text-luma-text-600">
                  {isSelectMode ? 'Отменить' : 'Выбрать'}
                </span>
              </button>

              {unreadCount > 0 && (
                <button
                  onClick={() => console.log('Mark all as read')}
                  className="luma-type-title-14 text-luma-primary-600"
                >
                  Отметить все прочитанным ({unreadCount})
                </button>
              )}
            </div>

            {isSelectMode && selectedItems.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="luma-type-body-14 text-luma-text-600">
                  Выбрано: {selectedItems.length}
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('read')}
                    className="px-3 py-1.5 bg-luma-primary-600 text-white rounded-lg luma-type-cap-12"
                  >
                    Прочитано
                  </button>
                  <button
                    onClick={() => handleBulkAction('action')}
                    className="px-3 py-1.5 bg-luma-success-600 text-white rounded-lg luma-type-cap-12"
                  >
                    Выполнить
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="px-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-luma-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-luma-primary-600" />
              </div>
              <h3 className="luma-type-title-16 text-luma-text-900 mb-2">
                {criticalOnly ? 'Нет критичных уведомлений' : 'Нет уведомлений'}
              </h3>
              <p className="luma-type-body-14 text-luma-text-600">
                {criticalOnly 
                  ? 'Все важные дела выполнены'
                  : 'Новые уведомления появятся здесь'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`bg-luma-surface-0 rounded-2xl border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  } relative`}
                >
                  {isSelectMode && (
                    <button
                      onClick={() => toggleItemSelection(notification.id)}
                      className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10"
                    >
                      {selectedItems.includes(notification.id) ? (
                        <CheckSquare className="w-6 h-6 text-luma-primary-600" />
                      ) : (
                        <Square className="w-6 h-6 text-luma-text-600" />
                      )}
                    </button>
                  )}

                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-10 h-10 bg-luma-bg-0 rounded-xl flex items-center justify-center flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h3 className={`luma-type-title-14 ${
                              notification.isRead ? 'text-luma-text-600' : 'text-luma-text-900'
                            }`}>
                              {notification.title}
                            </h3>
                            <p className="luma-type-body-14 text-luma-text-600 mb-2">
                              {notification.subtitle}
                            </p>
                            
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3 text-luma-text-600" />
                              <span className="luma-type-micro-10 text-luma-text-600">
                                {notification.time}
                              </span>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-luma-primary-600 rounded-full"></div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            {notification.actions.map((action, index) => (
                              <button
                                key={index}
                                className={`px-3 py-1.5 rounded-lg luma-type-cap-12 whitespace-nowrap transition-colors ${
                                  action.variant === 'primary'
                                    ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-500'
                                    : action.variant === 'danger'
                                    ? 'bg-luma-danger-600 text-white hover:bg-red-500'
                                    : 'bg-luma-bg-0 text-luma-text-600 border border-luma-border-200 hover:bg-luma-surface-0'
                                }`}
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Settings Sheet */}
      {showSettings && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          ></div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-luma-surface-0 rounded-t-3xl animate-slide-up max-h-[80vh] flex flex-col">
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-luma-border-200 rounded-full"></div>
            </div>
            
            <div className="px-6 pb-6">
              <h2 className="luma-type-title-16 text-luma-text-900 mb-6">Настройки уведомлений</h2>
              
              <div className="space-y-6">
                {/* Quiet Hours */}
                <div>
                  <h3 className="luma-type-title-14 text-luma-text-900 mb-3">Тихие часы</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="luma-type-cap-12 text-luma-text-600 mb-1 block">От</label>
                      <input
                        type="time"
                        value={quietHours.start}
                        onChange={(e) => setQuietHours(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full p-3 bg-luma-bg-0 rounded-xl border border-luma-border-200 luma-type-body-14"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="luma-type-cap-12 text-luma-text-600 mb-1 block">До</label>
                      <input
                        type="time"
                        value={quietHours.end}
                        onChange={(e) => setQuietHours(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full p-3 bg-luma-bg-0 rounded-xl border border-luma-border-200 luma-type-body-14"
                      />
                    </div>
                  </div>
                </div>

                {/* Critical Only */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="luma-type-title-14 text-luma-text-900">Только критичные</h3>
                    <p className="luma-type-body-14 text-luma-text-600">Показывать только важные уведомления</p>
                  </div>
                  <button
                    onClick={() => setCriticalOnly(!criticalOnly)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      criticalOnly ? 'bg-luma-primary-600' : 'bg-luma-border-200'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      criticalOnly ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-full py-4 bg-luma-primary-600 text-white rounded-2xl luma-type-title-14"
                >
                  Сохранить настройки
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <SellerBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}