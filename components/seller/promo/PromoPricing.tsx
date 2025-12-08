import React, { useState } from 'react';
import { SellerAppBar } from '../SellerAppBar';
import { Zap, Star, Crown, Users, Eye, MousePointer, ShoppingCart, ShoppingBag, Check, Info } from 'lucide-react';

interface PromoPricingProps {
  onBack: () => void;
  onNext: (pricing: any) => void;
}

export function PromoPricing({ onBack, onNext }: PromoPricingProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');

  const packages = [
    {
      id: 'lite',
      name: 'Lite',
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-blue-50 border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      price: '150K',
      duration: '3 дня',
      description: 'Для тестирования рекламы',
      features: [
        'Базовая оптимизация',
        'Стандартные места показа',
        'Email поддержка'
      ],
      metrics: {
        reach: '5-8K',
        views: '800-1.2K',
        clicks: '40-80',
        addToCart: '8-16',
        purchases: '2-5'
      },
      recommended: false
    },
    {
      id: 'standard',
      name: 'Standard',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-luma-primary-50 border-luma-primary-200',
      iconBg: 'bg-luma-primary-100',
      iconColor: 'text-luma-primary-600',
      price: '500K',
      duration: '7 дней',
      description: 'Оптимальный для большинства',
      features: [
        'Умная оптимизация',
        'Все места размещения',
        'Приоритетная поддержка',
        'Детальная аналитика'
      ],
      metrics: {
        reach: '15-25K',
        views: '2.5-4K',
        clicks: '150-300',
        addToCart: '30-60',
        purchases: '8-18'
      },
      recommended: true
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-purple-50 border-purple-200',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      price: '1.2M',
      duration: '14 дней',
      description: 'Максимальный результат',
      features: [
        'AI-оптимизация',
        'Приоритетные показы',
        'Персональный менеджер',
        'A/B тестирование',
        'Расширенная аналитика'
      ],
      metrics: {
        reach: '40-60K',
        views: '6-10K',
        clicks: '400-800',
        addToCart: '80-160',
        purchases: '20-45'
      },
      recommended: false
    },
  ];

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'reach':
        return <Users className="w-4 h-4" />;
      case 'views':
        return <Eye className="w-4 h-4" />;
      case 'clicks':
        return <MousePointer className="w-4 h-4" />;
      case 'addToCart':
        return <ShoppingCart className="w-4 h-4" />;
      case 'purchases':
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getMetricName = (metric: string) => {
    switch (metric) {
      case 'reach':
        return 'Охват';
      case 'views':
        return 'Просмотры';
      case 'clicks':
        return 'Клики';
      case 'addToCart':
        return 'В корзину';
      case 'purchases':
        return 'Покупки';
      default:
        return metric;
    }
  };

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Тарифы"
        onBack={onBack}
        storeSelector={false}
      />

      <div className="pb-20">
        {/* Progress */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-luma-primary-600 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-primary-600 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-primary-600 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-primary-600 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
          </div>
          <p className="luma-type-body-14 text-luma-text-600">Шаг 4 из 5</p>
        </div>

        {/* Header */}
        <div className="px-4 pb-6">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-2">Выберите пакет</h3>
          <p className="luma-type-body-14 text-luma-text-600">
            Каждый пакет включает разный уровень оптимизации и поддержки
          </p>
        </div>

        {/* Packages */}
        <div className="px-4 space-y-4">
          {packages.map((pkg) => {
            const isSelected = selectedPackage === pkg.id;
            
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-luma-primary-600 bg-luma-primary-50 scale-[1.02]'
                    : `${pkg.color} hover:scale-[1.01]`
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${
                        isSelected 
                          ? 'bg-luma-primary-600 text-white' 
                          : `${pkg.iconBg} ${pkg.iconColor}`
                      } flex items-center justify-center`}>
                        {pkg.icon}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="luma-type-title-16 text-luma-text-900">
                            {pkg.name}
                          </h4>
                          {pkg.recommended && (
                            <span className="px-2 py-0.5 bg-luma-primary-600 text-white rounded luma-type-micro-10">
                              РЕКОМЕНДУЕМ
                            </span>
                          )}
                        </div>
                        <p className="luma-type-body-14 text-luma-text-600">
                          {pkg.description}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-luma-primary-600 bg-luma-primary-600'
                          : 'border-luma-border-200 bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-luma-text-900">{pkg.price}</span>
                    <span className="luma-type-body-14 text-luma-text-600">сум за {pkg.duration}</span>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h5 className="luma-type-cap-12 text-luma-text-600 mb-3">ВКЛЮЧЕНО</h5>
                    <div className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="luma-type-body-14 text-luma-text-900">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Results */}
                  <div>
                    <h5 className="luma-type-cap-12 text-luma-text-600 mb-3">ОЖИДАЕМЫЕ РЕЗУЛЬТАТЫ</h5>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(pkg.metrics).map(([metric, value]) => (
                        <div key={metric} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                          <div className="w-6 h-6 bg-luma-bg-0 rounded flex items-center justify-center flex-shrink-0">
                            {getMetricIcon(metric)}
                          </div>
                          <div>
                            <p className="luma-type-micro-10 text-luma-text-600">{getMetricName(metric).toUpperCase()}</p>
                            <p className="luma-type-title-14 text-luma-text-900">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="px-4 pt-6">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="luma-type-title-14 text-orange-900 mb-1">
                  Важно знать
                </h4>
                <p className="luma-type-body-14 text-orange-800">
                  Прогноз основан на прошлых кампаниях и средних по категории. 
                  Фактические результаты могут отличаться в зависимости от качества 
                  контента, конкуренции и сезонности.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="px-4 pt-6">
          <h4 className="luma-type-title-14 text-luma-text-900 mb-4">Сравнение пакетов</h4>
          
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-luma-bg-0">
                    <th className="p-3 text-left luma-type-cap-12 text-luma-text-600">ФУНКЦИЯ</th>
                    <th className="p-3 text-center luma-type-cap-12 text-luma-text-600">LITE</th>
                    <th className="p-3 text-center luma-type-cap-12 text-luma-text-600">STANDARD</th>
                    <th className="p-3 text-center luma-type-cap-12 text-luma-text-600">PRO</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Оптимизация показов', lite: 'Базовая', standard: 'Умная', pro: 'AI-powered' },
                    { feature: 'Все места размещения', lite: '✗', standard: '✓', pro: '✓' },
                    { feature: 'A/B тестирование', lite: '✗', standard: '✗', pro: '✓' },
                    { feature: 'Персональный менеджер', lite: '✗', standard: '✗', pro: '✓' },
                    { feature: 'Приоритетные показы', lite: '✗', standard: '✗', pro: '✓' },
                  ].map((row, index) => (
                    <tr key={index} className="border-t border-luma-border-200">
                      <td className="p-3 luma-type-body-14 text-luma-text-900">{row.feature}</td>
                      <td className="p-3 text-center luma-type-body-14 text-luma-text-600">{row.lite}</td>
                      <td className="p-3 text-center luma-type-body-14 text-luma-text-600">{row.standard}</td>
                      <td className="p-3 text-center luma-type-body-14 text-luma-text-600">{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <button
          onClick={() => onNext({ package: selectedPackage })}
          className="w-full py-4 bg-luma-primary-600 text-white rounded-2xl luma-type-title-14 hover:bg-luma-primary-500 transition-colors"
        >
          Выбрать {packages.find(p => p.id === selectedPackage)?.name}
        </button>
      </div>
    </div>
  );
}