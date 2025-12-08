import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { StickyActionBar } from './StickyActionBar';

import { ProductCardV3 } from './ProductCardV3';
import { formatPrice } from './ui/utils';
import { 
  ArrowLeft, 
  Share, 
  Heart, 
  Star, 
  Store,
  ShoppingCart,
  ChevronRight,
  Sparkles,
  Eye,
  Clock
} from 'lucide-react';

interface LookItem {
  id: string;
  name: string;
  price: number;
  image: string;
  storeName: string;
  storeAvatar?: string;
  availableSizes?: string[];
}

interface Look {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  items: LookItem[];
  totalPrice: number;
  coverImage: string;
  images?: string[]; // Добавляем массив дополнительных фотографий
  views?: number;
  likes?: number;
  saves?: number;
  occasion?: string;
  style?: string;
  weather?: string;
  aiGenerated?: boolean;
}

interface LookDetailScreenProps {
  look: Look;
  onBack: () => void;
  onShare?: () => void;
  onLike?: (lookId: string) => void;
  onSave?: (lookId: string) => void;
  onProductClick?: (productId: string) => void;
  onStoreClick?: (storeId: string) => void;
  onAddToCart?: (lookId: string) => void;
  onBuyLook?: (lookId: string) => void;
  onTabChange?: (tab: string) => void;
  activeTab?: string;
}

