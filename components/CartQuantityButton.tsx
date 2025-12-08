import React from 'react';
import { Button } from './ui/button';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface CartQuantityButtonProps {
  productId: string;
  storeId: string;
  currentQuantity: number;
  disabled?: boolean;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export function CartQuantityButton({
  productId,
  storeId,
  currentQuantity,
  disabled = false,
  onAdd,
  onIncrease,
  onDecrease,
  className = ''
}: CartQuantityButtonProps) {
  
  if (currentQuantity === 0) {
    // Показываем кнопку добавления в корзину
    return (
      <Button
        onClick={onAdd}
        variant="outline"
        disabled={disabled}
        className={`border-luma-primary-600 text-luma-primary-600 hover:bg-luma-primary-600 hover:text-white rounded-luma transition-colors ${className}`}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        В корзину
      </Button>
    );
  }

  // Показываем контроллер количества
  return (
    <div className={`flex items-center rounded-luma border-2 border-luma-primary-600 bg-white overflow-hidden ${className}`}>
      <Button
        onClick={onDecrease}
        variant="ghost"
        size="icon"
        disabled={disabled}
        className="h-10 w-10 rounded-none hover:bg-luma-primary-600 hover:text-white border-0 text-luma-primary-600"
      >
        <Minus className="w-4 h-4" />
      </Button>
      
      <div className="flex items-center justify-center min-w-[40px] h-10 px-2 text-sm font-medium text-luma-primary-600 bg-luma-primary-600/5">
        {currentQuantity}
      </div>
      
      <Button
        onClick={onIncrease}
        variant="ghost"
        size="icon"
        disabled={disabled}
        className="h-10 w-10 rounded-none hover:bg-luma-primary-600 hover:text-white border-0 text-luma-primary-600"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}