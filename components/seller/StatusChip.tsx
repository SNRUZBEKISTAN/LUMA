import React from 'react';

type OrderStatus = 'new' | 'preparing' | 'handed' | 'in_transit' | 'delivered' | 'return' | 'cancelled';

interface StatusChipProps {
  status: OrderStatus;
  label?: string;
  size?: 'sm' | 'md';
}

export function StatusChip({ status, label, size = 'md' }: StatusChipProps) {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return {
          label: label || 'Новый',
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-200',
          dotColor: 'bg-blue-500'
        };
      case 'preparing':
        return {
          label: label || 'К подготовке',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-600',
          borderColor: 'border-orange-200',
          dotColor: 'bg-orange-500'
        };
      case 'handed':
        return {
          label: label || 'Передан курьеру',
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-600',
          borderColor: 'border-purple-200',
          dotColor: 'bg-purple-500'
        };
      case 'in_transit':
        return {
          label: label || 'В пути',
          bgColor: 'bg-luma-primary-200',
          textColor: 'text-luma-primary-600',
          borderColor: 'border-luma-primary-500',
          dotColor: 'bg-luma-primary-600'
        };
      case 'delivered':
        return {
          label: label || 'Доставлен',
          bgColor: 'bg-green-50',
          textColor: 'text-luma-success-600',
          borderColor: 'border-green-200',
          dotColor: 'bg-luma-success-600'
        };
      case 'return':
        return {
          label: label || 'Возврат',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-600',
          borderColor: 'border-yellow-200',
          dotColor: 'bg-yellow-500'
        };
      case 'cancelled':
        return {
          label: label || 'Отменён',
          bgColor: 'bg-red-50',
          textColor: 'text-luma-danger-600',
          borderColor: 'border-red-200',
          dotColor: 'bg-luma-danger-600'
        };
      default:
        return {
          label: 'Неизвестно',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          dotColor: 'bg-gray-400'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5';
  const textSizeClass = size === 'sm' ? 'luma-type-micro-10' : 'luma-type-cap-12';

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-lg border ${sizeClasses} ${config.bgColor} ${config.borderColor}`}>
      <div className={`w-2 h-2 rounded-full ${config.dotColor}`}></div>
      <span className={`${textSizeClass} ${config.textColor}`}>
        {config.label}
      </span>
    </div>
  );
}