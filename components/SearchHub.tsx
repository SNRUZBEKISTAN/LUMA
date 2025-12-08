import React from 'react';
import { ArrowLeft, Camera, Search } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationBar } from './NavigationBar';
import { QuickTile } from './QuickTile';

interface SearchHubProps {
  onBack: () => void;
  onCategorySelect: (category: string) => void;
  onSearchSubmit: (query: string) => void;
  onPhotoSearch: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

// Exact 7 categories for 7×1 grid - only first row
const quickAccessCategories = [
  { id: 'women', label: 'Женская', icon: '👗' },
  { id: 'men', label: 'Мужская', icon: '👔' },
  { id: 'shoes', label: 'Обувь', icon: '👠' },
  { id: 'dresses', label: 'Платья', icon: '👗' },
  { id: 'tshirts', label: 'Футболки', icon: '👕' },
  { id: 'jeans', label: 'Джинсы', icon: '👖' },
  { id: 'skirts', label: 'Юбки', icon: '👗' }
];

const popularBrands = [
  { id: 'zara', name: 'ZARA', logo: 'Z' },
  { id: 'hm', name: 'H&M', logo: 'H' },
  { id: 'uniqlo', name: 'UNIQLO', logo: 'U' },
  { id: 'nike', name: 'NIKE', logo: 'N' },
  { id: 'adidas', name: 'ADIDAS', logo: 'A' },
  { id: 'mango', name: 'MANGO', logo: 'M' },
  { id: 'bershka', name: 'BERSHKA', logo: 'B' },
  { id: 'massimo', name: 'MASSIMO DUTTI', logo: 'MD' }
];

// Large category rectangles - different sizes masonry layout
const categories = [
  { id: 'women-clothing', name: 'Женская одежда', icon: '👗', size: 'large' },
  { id: 'men-clothing', name: 'Мужская одежда', icon: '👔', size: 'medium' },
  { id: 'shoes', name: 'Обувь', icon: '👠', size: 'small' },
  { id: 'accessories', name: 'Аксессуары', icon: '👜', size: 'medium' },
  { id: 'cosmetics', name: 'Косметика', icon: '💄', size: 'large' },
  { id: 'perfume', name: 'Парфюм', icon: '🧴', size: 'small' },
  { id: 'kids', name: 'Детская одежда', icon: '👶', size: 'medium' },
  { id: 'homeware', name: 'Домашняя одежда', icon: '🏠', size: 'small' }
];

export function SearchHub({ 
  onBack, 
  onCategorySelect, 
  onSearchSubmit, 
  onPhotoSearch,
  onTabChange,
  activeTab 
}: SearchHubProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
  };

  const handleQuickCategorySelect = (categoryId: string) => {
    onCategorySelect(categoryId);
  };

  return (
    <div className="h-full bg-luma-bg-0 flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-primary-600" />
          </button>
          <h1 className="font-bold text-luma-text-900" style={{ fontSize: '18px', fontWeight: '700' }}>Поиск</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pb-4">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luma-text-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Найти товар, бренд, магазин"
              className="w-full h-10 pl-12 pr-12 bg-luma-bg-0 border border-luma-border-200 text-luma-text-900 placeholder-luma-text-600 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
              style={{ borderRadius: '16px', fontSize: '14px', fontWeight: '400' }}
            />
            <button
              type="button"
              onClick={onPhotoSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-luma-primary-600 hover:text-luma-primary-500 transition-colors"
            >
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Quick Access - Strict 7×1 Grid (7 categories max) */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-luma-text-900" style={{ fontSize: '18px', fontWeight: '700' }}>Быстрый доступ</h2>
            <button className="text-luma-primary-600 font-medium hover:text-luma-primary-500 transition-colors" style={{ fontSize: '14px', fontWeight: '400' }}>
              Смотреть всё ▸
            </button>
          </div>
          
          {/* 7×1 Grid Container - Content width = 390 - 32 = 358px */}
          <div 
            className="grid gap-2"
            style={{
              gridTemplateColumns: 'repeat(7, 44px)',
              gridTemplateRows: 'repeat(1, auto)',
              gap: '8px',
              justifyContent: 'start',
              width: '100%'
            }}
          >
            {quickAccessCategories.map((category) => (
              <QuickTile
                key={category.id}
                id={category.id}
                label={category.label}
                icon={category.icon}
                onTap={handleQuickCategorySelect}
              />
            ))}
          </div>
        </div>

        {/* Popular Brands - После быстрого доступа */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-luma-text-900" style={{ fontSize: '18px', fontWeight: '700' }}>Популярные бренды</h2>
            <button className="text-luma-primary-600 font-medium hover:text-luma-primary-500 transition-colors" style={{ fontSize: '14px', fontWeight: '400' }}>
              Смотреть всё ▸
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {popularBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => onSearchSubmit(brand.name)}
                className="flex-shrink-0 flex flex-col items-center gap-2 hover:bg-luma-primary-200/30 transition-colors"
                style={{ width: '68px', height: '84px', borderRadius: '16px', padding: '8px' }}
              >
                <div className="bg-luma-surface-0 border border-luma-border-200 shadow-luma-soft flex items-center justify-center" style={{ width: '52px', height: '52px', borderRadius: '16px' }}>
                  <span className="text-luma-primary-600 font-bold" style={{ fontSize: '14px' }}>{brand.logo}</span>
                </div>
                <span className="text-luma-text-900 text-center line-clamp-1" style={{ fontSize: '10px', lineHeight: '12px' }}>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories - Large rectangles masonry layout НИЖЕ брендов */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-luma-text-900" style={{ fontSize: '18px', fontWeight: '700' }}>Категории</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`flex flex-col items-center justify-center p-4 bg-luma-surface-0 hover:bg-luma-primary-200/30 transition-colors shadow-luma-soft ${
                  category.size === 'large' ? 'aspect-[4/3]' : 
                  category.size === 'medium' ? 'aspect-square' : 
                  'aspect-[3/2]'
                }`}
                style={{ borderRadius: '16px' }}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <span className="text-luma-text-900 text-center font-medium" style={{ fontSize: '14px' }}>
                  {category.name}
                </span>
              </button>
            ))}
          </div>
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