import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ProfileTemplate } from './ProfileTemplate';
import { MapPin, Plus, MoreHorizontal, Home, Building2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Address {
  id: string;
  name: string;
  type: 'home' | 'work' | 'other';
  address: string;
  phone: string;
  isDefault: boolean;
  details?: {
    apartment?: string;
    entrance?: string;
    floor?: string;
    comment?: string;
  };
}

interface AddressesScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function AddressesScreen({ onBack, onTabChange, activeTab }: AddressesScreenProps) {
  const [addresses, setAddresses] = React.useState<Address[]>([
    {
      id: '1',
      name: 'Дом',
      type: 'home',
      address: 'ул. Амира Темура, 15, Ташкент',
      phone: '+998 90 123 45 67',
      isDefault: true,
      details: {
        apartment: '12',
        entrance: '2',
        floor: '3',
        comment: 'Домофон 12'
      }
    },
    {
      id: '2',
      name: 'Офис',
      type: 'work',
      address: 'ул. Шахрисабз, 25, Ташкент',
      phone: '+998 90 123 45 67',
      isDefault: false,
      details: {
        floor: '7',
        comment: 'Офис 701'
      }
    }
  ]);

  const getAddressIcon = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return Home;
      case 'work':
        return Building2;
      default:
        return MapPin;
    }
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
    toast.success('Адрес установлен как основной');
  };

  const handleEdit = (addressId: string) => {
    toast.info('Функция редактирования адреса будет доступна позже');
  };

  const handleDelete = (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    toast.success('Адрес удален');
  };

  const handleAddAddress = () => {
    toast.info('Функция добавления адреса будет доступна позже');
  };

  return (
    <ProfileTemplate
      title="Адреса доставки"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="list"
    >
      <div className="space-y-4">
        {/* Existing Addresses */}
        {addresses.map((address) => {
          const IconComponent = getAddressIcon(address.type);
          
          return (
            <Card key={address.id} className="p-4 border-luma-border-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-luma-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-5 h-5 text-luma-primary-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-luma-text-900">
                      {address.name}
                    </h3>
                    {address.isDefault && (
                      <Badge className="bg-luma-primary-600 text-white text-xs">
                        Основной
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-luma-text-900 mb-1">
                    {address.address}
                  </p>
                  
                  {address.details && (
                    <div className="text-sm text-luma-text-600 mb-1">
                      {address.details.apartment && `кв. ${address.details.apartment}`}
                      {address.details.entrance && `, подъезд ${address.details.entrance}`}
                      {address.details.floor && `, этаж ${address.details.floor}`}
                      {address.details.comment && `, ${address.details.comment}`}
                    </div>
                  )}
                  
                  <p className="text-sm text-luma-text-600">
                    {address.phone}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-luma-text-600 hover:bg-luma-primary-200"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-luma-border-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(address.id)}
                  className="border-luma-border-200 text-luma-text-900 hover:bg-luma-primary-200"
                >
                  Изменить
                </Button>
                
                {!address.isDefault && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                      className="border-luma-primary-600 text-luma-primary-600 hover:bg-luma-primary-600 hover:text-white"
                    >
                      Сделать основным
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(address.id)}
                      className="border-luma-danger-600 text-luma-danger-600 hover:bg-luma-danger-600 hover:text-white"
                    >
                      Удалить
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
        
        {/* Add New Address Button */}
        <Button
          variant="outline"
          onClick={handleAddAddress}
          className="w-full p-4 h-auto border-dashed border-luma-border-200 hover:bg-luma-primary-200/50"
        >
          <Plus className="w-5 h-5 mr-2" />
          Добавить адрес
        </Button>
        
        {/* Help Text */}
        <div className="bg-luma-bg-0 p-4 rounded-2xl border border-luma-border-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-luma-success-600 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-luma-text-900 mb-1">
                Точный адрес доставки
              </h4>
              <p className="text-sm text-luma-text-600 leading-relaxed">
                Указывайте максимально точный адрес с деталями (квартира, подъезд, этаж), 
                чтобы курьер мог быстро найти вас.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProfileTemplate>
  );
}