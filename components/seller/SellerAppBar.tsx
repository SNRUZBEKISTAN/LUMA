import React from 'react';
import { ChevronLeft, Bell, ChevronDown } from 'lucide-react';

interface SellerAppBarProps {
  hasBack?: boolean;
  title?: string;
  storeName?: string;
  rightIcons?: ('bell')[];
  storeSelector?: boolean;
  onBack?: () => void;
  onStoreSelect?: () => void;
  onBellClick?: () => void;
}

export function SellerAppBar({
  hasBack = false,
  title,
  storeName = "Urban",
  rightIcons = ['bell'],
  storeSelector = true,
  onBack,
  onStoreSelect,
  onBellClick
}: SellerAppBarProps) {
  return (
    <div className="bg-luma-surface-0 border-b border-luma-border-200 shadow-luma-soft">
      <div className="px-4 py-3 flex items-center justify-between pt-[40px] pr-[14px] pb-[10px] pl-[14px]">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {hasBack && (
            <button 
              onClick={onBack}
              className="p-1.5 hover:bg-luma-primary-200 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-luma-text-900" />
            </button>
          )}
          
          {storeSelector ? (
            <button 
              onClick={onStoreSelect}
              className="flex items-center gap-2 py-1.5 px-2 hover:bg-luma-primary-200 rounded-lg transition-colors"
            >
              <div className="w-6 h-6 bg-luma-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-semibold">U</span>
              </div>
              <span className="luma-type-title-16 text-luma-text-900">{storeName}</span>
              <ChevronDown className="w-4 h-4 text-luma-text-600" />
            </button>
          ) : (
            title && <h1 className="luma-type-title-16 text-luma-text-900">{title}</h1>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {rightIcons.includes('bell') && (
            <button 
              onClick={onBellClick}
              className="p-2 hover:bg-luma-primary-200 rounded-lg transition-colors relative"
            >
              <Bell className="w-5 h-5 text-luma-text-900" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-luma-danger-600 rounded-full"></div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}