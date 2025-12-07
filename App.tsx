import React from 'react';
import { Toaster } from './components/ui/sonner';
import { AppRouter } from './components/AppRouter';
import { DynamicBackground, CategoryType } from './components/DynamicBackground';
import { useDynamicBackground, getCategoryFromRoute } from './hooks/useDynamicBackground';
import { useAppNavigation } from './hooks/useAppNavigation';
import { useAppHandlers } from './hooks/useAppHandlers';
import { AppState, AppActions, Screen, User, UserRole, PromoData, NavigationHistoryEntry } from './types/app';

export default function App() {
  // State - Starting on buyer home
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('buyerHome');
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedStoreId, setSelectedStoreId] = React.useState<string>('shop-fashion');
  const [cartItemCount, setCartItemCount] = React.useState(3);
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>({
    id: 1,
    name: 'Тестовый покупатель',
    email: 'buyer@test.com',
    role: 'buyer'
  });
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState<UserRole>('buyer');
  const [sellerId, setSellerId] = React.useState('');
  const [registerStep, setRegisterStep] = React.useState(1);
  const [promoData, setPromoData] = React.useState<PromoData>({});
  const [selectedLookId, setSelectedLookId] = React.useState('');
  const [navigationHistory, setNavigationHistory] = React.useState<NavigationHistoryEntry[]>([]);

  // Navigation history handlers
  const addToNavigationHistory = React.useCallback((screen: Screen, activeTab: string) => {
    setNavigationHistory(prev => [...prev, { 
      screen, 
      activeTab, 
      timestamp: Date.now() 
    }]);
  }, []);

  const clearNavigationHistory = React.useCallback(() => {
    setNavigationHistory([]);
  }, []);

  // State and actions objects
  const state: AppState = {
    currentScreen,
    activeTab,
    selectedStoreId,
    cartItemCount,
    selectedOrderId,
    user,
    phoneNumber,
    selectedRole,
    sellerId,
    registerStep,
    promoData,
    selectedLookId,
    navigationHistory
  };

  const actions: AppActions = {
    setCurrentScreen,
    setActiveTab,
    setSelectedStoreId,
    setCartItemCount,
    setSelectedOrderId,
    setUser,
    setPhoneNumber,
    setSelectedRole,
    setSellerId,
    setRegisterStep,
    setPromoData,
    addToNavigationHistory,
    clearNavigationHistory
  };

  // Custom hooks
  const navigation = useAppNavigation(state, actions);
  const handlers = useAppHandlers(state, actions, navigation);
  
  // Dynamic background hook
  const { currentCategory, setCategory } = useDynamicBackground('default');
  
  // Update background category based on current screen
  React.useEffect(() => {
    const newCategory = getCategoryFromRoute(currentScreen);
    setCategory(newCategory);
  }, [currentScreen, setCategory]);

  return (
    <div className="h-screen w-full flex flex-col relative">
      {/* Dynamic Background */}
      <DynamicBackground category={currentCategory} />
      
      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        <AppRouter state={state} handlers={handlers} navigation={navigation} />
        <Toaster />
      </div>
    </div>
  );
}