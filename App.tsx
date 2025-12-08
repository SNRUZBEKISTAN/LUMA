import React from 'react';
import { Toaster } from './components/ui/sonner';
import { AppRouter } from './components/AppRouter';
import { DynamicBackground, CategoryType } from './components/DynamicBackground';
import { useDynamicBackground, getCategoryFromRoute } from './hooks/useDynamicBackground';
import { useAppNavigation } from './hooks/useAppNavigation';
import { useAppHandlers } from './hooks/useAppHandlers';
import { AppState, AppActions, Screen, User, UserRole, PromoData, NavigationHistoryEntry, CartShop, Order, AppNotification, ServiceFeeConfig, OrderStatus, Category, SizeChart, Shop, Product, Look, Gender, ApparelKind } from './types/app';
import { genId, genOrderNumber, nowISO, estimateETA, calcServiceFee } from './utils/order';
import { initializeEnhancedSeedData } from './utils/integrationHelper';
import { buildLookFromPrompt } from './utils/lookgen';
import { getGoogleToken, clearGoogleToken, isGoogleAuthenticated } from './utils/googleAuth';

export default function App() {
  // State - Starting on buyer home
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('buyerHome');
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedStoreId, setSelectedStoreId] = React.useState<string>('shop-fashion');
  const [selectedProductId, setSelectedProductId] = React.useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = React.useState(0);
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

  // Создание реальных данных с использованием интеграции новых магазинов
  const createInitialData = React.useMemo(() => {
    console.log('🔥 Загрузка расширенных данных с новыми магазинами...');
    
    const enhancedData = initializeEnhancedSeedData();
    
    console.log('✅ Расширенные данные загружены:', {
      shops: enhancedData.shops.length,
      products: enhancedData.products.length,
      categories: enhancedData.categories.length,
      stores: enhancedData.shops.map(s => s.name).join(', ')
    });
    
    return enhancedData;
  }, []);

  // Каталог данные с начальными значениями
  const [categories, setCategories] = React.useState<Category[]>(createInitialData.categories);
  const [sizeCharts, setSizeCharts] = React.useState<SizeChart>(createInitialData.sizeCharts);
  const [shops, setShops] = React.useState<Shop[]>(createInitialData.shops);
  const [products, setProducts] = React.useState<Product[]>(createInitialData.products);
  const [looks, setLooks] = React.useState<Look[]>([]);

  // Новое состояние для заказов и уведомлений
  const [cart, setCart] = React.useState<{ shops: { storeId: string; storeName: string; items: { productId: string; name: string; image: string; price: number; quantity: number; size?: string; color?: any; }[]; deliveryFee: number; freeDeliveryThreshold: number; }[] }>({ shops: [] });
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [sellerOrders, setSellerOrders] = React.useState<Order[]>([]);
  const [notifications, setNotifications] = React.useState<AppNotification[]>([
    {
      id: 'notif-1',
      type: 'order',
      title: 'Заказ #LM001 подтвержден',
      subtitle: 'Ваш заказ принят в обработку',
      createdAt: Date.now() - 1000 * 60 * 30, // 30 минут назад
      isRead: false,
      audience: 'buyer'
    },
    {
      id: 'notif-2', 
      type: 'delivery',
      title: 'Скидка 25% в Urban Style',
      subtitle: 'Только сегодня! На все товары до 23:59',
      createdAt: Date.now() - 1000 * 60 * 60 * 2, // 2 часа назад
      isRead: false,
      audience: 'buyer'
    },
    {
      id: 'notif-3',
      type: 'order',
      title: 'Новое поступление в Chic',
      subtitle: 'Летняя коллекция платьев уже в каталоге',
      createdAt: Date.now() - 1000 * 60 * 60 * 5, // 5 часов назад
      isRead: true,
      audience: 'buyer'
    },
    {
      id: 'notif-seller-1',
      type: 'order',
      title: 'Новый заказ #LM002',
      subtitle: 'Покупатель заказал Стильную футболку',
      createdAt: Date.now() - 1000 * 60 * 15, // 15 минут назад
      isRead: false,
      audience: 'seller'
    },
    {
      id: 'notif-seller-2',
      type: 'delivery',
      title: 'Отзыв на товар',
      subtitle: 'Новый отзыв на Классические джинсы',
      createdAt: Date.now() - 1000 * 60 * 60 * 1, // 1 час назад
      isRead: false,
      audience: 'seller'
    }
  ]);
  
  // Настройки комиссии сервиса
  const [serviceFee, setServiceFee] = React.useState<ServiceFeeConfig>({
    mode: 'percent',
    percent: 2.5,
    minFee: 0,
    applyPerStore: true
  });

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

  // Calculate total items in cart
  const calculateCartItemCount = React.useCallback((cartData: typeof cart) => {
    return cartData.shops.reduce((total, shop) => {
      return total + shop.items.reduce((shopTotal, item) => shopTotal + item.quantity, 0);
    }, 0);
  }, []);

  // State and actions objects
  const state: AppState = {
    currentScreen,
    activeTab,
    selectedStoreId,
    selectedProductId,
    cartItemCount,
    selectedOrderId,
    user,
    phoneNumber,
    selectedRole,
    sellerId,
    registerStep,
    promoData,
    selectedLookId,
    navigationHistory,
    categories,
    sizeCharts,
    shops,
    products,
    looks,
    cart,
    orders,
    sellerOrders,
    notifications,
    serviceFee
  };

  // Действия с корзиной и заказами
  const addToCart = React.useCallback((product: any, qty: number = 1) => {
    // Находим магазин для продукта
    const productShop = shops.find(shop => shop.id === product.storeId) || 
                       shops.find(shop => shop.products?.includes(product.id));
    
    if (!productShop) {
      console.warn('Shop not found for product:', product.id);
      return;
    }

    setCart(prev => {
      const newCart = { ...prev };
      const existingShop = newCart.shops.find(shop => shop.storeId === productShop.id);
      
      if (existingShop) {
        // Ищем товар с точно такими же характеристиками (размер и цвет)
        const existingItem = existingShop.items.find(item => 
          item.productId === product.id && 
          item.size === product.selectedSize &&
          JSON.stringify(item.color) === JSON.stringify(product.color)
        );
        
        if (existingItem) {
          existingItem.quantity += qty;
          
          // Если количество становится 0 или меньше, удаляем товар
          if (existingItem.quantity <= 0) {
            existingShop.items = existingShop.items.filter(item => 
              !(item.productId === product.id && 
                item.size === product.selectedSize &&
                JSON.stringify(item.color) === JSON.stringify(product.color))
            );
          }
        } else if (qty > 0) {
          // Добавляем новый товар только если количество положительное
          existingShop.items.push({
            productId: product.id,
            name: product.name,
            image: product.media?.[0]?.url || product.image || '/media/placeholder.jpg',
            price: product.price,
            quantity: qty,
            size: product.selectedSize,
            color: product.color
          });
        }
      } else if (qty > 0) {
        // Создаем новый магазин только если количество положительное
        newCart.shops.push({
          storeId: productShop.id,
          storeName: productShop.name,
          items: [{
            productId: product.id,
            name: product.name,
            image: product.media?.[0]?.url || product.image || '/media/placeholder.jpg',
            price: product.price,
            quantity: qty,
            size: product.selectedSize,
            color: product.color
          }],
          deliveryFee: productShop.deliveryFee || 15000,
          freeDeliveryThreshold: productShop.freeDeliveryThreshold || 100000
        });
      }
      
      // Удаляем пустые магазины
      newCart.shops = newCart.shops.filter(shop => shop.items.length > 0);
      
      // Пересчитываем общее количество товаров
      const totalItems = calculateCartItemCount(newCart);
      setCartItemCount(totalItems);
      
      return newCart;
    });
  }, [shops, calculateCartItemCount]);

  const removeFromCart = React.useCallback((productId: string, storeId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      newCart.shops = newCart.shops.map(shop => {
        if (shop.storeId === storeId) {
          const updatedItems = shop.items.filter(item => item.productId !== productId);
          return { ...shop, items: updatedItems };
        }
        return shop;
      }).filter(shop => shop.items.length > 0);
      
      // Пересчитываем общее количество товаров
      const totalItems = calculateCartItemCount(newCart);
      setCartItemCount(totalItems);
      
      return newCart;
    });
  }, [calculateCartItemCount]);

  const changeCartQty = React.useCallback((productId: string, storeId: string, delta: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      newCart.shops = newCart.shops.map(shop => {
        if (shop.storeId === storeId) {
          return {
            ...shop,
            items: shop.items.map(item => {
              if (item.productId === productId) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
              }
              return item;
            })
          };
        }
        return shop;
      });
      
      // Пересчитываем общее количество товаров
      const totalItems = calculateCartItemCount(newCart);
      setCartItemCount(totalItems);
      
      return newCart;
    });
  }, [calculateCartItemCount]);

  const clearCart = React.useCallback(() => {
    setCart({ shops: [] });
    setCartItemCount(0);
  }, []);

  const placeOrder = React.useCallback((payload: { address: string }) => {
    const ordersToCreate: Order[] = [];
    const notificationsToCreate: AppNotification[] = [];
    let firstOrderId = '';
    let firstOrderNumber = '';

    // Создаем заказ для каждого магазина в корзине
    cart.shops.forEach((shop, index) => {
      const orderId = genId();
      const orderNumber = genOrderNumber();
      
      if (index === 0) {
        firstOrderId = orderId;
        firstOrderNumber = orderNumber;
      }

      const subtotal = shop.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const deliveryFee = shop.deliveryFee;
      const serviceFeeAmount = calcServiceFee(subtotal, deliveryFee, serviceFee);
      const total = subtotal + deliveryFee + serviceFeeAmount;

      const order: Order = {
        id: orderId,
        number: orderNumber,
        buyerId: user?.id?.toString() || '',
        storeId: shop.storeId,
        storeName: shop.storeName,
        dateISO: nowISO(),
        status: 'new',
        items: shop.items,
        address: payload.address,
        fees: {
          subtotal,
          deliveryFee,
          serviceFee: serviceFeeAmount,
          total
        },
        timeline: [{
          status: 'new',
          at: nowISO(),
          note: 'Заказ создан'
        }],
        eta: estimateETA('new')
      };

      ordersToCreate.push(order);

      // Уведомление покупателю
      notificationsToCreate.push({
        id: genId(),
        type: 'order',
        title: `Заказ ${orderNumber} создан`,
        subtitle: `Сумма: ${total.toLocaleString()} сум`,
        createdAt: Date.now(),
        isRead: false,
        audience: 'buyer',
        orderId,
        orderNumber
      });

      // Уведомление продавцу
      notificationsToCreate.push({
        id: genId(),
        type: 'order',
        title: `Новый заказ ${orderNumber}`,
        subtitle: `Ожидает подтверждения`,
        createdAt: Date.now(),
        isRead: false,
        audience: 'seller',
        orderId,
        orderNumber
      });
    });

    // Обновляем состояние
    setOrders(prev => [...prev, ...ordersToCreate]);
    setSellerOrders(prev => [...prev, ...ordersToCreate]);
    setNotifications(prev => [...prev, ...notificationsToCreate]);
    clearCart();

    return { orderId: firstOrderId, orderNumber: firstOrderNumber };
  }, [cart, user, serviceFee, clearCart]);

  const setOrderStatusSeller = React.useCallback((orderId: string, nextStatus: OrderStatus) => {
    const updateOrder = (prev: Order[]) => {
      return prev.map(order => {
        if (order.id === orderId) {
          const updatedTimeline = [...order.timeline, {
            status: nextStatus,
            at: nowISO(),
            note: `Статус изменен на ${nextStatus}`
          }];

          return {
            ...order,
            status: nextStatus,
            timeline: updatedTimeline,
            eta: estimateETA(nextStatus)
          };
        }
        return order;
      });
    };

    setOrders(updateOrder);
    setSellerOrders(updateOrder);

    // Добавляем уведомление покупателю
    const order = orders.find(o => o.id === orderId) || sellerOrders.find(o => o.id === orderId);
    if (order) {
      const statusTexts = {
        prep: 'принят в обработку',
        shipped: 'отправлен',
        delivered: 'доставлен', 
        cancel: 'отменен',
        return: 'возвращен'
      };

      setNotifications(prev => [...prev, {
        id: genId(),
        type: 'delivery',
        title: `Заказ ${order.number}`,
        subtitle: `Статус: ${statusTexts[nextStatus as keyof typeof statusTexts] || nextStatus}`,
        createdAt: Date.now(),
        isRead: false,
        audience: 'buyer',
        orderId,
        orderNumber: order.number
      }]);
    }
  }, [orders, sellerOrders]);

  const markNotificationRead = React.useCallback((id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  }, []);

  const getUnreadBuyerNotificationsCount = React.useCallback(() => {
    return notifications.filter(n => n.audience === 'buyer' && !n.isRead).length;
  }, [notifications]);

  const getSellerNewOrdersCount = React.useCallback((storeId: string) => {
    return sellerOrders.filter(o => o.storeId === storeId && o.status === 'new').length;
  }, [sellerOrders]);

  const getUnreadSellerNotificationsCount = React.useCallback(() => {
    return notifications.filter(n => n.audience === 'seller' && !n.isRead).length;
  }, [notifications]);



  const persistToStorage = React.useCallback(() => {
    try {
      const dataToStore = {
        cart,
        orders,
        sellerOrders,
        notifications,
        serviceFee,
        categories,
        sizeCharts,
        shops,
        products,
        looks
      };
      localStorage.setItem('luma-app-state', JSON.stringify(dataToStore));
    } catch (error) {
      console.error('Error persisting to storage:', error);
    }
  }, [cart, orders, sellerOrders, notifications, serviceFee, categories, sizeCharts, shops, products, looks]);

  // Подтверждение что данные загружены при инициализации
  React.useEffect(() => {
    console.log('🎉 Данные загружены при инициализации:', {
      shops: shops.length,
      products: products.length,
      categories: categories.length
    });
  }, []); // Запускается только один раз

  // Проверка данных после загрузки
  React.useEffect(() => {
    if (products.length > 0 && shops.length > 0) {
      console.log('✅ Данные успешно загружены и готовы к использованию');
    }
  }, [products.length, shops.length]);

  // Check URL hash for direct navigation to backend demo
  React.useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove '#' 
    if (hash === 'backendDemo') {
      console.log('🔗 Navigating to backend demo from URL hash');
      setCurrentScreen('backendDemo');
      window.location.hash = ''; // Clear hash
    }
  }, []);

  // Детальный мониторинг состояния данных
  React.useEffect(() => {
    console.log('📊 ПОДРОБНОЕ состояние данных:', {
      products: products.length,
      shops: shops.length,
      categories: categories.length,
      timestamp: new Date().toLocaleTimeString()
    });
    
    if (products.length > 0 && shops.length > 0) {
      console.log('✅ Все данные загружены успешно!');
      console.log('📦 Детали данных:', {
        firstShop: shops[0]?.name,
        firstProduct: products[0]?.name,
        productsWithPrices: products.slice(0, 3).map(p => ({ 
          name: p.name, 
          price: p.price, 
          originalPrice: p.originalPrice,
          storeId: p.storeId,
          storeName: p.storeName
        }))
      });
    } else {
      console.warn('⚠️ Данные еще не загружены:', {
        products: products.length,
        shops: shops.length,
        productsArray: products,
        shopsArray: shops
      });
    }
  }, [products.length, shops.length, categories.length, products, shops]);

  // Синхронизируем cartItemCount с реальным содержимым корзины
  React.useEffect(() => {
    const totalItems = calculateCartItemCount(cart);
    if (totalItems !== cartItemCount) {
      setCartItemCount(totalItems);
    }
  }, [cart, cartItemCount, calculateCartItemCount]);

  // Сохраняем данные при изменениях (ОТКЛЮЧЕНО для отладки)
  // React.useEffect(() => {
  //   persistToStorage();
  // }, [persistToStorage]);

  // Новые функции для AI Look и каталога
  const generateLook = React.useCallback(async (prompt: string) => {
    try {
      const generatedLook = await buildLookFromPrompt(prompt, products);
      setLooks(prev => [...prev, generatedLook]);
      return generatedLook;
    } catch (error) {
      console.error('Error generating look:', error);
      throw error;
    }
  }, [products]);

  const addLookToCart = React.useCallback((look: Look) => {
    look.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        // Находим магазин для товара
        const productShop = shops.find(shop => shop.id === product.storeId);
        if (productShop) {
          const productForCart = {
            ...product,
            storeId: productShop.id,
            storeName: productShop.name
          };
          addToCart(productForCart, 1);
        }
      }
    });
  }, [products, shops, addToCart]);

  const openVideoFeed = React.useCallback(() => {
    setCurrentScreen('videoFeed');
  }, []);

  const pickCategoryInSearch = React.useCallback((categoryId: string) => {
    // Можно добавить логику фильтрации по категории
    console.log('Selected category:', categoryId);
  }, []);

  const actions: AppActions = {
    setCurrentScreen,
    setActiveTab,
    setSelectedStoreId,
    setSelectedProductId,
    setCartItemCount,
    setSelectedOrderId,
    setUser,
    setPhoneNumber,
    setSelectedRole,
    setSellerId,
    setRegisterStep,
    setPromoData,
    setSelectedLookId,
    addToNavigationHistory,
    clearNavigationHistory,
    addToCart,
    removeFromCart,
    changeCartQty,
    clearCart,
    placeOrder,
    setOrderStatusSeller,
    markNotificationRead,
    getUnreadBuyerNotificationsCount,
    getSellerNewOrdersCount,
    getUnreadSellerNotificationsCount,

    persistToStorage,
    generateLook,
    addLookToCart,
    openVideoFeed,
    pickCategoryInSearch
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
        <AppRouter state={state} actions={actions} handlers={handlers} navigation={navigation} />
        <Toaster />
      </div>
    </div>
  );
}