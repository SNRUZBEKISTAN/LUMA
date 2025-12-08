import React, { useState, useEffect, useRef } from 'react';
import { StoryProgress } from './StoryProgress';
import { StoryHeader } from './StoryHeader';
import { StoryContent } from './StoryContent';
import { StoryFooter } from './StoryFooter';

export interface StoryProduct {
  id: string;
  name: string;
  price: string;
  currency?: string;
  availableSizes?: string[];
  likes?: number;
  orders?: number;
}

export interface StoryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  durationMs?: number;
  product?: StoryProduct;
  caption?: string;
}

export interface StoreStories {
  storeId: string;
  storeName: string;
  avatar: string;
  items: StoryItem[];
}

interface StoryViewerProps {
  stories: StoreStories[];
  initialStoreIndex?: number;
  initialItemIndex?: number;
  onClose: () => void;
  onAddToCart?: (productId: string) => void;
  onViewProduct?: (productId: string) => void;
  onViewStore?: (storeId: string) => void;
}

export function StoryViewer({
  stories,
  initialStoreIndex = 0,
  initialItemIndex = 0,
  onClose,
  onAddToCart,
  onViewProduct,
  onViewStore
}: StoryViewerProps) {
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
      // Reached the end - close viewer
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
    if (paused || !currentItem) return;

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
  }, [storeIndex, itemIndex, paused, currentItem, duration]);

  // Tap zone handlers
  const handleTap = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    
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
    // Swipe up for product
    else if (deltaY > 100 && Math.abs(deltaX) < 100 && currentItem?.product) {
      onViewProduct?.(currentItem.product.id);
    }

    setTouchStart(null);
  };

  if (!currentStore || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Progress bars */}
      <StoryProgress 
        items={currentStore.items}
        currentIndex={itemIndex}
        progress={progress}
      />

      {/* Header */}
      <StoryHeader
        storeName={currentStore.storeName}
        storeAvatar={currentStore.avatar}
        storeId={currentStore.storeId}
        likes={currentItem.product?.likes}
        orders={currentItem.product?.orders}
        onClose={onClose}
        onStoreClick={onViewStore || (() => {})}
      />

      {/* Content */}
      <StoryContent
        type={currentItem.type}
        src={currentItem.src}
        onEnded={nextItem}
        onTap={handleTap}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onHoldStart={handleHoldStart}
        onHoldEnd={handleHoldEnd}
      />

      {/* Footer with CTA */}
      <StoryFooter
        product={currentItem.product}
        storeId={currentStore.storeId}
        onAddToCart={onAddToCart}
        onViewProduct={onViewProduct}
        onViewStore={onViewStore}
      />

      {/* Caption overlay (if no product) */}
      {currentItem.caption && !currentItem.product && (
        <div className="absolute bottom-20 left-4 right-4">
          <p className="text-white text-sm bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 shadow-lg">
            {currentItem.caption}
          </p>
        </div>
      )}
    </div>
  );
}