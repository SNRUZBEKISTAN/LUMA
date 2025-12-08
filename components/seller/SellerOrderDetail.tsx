import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { StatusChip } from './StatusChip';
import { AddressCard } from './AddressCard';
import { ItemRow } from './ItemRow';
import { OrderActionBar } from './OrderActionBar';
import { Timeline } from './Timeline';
import { 
  Share, 
  Clock, 
  Truck, 
  User, 
  CreditCard, 
  FileText, 
  Package, 
  Printer,
  MessageCircle,
  Phone,
  Calendar,
  Edit
} from 'lucide-react';

type OrderStatus = 'new' | 'preparing' | 'handed' | 'in_transit' | 'delivered' | 'return' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
  sku: string;
  isPacked?: boolean;
}

interface SellerOrderDetailProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SellerOrderDetail({ onBack, onNavigate, activeTab, onTabChange }: SellerOrderDetailProps) {
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('preparing');
  const [showCourierSheet, setShowCourierSheet] = useState(false);
  const [showSlotSheet, setShowSlotSheet] = useState(false);
  const [showCancelSheet, setShowCancelSheet] = useState(false);
  const [showReturnSheet, setShowReturnSheet] = useState(false);
  const [showInvoiceSheet, setShowInvoiceSheet] = useState(false);
  const [showLabelSheet, setShowLabelSheet] = useState(false);
  const [sellerNote, setSellerNote] = useState('');
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});

  // Mock order data
  const orderData = {
    number: 'A-274593',
    createdAt: '15 янв 2024, 12:45',
    paymentMethod: 'Наличные',
    paymentStatus: 'Ожидает',
    slaDeadline: '15:30',
    customer: {
      name: 'Анна Каримова',
      phone: '+998 90 123 45 67',
      email: 'anna.karimova@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b667fcce?w=100&h=100&fit=crop&crop=face'
    },
    address: {
      short: 'ул. Амира Темура, 15',
      full: 'г. Ташкент, Юнусабадский район, ул. Амира Темура, дом 15, кв. 24',
      notes: 'Подъезд 2, домофон 124'
    },
    courier: {
      assigned: true,
      service: 'Yandex Delivery',
      trackNumber: 'YD12345678',
      eta: '14:30 - 16:00',
      type: 'Экспресс'
    },
    items: [
      {
        id: '1',
        name: 'Платье миди с принтом',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop',
        variant: 'Синий, размер M',
        price: 890000,
        quantity: 1,
        sku: 'DR-001-BL-M'
      },
      {
        id: '2',
        name: 'Блузка шелковая белая',
        image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop',
        variant: 'Белый, размер S',
        price: 650000,
        quantity: 2,
        sku: 'BL-002-WH-S'
      }
    ] as OrderItem[],
    totals: {
      subtotal: 2190000,
      delivery: 25000,
      discount: 0,
      total: 2215000
    },
    customerNote: 'Пожалуйста, позвоните за 30 минут до доставки'
  };

  const timelineSteps = [
    { id: '1', title: 'Создан', time: '12:45', status: 'completed' as const, icon: 'created' as const },
    { id: '2', title: 'Принят', time: '12:47', status: 'completed' as const, icon: 'accepted' as const },
    { id: '3', title: 'Упакован', time: '13:15', status: 'current' as const, icon: 'packed' as const },
    { id: '4', title: 'Передан курьеру', time: '', status: 'pending' as const, icon: 'handed' as const },
    { id: '5', title: 'В пути', time: '', status: 'pending' as const, icon: 'in_transit' as const },
    { id: '6', title: 'Доставлен', time: '', status: 'pending' as const, icon: 'delivered' as const },
  ];

  const historyLog = [
    { time: '13:15', action: 'Заказ упакован', user: 'Вы' },
    { time: '12:47', action: 'Заказ принят в обработку', user: 'Система' },
    { time: '12:45', action: 'Заказ создан', user: 'Покупатель' },
  ];

  const handlePackedChange = (itemId: string, isPacked: boolean) => {
    setPackedItems(prev => ({ ...prev, [itemId]: isPacked }));
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Наличные':
        return '💵';
      case 'Карта курьеру':
        return '💳';
      case 'Онлайн':
        return '🌐';
      default:
        return '💰';
    }
  };

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title={`Заказ №${orderData.number}`}
        onBack={onBack}
        storeSelector={false}
      />

      <div className="pb-32">
        {/* Header with Status and Share */}
        <div className="px-4 py-4 bg-luma-surface-0 border-b border-luma-border-200">
          <div className="flex items-center justify-between mb-4">
            <StatusChip status={orderStatus} />
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 rounded-lg">
                <Clock className="w-3 h-3 text-orange-600" />
                <span className="luma-type-cap-12 text-orange-600">
                  До {orderData.slaDeadline}
                </span>
              </div>
              
              <button className="p-2 text-luma-text-600 hover:text-luma-primary-600 transition-colors">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-luma-text-600">
            <span className="luma-type-body-14">{orderData.createdAt}</span>
            <span className="luma-type-body-14">•</span>
            <span className="flex items-center gap-1">
              <span>{getPaymentMethodIcon(orderData.paymentMethod)}</span>
              <span className="luma-type-body-14">{orderData.paymentMethod}</span>
            </span>
            <span className="luma-type-body-14">•</span>
            <span className={`luma-type-body-14 ${orderData.paymentStatus === 'Оплачен' ? 'text-luma-success-600' : 'text-orange-600'}`}>
              {orderData.paymentStatus}
            </span>
          </div>
        </div>

        {/* SLA Warning */}
        <div className="mx-4 mt-4 p-3 bg-orange-50 border border-orange-200 rounded-2xl">
          <p className="luma-type-body-14 text-orange-800">
            Подтвердите заказ до {orderData.slaDeadline}, иначе он будет автоматически отменён
          </p>
        </div>

        {/* Address Block */}
        <div className="px-4 pt-6">
          <AddressCard
            customerName={orderData.customer.name}
            customerPhone={orderData.customer.phone}
            customerAvatar={orderData.customer.avatar}
            address={orderData.address.short}
            addressFull={orderData.address.full}
            notes={orderData.address.notes}
            canEdit={orderStatus === 'new' || orderStatus === 'preparing'}
            onCall={() => console.log('Call customer')}
            onChat={() => console.log('Chat with customer')}
            onOpenMap={() => console.log('Open map')}
            onEditAddress={() => console.log('Edit address')}
          />
        </div>

        {/* Courier/Delivery Block */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Курьер</h3>
            
            {orderData.courier.assigned ? (
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="luma-type-title-14 text-luma-text-900">{orderData.courier.service}</h4>
                    <p className="luma-type-body-14 text-luma-text-600">ID: {orderData.courier.trackNumber}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className="px-2 py-1 bg-luma-primary-200 text-luma-primary-600 rounded-lg luma-type-cap-12">
                      {orderData.courier.type}
                    </span>
                    <p className="luma-type-body-14 text-luma-text-600 mt-1">
                      ETA: {orderData.courier.eta}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => console.log('Track courier')}
                    className="flex-1 py-2 bg-luma-primary-600 text-white rounded-xl luma-type-title-14"
                  >
                    Трек
                  </button>
                  <button 
                    onClick={() => setShowSlotSheet(true)}
                    className="flex-1 py-2 bg-luma-bg-0 text-luma-text-900 border border-luma-border-200 rounded-xl luma-type-title-14"
                  >
                    Изменить слот
                  </button>
                  <button 
                    onClick={() => console.log('Contact courier')}
                    className="flex-1 py-2 bg-luma-bg-0 text-luma-text-900 border border-luma-border-200 rounded-xl luma-type-title-14"
                  >
                    Связаться
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-luma-bg-0 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-luma-text-600" />
                </div>
                <p className="luma-type-body-14 text-luma-text-600 mb-4">Курьер не назначен</p>
                <button 
                  onClick={() => setShowCourierSheet(true)}
                  className="px-6 py-3 bg-luma-primary-600 text-white rounded-2xl luma-type-title-14"
                >
                  Заказать курьера
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Customer Block */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Покупатель</h3>
            
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={orderData.customer.avatar} 
                alt={orderData.customer.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              
              <div className="flex-1">
                <h4 className="luma-type-title-14 text-luma-text-900">{orderData.customer.name}</h4>
                <p className="luma-type-body-14 text-luma-text-600">{orderData.customer.phone}</p>
                {orderData.customer.email && (
                  <p className="luma-type-body-14 text-luma-text-600">{orderData.customer.email}</p>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-50 text-green-600 rounded-xl">
                <Phone className="w-4 h-4" />
                <span className="luma-type-title-14">Позвонить</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-xl">
                <MessageCircle className="w-4 h-4" />
                <span className="luma-type-title-14">Чат</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="luma-type-title-16 text-luma-text-900">Состав заказа</h3>
              <button className="flex items-center gap-1 px-2 py-1 text-luma-text-600 hover:text-luma-primary-600 transition-colors">
                <Printer className="w-3 h-3" />
                <span className="luma-type-cap-12">Печать комплектовки</span>
              </button>
            </div>
            
            <div className="space-y-0">
              {orderData.items.map((item) => (
                <ItemRow
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.name}
                  variant={item.variant}
                  price={item.price}
                  quantity={item.quantity}
                  subtotal={item.price * item.quantity}
                  sku={item.sku}
                  isPacked={packedItems[item.id] || false}
                  onPackedChange={handlePackedChange}
                  showPackingCheckbox={orderStatus === 'preparing'}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order Totals */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Итого</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="luma-type-body-14 text-luma-text-600">Товары</span>
                <span className="luma-type-body-14 text-luma-text-900">
                  {orderData.totals.subtotal.toLocaleString()} сум
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="luma-type-body-14 text-luma-text-600">Доставка</span>
                <span className="luma-type-body-14 text-luma-text-900">
                  {orderData.totals.delivery.toLocaleString()} сум
                </span>
              </div>
              
              {orderData.totals.discount > 0 && (
                <div className="flex justify-between">
                  <span className="luma-type-body-14 text-luma-text-600">Скидка</span>
                  <span className="luma-type-body-14 text-luma-success-600">
                    -{orderData.totals.discount.toLocaleString()} сум
                  </span>
                </div>
              )}
              
              <div className="border-t border-luma-border-200 pt-3">
                <div className="flex justify-between">
                  <span className="luma-type-title-16 text-luma-text-900">К оплате</span>
                  <span className="luma-type-price-16 text-luma-text-900">
                    {orderData.totals.total.toLocaleString()} сум
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 p-3 bg-luma-bg-0 rounded-xl">
              <CreditCard className="w-4 h-4 text-luma-text-600" />
              <span className="luma-type-body-14 text-luma-text-900">{orderData.paymentMethod}</span>
              <span className={`ml-auto px-2 py-1 rounded-lg luma-type-cap-12 ${
                orderData.paymentStatus === 'Оплачен' 
                  ? 'bg-green-50 text-luma-success-600' 
                  : 'bg-orange-50 text-orange-600'
              }`}>
                {orderData.paymentStatus}
              </span>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setShowInvoiceSheet(true)}
                className="flex-1 py-2 bg-luma-bg-0 text-luma-text-900 border border-luma-border-200 rounded-xl luma-type-title-14"
              >
                Выставить счёт
              </button>
              {orderStatus === 'delivered' && (
                <button 
                  onClick={() => setShowReturnSheet(true)}
                  className="flex-1 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-xl luma-type-title-14"
                >
                  Возврат
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Таймлайн</h3>
            <Timeline steps={timelineSteps} />
          </div>
        </div>

        {/* History Log */}
        <div className="px-4 pt-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">История изменений</h3>
            
            <div className="space-y-3">
              {historyLog.map((entry, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-luma-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="luma-type-body-14 text-luma-text-900">{entry.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="luma-type-cap-12 text-luma-text-600">{entry.time}</span>
                      <span className="luma-type-cap-12 text-luma-text-600">•</span>
                      <span className="luma-type-cap-12 text-luma-text-600">{entry.user}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="px-4 pt-6 pb-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Заметки</h3>
            
            {/* Customer Note */}
            {orderData.customerNote && (
              <div className="mb-4">
                <h4 className="luma-type-title-14 text-luma-text-900 mb-2">Примечание покупателя</h4>
                <p className="luma-type-body-14 text-luma-text-600 p-3 bg-luma-bg-0 rounded-xl">
                  {orderData.customerNote}
                </p>
              </div>
            )}
            
            {/* Seller Note */}
            <div>
              <h4 className="luma-type-title-14 text-luma-text-900 mb-2">Внутренняя заметка</h4>
              <textarea
                value={sellerNote}
                onChange={(e) => setSellerNote(e.target.value)}
                placeholder="Добавьте заметку для себя или команды..."
                className="w-full p-3 bg-luma-bg-0 rounded-xl border border-luma-border-200 luma-type-body-14 resize-none h-20"
              />
              <p className="luma-type-micro-10 text-luma-text-600 mt-1">Автосохранение включено</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Action Bar */}
      <OrderActionBar
        status={orderStatus}
        onAccept={() => setOrderStatus('preparing')}
        onCancel={() => setShowCancelSheet(true)}
        onCall={() => console.log('Call customer')}
        onReadyForPickup={() => setOrderStatus('handed')}
        onPrintLabel={() => setShowLabelSheet(true)}
        onOrderCourier={() => setShowCourierSheet(true)}
        onTrack={() => console.log('Track order')}
        onChangeSlot={() => setShowSlotSheet(true)}
        onCallCustomer={() => console.log('Call customer')}
        onCreateReturn={() => setShowReturnSheet(true)}
        onInvoice={() => setShowInvoiceSheet(true)}
        onDuplicateOrder={() => console.log('Duplicate order')}
        onHistory={() => console.log('Show history')}
        onChat={() => console.log('Open chat')}
      />

      <SellerBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}