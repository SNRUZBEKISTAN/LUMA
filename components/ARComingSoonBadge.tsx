import React from 'react';
import { motion } from 'motion/react';

interface ARComingSoonBadgeProps {
  className?: string;
}

export function ARComingSoonBadge({ className = '' }: ARComingSoonBadgeProps) {
  return (
    <motion.div
      className={`rounded-2xl p-4 mb-4 ${className}`}
      style={{
        background: 'linear-gradient(90deg, #FAFAFA, #F6F0FF)'
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <span className="text-2xl">🪄</span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800 mb-1">
            AR примерка скоро
          </h3>
          <p className="text-xs text-gray-500">
            Скоро вы сможете примерять вещи прямо в камере
          </p>
        </div>
      </div>
    </motion.div>
  );
}