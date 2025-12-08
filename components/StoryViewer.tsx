import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { X, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface LegacyStoryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  durationMs?: number;
  productId?: string;
  caption?: string;
}

export interface LegacyStoreStories {
  storeId: string;
  storeName: string;
  avatar: string;
  items: LegacyStoryItem[];
}

interface LegacyStoryViewerProps {
  stories: LegacyStoreStories[];
  initialStoreIndex?: number;
  initialItemIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onProductClick?: (productId: string) => void;
  onStoreClick?: (storeId: string) => void;
}

export function LegacyStoryViewer({
  stories,
  initialStoreIndex = 0,
  initialItemIndex = 0,
  isOpen,
  onClose,
  onProductClick,
  onStoreClick
}: LegacyStoryViewerProps) {
  const [storeIndex, setStoreIndex] = useState(initialStoreIndex);
  const [itemIndex, setItemIndex] = useState(initialItemIndex);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(0);

  const currentStore = stories[storeIndex];
  const currentItem = currentStore?.items[itemIndex];
  const duration = currentItem?.durationMs || 5000;

  // Auto-advance logic
  const nextItem = () => {
    if (itemIndex < currentStore.items.length - 1) {
      setItemIndex(itemIndex + 1);
    } else if (storeIndex < stories.length - 1) {
      setStoreIndex(storeIndex + 1);
      setItemIndex(0);
    } else {
      onClose();
    }
    setProgress(0);
  };

  const prevItem = () => {
    if (itemIndex > 0) {
      setItemIndex(itemIndex - 1);
    } else if (storeIndex > 0) {
      const prevStore = stories[storeIndex - 1];
      setStoreIndex(storeIndex - 1);
      setItemIndex(prevStore.items.length - 1);
    }
    setProgress(0);
  };

  // Progress animation
  useEffect(() => {
    if (!isOpen || paused || !currentItem) return;

    startTimeRef.current = Date.now();
    setProgress(0);

    // Main timer for advancing
    timeoutRef.current = setTimeout(nextItem, duration);

    // Progress bar animation
    const updateProgress = () => {
      if (!paused) {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / duration) * 100, 100);
        setProgress(newProgress);
        
        if (newProgress < 100) {
          progressRef.current = setTimeout(updateProgress, 16); // ~60fps
        }
      }
    };
    progressRef.current = setTimeout(updateProgress, 16);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (progressRef.current) clearTimeout(progressRef.current);
    };
  }, [storeIndex, itemIndex, paused, isOpen, currentItem, duration]);

  // Tap zone handlers
  const handleTap = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    
    // Only trigger navigation if clicking on the left or right 25% of the screen
    if (x < width * 0.25) {
      prevItem();
    } else if (x > width * 0.75) {
      nextItem();
    }
  };

  const handleHoldStart = () => {
    setPaused(true);
  };

  const handleHoldEnd = () => {
    setPaused(false);
    startTimeRef.current = Date.now() - (progress / 100) * duration;
  };

  // Handle swipe gestures
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    // Swipe down to close
    if (deltaY < -100 && Math.abs(deltaX) < 100) {
      onClose();
    }
    // Swipe up for product/store
    else if (deltaY > 100 && Math.abs(deltaX) < 100 && currentItem?.productId) {
      onProductClick?.(currentItem.productId);
    }

    setTouchStart(null);
  };

  if (!isOpen || !currentStore || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80">
      <div 
        className="relative h-full w-full flex flex-col"
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress bars */}
        <div className="flex gap-1 p-4 pt-12">
          {currentStore.items.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-0.5 bg-white bg-opacity-35 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white rounded-full transition-transform duration-100 ease-linear"
                style={{
                  transform: `translateX(${
                    index < itemIndex 
                      ? '0%' 
                      : index === itemIndex 
                        ? `${progress - 100}%`
                        : '-100%'
                  })`
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full overflow-hidden">
              <ImageWithFallback
                src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=28&h=28&fit=crop&crop=face`}
                alt={currentStore.storeName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-white font-semibold text-sm">
              {currentStore.storeName}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white hover:bg-opacity-20 w-8 h-8"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="text-white hover:bg-white hover:bg-opacity-20 w-8 h-8"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Media content */}
        <div 
          className="flex-1 relative overflow-hidden"
          onClick={handleTap}
        >
          {currentItem.type === 'image' ? (
            <ImageWithFallback
              src={currentItem.src}
              alt="Story content"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={currentItem.src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop={false}
              onEnded={nextItem}
            />
          )}
          
          {/* Caption overlay */}
          {currentItem.caption && (
            <div className="absolute bottom-20 left-4 right-4">
              <p className="text-white text-sm bg-black bg-opacity-50 rounded-lg px-3 py-2">
                {currentItem.caption}
              </p>
            </div>
          )}
        </div>

        {/* Bottom CTA buttons */}
        {currentItem.productId && (
          <div className="flex gap-3 p-4 pb-8">
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-black"
              onClick={() => onProductClick?.(currentItem.productId!)}
            >
              К товару
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-transparent border-white text-white hover:bg-white hover:text-black"
              onClick={() => onStoreClick?.(currentStore.storeId)}
            >
              В магазин
            </Button>
          </div>
        )}

        {/* Invisible tap zones for navigation */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left zone - Previous */}
          <div className="absolute left-0 top-0 w-1/4 h-full pointer-events-auto" />
          {/* Right zone - Next */}
          <div className="absolute right-0 top-0 w-1/4 h-full pointer-events-auto" />
          {/* Center zone - Pause/Resume */}
          <div className="absolute left-1/4 top-0 w-1/2 h-full pointer-events-auto" />
        </div>
      </div>
    </div>
  );
}