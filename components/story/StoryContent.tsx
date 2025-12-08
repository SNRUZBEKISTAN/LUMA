import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface StoryContentProps {
  type: 'image' | 'video';
  src: string;
  onEnded?: () => void;
  onTap: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
  onTouchEnd: (event: React.TouchEvent) => void;
  onHoldStart: () => void;
  onHoldEnd: () => void;
}

export function StoryContent({
  type,
  src,
  onEnded,
  onTap,
  onTouchStart,
  onTouchEnd,
  onHoldStart,
  onHoldEnd
}: StoryContentProps) {
  return (
    <div 
      className="flex-1 relative overflow-hidden cursor-pointer"
      onClick={onTap}
      onMouseDown={onHoldStart}
      onMouseUp={onHoldEnd}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {type === 'image' ? (
        <ImageWithFallback
          src={src}
          alt="Story content"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          src={src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          loop={false}
          onEnded={onEnded}
        />
      )}
      
      {/* Invisible tap zones for navigation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left zone - Previous (25%) */}
        <div className="absolute left-0 top-0 w-1/4 h-full pointer-events-auto" />
        {/* Right zone - Next (25%) */}
        <div className="absolute right-0 top-0 w-1/4 h-full pointer-events-auto" />
        {/* Center zone - Pause/Resume (50%) */}
        <div className="absolute left-1/4 top-0 w-1/2 h-full pointer-events-auto" />
      </div>
    </div>
  );
}