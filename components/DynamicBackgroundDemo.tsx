import React, { useState } from 'react';
import { DynamicBackground, CategoryType } from './DynamicBackground';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function DynamicBackgroundDemo() {
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('default');

  const categories: { key: CategoryType; label: string; description: string }[] = [
    { key: 'default', label: 'По умолчанию', description: 'Фиолетово-розовый градиент' },
    { key: 'sport', label: 'Спорт', description: 'Голубые тона для активности' },
    { key: 'elegant', label: 'Элегантное', description: 'Розовые тона для роскоши' },
    { key: 'street', label: 'Уличное', description: 'Серые тона для casual' },
    { key: 'kids', label: 'Детское', description: 'Зеленые тона для детей' }
  ];

  return (
    <div className="relative min-h-screen p-4">
      {/* Dynamic Background */}
      <DynamicBackground category={currentCategory} />
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => {
                // В реальном приложении здесь будет навигация
                if (typeof window !== 'undefined') {
                  window.location.reload();
                }
              }}
              className="text-luma-text-600"
            >
              ← Назад к приложению
            </Button>
            <div className="text-right">
              <div className="text-sm text-luma-text-600">Демо</div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-luma-text-900 mb-2">
            Динамический фон
          </h1>
          <p className="text-luma-text-600">
            Текущая категория: <span className="font-semibold">{currentCategory}</span>
          </p>
        </div>

        {/* Category Controls */}
        <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4">Выберите категорию:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={currentCategory === category.key ? "default" : "outline"}
                onClick={() => setCurrentCategory(category.key)}
                className="justify-start text-left h-auto p-4"
              >
                <div>
                  <div className="font-medium">{category.label}</div>
                  <div className="text-sm opacity-70">{category.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 mb-6 bg-white/70 backdrop-blur-sm">
          <h3 className="font-semibold mb-3">🎨 Быстрое переключение</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                size="sm"
                variant={currentCategory === cat.key ? "default" : "outline"}
                onClick={() => setCurrentCategory(cat.key)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-6 bg-white/60 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Карточка товара</h3>
            <p className="text-sm text-luma-text-600 mb-4">
              Пример как выглядят карточки на фоне
            </p>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
              <h4 className="font-medium mb-1">Название товара</h4>
              <p className="text-sm text-gray-600 mb-2">Магазин</p>
              <div className="bg-[#F6F3FF] rounded px-2 py-1 inline-block">
                <span className="text-purple-600 font-semibold">25,000 сум</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Цветовая палитра</h3>
            <p className="text-sm text-luma-text-600 mb-4">
              Текущая категория: <strong>{currentCategory}</strong>
            </p>
            <div className="space-y-2">
              <div className="text-xs text-gray-500">Размытые пятна:</div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-current opacity-20 border border-gray-300"></div>
                <div className="w-6 h-6 rounded-full bg-current opacity-15 border border-gray-300"></div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {currentCategory === 'sport' && 'Голубые оттенки для активности'}
                {currentCategory === 'elegant' && 'Розовые тона для элегантности'}
                {currentCategory === 'street' && 'Серые тона для urban стиля'}
                {currentCategory === 'kids' && 'Зеленые оттенки для детей'}
                {currentCategory === 'default' && 'Базовая фиолетово-розовая палитра'}
              </div>
            </div>
          </Card>
        </div>

        {/* Info */}
        <Card className="p-6 mt-6 bg-white/40 backdrop-blur-sm">
          <h3 className="font-semibold mb-2">🎨 Как это работает</h3>
          <ul className="text-sm text-luma-text-600 space-y-1">
            <li>• Фон меняется плавно за 600ms при смене категории</li>
            <li>• Градиент идет снизу вверх (темнее внизу)</li>
            <li>• 2-3 размытых пятна для объема</li>
            <li>• Адаптивно для мобильных устройств</li>
            <li>• Не мешает читаемости контента</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}