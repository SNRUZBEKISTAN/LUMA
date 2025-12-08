import React from 'react';
import { ScrollArea } from './ui/scroll-area';

interface SizePickerProps {
  sizes: string[];
  selectedSize?: string;
  onSizeSelect: (size: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SizePicker({ sizes, selectedSize, onSizeSelect, isOpen, onClose }: SizePickerProps) {
  const sizeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen && selectedSize && sizeRef.current) {
      const selectedElement = sizeRef.current.querySelector(`[data-size="${selectedSize}"]`) as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, [isOpen, selectedSize]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sizeRef.current && !sizeRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div 
        ref={sizeRef}
        className="bg-white rounded-xl shadow-xl mx-4 max-w-sm w-full"
        style={{ padding: '16px' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#2C2D33]">Выберите размер</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <ScrollArea className="w-full">
          <div 
            className="flex gap-3 pb-2"
            style={{ height: '120px', overflowX: 'auto' }}
          >
            {sizes.map((size, index) => (
              <button
                key={`size-${index}-${size}`}
                data-size={size}
                onClick={() => {
                  onSizeSelect(size);
                  onClose();
                }}
                className={`
                  flex-shrink-0 h-12 px-6 rounded-lg border-2 transition-all duration-200
                  flex items-center justify-center font-medium
                  ${selectedSize === size 
                    ? 'border-[#A260EF] bg-[#A260EF] text-white' 
                    : 'border-gray-200 bg-white text-[#2C2D33] hover:border-[#A260EF] hover:bg-[#A260EF]/5'
                  }
                `}
                style={{ minWidth: '60px' }}
              >
                {String(size)}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}