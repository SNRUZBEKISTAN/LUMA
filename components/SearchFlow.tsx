import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { FloatingBottomNav } from './FloatingBottomNav';
import { PhotoSearchModal } from './PhotoSearchModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ProductCardV3 } from './ProductCardV3';
import { 
  ArrowLeft, 
  Camera,
  ChevronRight
} from 'lucide-react';

interface SearchFlowProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onProductClick: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export function SearchFlow({ 
  onBack, 
  onTabChange, 
  activeTab, 
  onProductClick, 
  onAddToCart 
}: SearchFlowProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showPhotoModal, setShowPhotoModal] = React.useState(false);
  const [selectedQuickChips, setSelectedQuickChips] = React.useState<string[]>([]);

  // Quick Access - Exactly 2 rows as specified
  const quickAccessRow1 = [
    { id: 'popular', label: 'Популярное' },
    { id: 'new', label: 'Новинки' },
    { id: 'sale', label: 'Скидки' },
    { id: 'fast', label: 'Быстрая доставка' },
    { id: 'budget', label: 'До 200 000' }
  ];

  const quickAccessRow2 = [
    { id: 'eco', label: 'Эко' },
    { id: 'madeinuz', label: 'Made in UZ' },
    { id: 'today', label: 'Сегодня' },
    { id: 'brands', label: 'Бренды' },
    { id: 'collab', label: 'Коллаборации' }
  ];

  const popularBrands = [
    { id: 'zara', name: 'ZARA', logo: 'Z' },
    { id: 'hm', name: 'H&M', logo: 'H' },
    { id: 'uniqlo', name: 'UNIQLO', logo: 'U' },
    { id: 'nike', name: 'NIKE', logo: 'N' },
    { id: 'adidas', name: 'ADIDAS', logo: 'A' },
    { id: 'mango', name: 'MANGO', logo: 'M' },
    { id: 'bershka', name: 'BERSHKA', logo: 'B' },
    { id: 'pull', name: 'PULL&BEAR', logo: 'P' }
  ];

  const categories = [
    { id: 'women', name: 'Женская одежда', size: 'large', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=240&fit=crop' },
    { id: 'men', name: 'Мужская', size: 'medium', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=192&fit=crop' },
    { id: 'shoes', name: 'Обувь', size: 'medium', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=192&fit=crop' },
    { id: 'dresses', name: 'Платья', size: 'small', image: 'https://images.unsplash.com/photo-1566479179817-0dcc6b11d8b5?w=400&h=144&fit=crop' },
    { id: 'tshirts', name: 'Футболки', size: 'medium', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=192&fit=crop' },
    { id: 'jeans', name: 'Джинсы', size: 'medium', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=192&fit=crop' },
    { id: 'skirts', name: 'Юбки', size: 'small', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d4e?w=400&h=144&fit=crop' },
    { id: 'blouses', name: 'Блузы', size: 'small', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=144&fit=crop' },
    { id: 'hoodies', name: 'Худи', size: 'medium', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=192&fit=crop' },
    { id: 'suits', name: 'Костюмы', size: 'small', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=144&fit=crop' },
    { id: 'outerwear', name: 'Верхняя одежда', size: 'medium', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=192&fit=crop' },
    { id: 'jackets', name: 'Куртки', size: 'small', image: 'https://images.unsplash.com/photo-1551048632-6fa7ba38fb90?w=400&h=144&fit=crop' },
    { id: 'sport', name: 'Спортивная', size: 'medium', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=192&fit=crop' },
    { id: 'underwear', name: 'Бельё', size: 'small', image: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=400&h=144&fit=crop' },
    { id: 'bags', name: 'Сумки', size: 'small', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=144&fit=crop' },
    { id: 'jewelry', name: 'Украшения', size: 'small', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=144&fit=crop' },
    { id: 'glasses', name: 'Очки', size: 'small', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=144&fit=crop' },
    { id: 'watches', name: 'Часы', size: 'small', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=144&fit=crop' },
    { id: 'kids', name: 'Детская', size: 'small', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=144&fit=crop' },
    { id: 'cosmetics', name: 'Косметика', size: 'small', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=144&fit=crop' },
    { id: 'perfume', name: 'Парфюм', size: 'small', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=144&fit=crop' },
    { id: 'home', name: 'Домашняя', size: 'small', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=144&fit=crop' }
  ];

  const handleChipClick = (chipId: string) => {
    setSelectedQuickChips(prev => 
      prev.includes(chipId) 
        ? prev.filter(id => id !== chipId)
        : [...prev, chipId]
    );
  };

  const handleBrandClick = (brandId: string) => {
    console.log('Brand clicked:', brandId);
    // Navigate to brand listing
  };

  const handleCategoryClick = (categoryId: string) => {
    console.log('Category clicked:', categoryId);
    // Navigate to category listing
  };

  const handleSeeAllBrands = () => {
    console.log('See all brands clicked');
  };

  const handleLikeToggle = (productId: string) => {
    console.log('Like toggled:', productId);
  };

  const handleQuickAdd = (productId: string) => {
    console.log('Quick add:', productId);
    onAddToCart(productId);
  };

  const handleStoreTap = (storeId: string) => {
    console.log('Store tapped:', storeId);
  };

  // Mock search results
  const searchResults = [
    {
      id: 'search-1',
      title: 'Платье летнее свободного кроя',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
      price: 320000,
      oldPrice: 450000,
      discountLabel: '-29%',
      store: { id: 'fashion-co', name: 'Fashion Co', avatar: '👗' },
      rating: 4.8
    },
    {
      id: 'search-2',
      title: 'Джинсы прямого кроя классические',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
      price: 280000,
      store: { id: 'denim-style', name: 'Denim Style', avatar: '👖' },
      rating: 4.6
    },
    {
      id: 'search-3',
      title: 'Блузка шёлковая с принтом',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      price: 195000,
      store: { id: 'silk-boutique', name: 'Silk Boutique', avatar: '✨' },
      rating: 4.9
    },
    {
      id: 'search-4',
      title: 'Кроссовки спортивные белые',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      price: 420000,
      oldPrice: 500000,
      discountLabel: '-16%',
      store: { id: 'sport-zone', name: 'Sport Zone', avatar: '👟' },
      rating: 4.7
    },
    {
      id: 'search-5',
      title: 'Сумка кожаная через плечо',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
      price: 650000,
      store: { id: 'leather-craft', name: 'Leather Craft', avatar: '👜' },
      rating: 4.5
    },
    {
      id: 'search-6',
      title: 'Футболка хлопковая базовая',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      price: 95000,
      store: { id: 'basics-store', name: 'Basics Store', avatar: '👕' },
      rating: 4.4
    }
  ];

  const getCategoryHeight = (size: string) => {
    switch (size) {
      case 'large': return 'h-30'; // 120px
      case 'medium': return 'h-24'; // 96px
      case 'small': return 'h-18'; // 72px
      default: return 'h-24';
    }
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          <h1 className="text-xl font-bold text-luma-text-900">
            Поиск
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Найти товар, бренд, магазин"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base pr-12 rounded-luma"
          />
          <button
            onClick={() => setShowPhotoModal(true)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <Camera className="w-5 h-5 text-luma-primary-600" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6" style={{ paddingBottom: '104px' }}>
        {/* Show search results if query exists */}
        {searchQuery.trim() ? (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-luma-text-900 mb-4">
              Результаты поиска "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {searchResults.map((product) => (
                <ProductCardV3
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  pill={product.discountLabel}
                  store={product.store}
                  rating={product.rating}
                  size="md"
                  context="global"
                  onOpen={onProductClick}
                  onToggleLike={handleLikeToggle}
                  onQuickAdd={handleQuickAdd}
                  onStoreTap={handleStoreTap}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Quick Access Section - Exactly 2 rows, compact */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-luma-text-900 mb-4">
                Быстрый доступ
              </h2>
              <div className="h-20"> {/* Container height for exactly 2 rows */}
                {/* Row 1 */}
                <div className="flex gap-2 mb-2 overflow-x-auto scrollbar-hide">
                  {quickAccessRow1.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleChipClick(chip.id)}
                      className={`h-8 px-3 rounded-luma text-xs font-medium transition-colors flex-shrink-0 ${
                        selectedQuickChips.includes(chip.id)
                          ? 'bg-luma-primary-600 text-white'
                          : 'bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                
                {/* Row 2 */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {quickAccessRow2.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleChipClick(chip.id)}
                      className={`h-8 px-3 rounded-luma text-xs font-medium transition-colors flex-shrink-0 ${
                        selectedQuickChips.includes(chip.id)
                          ? 'bg-luma-primary-600 text-white'
                          : 'bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Brands Section - Immediately after Quick Access */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-luma-text-900">
                  Популярные бренды
                </h2>
                <button 
                  onClick={handleSeeAllBrands}
                  className="flex items-center gap-1 text-sm text-luma-primary-600 font-medium hover:text-luma-primary-500"
                >
                  Смотреть всё
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {popularBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandClick(brand.id)}
                    className="flex-shrink-0 flex flex-col items-center gap-2"
                    style={{ width: '68px' }}
                  >
                    <Card className="w-17 h-21 bg-luma-surface-0 border border-luma-border-200 shadow-luma-soft hover:shadow-luma-primary transition-shadow rounded-luma p-3">
                      <div className="w-10 h-10 rounded-full bg-luma-primary-200 flex items-center justify-center text-luma-primary-600 font-bold text-lg mx-auto">
                        {brand.logo}
                      </div>
                    </Card>
                    <span className="text-xs text-luma-text-900 text-center leading-tight">
                      {brand.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-luma-text-900 mb-4">
                Категории
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`relative overflow-hidden rounded-luma shadow-luma-soft hover:shadow-luma-primary transition-shadow ${getCategoryHeight(category.size)}`}
                  >
                    <ImageWithFallback
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-sm font-bold text-white leading-tight">
                        {category.name}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Photo Search Modal */}
      <PhotoSearchModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
      />

      {/* Floating Navigation Bar */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}