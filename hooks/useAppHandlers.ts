import { useCallback } from 'react';
import { UserRole, AppState, AppActions } from '../types/app';

export function useAppHandlers(state: AppState, actions: AppActions, navigation: any) {
  const { user, selectedRole } = state;
  const { setCurrentScreen, setActiveTab, setUser, setPhoneNumber, setSelectedRole, setSellerId, setRegisterStep, setSelectedStoreId, setSelectedProductId, setPromoData, placeOrder, setOrderStatusSeller, markNotificationRead } = actions;
  const { handleTabChange, navigateToScreen, navigateToTracking } = navigation;

  // Auth handlers
  const handleSplashComplete = useCallback(() => {
    setCurrentScreen('auth');
  }, [setCurrentScreen]);

  const handleAuthComplete = useCallback((userData: any) => {
    setUser(userData);
    if (userData.role === 'buyer') {
      setCurrentScreen('buyerHome');
      setActiveTab('home');
    } else {
      setCurrentScreen('sellerDashboard');
      setActiveTab('dashboard');
    }
  }, [setUser, setCurrentScreen, setActiveTab]);

  const handleRegister = useCallback(() => {
    setRegisterStep(1);
    setCurrentScreen('register');
  }, [setRegisterStep, setCurrentScreen]);

  const handleOTPRequired = useCallback((phone: string, role: UserRole, sellerIdParam?: string) => {
    setPhoneNumber(phone);
    setSelectedRole(role);
    setSellerId(sellerIdParam || '');
    setCurrentScreen('otp');
  }, [setPhoneNumber, setSelectedRole, setSellerId, setCurrentScreen]);

  const handleOTPVerify = useCallback((code: string) => {
    console.log('OTP verified:', code);
    setRegisterStep(2);
    setCurrentScreen('register');
  }, [setRegisterStep, setCurrentScreen]);

  const handleRegisterComplete = useCallback((userData: any) => {
    setUser(userData);
    setRegisterStep(1);
    if (userData.role === 'buyer') {
      setCurrentScreen('buyerHome');
      setActiveTab('home');
    } else {
      setCurrentScreen('sellerDashboard');
      setActiveTab('dashboard');
    }
  }, [setUser, setRegisterStep, setCurrentScreen, setActiveTab]);

  const handleForgotPassword = useCallback(() => {
    console.log('Forgot password clicked');
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentScreen('auth');
    setUser(null);
    setActiveTab('home');
  }, [setCurrentScreen, setUser, setActiveTab]);

  // Product handlers
  const handleProductClick = useCallback((productId: string) => {
    console.log('Product clicked:', productId);
    setSelectedProductId(productId);
    navigateToScreen('productDetail');
  }, [setSelectedProductId, navigateToScreen]);

  const handleCartClick = useCallback(() => {
    handleTabChange('cart');
  }, [handleTabChange]);

  const handleAddToCart = useCallback((productId: string) => {
    console.log('Added to cart:', productId);
    // TODO: Implement actual add to cart logic
    // This handler is used for simplified contexts where we only have productId
    // For full product objects, use actions.addToCart directly
  }, []);

  const handleCheckout = useCallback(() => {
    navigateToScreen('checkout');
  }, [navigateToScreen]);

  // Заказы и трекинг
  const handlePlaceOrder = useCallback((address: string) => {
    const result = placeOrder({ address });
    console.log('Заказ создан:', result);
    // Показываем модальное окно успеха или переходим к списку заказов
    setTimeout(() => {
      navigateToScreen('orders');
    }, 1000);
    return result;
  }, [placeOrder, navigateToScreen]);

  const handleOpenTracking = useCallback((orderId: string) => {
    navigateToTracking(orderId);
  }, [navigateToTracking]);

  // Продавец: действия с заказами
  const handleSellerConfirm = useCallback((orderId: string) => {
    setOrderStatusSeller(orderId, 'prep');
  }, [setOrderStatusSeller]);

  const handleSellerShip = useCallback((orderId: string) => {
    setOrderStatusSeller(orderId, 'shipped');
  }, [setOrderStatusSeller]);

  const handleSellerDeliver = useCallback((orderId: string) => {
    setOrderStatusSeller(orderId, 'delivered');
  }, [setOrderStatusSeller]);

  const handleSellerCancel = useCallback((orderId: string) => {
    setOrderStatusSeller(orderId, 'cancel');
  }, [setOrderStatusSeller]);

  const handleSellerReturn = useCallback((orderId: string) => {
    setOrderStatusSeller(orderId, 'return');
  }, [setOrderStatusSeller]);

  // Уведомления
  const handleMarkNotificationRead = useCallback((id: string) => {
    markNotificationRead(id);
  }, [markNotificationRead]);

  // Store handlers
  const handleStoreClick = useCallback((storeId: string) => {
    console.log('Store clicked:', storeId);
    setSelectedStoreId(storeId);
    navigateToScreen('store');
  }, [setSelectedStoreId, navigateToScreen]);

  // Profile navigation handlers
  const handleOpenOrders = useCallback(() => navigateToScreen('orders'), [navigateToScreen]);
  const handleOpenFavorites = useCallback(() => navigateToScreen('favorites'), [navigateToScreen]);
  const handleOpenMessages = useCallback(() => navigateToScreen('messages'), [navigateToScreen]);
  const handleOpenNotifSettings = useCallback(() => navigateToScreen('notifSettings'), [navigateToScreen]);
  const handleOpenPayments = useCallback(() => navigateToScreen('payments'), [navigateToScreen]);
  const handleOpenAddresses = useCallback(() => navigateToScreen('addresses'), [navigateToScreen]);
  const handleOpenSecurity = useCallback(() => navigateToScreen('security'), [navigateToScreen]);
  const handleOpenHelp = useCallback(() => navigateToScreen('help'), [navigateToScreen]);
  const handleEditProfile = useCallback(() => navigateToScreen('profileEdit'), [navigateToScreen]);

  // Search handlers
  const handleOpenSearch = useCallback(() => {
    navigateToScreen('search');
  }, [navigateToScreen]);

  // Notifications
  const handleNotificationsClick = useCallback(() => {
    if (user?.role === 'seller' || selectedRole === 'seller') {
      navigateToScreen('sellerNotifications');
    } else {
      navigateToScreen('notifications');
    }
  }, [user?.role, selectedRole, navigateToScreen]);

  // AI Look
  const handleAILookClick = useCallback(() => {
    navigateToScreen('aiLook'); // Используем новую версию AILookScreenV2
  }, [navigateToScreen]);

  const handleLookDetailClick = useCallback((lookId: string) => {
    console.log('Look detail clicked:', lookId);
    actions.setSelectedLookId(lookId);
    navigateToScreen('lookDetailV2');
  }, [navigateToScreen, actions]);

  // Promo flow handlers
  const handleStartPromo = useCallback((type: 'product' | 'store') => {
    setPromoData({ type });
    navigateToScreen('promoType');
  }, [setPromoData, navigateToScreen]);

  const handlePromoTypeNext = useCallback((type: 'product' | 'store') => {
    setPromoData(prev => ({ ...prev, type }));
    navigateToScreen('promoPricingEnhanced');
  }, [setPromoData, navigateToScreen]);

  const handlePromoPricingEnhancedNext = useCallback((data: { objective: string; package: string; price: number }) => {
    setPromoData(prev => ({ ...prev, ...data }));
    navigateToScreen('promoBudget');
  }, [setPromoData, navigateToScreen]);

  const handlePromoBudgetNext = useCallback((data: { period: { start: string; end: string; days: number }; dailyBudget: number; totalBudget: number }) => {
    setPromoData(prev => ({ ...prev, ...data }));
    console.log('Complete promo data:', { ...state.promoData, ...data });
    alert('Промо-кампания настроена! (переход к экрану оплаты в разработке)');
    navigateToScreen('sellerAnalytics');
    setPromoData({});
  }, [setPromoData, navigateToScreen, state.promoData]);

  // Helper function for current screen tab
  const getActiveTabForCurrentScreen = useCallback(() => {
    if (state.currentScreen === 'home') return 'home';
    if (state.currentScreen === 'feed') return 'feed';
    if (state.currentScreen === 'cart') return 'cart';
    if (state.currentScreen === 'profile') return 'profile';
    if (state.currentScreen === 'notifications') return 'none';
    return 'none';
  }, [state.currentScreen]);

  return {
    // Auth
    handleSplashComplete,
    handleAuthComplete,
    handleRegister,
    handleOTPRequired,
    handleOTPVerify,
    handleRegisterComplete,
    handleForgotPassword,
    handleLogout,
    
    // Products
    handleProductClick,
    handleCartClick,
    handleAddToCart,
    handleCheckout,
    
    // Store
    handleStoreClick,
    
    // Profile
    handleOpenOrders,
    handleOpenFavorites,
    handleOpenMessages,
    handleOpenNotifSettings,
    handleOpenPayments,
    handleOpenAddresses,
    handleOpenSecurity,
    handleOpenHelp,
    handleEditProfile,
    
    // Search
    handleOpenSearch,
    
    // Notifications
    handleNotificationsClick,
    handleMarkNotificationRead,
    
    // AI Look
    handleAILookClick,
    handleLookDetailClick,
    
    // Promo
    handleStartPromo,
    handlePromoTypeNext,
    handlePromoPricingEnhancedNext,
    handlePromoBudgetNext,
    
    // Orders and Tracking
    handlePlaceOrder,
    handleOpenTracking,
    handleSellerConfirm,
    handleSellerShip,
    handleSellerDeliver,
    handleSellerCancel,
    handleSellerReturn,
    
    // Helpers
    getActiveTabForCurrentScreen
  };
}