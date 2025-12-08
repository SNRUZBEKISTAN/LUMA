import React from 'react';
import { Check, Square } from 'lucide-react';

interface ItemRowProps {
  id: string;
  image: string;
  title: string;
  variant?: string;
  price: number;
  quantity: number;
  subtotal: number;
  sku?: string;
  isPacked?: boolean;
  onPackedChange?: (id: string, packed: boolean) => void;
  showPackingCheckbox?: boolean;
}

export function ItemRow({
  id,
  image,
  title,
  variant,
  price,
  quantity,
  subtotal,
  sku,
  isPacked = false,
  onPackedChange,
  showPackingCheckbox = false
}: ItemRowProps) {
  const handlePackedToggle = () => {
    onPackedChange?.(id, !isPacked);
  };

  return (
    <div className="flex items-start gap-4 py-3">
      {/* Packing Checkbox */}
      {showPackingCheckbox && (
        <button
          onClick={handlePackedToggle}
          className="mt-2"
        >
          {isPacked ? (
            <div className="w-5 h-5 bg-luma-success-600 rounded border border-luma-success-600 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
          ) : (
            <Square className="w-5 h-5 text-luma-text-600 border border-luma-border-200 rounded" />
          )}
        </button>
      )}

      {/* Product Image */}
      <div className="w-18 h-18 bg-luma-bg-0 rounded-xl overflow-hidden flex-shrink-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="luma-type-title-14 text-luma-text-900 line-clamp-2 mb-1">
          {title}
        </h4>
        
        {variant && (
          <p className="luma-type-cap-12 text-luma-text-600 mb-1">
            {variant}
          </p>
        )}
        
        {sku && (
          <p className="luma-type-cap-12 text-luma-text-600 mb-2">
            SKU: {sku}
          </p>
        )}
        
        <div className="flex items-center gap-4">
          <span className="luma-type-body-14 text-luma-text-900">
            {price.toLocaleString()} × {quantity}
          </span>
        </div>
      </div>
      
      {/* Subtotal */}
      <div className="text-right">
        <p className="luma-type-price-15 text-luma-text-900">
          {subtotal.toLocaleString()}
        </p>
        {showPackingCheckbox && (
          <p className={`luma-type-micro-10 mt-1 ${isPacked ? 'text-luma-success-600' : 'text-luma-text-600'}`}>
            {isPacked ? 'Собрано' : 'Не собрано'}
          </p>
        )}
      </div>
    </div>
  );
}