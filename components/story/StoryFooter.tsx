import React from 'react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  currency?: string;
  availableSizes?: string[];
}

interface StoryFooterProps {
  product?: Product;
  storeId: string;
  onAddToCart?: (productId: string) => void;
  onViewProduct?: (productId: string) => void;
  onViewStore?: (storeId: string) => void;
}

export function StoryFooter({
  product,
  storeId,
  onAddToCart,
  onViewProduct,
  onViewStore
}: StoryFooterProps) {
  if (!product) return null;

  return (
    <div className="absolute bottom-0 w-full px-4 py-6 bg-gradient-to-t from-purple-900/90 via-purple-800/70 to-transparent text-white">
      {/* Product Info */}
      <div className="mb-4">
        <h3 className="text-base font-semibold line-clamp-2 mb-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-lg">
          {product.name}
        </h3>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-lg">
            <p className="text-white font-bold text-lg">
              {product.price} {product.currency || 'сум'}
            </p>
          </div>
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-lg">
              <p className="text-white text-sm font-medium">
                Размеры: {product.availableSizes.join(', ')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Top row - View buttons */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="flex-1 bg-white/15 border border-white/30 text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm shadow-lg"
            onClick={() => onViewProduct?.(product.id)}
          >
            Смотреть товар
          </Button>
          <Button
            variant="ghost"
            className="flex-1 bg-white/15 border border-white/30 text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm shadow-lg"
            onClick={() => onViewStore?.(storeId)}
          >
            В магазин
          </Button>
        </div>

        {/* Bottom row - Add to cart */}
        <Button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => onAddToCart?.(product.id)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
}