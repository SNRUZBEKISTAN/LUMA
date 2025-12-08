import { useCallback } from 'react';
import { Screen, UserRole, AppState, AppActions } from '../types/app';

export function useAppNavigation(state: AppState, actions: AppActions) {
  const { currentScreen, activeTab, user, registerStep, navigationHistory } = state;
  const { setCurrentScreen, setActiveTab, setSelectedOrderId, setPromoData, addToNavigationHistory } = actions;

  const navigateToScreen = useCallback((screen: Screen, tab?: string) => {
    // Save current screen to history before navigating
    if (currentScreen !== screen) {
      console.log('📱 Navigate: Adding to history', { screen: currentScreen, activeTab });
      addToNavigationHistory(currentScreen, activeTab);
    }
    
    setCurrentScreen(screen);
    if (tab) {
      setActiveTab(tab);
    }
  }, [currentScreen, activeTab, addToNavigationHistory, setCurrentScreen, setActiveTab]);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    
    // Handle seller tabs
    if (user?.role === 'seller') {
      switch (tab) {
        case 'dashboard':
          navigateToScreen('sellerDashboard', tab);
          break;
        case 'inventory':
          navigateToScreen('sellerInventory', tab);
          break;
        case 'orders':
          navigateToScreen('sellerOrders', tab);
          break;
        case 'analytics':
          navigateToScreen('sellerAnalytics', tab);
          break;
        case 'profile':
          navigateToScreen('sellerSettings', tab);
          break;
      }
    } else {
      // Handle buyer tabs
      switch (tab) {
        case 'home':
          navigateToScreen('buyerHome', tab);
          break;
        case 'feed':
          navigateToScreen('feed', tab);
          break;
        case 'cart':
          navigateToScreen('cart', tab);
          break;
        case 'profile':
          navigateToScreen('profile', tab);
          break;
      }
    }
  }, [user?.role, setActiveTab, navigateToScreen]);

  const handleBackToPrevious = useCallback(() => {
    // Use navigation history if available
    if (navigationHistory.length > 0) {
      const previousEntry = navigationHistory[navigationHistory.length - 1];
      console.log('📱 Back: Using navigation history', previousEntry);
      
      // Remove the current entry from history
      const newHistory = navigationHistory.slice(0, -1);
      actions.clearNavigationHistory();
      newHistory.forEach(entry => {
        addToNavigationHistory(entry.screen, entry.activeTab);
      });
      
      setCurrentScreen(previousEntry.screen);
      setActiveTab(previousEntry.activeTab);
      return;
    }

    // Fallback to hardcoded navigation for critical paths
    console.log('📱 Back: Using fallback navigation for', currentScreen);
    
    switch (currentScreen) {
      case 'register':
        if (registerStep === 1) {
          setCurrentScreen('auth');
        } else {
          actions.setRegisterStep(registerStep - 1);
        }
        break;
      case 'otp':
        actions.setRegisterStep(1);
        setCurrentScreen('register');
        break;
      case 'checkout':
        setCurrentScreen('cart');
        break;
      // Promo flow - preserve special navigation
      case 'promoPricingEnhanced':
        setCurrentScreen('promoType');
        break;
      case 'promoBudget':
        setCurrentScreen('promoPricingEnhanced');
        break;
      case 'promoPlacement':
        setCurrentScreen('promoObjective');
        break;
      case 'promoAudience':
        setCurrentScreen('promoPlacement');
        break;
      case 'promoPricing':
        setCurrentScreen('promoAudience');
        break;
      default:
        // Default to home screen based on user role
        if (user?.role === 'seller') {
          setCurrentScreen('sellerDashboard');
          setActiveTab('dashboard');
        } else {
          setCurrentScreen('buyerHome');
          setActiveTab('home');
        }
        break;
    }
  }, [currentScreen, user?.role, registerStep, navigationHistory, setCurrentScreen, setActiveTab, setPromoData, actions, addToNavigationHistory, handleTabChange]);

  const handleSellerNavigate = useCallback((screen: string) => {
    switch (screen) {
      case 'dashboard':
        navigateToScreen('sellerDashboard', 'dashboard');
        break;
      case 'orders':
        navigateToScreen('sellerOrders', 'orders');
        break;
      case 'inventory':
        navigateToScreen('sellerInventory', 'inventory');
        break;
      case 'analytics':
        navigateToScreen('sellerAnalytics', 'analytics');
        break;
      case 'settings':
        navigateToScreen('sellerSettings', 'profile');
        break;
      case 'notifications':
        navigateToScreen('sellerNotifications');
        break;
      case 'addProduct':
      case 'editProduct':
        navigateToScreen('productEditor');
        break;
      case 'orderDetail':
        navigateToScreen('orderDetail');
        break;
      case 'storeProfile':
        navigateToScreen('storeProfile');
        break;
      default:
        console.log('Navigate to:', screen);
        break;
    }
  }, [navigateToScreen]);

  const handleOpenOrder = useCallback((orderId: string) => {
    setSelectedOrderId(orderId);
    navigateToScreen('orderDetail');
  }, [setSelectedOrderId, navigateToScreen]);

  const handleStoreSelect = useCallback(() => {
    navigateToScreen('storeProfile');
  }, [navigateToScreen]);

  return {
    handleTabChange,
    handleBackToPrevious,
    handleSellerNavigate,
    handleOpenOrder,
    handleStoreSelect,
    navigateToScreen
  };
}