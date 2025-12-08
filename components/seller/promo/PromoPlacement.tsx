import React, { useState } from 'react';
import { SellerAppBar } from '../SellerAppBar';
import { Smartphone, Search, Store, Info } from 'lucide-react';

interface PromoPlacementProps {
  onBack: () => void;
  onNext: (placements: string[]) => void;
}

export function PromoPlacement({ onBack, onNext }: PromoPlacementProps) {
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>(['feed']);

  const placements = [
    {
      id: 'feed',
      title: 'Лента',
      description: 'Показ в основной ленте между постами',
      icon: <Smartphone className="w-6 h-6" />,
      color: 'bg-luma-primary-50 border-luma-primary-200',
      iconColor: 'text-luma-primary-600',
      examples: ['Нативные карточки товаров', 'Видео-превью', 'Карусель товаров'],
      coverage: '85% пользователей',
      recommended: true
    },
    {
      id: 'search',
      title: 'Поиск',
      description: 'Показ в результатах поиска',
      icon: <Search className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      examples: ['Спонсируемые результаты', 'Баннеры в поиске', 'Предложения товаров'],
      coverage: '65% пользователей',
      recommended: false
    },
    {
      id: 'store',
      title: 'Страница магазина',
      description: 'Показ на страницах других магазинов',
      icon: <Store className="w-6 h-6" />,
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      examples: ['Рекомендуемые товары', 'Похожие магазины', 'Кросс-промо'],
      coverage: '45% пользователей',
      recommended: false
    },
  ];

  const togglePlacement = (placementId: string) => {
    setSelectedPlacements(prev => {
      if (prev.includes(placementId)) {
        return prev.filter(id => id !== placementId);
      } else {
        return [...prev, placementId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Размещение"
        onBack={onBack}
        storeSelector={false}
      />

      <div className="pb-20">
        {/* Progress */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-luma-primary-600 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-primary-600 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
          </div>
          <p className="luma-type-body-14 text-luma-text-600">Шаг 2 из 5</p>
        </div>

        {/* Header */}
        <div className="px-4 pb-6">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-2">Где показывать рекламу?</h3>
          <p className="luma-type-body-14 text-luma-text-600">
            Можно выбрать несколько мест размещения для лучшего охвата
          </p>
        </div>

        {/* Placements */}
        <div className="px-4 space-y-4">
          {placements.map((placement) => {
            const isSelected = selectedPlacements.includes(placement.id);
            
            return (
              <div
                key={placement.id}
                className={`rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-luma-primary-600 bg-luma-primary-50'
                    : `${placement.color} hover:scale-[1.01]`
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${
                      isSelected 
                        ? 'bg-luma-primary-600 text-white' 
                        : `bg-white ${placement.iconColor}`
                    } flex items-center justify-center flex-shrink-0`}>
                      {placement.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="luma-type-title-14 text-luma-text-900">
                          {placement.title}
                        </h4>
                        {placement.recommended && (
                          <span className="px-2 py-0.5 bg-luma-primary-600 text-white rounded luma-type-micro-10">
                            РЕКОМЕНДУЕМ
                          </span>
                        )}
                      </div>
                      <p className="luma-type-body-14 text-luma-text-600 mb-2">
                        {placement.description}
                      </p>
                      <p className="luma-type-cap-12 text-luma-primary-600">
                        {placement.coverage}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => togglePlacement(placement.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-luma-primary-600 bg-luma-primary-600'
                          : 'border-luma-border-200 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                      )}
                    </button>
                  </div>
                  
                  {/* Examples */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-luma-text-600" />
                      <span className="luma-type-cap-12 text-luma-text-600">ФОРМАТЫ</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {placement.examples.map((example, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white rounded-lg luma-type-micro-10 text-luma-text-600 border border-luma-border-200"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview Section */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h4 className="luma-type-title-14 text-luma-text-900 mb-3">
              Предварительный охват
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-luma-bg-0 rounded-xl">
                <p className="luma-type-micro-10 text-luma-text-600 mb-1">ПОТЕНЦИАЛЬНЫЙ ОХВАТ</p>
                <p className="luma-type-title-16 text-luma-text-900">
                  {selectedPlacements.length > 1 ? '120K' : '85K'}
                </p>
              </div>
              <div className="text-center p-3 bg-luma-bg-0 rounded-xl">
                <p className="luma-type-micro-10 text-luma-text-600 mb-1">ОЖИДАЕМЫЕ ПОКАЗЫ</p>
                <p className="luma-type-title-16 text-luma-text-900">
                  {selectedPlacements.length > 1 ? '8.5K/день' : '6.2K/день'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="px-4 pt-4">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="luma-type-title-14 text-blue-900 mb-1">
                  Совет по размещению
                </h4>
                <p className="luma-type-body-14 text-blue-800">
                  Лента даёт максимальный охват, поиск — высокое качество трафика. 
                  Комбинирование увеличивает эффективность на 25%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <button
          onClick={() => onNext(selectedPlacements)}
          disabled={selectedPlacements.length === 0}
          className={`w-full py-4 rounded-2xl luma-type-title-14 transition-colors ${
            selectedPlacements.length > 0
              ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-500'
              : 'bg-luma-border-200 text-luma-text-600 cursor-not-allowed'
          }`}
        >
          Далее ({selectedPlacements.length} выбрано)
        </button>
      </div>
    </div>
  );
}