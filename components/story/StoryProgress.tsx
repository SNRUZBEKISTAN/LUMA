import React from 'react';

interface StoryProgressProps {
  items: any[];
  currentIndex: number;
  progress: number;
}

export function StoryProgress({ items, currentIndex, progress }: StoryProgressProps) {
  return (
    <div className="flex gap-1 px-4 pt-4 pb-2 bg-gradient-to-b from-purple-900/60 via-purple-800/40 to-transparent">
      {items.map((_, index) => (
        <div
          key={index}
          className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-white rounded-full transition-transform duration-100 ease-linear"
            style={{
              transform: `translateX(${
                index < currentIndex 
                  ? '0%' 
                  : index === currentIndex 
                    ? `${progress - 100}%`
                    : '-100%'
              })`
            }}
          />
        </div>
      ))}
    </div>
  );
}