import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ARPreviewAnimation } from './ARPreviewAnimation';

interface ARNotReadyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ARNotReadyModal({ isOpen, onClose }: ARNotReadyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Animated AR Preview Background */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              backdropFilter: 'blur(12px)',
              background: 'rgba(0, 0, 0, 0.4)'
            }}
          >
            <ARPreviewAnimation />
          </motion.div>
          
          {/* Modal Content - Bottom Sheet Style on Mobile */}
          <motion.div
            className="relative bg-white rounded-t-2xl md:rounded-2xl p-6 w-full max-w-md mx-4 md:mx-0 shadow-xl"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ zIndex: 10 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Content */}
            <div className="text-center pt-2">
              <div className="mb-6">
                <span className="text-5xl">🪄</span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                AR примерка скоро будет доступна!
              </h2>
              
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Вы сможете виртуально примерить одежду прямо с камеры вашего устройства.
              </p>
              
              {/* Timeline indicator */}
              <div className="mb-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span className="text-purple-500">✨</span>
                  <span>Запуск в ноябре 2025</span>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-full py-4 px-4 rounded-2xl text-white font-semibold text-base transition-all hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #FF6D9D 0%, #A260EF 100%)'
                }}
              >
                ОК, жду с нетерпением
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}