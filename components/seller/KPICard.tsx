import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  size?: 'small' | 'large';
  icon?: React.ReactNode;
  title: string;
  value: string;
  delta?: {
    value: string;
    type: 'up' | 'down' | 'flat';
  };
  suffix?: string;
}

export function KPICard({ 
  size = 'small', 
  icon, 
  title, 
  value, 
  delta, 
  suffix 
}: KPICardProps) {
  const getDeltaIcon = () => {
    switch (delta?.type) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />;
      case 'down':
        return <TrendingDown className="w-3 h-3" />;
      case 'flat':
        return <Minus className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getDeltaColor = () => {
    switch (delta?.type) {
      case 'up':
        return 'text-luma-success-600';
      case 'down':
        return 'text-luma-danger-600';
      case 'flat':
        return 'text-luma-text-600';
      default:
        return 'text-luma-text-600';
    }
  };

  return (
    <div className={`bg-luma-surface-0 rounded-2xl border border-luma-border-200 ${
      size === 'large' ? 'p-6' : 'p-4'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-8 h-8 bg-luma-primary-200 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          )}
          <span className="luma-type-cap-12 text-luma-text-600">{title}</span>
        </div>
        
        {delta && (
          <div className={`flex items-center gap-1 ${getDeltaColor()}`}>
            {getDeltaIcon()}
            <span className="luma-type-micro-10">{delta.value}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className={`${size === 'large' ? 'text-2xl' : 'text-xl'} font-bold text-luma-text-900`}>
          {value}
        </span>
        {suffix && (
          <span className="luma-type-body-14 text-luma-text-600">{suffix}</span>
        )}
      </div>
    </div>
  );
}