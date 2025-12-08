import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { OrderCard } from './OrderCard';
import { SafeBottomSpacer } from './SafeBottomSpacer';
import { Search, Filter, Calendar } from 'lucide-react';

const orderTabs = [
  { id: 'all', label: 'Все' },
  { id: 'new', label: 'Новые' },
  { id: 'prep', label: 'К подготовке' },
  { id: 'shipped', label: 'Передано' },
  { id: 'delivered', label: 'Доставлено' },
  { id: 'return', label: 'Возвраты' },
  { id: 'cancel', label: 'Отмены' },
];

const mockOrders = [
  { orderNumber: 'A-274593', status: 'new' as const, customerName: 'Анна К.', amount: '640 000', items: 3, time: '5 мин назад' },
  { orderNumber: 'A-274592', status: 'prep' as const, customerName: 'Дмитрий М.', amount: '320 000', items: 1, time: '15 мин назад' },
  { orderNumber: 'A-274591', status: 'shipped' as const, customerName: 'Елена С.', amount: '180 000', items: 2, time: '1 час назад' },
  { orderNumber: 'A-274590', status: 'delivered' as const, customerName: 'Михаил А.', amount: '450 000', items: 2, time: '2 часа назад' },
  { orderNumber: 'A-274589', status: 'return' as const, customerName: 'Ольга П.', amount: '220 000', items: 1, time: '3 часа назад' },
  { orderNumber: 'A-274588', status: 'cancel' as const, customerName: 'Сергей В.', amount: '380 000', items: 3, time: '4 часа назад' },
];

interface SellerOrdersProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onOrderClick?: (orderId: string) => void;
}

export function SellerOrders({ activeTab, onTabChange, onBack, onNavigate, onOrderClick }: SellerOrdersProps) {
  const [selectedOrderTab, setSelectedOrderTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = mockOrders.filter(order => {
    const matchesTab = selectedOrderTab === 'all' || order.status === selectedOrderTab;
    const matchesSearch = searchQuery === '' || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Заказы"
        onBack={onBack}
        rightIcons={['bell']}
        onBellClick={() => onNavigate('notifications')}
        storeSelector={false}
      />
      
      <div className="flex-1 overflow-y-auto safe-bottom">
        {/* Order Tabs */}
        <div className="px-4 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {orderTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedOrderTab(tab.id)}
                className={`px-4 py-2 rounded-2xl luma-type-cap-12 whitespace-nowrap transition-colors ${
                  selectedOrderTab === tab.id
                    ? 'bg-luma-primary-600 text-white'
                    : 'bg-luma-surface-0 text-luma-text-600 border border-luma-border-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-4 mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luma-text-600" />
              <input
                type="text"
                placeholder="Поиск по номеру заказа или клиенту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-luma-surface-0 rounded-2xl luma-type-body-14 border border-luma-border-200 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
              />
            </div>
            
            <button className="p-3 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors">
              <Filter className="w-5 h-5 text-luma-text-600" />
            </button>
            
            <button className="p-3 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors">
              <Calendar className="w-5 h-5 text-luma-text-600" />
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="px-4 pb-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-luma-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-luma-primary-600" />
              </div>
              <h3 className="luma-type-title-16 text-luma-text-900 mb-2">Заказы не найдены</h3>
              <p className="luma-type-body-14 text-luma-text-600">
                Попробуйте изменить фильтры или поисковый запрос
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order, index) => (
                <OrderCard 
                  key={index} 
                  {...order}
                  onClick={() => onOrderClick?.(order.orderNumber)}
                />
              ))}
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