import React, { useState, useEffect } from 'react';
import { Camera, Search, ShoppingBag, CheckCircle } from 'lucide-react';

export function PhotoSearchAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLooping, setIsLooping] = useState(true);

  useEffect(() => {
    if (!isLooping) return;

    const stepDurations = [2000, 1500, 1500, 2000]; // Разная длительность для каждого шага
    
    const timer = setTimeout(() => {
      setCurrentStep((prev) => {
        if (prev >= 3) {
          return 0; // Рестарт анимации
        }
        return prev + 1;
      });
    }, stepDurations[currentStep]);

    return () => clearTimeout(timer);
  }, [currentStep, isLooping]);

  return (
    <div className="flex flex-col items-center justify-center h-60 relative">
      {/* Phone Frame */}
      <div className="relative transform hover:scale-105 transition-transform duration-300">
        <div className="w-32 h-56 bg-gray-900 rounded-2xl p-1 shadow-2xl">
          <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
            
            {/* Step 0-1: Camera View with Product */}
            {currentStep <= 1 && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center transition-all duration-500">
                {/* Product (Sneaker) */}
                <div className={`transition-all duration-1000 ${currentStep === 1 ? 'scale-110 rotate-6' : 'scale-100 rotate-12'}`}>
                  <div className="w-16 h-12 bg-gradient-to-r from-luma-primary-500 to-luma-secondary-500 rounded-lg shadow-lg">
                    {/* Sneaker details */}
                    <div className="w-full h-2 bg-white rounded-t-lg opacity-90"></div>
                    <div className="w-3 h-3 bg-white rounded-full ml-2 mt-1 opacity-70"></div>
                    <div className="w-8 h-1 bg-white/50 rounded ml-1 mt-1"></div>
                    <div className="w-4 h-1 bg-white/30 rounded ml-6 -mt-1"></div>
                  </div>
                </div>
                
                {/* Scanning Frame */}
                {currentStep === 1 && (
                  <div className="absolute inset-4 border-2 border-luma-primary-500 rounded-lg animate-pulse">
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-luma-primary-600"></div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-luma-primary-600"></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-luma-primary-600"></div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-luma-primary-600"></div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Search Processing */}
            {currentStep === 2 && (
              <div className="absolute inset-0 bg-white flex flex-col items-center justify-center transition-all duration-500">
                <div className="relative">
                  <Search className="w-8 h-8 text-luma-primary-600 animate-spin" />
                  <div className="absolute inset-0 bg-luma-primary-100 rounded-full animate-ping opacity-30"></div>
                </div>
                <div className="mt-2 text-xs text-luma-text-600 font-medium">
                  Поиск...
                </div>
              </div>
            )}

            {/* Step 3: Product Card Result */}
            {currentStep === 3 && (
              <div className="absolute inset-0 bg-white p-2 transition-all duration-500 animate-fade-in">
                <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 flex flex-col border border-luma-primary-200">
                  {/* Product Image */}
                  <div className="w-full h-16 bg-gradient-to-r from-luma-primary-500 to-luma-secondary-500 rounded-md mb-2 shadow-sm">
                    <div className="w-full h-2 bg-white rounded-t-md opacity-90"></div>
                    <div className="w-2 h-2 bg-white rounded-full ml-1 mt-1 opacity-70"></div>
                    <div className="w-6 h-0.5 bg-white/50 rounded ml-1 mt-1"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="space-y-1 flex-1">
                    <div className="h-1.5 bg-gray-800 rounded w-3/4 animate-pulse"></div>
                    <div className="h-1.5 bg-luma-primary-600 rounded w-1/2"></div>
                    <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                  </div>

                  {/* Found Badge */}
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
                    <CheckCircle className="w-2 h-2" />
                    <span style={{ fontSize: '7px', fontWeight: 'bold' }}>1</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Camera Icon Overlay */}
            {currentStep <= 1 && (
              <div className="absolute top-2 left-2">
                <Camera className="w-4 h-4 text-white drop-shadow-lg" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Text */}
      <div className="mt-4 text-center min-h-[20px]">
        {currentStep === 0 && (
          <p className="text-sm text-luma-text-600 animate-fade-in">
            Наведите камеру на товар
          </p>
        )}
        {currentStep === 1 && (
          <p className="text-sm text-luma-primary-600 font-medium animate-fade-in">
            Сканирование товара...
          </p>
        )}
        {currentStep === 2 && (
          <p className="text-sm text-luma-primary-600 font-medium animate-fade-in">
            Поиск в каталоге...
          </p>
        )}
        {currentStep === 3 && (
          <p className="text-sm text-green-600 font-semibold animate-fade-in">
            ✨ Найдено 1 похожее!
          </p>
        )}
      </div>
    </div>
  );
}