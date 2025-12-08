import React from 'react';

export interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'prominent';
}

export function PriceTag({
  price,
  originalPrice,
  currency = 'сум',
  size = 'md',
  variant = 'default'
}: PriceTagProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-lg', 
    lg: 'text-xl'
  };

  const originalPriceSizeClasses = {
    xs: 'text-[8px]',
    sm: 'text-[10px]',
    md: 'text-sm',
    lg: 'text-base'
  };

  if (variant === 'compact') {
    const compactHeight = size === 'xs' ? 'h-[32px]' : 'h-[38px]';
    const oldPriceHeight = size === 'xs' ? 'h-[12px]' : 'h-[16px]';
    const paddingClass = size === 'xs' ? 'py-0.5 px-1.5' : 'py-1 px-2';
    
    return (
      <div className={`${compactHeight} flex flex-col justify-end`}>
        {/* Фиксированная область для старой цены - всегда занимает место */}
        <div className={`${oldPriceHeight} flex items-start mb-1`}>
          {originalPrice && (
            <span className={`${originalPriceSizeClasses[size]} text-gray-500 leading-none`}>
              было: {originalPrice.toLocaleString()} {currency}
            </span>
          )}
        </div>
        
        {/* Основная цена - всегда в одном месте с фоном */}
        <div className={`bg-[#F6F3FF] rounded-md ${paddingClass} inline-block`}>
          <span className={`font-semibold text-purple-600 ${sizeClasses[size]} leading-none`}>
            {price.toLocaleString()} {currency}
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className="p-3">
        {originalPrice && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500">Было:</span>
            <span className="text-sm line-through text-gray-400">
              {originalPrice.toLocaleString()} {currency}
            </span>
          </div>
        )}
        <div className="bg-[#F6F3FF] rounded-md py-2 px-3 inline-block">
          <span className={`font-bold text-purple-600 ${sizeClasses[size]}`}>
            {price.toLocaleString()} {currency}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {originalPrice && (
        <span className={`line-through text-gray-400 ${originalPriceSizeClasses[size]}`}>
          {originalPrice.toLocaleString()} {currency}
        </span>
      )}
      <div className="bg-[#F6F3FF] rounded-md py-2 px-3 inline-block">
        <span className={`font-semibold text-purple-600 ${sizeClasses[size]}`}>
          {price.toLocaleString()} {currency}
        </span>
      </div>
    </div>
  );
}

export default PriceTag;