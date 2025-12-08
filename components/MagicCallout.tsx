import React from 'react';
import { Wand2 } from 'lucide-react';

interface MagicCalloutProps {
  onClick: () => void;
}

export function MagicCallout({ onClick }: MagicCalloutProps) {
  return (
    <div
      className="magic-callout animate-scale-tap cursor-pointer flex items-center p-5 rounded-2xl shadow-ai-float transition-all duration-200"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Собери образ с AI, кнопка"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
        minHeight: '64px',
        gap: '12px'
      }}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Wand2 className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 relative z-10">
        <h3 className="text-white font-semibold text-base leading-tight mb-0.5">
          ✨ Собери образ с AI
        </h3>
        <p className="text-white/90 text-xs leading-relaxed">
          Опиши событие или стиль — AI подберет вещи
        </p>
      </div>
      
      {/* Arrow indicator */}
      <div className="flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 12 12" 
            fill="none" 
            className="text-white"
          >
            <path 
              d="M4.5 3L7.5 6L4.5 9" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MagicCallout;