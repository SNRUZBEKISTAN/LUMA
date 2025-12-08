import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { OrderSuccessModal } from './OrderSuccessModal';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { StickyActionBar } from './StickyActionBar';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  CreditCard,
  Banknote,
  Check,
  AlertCircle
} from 'lucide-react';

interface CheckoutScreenProps {
  onBack: () => void;
  onOrderComplete: (orderNumber: string) => void;
  onEditAddress: () => void;
  onAddNewAddress: () => void;
  state?: any;
  actions?: any;
}

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  shop: {
    name: string;
    avatar: string;
  };
}

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  badge?: string;
  eta: string;
}

export function CheckoutScreen({ 
  onBack, 
  onOrderComplete, 
  onEditAddress, 
  onAddNewAddress,
  state,
  actions
}: CheckoutScreenProps) {
  const [selectedDelivery, setSelectedDelivery] = React.useState('standard');
  const [selectedPayment, setSelectedPayment] = React.useState('cash');
  const [addressConfirmed, setAddressConfirmed] = React.useState(false);
  const [productsConfirmed, setProductsConfirmed] = React.useState(false);
  const [courierComment, setCourierComment] = React.useState('');
  const [showProductsExpanded, setShowProductsExpanded] = React.useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = React.useState<string>('');

  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'express',
      name: 'Экспресс 1–2 часа',
      description: 'Получите заказ уже сегодня',
      price: 30000,
      badge: 'Сегодня',
      eta: 'до 16:00'
    },
    {
      id: 'fast',
      name: 'Быстрая 3–4 часа',
      description: 'Доставка в течение дня',
      price: 15000,
      eta: 'до 19:00'
    },
    {
      id: 'standard',
      name: 'Обычная до 21:00',
      description: 'Стандартная доставка',
      price: 0,
      eta: 'до 21:00'
    }
  ];

  // Используем реальные данные из корзины или мок-данные
  const cart = state?.cart || { shops: [] };
  const serviceFee = state?.serviceFee || { mode: 'percent', percent: 2.5, minFee: 0, applyPerStore: true };
  
  const cartItems: CartItem[] = cart.shops && cart.shops.length > 0 
    ? cart.shops.flatMap((shop: any) => 
        shop.items.map((item: any) => ({
          id: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          size: item.size,
          color: typeof item.color === 'object' ? item.color.name || Object.values(item.color)[0] : item.color,
          quantity: item.quantity,
          shop: { name: shop.storeName, avatar: '🏪' }
        }))
      )
    : [
        {
          id: '1',
          name: 'Элегантное платье миди',
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=100&h=100&fit=crop',
          price: 350000,
          size: 'M',
          color: 'Синий',
          quantity: 1,
          shop: { name: 'Urban', avatar: '🏙️' }
        },
        {
          id: '2',
          name: 'Кожаные ботинки',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
          price: 180000,
          size: '38',
          color: 'Черный',
          quantity: 1,
          shop: { name: 'Nova', avatar: '✨' }
        }
      ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Рассчитываем доставку для всех магазинов с учетом выбранного типа доставки
  const calculateTotalDeliveryPrice = () => {
    let baseDeliveryPrice = 0;
    
    if (cart.shops && cart.shops.length > 0) {
      // Базовая стоимость доставки от магазинов
      baseDeliveryPrice = cart.shops.reduce((total: number, shop: any) => {
        const shopSubtotal = shop.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        const deliveryFee = shopSubtotal >= (shop.freeDeliveryThreshold || 100000) ? 0 : (shop.deliveryFee || 15000);
        return total + deliveryFee;
      }, 0);
    } else {
      // Fallback для демо - базовая доставка
      baseDeliveryPrice = 15000;
    }
    
    // Добавляем дополнительную стоимость в зависимости от типа доставки
    const selectedOption = deliveryOptions.find(option => option.id === selectedDelivery);
    const additionalDeliveryPrice = selectedOption?.price || 0;
    
    return baseDeliveryPrice + additionalDeliveryPrice;
  };
  
  const deliveryPrice = calculateTotalDeliveryPrice();
  
  // Рассчитываем комиссию сервиса
  const calculateServiceFee = () => {
    const base = subtotal + deliveryPrice;
    let fee = 0;
    
    if (serviceFee.mode === 'percent' && serviceFee.percent != null) {
      fee = Math.round(base * (serviceFee.percent / 100));
    }
    
    if (serviceFee.mode === 'flat' && serviceFee.flat != null) {
      fee = Math.round(serviceFee.flat);
    }
    
    if (serviceFee.mode === 'mixed') {
      const p = serviceFee.percent ? base * (serviceFee.percent / 100) : 0;
      const f = serviceFee.flat ?? 0;
      fee = Math.round(p + f);
    }
    
    if (serviceFee.minFee != null) fee = Math.max(fee, serviceFee.minFee);
    if (serviceFee.maxFee != null) fee = Math.min(fee, serviceFee.maxFee);
    
    return fee;
  };

  const serviceFeeAmount = calculateServiceFee();
  const total = subtotal + deliveryPrice + serviceFeeAmount;

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU');
  };

  const handleDeliverySelect = (deliveryId: string) => {
    setSelectedDelivery(deliveryId);
  };

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) return;

    setIsProcessing(true);
    
    try {
      if (actions?.placeOrder) {
        // Используем реальную логику
        const result = actions.placeOrder({ 
          address: 'Ташкент, ул. Амира Темура, 15, кв. 24' 
        });
        console.log('Заказ создан:', result);
        setCreatedOrderNumber(result.orderNumber);
        setShowOrderSuccess(true);
      } else {
        // Fallback для демо
        await new Promise(resolve => setTimeout(resolve, 2000));
        const fallbackOrderNumber = `A-${Math.floor(Math.random() * 900000) + 100000}`;
        setCreatedOrderNumber(fallbackOrderNumber);
        setShowOrderSuccess(true);
      }
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = () => {
    if (selectedPayment === 'online') return false; // Online payment disabled
    return addressConfirmed && productsConfirmed;
  };

  const handleOrderSuccess = (action: 'status' | 'home') => {
    setShowOrderSuccess(false);
    
    if (action === 'status') {
      console.log('Navigate to order status');
      // Navigate to order details page
    } else {
      onOrderComplete(createdOrderNumber);
    }
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 pt-12 pb-4 shadow-luma-soft" style={{ paddingLeft: 'var(--section-spacing)', paddingRight: 'var(--section-spacing)' }}>
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          <h1 className="text-lg font-bold text-luma-text-900">
            Оформление заказа
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6" style={{ padding: 'var(--section-spacing)', paddingBottom: '120px' }}>
          {/* Section 1: Products in Order - MOVED TO TOP */}
          <div>
            <Card className="p-4 bg-luma-surface-0 rounded-luma shadow-luma-soft">
              <button
                onClick={() => setShowProductsExpanded(!showProductsExpanded)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h3 className="text-base font-semibold text-luma-text-900">
                  Товары в заказе ({cart.shops && cart.shops.length > 0 ? cart.shops.reduce((total: number, shop: any) => total + shop.items.reduce((sum: number, item: any) => sum + item.quantity, 0), 0) : cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
                {showProductsExpanded ? (
                  <ChevronUp className="w-5 h-5 text-luma-text-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-luma-text-600" />
                )}
              </button>

              {showProductsExpanded && (
                <div className="space-y-4 mb-4">
                  {cart.shops && cart.shops.length > 0 ? (
                    cart.shops.map((shop: any, shopIndex: number) => (
                      <div key={shop.storeId} className="space-y-3">
                        {/* Заголовок магазина */}
                        <div className="flex items-center gap-2 pb-2 border-b border-luma-border-200">
                          <span className="text-sm">🏪</span>
                          <span className="text-sm font-medium text-luma-text-900">{shop.storeName}</span>
                        </div>
                        
                        {/* Товары магазина */}
                        <div className="space-y-3">
                          {shop.items.map((item: any) => (
                            <div key={item.productId} className="flex items-center gap-3">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="font-medium text-luma-text-900 text-sm">{item.name}</div>
                                <div className="text-xs text-luma-text-600">
                                  {item.size && `Размер: ${item.size}`}
                                  {item.size && item.color && ' • '}
                                  {item.color && `Цвет: ${typeof item.color === 'object' ? item.color.name || Object.values(item.color)[0] : item.color}`}
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-semibold text-luma-primary-600">
                                    {formatPrice(item.price)}
                                  </div>
                                  {item.quantity > 1 && (
                                    <div className="text-xs text-luma-text-600">
                                      ×{item.quantity}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Информация о доставке для магазина */}
                        <div className="text-xs text-luma-text-600 bg-luma-primary-200/20 p-2 rounded-lg">
                          {(() => {
                            const shopSubtotal = shop.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
                            const isFreeDelivery = shopSubtotal >= (shop.freeDeliveryThreshold || 100000);
                            const baseDeliveryFee = isFreeDelivery ? 0 : (shop.deliveryFee || 15000);
                            const selectedOption = deliveryOptions.find(option => option.id === selectedDelivery);
                            const additionalFee = selectedOption?.price || 0;
                            
                            if (isFreeDelivery && additionalFee === 0) {
                              return `✅ Бесплатная доставка (заказ от ${formatPrice(shop.freeDeliveryThreshold || 100000)})`;
                            } else if (isFreeDelivery && additionalFee > 0) {
                              return `✅ Базовая доставка бесплатно + ${formatPrice(additionalFee)} за ${selectedOption?.name.toLowerCase()}`;
                            } else if (additionalFee === 0) {
                              return `🚚 Доставка: ${formatPrice(baseDeliveryFee)}`;
                            } else {
                              return `🚚 Доставка: ${formatPrice(baseDeliveryFee)} + ${formatPrice(additionalFee)} за ${selectedOption?.name.toLowerCase()}`;
                            }
                          })()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-luma-text-900 text-sm">{item.name}</div>
                            <div className="text-xs text-luma-text-600">
                              {item.size && `Размер: ${item.size}`}
                              {item.size && item.color && ' • '}
                              {item.color && `Цвет: ${item.color}`}
                            </div>
                            <div className="text-sm font-semibold text-luma-primary-600">
                              {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-start gap-3">
                <Checkbox
                  id="products-confirm"
                  checked={productsConfirmed}
                  onCheckedChange={setProductsConfirmed}
                  className="mt-0.5 data-[state=checked]:bg-luma-success-600 data-[state=checked]:border-luma-success-600"
                />
                <label htmlFor="products-confirm" className="text-sm text-luma-text-900 cursor-pointer">
                  Подтверждаю, что выбранные товары и размеры верны
                </label>
              </div>
            </Card>
            
            {/* Divider */}
            <div className="h-4" />
          </div>

          {/* Section 2: Delivery Address - MOVED DOWN */}
          <div>
            <Card className="p-4 bg-luma-surface-0 rounded-luma shadow-luma-soft">
              <h3 className="text-base font-semibold text-luma-text-900 mb-4">Адрес доставки</h3>
              
              <div className="flex gap-4 mb-4">
                {/* Mini Map */}
                <div className="w-40 h-24 bg-luma-primary-200 rounded-xl overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-luma-primary-200 to-luma-primary-500 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-luma-primary-600" />
                  </div>
                </div>
                
                {/* Address Info */}
                <div className="flex-1">
                  <div className="text-sm font-semibold text-luma-text-900 mb-1">Основной адрес</div>
                  <div className="text-sm text-luma-text-900 mb-1">Ташкент, ул. Амира Темура, 15, кв. 24</div>
                  <div className="text-sm text-luma-text-600">Подъезд 2, домофон 24</div>
                </div>
              </div>

              {/* Address Actions */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={onEditAddress}
                  className="text-sm text-luma-primary-600 font-medium hover:text-luma-primary-500"
                >
                  Изменить
                </button>
                <button
                  onClick={onAddNewAddress}
                  className="text-sm text-luma-text-600 font-medium hover:text-luma-primary-600"
                >
                  Добавить новый
                </button>
              </div>

              {/* Address Confirmation */}
              <div className="flex items-start gap-3 mb-3">
                <Checkbox
                  id="address-confirm"
                  checked={addressConfirmed}
                  onCheckedChange={setAddressConfirmed}
                  className="mt-0.5 data-[state=checked]:bg-luma-success-600 data-[state=checked]:border-luma-success-600"
                />
                <label htmlFor="address-confirm" className="text-sm text-luma-text-900 cursor-pointer">
                  Подтверждаю, что адрес указан верно
                </label>
              </div>

              <p className="text-xs text-luma-text-600">Курьер позвонит перед доставкой</p>
            </Card>
            
            {/* Divider */}
            <div className="h-4" />
          </div>

          {/* Section 3: Delivery Method */}
          <div>
            <h3 className="text-base font-semibold text-luma-text-900 mb-4">Способ доставки</h3>
            <div className="space-y-3">
              {deliveryOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleDeliverySelect(option.id)}
                  className={`w-full p-4 rounded-luma border-2 transition-all text-left relative ${
                    selectedDelivery === option.id
                      ? 'border-luma-success-600 bg-luma-success-600/5'
                      : 'border-luma-border-200 bg-luma-surface-0 hover:border-luma-primary-500'
                  }`}
                >
                  {selectedDelivery === option.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-luma-success-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-luma-text-900">{option.name}</span>
                      {option.badge && (
                        <span className="px-2 py-1 bg-luma-primary-600 text-white text-xs font-medium rounded-full">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-luma-primary-600">
                      {option.price === 0 ? 'Без доплаты' : `+${formatPrice(option.price)}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-luma-text-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {option.eta}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div>
            <h3 className="text-base font-semibold text-luma-text-900 mb-4">Способ оплаты</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Cash Payment */}
              <button
                onClick={() => handlePaymentSelect('cash')}
                className={`p-4 rounded-luma border-2 transition-all relative ${
                  selectedPayment === 'cash'
                    ? 'border-luma-success-600 bg-luma-success-600/5'
                    : 'border-luma-border-200 bg-luma-surface-0 hover:border-luma-primary-500'
                }`}
              >
                {selectedPayment === 'cash' && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-luma-success-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex flex-col items-center gap-2">
                  <Banknote className="w-8 h-8 text-luma-primary-600" />
                  <span className="font-semibold text-luma-text-900">Наличные</span>
                </div>
              </button>

              {/* Online Payment */}
              <button
                onClick={() => handlePaymentSelect('online')}
                className={`p-4 rounded-luma border-2 transition-all relative ${
                  selectedPayment === 'online'
                    ? 'border-luma-success-600 bg-luma-success-600/5'
                    : 'border-luma-border-200 bg-luma-surface-0 hover:border-luma-primary-500'
                }`}
              >
                {selectedPayment === 'online' && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-luma-success-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className="flex flex-col items-center gap-2">
                  <CreditCard className="w-8 h-8 text-luma-primary-600" />
                  <span className="font-semibold text-luma-text-900">Картой онлайн</span>
                </div>
              </button>
            </div>

            {/* Online Payment Providers (Under Construction) */}
            {selectedPayment === 'online' && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-luma-text-900">Оплатить через:</p>
                <div className="flex gap-3">
                  {['Payme', 'Click', 'Uzum'].map((provider) => (
                    <div key={provider} className="relative opacity-70">
                      <div className="w-21 h-14 bg-luma-surface-0 border border-luma-border-200 rounded-xl flex items-center justify-center">
                        <span className="text-sm font-semibold text-luma-text-900">{provider}</span>
                      </div>
                      
                      {/* Under Construction Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-400 opacity-90 rounded-xl flex items-center justify-center transform rotate-12">
                        <div className="bg-black/80 text-yellow-300 text-xs font-bold px-1 py-0.5 rounded transform -rotate-12">
                          в разработке
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-3 bg-luma-danger-600/10 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-luma-danger-600 flex-shrink-0" />
                  <p className="text-xs text-luma-text-600">
                    Онлайн-оплата в разработке. Доступна оплата наличными.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Courier Comment */}
          <div>
            <h3 className="text-base font-semibold text-luma-text-900 mb-4">Комментарий курьеру</h3>
            <Textarea
              value={courierComment}
              onChange={(e) => setCourierComment(e.target.value)}
              placeholder="Например: позвонить за 10 минут"
              className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Section 6: Order Summary (Sticky) */}
      <div className="bg-white border-t border-gray-100 p-4 space-y-3">
        {/* Разбивка суммы */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Товары</span>
            <span>{formatPrice(subtotal)} сум</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              Доставка
              {(() => {
                const selectedOption = deliveryOptions.find(option => option.id === selectedDelivery);
                return selectedOption && selectedOption.price > 0 ? ` (${selectedOption.name.toLowerCase()})` : '';
              })()}
            </span>
            <span>{deliveryPrice === 0 ? 'Бесплатно' : `${formatPrice(deliveryPrice)} сум`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Комиссия сервиса</span>
            <span>{formatPrice(serviceFeeAmount)} сум</span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Итого</span>
            <span className="text-primary">{formatPrice(total)} сум</span>
          </div>
        </div>
        
        {/* Кнопка заказать */}
        <Button
          onClick={handlePlaceOrder}
          disabled={!isFormValid() || isProcessing}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          {isProcessing ? "Оформляем заказ..." : "Заказать"}
        </Button>
      </div>

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showOrderSuccess}
        onAction={handleOrderSuccess}
        orderNumber={createdOrderNumber}
      />
    </div>
  );
}