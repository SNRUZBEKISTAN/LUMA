import React from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  React.useEffect(() => {
    // Fade-in logo 600ms, hold 700ms, fade-out 400ms → then navigate
    const timer = setTimeout(() => {
      onComplete();
    }, 1700); // 600 + 700 + 400 = 1700ms

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Vertical gradient background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, var(--luma-primary-200) 0%, var(--luma-bg-0) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        {/* luma Logo - 40% of width */}
        <div className="w-2/5 max-w-48 mb-4">
          <div className="aspect-square bg-luma-surface-0 rounded-luma-xl shadow-luma-soft flex items-center justify-center">
            <span className="text-4xl font-bold text-luma-primary-600 tracking-wider" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              luma
            </span>
          </div>
        </div>
        
        {/* Subcaption */}
        <p className="text-xs text-luma-text-600 text-center mb-8 font-medium tracking-wide">
          Marketplace for Fashion & Beauty
        </p>
        
        {/* Loading spinner */}
        <div className="flex gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: 'var(--luma-primary-600)',
              animationDelay: '0ms',
              animationDuration: '1000ms'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: 'var(--luma-primary-600)',
              animationDelay: '200ms',
              animationDuration: '1000ms'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ 
              backgroundColor: 'var(--luma-primary-600)',
              animationDelay: '400ms',
              animationDuration: '1000ms'
            }}
          />
        </div>
      </div>
    </div>
  );
}