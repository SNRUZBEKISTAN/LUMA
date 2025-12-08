import React from 'react';
import { Button } from './ui/button';
import { Plus, Minus } from 'lucide-react';

interface StickyActionBarProps {
  // Layout configuration
  layout: 'oneButton' | 'twoButtons';
  
  // Summary configuration
  summary?: 'none' | 'price';
  summaryTitle?: string;
  summaryValue?: string;
  
  // Button configuration
  primaryLabel: string;
  secondaryLabel?: string;
  
  // State configuration
  state?: 'default' | 'disabled';
  
  // Position configuration
  variant?: 'default' | 'floating';
  bottomOffset?: number; // Distance from bottom in px (for floating variant)
  
  // Event handlers
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
  onAddToCart?: () => void;
  onIncreaseQuantity?: () => void;
  onDecreaseQuantity?: () => void;
  
  // Cart state
  cartQuantity?: number;
  
  // Additional props
  className?: string;
}

export function StickyActionBar({
  layout,
  summary = 'none',
  summaryTitle,
  summaryValue,
  primaryLabel,
  secondaryLabel,
  state = 'default',
  onPrimaryClick,
  onSecondaryClick,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  cartQuantity = 0,
  className = '',
  variant = 'default',
  bottomOffset = 0
}: StickyActionBarProps) {
  const isDisabled = state === 'disabled';
  const hasSummary = summary !== 'none' && summaryValue;
  const [quantityAnimation, setQuantityAnimation] = React.useState(false);
  const [previousQuantity, setPreviousQuantity] = React.useState(cartQuantity);
  const [successAnimation, setSuccessAnimation] = React.useState(false);

  // Trigger animation when quantity changes
  React.useEffect(() => {
    if (cartQuantity !== previousQuantity && cartQuantity > 0) {
      setQuantityAnimation(true);
      
      // Show success animation when item is added (quantity goes from 0 to 1)
      if (previousQuantity === 0 && cartQuantity === 1) {
        setSuccessAnimation(true);
        setTimeout(() => setSuccessAnimation(false), 600);
      }
      
      const timer = setTimeout(() => setQuantityAnimation(false), 300);
      setPreviousQuantity(cartQuantity);
      return () => clearTimeout(timer);
    }
    setPreviousQuantity(cartQuantity);
  }, [cartQuantity, previousQuantity]);
  
  const handlePrimaryClick = () => {
    if (isDisabled) return;
    
    // Light haptic feedback simulation (in real app would use native haptics)
    console.log('Haptic: light');
    onPrimaryClick();
  };
  
  const handleSecondaryClick = () => {
    if (isDisabled || !onSecondaryClick) return;
    onSecondaryClick();
  };

  const handleCartClick = () => {
    if (isDisabled || !onAddToCart) return;
    
    // Light haptic feedback for cart action
    console.log('Haptic: light');
    onAddToCart();
  };

  const handleQuantityIncrease = () => {
    if (isDisabled || !onIncreaseQuantity) return;
    
    console.log('Haptic: light');
    onIncreaseQuantity();
  };

  const handleQuantityDecrease = () => {
    if (isDisabled || !onDecreaseQuantity) return;
    
    console.log('Haptic: light');
    onDecreaseQuantity();
  };

  const containerStyle = variant === 'floating' 
    ? {
        position: 'fixed' as const,
        bottom: `${bottomOffset}px`,
        left: '16px',
        right: '16px',
        zIndex: 40, // Below modals but above content
        margin: 0,
        padding: 0
      }
    : {};

  const outerContainerStyle = variant === 'floating'
    ? {
        margin: 0,
        padding: 0
      }
    : {};

  const innerContainerStyle = variant === 'floating'
    ? {
        height: 'var(--luma-space-sticky-height)',
        borderRadius: 'var(--luma-space-radius-floating)',
        boxShadow: '0 8px 24px rgba(0,0,0,.08)'
      }
    : {
        height: 'var(--luma-space-sticky-height)',
        boxShadow: '0 8px 24px rgba(0,0,0,.08)'
      };

  return (
    <div 
      className={`${variant === 'floating' ? '' : 'fixed bottom-0 left-0 right-0'} z-50 ${className}`}
      style={containerStyle}
    >
      {/* Safe area padding + outer margins */}
      <div 
        className={variant === 'floating' ? '' : 'px-4 pb-3 safe-area-bottom'}
        style={outerContainerStyle}
      >
        {/* Main container with shadow and styling */}
        <div 
          className={`bg-luma-surface-0 ${variant === 'floating' ? '' : 'rounded-luma-lg'} border border-luma-border-200`}
          style={innerContainerStyle}
        >
          {/* Inner content with proper padding and gap */}
          <div className="flex items-end justify-between px-4 pt-6 pb-1 gap-2" style={{ height: '70px' }}>
            {/* Left Summary Section (Optional) */}
            {hasSummary && (
              <div className="flex-shrink-0">
                {summaryTitle && (
                  <div className="text-luma-text-900 mb-1 luma-type-cap-12">
                    {summaryTitle}
                  </div>
                )}
                <div className="text-luma-text-900 luma-type-price-16">
                  {summaryValue}
                </div>
              </div>
            )}
            
            {/* Right Actions Section */}
            <div className={`flex gap-2 ${hasSummary ? 'flex-1 justify-end' : 'flex-1'}`}>
              {/* Cart Quantity Control with Animation */}
              <div className="relative flex-shrink-0 transition-all duration-300 ease-in-out">
                {cartQuantity === 0 ? (
                  /* Add to Cart Button */
                  <Button
                    onClick={handleCartClick}
                    disabled={isDisabled}
                    className={`
                      bg-white border border-luma-border-200 hover:bg-gray-50 text-luma-text-900
                      disabled:bg-white flex items-center justify-center flex-shrink-0
                      transition-all duration-200 ease-in-out animate-scale-in
                      ${isDisabled ? 'opacity-50' : 'hover:scale-105 active:scale-95 hover:shadow-md'}
                    `}
                    style={{
                      height: '36px',
                      width: '48px',
                      borderRadius: '12px',
                      fontSize: '16px'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.4 5.1 16.4H17M17 13V17A2 2 0 0 1 15 19H9A2 2 0 0 1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="9" cy="20" r="1" fill="currentColor"/>
                      <circle cx="20" cy="20" r="1" fill="currentColor"/>
                    </svg>
                  </Button>
                ) : (
                  /* Quantity Control with smooth entrance animation */
                  <div className={`flex items-center bg-white border border-luma-border-200 rounded-xl overflow-hidden flex-shrink-0 animate-cart-to-quantity transition-all duration-200 ease-in-out ${successAnimation ? 'animate-pulse-success' : ''}`} 
                       style={{ height: '36px' }}>
                    {/* Decrease Button */}
                    <Button
                      onClick={handleQuantityDecrease}
                      disabled={isDisabled}
                      className="h-full w-8 rounded-none border-0 bg-transparent hover:bg-luma-primary-600 hover:text-white text-luma-text-900 p-0 flex items-center justify-center transition-colors duration-150 active:scale-90"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    
                    {/* Quantity Display with bounce animation */}
                    <div className="flex items-center justify-center min-w-[32px] h-full px-2 bg-luma-primary-600/5 text-luma-primary-600 transition-all duration-200" 
                         style={{ fontSize: '12px', fontWeight: '600' }}>
                      <span className={`${quantityAnimation ? 'animate-quantity-change' : ''}`}>
                        {cartQuantity}
                      </span>
                    </div>
                    
                    {/* Increase Button */}
                    <Button
                      onClick={handleQuantityIncrease}
                      disabled={isDisabled}
                      className="h-full w-8 rounded-none border-0 bg-transparent hover:bg-luma-primary-600 hover:text-white text-luma-text-900 p-0 flex items-center justify-center transition-colors duration-150 active:scale-90"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Primary Button */}
              <Button
                onClick={handlePrimaryClick}
                disabled={isDisabled}
                className={`
                  bg-luma-primary-600 hover:bg-luma-primary-500 text-white
                  disabled:bg-luma-primary-600 flex-1
                  ${isDisabled ? 'opacity-50' : ''}
                `}
                style={{
                  height: '36px',
                  minWidth: '80px',
                  maxWidth: '140px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '700',
                  lineHeight: '20px'
                }}
              >
                {primaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export default for easier imports
export default StickyActionBar;