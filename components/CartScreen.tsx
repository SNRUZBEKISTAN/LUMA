import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FloatingBottomNav } from './FloatingBottomNav';
import { StickyActionBar } from './StickyActionBar';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartShop } from '../types/app';

interface CartScreenProps {
  onBack: () => void;
  onCheckout: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  cart?: { shops: CartShop[] };
  cartItemCount?: number;
  onChangeCartQty?: (productId: string, storeId: string, delta: number) => void;
  onRemoveFromCart?: (productId: string, storeId: string) => void;
}

export function CartScreen({ 
  onBack, 
  onCheckout, 
  onTabChange, 
  activeTab, 
  cart,
  cartItemCount = 0,
  onChangeCartQty,
  onRemoveFromCart
}: CartScreenProps) {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} сум`;
  };

  const calculateShopSubtotal = (shop: CartShop) => {
    return shop.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotalPrice = () => {
    if (!cart?.shops.length) return 0;
    return cart.shops.reduce((total, shop) => {
      const subtotal = calculateShopSubtotal(shop);
      return total + subtotal + (subtotal >= (shop.freeDeliveryThreshold || 100000) ? 0 : shop.deliveryFee);
    }, 0);
  };

  const handleQuantityChange = (productId: string, storeId: string, delta: number) => {
    onChangeCartQty?.(productId, storeId, delta);
  };

  const handleRemoveItem = (productId: string, storeId: string) => {
    onRemoveFromCart?.(productId, storeId);
  };

  // Если корзина пустая, показываем пустое состояние
  if (!cart?.shops?.length || cart.shops.every(shop => shop.items.length === 0)) {
    return (
      <div className="h-screen bg-luma-background flex flex-col">
        {/* Header */}
        <div className="px-4 pt-12 pb-4 bg-white border-b border-luma-border-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 hover:bg-luma-primary-200/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-luma-text-900" />
            </button>
            <h1 className="font-semibold text-luma-text-900">Корзина</h1>
            <div className="w-9 h-9" /> {/* Spacer */}
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-24 h-24 bg-luma-primary-200/30 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-luma-primary-600" />
          </div>
          <h2 className="text-xl font-semibold text-luma-text-900 mb-2">Корзина пуста</h2>
          <p className="text-luma-text-600 text-center mb-8">
            Добавьте товары в корзину, чтобы продолжить покупки
          </p>
          <Button
            onClick={() => onTabChange('home')}
            className="bg-luma-primary-600 hover:bg-luma-primary-500 text-white px-8"
          >
            К покупкам
          </Button>
        </div>

        {/* Bottom Navigation */}
        <div className="relative z-30">
          <FloatingBottomNav
            activeTab={activeTab}
            onTabChange={onTabChange}
            cartItemCount={cartItemCount}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-luma-background flex flex-col">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 bg-white border-b border-luma-border-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 hover:bg-luma-primary-200/50 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-luma-text-900" />
          </button>
          <h1 className="font-semibold text-luma-text-900">
            Корзина {cartItemCount > 0 && `(${cartItemCount})`}
          </h1>
          <div className="w-9 h-9" /> {/* Spacer */}
        </div>
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-4 py-4 space-y-4">
          {cart.shops.map((shop) => {
            const subtotal = calculateShopSubtotal(shop);
            const freeDelivery = subtotal >= (shop.freeDeliveryThreshold || 100000);
            
            return (
              <Card key={shop.storeId} className="p-4 bg-white border border-luma-border-200">
                {/* Store Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-luma-border-200">
                  <div className="w-10 h-10 bg-luma-primary-200/30 rounded-full flex items-center justify-center">
                    <span className="text-sm">🏪</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-luma-text-900">{shop.storeName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {freeDelivery ? (
                        <Badge variant="secondary" className="bg-luma-success-600/10 text-luma-success-600 border-luma-success-600/20">
                          Бесплатная доставка
                        </Badge>
                      ) : (
                        <span className="text-xs text-luma-text-600">
                          Доставка: {formatPrice(shop.deliveryFee)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {shop.items.map((item) => {
                    // Create unique key combining productId with variant info
                    const itemKey = `${item.productId}-${item.size || 'no-size'}-${JSON.stringify(item.color) || 'no-color'}`;
                    return (
                    <div key={itemKey} className="flex gap-3">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-luma-primary-200/20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-luma-text-900 line-clamp-2 mb-1">
                          {item.name}
                        </h4>
                        
                        {/* Цвет и размер под названием товара */}
                        <div className="flex items-center gap-2 mb-2">
                          {item.size && (
                            <span className="text-xs bg-luma-primary-200/20 text-luma-text-600 px-2 py-1 rounded">
                              {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="text-xs bg-luma-primary-200/20 text-luma-text-600 px-2 py-1 rounded">
                              {typeof item.color === 'string' ? item.color : item.color.name || 'Цвет'}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-luma-primary-600">
                            {formatPrice(item.price)}
                          </span>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.productId, shop.storeId, -1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 rounded-full border border-luma-border-200 flex items-center justify-center hover:bg-luma-primary-200/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.productId, shop.storeId, 1)}
                              className="w-8 h-8 rounded-full border border-luma-border-200 flex items-center justify-center hover:bg-luma-primary-200/20 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleRemoveItem(item.productId, shop.storeId)}
                              className="ml-2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 text-red-500 transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>

                {/* Shop Summary */}
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-luma-text-600">Товары</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-luma-text-600">Доставка</span>
                    <span className={`font-medium ${freeDelivery ? 'text-luma-success-600' : ''}`}>
                      {freeDelivery ? 'Бесплатно' : formatPrice(shop.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t border-luma-border-200">
                    <span>Итого</span>
                    <span className="text-luma-primary-600">
                      {formatPrice(subtotal + (freeDelivery ? 0 : shop.deliveryFee))}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dynamic Hover Action Bar */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white border-t border-luma-border-200 py-3 group hover:py-4 transition-all duration-300 hover:shadow-lg m-[0px] py-[20px] px-[14px]">
        {/* Основная область с ценой и кнопкой */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="group-hover:scale-105 transition-transform duration-300">
              <p className="text-xs text-luma-text-600 group-hover:text-luma-primary-600 transition-colors">
                Итого к оплате
              </p>
              <p className="text-lg font-bold text-luma-text-900 group-hover:text-luma-primary-600 transition-colors">
                {formatPrice(calculateTotalPrice())}
              </p>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="bg-gradient-to-r from-luma-primary-600 to-luma-primary-500 hover:from-luma-primary-500 hover:to-luma-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Оформить заказ
          </button>
        </div>
        
        {/* Дополнительная информация при hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between text-xs text-luma-text-600 pt-2 border-t border-luma-border-200">
            <span>Товары ({cartItemCount})</span>
            <span>{formatPrice(cart.shops.reduce((total, shop) => total + calculateShopSubtotal(shop), 0))}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-luma-text-600 mt-1">
            <span>Доставка</span>
            <span>
              {cart.shops.reduce((total, shop) => {
                const subtotal = calculateShopSubtotal(shop);
                return total + (subtotal >= (shop.freeDeliveryThreshold || 100000) ? 0 : shop.deliveryFee);
              }, 0) === 0 ? 'Бесплатно' : formatPrice(cart.shops.reduce((total, shop) => {
                const subtotal = calculateShopSubtotal(shop);
                return total + (subtotal >= (shop.freeDeliveryThreshold || 100000) ? 0 : shop.deliveryFee);
              }, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-30">
        <FloatingBottomNav
          activeTab={activeTab}
          onTabChange={onTabChange}
          cartItemCount={cartItemCount}
        />
      </div>
    </div>
  );
}