import React, { useState } from 'react';
import { SellerAppBar } from '../SellerAppBar';
import { Target, Users, Eye, MousePointer, ShoppingCart, ShoppingBag, CheckCircle, Zap, Star, Crown } from 'lucide-react';

interface PromoPricingEnhancedProps {
  onBack: () => void;
  onNext: (data: { objective: string; package: string; price: number }) => void;
  promoType: 'product' | 'store';
}

export function PromoPricingEnhanced({ onBack, onNext, promoType }: PromoPricingEnhancedProps) {
  const [selectedObjective, setSelectedObjective] = useState('purchases');
  const [selectedPackage, setSelectedPackage] = useState('standard');

  const objectives = [
    { id: 'reach', label: 'Охват', icon: <Users className="w-4 h-4" /> },
    { id: 'views', label: 'Просмотры', icon: <Eye className="w-4 h-4" /> },
    { id: 'clicks', label: 'Клики', icon: <MousePointer className="w-4 h-4" /> },
    { id: 'cart', label: 'В корзину', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'purchases', label: 'Покупки', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  const packages = [
    {
      id: 'lite',
      name: 'Lite',
      duration: '7 дней',
      price: 300000,
      oldPrice: null,
      icon: <Zap className="w-5 h-5" />,
      features: [
        'Базовая аудитория',
        'Показы в ленте',
        'Простая аналитика'
      ],
      results: {
        reach: '2-5K',
        views: '5-12K',
        clicks: '100-300',
        cart: '20-60',
        purchases: '5-15'
      },
      badge: null
    },
    {
      id: 'standard',
      name: 'Standard',
      duration: '14 дней',
      price: 900000,
      oldPrice: 1200000,
      icon: <Star className="w-5 h-5" />,
      features: [
        'Расширенная аудитория',
        'Показы в ленте и поиске',
        'Детальная аналитика',
        'Оптимизация кампании'
      ],
      results: {
        reach: '8-15K',
        views: '20-40K',
        clicks: '400-800',
        cart: '80-160',
        purchases: '20-40'
      },
      badge: 'ПОПУЛЯРНЫЙ'
    },
    {
      id: 'pro',
      name: 'Pro',
      duration: '30 дней',
      price: 2500000,
      oldPrice: null,
      icon: <Crown className="w-5 h-5" />,
      features: [
        'Максимальная аудитория',
        'Приоритетные показы',
        'Полная аналитика',
        'Персональный менеджер',
        'A/B тестирование'
      ],
      results: {
        reach: '25-50K',
        views: '60-120K',
        clicks: '1.2-2.5K',
        cart: '250-500',
        purchases: '60-120'
      },
      badge: 'МАКСИМУМ'
    }
  ];

  const getResultsForObjective = (pkg: typeof packages[0]) => {
    switch (selectedObjective) {
      case 'reach':
        return pkg.results.reach;
      case 'views':
        return pkg.results.views;
      case 'clicks':
        return pkg.results.clicks;
      case 'cart':
        return pkg.results.cart;
      case 'purchases':
        return pkg.results.purchases;
      default:
        return pkg.results.purchases;
    }
  };

  const getObjectiveLabel = () => {
    const obj = objectives.find(o => o.id === selectedObjective);
    return obj?.label || 'Покупки';
  };

  const handleNext = () => {
    const pkg = packages.find(p => p.id === selectedPackage);
    if (pkg) {
      onNext({
        objective: selectedObjective,
        package: selectedPackage,
        price: pkg.price
      });
    }
  };

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Пакеты и цены"
        onBack={onBack}
        storeSelector={false}
      />

      <div className="px-4 py-6 pb-32">
        {/* Objective Selection */}
        <div className="mb-8">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Цель продвижения</h3>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {objectives.map((objective) => (
              <button
                key={objective.id}
                onClick={() => setSelectedObjective(objective.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  selectedObjective === objective.id
                    ? 'bg-luma-primary-600 text-white'
                    : 'bg-luma-surface-0 text-luma-text-600 border border-luma-border-200'
                }`}
              >
                {objective.icon}
                <span className="luma-type-body-14">{objective.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Package Selection */}
        <div className="mb-8">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Выберите пакет</h3>
          <div className="space-y-4">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all ${
                  selectedPackage === pkg.id
                    ? 'border-luma-primary-600 bg-luma-primary-50'
                    : 'border-luma-border-200 bg-luma-surface-0'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedPackage === pkg.id ? 'bg-luma-primary-600 text-white' : 'bg-luma-bg-0 text-luma-primary-600'
                  }`}>
                    {pkg.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="luma-type-title-16 text-luma-text-900">{pkg.name}</h4>
                      {pkg.badge && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-lg luma-type-micro-10">
                          {pkg.badge}
                        </span>
                      )}
                    </div>
                    
                    <p className="luma-type-body-14 text-luma-text-600 mb-4">{pkg.duration}</p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="luma-type-price-16 text-luma-text-900">
                        {pkg.price.toLocaleString()}
                      </span>
                      {pkg.oldPrice && (
                        <span className="luma-type-body-14 text-luma-text-600 line-through">
                          {pkg.oldPrice.toLocaleString()}
                        </span>
                      )}
                      {pkg.oldPrice && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-600 rounded-lg luma-type-micro-10">
                          -{Math.round((1 - pkg.price / pkg.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="luma-type-body-14 text-luma-text-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedPackage === pkg.id && (
                    <div className="w-6 h-6 bg-luma-primary-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Expected Results */}
        <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-6">
          <h4 className="luma-type-title-16 text-luma-text-900 mb-4">
            Ожидаемые результаты для цели "{getObjectiveLabel()}"
          </h4>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`text-center p-4 rounded-xl border ${
                  selectedPackage === pkg.id
                    ? 'border-luma-primary-600 bg-luma-primary-50'
                    : 'border-luma-border-200'
                }`}
              >
                <div className="flex items-center justify-center mb-2">
                  {pkg.icon}
                  <span className="luma-type-title-14 text-luma-text-900 ml-1">{pkg.name}</span>
                </div>
                <p className="luma-type-price-15 text-luma-primary-600">
                  {getResultsForObjective(pkg)}
                </p>
                <p className="luma-type-micro-10 text-luma-text-600 uppercase">
                  {getObjectiveLabel()}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="luma-type-body-14 text-blue-800">
              <strong>Прогноз ориентировочный, не гарантия результата.</strong> Фактические показатели зависят от качества контента, конкуренции и поведения аудитории.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="luma-type-body-14 text-luma-text-600">Итого к оплате:</p>
            <p className="luma-type-price-16 text-luma-text-900">
              {packages.find(p => p.id === selectedPackage)?.price.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="luma-type-micro-10 text-luma-text-600">ОЖИДАЕМО</p>
            <p className="luma-type-title-14 text-luma-primary-600">
              {getResultsForObjective(packages.find(p => p.id === selectedPackage)!)} {getObjectiveLabel()}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleNext}
          className="w-full py-4 bg-luma-primary-600 text-white rounded-2xl luma-type-title-14 hover:bg-luma-primary-500 transition-colors"
        >
          Далее
        </button>
      </div>
    </div>
  );
}