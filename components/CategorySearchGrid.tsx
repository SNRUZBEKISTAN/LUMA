import React from 'react';
import { Category } from '../types/app';

interface CategorySearchGridProps {
  categories: Category[];
  onPick: (categoryId: string) => void;
}

export default function CategorySearchGrid({ categories, onPick }: CategorySearchGridProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Категории не найдены
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {categories.map(category => (
        <button 
          key={category.id} 
          onClick={() => onPick(category.id)} 
          className="group rounded-2xl overflow-hidden border border-gray-200 bg-white hover:shadow-lg transition-all duration-200"
        >
          {/* Category Image */}
          <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
            <img 
              src={category.coverImage} 
              alt={category.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = '/media/placeholder.jpg';
              }}
            />
          </div>
          
          {/* Category Info */}
          <div className="p-3 text-left">
            <div className="font-semibold text-gray-900 truncate">
              {category.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {category.slug}
            </div>
            {category.gender && category.gender.length > 0 && (
              <div className="text-xs text-gray-400 mt-1">
                {category.gender.join(', ')}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}