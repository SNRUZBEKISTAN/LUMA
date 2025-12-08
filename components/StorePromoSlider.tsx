import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PromoSlide {
  id: string;
  storeName: string;
  logo: string;
  productImage: string;
  title: string;
  description: string;
  bgColor?: string;
  storeId?: string;
  productId?: string;
}

interface StorePromoSliderProps {
  onSlideClick?: (slide: PromoSlide) => void;
  className?: string;
}

const mockSlides: PromoSlide[] = [
  {
    id: '1',
    storeName: 'Zara',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
    productImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=80&h=80&fit=crop&crop=center',
    title: 'Скидки до 70%',
    description: 'Летняя коллекция',
    bgColor: 'bg-gradient-to-r from-red-50 to-pink-50'
  },
  {
    id: '2',
    storeName: 'H&M',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop&crop=center',
    productImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=80&h=80&fit=crop&crop=center',
    title: 'Новая коллекция',
    description: 'Осень 2024',
    bgColor: 'bg-gradient-to-r from-green-50 to-emerald-50'
  },
  {
    id: '3',
    storeName: 'Uniqlo',
    logo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop&crop=center',
    productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop&crop=center',
    title: 'Базовые вещи',
    description: 'От 299 000 сум',
    bgColor: 'bg-gradient-to-r from-blue-50 to-cyan-50'
  },
  {
    id: '4',
    storeName: 'Nike',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&crop=center',
    productImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=80&h=80&fit=crop&crop=center',
    title: 'Спорт стиль',
    description: 'Кроссовки и одежда',
    bgColor: 'bg-gradient-to-r from-orange-50 to-amber-50'
  },
  {
    id: '5',
    storeName: 'Adidas',
    logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop&crop=center',
    productImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=80&h=80&fit=crop&crop=center',
    title: 'Фитнес линия',
    description: '3 полоски стиля',
    bgColor: 'bg-gradient-to-r from-purple-50 to-pink-50'
  }
];

export function StorePromoSlider({ onSlideClick, className = '' }: StorePromoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % mockSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSlideClick = (slide: PromoSlide) => {
    if (onSlideClick) {
      onSlideClick(slide);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative h-16 overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / mockSlides.length)}%)`,
            width: `${mockSlides.length * 100}%`
          }}
        >
          {mockSlides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 h-full cursor-pointer"
              style={{ width: `${100 / mockSlides.length}%` }}
              onClick={() => handleSlideClick(slide)}
            >
              <div className={`h-full mx-2 rounded-xl ${slide.bgColor || 'bg-white'} border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200`}>
                <div className="flex items-center h-full px-4 gap-3">
                  {/* Store Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={slide.logo}
                        alt={slide.storeName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {slide.storeName}
                      </p>
                      <span className="text-xs text-gray-500">•</span>
                      <p className="font-semibold text-sm text-gray-900 truncate">
                        {slide.title}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 truncate">
                      {slide.description}
                    </p>
                  </div>

                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={slide.productImage}
                        alt="Product"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {mockSlides.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] w-4' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default StorePromoSlider;