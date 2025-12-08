import React from 'react';

interface StoreButtonProps {
  storeId: string;
  storeName: string;
  storeAvatar: string;
  avatarSize?: number;
  nameSize?: 'sm' | 'base' | 'lg';
  className?: string;
  showName?: boolean;
  onStoreClick: (storeId: string) => void;
  children?: React.ReactNode;
}

export function StoreButton({
  storeId,
  storeName,
  storeAvatar,
  avatarSize = 32,
  nameSize = 'base',
  className = '',
  showName = true,
  onStoreClick,
  children
}: StoreButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStoreClick(storeId);
    
    // Analytics tracking
    console.log('Analytics: store_open', {
      store_id: storeId,
      store_name: storeName,
      source_screen: window.location.pathname // Simplified for demo
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  const getSizeClasses = () => {
    switch (nameSize) {
      case 'sm':
        return 'text-sm font-medium';
      case 'base':
        return 'text-base font-semibold';
      case 'lg':
        return 'text-lg font-bold';
      default:
        return 'text-base font-semibold';
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        flex items-center gap-2 min-h-[44px] min-w-[44px] 
        hover:bg-luma-primary-200/30 active:bg-luma-primary-200/50 
        active:scale-98 transition-all duration-150
        rounded-lg cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:ring-offset-2
        ${className}
      `}
      aria-label={`Открыть магазин ${storeName}`}
      role="button"
      tabIndex={0}
    >
      {/* Store Avatar */}
      <div 
        className="bg-luma-primary-200 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ 
          width: `${avatarSize}px`, 
          height: `${avatarSize}px`,
          fontSize: `${Math.max(12, avatarSize * 0.4)}px`
        }}
      >
        <span>
          {storeAvatar === 'directory' || !storeAvatar || storeAvatar === '' ? 
            '🏪' : 
            (storeAvatar.startsWith('http') ? 
              <img 
                src={storeAvatar} 
                alt="Store" 
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '🏪';
                }}
              /> : 
              storeAvatar
            )
          }
        </span>
      </div>
      
      {/* Store Name */}
      {showName && (
        <span className={`text-luma-text-900 truncate ${getSizeClasses()}`}>
          {storeName === 'directory' || !storeName ? 'Магазин' : storeName}
        </span>
      )}
      
      {/* Additional children (e.g., chevron, badges) */}
      {children}
    </button>
  );
}

// Utility styles for active states
export const storeButtonStyles = `
  .store-button-active {
    transform: scale(0.98);
    opacity: 0.92;
  }
`;