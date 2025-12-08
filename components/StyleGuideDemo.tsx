import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCardSmall } from './ProductCardSmall';
import { ProductCardMedium } from './ProductCardMedium';
import { SizePicker } from './SizePicker';

interface StyleGuideDemoProps {
  onBack: () => void;
}

export function StyleGuideDemo({ onBack }: StyleGuideDemoProps) {
  const [showSizePicker, setShowSizePicker] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState<string>('');

  const sampleProducts = [
    {
      id: '1',
      title: 'Вечернее платье миди',
      price: 420000,
      originalPrice: 600000,
      image: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=400',
      discount: '30%',
      storeName: 'ZARA'
    },
    {
      id: '2',
      title: 'Кожаные ботинки челси',
      price: 350000,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
      isHit: true,
      storeName: 'H&M'
    },
    {
      id: '3',
      title: 'Джинсы slim fit',
      price: 180000,
      originalPrice: 220000,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
      discount: '18%',
      storeName: 'Levi\'s'
    }
  ];

  const mediumProducts = [
    {
      id: '4',
      title: 'Кашемировый свитер с воротником',
      price: 580000,
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400',
      storeName: 'Mango'
    },
    {
      id: '5',
      title: 'Трендовая куртка-бомбер оверсайз',
      price: 420000,
      originalPrice: 520000,
      image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=400',
      storeName: 'Zara',
      discount: '19%'
    }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'One size'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-8 h-8 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-bold text-lg">LUMA Style Guide</h1>
            <p className="text-sm text-gray-500">Компоненты согласно гайдлайнам</p>
          </div>
        </div>
      </div>

      <div className="container-responsive pb-8">
        {/* Typography Section */}
        <div className="section-spacing bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C2D33] mb-4">Типографика</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Название товара - 14px Medium #2C2D33</p>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#2C2D33' }}>
                Название товара
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Цена текущая - 16px Semibold #2C2D33</p>
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#2C2D33' }}>
                420 000 ₽
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Цена до скидки - 14px Regular #A0A0A0 line-through</p>
              <p style={{ fontSize: '14px', fontWeight: 400, color: '#A0A0A0', textDecoration: 'line-through' }}>
                600 000 ₽
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Метка скидки/хита - 12px Bold белый на цветном фоне</p>
              <div className="flex gap-2">
                <span 
                  style={{ 
                    fontSize: '12px', 
                    fontWeight: 'bold', 
                    color: 'white',
                    backgroundColor: '#FF6D9D',
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}
                >
                  -30%
                </span>
                <span 
                  style={{ 
                    fontSize: '12px', 
                    fontWeight: 'bold', 
                    color: 'white',
                    backgroundColor: '#FFB366',
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}
                >
                  ХИТ
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing Section */}
        <div className="section-spacing bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C2D33] mb-4">Отступы и размеры</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Между карточками:</span>
              <span className="font-mono">12px</span>
            </div>
            <div className="flex justify-between">
              <span>Между секциями:</span>
              <span className="font-mono">24px</span>
            </div>
            <div className="flex justify-between">
              <span>Внутри карточек:</span>
              <span className="font-mono">8px</span>
            </div>
            <div className="flex justify-between">
              <span>Padding container (mobile):</span>
              <span className="font-mono">16px</span>
            </div>
            <div className="flex justify-between">
              <span>Padding container (desktop):</span>
              <span className="font-mono">24px</span>
            </div>
          </div>
        </div>

        {/* Small Cards Section - 3 в ряд, горизонтальная прокрутка */}
        <div className="section-spacing bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C2D33] mb-4">ProductCardSmall - 3 по горизонтали</h2>
          <p className="text-sm text-gray-600 mb-4">
            Для секций: Хиты, Скидки, Товары магазина. Размер: 120px × auto
          </p>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex card-spacing" style={{ width: 'max-content' }}>
              {sampleProducts.map((product) => (
                <ProductCardSmall
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  discount={product.discount}
                  isHit={product.isHit}
                  onProductClick={(id) => console.log('Product clicked:', id)}
                  onLikeToggle={(id) => console.log('Like toggled:', id)}
                  onCartToggle={(id) => console.log('Cart toggled:', id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Medium Cards Section - 2 в ряд */}
        <div className="section-spacing bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C2D33] mb-4">ProductCardMedium - 2 в ряд</h2>
          <p className="text-sm text-gray-600 mb-4">
            Для секций: Популярные, Рекомендации, Похожие товары. Min-height: 220px
          </p>
          <div className="grid grid-cols-2 card-spacing">
            {mediumProducts.map((product) => (
              <ProductCardMedium
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                storeName={product.storeName}
                discount={product.discount}
                onProductClick={(id) => console.log('Product clicked:', id)}
                onLikeToggle={(id) => console.log('Like toggled:', id)}
                onCartToggle={(id) => console.log('Cart toggled:', id)}
                onStoreClick={(id) => console.log('Store clicked:', id)}
              />
            ))}
          </div>
        </div>

        {/* Cart Button States */}
        <div className="section-spacing bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C2D33] mb-4">Состояния кнопки корзины</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                🛒
              </div>
              <span>Изначально: прозрачная иконка корзины, фон rgba(0,0,0,0.05)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#55C2A1] rounded-full flex items-center justify-center text-white">
                ✅
              </div>
              <span>Первый клик: зеленый фон #55C2A1, иконка галочки</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF5C5C] rounded-full flex items-center justify-center text-white animate-pulse">
                🗑️
              </div>
              <span>Второй клик: красный фон #FF5C5C, анимация мигания</span>
            </div>
          </div>
        </div>

        {/* Size Picker Demo */}
        <div className="section-spacing bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C2D33] mb-4">Size Picker</h2>
          <p className="text-sm text-gray-600 mb-4">
            Компактный горизонтальный скроллер, высота ~120px
          </p>
          <Button
            onClick={() => setShowSizePicker(true)}
            className="bg-[#A260EF] hover:bg-[#A260EF]/90 text-white"
          >
            {selectedSize ? `Размер: ${selectedSize}` : 'Выбрать размер'}
          </Button>
          
          <SizePicker
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
            isOpen={showSizePicker}
            onClose={() => setShowSizePicker(false)}
          />
        </div>

        {/* Color Scheme */}
        <div className="section-spacing bg-white rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#2C2D33] mb-4">Цветовая схема</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Основные цвета</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#A260EF] rounded"></div>
                  <span className="text-sm">#A260EF - Фиолетовый</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF6D9D] rounded"></div>
                  <span className="text-sm">#FF6D9D - Розовый</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#55C2A1] rounded"></div>
                  <span className="text-sm">#55C2A1 - Успех</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Специальные цвета</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E53E3E] rounded"></div>
                  <span className="text-sm">#E53E3E - Скидки</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FFB366] rounded"></div>
                  <span className="text-sm">#FFB366 - Хиты</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2C2D33] rounded"></div>
                  <span className="text-sm">#2C2D33 - Текст</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}