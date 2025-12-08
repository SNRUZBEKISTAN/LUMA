import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart, Star, Check, Store } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { formatPrice } from './ui/utils';

export interface ProductCardV3Props {
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
  availability?: 'inStock' | 'low' | 'out';
  likes?: number;
  orders?: number;
  
  // Variants
  size?: 'xs' | 'sm' | 'md' | 'miniH' | 'compact';
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
  onQuickAdd?: (id: string) => void; // Alias for onQuickCart
}

// Favorites management
const useFavorites = () => {
  const [favorites, setFavorites] = React.useState<Set<string>>(
    () => new Set(JSON.parse(localStorage.getItem('luma:favs') || '[]'))
  );

  const toggleFavorite = React.useCallback((productId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      const isAdding = !next.has(productId);
      
      if (isAdding) {
        next.add(productId);
        toast.success('Добавлено в избранное');
      } else {
        next.delete(productId);
        toast.success('Удалено из избранного');
      }
      
      localStorage.setItem('luma:favs', JSON.stringify([...next]));
      return next;
    });
  }, []);

  return { favorites, toggleFavorite };
};

// Cart management with enhanced color states and animations
const useCart = () => {
  const [cartItems, setCartItems] = React.useState<Set<string>>(() => new Set());
  const [cartStates, setCartStates] = React.useState<Map<string, 'adding' | 'removing' | 'blinking' | 'idle'>>(
    () => new Map()
  );

  const toggleCart = React.useCallback((productId: string) => {
    const currentState = cartStates.get(productId) || 'idle';
    
    // Prevent action if currently animating
    if (currentState !== 'idle') {
      return;
    }
    
    const isCurrentlyInCart = cartItems.has(productId);
    
    if (!isCurrentlyInCart) {
      // Adding to cart - show green with checkmark
      setCartStates(prev => new Map(prev).set(productId, 'adding'));
      
      setTimeout(() => {
        setCartItems(prev => new Set(prev).add(productId));
        setCartStates(prev => new Map(prev).set(productId, 'idle'));
        toast.success('Добавлено в корзину');
      }, 300);
    } else {
      // Removing from cart - blink red then return to white
      setCartStates(prev => new Map(prev).set(productId, 'blinking'));
      
      setTimeout(() => {
        setCartStates(prev => new Map(prev).set(productId, 'removing'));
        
        setTimeout(() => {
          setCartItems(prev => {
            const next = new Set(prev);
            next.delete(productId);
            return next;
          });
          setCartStates(prev => new Map(prev).set(productId, 'idle'));
          toast.success('Удалено из корзины');
        }, 300);
      }, 200);
    }
  }, [cartItems, cartStates]);

  const getCartButtonStyle = (productId: string) => {
    const state = cartStates.get(productId) || 'idle';
    const isInCart = cartItems.has(productId);
    
    if (state === 'adding') {
      return 'bg-green-500 text-white border-green-500 animate-pulse';
    } else if (state === 'blinking') {
      return 'bg-red-500 text-white border-red-500 animate-pulse';
    } else if (state === 'removing') {
      return 'bg-red-400 text-white border-red-400';
    } else if (isInCart) {
      return 'bg-green-500 text-white border-green-500 hover:bg-green-600';
    } else {
      return 'bg-white/80 text-luma-text-600 border-transparent hover:bg-white/90';
    }
  };

  const getCartIcon = (productId: string) => {
    const state = cartStates.get(productId) || 'idle';
    const isInCart = cartItems.has(productId);
    
    if (state === 'adding' || (state === 'idle' && isInCart)) {
      return 'check'; // Checkmark for added items
    } else {
      return 'cart'; // Shopping cart for non-added items
    }
  };

  return { cartItems, toggleCart, getCartButtonStyle, getCartIcon };
};

