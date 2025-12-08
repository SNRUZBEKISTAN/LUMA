import { useState, useEffect, useCallback } from 'react';
import * as api from '../utils/api';
import { Product } from '../types/app';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartShop {
  storeId: string;
  storeName: string;
  items: CartItem[];
}

export interface Cart {
  shops: CartShop[];
}

/**
 * Hook for managing shopping cart
 */
export function useCart() {
  const [cart, setCart] = useState<Cart>({ shops: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load cart from backend
  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await api.getCart();
      setCart(cartData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load cart'));
      console.error('Load cart error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add item to cart
  const addItem = useCallback(async (
    product: Product,
    quantity: number = 1,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    try {
      const newCart = { ...cart };
      
      // Find or create shop
      let shop = newCart.shops.find(s => s.storeId === product.storeId);
      if (!shop) {
        shop = {
          storeId: product.storeId,
          storeName: product.storeName || 'Unknown Store',
          items: []
        };
        newCart.shops.push(shop);
      }
      
      // Find or create item
      const existingItem = shop.items.find(
        i => i.product.id === product.id && 
             i.selectedSize === selectedSize && 
             i.selectedColor === selectedColor
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        shop.items.push({
          product,
          quantity,
          selectedSize,
          selectedColor
        });
      }
      
      // Update backend
      const updatedCart = await api.updateCart(newCart);
      setCart(updatedCart);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add item'));
      console.error('Add to cart error:', err);
      return false;
    }
  }, [cart]);

  // Remove item from cart
  const removeItem = useCallback(async (
    productId: string,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    try {
      const newCart = { ...cart };
      
      for (const shop of newCart.shops) {
        shop.items = shop.items.filter(
          i => !(i.product.id === productId && 
                 i.selectedSize === selectedSize && 
                 i.selectedColor === selectedColor)
        );
      }
      
      // Remove empty shops
      newCart.shops = newCart.shops.filter(s => s.items.length > 0);
      
      const updatedCart = await api.updateCart(newCart);
      setCart(updatedCart);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove item'));
      console.error('Remove from cart error:', err);
      return false;
    }
  }, [cart]);

  // Update item quantity
  const updateQuantity = useCallback(async (
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    if (quantity <= 0) {
      return removeItem(productId, selectedSize, selectedColor);
    }
    
    try {
      const newCart = { ...cart };
      
      for (const shop of newCart.shops) {
        const item = shop.items.find(
          i => i.product.id === productId && 
               i.selectedSize === selectedSize && 
               i.selectedColor === selectedColor
        );
        
        if (item) {
          item.quantity = quantity;
          break;
        }
      }
      
      const updatedCart = await api.updateCart(newCart);
      setCart(updatedCart);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update quantity'));
      console.error('Update quantity error:', err);
      return false;
    }
  }, [cart, removeItem]);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    try {
      await api.clearCart();
      setCart({ shops: [] });
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to clear cart'));
      console.error('Clear cart error:', err);
      return false;
    }
  }, []);

  // Calculate total items
  const getTotalItems = useCallback(() => {
    return cart.shops.reduce(
      (total, shop) => total + shop.items.reduce((sum, item) => sum + item.quantity, 0),
      0
    );
  }, [cart]);

  // Calculate total price
  const getTotalPrice = useCallback(() => {
    return cart.shops.reduce(
      (total, shop) => total + shop.items.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      ),
      0
    );
  }, [cart]);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    cart,
    loading,
    error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    reload: loadCart
  };
}
