import React from 'react';
import { ProductCardSmall } from './ProductCardSmall';
import { ChevronRight } from 'lucide-react';

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

interface ProductCarouselSmallProps {
  title: string;
  products: Product[];
  onProductClick?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  onViewAll?: () => void;
}

export function ProductCarouselSmall({
  title,
  products,
  onProductClick,
  onAddToCart,
  onToggleFavorite,
  onViewAll
}: ProductCarouselSmallProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="section-spacing">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 px-4">
        <h4 className="font-semibold text-luma-text-900">
          {title}
        </h4>
        {onViewAll && (
          <button 
            onClick={onViewAll}
            className="flex items-center gap-1 text-luma-primary-600 font-medium hover:text-luma-primary-500 transition-colors"
          >
            <span className="text-sm">Смотреть всё</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div 
          className="flex gap-3 px-4 pb-2"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory'
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0"
              style={{ 
                scrollSnapAlign: 'start'
              }}
            >
              <ProductCardSmall
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

export default ProductCarouselSmall;