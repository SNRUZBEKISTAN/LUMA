import React from 'react';
import { Button } from './ui/button';
import { FloatingBottomNav } from './FloatingBottomNav';
import { ArrowLeft } from 'lucide-react';

interface ProfileTemplateProps {
  title: string;
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  type?: 'list' | 'grid' | 'tabs';
  empty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  children: React.ReactNode;
}

export function ProfileTemplate({
  title,
  onBack,
  onTabChange,
  activeTab,
  type = 'list',
  empty = false,
  emptyTitle = 'Пусто',
  emptyDescription = 'Здесь пока ничего нет',
  children
}: ProfileTemplateProps) {

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Header - iOS Basic 56h */}
      <div 
        className="flex-shrink-0 bg-luma-surface-0 border-b border-luma-border-200"
        style={{ height: '56px' }}
      >
        <div className="flex items-center justify-between h-full px-4 py-[0px] px-[14px] m-[0px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-luma-text-900 hover:bg-luma-primary-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-semibold text-luma-text-900 flex-1 text-center mx-4">
            {title}
          </h1>
          
          <div className="w-10 h-10" /> {/* Spacer for symmetry */}
        </div>
      </div>

      {/* Body Content */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: '104px' }} // Safe bottom padding for nav
      >
        {empty ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-luma-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-luma-primary-600">📭</span>
              </div>
              <h3 className="font-semibold text-luma-text-900 mb-2">
                {emptyTitle}
              </h3>
              <p className="text-sm text-luma-text-600">
                {emptyDescription}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {children}
          </div>
        )}
      </div>

      {/* Floating Navigation Bar */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
        cartItemCount={3}
      />
    </div>
  );
}