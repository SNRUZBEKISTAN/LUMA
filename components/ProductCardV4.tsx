import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PriceTag } from './PriceTag';

export interface ProductCardV4Props {
  // Data
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  storeName?: string;
  storeAvatar?: string;
  rating?: number;
  discount?: string;
  isHit?: boolean;
  availability?: 'inStock' | 'low' | 'out';
  
  // Variants
  size?: 'xs' | 'sm' | 'md';
  context?: 'global' | 'store';
  hasPill?: boolean;
  hasRating?: boolean;
  liked?: boolean;
  loading?: boolean;
  
  // Event handlers
  onProductClick?: (id: string) => void;
  onStoreClick?: (storeId: string) => void;
  onLikeToggle?: (id: string) => void;
  onQuickCart?: (id: string) => void;
}

export function ProductCardV4({
  id,
  title,
  price,
  originalPrice,
  image,
  storeName,
  storeAvatar,
  rating,
  discount,
  isHit = false,
  availability = 'inStock',
  size = 'sm',
  context = 'global',
  hasPill = false,
  hasRating = false,
  liked = false,
  loading = false,
  onProductClick,
  onStoreClick,
  onLikeToggle,
  onQuickCart
}: ProductCardV4Props) {
  
  // Base size configurations (reference sizes for iPhone 16 Pro)
  const baseSizeConfig = {
    xs: {
      baseWidth: 112,
      baseHeight: 204,
      titleSize: 14,
      priceSize: 15
    },
    sm: {
      baseWidth: 156,
      baseHeight: 208,
      titleSize: 14,
      priceSize: 16
    },
    md: {
      baseWidth: 172,
      baseHeight: 220,
      titleSize: 14,
      priceSize: 16
    }
  };

  const baseConfig = baseSizeConfig[size];
  
  // Calculate scale factor based on available width
  // Use 50vw - padding for 2-column grid
  const availableWidth = `calc(50vw - 28px)`;
  
  // Create a scaling system where everything scales proportionally
  const scaleFactor = `calc((50vw - 28px) / ${baseConfig.baseWidth}px)`;
  
  const isOutOfStock = availability === 'out';
  const showStore = context === 'global' && storeName;

  const handleProductClick = () => {
    if (!isOutOfStock && onProductClick) {
      onProductClick(id);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLikeToggle) {
      onLikeToggle(id);
    }
  };

  const handleQuickCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock && onQuickCart) {
      onQuickCart(id);
    }
  };

  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStoreClick) {
      onStoreClick(id);
    }
  };

  if (loading) {
    return (
      <div 
        className="flex flex-col bg-luma-surface-0 border border-luma-border-200 overflow-hidden animate-pulse"
        style={{
          width: availableWidth,
          maxWidth: `${baseConfig.baseWidth + 40}px`,
          minWidth: `${baseConfig.baseWidth - 20}px`,
          height: `calc(${baseConfig.baseHeight}px * ${scaleFactor})`,
          borderRadius: 'var(--luma-space-radius-card)',
          padding: `calc(8px * ${scaleFactor})`,
          gap: `calc(6px * ${scaleFactor})`,
          boxShadow: '0 8px 24px rgba(0,0,0,.08)'
        }}
      >
        {/* Media skeleton */}
        <div 
          className="bg-luma-border-200"
          style={{ 
            borderRadius: 'var(--luma-space-radius-media)',
            aspectRatio: '4/5',
            flex: '1'
          }}
        />
        
        {/* Store skeleton */}
        {showStore && (
          <div className="flex items-center" style={{ gap: `calc(8px * ${scaleFactor})` }}>
            <div 
              className="bg-luma-border-200 rounded-full" 
              style={{ 
                width: `calc(20px * ${scaleFactor})`,
                height: `calc(20px * ${scaleFactor})`
              }} 
            />
            <div 
              className="h-3 bg-luma-border-200 rounded flex-1"
              style={{ height: `calc(12px * ${scaleFactor})` }}
            />
          </div>
        )}
        
        {/* Title skeleton */}
        <div style={{ gap: `calc(4px * ${scaleFactor})` }} className="flex flex-col">
          <div 
            className="bg-luma-border-200 rounded w-full"
            style={{ height: `calc(12px * ${scaleFactor})` }}
          />
          <div 
            className="bg-luma-border-200 rounded w-3/4"
            style={{ height: `calc(12px * ${scaleFactor})` }}
          />
        </div>
        
        {/* Price skeleton */}
        <div 
          className="bg-luma-border-200 rounded w-1/2"
          style={{ height: `calc(16px * ${scaleFactor})` }}
        />
        
        {/* Rating skeleton */}
        {hasRating && (
          <div 
            className="bg-luma-border-200 rounded w-1/3"
            style={{ height: `calc(12px * ${scaleFactor})` }}
          />
        )}
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col bg-luma-surface-0 border border-luma-border-200 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      style={{
        width: availableWidth,
        maxWidth: `${baseConfig.baseWidth + 40}px`,
        minWidth: `${baseConfig.baseWidth - 20}px`,
        borderRadius: 'var(--luma-space-radius-card)',
        padding: `calc(8px * ${scaleFactor})`,
        gap: `calc(6px * ${scaleFactor})`,
        boxShadow: '0 8px 24px rgba(0,0,0,.08)'
      }}
      onClick={handleProductClick}
    >
      {/* Media Container */}
      <div 
        className="relative bg-gray-100 overflow-hidden"
        style={{ 
          aspectRatio: '4/5',
          borderRadius: 'var(--luma-space-radius-media)' 
        }}
      >
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Top Hit Banner - Full Width */}
        {isHit && (
          <div 
            className="absolute top-0 left-0 right-0 bg-luma-hit text-white luma-type-cap-12 text-center"
            style={{ 
              borderRadius: 'var(--luma-space-radius-media) var(--luma-space-radius-media) 0 0',
              padding: `calc(6px * ${scaleFactor}) calc(12px * ${scaleFactor})`,
              fontSize: `calc(12px * ${scaleFactor})`,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            ХИТ
          </div>
        )}
        
        {/* Top Left Pill - Discount */}
        {hasPill && discount && (
          <div 
            className="absolute bg-luma-discount text-white flex items-center justify-center"
            style={{
              left: `calc(8px * ${scaleFactor})`,
              top: isHit ? `calc(40px * ${scaleFactor})` : `calc(8px * ${scaleFactor})`,
              width: `calc(34px * ${scaleFactor})`,
              height: `calc(20px * ${scaleFactor})`,
              borderRadius: `calc(10px * ${scaleFactor})`,
              fontSize: `calc(12px * ${scaleFactor})`,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {discount}
          </div>
        )}
        
        {/* Top Right Overlay Stack */}
        <div 
          className="absolute flex flex-col"
          style={{
            right: `calc(8px * ${scaleFactor})`,
            top: isHit ? `calc(40px * ${scaleFactor})` : `calc(8px * ${scaleFactor})`,
            gap: `calc(6px * ${scaleFactor})`
          }}
        >
          {/* Heart Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 border-0 p-0 ${
              liked ? 'text-red-500' : 'text-luma-text-600'
            }`}
            style={{
              width: `calc(28px * ${scaleFactor})`,
              height: `calc(28px * ${scaleFactor})`,
              minWidth: `calc(28px * ${scaleFactor})`,
              minHeight: `calc(28px * ${scaleFactor})`
            }}
            onClick={handleLikeClick}
          >
            <Heart 
              className={`${liked ? 'fill-current' : ''}`} 
              style={{ 
                width: `calc(16px * ${scaleFactor})`, 
                height: `calc(16px * ${scaleFactor})` 
              }} 
            />
          </Button>
          
          {/* Quick Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 text-luma-text-600 disabled:opacity-50 border-0 p-0"
            style={{
              width: `calc(28px * ${scaleFactor})`,
              height: `calc(28px * ${scaleFactor})`,
              minWidth: `calc(28px * ${scaleFactor})`,
              minHeight: `calc(28px * ${scaleFactor})`
            }}
            onClick={handleQuickCartClick}
            disabled={isOutOfStock}
          >
            <ShoppingCart 
              style={{ 
                width: `calc(16px * ${scaleFactor})`, 
                height: `calc(16px * ${scaleFactor})` 
              }} 
            />
          </Button>
        </div>
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div 
              className="bg-white"
              style={{ 
                padding: `calc(8px * ${scaleFactor}) calc(12px * ${scaleFactor})`,
                borderRadius: `calc(8px * ${scaleFactor})`
              }}
            >
              <span 
                className="text-luma-text-900"
                style={{ 
                  fontSize: `calc(12px * ${scaleFactor})`,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Нет в наличии
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Store Row (optional) */}
      {showStore && (
        <div 
          className="flex items-center cursor-pointer"
          style={{ gap: `calc(8px * ${scaleFactor})` }}
          onClick={handleStoreClick}
        >
          <div 
            className="bg-luma-primary-200 rounded-full flex items-center justify-center"
            style={{
              width: `calc(20px * ${scaleFactor})`,
              height: `calc(20px * ${scaleFactor})`,
              fontSize: `calc(12px * ${scaleFactor})`
            }}
          >
            {storeAvatar || '🏪'}
          </div>
          <span 
            className="text-luma-text-600 flex-1 truncate"
            style={{ 
              fontSize: `calc(12px * ${scaleFactor})`,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {storeName === 'directory' || !storeName ? 'Магазин' : storeName}
          </span>
        </div>
      )}
      
      {/* Title */}
      <h3 
        className="text-luma-text-900 line-clamp-2"
        style={{ 
          fontSize: `calc(${baseConfig.titleSize}px * ${scaleFactor})`,
          fontWeight: '600',
          lineHeight: '1.3'
        }}
      >
        {title}
      </h3>
      
      {/* Price Row */}
      <div style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'left center' }}>
        <PriceTag 
          price={price}
          originalPrice={originalPrice}
          size="md"
          variant="default"
        />
      </div>
      
      {/* Rating (optional) */}
      {hasRating && rating && (
        <div className="flex items-center" style={{ gap: `calc(4px * ${scaleFactor})` }}>
          <span style={{ fontSize: `calc(14px * ${scaleFactor})` }}>⭐</span>
          <span 
            className="text-luma-text-600"
            style={{ 
              fontSize: `calc(12px * ${scaleFactor})`,
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {rating.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
}

export default ProductCardV4;