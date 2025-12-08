import React from 'react';
import { ProductCardCompact } from './ProductCardCompact';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  storeName: string;
  storeAvatar: string;
}

interface ProductCarouselProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
  onStoreClick?: (storeId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export function ProductCarousel({
  products,
  onProductClick,
  onStoreClick,
  onAddToCart
}: ProductCarouselProps) {
  const handleProductClick = (productId: string) => {
    onProductClick?.(productId);
  };

  const handleStoreClick = (storeId: string) => {
    onStoreClick?.(storeId);
  };

  const handleAddToCart = (productId: string) => {
    onAddToCart?.(productId);
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden scrollbar-hide" 
         style={{ 
           scrollSnapType: 'x mandatory',
           paddingLeft: '16px',
           paddingRight: '16px'
         }}>
      <div 
        className="flex gap-3" 
        style={{ 
          width: 'max-content'
        }}
      >
        {products.map((product) => (
          <div 
            key={product.id}
            className="flex-shrink-0"
            style={{ 
              scrollSnapAlign: 'start',
              width: '120px'
            }}
          >
            <ProductCardCompact
              id={product.id}
              title={product.name}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              storeName={product.storeName}
              storeIcon={product.storeAvatar}
              onProductClick={handleProductClick}
              onStoreClick={() => handleStoreClick(product.id)}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>
    </div>
  );
}