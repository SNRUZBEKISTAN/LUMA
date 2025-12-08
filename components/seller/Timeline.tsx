import React from 'react';
import { Check, Clock, Package, Truck, ShoppingBag, User } from 'lucide-react';

interface TimelineStep {
  id: string;
  title: string;
  time?: string;
  status: 'completed' | 'current' | 'pending';
  icon?: 'created' | 'accepted' | 'packed' | 'handed' | 'in_transit' | 'delivered';
}

interface TimelineProps {
  steps: TimelineStep[];
  orientation?: 'horizontal' | 'vertical';
}

export function Timeline({ steps, orientation = 'vertical' }: TimelineProps) {
  const getIcon = (icon?: string, status?: string) => {
    const iconSize = "w-4 h-4";
    
    if (status === 'completed') {
      return <Check className={`${iconSize} text-white`} />;
    }
    
    if (status === 'current') {
      return <Clock className={`${iconSize} text-white`} />;
    }

    switch (icon) {
      case 'created':
        return <ShoppingBag className={`${iconSize} text-luma-text-600`} />;
      case 'accepted':
        return <Check className={`${iconSize} text-luma-text-600`} />;
      case 'packed':
        return <Package className={`${iconSize} text-luma-text-600`} />;
      case 'handed':
        return <Truck className={`${iconSize} text-luma-text-600`} />;
      case 'in_transit':
        return <Truck className={`${iconSize} text-luma-text-600`} />;
      case 'delivered':
        return <User className={`${iconSize} text-luma-text-600`} />;
      default:
        return <div className={`w-2 h-2 rounded-full bg-luma-text-600`}></div>;
    }
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-luma-success-600 border-luma-success-600',
          line: 'bg-luma-success-600',
          text: 'text-luma-text-900',
          time: 'text-luma-text-600'
        };
      case 'current':
        return {
          circle: 'bg-luma-primary-600 border-luma-primary-600',
          line: 'bg-luma-border-200',
          text: 'text-luma-text-900',
          time: 'text-luma-primary-600'
        };
      case 'pending':
        return {
          circle: 'bg-luma-border-200 border-luma-border-200',
          line: 'bg-luma-border-200',
          text: 'text-luma-text-600',
          time: 'text-luma-text-600'
        };
      default:
        return {
          circle: 'bg-luma-border-200 border-luma-border-200',
          line: 'bg-luma-border-200',
          text: 'text-luma-text-600',
          time: 'text-luma-text-600'
        };
    }
  };

  if (orientation === 'horizontal') {
    return (
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const styles = getStepStyles(step.status);
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${styles.circle}`}>
                  {getIcon(step.icon, step.status)}
                </div>
                
                {/* Text */}
                <div className="text-center mt-2">
                  <p className={`luma-type-cap-12 ${styles.text}`}>
                    {step.title}
                  </p>
                  {step.time && (
                    <p className={`luma-type-micro-10 mt-1 ${styles.time}`}>
                      {step.time}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Connecting Line */}
              {!isLast && (
                <div className={`flex-1 h-0.5 mx-2 ${styles.line}`}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const styles = getStepStyles(step.status);
        const isLast = index === steps.length - 1;
        
        return (
          <div key={step.id} className="flex items-start gap-4">
            {/* Circle with connecting line */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${styles.circle} flex-shrink-0`}>
                {getIcon(step.icon, step.status)}
              </div>
              
              {/* Vertical line */}
              {!isLast && (
                <div className={`w-0.5 h-8 mt-2 ${styles.line}`}></div>
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1.5">
              <p className={`luma-type-title-14 ${styles.text}`}>
                {step.title}
              </p>
              {step.time && (
                <p className={`luma-type-body-14 mt-1 ${styles.time}`}>
                  {step.time}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}