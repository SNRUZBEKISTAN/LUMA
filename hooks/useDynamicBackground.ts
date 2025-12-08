import { useState, useCallback } from 'react';
import { CategoryType } from '../components/DynamicBackground';

export interface UseDynamicBackgroundReturn {
  currentCategory: CategoryType;
  setCategory: (category: CategoryType) => void;
  resetToDefault: () => void;
}

export function useDynamicBackground(initialCategory: CategoryType = 'default'): UseDynamicBackgroundReturn {
  const [currentCategory, setCurrentCategory] = useState<CategoryType>(initialCategory);

  const setCategory = useCallback((category: CategoryType) => {
    setCurrentCategory(prev => prev !== category ? category : prev);
  }, []);

  const resetToDefault = useCallback(() => {
    setCurrentCategory('default');
  }, []);

  return {
    currentCategory,
    setCategory,
    resetToDefault
  };
}

// Утилита для определения категории по типу товара/страницы
export const getCategoryFromRoute = (route: string): CategoryType => {
  if (route.includes('sport') || route.includes('фитнес') || route.includes('тренировки')) {
    return 'sport';
  }
  if (route.includes('elegant') || route.includes('элегантное') || route.includes('вечернее')) {
    return 'elegant';
  }
  if (route.includes('street') || route.includes('уличное') || route.includes('casual')) {
    return 'street';
  }
  if (route.includes('kids') || route.includes('детское') || route.includes('дети')) {
    return 'kids';
  }
  return 'default';
};

// Утилита для определения категории по тегам товара
export const getCategoryFromTags = (tags: string[]): CategoryType => {
  const tagString = tags.join(' ').toLowerCase();
  
  if (tagString.includes('спорт') || tagString.includes('фитнес') || tagString.includes('тренировка')) {
    return 'sport';
  }
  if (tagString.includes('элегантное') || tagString.includes('вечернее') || tagString.includes('формальное')) {
    return 'elegant';
  }
  if (tagString.includes('уличное') || tagString.includes('casual') || tagString.includes('повседневное')) {
    return 'street';
  }
  if (tagString.includes('детское') || tagString.includes('дети') || tagString.includes('младенцы')) {
    return 'kids';
  }
  return 'default';
};

export default useDynamicBackground;