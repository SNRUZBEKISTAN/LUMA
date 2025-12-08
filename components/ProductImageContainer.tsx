import React, { ReactNode } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface ProductImageContainerProps {
  src: string;
  alt: string;
  aspectRatio?: '1:1' | '4:5' | '3:4';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  overlay?: ReactNode;
  className?: string;
}

export function ProductImageContainer({
  src,
  alt,
  aspectRatio = '1:1',
  rounded = 'xl',
  overlay,
  className = ''
}: ProductImageContainerProps) {
  const aspectRatioClasses = {
    '1:1': 'aspect-square',
    '4:5': 'aspect-[4/5]',
    '3:4': 'aspect-[3/4]'
  };

  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  };

  return (
    <div 
      className={`relative overflow-hidden bg-gray-100 ${aspectRatioClasses[aspectRatio]} ${roundedClasses[rounded]} ${className}`}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0">
          {overlay}
        </div>
      )}
    </div>
  );
}

export default ProductImageContainer;