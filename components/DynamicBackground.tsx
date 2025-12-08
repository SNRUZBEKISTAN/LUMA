import React from 'react';

export type CategoryType = 'default' | 'sport' | 'elegant' | 'street' | 'kids';

export interface DynamicBackgroundProps {
  category?: CategoryType;
  className?: string;
}

export function DynamicBackground({ 
  category = 'default',
  className = ''
}: DynamicBackgroundProps) {
  
  // Упрощенная конфигурация
  const getBackgroundStyle = React.useMemo(() => {
    switch (category) {
      case 'sport':
        return {
          background: 'linear-gradient(to top, #EAF8FF, #FFFFFF)',
          circle1: 'rgba(132, 193, 255, 0.15)',
          circle2: 'rgba(179, 229, 252, 0.10)'
        };
      case 'elegant':
        return {
          background: 'linear-gradient(to top, #FFF0F6, #FFFFFF)',
          circle1: 'rgba(255, 193, 214, 0.15)',
          circle2: 'rgba(255, 157, 176, 0.10)'
        };
      case 'street':
        return {
          background: 'linear-gradient(to top, #F3F3F3, #FFFFFF)',
          circle1: 'rgba(194, 194, 194, 0.15)',
          circle2: 'rgba(224, 224, 224, 0.10)'
        };
      case 'kids':
        return {
          background: 'linear-gradient(to top, #EFFFF4, #FFFFFF)',
          circle1: 'rgba(198, 247, 218, 0.15)',
          circle2: 'rgba(185, 241, 235, 0.10)'
        };
      default:
        return {
          background: 'linear-gradient(to top, #F7F7F7, #FFFFFF)',
          circle1: 'rgba(162, 96, 239, 0.12)',
          circle2: 'rgba(255, 109, 157, 0.08)'
        };
    }
  }, [category]);

  return (
    <div 
      className={`fixed inset-0 transition-all duration-500 ease-in-out ${className}`}
      style={{ 
        zIndex: -1,
        background: getBackgroundStyle.background
      }}
    >
      {/* Размытое пятно 1 */}
      <div 
        className="absolute top-[-40px] left-[-40px] w-[200px] h-[200px] rounded-full transition-all duration-500 ease-in-out"
        style={{
          backgroundColor: getBackgroundStyle.circle1,
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      {/* Размытое пятно 2 */}
      <div 
        className="absolute bottom-0 right-[-60px] w-[180px] h-[180px] rounded-full transition-all duration-500 ease-in-out"
        style={{
          backgroundColor: getBackgroundStyle.circle2,
          filter: 'blur(100px)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}

export default DynamicBackground;