import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ProductImageContainer } from './ProductImageContainer';
import { PriceTag } from './PriceTag';

export interface ProductCardSmallProps {
  // Data
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  storeName?: string;
  storeIcon?: string;
  
  // Event handlers
  onProductClick?: (id: string) => void;
  onStoreClick?: (storeId: string) => void;
  onAddToCart?: (id: string) => void;
}

export function ProductCardSmall({
  id,
  title,
  price,
  originalPrice,
  image,
  storeName,
  storeIcon = '🏪',
  onProductClick,
  onStoreClick,
  onAddToCart
}: ProductCardSmallProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleProductClick = () => {
    onProductClick?.(id);
  };

  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStoreClick?.(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(id);
  };

  // Рассчитаем процент скидки
  const discountPercent = originalPrice && price < originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 ease-in cursor-pointer hover:scale-[1.02] overflow-hidden group border border-gray-100"
      style={{ width: '140px', height: '220px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Image Container - Fixed aspect ratio */}
      <div className="relative" style={{ height: '140px' }}>
        <ProductImageContainer
          src={image}
          alt={title}
          aspectRatio="1:1"
          rounded="none"
          className="w-full h-full object-cover"
          overlay={
            <>
              {/* Discount Badge - top left */}
              {discountPercent && originalPrice && (
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-luma-discount text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                    −{discountPercent}%
                  </div>
                </div>
              )}
              
              {/* Cart Button - appears on hover */}
              <div 
                className={`absolute bottom-2 right-2 transition-all duration-200 ${
                  isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                <button
                  onClick={handleAddToCart}
                  className="w-7 h-7 bg-luma-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-luma-primary-500 transition-colors"
                >
                  <ShoppingCart className="w-3 h-3" />
                </button>
              </div>
            </>
          }
        />
      </div>

      {/* Content - Fixed height */}
      <div className="p-2" style={{ height: '80px' }}>
        {/* Store Info */}
        {storeName && (
          <button
            onClick={handleStoreClick}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-luma-primary-600 transition-colors mb-1 w-full justify-start"
          >
            {storeIcon && (storeIcon.startsWith('http') || storeIcon.startsWith('/')) ? (
              <img 
                src={storeIcon} 
                alt={storeName}
                className="w-3 h-3 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-xs">{storeIcon || '🏪'}</span>
            )}
            <span className="font-medium uppercase tracking-wide truncate text-xs">
              {storeName === 'directory' || !storeName ? 'Магазин' : storeName}
            </span>
          </button>
        )}

        {/* Product Title - Fixed height */}
        <h3 className="font-medium line-clamp-2 leading-tight text-xs mb-2" style={{ height: '32px' }}>
          {title}
        </h3>

        {/* Price Section - Fixed height */}
        <div style={{ height: '20px' }}>
          <PriceTag 
            price={price}
            originalPrice={discountPercent ? undefined : originalPrice}
            size="xs"
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCardSmall;