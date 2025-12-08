import { apiCall, supabase } from './supabase/client';
import { Product, Shop, Order, User } from '../types/app';

// ============================================
// AUTHENTICATION API
// ============================================

export async function signUp(data: {
  email: string;
  password: string;
  name: string;
  role: 'buyer' | 'seller';
  phone?: string;
}) {
  try {
    const response = await apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to sign up');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await apiCall('/auth/profile');
    
    if (!response.ok) {
      return null;
    }
    
    const { user } = await response.json();
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// ============================================
// SHOPS API
// ============================================

export async function getShops(): Promise<Shop[]> {
  try {
    const response = await apiCall('/shops');
    
    if (!response.ok) {
      throw new Error('Failed to fetch shops');
    }
    
    const { shops } = await response.json();
    return shops;
  } catch (error) {
    console.error('Get shops error:', error);
    return [];
  }
}

export async function getShop(shopId: string): Promise<Shop | null> {
  try {
    const response = await apiCall(`/shops/${shopId}`);
    
    if (!response.ok) {
      return null;
    }
    
    const { shop } = await response.json();
    return shop;
  } catch (error) {
    console.error('Get shop error:', error);
    return null;
  }
}

export async function createShop(shopData: Partial<Shop>): Promise<Shop> {
  try {
    const response = await apiCall('/shops', {
      method: 'POST',
      body: JSON.stringify(shopData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create shop');
    }
    
    const { shop } = await response.json();
    return shop;
  } catch (error) {
    console.error('Create shop error:', error);
    throw error;
  }
}

// ============================================
// PRODUCTS API
// ============================================

export async function getProducts(filters?: {
  shopId?: string;
  categoryId?: string;
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.shopId) params.append('shopId', filters.shopId);
    if (filters?.categoryId) params.append('categoryId', filters.categoryId);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    const response = await apiCall(`/products${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.error('Get products error:', error);
    return [];
  }
}

export async function getProduct(productId: string): Promise<Product | null> {
  try {
    const response = await apiCall(`/products/${productId}`);
    
    if (!response.ok) {
      return null;
    }
    
    const { product } = await response.json();
    return product;
  } catch (error) {
    console.error('Get product error:', error);
    return null;
  }
}

export async function createProduct(productData: Partial<Product>): Promise<Product> {
  try {
    const response = await apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create product');
    }
    
    const { product } = await response.json();
    return product;
  } catch (error) {
    console.error('Create product error:', error);
    throw error;
  }
}

export async function updateProduct(
  productId: string,
  updates: Partial<Product>
): Promise<Product> {
  try {
    const response = await apiCall(`/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update product');
    }
    
    const { product } = await response.json();
    return product;
  } catch (error) {
    console.error('Update product error:', error);
    throw error;
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    const response = await apiCall(`/products/${productId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete product');
    }
  } catch (error) {
    console.error('Delete product error:', error);
    throw error;
  }
}

// ============================================
// CART API
// ============================================

export async function getCart() {
  try {
    const response = await apiCall('/cart');
    
    if (!response.ok) {
      return { shops: [] };
    }
    
    const { cart } = await response.json();
    return cart;
  } catch (error) {
    console.error('Get cart error:', error);
    return { shops: [] };
  }
}

export async function updateCart(cartData: any) {
  try {
    const response = await apiCall('/cart', {
      method: 'POST',
      body: JSON.stringify(cartData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update cart');
    }
    
    const { cart } = await response.json();
    return cart;
  } catch (error) {
    console.error('Update cart error:', error);
    throw error;
  }
}

export async function clearCart() {
  try {
    const response = await apiCall('/cart', {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to clear cart');
    }
  } catch (error) {
    console.error('Clear cart error:', error);
    throw error;
  }
}

// ============================================
// ORDERS API
// ============================================

export async function createOrder(orderData: any): Promise<Order> {
  try {
    const response = await apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create order');
    }
    
    const { order } = await response.json();
    return order;
  } catch (error) {
    console.error('Create order error:', error);
    throw error;
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await apiCall('/orders');
    
    if (!response.ok) {
      return [];
    }
    
    const { orders } = await response.json();
    return orders;
  } catch (error) {
    console.error('Get orders error:', error);
    return [];
  }
}

export async function getSellerOrders(storeId: string): Promise<Order[]> {
  try {
    const response = await apiCall(`/seller/orders?storeId=${storeId}`);
    
    if (!response.ok) {
      return [];
    }
    
    const { orders } = await response.json();
    return orders;
  } catch (error) {
    console.error('Get seller orders error:', error);
    return [];
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  note?: string
): Promise<Order> {
  try {
    const response = await apiCall(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, note }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update order status');
    }
    
    const { order } = await response.json();
    return order;
  } catch (error) {
    console.error('Update order status error:', error);
    throw error;
  }
}

// ============================================
// FAVORITES API
// ============================================

export async function getFavorites() {
  try {
    const response = await apiCall('/favorites');
    
    if (!response.ok) {
      return { productIds: [] };
    }
    
    const { favorites } = await response.json();
    return favorites;
  } catch (error) {
    console.error('Get favorites error:', error);
    return { productIds: [] };
  }
}

export async function addToFavorites(productId: string) {
  try {
    const response = await apiCall(`/favorites/${productId}`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add to favorites');
    }
    
    const { favorites } = await response.json();
    return favorites;
  } catch (error) {
    console.error('Add to favorites error:', error);
    throw error;
  }
}

export async function removeFromFavorites(productId: string) {
  try {
    const response = await apiCall(`/favorites/${productId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to remove from favorites');
    }
    
    const { favorites } = await response.json();
    return favorites;
  } catch (error) {
    console.error('Remove from favorites error:', error);
    throw error;
  }
}

// ============================================
// NOTIFICATIONS API
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: string;
  readAt?: string;
}

export async function getNotifications(): Promise<Notification[]> {
  try {
    const response = await apiCall('/notifications');
    
    if (!response.ok) {
      return [];
    }
    
    const { notifications } = await response.json();
    return notifications;
  } catch (error) {
    console.error('Get notifications error:', error);
    return [];
  }
}

export async function createNotification(data: {
  userId?: string;
  type: string;
  title: string;
  message: string;
  data?: any;
}): Promise<Notification> {
  try {
    const response = await apiCall('/notifications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create notification');
    }
    
    const { notification } = await response.json();
    return notification;
  } catch (error) {
    console.error('Create notification error:', error);
    throw error;
  }
}

export async function markNotificationAsRead(notificationId: string): Promise<Notification> {
  try {
    const response = await apiCall(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to mark notification as read');
    }
    
    const { notification } = await response.json();
    return notification;
  } catch (error) {
    console.error('Mark notification as read error:', error);
    throw error;
  }
}

export async function markAllNotificationsAsRead(): Promise<void> {
  try {
    const response = await apiCall('/notifications/read-all', {
      method: 'PUT',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to mark all notifications as read');
    }
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    throw error;
  }
}

export async function deleteNotification(notificationId: string): Promise<void> {
  try {
    const response = await apiCall(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete notification');
    }
  } catch (error) {
    console.error('Delete notification error:', error);
    throw error;
  }
}