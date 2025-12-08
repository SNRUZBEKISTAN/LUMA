import React from 'react';
import { Button } from './ui/button';
import { Check, ArrowLeft } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onAction: (action: 'status' | 'home') => void;
  orderNumber: string;
}

export function OrderSuccessModal({ isOpen, onAction, orderNumber }: OrderSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-luma-surface-0 rounded-luma-lg shadow-luma-floating max-w-sm w-full mx-4 animate-scale-in">
        <div className="p-6 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-luma-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-luma-text-900 mb-2">
            Заказ оформлен!
          </h2>

          {/* Order Number */}
          <p className="text-luma-text-600 mb-6">
            Номер заказа: <span className="font-semibold text-luma-text-900">{orderNumber}</span>
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => onAction('status')}
              className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma h-12 font-semibold"
            >
              Посмотреть статус заказа
            </Button>
            
            <Button
              onClick={() => onAction('home')}
              variant="ghost"
              className="w-full text-luma-text-600 hover:text-luma-primary-600 hover:bg-luma-primary-200/50 rounded-luma h-12 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}