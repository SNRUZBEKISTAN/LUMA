import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      title: "Покупайте стильные вещи с доставкой за 30 минут",
      image: "fashion shopping delivery"
    },
    {
      title: "Продавайте без затрат и сложностей", 
      image: "seller selling clothes"
    },
    {
      title: "Отслеживайте заказы в реальном времени",
      image: "delivery tracking map"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-luma-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <Button 
          variant="ghost" 
          onClick={onComplete}
          className="text-luma-text-secondary hover:text-luma-primary"
        >
          Пропустить
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          <div className="w-64 h-64 mx-auto mb-8 bg-luma-secondary rounded-2xl flex items-center justify-center overflow-hidden">
            <ImageWithFallback
              src=""
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-luma-text-secondary">
                  <span className="text-sm">{slides[currentSlide].image}</span>
                </div>
              }
            />
          </div>
          
          <h2 className="text-xl font-semibold text-luma-text-dark px-4 leading-tight">
            {slides[currentSlide].title}
          </h2>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-luma-primary' : 'bg-luma-secondary'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-2 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button
          onClick={nextSlide}
          className="bg-luma-primary hover:bg-luma-primary/90 text-white px-8 py-3 rounded-xl shadow-luma"
        >
          {currentSlide === slides.length - 1 ? 'Начать' : 'Далее'}
        </Button>
      </div>
    </div>
  );
}