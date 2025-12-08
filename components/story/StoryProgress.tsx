import React from 'react';

interface StoryProgressProps {
  items: any[];
  currentIndex: number;
  progress: number;
}

export function StoryProgress({ items, currentIndex, progress }: StoryProgressProps) {
  return (
    <div className="flex gap-1.5 w-full">
      {items.map((_, index) => (
        <div
          key={index}
          className="flex-1 rounded-full bg-white/20 backdrop-blur-sm h-1"
        >
          <div
            className="h-full rounded-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: index < currentIndex 
                ? '100%' 
                : index === currentIndex 
                  ? `${progress}%`
                  : '0%'
            }}
          />
        </div>
      ))}
    </div>
  );
}
