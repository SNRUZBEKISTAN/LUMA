import React from 'react';
import { Button } from './ui/button';
import { X, Camera, Upload, Image, Search, ShoppingBag } from 'lucide-react';
import { PhotoSearchAnimation } from './PhotoSearchAnimation';

interface PhotoSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PhotoSearchModal({ isOpen, onClose }: PhotoSearchModalProps) {
  const handleUploadPhoto = () => {
    // Демо функция - показываем alert для демонстрации
    alert('Функция "Загрузить фото" будет доступна в следующих обновлениях!');
  };

  const handleOpenCamera = () => {
    // Демо функция - показываем alert для демонстрации  
    alert('Функция "Открыть камеру" будет доступна в следующих обновлениях!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-xl shadow-lg animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors z-10"
        >
          <X className="w-5 h-5 text-luma-text-600" />
        </button>
        
        {/* Content */}
        <div className="p-6 pt-8">
          {/* Header Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-luma-primary-600 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-luma-text-900 mb-2">
              Поиск по фото — скоро
            </h2>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Сканируйте или загрузите вещь, и мы найдём её в нашем каталоге
            </p>
          </div>
          
          {/* Animated Instruction */}
          <div className="mb-6 flex justify-center">
            <PhotoSearchAnimation />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              variant="ghost"
              onClick={handleUploadPhoto}
              className="flex-1 flex items-center gap-2 py-3 text-sm"
            >
              <Image className="w-4 h-4" />
              Загрузить фото
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleOpenCamera}
              className="flex-1 flex items-center gap-2 py-3 text-sm"
            >
              <Camera className="w-4 h-4" />
              Открыть камеру
            </Button>
          </div>
          
          {/* Main CTA */}
          <div className="space-y-3">
            <Button
              onClick={onClose}
              className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white font-semibold py-3 rounded-md"
            >
              Понятно
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Демо-режим скоро
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}