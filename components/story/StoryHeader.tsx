import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface StoryHeaderProps {
  storeName: string;
  storeAvatar: string;
  storeId: string;
  isFollowing?: boolean;
  onClose: () => void;
  onStoreClick: (storeId: string) => void;
  onFollow?: (storeId: string) => void;
}

export function StoryHeader({ 
  storeName, 
  storeAvatar, 
  storeId,
  isFollowing = false,
  onClose, 
  onStoreClick,
  onFollow
}: StoryHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Store Avatar */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onStoreClick(storeId);
          }}
          className="flex items-center gap-0 shrink-0"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 shadow-lg">
            <ImageWithFallback
              src={storeAvatar}
              alt={storeName}
              className="w-full h-full object-cover"
            />
          </div>
        </button>
        
        {/* Store Name */}
        <h2 className="text-white font-bold leading-tight tracking-tight" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
          {storeName}
        </h2>

        {/* Follow Button */}
        {onFollow && !isFollowing && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onFollow(storeId);
            }}
            className="min-w-[84px] h-8 px-4 bg-white/90 hover:bg-white text-black font-bold rounded-full backdrop-blur-lg transition-all duration-200"
          >
            Follow
          </Button>
        )}
      </div>
      
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation(); // Prevent tap zones from interfering
          onClose();
        }}
        className="h-10 w-10 rounded-full bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm transition-all duration-200 shrink-0"
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  );
}