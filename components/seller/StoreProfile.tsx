import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { SafeBottomSpacer } from './SafeBottomSpacer';
import { 
  Edit, 
  Eye, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  Instagram, 
  Facebook, 
  Share,
  Copy,
  QrCode,
  Settings,
  TrendingUp,
  Users,
  Heart,
  ShoppingBag,
  Camera
} from 'lucide-react';

interface StoreProfileProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const storeStats = [
  { label: 'Подписчики', value: '2.1K', icon: <Users className="w-4 h-4" /> },
  { label: 'Лайки', value: '15.8K', icon: <Heart className="w-4 h-4" /> },
  { label: 'Продажи', value: '892', icon: <ShoppingBag className="w-4 h-4" /> },
  { label: 'Просмотры', value: '45.2K', icon: <Eye className="w-4 h-4" /> },
];

const workingHours = [
  { day: 'Понедельник', hours: '09:00 - 20:00' },
  { day: 'Вторник', hours: '09:00 - 20:00' },
  { day: 'Среда', hours: '09:00 - 20:00' },
  { day: 'Четверг', hours: '09:00 - 20:00' },
  { day: 'Пятница', hours: '09:00 - 20:00' },
  { day: 'Суббота', hours: '10:00 - 18:00' },
  { day: 'Воскресенье', hours: 'Закрыто' },
];

