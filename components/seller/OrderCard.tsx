import React from 'react';
import { Clock, Package, Truck, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

type OrderStatus = 'new' | 'prep' | 'shipped' | 'delivered' | 'cancelled';

interface OrderCardProps {
  orderNumber: string;
  status: OrderStatus;
  customerName: string;
  amount: string;
  items: number;
  time: string;
  onClick?: () => void;
}

export function OrderCard({
  orderNumber,
  status,
  customerName,
  amount,
  items,
  time,
  onClick
}: OrderCardProps) {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          label: 'Новый',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-200'
        };
      case 'prep':
        return {
          icon: <Package className="w-4 h-4" />,
          label: 'К подготовке',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-600',
          borderColor: 'border-orange-200'
        };
      case 'shipped':
        return {
          icon: <Truck className="w-4 h-4" />,
          label: 'Отправлен',
          bgColor: 'bg-luma-primary-200',
          textColor: 'text-luma-primary-600',
          borderColor: 'border-luma-primary-500'
        };
      case 'delivered':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Доставлен',
          bgColor: 'bg-green-50',
          textColor: 'text-green-600',
          borderColor: 'border-green-200'
        };
      case 'cancelled':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          label: 'Отменён',
          bgColor: 'bg-red-50',
          textColor: 'text-red-600',
          borderColor: 'border-red-200'
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          label: 'Неизвестно',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const handleClick = () => {
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4 hover:bg-luma-bg-0 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:ring-opacity-50"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="luma-type-title-14 text-luma-text-900 mb-1">
            Заказ №{orderNumber}
          </h3>
          <p className="luma-type-body-14 text-luma-text-600">{customerName}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg border ${statusConfig.bgColor} ${statusConfig.borderColor}`}>
            <div className={statusConfig.textColor}>
              {statusConfig.icon}
            </div>
            <span className={`luma-type-cap-12 ${statusConfig.textColor}`}>
              {statusConfig.label}
            </span>
          </div>
          
          <ArrowRight className="w-4 h-4 text-luma-text-600" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <p className="luma-type-price-15 text-luma-text-900">{amount}</p>
            <p className="luma-type-body-14 text-luma-text-600">
              {items} {items === 1 ? 'товар' : items < 5 ? 'товара' : 'товаров'}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 text-luma-text-600">
            <Clock className="w-3 h-3" />
            <span className="luma-type-body-14">{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}