import React from 'react';
import { motion } from 'motion/react';

interface ARFloatingButtonProps {
  onClick: () => void;
  className?: string;
}

export function ARFloatingButton({ onClick, className = '' }: ARFloatingButtonProps) {
  return (
    <motion.button
      className={`absolute bottom-4 right-4 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FF6D9D 0%, #A260EF 100%)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)'
      }}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        filter: 'brightness(0.95)'
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-lg">🪄</span>
      <span className="text-sm font-semibold">AR примерка</span>
    </motion.button>
  );
}