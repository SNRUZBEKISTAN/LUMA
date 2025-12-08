import React from 'react';
import { ArrowLeft, Camera, Grid3X3, List, Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationBar } from './NavigationBar';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchResultsProps {
  searchQuery: string;
  onBack: () => void;
  onSearchQueryChange: (query: string) => void;
  onPhotoSearch: () => void;
  onFiltersOpen: () => void;
  onSortOpen: () => void;
  onProductClick: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const filterChips = [
  { id: 'size', name: 'Размер', active: false },
  { id: 'color', name: 'Цвет', active: false },
  { id: 'price', name: 'Цена', active: true },
  { id: 'brand', name: 'Бренд', active: false },
  { id: 'rating', name: 'Рейтинг', active: false },
  { id: 'delivery', name: 'Доставка сегодня', active: false }
];

const searchResults = [
  {
    id: '1',
    name: 'Элегантное черное платье',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
    price: 450000,
    originalPrice: 650000,
    rating: 4.8,
    reviewCount: 124,
    shop: {
      name: 'Elegant Style',
      avatar: '👗'
    }
  },
  {
    id: '2',
    name: 'Летнее платье в цветочек',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
    price: 320000,
    rating: 4.6,
    reviewCount: 89,
    shop: {
      name: 'Summer Vibes',
      avatar: '🌻'
    }
  },
  {
    id: '3',
    name: 'Вечернее платье с пайетками',
    image: 'https://images.unsplash.com/photo-1566479179817-0dcc6b11d8b5?w=400&h=400&fit=crop',
    price: 750000,
    originalPrice: 950000,
    rating: 4.9,
    reviewCount: 67,
    shop: {
      name: 'Glamour',
      avatar: '✨'
    }
  },
  {
    id: '4',
    name: 'Повседневное платье-рубашка',
    image: 'https://images.unsplash.com/photo-1583053844626-4d29b2e7d4b2?w=400&h=400&fit=crop',
    price: 380000,
    rating: 4.5,
    reviewCount: 156,
    shop: {
      name: 'Casual Chic',
      avatar: '👜'
    }
  },
  {
    id: '5',
    name: 'Деловое платье футляр',
    image: 'https://images.unsplash.com/photo-1581873372207-2b6d4e68126d?w=400&h=400&fit=crop',
    price: 590000,
    rating: 4.7,
    reviewCount: 203,
    shop: {
      name: 'Business Style',
      avatar: '💼'
    }
  },
  {
    id: '6',
    name: 'Спортивное платье-туника',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
    price: 290000,
    originalPrice: 350000,
    rating: 4.4,
    reviewCount: 78,
    shop: {
      name: 'Active Wear',
      avatar: '🏃‍♀️'
    }
  }
];

export function SearchResults({
  searchQuery,
  onBack,
  onSearchQueryChange,
  onPhotoSearch,
  onFiltersOpen,
  onSortOpen,
  onProductClick,
  onAddToCart,
  onTabChange,
  activeTab
}: SearchResultsProps) {
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>(['price']);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}`;
  };

  const handleFilterToggle = (filterId: string) => {
    if (filterId === 'size' || filterId === 'color' || filterId === 'price' || 
        filterId === 'brand' || filterId === 'rating' || filterId === 'delivery') {
      onFiltersOpen();
    } else {
      setSelectedFilters(prev => 
        prev.includes(filterId) 
          ? prev.filter(id => id !== filterId)
          : [...prev, filterId]
      );
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      onSearchQueryChange(localSearchQuery);
    }
  };

  const ProductCard = ({ product }: { product: typeof searchResults[0] }) => (
    <div className="bg-luma-surface-0 rounded-luma shadow-luma-soft overflow-hidden hover:shadow-luma-primary transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Shop Overlay */}
        <div className="absolute top-3 left-3 right-3">
          <div className="bg-luma-surface-0/85 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-2">
            <div className="w-6 h-6 bg-luma-primary-200 rounded-full flex items-center justify-center text-xs">
              {product.shop.avatar}
            </div>
            <span className="text-xs font-medium text-luma-text-900 truncate">
              {product.shop.name === 'directory' || !product.shop.name ? (product.storeName || 'Магазин') : product.shop.name}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
          className="absolute bottom-3 right-3 w-8 h-8 bg-luma-primary-600 rounded-full flex items-center justify-center shadow-luma-primary hover:scale-110 transition-transform"
        >
          <ShoppingCart className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Product Info */}
      <div 
        className="p-3 cursor-pointer"
        onClick={() => onProductClick(product.id)}
      >
        <h3 className="text-sm font-medium text-luma-text-900 line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-2">
          {product.originalPrice && (
            <span className="text-xs text-luma-text-600 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="text-sm font-bold text-luma-primary-600">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-luma-text-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
      </div>
    </div>
  );

  const ProductListItem = ({ product }: { product: typeof searchResults[0] }) => (
    <div className="bg-luma-surface-0 rounded-luma shadow-luma-soft overflow-hidden hover:shadow-luma-primary transition-shadow">
      <div 
        className="flex p-3 cursor-pointer"
        onClick={() => onProductClick(product.id)}
      >
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0 mr-3">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          {/* Shop Info */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-luma-primary-200 rounded-full flex items-center justify-center text-xs">
              {product.shop.avatar}
            </div>
            <span className="text-xs text-luma-text-600">{product.shop.name === 'directory' || !product.shop.name ? (product.storeName || 'Магазин') : product.shop.name}</span>
          </div>

          <h3 className="text-sm font-medium text-luma-text-900 line-clamp-2 mb-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-2">
            {product.originalPrice && (
              <span className="text-xs text-luma-text-600 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-luma-primary-600">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-luma-text-600">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.id);
              }}
              className="w-8 h-8 bg-luma-primary-600 rounded-full flex items-center justify-center shadow-luma-primary hover:scale-110 transition-transform"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full bg-luma-bg-0 flex flex-col">
      {/* Fixed Header with Search */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-primary-600" />
          </button>
          
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Найти товар, бренд, магазин"
                className="w-full h-10 pl-4 pr-10 bg-luma-bg-0 border border-luma-border-200 rounded-luma text-luma-text-900 placeholder-luma-text-600 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
              />
              <button
                type="button"
                onClick={onPhotoSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center text-luma-primary-600 hover:text-luma-primary-500 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 py-3 border-b border-luma-border-200">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3">
          {filterChips.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterToggle(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-luma text-sm font-medium transition-colors ${
                selectedFilters.includes(filter.id)
                  ? 'bg-luma-primary-600 text-white'
                  : 'bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
        
        {/* Sort & View Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-luma-text-600">
            Найдено: {searchResults.length.toLocaleString()}
          </span>
          <div className="flex items-center gap-4">
            <button 
              onClick={onSortOpen}
              className="text-luma-primary-600 text-sm font-medium hover:text-luma-primary-500 transition-colors"
            >
              Сортировка: По популярности ▾
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-luma-primary-600 text-white'
                    : 'text-luma-text-600 hover:bg-luma-primary-200'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-luma-primary-600 text-white'
                    : 'text-luma-text-600 hover:bg-luma-primary-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 pb-24">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 gap-4">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {searchResults.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Navigation Bar */}
      <NavigationBar 
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}