export function StoreProfile({ activeTab, onTabChange, onBack, onNavigate }: StoreProfileProps) {
  const [activeTab2, setActiveTab2] = useState('info');

  const profileTabs = [
    { id: 'info', label: 'Информация' },
    { id: 'stats', label: 'Статистика' },
    { id: 'reviews', label: 'Отзывы' },
  ];

  return (
    <div className="flex flex-col h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Профиль магазина"
        onBack={onBack}
        rightIcons={['bell']}
        onBellClick={() => onNavigate('notifications')}
        storeSelector={false}
      />

      <div className="flex-1 overflow-y-auto safe-bottom">
        {/* Store Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-luma-primary relative">
            <button className="absolute top-3 right-3 p-2 bg-black bg-opacity-30 rounded-lg">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Store Avatar & Basic Info */}
          <div className="px-4 -mt-12 relative">
            <div className="flex items-end gap-4">
              <div className="relative">
                <div className="w-24 h-24 bg-luma-surface-0 rounded-2xl border-4 border-white flex items-center justify-center shadow-luma-soft">
                  <span className="text-luma-primary-600 text-2xl font-bold">U</span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-luma-primary-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="luma-type-title-16 text-luma-text-900">Urban Store</h1>
                  <div className="px-2 py-0.5 bg-green-50 rounded-lg">
                    <span className="luma-type-micro-10 text-luma-success-600">Верифицирован</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="luma-type-body-14 text-luma-text-900">4.8</span>
                  <span className="luma-type-body-14 text-luma-text-600">(234 отзыва)</span>
                </div>
                
                <p className="luma-type-body-14 text-luma-text-600">
                  Современная мода и стиль для городской жизни
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => onNavigate('storeSettings')}
                className="flex-1 flex items-center justify-center gap-2 h-11 bg-luma-primary-600 text-white rounded-xl luma-type-title-14 hover:bg-luma-primary-500 transition-colors"
              >
                <Edit className="w-4 h-4" />
                Редактировать
              </button>
              
              <button className="flex items-center justify-center gap-2 h-11 px-4 bg-luma-surface-0 border border-luma-border-200 rounded-xl luma-type-title-14 text-luma-text-900 hover:bg-luma-bg-0 transition-colors">
                <Eye className="w-4 h-4" />
                Предпросмотр
              </button>
              
              <button className="flex items-center justify-center gap-2 h-11 px-4 bg-luma-surface-0 border border-luma-border-200 rounded-xl luma-type-title-14 text-luma-text-900 hover:bg-luma-bg-0 transition-colors">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 mt-6">
          <div className="grid grid-cols-4 gap-3">
            {storeStats.map((stat, index) => (
              <div key={index} className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4 text-center">
                <div className="flex justify-center mb-2 text-luma-primary-600">
                  {stat.icon}
                </div>
                <p className="luma-type-title-14 text-luma-text-900 mb-1">{stat.value}</p>
                <p className="luma-type-micro-10 text-luma-text-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="px-4 mt-6">
          <div className="flex bg-luma-bg-0 rounded-xl p-1">
            {profileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab2(tab.id)}
                className={`flex-1 py-2 rounded-lg luma-type-title-14 transition-colors ${
                  activeTab2 === tab.id
                    ? 'bg-luma-surface-0 text-luma-text-900 shadow-sm'
                    : 'text-luma-text-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4 mt-6">
          {activeTab2 === 'info' && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
                <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Контактная информация</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-luma-text-600" />
                    <div>
                      <p className="luma-type-body-14 text-luma-text-900">ул. Амира Темура, 15</p>
                      <p className="luma-type-micro-10 text-luma-text-600">Ташкент, Узбекистан</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-luma-text-600" />
                    <div>
                      <p className="luma-type-body-14 text-luma-text-900">+998 90 123 45 67</p>
                      <p className="luma-type-micro-10 text-luma-text-600">Основной номер</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-luma-text-600" />
                    <div>
                      <p className="luma-type-body-14 text-luma-text-900">urbanstore.uz</p>
                      <p className="luma-type-micro-10 text-luma-text-600">Веб-сайт</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
                <h3 className="luma-type-title-16 text-luma-text-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Часы работы
                </h3>
                
                <div className="space-y-2">
                  {workingHours.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="luma-type-body-14 text-luma-text-900">{item.day}</span>
                      <span className={`luma-type-body-14 ${
                        item.hours === 'Закрыто' 
                          ? 'text-luma-text-600' 
                          : 'text-luma-text-900'
                      }`}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
                <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Социальные сети</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <div className="flex-1">
                      <p className="luma-type-body-14 text-luma-text-900">@urbanstore_uz</p>
                      <p className="luma-type-micro-10 text-luma-text-600">Instagram</p>
                    </div>
                    <button className="p-2 hover:bg-luma-bg-0 rounded-lg">
                      <Copy className="w-4 h-4 text-luma-text-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Facebook className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="luma-type-body-14 text-luma-text-900">Urban Store Tashkent</p>
                      <p className="luma-type-micro-10 text-luma-text-600">Facebook</p>
                    </div>
                    <button className="p-2 hover:bg-luma-bg-0 rounded-lg">
                      <Copy className="w-4 h-4 text-luma-text-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
                <h3 className="luma-type-title-16 text-luma-text-900 mb-4 flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  QR-код магазина
                </h3>
                
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-luma-bg-0 rounded-xl flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-luma-text-600" />
                  </div>
                  <div className="flex-1">
                    <p className="luma-type-body-14 text-luma-text-900 mb-2">
                      Покажите покупателям для быстрого доступа к вашему магазину
                    </p>
                    <button className="px-4 py-2 bg-luma-primary-600 text-white rounded-xl luma-type-cap-12">
                      Скачать QR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab2 === 'stats' && (
            <div className="space-y-6">
              <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
                <h3 className="luma-type-title-16 text-luma-text-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Подробная статистика
                </h3>
                <p className="luma-type-body-14 text-luma-text-600 mb-4">
                  Посмотрите детальную аналитику в разделе Аналитика
                </p>
                <button 
                  onClick={() => onNavigate('analytics')}
                  className="w-full py-3 bg-luma-primary-600 text-white rounded-xl luma-type-title-14"
                >
                  Перейти к аналитике
                </button>
              </div>
            </div>
          )}

          {activeTab2 === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
                <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Последние отзывы</h3>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-luma-border-200 pb-4 last:border-b-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-luma-primary-200 rounded-lg flex items-center justify-center">
                          <span className="luma-type-cap-12 text-luma-primary-600">A</span>
                        </div>
                        <div className="flex-1">
                          <p className="luma-type-title-14 text-luma-text-900">Анна К.</p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="luma-type-micro-10 text-luma-text-600">2 дня назад</span>
                      </div>
                      <p className="luma-type-body-14 text-luma-text-900">
                        Отличный магазин! Быстрая доставка и качественные товары.
                      </p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 py-3 bg-luma-bg-0 text-luma-text-900 rounded-xl luma-type-title-14">
                  Смотреть все отзывы
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Safe Bottom Spacer */}
        <SafeBottomSpacer />
      </div>

      <SellerBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}