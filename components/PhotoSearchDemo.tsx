import React, { useState } from 'react';
import { Button } from './ui/button';
import { Camera } from 'lucide-react';
import { PhotoSearchModal } from './PhotoSearchModal';

export function PhotoSearchDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-luma-bg-0 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-luma-text-900 mb-2">
          Demo: Поиск по фото
        </h1>
        <p className="text-luma-text-600">
          Обновленное модальное окно с анимированной инструкцией
        </p>
      </div>

      <Button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-luma-primary-600 hover:bg-luma-primary-500 text-white px-6 py-3"
      >
        <Camera className="w-5 h-5" />
        Открыть поиск по фото
      </Button>

      <div className="mt-8 max-w-md text-center space-y-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-luma-text-900 mb-2">Что нового:</h3>
          <ul className="text-sm text-luma-text-600 space-y-1 text-left">
            <li>✅ Удалена заглушка "Under Construction"</li>
            <li>✅ Добавлена анимированная инструкция</li>
            <li>✅ Активные кнопки "Загрузить фото" и "Открыть камеру"</li>
            <li>✅ Современный дизайн с мягкими тенями</li>
            <li>✅ Фиолетовая акцентная палитра</li>
          </ul>
        </div>
      </div>

      <PhotoSearchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}