import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProfileTemplate } from './ProfileTemplate';
import { Package, Truck, CheckCircle, RotateCcw, Calendar, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Order {
  id: string;
  number: string;
  date: string;
  status: 'processing' | 'shipping' | 'completed' | 'returned';
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

interface OrdersScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onOpenTracking?: (orderId: string) => void;
}

export function OrdersScreen({ onBack, onTabChange, activeTab }: OrdersScreenProps) {
  const [activeOrderTab, setActiveOrderTab] = React.useState('all');

  const orders: Order[] = [
    {
      id: '1',
      number: '#12034',
      date: '2025-01-08',
      status: 'shipping',
      total: 450000,
      items: [
        {
          id: '1',
          name: 'Стильная куртка',
          image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=48&h=48&fit=crop',
          price: 280000,
          quantity: 1
        },
        {
          id: '2',
          name: 'Джинсы слим',
          image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=48&h=48&fit=crop',
          price: 170000,
          quantity: 1
        }
      ]
    },
    {
      id: '2',
      number: '#12033',
      date: '2025-01-05',
      status: 'completed',
      total: 320000,
      items: [
        {
          id: '3',
          name: 'Летнее платье',
          image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=48&h=48&fit=crop',
          price: 210000,
          quantity: 1
        },
        {
          id: '4',
          name: 'Сандалии',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=48&h=48&fit=crop',
          price: 110000,
          quantity: 1
        }
      ]
    },
    {
      id: '3',
      number: '#12032',
      date: '2025-01-03',
      status: 'processing',
      total: 890000,
      items: [
        {
          id: '5',
          name: 'Вечернее платье',
          image: 'https://images.unsplash.com/photo-1566479179817-0dcc6b11d8b5?w=48&h=48&fit=crop',
          price: 890000,
          quantity: 1
        }
      ]
    }
  ];

  const getStatusInfo = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return {
          label: 'В обработке',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Package
        };
      case 'shipping':
        return {
          label: 'Доставка',
          color: 'bg-blue-100 text-blue-800',
          icon: Truck
        };
      case 'completed':
        return {
          label: 'Доставлен',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle
        };
      case 'returned':
        return {
          label: 'Возврат',
          color: 'bg-gray-100 text-gray-800',
          icon: RotateCcw
        };
      default:
        return {
          label: 'Неизвестно',
          color: 'bg-gray-100 text-gray-800',
          icon: Package
        };
    }
  };

  const filterOrders = (status?: Order['status']) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const getFilteredOrders = () => {
    switch (activeOrderTab) {
      case 'processing':
        return filterOrders('processing');
      case 'shipping':
        return filterOrders('shipping');
      case 'completed':
        return filterOrders('completed');
      case 'returned':
        return filterOrders('returned');
      default:
        return orders;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} сум`;
  };

  const handleOrderDetails = (orderId: string) => {
    console.log('Open order details:', orderId);
  };

  const handleTrackOrder = (orderId: string) => {
    console.log('Track order:', orderId);
  };

  const filteredOrders = getFilteredOrders();

  return (
    <ProfileTemplate
      title="Мои заказы"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="tabs"
      empty={filteredOrders.length === 0}
      emptyTitle="Нет заказов"
      emptyDescription="Здесь появятся ваши заказы"
    >
      <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="all" className="text-xs">Все</TabsTrigger>
          <TabsTrigger value="processing" className="text-xs">В обработке</TabsTrigger>
          <TabsTrigger value="shipping" className="text-xs">Доставка</TabsTrigger>
          <TabsTrigger value="completed" className="text-xs">Доставлен</TabsTrigger>
          <TabsTrigger value="returned" className="text-xs">Возвраты</TabsTrigger>
        </TabsList>

        <TabsContent value={activeOrderTab} className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;

            return (
              <Card key={order.id} className="p-4 space-y-4 border-luma-border-200">
                {/* Order Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-luma-text-900">
                        Заказ {order.number}
                      </h3>
                      <Badge className={`${statusInfo.color} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-luma-text-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(order.date)}
                      </div>
                      <span>•</span>
                      <span className="font-medium text-luma-primary-600">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-luma-text-900">
                    Товары ({order.items.length})
                  </h4>
                  <div className="flex gap-2 overflow-x-auto">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-luma-bg-0"
                      >
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOrderDetails(order.id)}
                    className="flex-1 border-luma-border-200 text-luma-text-900 hover:bg-luma-primary-200"
                  >
                    Детали
                  </Button>
                  {(order.status === 'shipping' || order.status === 'processing') && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTrackOrder(order.id)}
                      className="flex-1 border-luma-primary-600 text-luma-primary-600 hover:bg-luma-primary-600 hover:text-white"
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Трек
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </ProfileTemplate>
  );
}