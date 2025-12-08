import React from 'react';
import { ProfileTemplate } from './ProfileTemplate';
import { ProductCardModern } from './ProductCardModern';

interface FavoritesScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function FavoritesScreen({ onBack, onTabChange, activeTab }: FavoritesScreenProps) {
  // Mock favorites data - в реальном приложении будет из localStorage или API
  const favoriteProducts = [
    {
      id: '1',
      title: 'Элегантное платье миди с поясом',
      price: 450000,
      originalPrice: 600000,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
      storeName: 'Urban',
      storeIcon: '🏙️'
    },
    {
      id: '2',
      title: 'Кожаные ботинки премиум',
      price: 520000,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      storeName: 'Nova',
      storeIcon: '✨'
    },
    {
      id: '3',
      title: 'Дизайнерская сумка кросс-боди',
      price: 680000,
      originalPrice: 890000,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      storeName: 'Chic',
      storeIcon: '💅'
    },
    {
      id: '4',
      title: 'Трендовые кроссовки унисекс',
      price: 390000,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      storeName: 'Aura',
      storeIcon: '🌟'
    },
    {
      id: '5',
      title: 'Летнее платье в стиле бохо',
      price: 210000,
      originalPrice: 300000,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
      storeName: 'Pink',
      storeIcon: '🌸'
    },
    {
      id: '6',
      title: 'Стильная блуза с рукавами',
      price: 280000,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      storeName: 'Pink',
      storeIcon: '🌸'
    }
  ];

  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId);
  };

  const handleStoreClick = (storeId: string) => {
    console.log('Store clicked:', storeId);
  };

  const handleAddToCart = (productId: string) => {
    console.log('Added to cart:', productId);
  };

  return (
    <ProfileTemplate
      title="Избранное"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="grid"
      empty={favoriteProducts.length === 0}
      emptyTitle="Нет избранных товаров"
      emptyDescription="Здесь появятся сохранённые товары"
    >
      <div className="grid grid-cols-2 gap-3">
        {favoriteProducts.map((product) => (
          <ProductCardModern
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            originalPrice={product.originalPrice}
            storeName={product.storeName}
            storeIcon={product.storeIcon}
            onProductClick={handleProductClick}
            onStoreClick={handleStoreClick}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </ProfileTemplate>
  );
}