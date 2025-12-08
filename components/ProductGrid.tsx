import React from 'react';
import { ProductCardModern } from './ProductCardModern';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  categoryPath?: string[];
  structuredAttributes?: Array<{
    id: string;
    value: any;
    label?: string;
  }>;
  store: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface ProductGridProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
  onStoreClick?: (storeId: string) => void;
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function ProductGrid({
  products,
  onProductClick,
  onStoreClick,
  onAddToCart,
  className = ''
}: ProductGridProps) {
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
    <div className={`grid grid-cols-2 gap-3 px-4 ${className}`}>
      {products.map((product) => (
        <ProductCardModern
          key={product.id}
          id={product.id}
          title={product.name}
          image={product.image}
          price={product.price}
          originalPrice={product.originalPrice}
          storeName={product.store.name}
          storeIcon={product.store.avatar}
          categoryPath={product.categoryPath}
          structuredAttributes={product.structuredAttributes}
          onProductClick={handleProductClick}
          onStoreClick={() => handleStoreClick(product.store.id)}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}