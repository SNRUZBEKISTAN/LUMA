import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PriceTag } from './PriceTag';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Share, 
  Heart, 
  Star, 
  Store,
  ShoppingCart,
  Plus,
  Minus,
  ChevronRight,
  Sparkles,
  Eye,
  Clock,
  Check
} from 'lucide-react';
import { AppState, AppActions, Product, Look } from '../types/app';

interface LookDetailScreenV2Props {
  lookId: string;
  state: AppState;
  actions: AppActions;
  onBack: () => void;
}

interface ProductSelection {
  productId: string;
  selectedSize?: string;
  selectedColor?: any;
  quantity: number;
}

export function LookDetailScreenV2({ lookId, state, actions, onBack }: LookDetailScreenV2Props) {
  // Ищем образ по ID (сначала в реальных, потом в примерах)
  const look = state.looks.find(l => l.id === lookId) || createExampleLook(lookId);
  
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productSelections, setProductSelections] = useState<ProductSelection[]>([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (!look) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Образ не найден</h3>
          <Button onClick={onBack} variant="outline">
            Вернуться назад
          </Button>
        </div>
      </div>
    );
  }

  // Получаем товары для образа
  const lookProducts = look.items.map(item => {
    const product = state.products.find(p => p.id === item.productId);
    return {
      lookItem: item,
      product: product
    };
  }).filter(item => item.product);

  // Инициализируем выборы товаров
  React.useEffect(() => {
    if (productSelections.length === 0 && lookProducts.length > 0) {
      const initialSelections = lookProducts.map(({ product }) => ({
        productId: product!.id,
        selectedSize: product!.attributes?.sizes?.[0]?.size,
        selectedColor: product!.attributes?.colors?.[0],
        quantity: 1
      }));
      setProductSelections(initialSelections);
    }
  }, [lookProducts, productSelections.length]);

  const updateProductSelection = (productId: string, updates: Partial<ProductSelection>) => {
    setProductSelections(prev => 
      prev.map(selection => 
        selection.productId === productId 
          ? { ...selection, ...updates }
          : selection
      )
    );
  };

  const getProductSelection = (productId: string): ProductSelection | undefined => {
    return productSelections.find(s => s.productId === productId);
  };

  const handleAddAllToCart = async () => {
    setIsAddingToCart(true);
    
    try {
      for (const selection of productSelections) {
        const product = state.products.find(p => p.id === selection.productId);
        if (product && selection.quantity > 0) {
          const productForCart = {
            ...product,
            selectedSize: selection.selectedSize,
            color: selection.selectedColor
          };
          
          actions.addToCart(productForCart, selection.quantity);
        }
      }
      
      // Показываем успешное добавление
      setTimeout(() => {
        setIsAddingToCart(false);
        // Можно добавить toast уведомление
      }, 1000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const getTotalPrice = () => {
    return productSelections.reduce((total, selection) => {
      const product = state.products.find(p => p.id === selection.productId);
      return total + (product ? product.price * selection.quantity : 0);
    }, 0);
  };

  const allImages = React.useMemo(() => {
    const images = [look.coverImage];
    if (look.images && look.images.length > 0) {
      images.push(...look.images);
    }
    return images;
  }, [look.coverImage, look.images]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-medium text-lg text-gray-900 flex-1 text-center px-4">
            {look.title}
          </h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10"
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Look Image */}
      <div className="bg-white">
        <div className="aspect-square relative">
          <ImageWithFallback
            src={allImages[currentImageIndex]}
            alt={look.title}
            className="w-full h-full object-cover"
          />
          
          {/* Image indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {allImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* AI Badge */}
          {look.type === 'ai' && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                ИИ образ
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Look Info */}
      <div className="bg-white px-4 py-4 border-b">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{look.title}</h2>
            {look.prompt && (
              <p className="text-sm text-gray-600 mb-2">"{look.prompt}"</p>
            )}
          </div>
          <div className="text-right">
            <PriceTag
              price={getTotalPrice()}
              variant="prominent"
              size="lg"
            />
          </div>
        </div>

        {/* Tags */}
        {look.style && (
          <div className="flex flex-wrap gap-2">
            {look.style.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Products List */}
      <div className="bg-white">
        <div className="px-4 py-4 border-b">
          <h3 className="font-semibold text-gray-900 mb-1">
            Товары в образе ({lookProducts.length})
          </h3>
          <p className="text-sm text-gray-600">
            Выберите размер и цвет для каждого товара
          </p>
        </div>

        <div className="space-y-4 px-4 pb-4">
          {lookProducts.map(({ lookItem, product }, index) => {
            if (!product) return null;
            
            const selection = getProductSelection(product.id);
            if (!selection) return null;

            const handleProductClick = () => {
              actions.setSelectedProductId(product.id);
              actions.setCurrentScreen('productDetail');
            };

            return (
              <div key={product.id} className="bg-gray-50 rounded-xl p-4">
                {/* Product Header - Clickable */}
                <div 
                  className="flex items-center space-x-3 mb-3 cursor-pointer group hover:bg-white/50 -m-2 p-2 rounded-lg transition-colors"
                  onClick={handleProductClick}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                    <ImageWithFallback
                      src={product.media?.[0]?.url || product.image || ''}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600">{product.storeName}</p>
                    <PriceTag price={product.price} size="sm" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {index + 1}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>

                {/* Size Selection */}
                {product.attributes?.sizes && product.attributes.sizes.length > 0 && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Размер
                    </label>
                    <Select 
                      value={selection.selectedSize || ''} 
                      onValueChange={(value) => updateProductSelection(product.id, { selectedSize: value })}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Выберите размер" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.attributes.sizes.map((sizeOption) => (
                          <SelectItem key={sizeOption.size} value={sizeOption.size}>
                            {sizeOption.size} {sizeOption.stock <= 5 && sizeOption.stock > 0 && (
                              <span className="text-orange-500 text-xs">(осталось {sizeOption.stock})</span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Color Selection */}
                {product.attributes?.colors && product.attributes.colors.length > 0 && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Цвет
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.attributes.colors.map((colorOption, colorIndex) => (
                        <button
                          key={colorIndex}
                          onClick={() => updateProductSelection(product.id, { selectedColor: colorOption })}
                          className={`w-8 h-8 rounded-full border-2 ${
                            JSON.stringify(selection.selectedColor) === JSON.stringify(colorOption)
                              ? 'border-purple-500 ring-2 ring-purple-200'
                              : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: colorOption.hex }}
                          title={colorOption.name}
                        >
                          {JSON.stringify(selection.selectedColor) === JSON.stringify(colorOption) && (
                            <Check className="w-4 h-4 text-white mx-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Количество</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => 
                        updateProductSelection(product.id, { 
                          quantity: Math.max(0, selection.quantity - 1) 
                        })
                      }
                      disabled={selection.quantity <= 0}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    
                    <span className="font-semibold text-lg w-8 text-center">
                      {selection.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => 
                        updateProductSelection(product.id, { 
                          quantity: selection.quantity + 1 
                        })
                      }
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 safe-area-bottom">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Общая стоимость:</span>
          <span className="text-xl font-bold text-gray-900">
            {getTotalPrice().toLocaleString('ru-RU')} сум
          </span>
        </div>
        
        <Button
          onClick={handleAddAllToCart}
          disabled={isAddingToCart || productSelections.every(s => s.quantity === 0)}
          className="w-full h-12 magic-callout text-white font-medium"
        >
          {isAddingToCart ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Добавляем в корзину...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Добавить всё в корзину
            </div>
          )}
        </Button>
      </div>

      {/* Bottom spacer */}
      <div className="h-32" />
    </div>
  );
}

// Функция для создания образа из примера
function createExampleLook(lookId: string): Look | null {
  // Популярные промпты из AILookScreenV2
  const popularPrompts = [
    {
      id: 'example-1',
      title: "Элегантный офисный образ",
      prompt: "Создай стильный business casual look в нейтральных тонах для деловой встречи, бюджет до 2 млн сум",
      coverImage: "https://images.unsplash.com/photo-1696453423411-3fc7847a9611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhc3VhbCUyMHdvbWFuJTIwZWxlZ2FudCUyMG9mZmljZXxlbnwxfHx8fDE3NTk2NzgyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 4,
      price: 1850000,
      style: ['business', 'elegant', 'casual']
    },
    {
      id: 'example-2',
      title: "Романтичный вечерний стиль",
      prompt: "Нежный романтичный образ для свидания в ресторане, пастельные тона, женственные силуэты",
      coverImage: "https://images.unsplash.com/photo-1671691302268-e316f81c7b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb21hbnRpYyUyMGV2ZW5pbmclMjBkcmVzcyUyMHdvbWFuJTIwZGlubmVyfGVufDF8fHx8MTc1OTY3ODIyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 3,
      price: 1200000,
      style: ['romantic', 'evening', 'feminine']
    },
    {
      id: 'example-3',
      title: "Дерзкий streetwear look",
      prompt: "Современный уличный стиль с яркими акцентами, кроссовки, oversized худи, молодежный вайб",
      coverImage: "https://images.unsplash.com/photo-1581450369508-5f29e761d9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwdXJiYW4lMjBzdHlsZSUyMGhvb2RpZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc1OTY3ODIzMnww&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 5,
      price: 950000,
      style: ['streetwear', 'urban', 'casual']
    },
    {
      id: 'example-4',
      title: "Минималистичный casual",
      prompt: "Комфортный повседневный образ в стиле минимализм, базовые цвета, качественные материалы",
      coverImage: "https://images.unsplash.com/photo-1759346617240-b45ed956868e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pbWFsaXN0JTIwY2FzdWFsJTIwY2xvdGhpbmclMjBiYXNpY3xlbnwxfHx8fDE3NTk2NzgyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      itemCount: 3,
      price: 1450000,
      style: ['minimalist', 'casual', 'basic']
    },
    {
      id: 'example-5',
      title: "Гламурный party look",
      prompt: "Яркий образ для ночной вечеринки, блестки, смелые цвета, высокие каблуки, statement украшения",
      coverImage: "https://images.unsplash.com/photo-1759349394750-f85f5c3fc4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGRyZXNzJTIwZ2xhbW91ciUyMG91dGZpdHxlbnwxfHx8fDE3NTk2ODg0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      itemCount: 4,
      price: 2100000,
      style: ['glamour', 'party', 'evening']
    }
  ];

  const example = popularPrompts.find(p => p.id === lookId);
  if (!example) return null;

  // Создаем mock образ с несколькими товарами
  const mockProducts = [
    'product-1', 'product-2', 'product-3', 'product-4'
  ].slice(0, example.itemCount);

  return {
    id: lookId,
    title: example.title,
    prompt: example.prompt,
    type: 'ai',
    style: example.style,
    occasion: ['work'],
    createdAt: new Date().toISOString(),
    coverImage: example.coverImage,
    totalPrice: example.price,
    confidence: 0.85,
    items: mockProducts.map((productId, index) => ({
      id: `${lookId}-item-${index}`,
      productId,
      position: { x: 0, y: 0 },
      category: 'clothing'
    }))
  };
}