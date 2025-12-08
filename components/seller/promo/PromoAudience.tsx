import React, { useState } from 'react';
import { SellerAppBar } from '../SellerAppBar';
import { Users, MapPin, Heart, ShoppingBag, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface PromoAudienceProps {
  onBack: () => void;
  onNext: (audience: any) => void;
}

export function PromoAudience({ onBack, onNext }: PromoAudienceProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('broad');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const [audience, setAudience] = useState({
    gender: 'all',
    ageMin: 18,
    ageMax: 65,
    interests: [] as string[],
    location: 'tashkent',
    radius: 25,
    remarketing: [] as string[]
  });

  const presets = [
    {
      id: 'broad',
      title: 'Широкая аудитория',
      description: 'Максимальный охват всех пользователей',
      icon: <Users className="w-5 h-5" />,
      reach: '120K',
      recommended: false
    },
    {
      id: 'lookalike',
      title: 'Похожие на покупателей',
      description: 'Пользователи, похожие на ваших клиентов',
      icon: <Heart className="w-5 h-5" />,
      reach: '45K',
      recommended: true
    },
    {
      id: 'followers',
      title: 'Только подписчики',
      description: 'Люди, которые подписаны на ваш магазин',
      icon: <ShoppingBag className="w-5 h-5" />,
      reach: '2.1K',
      recommended: false
    },
  ];

  const interests = [
    'Мода и стиль',
    'Красота',
    'Спорт и фитнес',
    'Путешествия',
    'Технологии',
    'Еда и кулинария',
    'Дом и интерьер',
    'Искусство',
  ];

  const remarketingOptions = [
    { id: 'viewed', label: 'Просмотревшие товары', count: '8.2K' },
    { id: 'added_cart', label: 'Добавлявшие в корзину', count: '1.5K' },
    { id: 'purchased', label: 'Покупавшие ранее', count: '890' },
  ];

  const toggleInterest = (interest: string) => {
    setAudience(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const toggleRemarketing = (option: string) => {
    setAudience(prev => ({
      ...prev,
      remarketing: prev.remarketing.includes(option)
        ? prev.remarketing.filter(r => r !== option)
        : [...prev.remarketing, option]
    }));
  };

  const handleNext = () => {
    onNext({
      preset: selectedPreset,
      ...audience
    });
  };

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Аудитория"
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
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
            <div className="flex-1 bg-luma-border-200 h-1 rounded-full"></div>
          </div>
          <p className="luma-type-body-14 text-luma-text-600">Шаг 3 из 5</p>
        </div>

        {/* Header */}
        <div className="px-4 pb-6">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-2">Кому показывать?</h3>
          <p className="luma-type-body-14 text-luma-text-600">
            Выберите готовый шаблон или настройте аудиторию детально
          </p>
        </div>

        {/* Presets */}
        <div className="px-4 pb-6">
          <h4 className="luma-type-title-14 text-luma-text-900 mb-4">Быстрые настройки</h4>
          <div className="space-y-3">
            {presets.map((preset) => {
              const isSelected = selectedPreset === preset.id;
              
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`w-full p-4 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? 'border-luma-primary-600 bg-luma-primary-50'
                      : 'border-luma-border-200 bg-luma-surface-0 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected 
                        ? 'bg-luma-primary-600 text-white' 
                        : 'bg-luma-bg-0 text-luma-primary-600'
                    }`}>
                      {preset.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="luma-type-title-14 text-luma-text-900">
                          {preset.title}
                        </h5>
                        {preset.recommended && (
                          <span className="px-2 py-0.5 bg-luma-primary-600 text-white rounded luma-type-micro-10">
                            РЕКОМЕНДУЕМ
                          </span>
                        )}
                      </div>
                      <p className="luma-type-body-14 text-luma-text-600 mb-1">
                        {preset.description}
                      </p>
                      <p className="luma-type-cap-12 text-luma-primary-600">
                        Охват: ~{preset.reach} пользователей
                      </p>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-luma-primary-600 bg-luma-primary-600'
                        : 'border-luma-border-200'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Settings Toggle */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-4 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="luma-type-title-14 text-luma-text-900">Расширенные настройки</h4>
                <p className="luma-type-body-14 text-luma-text-600">Детальная настройка параметров</p>
              </div>
            </div>
            {showAdvanced ? (
              <ChevronUp className="w-5 h-5 text-luma-text-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-luma-text-600" />
            )}
          </button>
        </div>

        {/* Advanced Settings */}
        {showAdvanced && (
          <div className="px-4 space-y-6">
            {/* Demographics */}
            <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
              <h4 className="luma-type-title-14 text-luma-text-900 mb-4">Демография</h4>
              
              {/* Gender */}
              <div className="mb-4">
                <label className="luma-type-cap-12 text-luma-text-600 mb-2 block">ПОЛ</label>
                <div className="flex gap-2">
                  {[
                    { id: 'all', label: 'Все' },
                    { id: 'male', label: 'Мужской' },
                    { id: 'female', label: 'Женский' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setAudience(prev => ({ ...prev, gender: option.id }))}
                      className={`px-4 py-2 rounded-xl luma-type-body-14 transition-colors ${
                        audience.gender === option.id
                          ? 'bg-luma-primary-600 text-white'
                          : 'bg-luma-bg-0 text-luma-text-600 border border-luma-border-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="luma-type-cap-12 text-luma-text-600 mb-2 block">ВОЗРАСТ</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="range"
                      min="13"
                      max="65"
                      value={audience.ageMin}
                      onChange={(e) => setAudience(prev => ({ ...prev, ageMin: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <p className="luma-type-body-14 text-luma-text-600 text-center mt-1">От {audience.ageMin}</p>
                  </div>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={audience.ageMax}
                      onChange={(e) => setAudience(prev => ({ ...prev, ageMax: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                    <p className="luma-type-body-14 text-luma-text-600 text-center mt-1">До {audience.ageMax}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
              <h4 className="luma-type-title-14 text-luma-text-900 mb-4">Геолокация</h4>
              
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-luma-primary-600" />
                <div>
                  <p className="luma-type-title-14 text-luma-text-900">Ташкент</p>
                  <p className="luma-type-body-14 text-luma-text-600">Радиус: {audience.radius} км</p>
                </div>
              </div>
              
              <input
                type="range"
                min="5"
                max="50"
                value={audience.radius}
                onChange={(e) => setAudience(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            {/* Interests */}
            <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
              <h4 className="luma-type-title-14 text-luma-text-900 mb-4">Интересы</h4>
              
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-2 rounded-xl luma-type-body-14 transition-colors ${
                      audience.interests.includes(interest)
                        ? 'bg-luma-primary-600 text-white'
                        : 'bg-luma-bg-0 text-luma-text-600 border border-luma-border-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Remarketing */}
            <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
              <h4 className="luma-type-title-14 text-luma-text-900 mb-4">Ремаркетинг</h4>
              
              <div className="space-y-3">
                {remarketingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleRemarketing(option.id)}
                    className={`w-full p-3 rounded-xl border transition-colors text-left ${
                      audience.remarketing.includes(option.id)
                        ? 'border-luma-primary-600 bg-luma-primary-50'
                        : 'border-luma-border-200 bg-luma-bg-0'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="luma-type-body-14 text-luma-text-900">{option.label}</span>
                      <span className="luma-type-cap-12 text-luma-text-600">{option.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audience Summary */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h4 className="luma-type-title-14 text-luma-text-900 mb-3">Размер аудитории</h4>
            
            <div className="text-center p-4 bg-luma-bg-0 rounded-xl">
              <p className="luma-type-micro-10 text-luma-text-600 mb-1">ПОТЕНЦИАЛЬНЫЙ ОХВАТ</p>
              <p className="text-2xl font-bold text-luma-primary-600 mb-1">
                {selectedPreset === 'broad' ? '120K' : 
                 selectedPreset === 'lookalike' ? '45K' : '2.1K'}
              </p>
              <p className="luma-type-body-14 text-luma-text-600">пользователей</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
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