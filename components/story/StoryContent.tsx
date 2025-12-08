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
  const [videoError, setVideoError] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    const error = video.error;
    
    console.error('❌ Video failed to load:', src);
    
    // Log detailed error information without circular references
    if (error) {
      console.error('Video error details:', {
        code: error.code,
        message: error.message,
        MEDIA_ERR_ABORTED: error.code === 1,
        MEDIA_ERR_NETWORK: error.code === 2,
        MEDIA_ERR_DECODE: error.code === 3,
        MEDIA_ERR_SRC_NOT_SUPPORTED: error.code === 4
      });
    }
    
    setVideoError(true);
  };

  const handleVideoLoadStart = () => {
    console.log('📹 Video loading started:', src);
  };

  const handleVideoCanPlay = () => {
    console.log('✅ Video can play:', src);
  };

  // Reset error state when src changes
  React.useEffect(() => {
    console.log('🎬 Story content changed:', { type, src });
    setVideoError(false);
  }, [src, type]);

  // Auto-play video when loaded
  React.useEffect(() => {
    const video = videoRef.current;
    if (video && type === 'video' && !videoError) {
      const playVideo = async () => {
        try {
          await video.play();
          console.log('✅ Video auto-play started');
        } catch (err) {
          if (err instanceof Error) {
            console.warn('Auto-play prevented:', err.message);
          }
        }
      };
      
      // Small delay to ensure video is loaded
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }
  }, [src, type, videoError]);

  return (
    <div 
      className="flex-1 relative overflow-hidden cursor-pointer"
      onClick={onTap}
      onMouseDown={onHoldStart}
      onMouseUp={onHoldEnd}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {type === 'image' || (type === 'video' && videoError) ? (
        <ImageWithFallback
          src={videoError ? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=700&fit=crop' : src}
          alt="Story content"
          className="w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          key={src}
          src={src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          loop={false}
          onEnded={onEnded}
          onError={handleVideoError}
          onLoadStart={handleVideoLoadStart}
          onCanPlay={handleVideoCanPlay}
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