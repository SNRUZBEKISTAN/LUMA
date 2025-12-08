export type Screen = 'splash' | 'auth' | 'register' | 'otp' | 'buyerHome' | 'sellerHome' | 'feed' | 'cart' | 'checkout' | 'productDetail' | 'profile' | 'search' | 'notifications' | 'store' | 'orders' | 'favorites' | 'messages' | 'notifSettings' | 'payments' | 'addresses' | 'security' | 'help' | 'profileEdit' | 'sellerDashboard' | 'sellerOrders' | 'sellerInventory' | 'sellerSettings' | 'sellerNotifications' | 'productEditor' | 'orderDetail' | 'sellerAnalytics' | 'promoObjective' | 'promoPlacement' | 'promoAudience' | 'promoPricing' | 'promoType' | 'promoPricingEnhanced' | 'promoBudget' | 'storeProfile' | 'aiLook' | 'lookConfig' | 'lookDetail' | 'modernCardDemo' | 'dynamicBackgroundDemo' | 'photoSearchDemo';

export type UserRole = 'buyer' | 'seller' | null;

export interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  sellerId?: string;
  storeName?: string;
  address?: string;
  businessInfo?: string;
}

export interface PromoData {
  type?: 'product' | 'store';
  objective?: string;
  placements?: string[];
  audience?: any;
  pricing?: any;
  package?: string;
  price?: number;
  period?: { start: string; end: string; days: number };
  dailyBudget?: number;
  totalBudget?: number;
}

export interface NavigationHistoryEntry {
  screen: Screen;
  activeTab: string;
  timestamp: number;
}

export interface AppState {
  currentScreen: Screen;
  activeTab: string;
  selectedStoreId: string;
  cartItemCount: number;
  selectedOrderId: string | null;
  user: User | null;
  phoneNumber: string;
  selectedRole: UserRole;
  sellerId: string;
  registerStep: number;
  promoData: PromoData;
  selectedLookId: string;
  navigationHistory: NavigationHistoryEntry[];
}

export interface AppActions {
  setCurrentScreen: (screen: Screen) => void;
  setActiveTab: (tab: string) => void;
  setSelectedStoreId: (id: string) => void;
  setCartItemCount: (count: number) => void;
  setSelectedOrderId: (id: string | null) => void;
  setUser: (user: User | null) => void;
  setPhoneNumber: (phone: string) => void;
  setSelectedRole: (role: UserRole) => void;
  setSellerId: (id: string) => void;
  setRegisterStep: (step: number) => void;
  setPromoData: (data: PromoData | ((prev: PromoData) => PromoData)) => void;
  addToNavigationHistory: (screen: Screen, activeTab: string) => void;
  clearNavigationHistory: () => void;
}