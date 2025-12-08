import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { FloatingBottomNav } from './FloatingBottomNav';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductCardV3 } from './ProductCardV3';
import { ProductCardSmall } from './ProductCardSmall';
import { ProductCardMedium } from './ProductCardMedium';
import { ProductCardModern } from './ProductCardModern';
import { ProductCardCompact } from './ProductCardCompact';
import { ProductCarousel } from './ProductCarousel';
import { StoriesSection } from './StoriesSection';
import { QuickTile } from './QuickTile';
import { StoryViewer, StoreStories } from './story/StoryViewer';
import { StoriesShops } from './StoriesShops';
import { MagicCallout } from './MagicCallout';
import { StorePromoSlider } from './StorePromoSlider';
import { PhotoSearchModal } from './PhotoSearchModal';
import { Product, Shop } from '../types/app';
import { generateEnhancedStories } from '../utils/integrationHelper';
import { 
  Bell, 
  Search, 
  Star, 
  ShoppingCart,
  Heart,
  ChevronRight,
  Camera,
  Sparkles,
  Zap,
  Gift,
  Percent,
  TrendingUp
} from 'lucide-react';

interface BuyerHomeProps {
  onProductClick: (productId: string) => void;
  onCartClick: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  showBackButton?: boolean;
  onBack?: () => void;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onAILookClick?: () => void;
  onFavoritesClick?: () => void;
  onAddToCart?: (product: any) => void;
  products?: Product[];
  shops?: Shop[];
  cartItemCount?: number;
  unreadNotificationsCount?: number;
}

