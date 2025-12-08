import React from 'react';
import { ProductMedia } from '../types/app';

interface ProductMediaGalleryProps {
  media: ProductMedia[];
}

export default function ProductMediaGallery({ media }: ProductMediaGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  if (!media || media.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-gray-100 rounded-2xl flex items-center justify-center">
        <div className="text-gray-400">Нет изображений</div>
      </div>
    );
  }
  
  const currentMedia = media[currentIndex];
  
  return (
    <div className="w-full">
      {/* Main Media Display */}
      <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl mb-3 bg-gray-100">
        {currentMedia?.type === 'video' ? (
          <video 
            src={currentMedia.url} 
            controls 
            className="w-full h-full object-cover" 
            poster={media.find(m => m.type === 'image')?.url} 
          />
        ) : (
          <img 
            src={currentMedia?.url || '/media/placeholder.jpg'} 
            className="w-full h-full object-cover" 
            alt="product" 
          />
        )}
      </div>
      
      {/* Thumbnail Navigation */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-1 scrollbar-hide">
          {media.map((mediaItem, index) => (
            <button 
              key={index} 
              onClick={() => setCurrentIndex(index)} 
              className={`h-16 w-12 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                index === currentIndex ? 'border-luma-primary-600' : 'border-transparent'
              }`}
            >
              {mediaItem.type === 'video' ? (
                <div className="h-full w-full grid place-items-center bg-black/10 text-xs">
                  🎬
                </div>
              ) : (
                <img 
                  src={mediaItem.url} 
                  className="h-full w-full object-cover" 
                  alt={`thumbnail ${index + 1}`}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}