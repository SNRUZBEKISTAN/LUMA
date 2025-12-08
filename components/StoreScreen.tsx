import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FloatingBottomNav } from './FloatingBottomNav';
import { ProductCardV3 } from './ProductCardV3';
import { 
  ArrowLeft, 
  Share, 
  Star, 
  Search,
  ChevronDown,
  Heart,
  Instagram,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface StoreScreenProps {
  storeId: string;
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onProductClick: (productId: string) => void;
  onShare: () => void;
  onChatWithStore: (storeId: string) => void;
  onFollowStore: (storeId: string) => void;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
  images?: string[];
  isHelpful?: boolean;
  helpfulCount?: number;
}

const FilterSheet = ({ 
  isOpen, 
  onClose, 
  filterType 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  filterType: string;
}) => {
  const filterOptions = {
    category: ['Платья', 'Блузки', 'Юбки', 'Брюки', 'Верхняя одежда'],
    price: ['До 100 000', '100 000 - 300 000', '300 000 - 500 000', 'Свыше 500 000'],
    color: ['Чёрный', 'Белый', 'Бежевый', 'Розовый', 'Синий', 'Красный'],
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    delivery: ['Доставка сегодня', 'Бесплатная доставка', 'Самовывоз']
  };

  const options = filterOptions[filterType as keyof typeof filterOptions] || [];
  
  const getFilterTitle = () => {
    switch (filterType) {
      case 'category': return 'Категория';
      case 'price': return 'Цена';
      case 'color': return 'Цвет';
      case 'size': return 'Размер';
      case 'delivery': return 'Доставка';
      default: return 'Фильтр';
    }
  };
  
  const getFilterDescription = () => {
    switch (filterType) {
      case 'category': return 'Выберите категорию товаров для фильтрации';
      case 'price': return 'Выберите диапазон цен для фильтрации товаров';
      case 'color': return 'Выберите цвет товаров для фильтрации';
      case 'size': return 'Выберите размер товаров для фильтрации';
      case 'delivery': return 'Выберите тип доставки для фильтрации товаров';
      default: return 'Выберите параметры для фильтрации товаров';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh] bg-luma-surface-0 rounded-t-luma-lg">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-center text-luma-text-900">
            {getFilterTitle()}
          </SheetTitle>
          <SheetDescription className="text-center text-luma-text-600 text-sm">
            {getFilterDescription()}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-3 pb-6">
          {options.map((option) => (
            <button
              key={option}
              className="w-full text-left p-4 rounded-luma hover:bg-luma-primary-200/30 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 rounded-luma"
            onClick={onClose}
          >
            Сбросить
          </Button>
          <Button 
            className="flex-1 bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma"
            onClick={onClose}
          >
            Применить
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const SortSheet = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  const sortOptions = [
    'По популярности',
    'Сначала дешёвые',
    'Сначала дорогие', 
    'По рейтингу',
    'Новинки',
    'Скидки'
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[50vh] bg-luma-surface-0 rounded-t-luma-lg">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-center text-luma-text-900">Сортировка</SheetTitle>
          <SheetDescription className="text-center text-luma-text-600 text-sm">
            Выберите способ сортировки товаров в магазине
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-3">
          {sortOptions.map((option) => (
            <button
              key={option}
              className="w-full text-left p-4 rounded-luma hover:bg-luma-primary-200/30 transition-colors font-medium text-luma-text-900"
              onClick={onClose}
            >
              {option}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export function StoreScreen({ 
  storeId, 
  onBack, 
  onTabChange, 
  activeTab, 
  onProductClick, 
  onShare,
  onChatWithStore,
  onFollowStore
}: StoreScreenProps) {
  const [currentTab, setCurrentTab] = React.useState('products');
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(320);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilterSheet, setShowFilterSheet] = React.useState(false);
  const [showSortSheet, setShowSortSheet] = React.useState(false);
  const [filterType, setFilterType] = React.useState('');
  const [sortBy, setSortBy] = React.useState('По популярности');

  // Mock store data
  const store = {
    id: storeId,
    name: 'Fashion Co',
    avatar: '👗',
    cover: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop',
    rating: 4.9,
    reviewCount: 2134,
    orderCount: 18420,
    followersCount: 8320,
    isVerified: true,
    hasFastDelivery: true,
    bio: 'Стильная женская одежда европейского качества. Доставляем по всему Узбекистану.',
    description: 'Fashion Co — это премиальный бренд женской одежды, который объединяет европейское качество и современные тренды. Мы предлагаем широкий ассортимент платьев, блуз, юбок и аксессуаров для создания неповторимых образов на каждый день.',
    policies: [
      'Бесплатный возврат в течение 14 дней',
      'Обмен размера в течение 7 дней', 
      'Доставка по Ташкенту — бесплатно при заказе от 300 000 сум',
      'Гарантия качества на все товары'
    ],
    contact: {
      instagram: '@fashionco_uz',
      phone: '+998 90 123 45 67',
      address: 'ТЦ Magic City, 2 этаж'
    }
  };

  const products: Product[] = [
    {
      id: '1',
      name: 'Платье из вискозы с поясом',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=224&h=280&fit=crop',
      price: 280000,
      originalPrice: 350000,
      discount: 20,
      rating: 4.8,
      reviewCount: 124
    },
    {
      id: '2',
      name: 'Блузка шёлковая классик',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=224&h=280&fit=crop',
      price: 195000,
      rating: 4.9,
      reviewCount: 87
    },
    {
      id: '3',
      name: 'Юбка плиссе миди',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d35?w=224&h=280&fit=crop',
      price: 165000,
      originalPrice: 220000,
      discount: 25,
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: '4',
      name: 'Платье коктейльное',
      image: 'https://images.unsplash.com/photo-1566479179817-c0e393e3000a?w=224&h=280&fit=crop',
      price: 420000,
      rating: 4.9,
      reviewCount: 203
    },
    {
      id: '5',
      name: 'Блуза с принтом',
      image: 'https://images.unsplash.com/photo-1564257577402-0a52031df98b?w=224&h=280&fit=crop',
      price: 145000,
      rating: 4.6,
      reviewCount: 78
    },
    {
      id: '6',
      name: 'Платье макси летнее',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=224&h=280&fit=crop',
      price: 235000,
      rating: 4.8,
      reviewCount: 91
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Анна К.',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '2 дня назад',
      text: 'Отличный магазин! Качество товаров превосходное, быстрая доставка. Заказывала уже несколько раз и всегда довольна.',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80&h=80&fit=crop'],
      isHelpful: true,
      helpfulCount: 12
    },
    {
      id: '2',
      userName: 'Мария Д.',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '5 дней назад',
      text: 'Прекрасное обслуживание и качественные вещи. Размеры соответствуют описанию. Рекомендую!',
      helpfulCount: 8
    },
    {
      id: '3',
      userName: 'Елена С.',
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      date: '1 неделя назад',
      text: 'Хороший выбор одежды, стильные модели. Единственный минус — доставка могла бы быть быстрее.',
      helpfulCount: 5
    }
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} сум`;
  };

  const handleLikeToggle = (productId: string) => {
    console.log('Product liked:', productId);
  };

  const handleCartClick = (productId: string) => {
    console.log('Product added to cart:', productId);
  };

  const handleFilterClick = (type: string) => {
    setFilterType(type);
    setShowFilterSheet(true);
  };

  const ratingDistribution = [
    { stars: 5, percentage: 75, count: 1600 },
    { stars: 4, percentage: 18, count: 384 },
    { stars: 3, percentage: 5, count: 107 },
    { stars: 2, percentage: 1, count: 21 },
    { stars: 1, percentage: 1, count: 22 }
  ];

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Fixed Header - Updated Typography 17/600 */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
            aria-label="Назад"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          
          <h1 className="text-luma-text-900 text-center flex-1 mx-4" style={{ fontSize: '17px', fontWeight: '600', lineHeight: '22px' }}>
            {store.name}
          </h1>

          <button
            onClick={onShare}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
            aria-label="Поделиться магазином"
          >
            <Share className="w-5 h-5 text-luma-text-900" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: '104px' }}>
        {/* Cover Section */}
        <div className="relative aspect-[16/9] bg-luma-surface-0">
          <ImageWithFallback
            src={store.cover}
            alt={`${store.name} cover`}
            className="w-full h-full object-cover"
          />
          
          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Store Info Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-end justify-between">
              <div className="flex items-end gap-4 flex-1">
                {/* Store Avatar */}
                <div className="w-14 h-14 bg-luma-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{store.avatar}</span>
                </div>
                
                {/* Store Title Block */}
                <div className="flex-1 pb-1">
                  <h2 className="text-white" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '30px', marginBottom: '8px' }}>
                    {store.name}
                  </h2>
                  <div className="flex items-center gap-4" style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.9)' }}>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{store.rating}</span>
                      <span>({store.reviewCount.toLocaleString()})</span>
                    </div>
                    <span>•</span>
                    <span>Заказов: {store.orderCount.toLocaleString()}</span>
                    <span>•</span>
                    <span>Подписчики: {store.followersCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top-Right Like Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center justify-center transition-all ${
                isLiked 
                  ? 'bg-luma-primary-600 text-white' 
                  : 'bg-white/92 text-luma-text-900 border border-luma-border-200'
              }`}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '18px'
              }}
              aria-label={`${isLiked ? 'Убрать из избранного' : 'Добавить в избранное'} ${store.name}`}
            >
              <Heart className={`w-5.5 h-5.5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            {likeCount > 0 && (
              <div className="mt-1 text-center">
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>
                  {likeCount}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          {/* Store Info */}
          <div className="mb-6">
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {store.hasFastDelivery && (
                <Badge className="bg-luma-success-600 text-white px-3 py-1 rounded-lg">
                  Доставка сегодня
                </Badge>
              )}
              {store.isVerified && (
                <Badge className="bg-luma-primary-600 text-white px-3 py-1 rounded-lg">
                  Официальный
                </Badge>
              )}
            </div>
            
            {/* Short Bio */}
            <p className="text-luma-text-600 line-clamp-2 mb-3">
              {store.bio}
            </p>
            
            {/* Links Row */}
            <div className="flex gap-6">
              <button className="text-luma-primary-600 font-medium">
                О магазине
              </button>
              <button className="text-luma-primary-600 font-medium">
                Политика возврата
              </button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-luma-primary-200/50 rounded-luma p-1 mb-6">
              <TabsTrigger 
                value="products"
                className="rounded-luma data-[state=active]:bg-luma-primary-600 data-[state=active]:text-white"
              >
                Товары
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="rounded-luma data-[state=active]:bg-luma-primary-600 data-[state=active]:text-white"
              >
                Отзывы
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                className="rounded-luma data-[state=active]:bg-luma-primary-600 data-[state=active]:text-white"
              >
                О магазине
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-4">
              {/* Filter Bar with exact dimensions */}
              <div className="space-y-3">
                {/* Search and Sort - Search height 36, Sort text 12/600 */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luma-text-600" />
                    <input
                      type="text"
                      placeholder="Поиск"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 border border-luma-border-200 rounded-2xl bg-luma-surface-0 text-luma-text-900 placeholder-luma-text-600"
                      style={{ height: '36px', fontSize: '14px' }}
                    />
                  </div>
                  <button
                    onClick={() => setShowSortSheet(true)}
                    className="flex items-center gap-2 pl-4 text-luma-primary-600"
                    style={{ fontSize: '12px', fontWeight: '600' }}
                  >
                    Сортировка: По популярности
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Filter Chips - Height 28, label 12, radius 14, gap 8 */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {['Категория', 'Цена', 'Цвет', 'Размер', 'Доставка сегодня'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleFilterClick(filter.toLowerCase())}
                      className="flex items-center gap-2 px-3 bg-luma-primary-200 text-luma-text-900 whitespace-nowrap"
                      style={{ 
                        height: '28px', 
                        borderRadius: '14px',
                        fontSize: '12px',
                      }}
                    >
                      {filter}
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Sections */}
              <div className="space-y-6">
                {/* Popular Products */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '16px', marginBottom: '8px' }} className="text-luma-text-900">Популярные товары</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 120px)',
                    gap: '12px',
                    justifyContent: 'start'
                  }}>
                    {products.slice(0, 6).map((product) => (
                      <ProductCardV3
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        image={product.image}
                        price={product.price}
                        oldPrice={product.originalPrice}
                        pill={product.discount ? `-${product.discount}%` : undefined}
                        rating={product.rating}
                        size="xs"
                        context="store"
                        onOpen={onProductClick}
                        onToggleLike={handleLikeToggle}
                        onQuickAdd={handleCartClick}
                      />
                    ))}
                  </div>
                </div>

                {/* Best Selling */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '16px', marginBottom: '8px' }} className="text-luma-text-900">Больше всего продано</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 120px)',
                    gap: '12px',
                    justifyContent: 'start'
                  }}>
                    {products.slice(2, 8).map((product) => (
                      <ProductCardV3
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        image={product.image}
                        price={product.price}
                        oldPrice={product.originalPrice}
                        pill={product.discount ? `-${product.discount}%` : undefined}
                        rating={product.rating}
                        size="xs"
                        context="store"
                        onOpen={onProductClick}
                        onToggleLike={handleLikeToggle}
                        onQuickAdd={handleCartClick}
                      />
                    ))}
                  </div>
                </div>

                {/* All Store Products */}
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginTop: '16px', marginBottom: '8px' }} className="text-luma-text-900">Все товары магазина</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 120px)',
                    gap: '12px',
                    justifyContent: 'start'
                  }}>
                    {products.map((product) => (
                      <ProductCardV3
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        image={product.image}
                        price={product.price}
                        oldPrice={product.originalPrice}
                        pill={product.discount ? `-${product.discount}%` : undefined}
                        rating={product.rating}
                        size="xs"
                        context="store"
                        onOpen={onProductClick}
                        onToggleLike={handleLikeToggle}
                        onQuickAdd={handleCartClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              {/* Rating Summary */}
              <div className="bg-luma-surface-0 p-4 rounded-luma shadow-luma-soft">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-luma-text-900 mb-1">
                      {store.rating}
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(store.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-luma-border-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-luma-text-600">
                      {store.reviewCount.toLocaleString()} отзывов
                    </div>
                  </div>
                  
                  <div className="flex-1 ml-6">
                    {ratingDistribution.map((rating) => (
                      <div key={rating.stars} className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-luma-text-600 w-2">{rating.stars}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-luma-border-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400"
                            style={{ width: `${rating.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-luma-text-600 w-8">{rating.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sort Controls */}
                <div className="flex gap-4 pt-4 border-t border-luma-border-200">
                  <button className="px-4 py-2 bg-luma-primary-600 text-white rounded-luma text-sm font-medium">
                    Новые
                  </button>
                  <button className="px-4 py-2 bg-luma-primary-200 text-luma-text-900 rounded-luma text-sm font-medium">
                    Полезные
                  </button>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-luma-surface-0 p-4 rounded-luma shadow-luma-soft">
                    <div className="flex items-start gap-3 mb-3">
                      <ImageWithFallback
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-luma-text-900">{review.userName}</span>
                          <span className="text-sm text-luma-text-600">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-luma-border-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-luma-text-900 text-sm mb-3">{review.text}</p>
                    
                    {review.images && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((image, index) => (
                          <ImageWithFallback
                            key={index}
                            src={image}
                            alt="Review"
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
                    
                    {review.helpfulCount !== undefined && (
                      <div className="flex items-center justify-between pt-3 border-t border-luma-border-200">
                        <button className="text-sm text-luma-primary-600 font-medium">
                          Полезно ({review.helpfulCount})
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              {/* Store Description */}
              <div className="bg-luma-surface-0 p-4 rounded-luma shadow-luma-soft">
                <h3 className="font-semibold text-luma-text-900 mb-3">Описание магазина</h3>
                <p className="text-luma-text-600 leading-relaxed">
                  {store.description}
                </p>
              </div>

              {/* Delivery & Returns */}
              <div className="bg-luma-surface-0 p-4 rounded-luma shadow-luma-soft">
                <h3 className="font-semibold text-luma-text-900 mb-3">Доставка и возвраты</h3>
                <div className="space-y-2">
                  {store.policies.map((policy, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-luma-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-luma-text-600 text-sm">{policy}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-luma-surface-0 p-4 rounded-luma shadow-luma-soft">
                <h3 className="font-semibold text-luma-text-900 mb-3">Контакты</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-luma-primary-200/30 rounded-luma transition-colors">
                    <Instagram className="w-5 h-5 text-luma-primary-600" />
                    <span className="text-luma-text-900 font-medium">{store.contact.instagram}</span>
                    <ChevronRight className="w-4 h-4 text-luma-text-600 ml-auto" />
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-luma-primary-200/30 rounded-luma transition-colors">
                    <Phone className="w-5 h-5 text-luma-primary-600" />
                    <span className="text-luma-text-900 font-medium">{store.contact.phone}</span>
                    <ChevronRight className="w-4 h-4 text-luma-text-600 ml-auto" />
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-luma-primary-200/30 rounded-luma transition-colors">
                    <MapPin className="w-5 h-5 text-luma-primary-600" />
                    <span className="text-luma-text-900 font-medium">{store.contact.address}</span>
                    <ChevronRight className="w-4 h-4 text-luma-text-600 ml-auto" />
                  </button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="flex-shrink-0">
        <FloatingBottomNav 
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      {/* Filter Sheets */}
      <FilterSheet
        isOpen={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        filterType={filterType}
      />
      
      <SortSheet
        isOpen={showSortSheet}
        onClose={() => setShowSortSheet(false)}
      />
    </div>
  );
}