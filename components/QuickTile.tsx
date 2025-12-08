import React from 'react';

interface QuickTileProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onTap: (id: string) => void;
}

export function QuickTile({ id, label, icon, onTap }: QuickTileProps) {
  const handleTap = () => {
    onTap(id);
  };

  return (
    <button
      onClick={handleTap}
      className="flex flex-col items-center transition-all hover:scale-105"
      style={{ 
        minHeight: '60px',
        width: '44px'
      }}
    >
      {/* Tile */}
      <div
        className="bg-luma-surface-0 shadow-luma-soft border border-luma-border-200 flex items-center justify-center hover:bg-luma-primary-200/24 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 transition-all"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px'
        }}
      >
        <div className="text-luma-primary-600" style={{ fontSize: '20px' }}>
          {icon}
        </div>
      </div>
      
      {/* Label */}
      <span 
        className="text-luma-text-600 text-center line-clamp-1 mt-1"
        style={{ 
          fontSize: '10px',
          lineHeight: '12px',
          fontWeight: '400',
          width: '44px'
        }}
      >
        {label}
      </span>
    </button>
  );
}