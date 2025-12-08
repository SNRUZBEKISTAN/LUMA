import React from 'react';
import { Button } from './ui/button';
import { FloatingBottomNav } from './FloatingBottomNav';
import { ProductCardV3 } from './ProductCardV3';
import { ShareSheetModal, useShareSheet } from './ShareSheetModal';
import { Heart, ShoppingCart, Share2, Play, Pause } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FeedItem {
  id: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  price: number;
  originalPrice?: number;
  shop: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  likes: number;
  description: string;
  tags: string[];
  isLiked?: boolean;
  isShared?: boolean;
}

interface FeedScreenProps {
  onProductClick: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onBack: () => void;
  cartItemCount?: number;
}

export function FeedScreen({ onProductClick, onAddToCart, onTabChange, activeTab, onBack, cartItemCount = 0 }: FeedScreenProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [likedItems, setLikedItems] = React.useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = React.useState('all');
  
  // Share functionality
  const { shareState, closeShare, share } = useShareSheet();

  const categoryFilters = [
    { id: 'all', name: 'Все' },
    { id: 'fashion', name: 'Мода' },
    { id: 'beauty', name: 'Красота' },
    { id: 'accessories', name: 'Аксессуары' },
    { id: 'home', name: 'Дом' },
    { id: 'tech', name: 'Техника' }
  ];

  const feedItems: FeedItem[] = [
    {
      id: '1',
      videoUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1651047557884-49a4eb205f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZHJlc3MlMjBmYXNoaW9ufGVufDF8fHx8MTc1NDg5MDM1OHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Элегантное платье от местного дизайнера',
      price: 250000,
      originalPrice: 350000,
      shop: {
        name: 'Fashion Co',
        avatar: '👗',
        verified: true
      },
      likes: 1240,
      description: 'Невероятно красивое платье! Подойдет для любого случая. Материал очень качественный, сидит идеально 💕',
      tags: ['платье', 'стиль', 'мода', 'элегантность']
    },
    {
      id: '2',
      videoUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1688955665338-fb430ff8436d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBjb3NtZXRpY3MlMjBiZWF1dHl8ZW58MXx8fHwxNzU0ODg4OTM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Корейская косметика - полный обзор',
      price: 89000,
      originalPrice: 120000,
      shop: {
        name: 'Beauty Lab',
        avatar: '💄',
        verified: true
      },
      likes: 2150,
      description: 'Показываю лучшую корейскую косметику! Все средства тестировала лично. Результат невероятный! ✨',
      tags: ['косметика', 'корея', 'красота', 'уход']
    },
    {
      id: '3',
      videoUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1709282028322-35c1fb068ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzaG9lcyUyMGhlZWxzfGVufDF8fHx8MTc1NDg5MDM2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Стильные туфли для офиса и не только',
      price: 320000,
      originalPrice: 450000,
      shop: {
        name: 'Shoes Hub',
        avatar: '👠',
        verified: false
      },
      likes: 890,
      description: 'Удобные и красивые туфли! Хожу в них весь день без усталости. Качество на высоте! 👌',
      tags: ['обувь', 'туфли', 'офис', 'комфорт']
    }
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} сум`;
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = (itemId: string) => {
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(itemId)) {
        newLiked.delete(itemId);
      } else {
        newLiked.add(itemId);
      }
      return newLiked;
    });
  };

  const handleShare = (itemId: string) => {
    const item = feedItems.find(f => f.id === itemId);
    if (item) {
      const productUrl = `${window.location.origin}/product/${itemId}`;
      share(productUrl, item.title);
    }
  };

  const handleAddToCartClick = (itemId: string) => {
    toast.success('Добавлено в корзину');
    onAddToCart(itemId);
  };

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentVideoIndex < feedItems.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else if (direction === 'down' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Fullscreen Video Content - Background Layer */}
      <div className="absolute inset-0">
        {feedItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-transform duration-300 ${
              index === currentVideoIndex ? 'translate-y-0' : 
              index < currentVideoIndex ? '-translate-y-full' : 'translate-y-full'
            }`}
          >
            {/* Video/Image Background - Full Screen */}
            <div 
              className="w-full h-full bg-cover bg-center relative cursor-pointer"
              style={{ backgroundImage: `url(${item.thumbnail})` }}
              onClick={togglePlayPause}
              onTouchStart={(e) => {
                const startY = e.touches[0].clientY;
                const onTouchEnd = (endEvent: TouchEvent) => {
                  const endY = endEvent.changedTouches[0].clientY;
                  const diff = startY - endY;
                  if (Math.abs(diff) > 50) {
                    handleSwipe(diff > 0 ? 'up' : 'down');
                  }
                  document.removeEventListener('touchend', onTouchEnd);
                };
                document.addEventListener('touchend', onTouchEnd);
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              
              {/* Play/Pause Indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Logo - Top */}
        <div className="flex-shrink-0 pt-[30px] pb-[24px] px-6 pr-[21px] pl-[21px]">
          <div className="flex justify-center">
            <div className="bg-black/20 backdrop-blur-md rounded-luma-lg px-4 py-2 py-[0px] px-[14px]">
              <h1 className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: 'Open Sans, sans-serif' }}>luma</h1>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex-shrink-0 pb-6 z-30">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mx-[10px] py-[0px] px-[5px] my-[0px] mx-[5px]">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={filter.id === activeFilter ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={`flex-shrink-0 rounded-luma ${
                  filter.id === activeFilter
                    ? 'bg-gradient-to-r from-luma-primary to-luma-pink text-white shadow-luma' 
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Spacer */}
        <div className="flex-1"></div>

        {/* Content Info - Bottom */}
        <div className="flex-shrink-0 z-20">
          {feedItems.map((item, index) => (
            <div
              key={item.id}
              className={`${index === currentVideoIndex ? 'block' : 'hidden'}`}
            >
              {/* LUMA/Feed/Overlay_v6 - Lifted position, unified right rail, adaptive card */}
              <div className="absolute inset-x-0 pointer-events-none" style={{ top: '63%' }}>
                <div className="px-3 flex items-end justify-between gap-4">
                  {/* LEFT COLUMN (LeftStack) - Fixed width */}
                  <div
                    className="pointer-events-auto flex flex-col gap-2"
                    style={{
                      width: 'min(320px, calc(100% - (12px + 56px + 16px + 12px)))', // L + button + gap + R
                    }}
                  >
                    {/* 1. Store Row */}
                    <div className="flex items-center gap-2 text-white drop-shadow-md">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-sm">
                        {item.shop.avatar}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold">{item.shop.name === 'directory' || !item.shop.name ? (item.storeName || 'Магазин') : item.shop.name}</span>
                        {item.shop.verified && (
                          <div className="w-3 h-3 bg-luma-primary rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 2. Description - Full width of LeftStack */}
                    <div className="text-white/95 text-[13px] leading-[18px] line-clamp-2 drop-shadow-md">
                      {item.description}
                    </div>

                    {/* 3. Mini Product Card miniXS_v8 - Increased height to 96px, improved title display */}
                    <div 
                      className="flex rounded-2xl overflow-hidden backdrop-blur-md cursor-pointer"
                      style={{ 
                        height: '96px',
                        background: 'rgba(255, 247, 243, 0.92)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
                      }}
                      onClick={() => onProductClick(item.id)}
                    >
                      {/* Left: Media */}
                      <div className="w-[72px] h-[96px] flex-shrink-0 p-1.5">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Right: Content with updated layout - gap=4, updated padding */}
                      <div className="flex flex-col gap-1 flex-1 pt-1.5 pr-3 pb-2 pl-1.5 overflow-hidden">
                        {/* 1. Rating Row */}
                        <div className="flex items-center gap-1.5 text-[10px] text-luma-text-600">
                          <span>⭐</span>
                          <span className="font-bold">4.8</span>
                          <span className="opacity-60">·</span>
                          <span className="opacity-70">Заказов:</span>
                          <span className="font-semibold">1.2k</span>
                        </div>

                        {/* 2. Title - Displayed prominently */}
                        <div 
                          className="truncate font-bold text-luma-text-900 w-full"
                          style={{ fontSize: 'clamp(11px, 2.6vw, 13px)' }}
                          title={item.title}
                        >
                          {item.title}
                        </div>

                        {/* 3. Price Row - Horizontal with button on same line */}
                        <div className="flex items-end justify-between gap-2 pr-1.5">
                          <div className="flex flex-col gap-0.5 min-w-0">
                            {item.originalPrice && (
                              <div className="text-[12px] line-through text-luma-text-600 font-medium">
                                {item.originalPrice.toLocaleString()}&nbsp;
                              </div>
                            )}
                            {/* Price with non-breaking space before 'сум' */}
                            <div 
                              className="font-extrabold text-luma-primary-600 whitespace-nowrap"
                              style={{ fontSize: 'clamp(16px, 3.8vw, 18px)' }}
                            >
                              {item.price.toLocaleString()}&nbsp;
                            </div>
                          </div>
                          
                          {/* Button aligned with price */}
                          <button
                            className="h-[26px] min-w-[80px] px-2.5 rounded-[10px] text-[11px] font-bold bg-luma-primary-200/40 text-luma-primary-600 hover:bg-luma-primary-200/60 transition-colors flex-shrink-0 mr-1 truncate"
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(item.id);
                            }}
                          >
                            Подробнее
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN (RightRail) - Unified style for all actions */}
                  <div className="pointer-events-auto flex flex-col items-center gap-2.5">
                    {/* Like Action - Unified style */}
                    <div className="flex flex-col items-center">
                      <button 
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(8px)'
                        }}
                        onClick={() => toggleLike(item.id)}
                        aria-label="Избранное"
                      >
                        <Heart 
                          className={`w-6 h-6 ${
                            likedItems.has(item.id) 
                              ? 'text-luma-danger-600 fill-luma-danger-600' 
                              : 'text-luma-text-600'
                          }`} 
                        />
                      </button>
                      <div className="mt-1 text-[11px] font-bold text-white drop-shadow-md text-center">
                        Избранное
                      </div>
                    </div>

                    {/* Share Action - Unified style */}
                    <div className="flex flex-col items-center">
                      <button 
                        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(8px)'
                        }}
                        onClick={() => handleShare(item.id)}
                        aria-label="Поделиться"
                      >
                        <Share2 className="w-6 h-6 text-luma-text-600" />
                      </button>
                      <div className="mt-1 text-[11px] font-bold text-white drop-shadow-md text-center">
                        Поделиться
                      </div>
                    </div>

                    {/* Cart Action - Unified style */}
                    <div className="flex flex-col items-center">
                      <button 
                        className="w-14 h-14 bg-gradient-to-r from-luma-primary to-luma-pink rounded-full flex items-center justify-center shadow-luma hover:scale-110 transition-transform"
                        onClick={() => handleAddToCartClick(item.id)}
                        aria-label="В корзину"
                      >
                        <ShoppingCart className="w-6 h-6 text-white" />
                      </button>
                      <div className="mt-1 text-[11px] font-bold text-white drop-shadow-md text-center">
                        В корзину
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Sheet Modal */}
      <ShareSheetModal
        isOpen={shareState.isOpen}
        onClose={closeShare}
        url={shareState.url || ''}
        title={shareState.title || ''}
      />

      {/* Floating Navigation Bar */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
        cartItemCount={cartItemCount}
      />
    </div>
  );
}