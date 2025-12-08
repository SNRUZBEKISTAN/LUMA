import React from 'react';
import { SplashScreen } from './SplashScreen';
import { AuthLite } from './AuthLite';
import { RegisterFlow } from './RegisterFlow';
import { OTPScreen } from './OTPScreen';
import { BuyerHome } from './BuyerHome';
import { SellerHome } from './SellerHome';
import { FeedScreen } from './FeedScreen';
import { CartScreen } from './CartScreen';
import { CheckoutScreen } from './CheckoutScreen';
import { ProductDetailScreenV2 } from './ProductDetailScreenV2';
import { ProfileScreen } from './ProfileScreen';
import { ProfileScreenV2 } from './ProfileScreenV2';
import { SearchFlow } from './SearchFlow';
import { NotificationsScreen } from './NotificationsScreen';
import { StoreScreen } from './StoreScreen';
import { AILookScreen } from './AILookScreen';
import { AILookScreenV2 } from './AILookScreenV2';
import { LookConfigScreen } from './LookConfigScreen';
import { LookDetailScreen } from './LookDetailScreen';
import { LookDetailScreenV2 } from './LookDetailScreenV2';
import { OrderTrackingScreen } from './OrderTrackingScreen';
import VideoFeedScreen from './VideoFeedScreen';


// Profile screens
import { ProfileEditScreen } from './ProfileEditScreen';
import { OrdersScreen } from './OrdersScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { MessagesScreen } from './MessagesScreen';
import { NotifSettingsScreen } from './NotifSettingsScreen';
import { PaymentsScreen } from './PaymentsScreen';
import { AddressesScreen } from './AddressesScreen';
import { SecurityScreen } from './SecurityScreen';
import { HelpScreen } from './HelpScreen';
import { DynamicBackgroundDemo } from './DynamicBackgroundDemo';
import { PhotoSearchDemo } from './PhotoSearchDemo';
import { BackendDemo } from './BackendDemo';

// Fintech screens
import { FintechDashboard } from './fintech/FintechDashboard';
import { AddMoneyScreen } from './fintech/AddMoneyScreen';

// Seller screens
import { EnhancedSellerDashboard } from './seller/EnhancedSellerDashboard';
import { SellerOrders } from './seller/SellerOrders';
import { SellerInventory } from './seller/SellerInventory';
import { SellerSettings } from './seller/SellerSettings';
import { SellerNotifications } from './seller/SellerNotifications';
import { ProductEditor } from './seller/ProductEditor';
import { OrderDetailScreen } from './seller/OrderDetailScreen';
import { SellerAnalytics } from './seller/SellerAnalytics';
import { StoreProfile } from './seller/StoreProfile';

// Promo flow screens
import { PromoObjective } from './seller/promo/PromoObjective';
import { PromoPlacement } from './seller/promo/PromoPlacement';
import { PromoAudience } from './seller/promo/PromoAudience';
import { PromoPricing } from './seller/promo/PromoPricing';
import { PromoType } from './seller/promo/PromoType';
import { PromoPricingEnhanced } from './seller/promo/PromoPricingEnhanced';
import { PromoBudget } from './seller/promo/PromoBudget';

import { AppState } from '../types/app';

interface AppRouterProps {
  state: AppState;
  actions: any;
  handlers: any;
  navigation: any;
}

