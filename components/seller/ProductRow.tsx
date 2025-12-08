import React from 'react';
import { MoreVertical, Eye, EyeOff, Edit } from 'lucide-react';

type ProductStatus = 'published' | 'draft' | 'hidden' | 'out_of_stock';

interface ProductRowProps {
  imageUrl: string;
  name: string;
  price: string;
  stock: number;
  status: ProductStatus;
  sku?: string;
  onEdit?: () => void;
  onToggleVisibility?: () => void;
  onMenu?: () => void;
}

export function ProductRow({
  imageUrl,
  name,
  price,
  stock,
  status,
  sku,
  onEdit,
  onToggleVisibility,
  onMenu
}: ProductRowProps) {
  const getStatusConfig = (status: ProductStatus) => {
    switch (status) {
      case 'published':
        return {
          label: 'Опубликован',
          color: 'text-luma-success-600',
          bgColor: 'bg-green-50'
        };
      case 'draft':
        return {
          label: 'Черновик',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        };
      case 'hidden':
        return {
          label: 'Скрыт',
          color: 'text-luma-text-600',
          bgColor: 'bg-gray-50'
        };
      case 'out_of_stock':
        return {
          label: 'Нет в наличии',
          color: 'text-luma-danger-600',
          bgColor: 'bg-red-50'
        };
      default:
        return {
          label: 'Неизвестно',
          color: 'text-luma-text-600',
          bgColor: 'bg-luma-bg-0'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="w-18 h-18 bg-luma-bg-0 rounded-xl overflow-hidden flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="luma-type-title-14 text-luma-text-900 truncate">{name}</h3>
          {sku && (
            <p className="luma-type-micro-10 text-luma-text-600 mb-1">SKU: {sku}</p>
          )}
          <div className="flex items-center gap-3">
            <span className="luma-type-price-15 text-luma-text-900">{price}</span>
            <span className="luma-type-body-14 text-luma-text-600">Остаток: {stock}</span>
          </div>
        </div>
        
        {/* Status */}
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-lg luma-type-micro-10 ${statusConfig.bgColor} ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
          
          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleVisibility}
              className="p-1.5 hover:bg-luma-bg-0 rounded-lg transition-colors"
            >
              {status === 'hidden' ? (
                <EyeOff className="w-4 h-4 text-luma-text-600" />
              ) : (
                <Eye className="w-4 h-4 text-luma-text-600" />
              )}
            </button>
            
            <button
              onClick={onEdit}
              className="p-1.5 hover:bg-luma-bg-0 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4 text-luma-text-600" />
            </button>
            
            <button
              onClick={onMenu}
              className="p-1.5 hover:bg-luma-bg-0 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-luma-text-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}