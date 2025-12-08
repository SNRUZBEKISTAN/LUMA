import React from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
  isActive?: boolean;
}

interface CategoriesProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
  isFixed?: boolean;
}

export function Categories({ categories, onCategoryClick, isFixed = false }: CategoriesProps) {
  return (
    <div className={`bg-luma-card border-b border-gray-100/50 ${isFixed ? 'sticky top-20 z-30' : ''}`}>
      <div className="px-6 py-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-luma flex-shrink-0 transition-all ${
                category.isActive
                  ? 'bg-gradient-to-r from-luma-primary to-luma-pink text-white shadow-luma'
                  : 'bg-gray-50 text-luma-text-secondary hover:bg-luma-primary/10 hover:text-luma-primary'
              }`}
            >
              <span className="text-sm">{category.icon}</span>
              <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}