export function AppRouter({ state, actions, handlers, navigation }: AppRouterProps) {
  const { currentScreen, activeTab, user, phoneNumber, registerStep, selectedStoreId, selectedProductId, promoData, selectedLookId, selectedRole } = state;
  const { handleBackToPrevious, handleSellerNavigate, handleOpenOrder, handleStoreSelect } = navigation;

  switch (currentScreen) {
    case 'splash':
      return <SplashScreen onComplete={handlers.handleSplashComplete} />;
    
    case 'auth':
      return (
        <AuthLite 
          onAuthComplete={handlers.handleAuthComplete}
          onRegister={handlers.handleRegister}
          onForgotPassword={handlers.handleForgotPassword}
        />
      );

    case 'register':
      return (
        <RegisterFlow
          onBack={handleBackToPrevious}
          onRegisterComplete={handlers.handleRegisterComplete}
          onOTPRequired={handlers.handleOTPRequired}
          currentStep={registerStep}
          onStepChange={() => {}}
        />
      );
    
    case 'otp':
      return (
        <OTPScreen 
          phoneNumber={phoneNumber}
          onBack={handleBackToPrevious}
          onVerify={handlers.handleOTPVerify}
          onResendCode={() => console.log('Resend code')}
          onChangeNumber={() => {}}
        />
      );
    
    case 'buyerHome':
      console.log('📡 AppRouter: Рендерим BuyerHome с state:', {
        products: state.products?.length || 0,
        shops: state.shops?.length || 0,
        productsFirst: state.products?.[0]?.name || 'none',
        shopsFirst: state.shops?.[0]?.name || 'none'
      });
      return (
        <BuyerHome 
          onProductClick={handlers.handleProductClick}
          onCartClick={handlers.handleCartClick}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          showBackButton={false}
          onSearchClick={handlers.handleOpenSearch}
          onNotificationsClick={handlers.handleNotificationsClick}
          onAILookClick={handlers.handleAILookClick}
          onFavoritesClick={handlers.handleOpenFavorites}
          onAddToCart={actions.addToCart}
          products={state.products}
          shops={state.shops}
          cartItemCount={state.cartItemCount}
          unreadNotificationsCount={actions.getUnreadBuyerNotificationsCount()}
        />
      );
    
    case 'feed':
      return (
        <FeedScreen 
          onProductClick={handlers.handleProductClick}
          onAddToCart={handlers.handleAddToCart}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          onBack={handleBackToPrevious}
          cartItemCount={state.cartItemCount}
        />
      );
    
    case 'cart':
      return (
        <CartScreen 
          onBack={handleBackToPrevious}
          onCheckout={handlers.handleCheckout}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          cart={state.cart}
          cartItemCount={state.cartItemCount}
          onChangeCartQty={actions.changeCartQty}
          onRemoveFromCart={actions.removeFromCart}
        />
      );
    
    case 'checkout':
      return (
        <CheckoutScreen 
          onBack={handleBackToPrevious}
          onOrderComplete={handlers.handlePlaceOrder}
          onEditAddress={() => {}}
          onAddNewAddress={() => {}}
          state={state}
          actions={actions}
        />
      );
    
    case 'productDetail':
      // Находим товар по selectedProductId
      let selectedProduct = state.products.find(p => p.id === selectedProductId);
      
      // Fallback: если не найден по точному ID, попробуем найти по номеру
      if (!selectedProduct && selectedProductId) {
        const productNumber = selectedProductId.replace('product-', '');
        selectedProduct = state.products.find(p => p.id === `product-${productNumber}`);
      }
      
      // Fallback: если все еще не найден, используем первый товар
      if (!selectedProduct && state.products.length > 0) {
        selectedProduct = state.products[0];
        console.warn('Product not found, using first product:', selectedProductId);
      }
      
      const selectedProductStore = selectedProduct ? state.shops.find(s => s.id === selectedProduct.storeId) : null;
      
      if (!selectedProduct || !selectedProductStore) {
        // Если товар не найден, возвращаемся на главную
        console.warn('Product not found:', selectedProductId);
        return (
          <BuyerHome 
            onProductClick={handlers.handleProductClick}
            onCartClick={handlers.handleCartClick}
            onTabChange={navigation.handleTabChange}
            activeTab={activeTab}
            showBackButton={false}
            onSearchClick={handlers.handleOpenSearch}
            onNotificationsClick={handlers.handleNotificationsClick}
            onAILookClick={handlers.handleAILookClick}
            onFavoritesClick={handlers.handleOpenFavorites}
            onAddToCart={actions.addToCart}
            products={state.products}
            shops={state.shops}
            cartItemCount={state.cartItemCount}
            unreadNotificationsCount={actions.getUnreadBuyerNotificationsCount()}
          />
        );
      }
      
      return (
        <ProductDetailScreenV2 
          product={selectedProduct}
          store={selectedProductStore}
          onBack={handleBackToPrevious}
          onStoreClick={handlers.handleStoreClick}
          onAddToCart={actions.addToCart}
          onBuyNow={handlers.handleCheckout}
          onShare={() => {}}
          onWishlistToggle={() => {}}
          onChatWithStore={() => {}}
          onFollowStore={() => {}}
          cart={state.cart}
          onChangeCartQty={actions.changeCartQty}
        />
      );
    
    case 'profile':
      return (
        <ProfileScreenV2 
          userName={user?.name || 'Пользователь'}
          userAvatar={user?.avatar}
          walletBalance={1250000}
          points={850}
          onLogout={handlers.handleLogout}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          onBack={handleBackToPrevious}
          onOpenOrders={handlers.handleOpenOrders}
          onOpenFavs={handlers.handleOpenFavorites}
          onOpenPayments={handlers.handleOpenPayments}
          onOpenAddresses={handlers.handleOpenAddresses}
          onOpenHelp={handlers.handleOpenHelp}
          onEditProfile={handlers.handleEditProfile}
          onOpenWallet={() => {
            console.log('💰 Opening wallet from profile');
            navigation.navigateToScreen('wallet');
          }}
          cartItemCount={state.cartItemCount}
        />
      );
    
    // Enhanced Seller Screens
    case 'sellerDashboard':
      return (
        <EnhancedSellerDashboard
          activeTab={activeTab}
          onTabChange={navigation.handleTabChange}
          onNavigate={handleSellerNavigate}
          onOrderClick={handleOpenOrder}
        />
      );
    
    case 'sellerOrders':
      return (
        <SellerOrders
          activeTab={activeTab}
          onTabChange={navigation.handleTabChange}
          onBack={handleBackToPrevious}
          onNavigate={handleSellerNavigate}
          onOrderClick={handleOpenOrder}
          state={state}
          actions={actions}
        />
      );
    
    case 'sellerInventory':
      return (
        <SellerInventory
          activeTab={activeTab}
          onTabChange={navigation.handleTabChange}
          onBack={handleBackToPrevious}
          onNavigate={handleSellerNavigate}
        />
      );
    
    case 'sellerSettings':
      return (
        <SellerSettings
          activeTab={activeTab}
          onTabChange={navigation.handleTabChange}
          onBack={handleBackToPrevious}
          onNavigate={handleSellerNavigate}
          onLogout={handlers.handleLogout}
        />
      );

    case 'sellerNotifications':
      return (
        <SellerNotifications
          activeTab={activeTab}
          onTabChange={navigation.handleTabChange}
          onBack={handleBackToPrevious}
          onNavigate={handleSellerNavigate}
        />
      );

    case 'sellerAnalytics':
      return (
        <SellerAnalytics
          activeTab={activeTab}
          onTabChange={navigation.handleTabChange}
          onBack={handleBackToPrevious}
          onNavigate={handleSellerNavigate}
          onStartPromo={handlers.handleStartPromo}
        />
      );

    case 'productEditor':
      return (
        <ProductEditor
          onBack={handleBackToPrevious}
          onSave={() => handleBackToPrevious()}
        />
      );

    case 'orderDetail':
      return (
        <OrderDetailScreen
          onBack={handleBackToPrevious}
          onNavigate={handleSellerNavigate}
        />
      );

    case 'storeProfile':
      return (
        <StoreProfile
          activeTab={activeTab}
          onTabChange={navigation.handleTabChange}
          onBack={handleBackToPrevious}
          onNavigate={handleSellerNavigate}
        />
      );

    // New Promo Flow Screens
    case 'promoType':
      return (
        <PromoType
          onBack={handleBackToPrevious}
          onNext={handlers.handlePromoTypeNext}
          selectedType={promoData.type}
        />
      );

    case 'promoPricingEnhanced':
      return (
        <PromoPricingEnhanced
          onBack={handleBackToPrevious}
          onNext={handlers.handlePromoPricingEnhancedNext}
          promoType={promoData.type || 'product'}
        />
      );

    case 'promoBudget':
      return (
        <PromoBudget
          onBack={handleBackToPrevious}
          onNext={handlers.handlePromoBudgetNext}
          packageData={{
            price: promoData.price || 900000,
            objective: promoData.objective || 'purchases'
          }}
        />
      );

    // Legacy Promo Flow Screens
    case 'promoObjective':
      return (
        <PromoObjective
          onBack={handleBackToPrevious}
          onNext={() => {}}
          promoType={promoData.type}
          onTypeChange={() => {}}
        />
      );

    case 'promoPlacement':
      return (
        <PromoPlacement
          onBack={handleBackToPrevious}
          onNext={() => {}}
        />
      );

    case 'promoAudience':
      return (
        <PromoAudience
          onBack={handleBackToPrevious}
          onNext={() => {}}
        />
      );

    case 'promoPricing':
      return (
        <PromoPricing
          onBack={handleBackToPrevious}
          onNext={() => {}}
        />
      );
    
    case 'search':
      return (
        <SearchFlow
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          onProductClick={handlers.handleProductClick}
          onAddToCart={handlers.handleAddToCart}
        />
      );
    
    case 'notifications':
      // Проверяем роль пользователя и показываем соответствующий экран уведомлений
      if (user?.role === 'seller' || selectedRole === 'seller') {
        return (
          <SellerNotifications
            activeTab={activeTab}
            onTabChange={navigation.handleTabChange}
            onBack={handleBackToPrevious}
            onNavigate={handleSellerNavigate}
          />
        );
      } else {
        return (
          <NotificationsScreen 
            onBack={handleBackToPrevious}
            onTabChange={navigation.handleTabChange}
            activeTab={handlers.getActiveTabForCurrentScreen()}
            state={state}
            actions={actions}
          />
        );
      }
    
    case 'store':
      return (
        <StoreScreen 
          storeId={selectedStoreId}
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          onProductClick={handlers.handleProductClick}
          onShare={() => console.log('Share store')}
          onChatWithStore={() => console.log('Chat with store')}
          onFollowStore={() => console.log('Follow store')}
        />
      );
    
    // Profile sub-screens
    case 'orders':
      return (
        <OrdersScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          onOpenTracking={handlers.handleOpenTracking}
        />
      );
    
    case 'orderTracking':
      return (
        <OrderTrackingScreen 
          state={state}
          actions={actions}
          onBack={handleBackToPrevious}
        />
      );
    
    case 'videoFeed':
      return (
        <VideoFeedScreen 
          products={state.products}
          onBack={handleBackToPrevious}
          onOpenProduct={handlers.handleProductClick}
          onAddToCart={(productId: string) => {
            console.log('🛒 VideoFeed: добавление товара в корзину:', productId);
            const product = state.products.find(p => p.id === productId);
            if (product) {
              console.log('✅ Товар найден, добавляем:', product.name);
              actions.addToCart(product, 1);
            } else {
              console.warn('⚠️ Товар не найден:', productId);
            }
          }}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          cartItemCount={state.cartItemCount}
        />
      );
    
    case 'favorites':
      return (
        <FavoritesScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'messages':
      return (
        <MessagesScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'notifSettings':
      return (
        <NotifSettingsScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'payments':
      return (
        <PaymentsScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'addresses':
      return (
        <AddressesScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'security':
      return (
        <SecurityScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'help':
      return (
        <HelpScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'profileEdit':
      return (
        <ProfileEditScreen 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    
    case 'aiLook':
      return (
        <AILookScreenV2 
          state={state}
          actions={actions}
          onBack={handleBackToPrevious}
          onNavigateToLookDetail={(lookId) => {
            handlers.handleLookDetailClick(lookId);
          }}
        />
      );
    
    case 'lookConfig':
      // Find the look by ID (this would normally come from an API)
      const mockLooksWithSizes = [
        {
          id: '1',
          title: 'Элегантный вечерний образ',
          tags: ['Вечер', 'Элегантно', '1.2M сум'],
          items: [
            { name: 'Черное платье миди', price: 450000, image: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'], storeName: 'ZARA' },
            { name: 'Черные лоферы', price: 280000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['36', '37', '38', '39', '40', '41'], storeName: 'H&M' },
            { name: 'Золотые серьги', price: 150000, image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400', availableSizes: ['Универсальный'], storeName: 'Pandora' },
            { name: 'Черная сумочка', price: 320000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', availableSizes: ['Универсальный'], storeName: 'Mango' }
          ],
          totalPrice: 1200000,
          coverImage: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=600'
        },
        {
          id: '2',
          title: 'Повседневный comfort look',
          tags: ['Casual', 'Прогулка', '680к сум'],
          items: [
            { name: 'Белая футболка', price: 120000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'], storeName: 'Uniqlo' },
            { name: 'Джинсы mom fit', price: 320000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', availableSizes: ['24', '25', '26', '27', '28', '29', '30'], storeName: 'Levi\'s' },
            { name: 'Белые кроссовки', price: 240000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', availableSizes: ['36', '37', '38', '39', '40', '41', '42'], storeName: 'Nike' }
          ],
          totalPrice: 680000,
          coverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'
        }
      ];
      
      // For recent queries, create a temporary look
      const recentQueryLooks = [
        {
          id: 'recent-0',
          title: 'Элегантный образ на вечер под черные лоферы...',
          tags: ['AI-подбор'],
          items: [
            { name: 'Черное платье миди', price: 450000, image: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'], storeName: 'ZARA' },
            { name: 'Черные лоферы', price: 380000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['36', '37', '38', '39', '40', '41'], storeName: 'H&M' },
            { name: 'Серьги золотые', price: 120000, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', availableSizes: ['Универсальный'], storeName: 'Pandora' },
            { name: 'Клатч кожаный', price: 250000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', availableSizes: ['Универсальный'], storeName: 'Mango' }
          ],
          totalPrice: 1200000,
          coverImage: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=300&h=300&fit=crop'
        }
      ];
      
      const allLooks = [...mockLooksWithSizes, ...recentQueryLooks];
      const selectedLook = allLooks.find(look => look.id === selectedLookId);
      
      if (!selectedLook) {
        return (
          <AILookScreen 
            onBack={handleBackToPrevious}
            onNavigateToLookConfig={(lookId) => {
              setState(prev => ({ 
                ...prev, 
                currentScreen: 'lookConfig',
                selectedLookId: lookId
              }));
            }}
          />
        );
      }
      
      return (
        <LookConfigScreen 
          look={selectedLook}
          onBack={handleBackToPrevious}
          onAddToCart={(lookId, selectedSizes) => {
            console.log('Adding look to cart:', lookId, selectedSizes);
            // Here you would normally add the look with selected sizes to cart
            handlers.handleCartClick();
          }}
        />
      );

    case 'lookDetailV2':
      return (
        <LookDetailScreenV2 
          lookId={selectedLookId}
          state={state}
          actions={actions}
          onBack={handleBackToPrevious}
        />
      );

    case 'lookDetail':
      // Mock look data - в реальном приложении это будет загружаться по selectedLookId
      const mockLookDetail = {
        id: selectedLookId || '1',
        title: 'Элегантный вечерний образ',
        description: 'Идеальный образ для особенных вечерних мероприятий. Сочетание классики и современности создает неповторимый стиль.',
        tags: ['Вечер', 'Элегантно', 'Классика', 'Особый случай'],
        items: [
          { 
            id: '1', 
            name: 'Черное платье миди с поясом', 
            price: 450000, 
            image: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=400', 
            storeName: 'ZARA',
            storeAvatar: '👗',
            availableSizes: ['XS', 'S', 'M', 'L', 'XL'] 
          },
          { 
            id: '2', 
            name: 'Черные кожаные лоферы', 
            price: 280000, 
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', 
            storeName: 'H&M',
            storeAvatar: '👠',
            availableSizes: ['36', '37', '38', '39', '40', '41'] 
          },
          { 
            id: '3', 
            name: 'Золотые серьги с камнями', 
            price: 150000, 
            image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400', 
            storeName: 'Pandora',
            storeAvatar: '💍',
            availableSizes: ['Универсальный'] 
          },
          { 
            id: '4', 
            name: 'Черная кожаная сумочка', 
            price: 320000, 
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 
            storeName: 'Mango',
            storeAvatar: '👜',
            availableSizes: ['Универсальный'] 
          }
        ],
        totalPrice: 1200000,
        coverImage: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=600&h=800&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop', 
          'https://images.unsplash.com/photo-1581873372207-2b6d4e68126d?w=600&h=800&fit=crop',
          'https://images.unsplash.com/photo-1583053844626-4d29b2e7d4b2?w=600&h=800&fit=crop'
        ],
        views: 1250,
        likes: 89,
        saves: 34,
        occasion: 'Вечернее мероприятие',
        style: 'Элегантный',
        weather: 'Межсезонье',
        aiGenerated: true
      };
      
      return (
        <LookDetailScreen 
          look={mockLookDetail}
          onBack={handleBackToPrevious}
          onShare={() => console.log('Share look')}
          onLike={(lookId) => console.log('Like look:', lookId)}
          onSave={(lookId) => console.log('Save look:', lookId)}
          onProductClick={handlers.handleProductClick}
          onStoreClick={handlers.handleStoreClick}
          onAddToCart={(lookId) => {
            console.log('Add look to cart:', lookId);
            handlers.handleCartClick();
          }}
          onBuyLook={(lookId) => {
            console.log('Buy look:', lookId);
            // Добавляем товары из образа в корзину
            mockLookDetail.items.forEach(item => {
              console.log('Adding to cart:', item.id, item.name);
            });
            // Увеличиваем счетчик корзины на количество товаров в образе
            setCartItemCount(prev => prev + mockLookDetail.items.length);
            // Переходим в корзину
            navigation.handleTabChange('cart');
          }}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
        />
      );
    


    case 'dynamicBackgroundDemo':
      return <DynamicBackgroundDemo />;

    case 'photoSearchDemo':
      return <PhotoSearchDemo />;

    case 'backendDemo':
      return <BackendDemo />;

    // Fintech Screens
    case 'wallet':
      console.log('💰 AppRouter: рендерим FintechDashboard');
      return (
        <FintechDashboard 
          onBack={handleBackToPrevious}
          onTabChange={navigation.handleTabChange}
          activeTab={activeTab}
          cartItemCount={state.cartItemCount}
        />
      );

    case 'addMoney':
      return (
        <AddMoneyScreen 
          onBack={handleBackToPrevious}
        />
      );

    default:
      return <SplashScreen onComplete={handlers.handleSplashComplete} />;
  }
}