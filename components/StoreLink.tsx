import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StoreLinkProps {
  id: string;
  name: string;
  avatar: string;
  variant?: 'default' | 'glass' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick: (storeId: string) => void;
}

export function StoreLink({ 
  id, 
  name, 
  avatar, 
  variant = 'default', 
  size = 'md', 
  className = '',
  onClick 
}: StoreLinkProps) {
  const handleClick = () => {
    onClick(id);
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'gap-2 px-3 py-2',
      avatar: 'w-5 h-5',
      text: 'text-sm',
      chevron: 'w-3 h-3'
    },
    md: {
      container: 'gap-2 px-3 py-2',
      avatar: 'w-8 h-8',
      text: 'text-sm',
      chevron: 'w-4 h-4'
    },
    lg: {
      container: 'gap-3 px-4 py-3',
      avatar: 'w-10 h-10',
      text: 'text-base',
      chevron: 'w-5 h-5'
    }
  };

  const config = sizeConfig[size];

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return {
          container: 'bg-luma-surface-0/90 backdrop-blur-sm border border-luma-border-200/50 shadow-luma-soft',
          text: 'text-luma-text-900 font-medium',
          hover: 'hover:bg-luma-surface-0 hover:shadow-luma'
        };
      
      case 'minimal':
        return {
          container: 'bg-transparent',
          text: 'text-luma-text-900 font-medium',
          hover: 'hover:bg-luma-primary-200/30'
        };
      
      default: // 'default'
        return {
          container: 'bg-luma-surface-0 border border-luma-border-200 shadow-luma-soft',
          text: 'text-luma-text-900 font-medium',
          hover: 'hover:bg-luma-primary-200/50 hover:shadow-luma'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center justify-between rounded-full transition-all duration-200
        ${config.container}
        ${styles.container}
        ${styles.hover}
        ${className}
      `}
    >
      <div className="flex items-center gap-2">
        {/* Store Avatar */}
        <div className={`
          ${config.avatar} 
          bg-luma-primary-200 rounded-full flex items-center justify-center flex-shrink-0
        `}>
          <span className={variant === 'glass' ? 'text-xs' : size === 'sm' ? 'text-xs' : 'text-sm'}>
            {avatar}
          </span>
        </div>
        
        {/* Store Name */}
        <span className={`${config.text} ${styles.text} truncate`}>
          {name}
        </span>
      </div>

      {/* Arrow Icon - только для default и glass вариантов */}
      {variant !== 'minimal' && (
        <ChevronRight className={`${config.chevron} text-luma-text-600 flex-shrink-0`} />
      )}
    </button>
  );
}