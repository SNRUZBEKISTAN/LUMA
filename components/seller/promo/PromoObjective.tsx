import React, { useState } from 'react';
import { SellerAppBar } from '../SellerAppBar';
import { Users, Eye, MousePointer, ShoppingCart, ShoppingBag, Target, BarChart3, Heart } from 'lucide-react';

interface PromoObjectiveProps {
  onBack: () => void;
  onNext: (objective: string) => void;
  promoType?: 'product' | 'store';
  onTypeChange?: (type: 'product' | 'store') => void;
}

export function PromoObjective({ onBack, onNext, promoType = 'product', onTypeChange }: PromoObjectiveProps) {
  const [selectedObjective, setSelectedObjective] = useState<string>('');

  const objectives = [
    {
      id: 'reach',
      title: 'Охват',
      description: 'Показать как можно большему числу людей',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      details: 'Оптимизация для максимального количества уникальных пользователей'
    },
    {
      id: 'views',
      title: 'Просмотры',
      description: 'Увеличить досмотры клипов и постов',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      details: 'Показ пользователям, которые склонны досматривать контент'
    },
    {
      id: 'clicks',
      title: 'Клики',
      description: 'Получить переходы к товарам и магазину',
      icon: <MousePointer className="w-6 h-6" />,
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      details: 'Таргетинг на активных пользователей, склонных к взаимодействию'
    },
    {
      id: 'add_to_cart',
      title: 'В корзину',
      description: 'Стимулировать добавления товаров в корзину',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600',
      details: 'Показ покупателям, готовым к совершению покупки'
    },
    {
      id: 'purchases',
      title: 'Покупки',
      description: 'Максимизировать количество заказов',
      icon: <ShoppingBag className="w-6 h-6" />,
      color: 'bg-luma-primary-200 border-luma-primary-600',
      iconColor: 'text-luma-primary-600',
      details: 'Оптимизация для конверсии в покупку'
    },
  ];

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Создать кампанию"
        onBack={onBack}
        storeSelector={false}
      />

      <div className="pb-20">
        {/* Progress */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-luma-primary-600 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
          </div>
          <p className="luma-type-body-14 text-luma-text-600">Шаг 1 из 5</p>
        </div>

        {/* Type Selection */}
        {onTypeChange && (
          <div className="px-4 pb-6">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Тип кампании</h3>
            <div className="flex gap-3">
              <button
                onClick={() => onTypeChange('product')}
                className={`flex-1 p-4 rounded-2xl border transition-colors ${
                  promoType === 'product'
                    ? 'bg-luma-primary-600 text-white border-luma-primary-600'
                    : 'bg-luma-surface-0 text-luma-text-900 border-luma-border-200'
                }`}
              >
                <Target className="w-6 h-6 mx-auto mb-2" />
                <span className="luma-type-title-14">Товар</span>
              </button>
              <button
                onClick={() => onTypeChange('store')}
                className={`flex-1 p-4 rounded-2xl border transition-colors ${
                  promoType === 'store'
                    ? 'bg-luma-primary-600 text-white border-luma-primary-600'
                    : 'bg-luma-surface-0 text-luma-text-900 border-luma-border-200'
                }`}
              >
                <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                <span className="luma-type-title-14">Магазин</span>
              </button>
            </div>
          </div>
        )}

        {/* Objective Selection */}
        <div className="px-4">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-2">Выберите цель кампании</h3>
          <p className="luma-type-body-14 text-luma-text-600 mb-6">
            От выбранной цели зависит оптимизация показов и стоимость
          </p>

          <div className="space-y-4">
            {objectives.map((objective) => (
              <button
                key={objective.id}
                onClick={() => setSelectedObjective(objective.id)}
                className={`w-full p-4 rounded-2xl border transition-colors text-left ${
                  selectedObjective === objective.id
                    ? 'border-luma-primary-600 bg-luma-primary-50'
                    : `${objective.color} hover:scale-[1.02]`
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${
                    selectedObjective === objective.id 
                      ? 'bg-luma-primary-600 text-white' 
                      : `bg-white ${objective.iconColor}`
                  } flex items-center justify-center flex-shrink-0`}>
                    {objective.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="luma-type-title-14 text-luma-text-900 mb-1">
                      {objective.title}
                    </h4>
                    <p className="luma-type-body-14 text-luma-text-600 mb-2">
                      {objective.description}
                    </p>
                    <p className="luma-type-micro-10 text-luma-text-600">
                      {objective.details}
                    </p>
                  </div>
                  
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedObjective === objective.id
                      ? 'border-luma-primary-600 bg-luma-primary-600'
                      : 'border-luma-border-200'
                  }`}>
                    {selectedObjective === objective.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="px-4 pt-6">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="luma-type-title-14 text-blue-900 mb-1">
                  Совет от luma
                </h4>
                <p className="luma-type-body-14 text-blue-800">
                  Для новых товаров рекомендуем начать с цели "Охват", 
                  чтобы познакомить аудиторию с продуктом.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <button
          onClick={() => selectedObjective && onNext(selectedObjective)}
          disabled={!selectedObjective}
          className={`w-full py-4 rounded-2xl luma-type-title-14 transition-colors ${
            selectedObjective
              ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-500'
              : 'bg-luma-border-200 text-luma-text-600 cursor-not-allowed'
          }`}
        >
          Далее
        </button>
      </div>
    </div>
  );
}