export function LookDetailScreen({
  look,
  onBack,
  onShare,
  onLike,
  onSave,
  onProductClick,
  onStoreClick,
  onAddToCart,
  onBuyLook,
  onTabChange,
  activeTab = 'home'
}: LookDetailScreenProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  
  // Создаем массив всех изображений (главное + дополнительные)
  const allImages = React.useMemo(() => {
    const images = [look.coverImage];
    if (look.images && look.images.length > 0) {
      images.push(...look.images);
    }
    return images;
  }, [look.coverImage, look.images]);

  // Минимальное расстояние свайпа
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(look.id);
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) {
      onSave(look.id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(look.id);
    }
  };

  const handleBuyLook = () => {
    if (onBuyLook) {
      onBuyLook(look.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 pt-12 pb-4 shadow-luma-soft" style={{ paddingLeft: 'var(--section-spacing)', paddingRight: 'var(--section-spacing)' }}>
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          
          <h1 className="text-lg font-bold text-luma-text-900 line-clamp-1 flex-1 text-center mx-4">
            Образ
          </h1>

          <button
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <Share className="w-5 h-5 text-luma-text-900" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Look Images Gallery */}
        <div style={{ padding: 'var(--section-spacing)' }}>
          <div className="relative aspect-[4/5] bg-luma-surface-0 rounded-luma-lg overflow-hidden">
            {/* Image Carousel */}
            <div 
              className="relative w-full h-full"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className="flex transition-transform duration-300 ease-out h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {allImages.map((image, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0">
                    <ImageWithFallback
                      src={image}
                      alt={`${look.title} - фото ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation arrows (только если больше 1 изображения) */}
              {allImages.length > 1 && (
                <>
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  
                  {currentImageIndex < allImages.length - 1 && (
                    <button
                      onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>
            
            {/* AI Generated Badge */}
            {look.aiGenerated && (
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-gradient-to-r from-luma-primary-600 to-luma-pink-600 text-white px-3 py-1 rounded-lg font-medium">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-подбор
                </Badge>
              </div>
            )}
            
            {/* Image Counter (только если больше 1 изображения) */}
            {allImages.length > 1 && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                  {currentImageIndex + 1}/{allImages.length}
                </div>
              </div>
            )}
            
            {/* Dots Indicator (только если больше 1 изображения) */}
            {allImages.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
                <div className="flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Stats overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    {look.views && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{look.views}</span>
                      </div>
                    )}
                    {look.likes && (
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{look.likes}</span>
                      </div>
                    )}
                    {look.saves && (
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4" />
                        <span>{look.saves}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={handleSave}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        isSaved ? 'bg-luma-primary-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <ShoppingCart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: 'var(--section-spacing)' }} className="space-y-6">
          {/* Look Info */}
          <div>
            <h2 className="text-xl font-bold text-luma-text-900 mb-[7px] mt-[-30px] mr-[0px] ml-[0px]">
              {look.title}
            </h2>
            
            {look.description && (
              <p className="text-luma-text-600 mb-4 leading-relaxed">
                {look.description}
              </p>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {look.tags.map((tag, index) => (
                <Badge 
                  key={index}
                  variant="secondary" 
                  className="bg-luma-primary-200/30 text-luma-primary-600 border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Look Attributes */}
            {(look.occasion || look.style || look.weather) && (
              <div className="bg-luma-surface-0 rounded-luma p-4 space-y-2">
                {look.occasion && (
                  <div className="flex justify-between">
                    <span className="text-sm text-luma-text-600">Повод:</span>
                    <span className="text-sm font-medium text-luma-text-900">{look.occasion}</span>
                  </div>
                )}
                {look.style && (
                  <div className="flex justify-between">
                    <span className="text-sm text-luma-text-600">Стиль:</span>
                    <span className="text-sm font-medium text-luma-text-900">{look.style}</span>
                  </div>
                )}
                {look.weather && (
                  <div className="flex justify-between">
                    <span className="text-sm text-luma-text-600">Погода:</span>
                    <span className="text-sm font-medium text-luma-text-900">{look.weather}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Price Summary */}
          <div className="bg-gradient-to-r from-luma-primary-200/20 to-luma-pink-200/20 rounded-luma p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-luma-text-600">Общая стоимость образа</p>
                <p className="text-2xl font-bold text-luma-primary-600">
                  {formatPrice(look.totalPrice)}
                </p>
                <p className="text-xs text-luma-text-600 mt-1">
                  {look.items.length} {look.items.length === 1 ? 'товар' : 'товара'}
                </p>
              </div>
              
              <div className="text-right">
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="bg-luma-primary-600 hover:bg-luma-primary-500 text-white mb-2"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  В корзину
                </Button>
                <p className="text-xs text-luma-text-600">Добавить весь образ</p>
              </div>
            </div>
          </div>

          {/* Items in Look */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-luma-text-900">
                Состав образа
              </h3>
              <span className="text-sm text-luma-text-600">
                {look.items.length} {look.items.length === 1 ? 'вещь' : 'вещи'}
              </span>
            </div>
            
            <div className="space-y-4">
              {look.items.map((item, index) => (
                <div 
                  key={item.id}
                  className="bg-luma-surface-0 rounded-luma p-4 border border-luma-border-200 cursor-pointer group hover:bg-white/80 hover:shadow-md transition-all"
                  onClick={() => onProductClick?.(item.id)}
                >
                  <div className="flex gap-4">
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    
                    {/* Item Info */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-luma-text-900 text-sm leading-tight line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {item.name}
                          </h4>
                          
                          {/* Store info */}
                          <div className="flex items-center gap-1 mt-1">
                            <Store className="w-3 h-3 text-luma-text-600" />
                            <span className="text-xs text-luma-text-600">{item.storeName}</span>
                          </div>
                        </div>
                        
                        <div className="text-right ml-2 flex items-center gap-2">
                          <p className="font-semibold text-luma-primary-600">
                            {formatPrice(item.price)}
                          </p>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                      </div>
                      
                      {/* Sizes */}
                      {item.availableSizes && item.availableSizes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.availableSizes.slice(0, 6).map((size) => (
                            <Badge 
                              key={size}
                              variant="outline" 
                              className="text-xs px-2 py-0.5 h-auto"
                            >
                              {size}
                            </Badge>
                          ))}
                          {item.availableSizes.length > 6 && (
                            <span className="text-xs text-luma-text-600">
                              +{item.availableSizes.length - 6} ещё
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="flex items-center justify-end">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation(); // Предотвращаем переход на страницу товара
                            console.log('Add item to cart:', item.id);
                          }}
                          size="sm"
                          className="text-xs h-8 px-3 bg-luma-primary-600 hover:bg-luma-primary-500 text-white"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Looks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-luma-text-900">Похожие образы</h3>
              <button className="flex items-center gap-1 text-luma-primary-600 font-medium">
                <span>Показать больше</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Mock similar looks */}
              {[1, 2].map((index) => (
                <div 
                  key={index}
                  className="bg-luma-surface-0 rounded-luma overflow-hidden border border-luma-border-200 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/5] bg-gray-100">
                    <ImageWithFallback
                      src={`https://images.unsplash.com/photo-${156647917 + index}0-c0a7bc2e6f27?w=300&h=400&fit=crop`}
                      alt={`Похожий образ ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-luma-text-900 line-clamp-2 mb-1">
                      Образ для {index === 1 ? 'работы' : 'прогулки'}
                    </h4>
                    <p className="text-xs text-luma-text-600 mb-2">
                      3 товара
                    </p>
                    <p className="font-semibold text-luma-primary-600">
                      {formatPrice(800000 + index * 200000)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <StickyActionBar
        layout="twoButtons"
        summary="price"
        summaryTitle="Общая стоимость"
        summaryValue={formatPrice(look.totalPrice)}
        primaryLabel="Купить образ"
        secondaryLabel="В корзину"
        onPrimaryClick={handleBuyLook}
        onSecondaryClick={handleAddToCart}
        state="default"
      />


    </div>
  );
}