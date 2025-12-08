import React from 'react';
import { X, Search, Camera, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const popularCategories = [
    { name: 'Платья', icon: '👗', color: 'bg-luma-purple' },
    { name: 'Обувь', icon: '👠', color: 'bg-luma-orange' },
    { name: 'Украшения', icon: '💍', color: 'bg-luma-lime' },
    { name: 'Косметика', icon: '💄', color: 'bg-luma-mint' },
    { name: 'Сумки', icon: '👜', color: 'gradient-luma' },
    { name: 'Очки', icon: '🕶️', color: 'bg-luma-purple' }
  ];

  const recentSearches = [
    'Белое платье',
    'Кроссовки Nike',
    'Золотые серьги',
    'Губная помада',
    'Кожаная сумка'
  ];

  const trendingSearches = [
    'Зимние куртки',
    'Свитеры оверсайз',
    'Ботинки челси',
    'Минималистичные украшения'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-luma-background animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-100">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="flex-shrink-0"
        >
          <X className="w-6 h-6" />
        </Button>
        
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luma-text-secondary" />
          <Input
            placeholder="Искать товары, бренды, магазины"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-luma-purple/20"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 w-10 h-10 text-luma-purple hover:bg-luma-purple/10"
          >
            <Camera className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Popular Categories */}
        <div>
          <h2 className="text-lg font-semibold text-luma-text-dark mb-4">
            Популярные категории
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {popularCategories.map((category, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 rounded-2xl hover-scale transition-transform"
              >
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center text-2xl mb-2 text-white`}>
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-luma-text-dark">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-luma-text-secondary" />
              <h2 className="text-lg font-semibold text-luma-text-dark">
                Недавние поиски
              </h2>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setSearchQuery(search)}
                >
                  <span className="text-luma-text-dark">{search}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-luma-text-secondary" />
            <h2 className="text-lg font-semibold text-luma-text-dark">
              Популярное сейчас
            </h2>
          </div>
          <div className="space-y-2">
            {trendingSearches.map((search, index) => (
              <button
                key={index}
                className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                onClick={() => setSearchQuery(search)}
              >
                <span className="text-luma-text-dark">{search}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}