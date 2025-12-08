import React from 'react';
import { Phone, MessageCircle, MapPin, Edit } from 'lucide-react';

interface AddressCardProps {
  customerName: string;
  customerPhone: string;
  customerAvatar?: string;
  address: string;
  addressFull?: string;
  notes?: string;
  canEdit?: boolean;
  onCall?: () => void;
  onChat?: () => void;
  onOpenMap?: () => void;
  onEditAddress?: () => void;
}

export function AddressCard({
  customerName,
  customerPhone,
  customerAvatar,
  address,
  addressFull,
  notes,
  canEdit = true,
  onCall,
  onChat,
  onOpenMap,
  onEditAddress
}: AddressCardProps) {
  return (
    <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
      <div className="flex items-start justify-between mb-4">
        <h3 className="luma-type-title-16 text-luma-text-900">Адрес доставки</h3>
        {canEdit && (
          <button
            onClick={onEditAddress}
            className="flex items-center gap-1 px-2 py-1 text-luma-text-600 hover:text-luma-primary-600 transition-colors"
          >
            <Edit className="w-3 h-3" />
            <span className="luma-type-cap-12">Изменить</span>
          </button>
        )}
      </div>

      {/* Customer Info */}
      <div className="flex items-center gap-3 mb-4">
        {customerAvatar ? (
          <img 
            src={customerAvatar} 
            alt={customerName}
            className="w-10 h-10 rounded-xl object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-luma-primary-200 rounded-xl flex items-center justify-center">
            <span className="luma-type-title-14 text-luma-primary-600">
              {customerName.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="flex-1">
          <h4 className="luma-type-title-14 text-luma-text-900">{customerName}</h4>
          <button 
            onClick={onCall}
            className="luma-type-body-14 text-luma-primary-600 hover:underline"
          >
            {customerPhone}
          </button>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 bg-luma-bg-0 rounded-lg flex items-center justify-center flex-shrink-0">
          <MapPin className="w-4 h-4 text-luma-text-600" />
        </div>
        
        <div className="flex-1">
          <p className="luma-type-title-14 text-luma-text-900 mb-1">{address}</p>
          {addressFull && (
            <p className="luma-type-body-14 text-luma-text-600">{addressFull}</p>
          )}
          {notes && (
            <p className="luma-type-body-14 text-luma-text-600 mt-2">
              <span className="luma-type-cap-12">ПРИМЕЧАНИЕ:</span> {notes}
            </p>
          )}
        </div>
      </div>

      {/* Mini Map Preview */}
      <div className="w-full h-24 bg-luma-bg-0 rounded-xl mb-4 flex items-center justify-center border border-luma-border-200">
        <div className="text-center">
          <MapPin className="w-6 h-6 text-luma-text-600 mx-auto mb-1" />
          <span className="luma-type-cap-12 text-luma-text-600">КАРТА</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onCall}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="luma-type-title-14">Позвонить</span>
        </button>
        
        <button
          onClick={onChat}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="luma-type-title-14">Чат</span>
        </button>
        
        <button
          onClick={onOpenMap}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-luma-primary-200 text-luma-primary-600 rounded-xl hover:bg-luma-primary-500 hover:text-white transition-colors"
        >
          <MapPin className="w-4 h-4" />
          <span className="luma-type-title-14">Карта</span>
        </button>
      </div>
    </div>
  );
}