import React, { useState } from 'react';
import { SellerAppBar } from '../SellerAppBar';
import { Tag, Store, TrendingUp, Users, Target, CheckCircle } from 'lucide-react';

interface PromoTypeProps {
  onBack: () => void;
  onNext: (type: 'product' | 'store') => void;
  selectedType?: 'product' | 'store';
}

export function PromoType({ onBack, onNext, selectedType }: PromoTypeProps) {
  const [selected, setSelected] = useState<'product' | 'store' | null>(selectedType || null);

  const promoTypes = [
    {
      id: 'product' as const,
      title: 'Промо товара',
      icon: <Tag className="w-8 h-8" />,
      description: 'Продвигайте конкретные товары для увеличения продаж',
      features: [
        'Показы в ленте и поиске',
        'Целевая аудитория по интересам',
        'Повышение в рейтинге товаров',
        'Аналитика по каждому товару'
      ],
      recommended: false
    },
    {
      id: 'store' as const,
      title: 'Промо магазина',
      icon: <Store className="w-8 h-8" />,
      description: 'Увеличивайте узнаваемость вашего бренда и магазина',
      features: [
        'Показы вашего магазина',
        'Увеличение подписчиков',
        'Продвижение в сториях',
        'Брендинг и узнаваемость'
      ],
      recommended: true
    }
  ];

  const handleNext = () => {
    if (selected) {
      onNext(selected);
    }
  };

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Запуск промо"
        onBack={onBack}
        storeSelector={false}
      />

      <div className="px-4 py-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-luma-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-luma-primary-600" />
          </div>
          <h1 className="luma-type-title-16 text-luma-text-900 mb-2">Выберите тип промо</h1>
          <p className="luma-type-body-14 text-luma-text-600">
            Определите, что вы хотите продвигать для максимального эффекта
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {promoTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelected(type.id)}
              className={`w-full p-6 rounded-2xl border-2 transition-all ${
                selected === type.id
                  ? 'border-luma-primary-600 bg-luma-primary-50'
                  : 'border-luma-border-200 bg-luma-surface-0'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  selected === type.id ? 'bg-luma-primary-600 text-white' : 'bg-luma-bg-0 text-luma-primary-600'
                }`}>
                  {type.icon}
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="luma-type-title-16 text-luma-text-900">{type.title}</h3>
                    {type.recommended && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-lg luma-type-micro-10">
                        РЕКОМЕНДУЕМ
                      </span>
                    )}
                  </div>
                  
                  <p className="luma-type-body-14 text-luma-text-600 mb-4">
                    {type.description}
                  </p>
                  
                  <div className="space-y-2">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="luma-type-body-14 text-luma-text-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selected === type.id && (
                  <div className="w-6 h-6 bg-luma-primary-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Example Results */}
        {selected && (
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4 mb-8">
            <h4 className="luma-type-title-14 text-luma-text-900 mb-3">
              Ожидаемые результаты для {selected === 'product' ? 'товара' : 'магазина'}
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              {selected === 'product' ? (
                <>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="luma-type-title-14 text-luma-text-900">+2-5K</p>
                    <p className="luma-type-micro-10 text-luma-text-600">ПРОСМОТРОВ</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="luma-type-title-14 text-luma-text-900">+15-30%</p>
                    <p className="luma-type-micro-10 text-luma-text-600">ПРОДАЖ</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="luma-type-title-14 text-luma-text-900">+100-500</p>
                    <p className="luma-type-micro-10 text-luma-text-600">ПОДПИСЧИКОВ</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                    </div>
                    <p className="luma-type-title-14 text-luma-text-900">+25-50%</p>
                    <p className="luma-type-micro-10 text-luma-text-600">УЗНАВАЕМОСТИ</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="luma-type-body-14 text-blue-800">
            <strong>Прогноз ориентировочный, не гарантия результата.</strong> Фактические показатели зависят от качества контента, конкуренции и других факторов.
          </p>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`w-full py-4 rounded-2xl luma-type-title-14 transition-colors ${
            selected
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