export function ProductCardV3({
  id,
  title,
  price,
  originalPrice,
  image,
  storeName,
  storeAvatar,
  rating,
  discount,
  availability = 'inStock',
  size = 'sm',
  context = 'global',
  hasPill = false,
  hasRating = false,
  liked = false,
  loading = false,
  likes = 0,
  orders = 0,
  onProductClick,
  onStoreClick,
  onLikeToggle,
  onQuickCart,
  onQuickAdd
}: ProductCardV3Props) {
  
  const { favorites, toggleFavorite } = useFavorites();
  const { cartItems, toggleCart, getCartButtonStyle, getCartIcon } = useCart();
  const isLiked = favorites.has(id);
  const isInCart = cartItems.has(id);

  // Size configurations
  const sizeConfig = {
    xs: {
      width: '120px',
      height: '204px',
      titleClass: 'text-xs',
      priceClass: 'luma-type-price-15'
    },
    sm: {
      width: '156px', 
      height: '208px',
      titleClass: 'text-xs',
      priceClass: 'text-sm font-semibold'
    },
    md: {
      width: '172px',
      height: '220px', 
      titleClass: 'luma-type-title-14',
      priceClass: 'luma-type-price-16'
    },
    compact: {
      width: '108px',
      height: '180px',
      titleClass: 'text-xs',
      priceClass: 'text-xs font-semibold'
    },
    miniH: {
      width: '100%',
      height: '96px',
      titleClass: 'text-sm font-semibold',
      priceClass: 'text-base font-bold'
    }
  };

  const config = sizeConfig[size];
  const isOutOfStock = availability === 'out';
  const showStore = storeName; // Always show store if available
  const isHorizontal = size === 'miniH';

  const handleProductClick = () => {
    if (!isOutOfStock && onProductClick) {
      onProductClick(id);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
    if (onLikeToggle) {
      onLikeToggle(id);
    }
  };

  const handleQuickCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
      toggleCart(id);
      if (onQuickCart) {
        onQuickCart(id);
      }
    }
  };

  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStoreClick) {
      onStoreClick(id);
    }
  };

  // Horizontal mini card layout
  if (isHorizontal) {
    return (
      <div 
        className="flex bg-luma-surface-0 border border-luma-border-200 overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform duration-200 shadow-luma-soft"
        style={{
          height: config.height,
          borderRadius: 'var(--luma-space-radius-card)',
        }}
        onClick={handleProductClick}
      >
        {/* Left: Media */}
        <div 
          className="relative w-24 h-24 bg-gray-100 overflow-hidden flex-shrink-0"
          style={{ borderRadius: 'var(--luma-space-radius-media)' }}
        >
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Discount pill */}
          {hasPill && discount && (
            <div 
              className="absolute top-1 left-1 bg-luma-discount text-white px-1 py-0.5 text-xs font-semibold"
              style={{ borderRadius: '6px' }}
            >
              {discount}
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          {/* Top row: Rating */}
          <div className="flex items-center justify-between">
            {hasRating && rating ? (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-semibold text-luma-text-600">
                  {rating.toFixed(1)}
                </span>
              </div>
            ) : (
              <div />
            )}
            
            {/* Heart button */}
            <Button
              variant="ghost"
              size="icon"
              className={`w-6 h-6 rounded-full hover:bg-luma-primary-200/50 ${
                isLiked ? 'text-red-500' : 'text-luma-text-600'
              }`}
              onClick={handleLikeClick}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-luma-text-900 line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Bottom row: Price and button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {originalPrice && (
                <span className="text-xs text-luma-text-600 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span className="text-base font-bold text-purple-600">
                {formatPrice(price)}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs border border-luma-border-200 hover:bg-luma-primary-600 hover:text-white"
              onClick={handleProductClick}
            >
              Подробнее
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div 
        className="flex flex-col bg-luma-surface-0 border border-luma-border-200 overflow-hidden animate-pulse"
        style={{
          width: config.width,
          height: config.height,
          borderRadius: 'var(--luma-space-radius-card)',
          padding: '8px',
          gap: '6px',
          boxShadow: '0 8px 24px rgba(0,0,0,.08)'
        }}
      >
        {/* Media skeleton */}
        <div 
          className="bg-luma-border-200 flex-1"
          style={{ borderRadius: 'var(--luma-space-radius-media)' }}
        />
        
        {/* Store skeleton */}
        {showStore && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-luma-border-200 rounded-full" />
            <div className="h-3 bg-luma-border-200 rounded flex-1" />
          </div>
        )}
        
        {/* Title skeleton */}
        <div className="space-y-1">
          <div className="h-3 bg-luma-border-200 rounded w-full" />
          <div className="h-3 bg-luma-border-200 rounded w-3/4" />
        </div>
        
        {/* Price skeleton */}
        <div className="h-4 bg-luma-border-200 rounded w-1/2" />
        
        {/* Rating skeleton */}
        {hasRating && (
          <div className="h-3 bg-luma-border-200 rounded w-1/3" />
        )}
      </div>
    );
  }

  return (
    <div 
      className="flex flex-col bg-luma-surface-0 border border-luma-border-200 overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      style={{
        width: config.width,
        height: config.height,
        borderRadius: 'var(--luma-space-radius-card)',
        padding: '6px',
        gap: '4px',
        boxShadow: '0 8px 24px rgba(0,0,0,.08)'
      }}
      onClick={handleProductClick}
    >
      {/* Media Container */}
      <div 
        className="relative flex-1 bg-gray-100 overflow-hidden"
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
        
        {/* Top Left Pill - Discount */}
        {hasPill && discount && (
          <div 
            className="absolute top-1.5 left-1.5 bg-luma-discount text-white px-1.5 py-0.5"
            style={{
              fontSize: '10px',
              fontWeight: '600',
              borderRadius: '8px',
              lineHeight: '1.2'
            }}
          >
            {discount}
          </div>
        )}
        
        {/* Top Right Overlay Stack */}
        <div className="absolute top-1.5 right-1.5 flex flex-col gap-1">
          {/* Heart Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 ${
              isLiked ? 'text-red-500' : 'text-luma-text-600'
            }`}
            onClick={handleLikeClick}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          
          {/* Quick Cart Button - ONLY cart control */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-6 h-6 rounded-full backdrop-blur-sm transition-all duration-300 disabled:opacity-50 border ${getCartButtonStyle(id)}`}
            onClick={handleQuickCartClick}
            disabled={isOutOfStock}
          >
            {getCartIcon(id) === 'check' ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" />
            )}
          </Button>
        </div>
        
        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white px-3 py-1 rounded-lg">
              <span className="luma-type-cap-12 text-luma-text-900">
                Нет в наличии
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Store Row (optional) */}
      {showStore && (
        <div 
          className="flex items-center gap-1 cursor-pointer"
          onClick={handleStoreClick}
        >
          <div className="w-4 h-4 bg-luma-primary-200 rounded-full flex items-center justify-center text-xs">
            {storeAvatar || '🏪'}
          </div>
          <span className="text-xs text-luma-text-600 flex-1 truncate" style={{ fontSize: '10px' }}>
            {storeName === 'directory' || !storeName ? 'Магазин' : storeName}
          </span>
        </div>
      )}
      
      {/* Title */}
      <h3 className={`${config.titleClass} text-luma-text-900 line-clamp-2 font-medium`} style={{ lineHeight: '1.2' }}>
        {title}
      </h3>
      
      {/* Store info with likes and orders */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Store className="w-3 h-3" />
          <span className="truncate">{storeName || 'Магазин'}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <span>❤️ {likes}</span>
          <span>📦 {orders}</span>
        </div>
      </div>
      
      {/* Price Row */}
      <div className="flex items-center gap-1 flex-wrap">
        {originalPrice && (
          <span className="text-xs text-luma-text-600 line-through" style={{ fontSize: '10px' }}>
            {formatPrice(originalPrice)}
          </span>
        )}
        <span className={`${config.priceClass} text-purple-600`}>
          {formatPrice(price)}
        </span>
      </div>
      
      {/* Rating (optional) */}
      {hasRating && rating && (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">⭐</span>
          <span className="luma-type-cap-12 text-luma-text-600">
            {rating.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  );
}