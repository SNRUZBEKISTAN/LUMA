import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { ProductImageContainer } from './ProductImageContainer';
import { PriceTag } from './PriceTag';
import { ProductAttributesDisplay } from './ProductAttributesDisplay';
import { toast } from 'sonner@2.0.3';

export interface ProductCardModernProps {
  // Data
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  storeName?: string;
  storeIcon?: string;
  
  // New attributes system
  categoryPath?: string[];
  structuredAttributes?: Array<{
    id: string;
    value: any;
    label?: string;
  }>;
  
  // Event handlers
  onProductClick?: (id: string) => void;
  onStoreClick?: (storeId: string) => void;
  onAddToCart?: (id: string) => void;
}

export function ProductCardModern({
  id,
  title,
  price,
  originalPrice,
  image,
  storeName,
  storeIcon = '🏪',
  categoryPath,
  structuredAttributes,
  onProductClick,
  onStoreClick,
  onAddToCart
}: ProductCardModernProps) {
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
    toast.success(`${title} добавлен в корзину`);
  };

  // Рассчитаем процент скидки
  const discountPercent = originalPrice && price < originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 ease-in cursor-pointer hover:scale-[1.02] overflow-hidden group border border-gray-100 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      {/* Image Container */}
      <ProductImageContainer
        src={image}
        alt={title}
        aspectRatio="1:1"
        rounded="xl"
        overlay={
          <>
            {/* Discount Badge with Old Price - top left */}
            {discountPercent && originalPrice && (
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-luma-discount text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                  <span className="line-through opacity-90 text-[9px] leading-tight">
                    {originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
            
            {/* Cart Button - always visible on mobile, appears on hover on desktop */}
            <button
              onClick={handleAddToCart}
              className={`absolute bottom-3 right-3 w-8 h-8 bg-luma-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-luma-primary-500 transition-all duration-200 active:scale-95 z-10 ${
                isHovered 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-70 scale-90 md:opacity-0 md:scale-75 md:group-hover:opacity-100 md:group-hover:scale-100'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </>
        }
      />

      {/* Content */}
      <div className="p-3 flex flex-col h-[120px]">
        {/* Store Info */}
        {storeName && (
          <button
            onClick={handleStoreClick}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1.5"
          >
            {storeIcon && (storeIcon.startsWith('http') || storeIcon.startsWith('/')) ? (
              <img 
                src={storeIcon} 
                alt={storeName}
                className="w-4 h-4 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-xs">{storeIcon || '🏪'}</span>
            )}
            <span className="font-medium uppercase tracking-wide">{storeName === 'directory' || !storeName ? 'Магазин' : storeName}</span>
          </button>
        )}

        {/* Product Title - фиксированная высота для 2 строк */}
        <div className="h-[36px] mb-2">
          <h3 className="font-medium line-clamp-2 leading-tight">
            {title}
          </h3>
        </div>

        {/* Spacer - заполняет оставшееся пространство */}
        <div className="flex-1"></div>

        {/* Price Section - всегда в нижней части */}
        <div className="mt-auto">
          <PriceTag 
            price={price}
            originalPrice={discountPercent ? undefined : originalPrice}
            size="md"
            variant="default"
          />
        </div>

        {/* Quick Attributes - только ключевые характеристики */}
        {categoryPath && structuredAttributes && structuredAttributes.length > 0 && (
          <div className="mt-1.5">
            <ProductAttributesDisplay
              categoryPath={categoryPath}
              attributes={structuredAttributes}
              compact={true}
              className="text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCardModern;