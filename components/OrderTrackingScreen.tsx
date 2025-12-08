import React from 'react';
import { ArrowLeft, Phone, MessageCircle, Package, Truck, CheckCircle, Clock, RotateCcw, X } from 'lucide-react';
import { AppState, AppActions } from '../types/app';
import { getStatusText, getStatusColor, formatPrice } from '../utils/order';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface OrderTrackingScreenProps {
  state: AppState;
  actions: AppActions;
  onBack: () => void;
}

export function OrderTrackingScreen({ state, actions, onBack }: OrderTrackingScreenProps) {
  const order = state.orders.find(o => o.id === state.selectedOrderId);

  if (!order) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500">Заказ не найден</p>
          <Button onClick={onBack} className="mt-4">
            Назад
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="w-5 h-5" />;
      case 'prep': return <Package className="w-5 h-5" />;
      case 'shipped': return <Truck className="w-5 h-5" />;
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'return': return <RotateCcw className="w-5 h-5" />;
      case 'cancel': return <X className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getNextStepText = (status: string) => {
    switch (status) {
      case 'new': return 'Ожидаем подтверждения от продавца';
      case 'prep': return 'Заказ готовится к отправке';
      case 'shipped': return 'Заказ в пути, скоро будет доставлен';
      case 'delivered': return 'Заказ успешно доставлен';
      case 'return': return 'Заказ возвращен';
      case 'cancel': return 'Заказ отменен';
      default: return '';
    }
  };

  const isStepCompleted = (stepStatus: string) => {
    const statusOrder = ['new', 'prep', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    const stepIndex = statusOrder.indexOf(stepStatus);
    return stepIndex <= currentIndex;
  };

  const isStepActive = (stepStatus: string) => {
    return order.status === stepStatus;
  };

  return (
    <div className="flex flex-col h-full bg-luma-background">
      {/* Header */}
      <div className="flex items-center justify-between bg-white border-b border-gray-100 pt-[50px] pr-[14px] pb-[14px] pl-[14px]">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-semibold">Заказ {order.number}</h1>
            <p className="text-sm text-gray-500">{new Date(order.dateISO).toLocaleDateString('ru-RU')}</p>
          </div>
        </div>
        <Badge className={getStatusColor(order.status)}>
          {getStatusText(order.status)}
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Карточка заказа */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Информация о заказе</CardTitle>
              {order.eta && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Ожидаемая доставка</p>
                  <p className="font-medium">{new Date(order.eta).toLocaleDateString('ru-RU')}</p>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Адрес доставки */}
            <div>
              <p className="text-sm font-medium text-gray-500">Адрес доставки</p>
              <p className="mt-1">{order.address}</p>
            </div>

            {/* Товары */}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Товары</p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{item.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {item.size && <span>Размер: {item.size}</span>}
                        {item.color && <span>Цвет: {item.color}</span>}
                        <span>Кол-во: {item.quantity}</span>
                      </div>
                    </div>
                    <p className="font-medium">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Разбивка суммы */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары</span>
                  <span>{formatPrice(order.fees.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span>{formatPrice(order.fees.deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Комиссия сервиса</span>
                  <span>{formatPrice(order.fees.serviceFee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Итого</span>
                  <span className="text-primary">{formatPrice(order.fees.total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Трекинг статусов */}
        <Card>
          <CardHeader>
            <CardTitle>Статус заказа</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Timeline */}
              <div className="relative">
                {['new', 'prep', 'shipped', 'delivered'].map((status, index) => {
                  const isCompleted = isStepCompleted(status);
                  const isActive = isStepActive(status);
                  const event = order.timeline.find(e => e.status === status);
                  
                  return (
                    <div key={status} className="flex items-start gap-4">
                      {/* Линия */}
                      {index < 3 && (
                        <div className={`absolute left-6 mt-8 w-0.5 h-8 ${
                          isCompleted ? 'bg-primary' : 'bg-gray-200'
                        }`} />
                      )}
                      
                      {/* Иконка */}
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                        isCompleted 
                          ? 'bg-primary border-primary text-white' 
                          : isActive
                          ? 'bg-white border-primary text-primary'
                          : 'bg-gray-100 border-gray-200 text-gray-400'
                      }`}>
                        {getStatusIcon(status)}
                      </div>
                      
                      {/* Контент */}
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                            {getStatusText(status as any)}
                          </h4>
                          {event && (
                            <span className="text-sm text-gray-500">
                              {new Date(event.at).toLocaleString('ru-RU', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                        {event?.note && (
                          <p className="text-sm text-gray-500 mt-1">{event.note}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Что дальше */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Что дальше?</h4>
                <p className="text-sm text-gray-600 mt-1">{getNextStepText(order.status)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Действия */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Связаться с продавцом
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Поддержка
          </Button>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            // Имитация обновления статуса
            console.log('Обновление статуса заказа...');
          }}
        >
          Обновить статус
        </Button>
      </div>
    </div>
  );
}