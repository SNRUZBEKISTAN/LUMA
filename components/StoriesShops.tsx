import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Shop {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
  hasNewStory?: boolean;
}

interface StoriesShopsProps {
  shops: Shop[];
  onShopClick: (shopId: string) => void;
  canAddShops?: boolean;
  onAddShop?: () => void;
}

export function StoriesShops({ shops, onShopClick, canAddShops = false, onAddShop }: StoriesShopsProps) {
  return (
    <div className="px-6 py-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {/* Shops Stories */}
        {shops.map((shop) => (
          <div key={shop.id} className="flex flex-col items-center flex-shrink-0">
            <button
              onClick={() => onShopClick(shop.id)}
              className="relative hover:scale-105 transition-transform"
            >
              {/* Story Ring */}
              <div className={`w-16 h-16 rounded-full p-0.5 ${
                shop.hasNewStory 
                  ? 'bg-gradient-to-tr from-luma-primary via-luma-pink to-luma-turquoise' 
                  : 'bg-gray-200'
              }`}>
                <div className="w-full h-full bg-luma-card rounded-full p-0.5">
                  {/* Avatar */}
                  <div className="w-full h-full rounded-full overflow-hidden">
                    {shop.avatar.startsWith('http') ? (
                      <ImageWithFallback
                        src={shop.avatar}
                        alt={shop.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-gray-100">
                        {shop.avatar}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Online Indicator */}
              {shop.isOnline && (
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-luma-mint rounded-full border-2 border-luma-card"></div>
              )}
            </button>
            
            {/* Shop Name */}
            <span className="text-xs text-luma-text-dark mt-2 font-medium max-w-16 text-center truncate">
              {shop.name === 'directory' || !shop.name ? 'Магазин' : shop.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}