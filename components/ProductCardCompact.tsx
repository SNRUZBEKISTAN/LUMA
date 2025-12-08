import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { ProductImageContainer } from './ProductImageContainer';
import { PriceTag } from './PriceTag';
import { toast } from 'sonner@2.0.3';

export interface ProductCardCompactProps {
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

export function ProductCardCompact({
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
}: ProductCardCompactProps) {
  const [showCartButton, setShowCartButton] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);
  
  // Рассчитаем процент скидки
  const discountPercent = originalPrice && price < originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleTouchStart = () => {
    setIsTouched(true);
    setShowCartButton(true);
  };

  const handleTouchEnd = () => {
    // Оставляем кнопку видимой немного дольше на мобильных
    setTimeout(() => {
      if (isTouched) {
        setShowCartButton(false);
        setIsTouched(false);
      }
    }, 3000);
  };

  const handleMouseEnter = () => {
    if (!isTouched) {
      setShowCartButton(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouched) {
      setShowCartButton(false);
    }
  };

  return (
    <div 
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-150 ease-in-out hover:scale-[1.02] cursor-pointer w-full"
      onClick={() => onProductClick?.(id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Изображение товара - aspect-ratio 1:1 с overlay скидки */}
      <div className="relative">
        <ProductImageContainer 
          src={image} 
          alt={title}
          className="w-full aspect-square object-cover rounded-t-xl shadow-sm"
        />
        
        {/* Discount Badge with Old Price - top left */}
        {discountPercent && originalPrice && (
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-luma-discount text-white px-1.5 py-0.5 rounded text-xs font-semibold">
              <span className="line-through opacity-90 text-[8px] leading-tight">
                {originalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        )}
        
        {/* Кнопка корзины - всегда видна на мобильных, появляется при hover на десктопе */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Переходим на страницу товара для выбора размера и цвета
            onProductClick?.(id);
          }}
          className={`absolute bottom-2 right-2 bg-luma-primary-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-luma-primary-500 active:scale-95 z-10 ${
            showCartButton || isTouched 
              ? 'opacity-100 scale-100' 
              : 'opacity-70 scale-90 md:opacity-0 md:scale-75 md:group-hover:opacity-100 md:group-hover:scale-100'
          }`}
        >
          <ShoppingCart className="w-3 h-3" />
        </button>
      </div>

      {/* Контент - увеличенная область для комфортного размещения */}
      <div className="p-3 h-[98px] flex flex-col justify-between mt-[0px] mr-[0px] mb-[5px] ml-[0px]">
        {/* Магазин - увеличенная высота */}
        <div className="h-[20px] flex items-center">
          {storeName && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onStoreClick?.(id);
              }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-luma-primary-600 transition-colors w-full justify-start"
            >
              {storeIcon && (storeIcon.startsWith('http') || storeIcon.startsWith('/')) ? (
                <img 
                  src={storeIcon} 
                  alt={storeName}
                  className="w-3 h-3 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-xs">{storeIcon || '🏪'}</span>
              )}
              <span className="truncate">{storeName === 'directory' || !storeName ? 'Магазин' : storeName}</span>
            </button>
          )}
        </div>

        {/* Название товара - больше места для 2 строк */}
        <div className="h-[36px] flex items-start">
          <h3 className="text-sm font-medium text-luma-text-900 line-clamp-2 leading-tight w-full">
            {title}
          </h3>
        </div>

        {/* Цена - увеличенная область */}
        <div className="h-[36px] flex items-end">
          <PriceTag 
            price={price}
            originalPrice={discountPercent ? undefined : originalPrice}
            size="sm"
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
}