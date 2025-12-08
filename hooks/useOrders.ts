import { useState, useEffect, useCallback } from 'react';
import * as api from '../utils/api';
import { Order } from '../types/app';

/**
 * Hook for managing orders
 */
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load orders from backend
  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load orders'));
      console.error('Load orders error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new order
  const createOrder = useCallback(async (orderData: any) => {
    try {
      const newOrder = await api.createOrder(orderData);
      setOrders(prev => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create order'));
      console.error('Create order error:', err);
      throw err;
    }
  }, []);

  // Get order by ID
  const getOrderById = useCallback((orderId: string) => {
    return orders.find(o => o.id === orderId);
  }, [orders]);

  // Get orders by status
  const getOrdersByStatus = useCallback((status: string) => {
    return orders.filter(o => o.status === status);
  }, [orders]);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    error,
    createOrder,
    getOrderById,
    getOrdersByStatus,
    reload: loadOrders
  };
}

/**
 * Hook for managing seller orders
 */
export function useSellerOrders(storeId: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load seller orders from backend
  const loadOrders = useCallback(async () => {
    if (!storeId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await api.getSellerOrders(storeId);
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load seller orders'));
      console.error('Load seller orders error:', err);
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  // Update order status
  const updateOrderStatus = useCallback(async (
    orderId: string,
    status: string,
    note?: string
  ) => {
    try {
      const updatedOrder = await api.updateOrderStatus(orderId, status, note);
      setOrders(prev => 
        prev.map(o => o.id === orderId ? updatedOrder : o)
      );
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update order status'));
      console.error('Update order status error:', err);
      throw err;
    }
  }, []);

  // Get orders by status
  const getOrdersByStatus = useCallback((status: string) => {
    return orders.filter(o => o.status === status);
  }, [orders]);

  // Load orders on mount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
    getOrdersByStatus,
    reload: loadOrders
  };
}
