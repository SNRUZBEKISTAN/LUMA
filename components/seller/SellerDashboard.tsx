import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { StoreSelector } from './StoreSelector';
import { KPICard } from './KPICard';
import { CompactChart } from './CompactChart';
import { OrderCard } from './OrderCard';
import { Plus, Video, Tag, MessageCircle, ShoppingBag, TrendingUp, Eye, Package, RotateCcw, AlertTriangle } from 'lucide-react';

const mockKPIData = [
  { title: 'Заказы сегодня', value: '12', delta: { value: '+5%', type: 'up' as const }, icon: <ShoppingBag className="w-4 h-4 text-luma-primary-600" /> },
  { title: 'Выручка', value: '18.4', suffix: 'млн', delta: { value: '+12%', type: 'up' as const }, icon: <TrendingUp className="w-4 h-4 text-luma-primary-600" /> },
  { title: 'В подготовке', value: '7', delta: { value: '+2', type: 'up' as const }, icon: <Package className="w-4 h-4 text-orange-600" /> },
  { title: 'Возвраты', value: '2', delta: { value: '-1', type: 'down' as const }, icon: <RotateCcw className="w-4 h-4 text-luma-danger-600" /> },
  { title: 'Просмотры', value: '2.1K', delta: { value: '+18%', type: 'up' as const }, icon: <Eye className="w-4 h-4 text-blue-600" /> },
];

const mockChartData = [
  { name: 'Пн', value: 12 },
  { name: 'Вт', value: 19 },
  { name: 'Ср', value: 8 },
  { name: 'Чт', value: 15 },
  { name: 'Пт', value: 22 },
  { name: 'Сб', value: 28 },
  { name: 'Вс', value: 18 },
];

const mockOrders = [
  { orderNumber: 'A-274593', status: 'new' as const, customerName: 'Анна К.', amount: '640 000', items: 3, time: '5 мин назад' },
  { orderNumber: 'A-274592', status: 'prep' as const, customerName: 'Дмитрий М.', amount: '320 000', items: 1, time: '15 мин назад' },
  { orderNumber: 'A-274591', status: 'shipped' as const, customerName: 'Елена С.', amount: '180 000', items: 2, time: '1 час назад' },
];

const mockStores = [
  { id: '1', name: 'Urban', logo: '', status: 'active' as const, isActive: true },
  { id: '2', name: 'Chic', logo: '', status: 'active' as const },
  { id: '3', name: 'Nova', logo: '', status: 'pending' as const },
];

interface SellerDashboardProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavigate: (screen: string) => void;
}

export function SellerDashboard({ activeTab, onTabChange, onNavigate }: SellerDashboardProps) {
  const [showStoreSelector, setShowStoreSelector] = useState(false);
  const [chartType, setChartType] = useState<'revenue' | 'orders'>('revenue');

  const quickActions = [
    { label: 'Товар', icon: <Plus className="w-5 h-5" />, action: () => onNavigate('inventory'), color: 'bg-luma-primary-600' },
    { label: 'Снять видео', icon: <Video className="w-5 h-5" />, action: () => onNavigate('media'), color: 'bg-purple-600' },
    { label: 'Создать скидку', icon: <Tag className="w-5 h-5" />, action: () => onNavigate('promo'), color: 'bg-orange-600' },
    { label: 'Создать пост', icon: <MessageCircle className="w-5 h-5" />, action: () => onNavigate('media'), color: 'bg-blue-600' },
  ];

  const alerts = [
    { type: 'warning', title: 'Низкий остаток', description: '3 товара заканчиваются', action: 'Пополнить' },
    { type: 'info', title: 'Неотвеченные чаты', description: '2 новых сообщения', action: 'Ответить' },
    { type: 'error', title: 'Просроченный SLA', description: '1 заказ требует внимания', action: 'Обработать' },
  ];

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        storeName="Urban"
        onStoreSelect={() => setShowStoreSelector(true)}
        onBellClick={() => onNavigate('notifications')}
        onSettingsClick={() => onNavigate('settings')}
      />
      
      <div className="pb-20">
        {/* KPI Cards */}
        <div className="p-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {mockKPIData.map((kpi, index) => (
              <div key={index} className="flex-shrink-0 w-44">
                <KPICard {...kpi} />
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="px-4 mb-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="luma-type-title-16 text-luma-text-900">Аналитика</h3>
              <div className="flex bg-luma-bg-0 rounded-xl p-1">
                <button
                  onClick={() => setChartType('revenue')}
                  className={`px-3 py-1 rounded-lg luma-type-cap-12 transition-colors ${
                    chartType === 'revenue'
                      ? 'bg-luma-primary-600 text-white'
                      : 'text-luma-text-600'
                  }`}
                >
                  Выручка
                </button>
                <button
                  onClick={() => setChartType('orders')}
                  className={`px-3 py-1 rounded-lg luma-type-cap-12 transition-colors ${
                    chartType === 'orders'
                      ? 'bg-luma-primary-600 text-white'
                      : 'text-luma-text-600'
                  }`}
                >
                  Заказы
                </button>
              </div>
            </div>
            <CompactChart
              data={mockChartData}
              title=""
              type="line"
            />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="luma-type-title-16 text-luma-text-900">Последние заказы</h3>
            <button
              onClick={() => onNavigate('orders')}
              className="luma-type-title-14 text-luma-primary-600"
            >
              Все заказы
            </button>
          </div>
          <div className="space-y-3">
            {mockOrders.map((order, index) => (
              <OrderCard key={index} {...order} />
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="px-4 mb-6">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Требует внимания</h3>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-orange-50' :
                    alert.type === 'error' ? 'bg-red-50' : 'bg-blue-50'
                  }`}>
                    <AlertTriangle className={`w-4 h-4 ${
                      alert.type === 'warning' ? 'text-orange-600' :
                      alert.type === 'error' ? 'text-luma-danger-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="luma-type-title-14 text-luma-text-900">{alert.title}</h4>
                    <p className="luma-type-body-14 text-luma-text-600">{alert.description}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-luma-primary-600 text-white rounded-lg luma-type-cap-12">
                    {alert.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-6">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} text-white rounded-2xl p-4 flex flex-col items-center gap-2 hover:opacity-90 transition-opacity`}
              >
                {action.icon}
                <span className="luma-type-title-14">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <SellerBottomNav activeTab={activeTab} onTabChange={onTabChange} />
      
      <StoreSelector
        isOpen={showStoreSelector}
        onClose={() => setShowStoreSelector(false)}
        stores={mockStores}
        onSelectStore={(id) => {
          console.log('Selected store:', id);
          setShowStoreSelector(false);
        }}
        onCreateStore={() => {
          setShowStoreSelector(false);
          onNavigate('createStore');
        }}
        onManageStores={() => {
          setShowStoreSelector(false);
          onNavigate('settings');
        }}
      />
    </div>
  );
}