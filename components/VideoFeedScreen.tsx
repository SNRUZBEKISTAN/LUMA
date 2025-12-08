import React from 'react';
import { VideoFeed } from './VideoFeed';
import { FloatingBottomNav } from './FloatingBottomNav';
import { Product } from '../types/app';

interface VideoFeedScreenProps {
  products: Product[];
  onBack: () => void;
  onOpenProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  cartItemCount?: number;
}

export default function VideoFeedScreen({ 
  products, 
  onBack, 
  onOpenProduct, 
  onAddToCart,
  onTabChange,
  activeTab,
  cartItemCount = 0
}: VideoFeedScreenProps) {
  // Debug log для проверки данных
  React.useEffect(() => {
    console.log('🎬 VideoFeedScreen загружен с данными:', {
      productsCount: products.length,
      firstProduct: products[0]?.name
    });
  }, [products]);

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Video Feed - занимает весь экран, но учитывает навигацию */}
      <VideoFeed 
        products={products}
        onOpenProduct={onOpenProduct}
        onAddToCart={onAddToCart}
      />

      {/* Floating Navigation Bar */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
        cartItemCount={cartItemCount}
        removeRounding={true}
      />
    </div>
  );
}