export function BuyerHome({ 
  onProductClick, 
  onCartClick, 
  onTabChange, 
  activeTab,
  showBackButton = false,
  onBack,
  onSearchClick,
  onNotificationsClick,
  onAILookClick,
  onFavoritesClick,
  onAddToCart,
  products = [],
  shops = [],
  cartItemCount = 0,
  unreadNotificationsCount = 0
}: BuyerHomeProps) {
  // ОТЛАДКА: Логируем пропсы сразу при рендере
  console.log('🏠 BuyerHome РЕНДЕР с пропсами:', {
    products: products?.length || 0,
    shops: shops?.length || 0,
    productsUndefined: products === undefined,
    shopsUndefined: shops === undefined,
    productsNull: products === null,
    shopsNull: shops === null
  });

  const [searchQuery, setSearchQuery] = React.useState('');
  const [storyViewer, setStoryViewer] = React.useState({
    isOpen: false,
    storeIndex: 0,
    itemIndex: 0
  });
  const [isPhotoSearchOpen, setIsPhotoSearchOpen] = React.useState(false);

  // Generate stories from real shop and product data using GitHub videos
  const storiesData: StoreStories[] = React.useMemo(() => {
    try {
      if (shops.length > 0 && products.length > 0) {
        const generated = generateEnhancedStories(shops, products);
        console.log('✨ Generated stories from GitHub:', generated?.length || 0);
        if (generated && generated.length > 0) {
          console.log('📹 First story video URL:', generated[0]?.items[0]?.src);
          return generated as StoreStories[];
        }
      }
    } catch (error) {
      console.error('❌ Error generating stories:', error);
    }
    return [];
  }, [shops, products]);

  // Convert storiesData to store list format for UI
  const stores = React.useMemo(() => {
    const storeList = storiesData.map((story, index) => {
      // First 3 stores are premium brands (JUST, OZBE, PINK ISLAND)
      const isPremium = index < 3;
      
      return {
        id: story.storeId,
        name: story.storeName,
        avatar: story.avatar,
        hasStory: true,
        isSpecial: false,
        isPremium: isPremium // Mark premium brands
      };
    });
    
    // Add favorites as first item
    return [
      { id: 'favorites', name: '+ Избранные', avatar: '⭐', hasStory: false, isSpecial: true, isPremium: false },
      ...storeList
    ];
  }, [storiesData]);

  // Функции для получения товаров из реальных данных
  const getSaleProducts = () => {
    const saleItems = products
      .filter(product => product.originalPrice && product.originalPrice > product.price)
      .slice(0, 10);
    
    // Если нет товаров со скидками, берем первые 10 товаров
    const itemsToShow = saleItems.length > 0 ? saleItems : products.slice(0, 10);
    
    return itemsToShow.map(product => {
      const shop = shops.find(s => s.id === product.storeId);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.media?.[0]?.url || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=360&fit=crop',
        storeName: shop?.name || 'Магазин',
        storeAvatar: shop?.avatar || '🏪'
      };
    });
  };

  const getHitProducts = () => {
    const hitItems = products
      .filter(product => product.price > 300000) // условие для "хитов" - дорогие товары
      .slice(0, 10);
    
    // Если нет дорогих товаров, берем любые 10 товаров
    const itemsToShow = hitItems.length > 0 ? hitItems : products.slice(10, 20);
    
    return itemsToShow.map(product => {
      const shop = shops.find(s => s.id === product.storeId);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.media?.[0]?.url || 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=300&h=360&fit=crop',
        categoryPath: product.categoryPath,
        structuredAttributes: product.structuredAttributes,
        storeName: shop?.name || 'Магазин',
        storeAvatar: shop?.avatar || '🏪'
      };
    });
  };

  const getRecommendedProducts = () => {
    // Проверяем есть ли достаточно товаров для диапазона 20-28
    const startIndex = Math.min(20, products.length - 8);
    const endIndex = Math.min(startIndex + 8, products.length);
    
    // Если недостаточно товаров, берем с начала
    const itemsToShow = products.length >= 8 
      ? products.slice(startIndex >= 0 ? startIndex : 0, endIndex > 0 ? endIndex : 8)
      : products.slice(0, products.length);
    
    return itemsToShow.map(product => {
      const shop = shops.find(s => s.id === product.storeId);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.media?.[0]?.url || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
        storeName: shop?.name || 'Магазин',
        storeAvatar: shop?.avatar || '🏪',
        rating: 4.5 + Math.random() * 0.5
      };
    });
  };

  const getPopularProducts = () => {
    const popularItems = products
      .filter(product => !product.originalPrice) // товары без скидки
      .slice(0, 8);
    
    // Если нет товаров без скидки, берем любые 8 товаров с безопасными индексами
    let itemsToShow;
    if (popularItems.length > 0) {
      itemsToShow = popularItems;
    } else {
      const startIndex = Math.min(8, products.length - 8);
      const endIndex = Math.min(startIndex + 8, products.length);
      itemsToShow = products.length >= 8 
        ? products.slice(startIndex >= 0 ? startIndex : 0, endIndex > 0 ? endIndex : 8)
        : products.slice(0, products.length);
    }
    
    return itemsToShow.map(product => {
      const shop = shops.find(s => s.id === product.storeId);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.media?.[0]?.url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        storeName: shop?.name || 'Магазин',
        storeAvatar: shop?.avatar || '🏪',
        rating: 4.3 + Math.random() * 0.7
      };
    });
  };

  // Получаем данные
  const saleProducts = getSaleProducts();
  const hitProducts = getHitProducts();
  const recommendedProducts = getRecommendedProducts();
  const popularProducts = getPopularProducts();

  // Debug: проверяем данные при каждом изменении
  React.useEffect(() => {
    console.log('🏠 BuyerHome useEffect trigger:', {
      products: products.length,
      shops: shops.length,
      productsArray: products,
      shopsArray: shops,
      timestamp: new Date().toLocaleTimeString()
    });
    
    if (products.length === 0) {
      console.warn('❌ BuyerHome: No products available');
      console.warn('❌ Products array:', products);
    } else {
      console.log('✅ BuyerHome: Products available:', products.slice(0, 2).map(p => ({ name: p.name, id: p.id })));
    }
    
    if (shops.length === 0) {
      console.warn('❌ BuyerHome: No shops available');  
      console.warn('❌ Shops array:', shops);
    } else {
      console.log('✅ BuyerHome: Shops available:', shops.slice(0, 2).map(s => ({ name: s.name, id: s.id })));
    }
    
    // Проверяем генерированные массивы
    const saleCount = saleProducts.length;
    const hitCount = hitProducts.length;
    const recCount = recommendedProducts.length;
    const popCount = popularProducts.length;
    
    console.log('🏠 Генерированные данные:', {
      saleProducts: saleCount,
      hitProducts: hitCount, 
      recommendedProducts: recCount,
      popularProducts: popCount
    });
    
    if (saleCount === 0) {
      console.warn('❌ BuyerHome: No sale products generated');
    } else {
      console.log('✅ BuyerHome: Sale products generated:', saleCount);
    }
  }, [products, shops, saleProducts, hitProducts, recommendedProducts, popularProducts]);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} сум`;
  };

  const handleStoryClick = (storeId: string) => {
    // Skip if it's the favorites button or store has no stories
    if (storeId === 'favorites') {
      console.log('Favorites clicked - navigate to favorites');
      return;
    }
    
    // Find the store in stories data and open viewer
    const storeIndex = storiesData.findIndex(store => store.storeId === storeId);
    if (storeIndex !== -1) {
      console.log('📹 Opening story for store:', storeId, 'with video:', storiesData[storeIndex]?.items[0]?.src);
      setStoryViewer({
        isOpen: true,
        storeIndex,
        itemIndex: 0
      });
    } else {
      console.log('No stories found for store:', storeId);
    }
  };

  const handleStoryViewerClose = () => {
    setStoryViewer(prev => ({ ...prev, isOpen: false }));
  };

  const handleStoryProductClick = (productId: string) => {
    handleStoryViewerClose();
    onProductClick(productId);
  };

  const handleStoryStoreClick = (storeId: string) => {
    handleStoryViewerClose();
    // Navigate to store page
    console.log('Navigate to store:', storeId);
  };

  const handleStoryAddToCart = (productId: string) => {
    console.log('Add to cart from story:', productId);
    // Show success toast or animation
  };

  const handleStoryFollow = (storeId: string) => {
    console.log('Follow store from story:', storeId);
    // Show success toast or update following state
  };

  const handleSeeAll = (section: string) => {
    console.log('See all clicked for:', section);
  };

  const handleLikeToggle = (productId: string) => {
    console.log('Like toggled:', productId);
  };

  const handleQuickAdd = (productId: string) => {
    if (!onAddToCart) {
      console.log('Cart clicked:', productId);
      return;
    }

    // Найдем продукт по ID в наших данных
    const product = products.find(p => p.id === productId);
    if (product) {
      onAddToCart(product);
    } else {
      console.warn('Product not found for adding to cart:', productId);
    }
  };

  const handleStoreTap = (storeId: string) => {
    console.log('Store tapped:', storeId);
  };

  const handlePhotoSearchClick = () => {
    setIsPhotoSearchOpen(true);
  };

  const handlePhotoSearchClose = () => {
    setIsPhotoSearchOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center justify-between mb-[14px] mt-[5px] mr-[0px] ml-[0px]">
          {/* Notifications */}
          <div className="relative">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors" onClick={onNotificationsClick}>
              <Bell className="w-6 h-6 text-luma-primary-600" />
            </button>
            {unreadNotificationsCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-luma-danger-600 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
                </span>
              </div>
            )}
          </div>

          {/* luma Logo */}
          <h1 className="text-xl font-bold text-luma-primary-600 tracking-wide" style={{ fontFamily: 'Open Sans, sans-serif' }}>luma</h1>

          {/* Favorites Icon */}
          <div className="relative">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors" onClick={() => onFavoritesClick?.()}>
              <Heart className="w-6 h-6 text-luma-primary-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Поиск товаров, брендов, магазинов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={onSearchClick}
            className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base pr-12 rounded-luma"
            readOnly
          />
          <button
            onClick={handlePhotoSearchClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <Camera className="w-5 h-5 text-luma-primary-600" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '104px' }}>
        {/* Stories Section */}
        <div className="py-6 mx-[10px] my-[0px] m-[0px] px-[10px] px-[20px] py-[21px]">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide mx-[-5px] my-[0px] mx-[-10px]">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoryClick(store.id)}
                className="flex-shrink-0 flex flex-col items-center gap-2 w-14 mx-[-1px] my-[0px] mt-[0px] mr-[0px] mb-[0px] ml-[5px]"
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden ${
                    store.isSpecial 
                      ? 'bg-luma-primary-200 border-2 border-dashed border-luma-primary-600'
                      : store.isPremium
                        ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-[2.5px]'
                        : store.hasStory
                          ? 'bg-gradient-to-tr from-luma-primary via-luma-pink to-luma-turquoise p-0.5'
                          : 'bg-luma-surface-0 border-2 border-luma-border-200 shadow-luma-soft'
                  }`}>
                    {store.isSpecial || !store.avatar.startsWith('http') ? (
                      <div className="w-full h-full flex items-center justify-center text-lg bg-luma-surface-0 rounded-full">
                        {store.avatar}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-white rounded-full p-0.5">
                        <ImageWithFallback
                          src={store.avatar}
                          alt={store.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    )}
                  </div>
                  {/* Premium badge for first 3 stores */}
                  {store.isPremium && (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border border-white shadow-sm">
                      <span className="text-[10px]">⭐</span>
                    </div>
                  )}
                </div>
                <span className="text-xs text-luma-text-900 text-center leading-tight max-w-[56px] truncate">
                  {store.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Store Promo Slider */}
        <div className="px-4 mb-4">
          <StorePromoSlider onSlideClick={(slide) => console.log('Promo clicked:', slide)} />
        </div>

        {/* AI Look Callout */}
        <div className="px-4 mb-6">
          <MagicCallout onClick={() => onAILookClick?.()} />
        </div>



        {/* 1. Скидки Section - First content section */}
        <div className="mb-[21px] mt-[0px] mr-[10px] ml-[10px] pt-[0px] pr-[0px] pb-[5px] pl-[0px]">
          <div className="flex items-center justify-between mb-4 px-4">
            <h2 className="text-xl font-bold text-luma-text-900">Скидки</h2>
            <button 
              onClick={() => handleSeeAll('sales')}
              className="flex items-center gap-1 text-sm text-luma-primary-600 font-medium hover:text-luma-primary-500"
            >
              Смотреть всё
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {saleProducts.length > 0 ? (
            <ProductCarousel
              products={saleProducts}
              onProductClick={onProductClick}
              onStoreClick={(storeId) => console.log('Store clicked:', storeId)}
              onAddToCart={handleQuickAdd}
            />
          ) : (
            <div className="px-4 py-8 text-center text-luma-text-600">
              {products.length === 0 ? 'Загрузка товаров...' : 'Нет товаров со скидками'}
            </div>
          )}
        </div>

        {/* 2. Хит сезона 2025 Section */}
        <div className="mb-[21px] mt-[0px] mr-[10px] ml-[10px]">
          <div className="flex items-center justify-between mb-4 px-4">
            <h2 className="text-xl font-bold text-luma-text-900">Хит сезона 2025</h2>
            <button 
              onClick={() => handleSeeAll('hits')}
              className="flex items-center gap-1 text-sm text-luma-primary-600 font-medium hover:text-luma-primary-500"
            >
              Смотреть всё
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {hitProducts.length > 0 ? (
            <ProductCarousel
              products={hitProducts}
              onProductClick={onProductClick}
              onStoreClick={(storeId) => console.log('Store clicked:', storeId)}
              onAddToCart={handleQuickAdd}
            />
          ) : (
            <div className="px-4 py-8 text-center text-luma-text-600">
              {products.length === 0 ? 'Загрузка товаров...' : 'Нет хитов сезона'}
            </div>
          )}
        </div>

        {/* 3. Рекомендации вам Section - 2-column grid */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-luma-text-900">Рекомендации вам</h2>
            <button 
              onClick={() => handleSeeAll('recommendations')}
              className="flex items-center gap-1 text-sm text-luma-primary-600 font-medium hover:text-luma-primary-500"
            >
              Смотреть всё
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {recommendedProducts.map((product) => (
                <ProductCardModern
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  storeName={product.storeName}
                  storeIcon={product.storeAvatar}
                  onProductClick={onProductClick}
                  onStoreClick={() => console.log('Store clicked:', product.id)}
                  onAddToCart={handleQuickAdd}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-luma-text-600">
              {products.length === 0 ? 'Загрузка товаров...' : 'Нет рекомендаций'}
            </div>
          )}
        </div>

        {/* 4. Популярные Section - 2-column grid (infinite) */}
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-luma-text-900">Популярные</h2>
            <button 
              onClick={() => handleSeeAll('popular')}
              className="flex items-center gap-1 text-sm text-luma-primary-600 font-medium hover:text-luma-primary-500"
            >
              Смотреть всё
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {popularProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {popularProducts.map((product) => (
                <ProductCardModern
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={product.image}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  storeName={product.storeName}
                  storeIcon={product.storeAvatar}
                  onProductClick={onProductClick}
                  onStoreClick={() => console.log('Store clicked:', product.id)}
                  onAddToCart={handleQuickAdd}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-luma-text-600">
              {products.length === 0 ? 'Загрузка товаров...' : 'Нет популярных товаров'}
            </div>
          )}
        </div>
      </div>

      {/* Floating Navigation Bar */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
        cartItemCount={cartItemCount}
      />

      {/* Story Viewer Overlay */}
      {storyViewer.isOpen && (
        <StoryViewer
          stories={storiesData}
          initialStoreIndex={storyViewer.storeIndex}
          initialItemIndex={storyViewer.itemIndex}
          onClose={handleStoryViewerClose}
          onAddToCart={handleStoryAddToCart}
          onViewProduct={handleStoryProductClick}
          onViewStore={handleStoryStoreClick}
          onFollow={handleStoryFollow}
        />
      )}

      {/* Photo Search Modal */}
      <PhotoSearchModal
        isOpen={isPhotoSearchOpen}
        onClose={handlePhotoSearchClose}
      />
    </div>
  );
}