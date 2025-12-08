import React from 'react';

interface SafeBottomSpacerProps {
  className?: string;
}

export function SafeBottomSpacer({ className = '' }: SafeBottomSpacerProps) {
  return (
    <div 
      className={`h-24 bg-transparent ${className}`}
      style={{ 
        height: 'calc(var(--seller-nav-h) + env(safe-area-inset-bottom) + 8px)',
        clipPath: 'inset(0)'
      }}
      aria-hidden="true"
    />
  );
}