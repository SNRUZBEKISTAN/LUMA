import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ProfileTemplate } from './ProfileTemplate';
import { CreditCard, Plus, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'uzcard' | 'humo' | 'payme' | 'click' | 'uzum';
  lastFour: string;
  isDefault: boolean;
  expiryDate?: string;
  holderName?: string;
  isEnabled: boolean;
}

interface PaymentsScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function PaymentsScreen({ onBack, onTabChange, activeTab }: PaymentsScreenProps) {
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      lastFour: '1234',
      isDefault: true,
      expiryDate: '12/26',
      holderName: 'Тестовый Пользователь',
      isEnabled: true
    },
    {
      id: '2',
      type: 'uzcard',
      lastFour: '5678',
      isDefault: false,
      expiryDate: '10/25',
      holderName: 'Тестовый Пользователь',
      isEnabled: true
    },
    {
      id: '3',
      type: 'payme',
      lastFour: '',
      isDefault: false,
      isEnabled: false
    },
    {
      id: '4',
      type: 'click',
      lastFour: '',
      isDefault: false,
      isEnabled: false
    },
    {
      id: '5',
      type: 'uzum',
      lastFour: '',
      isDefault: false,
      isEnabled: false
    }
  ]);

  const getCardIcon = (type: PaymentMethod['type']) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      uzcard: '💳',
      humo: '💳',
      payme: '💰',
      click: '⚡',
      uzum: '🟢'
    };
    return icons[type];
  };

  const getCardName = (type: PaymentMethod['type']) => {
    const names = {
      visa: 'Visa',
      mastercard: 'Mastercard',
      uzcard: 'UzCard',
      humo: 'Humo',
      payme: 'Payme',
      click: 'Click',
      uzum: 'Uzum'
    };
    return names[type];
  };

  const handleSetDefault = (methodId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
    toast.success('Способ оплаты установлен как основной');
  };

  const handleRemoveCard = (methodId: string) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
    toast.success('Карта удалена');
  };

  const handleAddCard = () => {
    toast.info('Функция добавления карты будет доступна позже');
  };

  const enabledMethods = paymentMethods.filter(method => method.isEnabled);
  const disabledMethods = paymentMethods.filter(method => !method.isEnabled);

  return (
    <ProfileTemplate
      title="Способы оплаты"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="list"
    >
      <div className="space-y-6">
        {/* Enabled Payment Methods */}
        <div className="space-y-4">
          <h3 className="font-medium text-luma-text-900">Привязанные карты</h3>
          
          {enabledMethods.map((method) => (
            <Card key={method.id} className="p-4 border-luma-border-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-luma-primary-200 rounded-xl flex items-center justify-center text-xl">
                  {getCardIcon(method.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-luma-text-900">
                      {getCardName(method.type)}
                      {method.lastFour && ` •••• ${method.lastFour}`}
                    </h4>
                    {method.isDefault && (
                      <Badge className="bg-luma-primary-600 text-white text-xs">
                        Основная
                      </Badge>
                    )}
                  </div>
                  {method.expiryDate && (
                    <p className="text-sm text-luma-text-600">
                      Действует до {method.expiryDate}
                    </p>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-luma-text-600 hover:bg-luma-primary-200"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
              
              {!method.isDefault && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-luma-border-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                    className="border-luma-primary-600 text-luma-primary-600 hover:bg-luma-primary-600 hover:text-white"
                  >
                    Сделать основной
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveCard(method.id)}
                    className="border-luma-danger-600 text-luma-danger-600 hover:bg-luma-danger-600 hover:text-white"
                  >
                    Удалить
                  </Button>
                </div>
              )}
            </Card>
          ))}
          
          {/* Add New Card Button */}
          <Button
            variant="outline"
            onClick={handleAddCard}
            className="w-full p-4 h-auto border-dashed border-luma-border-200 hover:bg-luma-primary-200/50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Добавить карту
          </Button>
        </div>

        {/* Disabled Payment Methods */}
        {disabledMethods.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-luma-text-900">Доступные способы</h3>
            
            {disabledMethods.map((method) => (
              <Card key={method.id} className="p-4 border-luma-border-200 opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">
                      {getCardIcon(method.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-luma-text-900">
                        {getCardName(method.type)}
                      </h4>
                      <p className="text-sm text-luma-text-600">
                        В разработке
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                    Скоро
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Security Note */}
        <div className="bg-luma-bg-0 p-4 rounded-2xl border border-luma-border-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-luma-success-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">🔒</span>
            </div>
            <div>
              <h4 className="font-medium text-luma-text-900 mb-1">
                Безопасность данных
              </h4>
              <p className="text-sm text-luma-text-600 leading-relaxed">
                Данные ваших карт надежно защищены и хранятся у платёжного провайдера. 
                luma не хранит номера карт и CVV-коды.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProfileTemplate>
  );
}