import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FloatingBottomNav } from './FloatingBottomNav';
import { ArrowLeft, ChevronRight, Trash2, CheckCircle } from 'lucide-react';
import { AppState, AppActions, AppNotification } from '../types/app';

interface NotificationsScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  state?: AppState;
  actions?: AppActions;
}

interface DisplayNotification {
  id: string;
  type: 'order' | 'delivery' | 'stock' | 'promo';
  icon: string;
  title: string;
  subtitle: string;
  time: string;
  date: 'today' | 'yesterday' | 'week';
  isRead: boolean;
  ctaText?: string;
  ctaAction?: () => void;
  orderId?: string;
  orderNumber?: string;
}

const filterTabs = [
  { id: 'all', label: 'Все' },
  { id: 'orders', label: 'Заказы' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'stock', label: 'В наличии' },
  { id: 'promo', label: 'Промо' }
];

const dateGroups = {
  today: 'Сегодня',
  yesterday: 'Вчера', 
  week: 'На этой неделе'
};

export function NotificationsScreen({ onBack, onTabChange, activeTab, state, actions }: NotificationsScreenProps) {
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  
  // Функция для определения разницы времени
  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMs < 10000) return 'сейчас'; // менее 10 секунд
    if (diffMinutes < 1) return 'сейчас';
    if (diffMinutes < 60) return `${diffMinutes} мин`;
    if (diffHours < 24) return `${diffHours} ч`;
    return `${diffDays} дн`;
  };
  
  // Функция для определения группы даты
  const getDateGroup = (timestamp: number): 'today' | 'yesterday' | 'week' => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    return 'week';
  };
  
  // Преобразуем уведомления из состояния в формат для отображения
  const displayNotifications: DisplayNotification[] = React.useMemo(() => {
    if (!state?.notifications) {
      // Фолбэк данные для демо
      return [
        {
          id: '1',
          type: 'order',
          icon: '🧾',
          title: 'Заказ A-274593 создан',
          subtitle: 'Сумма: 125,000 сум',
          time: '3 мин',
          date: 'today',
          isRead: false,
          ctaText: 'Посмотреть'
        }
      ];
    }
    
    // Фильтруем уведомления для покупателя и преобразуем их
    return state.notifications
      .filter(notification => notification.audience === 'buyer')
      .map(notification => {
        const time = getTimeAgo(notification.createdAt);
        const date = getDateGroup(notification.createdAt);
        
        // Определяем иконку и действие в зависимости от типа
        let icon = '📱';
        let ctaText = undefined;
        let ctaAction = undefined;
        
        if (notification.type === 'order') {
          icon = '🧾';
          ctaText = 'Посмотреть';
          ctaAction = () => {
            if (actions && notification.orderId) {
              actions.setSelectedOrderId(notification.orderId);
              actions.setCurrentScreen('orderTracking');
            }
          };
        } else if (notification.type === 'delivery') {
          icon = '🚚';
          ctaText = 'Трек';
          ctaAction = () => {
            if (actions && notification.orderId) {
              actions.setSelectedOrderId(notification.orderId);
              actions.setCurrentScreen('orderTracking');
            }
          };
        }
        
        return {
          id: notification.id,
          type: notification.type as 'order' | 'delivery' | 'stock' | 'promo',
          icon,
          title: notification.title,
          subtitle: notification.subtitle,
          time,
          date,
          isRead: notification.isRead,
          ctaText,
          ctaAction,
          orderId: notification.orderId,
          orderNumber: notification.orderNumber
        };
      })
      .sort((a, b) => {
        // Сортируем по времени создания (новые сначала)
        const aNotif = state.notifications.find(n => n.id === a.id);
        const bNotif = state.notifications.find(n => n.id === b.id);
        if (!aNotif || !bNotif) return 0;
        return bNotif.createdAt - aNotif.createdAt;
      });
  }, [state?.notifications, actions]);

  const filteredNotifications = React.useMemo(() => {
    return displayNotifications.filter(notification => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'orders') return notification.type === 'order';
      if (selectedFilter === 'delivery') return notification.type === 'delivery';
      if (selectedFilter === 'stock') return notification.type === 'stock';
      if (selectedFilter === 'promo') return notification.type === 'promo';
      return true;
    });
  }, [displayNotifications, selectedFilter]);

  const groupedNotifications = React.useMemo(() => {
    const groups: { [key: string]: Notification[] } = {
      today: [],
      yesterday: [],
      week: []
    };

    filteredNotifications.forEach(notification => {
      groups[notification.date].push(notification);
    });

    return groups;
  }, [filteredNotifications]);

  const handleMarkAllRead = () => {
    if (actions && state?.notifications) {
      state.notifications
        .filter(n => n.audience === 'buyer' && !n.isRead)
        .forEach(notification => {
          actions.markNotificationRead(notification.id);
        });
    }
  };

  const handleMarkAsRead = (id: string) => {
    if (actions) {
      actions.markNotificationRead(id);
    }
  };

  const handleDeleteNotification = (id: string) => {
    // В текущей реализации нет функции удаления, только отметка как прочитанное
    handleMarkAsRead(id);
  };

  const getTodayDate = () => {
    return new Date().toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-24 h-24 bg-luma-primary-200/30 rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl">
          {type === 'orders' && '🧾'}
          {type === 'delivery' && '🚚'}
          {type === 'stock' && '🔔'}
          {type === 'promo' && '🎁'}
          {type === 'all' && '📱'}
        </span>
      </div>
      <p className="text-luma-text-600 text-center">
        Пока уведомлений нет
      </p>
    </div>
  );

  const NotificationCard = ({ notification }: { notification: DisplayNotification }) => {
    const [isSwipeOpen, setIsSwipeOpen] = React.useState(false);
    
    // Определяем, является ли уведомление свежим (менее 1 минуты)
    const isVeryNew = React.useMemo(() => {
      if (!state?.notifications) return false;
      const appNotification = state.notifications.find(n => n.id === notification.id);
      if (!appNotification) return false;
      return (Date.now() - appNotification.createdAt) < 60000; // менее минуты
    }, [notification.id, state?.notifications]);

    return (
      <div className="relative bg-luma-surface-0 rounded-luma shadow-luma-soft overflow-hidden">
        {/* Unread indicator */}
        {!notification.isRead && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-luma-primary-600"></div>
        )}

        {/* Swipe actions */}
        {isSwipeOpen && (
          <div className="absolute right-0 top-0 bottom-0 flex">
            <button
              onClick={() => handleMarkAsRead(notification.id)}
              className="bg-luma-success-600 text-white px-4 flex items-center justify-center min-w-[80px]"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDeleteNotification(notification.id)}
              className="bg-luma-danger-600 text-white px-4 flex items-center justify-center min-w-[80px]"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Main content */}
        <div 
          className="p-4 flex items-start gap-3 min-h-[72px] cursor-pointer active:bg-luma-primary-200/20 transition-colors"
          onTouchStart={(e) => {
            // Simple swipe simulation on long press
            const timeout = setTimeout(() => {
              setIsSwipeOpen(true);
            }, 500);
            
            const cleanup = () => {
              clearTimeout(timeout);
              document.removeEventListener('touchend', cleanup);
              document.removeEventListener('touchmove', cleanup);
            };
            
            document.addEventListener('touchend', cleanup);
            document.addEventListener('touchmove', cleanup);
          }}
          onClick={() => {
            if (isSwipeOpen) {
              setIsSwipeOpen(false);
            } else if (notification.ctaAction) {
              notification.ctaAction();
            }
          }}
        >
          {/* Icon */}
          <div className="w-9 h-9 bg-luma-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-lg">{notification.icon}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h4 className="font-semibold text-luma-text-900 text-sm line-clamp-1">
                {notification.title}
              </h4>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-luma-primary-600 rounded-full"></div>
                )}
                <span className="text-xs text-luma-text-600 uppercase tracking-wide">
                  {notification.time}
                </span>
                {notification.ctaText && (
                  <ChevronRight className="w-4 h-4 text-luma-text-600" />
                )}
              </div>
            </div>
            <p className="text-xs text-luma-text-600 line-clamp-2 mb-2">
              {notification.subtitle}
            </p>
            {notification.ctaText && (
              <Badge 
                className="bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white text-xs px-2 py-1"
              >
                {notification.ctaText}
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  };

  const hasNotifications = filteredNotifications.length > 0;
  const unreadCount = displayNotifications.filter(n => !n.isRead).length;

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          
          <h1 className="text-lg font-semibold text-luma-text-900">Уведомления</h1>

          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className={`text-xs font-medium uppercase tracking-wide px-2 py-1 rounded transition-colors ${
              unreadCount > 0 
                ? 'text-luma-primary-600 hover:bg-luma-primary-200/50' 
                : 'text-luma-text-600/50 cursor-not-allowed'
            }`}
          >
            Отметить всё прочитанным
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pb-4">
        <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                selectedFilter === tab.id
                  ? 'bg-luma-primary-600 text-white'
                  : 'bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <p className="text-xs text-luma-text-600 uppercase tracking-wide">
          {selectedFilter === 'all' ? `Сегодня, ${getTodayDate()}` : 'За последние 30 дней'}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '104px' }}>
        {!hasNotifications ? (
          <EmptyState type={selectedFilter} />
        ) : (
          <div className="px-4 space-y-6">
            {Object.entries(groupedNotifications).map(([dateKey, dayNotifications]) => {
              if (dayNotifications.length === 0) return null;
              
              return (
                <div key={dateKey}>
                  <h3 className="text-sm font-semibold text-luma-text-900 mb-3 px-1">
                    {dateGroups[dateKey as keyof typeof dateGroups]}
                  </h3>
                  <div className="space-y-3">
                    {dayNotifications.map((notification) => (
                      <NotificationCard 
                        key={notification.id} 
                        notification={notification} 
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Bottom Navigation */}
      <div className="flex-shrink-0">
        <FloatingBottomNav 
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>
    </div>
  );
}