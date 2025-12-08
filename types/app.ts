export type Screen = 'splash' | 'auth' | 'register' | 'otp' | 'buyerHome' | 'sellerHome' | 'feed' | 'cart' | 'checkout' | 'productDetail' | 'profile' | 'search' | 'notifications' | 'store' | 'orders' | 'favorites' | 'messages' | 'notifSettings' | 'payments' | 'addresses' | 'security' | 'help' | 'profileEdit' | 'sellerDashboard' | 'sellerOrders' | 'sellerInventory' | 'sellerSettings' | 'sellerNotifications' | 'productEditor' | 'orderDetail' | 'sellerAnalytics' | 'promoObjective' | 'promoPlacement' | 'promoAudience' | 'promoPricing' | 'promoType' | 'promoPricingEnhanced' | 'promoBudget' | 'storeProfile' | 'aiLook' | 'aiLookV2' | 'lookConfig' | 'lookDetail' | 'modernCardDemo' | 'dynamicBackgroundDemo' | 'photoSearchDemo' | 'orderTracking' | 'videoFeed' | 'categorySearch' | 'backendDemo' | 'wallet' | 'creditBuilder' | 'lumaPoints' | 'bnpl' | 'bnplOrderDetail' | 'addMoney' | 'withdraw' | 'spendingAnalytics' | 'rewardStore' | 'kycVerification';

export type UserRole = 'buyer' | 'seller' | null;

// === Справочники товаров ===
export type Gender = 'women' | 'men' | 'unisex' | 'girls' | 'boys' | 'baby';
export type ApparelKind = 'topwear' | 'bottomwear' | 'dress' | 'outerwear' | 'knitwear' | 'suiting' | 'activewear' | 'loungewear' | 'underwear' | 'swimwear' | 'footwear' | 'accessories' | 'jewelry';
export type Fit = 'regular' | 'slim' | 'oversized' | 'relaxed' | 'straight' | 'tapered' | 'wide';
export type Pattern = 'solid' | 'striped' | 'checked' | 'floral' | 'graphic' | 'embroidered' | 'printed' | 'colorblock' | 'textured' | 'ribbed' | 'polka';
export type Material = 'cotton' | 'linen' | 'wool' | 'cashmere' | 'silk' | 'viscose' | 'polyester' | 'nylon' | 'elastane' | 'denim' | 'leather' | 'faux_leather' | 'fleece';
export type Season = 'allseason' | 'spring' | 'summer' | 'autumn' | 'winter';
export type ColorKey = 'black' | 'white' | 'grey' | 'navy' | 'blue' | 'lightblue' | 'green' | 'olive' | 'beige' | 'brown' | 'tan' | 'yellow' | 'orange' | 'red' | 'pink' | 'purple' | 'gold' | 'silver';

export interface Category {
  id: string;
  kind: ApparelKind;
  name: string;          // Отображаемое имя: "Футболки", "Джинсы"
  slug: string;          // t-shirts, jeans
  gender: Gender[];      // для кого доступна категория
  sizeSystem: string;    // ключ в SizeCharts
  coverImage: string;    // изображение для плитки поиска
}

export interface SizeOption { 
  code: string; 
  label: string; 
  note?: string; 
}

export type SizeChart = Record<string, SizeOption[]>; // ключ = sizeSystem

export interface Shop {
  id: string;
  name: string;
  avatar: string;        // URL аватарки
  isVerified?: boolean;
  country?: string;
  code: string;          // короткий STORECODE для SKU
  deliveryFee?: number;  // стоимость доставки
  freeDeliveryThreshold?: number; // порог бесплатной доставки
}

export interface ProductMedia {
  type: 'image' | 'video';
  url: string;
  width?: number;
  height?: number;
  cover?: boolean;        // для видео: постер/прелоад
  duration?: number;      // для видео: длительность в секундах
  thumbnailUrl?: string;  // для видео: URL превью-изображения
}

export interface Product {
  id: string;
  storeId: string;
  storeName: string;
  article: string;        // сгенерированный артикул/SKU
  name: string;
  description?: string;
  categoryId: string;     // ссылка на Category
  categoryPath?: string[]; // путь категории для новой системы атрибутов
  kind?: ApparelKind;
  gender?: Gender;
  fit?: Fit;
  pattern?: Pattern;
  material?: Material[];
  season?: Season[];
  countryOfOrigin?: string;
  color?: ColorKey;
  colors?: any[];         // расширенная палитра цветов
  colorHex?: string;      // hex палитра для UI
  price: number;
  originalPrice?: number;
  discount?: number;      // процент скидки
  rating?: number;        // рейтинг товара
  reviewCount?: number;   // количество отзывов
  sizes?: string[];       // коды размеров из SizeCharts
  media?: ProductMedia[]; // фото/видео
  tags?: string[];        // для поиска/AI
  isLiked?: boolean;      // добавлен в избранное
  
  // Новая система атрибутов
  structuredAttributes?: Array<{
    id: string;
    value: any;
    label?: string;
  }>;
  
  // Legacy атрибуты для обратной совместимости
  attributes?: Record<string, string>;
}

export interface LookItem { 
  productId: string; 
  size?: string;
  confidence?: number;    // уверенность AI в подборе (0-1)
  reason?: string;        // почему этот товар выбран
}

export interface Look {
  id: string;
  title: string;
  prompt?: string;         // исходный текст запроса
  items: LookItem[];       // набор продуктов (образ)
  coverImage?: string;     // AI-сгенерированное изображение образа
  totalPrice?: number;     // общая стоимость образа
  tags?: string[];         // теги образа
  style?: string[];        // стилевые характеристики
  occasion?: string[];     // повод использования
  season?: Season[];       // сезонность
  confidence?: number;     // общая уверенность AI в образе (0-1)
  createdAt: number;
  updatedAt?: number;
}

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
  
  // Каталог данные
  categories: Category[];
  sizeCharts: SizeChart;
  shops: Shop[];
  products: Product[];
  looks: Look[];
  
  // Корзина/заказы/уведомления  
  cart: { 
    shops: { 
      storeId: string; 
      storeName: string; 
      items: { 
        productId: string; 
        name: string; 
        image: string; 
        price: number; 
        quantity: number; 
        size?: string; 
        color?: ColorKey; 
      }[]; 
      deliveryFee: number; 
      freeDeliveryThreshold: number; 
    }[] 
  };
  orders: Order[];          // заказы покупателя
  sellerOrders: Order[];    // заказы продавца (по его storeId)
  notifications: AppNotification[];
  
  // Настройки комиссии
  serviceFee: ServiceFeeConfig;
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
  setSelectedLookId: (id: string) => void;
  addToNavigationHistory: (screen: Screen, activeTab: string) => void;
  clearNavigationHistory: () => void;
  
  // Корзина и заказы
  addToCart: (product: any, qty?: number) => void;
  removeFromCart: (productId: string, storeId: string) => void;
  changeCartQty: (productId: string, storeId: string, delta: number) => void;
  clearCart: () => void;
  
  placeOrder: (payload: { address: string }) => { orderId: string; orderNumber: string };
  setOrderStatusSeller: (orderId: string, next: OrderStatus) => void;
  markNotificationRead: (id: string) => void;
  
  // Бейджи — селекторы/хелперы
  getUnreadBuyerNotificationsCount: () => number;
  getSellerNewOrdersCount: (storeId: string) => number;
  

  persistToStorage: () => void;
  
  // Новые функции для каталога и AI
  generateLook: (prompt: string) => Promise<Look>;
  addLookToCart: (look: Look) => void;
  openVideoFeed: () => void;
  pickCategoryInSearch: (categoryId: string) => void;
}