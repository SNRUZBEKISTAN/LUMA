import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { PriceTag } from './PriceTag';

interface ProductCardStandardProps {
  id: string;
  name: string;
  storeName?: string;
  storeAvatar?: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onClick?: (id: string) => void;
  isFavorite?: boolean;
}

export default function ProductCardStandard({
  id,
  name,
  storeName,
  storeAvatar,
  price,
  originalPrice,
  image,
  discount,
  onAddToCart,
  onToggleFavorite,
  onClick,
  isFavorite = false
}: ProductCardStandardProps) {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div 
      className="w-[192px] h-[282px] rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white hover:shadow-lg transition-all duration-150 cursor-pointer group"
      onClick={() => onClick?.(id)}
    >
      {/* Media Block */}
      <div className="relative h-[144px] w-full bg-gray-100">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-150"
          onError={(e) => {
            e.currentTarget.src = '/media/placeholder.jpg';
          }}
        />
        
        {/* Discount Badge */}
        {hasDiscount && discount && (
          <div className="absolute left-2 top-2 px-2 py-1 rounded-full text-[12px] font-semibold bg-red-500 text-white">
            -{discount}%
          </div>
        )}
        
        {/* Action Icons */}
        <div className="absolute right-2 top-2 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(id);
            }}
            className="h-7 w-7 rounded-full bg-white shadow ring-1 ring-black/5 grid place-items-center hover:bg-gray-50 transition-colors"
          >
            <Heart 
              className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(id);
            }}
            className="h-7 w-7 rounded-full bg-white shadow ring-1 ring-black/5 grid place-items-center hover:bg-gray-50 transition-colors"
          >
            <ShoppingCart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Content Block */}
      <div className="p-[8px_10px_10px_10px] flex flex-col gap-[6px]">
        {/* Store Name */}
        {storeName && (
          <div className="flex items-center gap-1">
            {storeAvatar && (
              <span className="text-xs">{storeAvatar}</span>
            )}
            <span className="text-[12px] font-medium text-gray-500 truncate">
              {storeName === 'directory' || !storeName ? 'Магазин' : storeName}
            </span>
          </div>
        )}
        
        {/* Product Name */}
        <h3 className="text-[14px] font-semibold leading-tight line-clamp-2 text-gray-900">
          {name}
        </h3>
        
        {/* Prices */}
        <div className="mt-auto">
          <PriceTag 
            price={price}
            originalPrice={hasDiscount ? originalPrice : undefined}
            size="md"
            variant="default"
          />
        </div>
      </div>
    </div>
  );
}