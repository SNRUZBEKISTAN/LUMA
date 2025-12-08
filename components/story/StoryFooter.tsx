import React from 'react';
import { Button } from '../ui/button';
import { Heart, Share2, ShoppingBag } from 'lucide-react';

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
  isLiked?: boolean;
  onAddToCart?: (productId: string) => void;
  onViewProduct?: (productId: string) => void;
  onViewStore?: (storeId: string) => void;
  onLike?: () => void;
  onShare?: () => void;
}

export function StoryFooter({
  product,
  storeId,
  isLiked = false,
  onAddToCart,
  onViewProduct,
  onViewStore,
  onLike,
  onShare
}: StoryFooterProps) {
  return (
    <div className="space-y-4 relative z-20">
      {/* Product Tag */}
      {product && (
        <div className="flex justify-start pb-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onViewProduct?.(product.id);
            }}
            className="min-w-[84px] h-10 px-4 bg-black/30 hover:bg-black/40 text-white rounded-full backdrop-blur-md shadow-lg border border-white/20 transition-all duration-200"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            <span className="truncate">View Product</span>
          </Button>
        </div>
      )}

      {/* Bottom Actions Bar */}
      <div className="bg-black/20 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex p-2 items-center justify-between">
          {/* Left side - Action buttons */}
          <div className="flex items-center gap-2">
            {/* Like Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className="flex flex-col items-center justify-center w-20 rounded-full p-3 hover:bg-white/10 transition-colors duration-200"
            >
              <Heart 
                className={`w-6 h-6 transition-all duration-200 ${
                  isLiked 
                    ? 'fill-pink-500 text-pink-500 scale-110' 
                    : 'text-white'
                }`} 
              />
            </button>

            {/* Share Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare?.();
              }}
              className="flex flex-col items-center justify-center w-20 rounded-full p-3 hover:bg-white/10 transition-colors duration-200"
            >
              <Share2 className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Right side - Shop Now button */}
          <div className="px-4">
            {product ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product.id);
                }}
                className="min-w-[84px] h-12 px-6 bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:from-[#9550DD] hover:to-[#EE5C8C] text-white font-bold rounded-full shadow-lg transition-all duration-200"
                style={{ boxShadow: '0 4px 20px rgba(162, 96, 239, 0.3)' }}
              >
                <span className="truncate">Shop Now</span>
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewStore?.(storeId);
                }}
                className="min-w-[84px] h-12 px-6 bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:from-[#9550DD] hover:to-[#EE5C8C] text-white font-bold rounded-full shadow-lg transition-all duration-200"
                style={{ boxShadow: '0 4px 20px rgba(162, 96, 239, 0.3)' }}
              >
                <span className="truncate">Visit Store</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}