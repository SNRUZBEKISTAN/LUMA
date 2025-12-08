import React from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

interface NoAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailRecovery: () => void;
  onContactSupport: () => void;
  onSocialLogin: () => void;
}

export function NoAccessModal({
  isOpen,
  onClose,
  onEmailRecovery,
  onContactSupport,
  onSocialLogin
}: NoAccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-luma-surface-0 rounded-luma-lg shadow-luma-floating animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
        >
          <X className="w-5 h-5 text-luma-text-600" />
        </button>
        
        {/* Content */}
        <div className="p-6 pt-8">
          {/* Title */}
          <h2 className="text-xl font-bold text-luma-text-900 mb-4 pr-8">
            Нет доступа к телефону или паролю?
          </h2>
          
          {/* Body */}
          <div className="text-sm text-luma-text-600 mb-6 leading-relaxed">
            <p className="mb-3">Вы можете:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-luma-primary-600 mr-2">•</span>
                Восстановить доступ по email
              </li>
              <li className="flex items-start">
                <span className="text-luma-primary-600 mr-2">•</span>
                Написать в поддержку
              </li>
              <li className="flex items-start">
                <span className="text-luma-primary-600 mr-2">•</span>
                Войти через Apple ID или Google
              </li>
            </ul>
          </div>
          
          {/* Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onEmailRecovery}
              className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white font-semibold py-3"
            >
              Восстановить по email
            </Button>
            
            <Button
              onClick={onContactSupport}
              variant="outline"
              className="w-full bg-luma-surface-0 border-luma-border-200 text-luma-text-900 hover:bg-luma-primary-200/20 hover:border-luma-primary-500 font-semibold py-3"
            >
              Написать в поддержку
            </Button>
            
            <button
              onClick={onSocialLogin}
              className="w-full text-sm text-luma-primary-600 hover:text-luma-primary-500 font-medium py-2"
            >
              Войти через соцсети
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}