import React from 'react';

type OrderStatus = 'new' | 'preparing' | 'handed' | 'in_transit' | 'delivered' | 'return' | 'cancelled';

interface ActionButton {
  label: string;
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  action: () => void;
}

interface OrderActionBarProps {
  status: OrderStatus;
  onAccept?: () => void;
  onCancel?: () => void;
  onCall?: () => void;
  onReadyForPickup?: () => void;
  onPrintLabel?: () => void;
  onOrderCourier?: () => void;
  onTrack?: () => void;
  onChangeSlot?: () => void;
  onCallCustomer?: () => void;
  onCreateReturn?: () => void;
  onInvoice?: () => void;
  onDuplicateOrder?: () => void;
  onHistory?: () => void;
  onChat?: () => void;
}

export function OrderActionBar({
  status,
  onAccept,
  onCancel,
  onCall,
  onReadyForPickup,
  onPrintLabel,
  onOrderCourier,
  onTrack,
  onChangeSlot,
  onCallCustomer,
  onCreateReturn,
  onInvoice,
  onDuplicateOrder,
  onHistory,
  onChat
}: OrderActionBarProps) {
  const getActionsForStatus = (status: OrderStatus): ActionButton[] => {
    switch (status) {
      case 'new':
        return [
          { label: 'Принять', variant: 'primary', action: onAccept! },
          { label: 'Отменить', variant: 'secondary', action: onCancel! },
          { label: 'Позвонить', variant: 'ghost', action: onCall! },
        ];
      case 'preparing':
        return [
          { label: 'Готов к передаче', variant: 'primary', action: onReadyForPickup! },
          { label: 'Печать наклейки', variant: 'secondary', action: onPrintLabel! },
          { label: 'Заказать курьера', variant: 'ghost', action: onOrderCourier! },
        ];
      case 'handed':
      case 'in_transit':
        return [
          { label: 'Трек', variant: 'primary', action: onTrack! },
          { label: 'Изменить слот', variant: 'secondary', action: onChangeSlot! },
          { label: 'Позвонить покупателю', variant: 'ghost', action: onCallCustomer! },
        ];
      case 'delivered':
        return [
          { label: 'Создать возврат', variant: 'primary', action: onCreateReturn! },
          { label: 'Счёт/Чек', variant: 'secondary', action: onInvoice! },
          { label: 'Дубликат заказа', variant: 'ghost', action: onDuplicateOrder! },
        ];
      case 'return':
        return [
          { label: 'Оформить возврат', variant: 'primary', action: onCreateReturn! },
          { label: 'Чат', variant: 'secondary', action: onChat! },
          { label: 'История', variant: 'ghost', action: onHistory! },
        ];
      case 'cancelled':
        return [
          { label: 'Дубликат заказа', variant: 'primary', action: onDuplicateOrder! },
          { label: 'История', variant: 'ghost', action: onHistory! },
        ];
      default:
        return [];
    }
  };

  const actions = getActionsForStatus(status);

  if (actions.length === 0) {
    return null;
  }

  const getButtonClasses = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-luma-primary-600 text-white hover:bg-luma-primary-500';
      case 'secondary':
        return 'bg-luma-bg-0 text-luma-text-900 border border-luma-border-200 hover:bg-luma-surface-0';
      case 'ghost':
        return 'text-luma-text-600 hover:text-luma-primary-600 hover:bg-luma-primary-50';
      case 'danger':
        return 'bg-luma-danger-600 text-white hover:bg-red-500';
      default:
        return 'bg-luma-bg-0 text-luma-text-900 border border-luma-border-200';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom" style={{ paddingBottom: 'calc(72px + env(safe-area-inset-bottom))' }}>
      <div className="flex gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`flex-1 py-4 rounded-2xl luma-type-title-14 transition-colors ${getButtonClasses(action.variant)}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}