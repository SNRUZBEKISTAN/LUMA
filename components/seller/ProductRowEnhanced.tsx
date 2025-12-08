import React from 'react';
import { MoreVertical, Eye, EyeOff, Edit } from 'lucide-react';

type ProductStatus = 'published' | 'draft' | 'hidden' | 'out_of_stock';

interface ProductRowEnhancedProps {
  imageUrl: string;
  name: string;
  price: string;
  oldPrice?: string;
  stock: number;
  status: ProductStatus;
  sku?: string;
  onEdit?: () => void;
  onToggleVisibility?: () => void;
  onMenu?: () => void;
  onInlineEditPrice?: (newPrice: string) => void;
  onInlineEditStock?: (newStock: number) => void;
}

export function ProductRowEnhanced({
  imageUrl,
  name,
  price,
  oldPrice,
  stock,
  status,
  sku,
  onEdit,
  onToggleVisibility,
  onMenu,
  onInlineEditPrice,
  onInlineEditStock
}: ProductRowEnhancedProps) {
  const [isEditingPrice, setIsEditingPrice] = React.useState(false);
  const [isEditingStock, setIsEditingStock] = React.useState(false);
  const [tempPrice, setTempPrice] = React.useState(price);
  const [tempStock, setTempStock] = React.useState(stock.toString());

  const getStatusConfig = (status: ProductStatus) => {
    switch (status) {
      case 'published':
        return {
          label: 'Опубликован',
          color: 'text-luma-success-600',
          bgColor: 'bg-green-50',
          dotColor: 'bg-luma-success-600'
        };
      case 'draft':
        return {
          label: 'Черновик',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          dotColor: 'bg-orange-600'
        };
      case 'hidden':
        return {
          label: 'Скрыт',
          color: 'text-luma-text-600',
          bgColor: 'bg-gray-50',
          dotColor: 'bg-gray-400'
        };
      case 'out_of_stock':
        return {
          label: 'Нет в наличии',
          color: 'text-luma-danger-600',
          bgColor: 'bg-red-50',
          dotColor: 'bg-luma-danger-600'
        };
      default:
        return {
          label: 'Неизвестно',
          color: 'text-luma-text-600',
          bgColor: 'bg-luma-bg-0',
          dotColor: 'bg-luma-text-600'
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  const handlePriceSubmit = () => {
    if (onInlineEditPrice && tempPrice !== price) {
      onInlineEditPrice(tempPrice);
    }
    setIsEditingPrice(false);
  };

  const handleStockSubmit = () => {
    const newStock = parseInt(tempStock);
    if (onInlineEditStock && !isNaN(newStock) && newStock !== stock) {
      onInlineEditStock(newStock);
    }
    setIsEditingStock(false);
  };

  const handlePriceKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePriceSubmit();
    } else if (e.key === 'Escape') {
      setTempPrice(price);
      setIsEditingPrice(false);
    }
  };

  const handleStockKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStockSubmit();
    } else if (e.key === 'Escape') {
      setTempStock(stock.toString());
      setIsEditingStock(false);
    }
  };

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
          <h3 className="luma-type-title-14 text-luma-text-900 truncate mb-1">{name}</h3>
          
          {/* Status */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${statusConfig.dotColor}`}></div>
            <span className={`luma-type-micro-10 ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            {sku && (
              <>
                <span className="text-luma-text-600">•</span>
                <span className="luma-type-micro-10 text-luma-text-600">SKU: {sku}</span>
              </>
            )}
          </div>
          
          {/* Price in one line */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isEditingPrice ? (
                <input
                  type="text"
                  value={tempPrice}
                  onChange={(e) => setTempPrice(e.target.value)}
                  onBlur={handlePriceSubmit}
                  onKeyDown={handlePriceKeyPress}
                  className="w-24 px-2 py-1 bg-white border border-luma-primary-600 rounded luma-type-price-15 text-luma-text-900"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => setIsEditingPrice(true)}
                  className="hover:bg-luma-bg-0 px-2 py-1 rounded transition-colors"
                >
                  <span className="luma-type-price-15 text-luma-text-900">
                    {price}
                  </span>
                </button>
              )}
              
              {oldPrice && !isEditingPrice && (
                <span className="luma-type-body-14 text-luma-text-600 line-through">
                  {oldPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <span className="luma-type-body-14 text-luma-text-600">Остаток:</span>
              {isEditingStock ? (
                <input
                  type="number"
                  value={tempStock}
                  onChange={(e) => setTempStock(e.target.value)}
                  onBlur={handleStockSubmit}
                  onKeyDown={handleStockKeyPress}
                  className="w-16 px-2 py-1 bg-white border border-luma-primary-600 rounded luma-type-body-14"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => setIsEditingStock(true)}
                  className={`hover:bg-luma-bg-0 px-2 py-1 rounded transition-colors luma-type-body-14 ${
                    stock === 0 ? 'text-luma-danger-600' : 'text-luma-text-900'
                  }`}
                >
                  {stock}
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleVisibility}
            className="p-1.5 hover:bg-luma-bg-0 rounded-lg transition-colors"
            title={status === 'hidden' ? 'Показать товар' : 'Скрыть товар'}
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
            title="Редактировать товар"
          >
            <Edit className="w-4 h-4 text-luma-text-600" />
          </button>
          
          <button
            onClick={onMenu}
            className="p-1.5 hover:bg-luma-bg-0 rounded-lg transition-colors"
            title="Дополнительные действия"
          >
            <MoreVertical className="w-4 h-4 text-luma-text-600" />
          </button>
        </div>
      </div>
    </div>
  );
}