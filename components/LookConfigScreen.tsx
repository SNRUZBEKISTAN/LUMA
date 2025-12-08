import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface LookItem {
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  availableSizes: string[];
  storeName?: string;
}

interface Look {
  id: string;
  title: string;
  tags: string[];
  items: LookItem[];
  totalPrice: number;
  coverImage: string;
}

interface LookConfigScreenProps {
  look: Look;
  onBack: () => void;
  onAddToCart?: (lookId: string, selectedSizes: { [itemIndex: number]: string }) => void;
}

export function LookConfigScreen({ look, onBack, onAddToCart }: LookConfigScreenProps) {
  const [selectedSizes, setSelectedSizes] = useState<{ [itemIndex: number]: string }>({});
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleSizeSelect = (itemIndex: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemIndex]: size
    }));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onAddToCart) {
      onAddToCart(look.id, selectedSizes);
    }
    
    setIsAddingToCart(false);
    
    // Show success toast
    toast.success("Образ добавлен в корзину!", {
      description: "Перейдите в корзину для оформления заказа",
      action: {
        label: "Перейти в корзину",
        onClick: () => onBack()
      }
    });
  };

  const allSizesSelected = look.items.every((_, index) => selectedSizes[index]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-8 h-8 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="text-center">
            <h1 className="font-semibold text-lg">Настрой образ</h1>
            <p className="text-xs text-gray-500">Выбери свой размер и добавь образ в корзину</p>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="pb-24">
        {/* Look Preview */}
        <div className="bg-white mx-4 my-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative aspect-[4/5] bg-gray-100">
            <ImageWithFallback
              src={look.coverImage}
              alt={look.title}
              className="w-full h-full object-cover"
            />
            
            {/* AI Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-black/20 backdrop-blur-sm text-white border-0 text-xs px-2 py-1">
                ✨ AI-подбор
              </Badge>
            </div>
          </div>
          
          <div className="p-4">
            <h2 className="font-semibold text-lg mb-2">{look.title}</h2>
            <div className="flex flex-wrap gap-1.5">
              {look.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-gray-100 text-gray-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Items Configuration */}
        <div className="mx-4 space-y-3">
          {look.items.map((item, index) => (
            <div key={index} className="bg-[#FAFAFA] rounded-2xl border border-[#E6E7EB] p-4">
              <div className="flex gap-3">
                {/* Item Image */}
                <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Item Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <h4 className="font-bold text-base text-[#2C2D33] leading-tight">{item.name}</h4>
                    {item.storeName && (
                      <p className="text-xs text-[#6E6E6E] mt-1">{item.storeName}</p>
                    )}
                    <p className="font-semibold text-[#2C2D33] mt-1">{item.price.toLocaleString()} сум</p>
                  </div>
                  
                  {/* Size Selection */}
                  <div className="space-y-1">
                    <Select
                      value={selectedSizes[index] || ''}
                      onValueChange={(size) => handleSizeSelect(index, size)}
                    >
                      <SelectTrigger className={`w-full h-10 rounded-lg border-2 ${!selectedSizes[index] ? 'border-orange-200' : 'border-green-200'}`}>
                        <SelectValue placeholder="Выберите размер" />
                      </SelectTrigger>
                      <SelectContent>
                        {item.availableSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            <div className="flex items-center gap-2">
                              <span>{size}</span>
                              {selectedSizes[index] === size && (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                          </SelectItem>
                        ))}
                        <SelectItem value="CUSTOM">
                          <div className="flex items-center gap-2">
                            <span>Не знаю размер — подберем позже</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Error State */}
                    {!selectedSizes[index] && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-600">Пожалуйста, выберите размер</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mx-4 mt-6">
          <p className="text-xs text-gray-500 text-center">
            AI-подбор основан на алгоритмах. Проверяйте соответствие размеров перед оформлением заказа.
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 space-y-3">
        {/* Total Summary */}
        <div className="text-center">
          <p className="text-sm text-gray-600">Итого: {look.totalPrice.toLocaleString()} сум</p>
        </div>
        
        <Button
          onClick={handleAddToCart}
          disabled={!allSizesSelected || isAddingToCart}
          className={`w-full font-semibold py-3 rounded-xl text-base transition-all duration-200 ${
            !allSizesSelected || isAddingToCart 
              ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500' 
              : 'bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] text-white hover:shadow-lg hover:scale-[1.02]'
          }`}
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Добавляем...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Добавить образ в корзину
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}

export default LookConfigScreen;