import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, ShoppingCart, Check, Store } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { formatPrice } from './ui/utils';
import { PriceTag } from './PriceTag';

export interface ProductCardMediumProps {
  // Data
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  storeName?: string;
  discount?: string;
  isHit?: boolean;
  likes?: number;
  orders?: number;
  
  // Event handlers
  onProductClick?: (id: string) => void;
  onLikeToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onStoreClick?: (storeId: string) => void;
}

// Cart state management
const useCartState = () => {
  const [cartItems, setCartItems] = React.useState<Set<string>>(() => new Set());
  const [cartStates, setCartStates] = React.useState<Map<string, 'default' | 'added' | 'remove'>>(
    () => new Map()
  );

  const toggleCartState = React.useCallback((productId: string) => {
    const currentState = cartStates.get(productId) || 'default';
    
    // Prevent action if in remove state (animating)
    if (currentState === 'remove') {
      return;
    }
    
    let newState: 'default' | 'added' | 'remove';
    
    if (currentState === 'default') {
      newState = 'added';
      setCartItems(prev => new Set(prev).add(productId));
      toast.success('Добавлено в корзину');
    } else if (currentState === 'added') {
      newState = 'remove';
      setCartItems(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
      toast.success('Удалено из корзины');
      
      // Auto reset remove state to default after animation
      setTimeout(() => {
        setCartStates(prev => new Map(prev).set(productId, 'default'));
      }, 1000);
    }
    
    setCartStates(prev => new Map(prev).set(productId, newState));
  }, []);

  const getCartButtonStyle = (productId: string) => {
    const state = cartStates.get(productId) || 'default';
    
    switch (state) {
      case 'added':
        return 'bg-[#55C2A1] text-white border-[#55C2A1]';
      case 'remove':
        return 'bg-[#FF5C5C] text-white border-[#FF5C5C] animate-pulse';
      default:
        return 'bg-white/80 text-gray-600 border-transparent hover:bg-white/90';
    }
  };

  const getCartIcon = (productId: string) => {
    const state = cartStates.get(productId) || 'default';
    return state === 'added' ? 'check' : 'cart';
  };

  return { toggleCartState, getCartButtonStyle, getCartIcon };
};

// Favorites management
const useFavorites = () => {
  const [favorites, setFavorites] = React.useState<Set<string>>(() => new Set());

  const toggleFavorite = React.useCallback((productId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        toast.success('Удалено из избранного');
      } else {
        next.add(productId);
        toast.success('Добавлено в избранное');
      }
      return next;
    });
  }, []);

  return { favorites, toggleFavorite };
};

export function ProductCardMedium({
  id,
  title,
  price,
  originalPrice,
  image,
  storeName,
  discount,
  isHit,
  likes = 0,
  orders = 0,
  onProductClick,
  onLikeToggle,
  onAddToCart,
  onStoreClick
}: ProductCardMediumProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const { toggleCartState, getCartButtonStyle, getCartIcon } = useCartState();
  const isLiked = favorites.has(id);

  const handleProductClick = () => {
    if (onProductClick) {
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

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(id);
    } else {
      toggleCartState(id);
    }
  };

  const handleStoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStoreClick) {
      onStoreClick(id);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden cursor-pointer group border border-gray-100 hover:shadow-lg transition-all duration-200"
      style={{ 
        minHeight: '220px',
        padding: '12px'
      }}
      onClick={handleProductClick}
    >
      {/* Image Container */}
      <div 
        className="relative w-full overflow-hidden mb-2"
        style={{ 
          aspectRatio: '1:1',
          borderRadius: '8px'
        }}
      >
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        
        {/* Top Left Badge */}
        {(discount || isHit) && (
          <div 
            className="absolute top-2 left-2 px-2 py-1 rounded-lg"
            style={{
              backgroundColor: isHit ? '#FFB366' : '#FF6D9D',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            {isHit ? 'ХИТ' : discount}
          </div>
        )}
        
        {/* Top Right Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {/* Heart Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 ${
              isLiked ? 'text-red-500' : 'text-gray-600'
            }`}
            onClick={handleLikeClick}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`w-7 h-7 rounded-full transition-all duration-300 border ${getCartButtonStyle(id)}`}
            onClick={handleCartClick}
          >
            {getCartIcon(id) === 'check' ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <h3 
          className="text-sm font-medium text-[#2C2D33] line-clamp-2 leading-tight"
          style={{ fontSize: '14px' }}
        >
          {title}
        </h3>
        
        {/* Store info with likes and orders */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700" onClick={handleStoreClick}>
            <Store className="w-3 h-3" />
            <span className="truncate">{storeName || 'Магазин'}</span>
          </div>
          <div className="flex gap-2 text-xs">
            <span>❤️ {likes}</span>
            <span>📦 {orders}</span>
          </div>
        </div>
        
        {/* Price */}
        <PriceTag 
          price={price}
          originalPrice={originalPrice}
          size="sm"
          variant="default"
        />
      </div>
    </div>
  );
}