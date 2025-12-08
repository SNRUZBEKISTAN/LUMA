import React from 'react';
import ProductCardStandard from './ProductCardStandard';
import { ProductCardCompact } from './ProductCardCompact';

interface Product {
  id: string;
  name: string;
  storeName?: string;
  storeAvatar?: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
  isFavorite?: boolean;
}

interface ProductCarouselStandardProps {
  title: string;
  products: Product[];
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  onViewAll?: () => void;
}

export default function ProductCarouselStandard({
  title,
  products,
  onProductClick,
  onAddToCart,
  onToggleFavorite,
  onViewAll
}: ProductCarouselStandardProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h4 className="text-[16px] font-bold text-gray-900">
          {title}
        </h4>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-[14px] font-semibold text-violet-600 hover:text-violet-700 transition-colors"
          >
            Смотреть всё ›
          </button>
        )}
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 pb-2">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0"
              style={{ 
                scrollSnapAlign: 'start',
                width: '120px',
                height: '210px'
              }}
            >
              <ProductCardCompact
                id={product.id}
                title={product.name}
                storeName={product.storeName}
                storeIcon={product.storeAvatar}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                onProductClick={onProductClick}
                onStoreClick={() => console.log('Store clicked:', product.storeName)}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}