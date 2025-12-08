import React from 'react';
import { motion } from 'motion/react';

export function ARPreviewAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Colorful Gradient Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(135deg, #F0ECFF, #FFE9F0, #E6F9F4, #FFF4E6)'
        }}
      />

      {/* Stage 1: Camera Activation Text */}
      <motion.div
        className="absolute top-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: [0, 1, 1, 0, 0, 0, 0],
          y: [-20, 0, 0, -20, -20, -20, -20]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.1, 0.25, 0.3, 0.4, 0.8, 1] }}
      >
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
          <span className="text-sm font-semibold text-gray-800">
            Скоро: полное погружение в моду с AR
          </span>
        </div>
      </motion.div>

      {/* Human Silhouette */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1] }}
      >
        <svg width="140" height="220" viewBox="0 0 140 220" className="text-gray-300">
          {/* Human body outline */}
          <path
            d="M70 25C58 25 52 38 52 50C52 62 58 72 70 72C82 72 88 62 88 50C88 38 82 25 70 25Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M70 72L70 140M52 95L88 95M70 140L52 185M70 140L88 185M52 185L52 210M88 185L88 210"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* Stage 2: Scanning Wave */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0, 0.8, 0.6, 0, 0, 0],
          scale: [0.5, 0.5, 1.2, 1.5, 1.8, 1.8, 1.8]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.25, 0.35, 0.4, 0.45, 0.7, 1] }}
      >
        <div className="w-80 h-80 border-4 border-cyan-400 rounded-full animate-pulse" 
             style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.1), transparent)' }}>
        </div>
      </motion.div>

      {/* Scanning Text */}
      <motion.div
        className="absolute top-20 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0, 1, 1, 0, 0, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.25, 0.35, 0.45, 0.5, 0.7, 1] }}
      >
        <div className="bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg">
          <span className="text-sm font-semibold text-white">
            Идёт сканирование...
          </span>
        </div>
      </motion.div>

      {/* Stage 3: Colorful Clothing Items with "dressing" effect */}
      {/* Bright Blouse - "натягивается" на тело */}
      <motion.div
        className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
        animate={{ 
          opacity: [0, 0, 0, 0.2, 0.6, 1, 1, 0.8, 0.5],
          scale: [0.3, 0.3, 0.3, 0.7, 1, 1.1, 1, 1, 1],
          rotate: [-10, -10, -10, -5, 0, 2, 0, 0, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          times: [0, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7, 0.8, 1],
          ease: "easeOut"
        }}
      >
        <div className="w-32 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-xl border-2 border-white/50"
             style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)' }}>
          <div className="w-full h-4 bg-white/20 rounded-t-2xl"></div>
          {/* Fabric texture effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 rounded-2xl"></div>
        </div>
      </motion.div>

      {/* Jeans */}
      <motion.div
        className="absolute left-1/2 top-2/3 transform -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0, 0, 0, 1, 1, 0.6],
          scale: [0.5, 0.5, 0.5, 0.5, 1.1, 1, 1]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.5, 0.6, 0.65, 0.7, 0.75, 1] }}
      >
        <div className="w-24 h-32 bg-gradient-to-b from-blue-600 to-indigo-700 rounded-lg shadow-lg border border-white/30">
          <div className="w-full h-3 bg-blue-400 rounded-t-lg"></div>
          <div className="p-1 space-y-1">
            <div className="w-16 h-0.5 bg-white/30 rounded"></div>
            <div className="w-14 h-0.5 bg-white/30 rounded"></div>
          </div>
        </div>
      </motion.div>

      {/* Shoes */}
      <motion.div
        className="absolute left-1/2 bottom-16 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0, 0, 0, 0, 0, 1, 0.7],
          y: [20, 20, 20, 20, 20, 0, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.65, 0.7, 0.75, 0.8, 0.85, 1] }}
      >
        <div className="flex gap-2">
          <div className="w-8 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-md"></div>
          <div className="w-8 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-md"></div>
        </div>
      </motion.div>

      {/* Stage 4: UI Elements */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-3"
        initial={{ opacity: 0, x: 30 }}
        animate={{ 
          opacity: [0, 0, 0, 0, 0, 1, 0.8],
          x: [30, 30, 30, 30, 30, 0, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.7, 0.75, 0.8, 0.85, 0.9, 1] }}
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-xl shadow-lg text-xs font-semibold">
          Сменить цвет
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-2 rounded-xl shadow-lg text-xs font-semibold">
          Выбрать размер
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-xl shadow-lg text-xs font-semibold">
          В корзину
        </div>
      </motion.div>

      {/* Stage 5: Completion */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0, 0, 0, 0, 0, 0, 1],
          y: [20, 20, 20, 20, 20, 20, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.8, 0.85, 0.9, 0.92, 0.95, 1] }}
      >
        <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl border border-white/50">
          <div className="text-center">
            <div className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
              Готово! ✨
            </div>
            <div className="text-xs text-gray-600">
              Стань частью новой эры шопинга
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating particles */}
      <motion.div
        className="absolute inset-0"
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 30%, rgba(236,72,153,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 80%, rgba(59,130,246,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(168,85,247,0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Mid-animation text */}
      <motion.div
        className="absolute top-1/4 left-8"
        initial={{ opacity: 0, x: -30 }}
        animate={{ 
          opacity: [0, 0, 0, 1, 1, 0, 0],
          x: [-30, -30, -30, 0, 0, -30, -30]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.5, 0.6, 0.65, 0.75, 0.8, 1] }}
      >
        <div className="bg-gradient-to-r from-indigo-500/90 to-purple-500/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
          <span className="text-xs font-semibold text-white">
            Выбирай — примеряй — сохраняй
          </span>
        </div>
      </motion.div>

      {/* Size fit confirmation */}
      <motion.div
        className="absolute top-1/4 right-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ 
          opacity: [0, 0, 0, 0, 0, 1, 1, 0],
          x: [30, 30, 30, 30, 30, 0, 0, 30]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.65, 0.7, 0.75, 0.8, 0.82, 0.88, 1] }}
      >
        <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
          <span className="text-xs font-semibold text-white flex items-center gap-1">
            ✓ Размер подходит
          </span>
        </div>
      </motion.div>

      {/* Color change option */}
      <motion.div
        className="absolute bottom-1/3 right-8"
        initial={{ opacity: 0, x: 30 }}
        animate={{ 
          opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0],
          x: [30, 30, 30, 30, 30, 30, 0, 0, 30]
        }}
        transition={{ duration: 7, repeat: Infinity, times: [0, 0.7, 0.75, 0.8, 0.85, 0.88, 0.9, 0.95, 1] }}
      >
        <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
          <span className="text-xs font-semibold text-white flex items-center gap-1">
            🎨 Можно сменить цвет
          </span>
        </div>
      </motion.div>
    </div>
  );
}