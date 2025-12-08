import React, { useState } from 'react';
import { ShoppingCart, Heart, RefreshCw, Palette, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LookItem {
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
}

interface Look {
  id: string;
  title: string;
  tags: string[];
  items: LookItem[];
  totalPrice: number;
  coverImage: string;
}

interface AILookCardProps {
  look: Look;
  compact?: boolean;
  onAddToCart?: (lookId: string) => void;
  onItemClick?: (item: LookItem) => void;
  onModifyLook?: (lookId: string, action: string) => void;
  onSelect?: (lookId: string) => void;
}

export function AILookCard({ 
  look, 
  compact = false,
  onAddToCart, 
  onItemClick, 
  onModifyLook,
  onSelect 
}: AILookCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(look.id);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(look.id);
    }
  };

  const handleItemClick = (item: LookItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleModifyAction = (action: string) => {
    if (onModifyLook) {
      onModifyLook(look.id, action);
    }
  };

  if (compact) {
    return (
      <div className={`bg-white rounded-xl shadow-ai-card border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'shadow-lg scale-[1.02]' : ''
      }`}>
        {/* Cover Image */}
        <div className="relative aspect-[4/5] bg-gray-100">
          <ImageWithFallback
            src={look.coverImage}
            alt={look.title}
            className="w-full h-full object-cover"
          />
          
          {/* AI Badge */}
          <div className="absolute top-2 left-2">
            <Badge className="bg-black/20 backdrop-blur-sm text-white border-0 text-xs px-1.5 py-0.5">
              ✨ AI
            </Badge>
          </div>
          
          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <Heart className="w-3 h-3" />
          </Button>

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white transition-transform duration-300"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
          </Button>
        </div>

        {/* Compact Content */}
        <div className="p-3 space-y-2">
          {/* Title */}
          <h3 className="font-semibold text-sm text-ai-primary line-clamp-2 leading-tight">
            {look.title}
          </h3>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {look.tags.slice(0, 2).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 text-ai-secondary px-1.5 py-0.5"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Price and Add Button */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="text-xs text-ai-secondary">Итого</p>
              <p className="font-semibold text-sm text-ai-primary">
                {look.totalPrice.toLocaleString()} сум
              </p>
            </div>
            
            <Button
              onClick={handleSelect}
              size="sm"
              className="magic-callout text-white font-medium px-2 py-1 rounded-lg h-auto text-xs"
            >
              Выбрать
            </Button>
          </div>

          {/* Expanded Details */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <h4 className="text-xs font-medium text-ai-primary">
                Состав ({look.items.length} вещей)
              </h4>
              
              <div className="space-y-1">
                {look.items.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Item Image */}
                    <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-ai-primary truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-ai-secondary">
                        {item.price.toLocaleString()} сум
                      </p>
                    </div>
                  </div>
                ))}
                
                {look.items.length > 3 && (
                  <p className="text-xs text-ai-secondary text-center py-1">
                    +{look.items.length - 3} ещё
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-ai-secondary text-center pt-1">
            AI-подбор. Проверяй размеры
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-ai-card border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
      isExpanded ? 'shadow-lg scale-[1.01]' : ''
    }`}>
      {/* Cover Image */}
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
        
        {/* Like Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Heart className="w-4 h-4" />
        </Button>

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white transition-transform duration-300"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-ai-primary line-clamp-2">
            {look.title}
          </h3>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {look.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 text-ai-secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-ai-primary">
              Состав ({look.items.length} вещей)
            </h4>
            
            <div className="space-y-2">
              {look.items.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleItemClick(item)}
                >
                  {/* Item Image */}
                  <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ai-primary truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-ai-secondary">
                      <span>{item.price.toLocaleString()} сум</span>
                      {item.size && (
                        <>
                          <span>•</span>
                          <span>{item.size}</span>
                        </>
                      )}
                      {item.color && (
                        <>
                          <span>•</span>
                          <span>{item.color}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      className="text-ai-secondary"
                    >
                      <path 
                        d="M6 4L10 8L6 12" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
              
              {look.items.length > 5 && (
                <p className="text-xs text-ai-secondary text-center py-1">
                  +{look.items.length - 5} ещё
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <div>
            <p className="text-sm text-ai-secondary">Итого сет</p>
            <p className="font-semibold text-lg text-ai-primary">
              {look.totalPrice.toLocaleString()} сум
            </p>
          </div>
          
          <Button
            onClick={handleSelect}
            className="magic-callout text-white font-medium px-4 py-2 rounded-xl"
          >
            Выбрать
          </Button>
        </div>

        {/* Quick Actions */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleModifyAction('change-color')}
                className="text-xs text-ai-secondary hover:text-ai-primary"
              >
                <Palette className="w-3 h-3 mr-1" />
                Сменить цвет
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleModifyAction('change-shoes')}
                className="text-xs text-ai-secondary hover:text-ai-primary"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Заменить обувь
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleModifyAction('similar')}
              className="text-xs text-ai-secondary hover:text-ai-primary"
            >
              <MoreHorizontal className="w-3 h-3 mr-1" />
              Похожие
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pt-2">
          <p className="text-xs text-ai-secondary text-center">
            AI-подбор. Проверяй размеры перед оформлением
          </p>
        </div>
      </div>
    </div>
  );
}

export default AILookCard;