import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ListItemProps {
  leftIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  showChevron?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ListItem({
  leftIcon,
  title,
  subtitle,
  rightContent,
  showChevron = true,
  onClick,
  className = ""
}: ListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors text-left ${className}`}
    >
      {/* Left Icon */}
      {leftIcon && (
        <div className="w-10 h-10 bg-luma-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
          {leftIcon}
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="luma-type-title-14 text-luma-text-900">{title}</h3>
        {subtitle && (
          <p className="luma-type-body-14 text-luma-text-600 truncate">{subtitle}</p>
        )}
      </div>
      
      {/* Right Content */}
      {rightContent && (
        <div className="flex-shrink-0">
          {rightContent}
        </div>
      )}
      
      {/* Chevron */}
      {showChevron && (
        <ChevronRight className="w-5 h-5 text-luma-text-600 flex-shrink-0" />
      )}
    </button>
  );
}