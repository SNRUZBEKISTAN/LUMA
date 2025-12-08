import React from 'react';
import { X, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface StoryHeaderProps {
  storeName: string;
  storeAvatar: string;
  storeId: string;
  likes?: number;
  orders?: number;
  onClose: () => void;
  onStoreClick: (storeId: string) => void;
}

export function StoryHeader({ 
  storeName, 
  storeAvatar, 
  storeId, 
  likes = 0,
  orders = 0,
  onClose, 
  onStoreClick 
}: StoryHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-purple-600/70 via-purple-700/50 via-pink-600/30 to-transparent backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Store Info - clickable */}
        <button 
          onClick={() => onStoreClick(storeId)}
          className="flex items-center gap-3 hover:opacity-80 transition-all duration-200 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 hover:bg-white/20 border border-white/20"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white/40 shadow-lg">
            <ImageWithFallback
              src={storeAvatar}
              alt={storeName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-semibold text-sm drop-shadow-lg">
            {storeName}
          </span>
        </button>
        
        {/* Product Stats */}
        <div className="flex items-center gap-2">
          {/* Likes */}
          <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
            <Heart className="w-3 h-3 text-pink-300 fill-pink-300" />
            <span className="text-white text-xs font-medium">{likes}</span>
          </div>
          
          {/* Orders */}
          <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
            <ShoppingBag className="w-3 h-3 text-purple-300" />
            <span className="text-white text-xs font-medium">{orders}</span>
          </div>
        </div>
      </div>
      
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="text-white hover:bg-white/20 w-10 h-10 rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200 shadow-lg border border-white/20"
      >
        <X className="w-6 h-6 drop-shadow-lg" />
      </Button>
    </div>
  );
}