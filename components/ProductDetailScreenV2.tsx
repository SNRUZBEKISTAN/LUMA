import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from './ui/sheet';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { StoreButton } from './StoreButton';
import { StickyActionBar } from './StickyActionBar';
import { FloatingBottomNav } from './FloatingBottomNav';
import { ProductCardV3 } from './ProductCardV3';
import { ProductCarousel } from './ProductCarousel';
import { ShareSheetModal, useShareSheet } from './ShareSheetModal';
import { ARFloatingButton } from './ARFloatingButton';
import { ARNotReadyModal } from './ARNotReadyModal';
import { ARComingSoonBadge } from './ARComingSoonBadge';
import { SizePicker } from './SizePicker';
import { CartQuantityButton } from './CartQuantityButton';
import { 
  ArrowLeft, 
  Share, 
  Heart, 
  Star, 
  Check, 
  ChevronRight,
  ChevronDown,
  Play,
  MessageCircle,
  UserPlus
} from 'lucide-react';

import { CartShop } from '../types/app';

import { Product, Shop } from '../types/app';

interface ProductDetailScreenV2Props {
  product: Product;
  store: Shop;
  onBack: () => void;
  onStoreClick: (storeId: string) => void;
  onAddToCart: (product: Product, qty?: number) => void;
  onBuyNow: (productId: string, options: any) => void;
  onShare: () => void;
  onWishlistToggle: (productId: string) => void;
  onChatWithStore: (storeId: string) => void;
  onFollowStore: (storeId: string) => void;
  cart: { shops: CartShop[] };
  onChangeCartQty: (productId: string, storeId: string, delta: number) => void;
  onProductClick?: (productId: string) => void;
}

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
  images?: string[];
}

interface RelatedProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  shop: {
    id: string;
    name: string;
    avatar: string;
  };
}

const SizePickerSheet = ({ 
  isOpen, 
  onClose, 
  selectedSize, 
  onSizeSelect, 
  sizes 
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: string;
  onSizeSelect: (sizeId: string, available: boolean) => void;
  sizes: Array<{ id: string; label: string; available: boolean }>;
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[45vh] bg-luma-surface-0 rounded-t-luma-lg">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-center text-luma-text-900">Размер</SheetTitle>
          <SheetDescription className="text-center text-luma-text-600 text-sm">
            Выберите подходящий размер для данного товара
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-hidden">
          {/* iOS-style wheel picker - reduced height with 5 visible rows */}
          <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 h-11 -translate-y-1/2 bg-luma-primary-200/20 rounded-lg border-2 border-luma-primary-200"></div>
            
            <div className="h-full overflow-y-auto scrollbar-hide snap-y snap-mandatory" style={{ 
              maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
            }}>
              <div className="py-24">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => onSizeSelect(size.id, size.available)}
                    disabled={!size.available}
                    className={`w-full h-11 snap-center flex items-center justify-center transition-all ${
                      selectedSize === size.id
                        ? 'text-luma-text-900 font-bold text-lg'
                        : size.available
                          ? 'text-luma-text-600 text-base'
                          : 'text-luma-text-600/40 text-base'
                    }`}
                  >
                    <span className="flex items-center justify-between w-full max-w-xs">
                      <span>{size.label}</span>
                      {!size.available && <span className="text-base">🚫</span>}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-luma-border-200">
          <button 
            className="w-full text-luma-primary-600 font-medium mb-4"
            onClick={() => console.log('Size guide')}
          >
            Таблица размеров
          </button>
          <Button
            onClick={onClose}
            className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma"
          >
            Готово
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export function ProductDetailScreenV2({
  product: propProduct,
  store: propStore,
  onBack,
  onStoreClick,
  onAddToCart,
  onBuyNow,
  onShare,
  onWishlistToggle,
  onChatWithStore,
  onFollowStore,
  cart,
  onChangeCartQty,
  onProductClick
}: ProductDetailScreenV2Props) {
  const [currentMediaIndex, setCurrentMediaIndex] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [showSizePicker, setShowSizePicker] = React.useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [showARModal, setShowARModal] = React.useState(false);

  // Share functionality
  const { shareState, closeShare, share } = useShareSheet();

  // Generate stable mock statistics based on product ID (won't change on re-renders)
  const productStats = React.useMemo(() => {
    // Use product ID as seed for consistent values
    const seed = propProduct.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = (multiplier: number) => ((seed * multiplier) % 1000) / 1000;
    
    return {
      rating: 4.5 + rng(17) * 0.5,
      reviewCount: Math.floor(rng(23) * 2000) + 100,
      likes: Math.floor(rng(31) * 500) + 50,
      orders: Math.floor(rng(41) * 3000) + 200
    };
  }, [propProduct.id]);

  // Use real product data from props with stable statistics
  const product = {
    id: propProduct.id,
    name: propProduct.name,
    price: propProduct.price,
    originalPrice: propProduct.originalPrice,
    discount: propProduct.originalPrice ? Math.round((1 - propProduct.price / propProduct.originalPrice) * 100) : undefined,
    rating: productStats.rating,
    reviewCount: productStats.reviewCount,
    likes: productStats.likes,
    orders: productStats.orders,
    description: propProduct.description || `${propProduct.name}. Отличное качество и стиль. Подходит для различных случаев.`,
    shop: {
      id: propStore.id,
      name: propStore.name,
      avatar: propStore.avatar
    },
    attributes: {
      'Тип': propProduct.kind,
      'Материал': propProduct.material?.join(', ') || 'Не указан',
      'Размеры': propProduct.sizes.join(', '),
      'Цвет': propProduct.color,
      'Категория': propProduct.gender === 'women' ? 'Женская одежда' : propProduct.gender === 'men' ? 'Мужская одежда' : 'Детская одежда',
      'Страна производства': propProduct.countryOfOrigin || 'Не указана',
      'Артикул': propProduct.article
    }
  };

  const mediaItems: MediaItem[] = propProduct.media.map((media, index) => ({
    id: String(index + 1),
    type: media.type,
    url: media.url,
    thumbnail: media.cover ? media.url : undefined
  }));

  // Получаем размеры из данных продукта
  const sizes = React.useMemo(() => {
    if (propProduct.sizes && Array.isArray(propProduct.sizes)) {
      return propProduct.sizes.map(size => ({
        id: size.toLowerCase(),
        label: size,
        available: true // В реальном приложении это будет проверяться из наличия
      }));
    }
    
    // Fallback для демо
    return [
      { id: 'xxs', label: 'XXS', available: false },
      { id: 'xs', label: 'XS', available: true },
      { id: 's', label: 'S', available: true },
      { id: 'm', label: 'M', available: true },
      { id: 'l', label: 'L', available: false },
      { id: 'xl', label: 'XL', available: true }
    ];
  }, [propProduct.sizes]);

  // Получаем цвета из данных продукта
  const colors = React.useMemo(() => {
    if (propProduct.color) {
      // Если это строка, создаем один цвет
      if (typeof propProduct.color === 'string') {
        return [
          { id: propProduct.color.toLowerCase(), label: propProduct.color, hex: '#808080', available: true }
        ];
      }
      
      // Если это объект с цветами
      if (typeof propProduct.color === 'object' && !Array.isArray(propProduct.color)) {
        return Object.entries(propProduct.color).map(([key, value]) => ({
          id: key,
          label: typeof value === 'string' ? value : key,
          hex: '#808080', // В реальном приложении это будет браться из данных
          available: true
        }));
      }
    }
    
    // Fallback для демо
    return [
      { id: 'black', label: 'Чёрный', hex: '#000000', available: true },
      { id: 'beige', label: 'Бежевый', hex: '#F5F5DC', available: true },
      { id: 'pink', label: 'Розовый', hex: '#FFC0CB', available: false }
    ];
  }, [propProduct.color]);

  // Автоматически выбираем цвет, если есть только один вариант
  React.useEffect(() => {
    if (colors.length === 1 && colors[0].available && !selectedColor) {
      setSelectedColor(colors[0].id);
    }
  }, [colors, selectedColor]);

  // Отслеживаем изменения размера и цвета, чтобы пересчитать количество в корзине
  const [previousVariant, setPreviousVariant] = React.useState<{size: string, color: string}>({
    size: '',
    color: ''
  });

  React.useEffect(() => {
    const currentVariant = {
      size: selectedSize,
      color: selectedColor
    };

    // Если изменился размер или цвет, это новый вариант товара
    const variantChanged = currentVariant.size !== previousVariant.size || 
                          currentVariant.color !== previousVariant.color;

    if (variantChanged) {
      setPreviousVariant(currentVariant);
      // Количество будет пересчитано автоматически через getCurrentQuantityInCart
    }
  }, [selectedSize, selectedColor, previousVariant]);

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Анна К.',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '15 дек',
      text: 'Отличное платье! Качество материала превосходное, очень удобное и стильное. Рекомендую всем!',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80&h=80&fit=crop']
    },
    {
      id: '2',
      userName: 'Мария Д.',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      date: '12 дек',
      text: 'Красивое платье, но размер немного маловат. Советую брать на размер больше для комфорта.'
    },
    {
      id: '3',
      userName: 'Елена С.',
      userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '10 дек',
      text: 'Превосходное качество! Платье сидит идеально, материал приятный к телу.'
    }
  ];

  const otherFromSeller: RelatedProduct[] = [
    {
      id: '1',
      name: 'Блузка шёлковая',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=160&h=200&fit=crop',
      price: 125000,
      rating: 4.6,
      shop: product.shop
    },
    {
      id: '2',
      name: 'Юбка плиссе',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d35?w=160&h=200&fit=crop',
      price: 95000,
      originalPrice: 140000,
      discount: 32,
      rating: 4.9,
      shop: product.shop
    },
    {
      id: '3',
      name: 'Топ вязаный',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=160&h=200&fit=crop',
      price: 85000,
      originalPrice: 120000,
      discount: 29,
      rating: 4.5,
      shop: product.shop
    },
    {
      id: '4',
      name: 'Кардиган длинный',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=160&h=200&fit=crop',
      price: 145000,
      rating: 4.7,
      shop: product.shop
    },
    {
      id: '5',
      name: 'Брюки классические',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=160&h=200&fit=crop',
      price: 110000,
      originalPrice: 150000,
      discount: 27,
      rating: 4.3,
      shop: product.shop
    },
    {
      id: '6',
      name: 'Жакет офисный',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=160&h=200&fit=crop',
      price: 160000,
      rating: 4.8,
      shop: product.shop
    }
  ];

  const similarProducts: RelatedProduct[] = [
    {
      id: '1',
      name: 'Платье летнее макси',
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=180&h=240&fit=crop',
      price: 180000,
      rating: 4.7,
      shop: { id: 'chic', name: 'Chic', avatar: '💅' }
    },
    {
      id: '2',
      name: 'Платье коктейльное',
      image: 'https://images.unsplash.com/photo-1566479179817-c0e393e3000a?w=180&h=240&fit=crop',
      price: 290000,
      originalPrice: 420000,
      discount: 31,
      rating: 4.9,
      shop: { id: 'nova', name: 'Nova', avatar: '✨' }
    },
    {
      id: '3',
      name: 'Платье миди элегантное',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=180&h=240&fit=crop',
      price: 220000,
      originalPrice: 280000,
      discount: 21,
      rating: 4.6,
      shop: { id: 'elegance', name: 'Elegance', avatar: '🌟' }
    },
    {
      id: '4',
      name: 'Платье вечернее',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=180&h=240&fit=crop',
      price: 350000,
      rating: 4.8,
      shop: { id: 'luxury', name: 'Luxury', avatar: '👑' }
    },
    {
      id: '5',
      name: 'Платье повседневное',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=180&h=240&fit=crop',
      price: 120000,
      originalPrice: 160000,
      discount: 25,
      rating: 4.4,
      shop: { id: 'casual', name: 'Casual', avatar: '👕' }
    },
    {
      id: '6',
      name: 'Платье офисное',
      image: 'https://images.unsplash.com/photo-1582142306909-195724d33afc?w=180&h=240&fit=crop',
      price: 195000,
      rating: 4.5,
      shop: { id: 'office', name: 'Office', avatar: '💼' }
    },
    {
      id: '7',
      name: 'Платье летнее короткое',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=180&h=240&fit=crop',
      price: 140000,
      originalPrice: 180000,
      discount: 22,
      rating: 4.7,
      shop: { id: 'summer', name: 'Summer', avatar: '☀️' }
    }
  ];

  const popularProducts: RelatedProduct[] = [
    {
      id: '1',
      name: 'Блузка классическая',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=180&h=240&fit=crop',
      price: 89000,
      rating: 4.5,
      shop: { id: 'style', name: 'Style', avatar: '👔' }
    },
    {
      id: '2',
      name: 'Юбка мини',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d35?w=180&h=240&fit=crop',
      price: 65000,
      originalPrice: 85000,
      discount: 24,
      rating: 4.8,
      shop: { id: 'trend', name: 'Trend', avatar: '🌟' }
    },
    {
      id: '3',
      name: 'Кардиган вязаный',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=180&h=240&fit=crop',
      price: 120000,
      rating: 4.6,
      shop: { id: 'cozy', name: 'Cozy', avatar: '🧶' }
    },
    {
      id: '4',
      name: 'Топ кружевной',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=180&h=240&fit=crop',
      price: 75000,
      originalPrice: 95000,
      discount: 21,
      rating: 4.7,
      shop: { id: 'lace', name: 'Lace', avatar: '🌸' }
    },
    {
      id: '5',
      name: 'Брюки зауженные',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=180&h=240&fit=crop',
      price: 110000,
      rating: 4.4,
      shop: { id: 'urban', name: 'Urban', avatar: '🏙️' }
    },
    {
      id: '6',
      name: 'Жакет льняной',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=180&h=240&fit=crop',
      price: 140000,
      originalPrice: 180000,
      discount: 22,
      rating: 4.9,
      shop: { id: 'linen', name: 'Linen', avatar: '🌾' }
    },
    {
      id: '7',
      name: 'Свитер оверсайз',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=180&h=240&fit=crop',
      price: 135000,
      originalPrice: 170000,
      discount: 21,
      rating: 4.6,
      shop: { id: 'comfort', name: 'Comfort', avatar: '🐑' }
    },
    {
      id: '8',
      name: 'Джинсы скинни',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=180&h=240&fit=crop',
      price: 95000,
      rating: 4.3,
      shop: { id: 'denim', name: 'Denim', avatar: '👖' }
    },
    {
      id: '9',
      name: 'Рубашка белая',
      image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=180&h=240&fit=crop',
      price: 78000,
      originalPrice: 98000,
      discount: 20,
      rating: 4.7,
      shop: { id: 'classic', name: 'Classic', avatar: '🎯' }
    }
  ];

  const formatPrice = (price: number | undefined) => {
    if (price === undefined || price === null) return '';
    return price.toLocaleString('ru-RU');
  };

  const handleSizeSelect = (sizeId: string, available: boolean) => {
    if (!available) {
      alert('Размер недоступен');
      return;
    }
    setSelectedSize(sizeId);
  };

  const handleSizePickerSelect = (selectedLabel: string) => {
    // Найдем размер по label и установим его id
    const sizeItem = sizes.find(size => size.label === selectedLabel);
    if (sizeItem && sizeItem.available) {
      setSelectedSize(sizeItem.id);
    }
  };

  // Безопасная функция для получения label размера
  const getSizeLabel = (sizeId: string) => {
    const size = sizes.find(s => s.id === sizeId);
    const result = size ? size.label : '';
    // Убедимся что возвращаем строку, а не объект
    return typeof result === 'string' ? result : String(result);
  };

  const handleColorSelect = (colorId: string, available: boolean) => {
    if (!available) {
      alert('Нет в наличии. Уведомить о поступлении?');
      return;
    }
    setSelectedColor(colorId);
  };

  const handleAddToCart = () => {
    // Валидация размера
    if (sizes.length > 0 && !selectedSize) {
      alert('Выберите размер');
      return;
    }
    
    // Валидация цвета (если есть выбор цветов)
    if (colors.length > 1 && !selectedColor) {
      alert('Выберите цвет');
      return;
    }
    
    // Создаем объект товара для корзины с выбранными опциями
    const productForCart = {
      ...propProduct,
      selectedSize: selectedSize ? getSizeLabel(selectedSize) : undefined,
      color: selectedColor ? colors.find(c => c.id === selectedColor)?.label || selectedColor : propProduct.color
    };
    
    onAddToCart(productForCart, 1);
    
    // Показываем уведомление без alert (в реальном приложении это будет toast)
    console.log('Товар добавлен в корзину');
  };

  const handleBuyNow = () => {
    // Валидация размера
    if (sizes.length > 0 && !selectedSize) {
      alert('Выберите размер');
      return;
    }
    
    // Валидация цвета (если есть выбор цветов)
    if (colors.length > 1 && !selectedColor) {
      alert('Выберите цвет');
      return;
    }
    
    const options = { 
      size: selectedSize ? getSizeLabel(selectedSize) : undefined, 
      color: selectedColor ? colors.find(c => c.id === selectedColor)?.label || selectedColor : propProduct.color
    };
    onBuyNow(propProduct.id, options);
  };

  // Получаем количество текущего товара в корзине с учетом размера и цвета
  const getCurrentQuantityInCart = () => {
    const shop = cart.shops.find(shop => shop.storeId === propProduct.storeId);
    if (!shop) return 0;
    
    // Создаем ключ для текущего варианта товара
    const currentSize = selectedSize ? getSizeLabel(selectedSize) : undefined;
    const currentColor = selectedColor ? colors.find(c => c.id === selectedColor)?.label || selectedColor : propProduct.color;
    
    // Ищем товар с точно такими же характеристиками
    const item = shop.items.find(item => 
      item.productId === propProduct.id && 
      item.size === currentSize &&
      JSON.stringify(item.color) === JSON.stringify(currentColor)
    );
    
    return item ? item.quantity : 0;
  };

  // Получаем количество текущего варианта товара в корзине
  // При изменении размера или цвета количество автоматически обнуляется,
  // так как это фактически новый товар с другими характеристиками
  const currentQuantity = getCurrentQuantityInCart();

  // Обработчики для изменения количества в корзине
  const handleIncreaseQuantity = () => {
    // Валидация размера и цвета перед изменением количества
    if (sizes.length > 0 && !selectedSize) {
      alert('Выберите размер');
      return;
    }
    
    if (colors.length > 1 && !selectedColor) {
      alert('Выберите цвет');
      return;
    }
    
    // Создаем объект товара для корзины с выбранными опциями
    const productForCart = {
      ...propProduct,
      selectedSize: selectedSize ? getSizeLabel(selectedSize) : undefined,
      color: selectedColor ? colors.find(c => c.id === selectedColor)?.label || selectedColor : propProduct.color
    };
    
    // Добавляем через onAddToCart для правильной обработки вариантов
    onAddToCart(productForCart, 1);
  };

  const handleDecreaseQuantity = () => {
    // Создаем объект товара с теми же характеристиками, но с отрицательным количеством
    const productForCart = {
      ...propProduct,
      selectedSize: selectedSize ? getSizeLabel(selectedSize) : undefined,
      color: selectedColor ? colors.find(c => c.id === selectedColor)?.label || selectedColor : propProduct.color
    };
    
    // Используем addToCart с отрицательным количеством для уменьшения
    onAddToCart(productForCart, -1);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onWishlistToggle(product.id);
  };

  const handleFollowStore = () => {
    setIsFollowing(!isFollowing);
    onFollowStore(product.shop.id);
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    // In real app, this would start video playback
  };

  const handleShare = () => {
    const productUrl = `${window.location.origin}/product/${product.id}`;
    share(productUrl, product.name);
  };

  const handleARTryOn = () => {
    // Check if AR is supported or available
    const isARSupported = false; // For now, AR is not ready
    
    if (isARSupported) {
      // Launch AR camera
      console.log('Launching AR camera...');
    } else {
      setShowARModal(true);
    }
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* iOS Header - Product name as title */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-[47px] pb-[14px] shadow-luma-soft pr-[14px] pl-[14px]">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          
          <h1 className="text-17 font-semibold text-luma-text-900 line-clamp-1 flex-1 text-center mx-4"
              style={{ fontSize: '17px', lineHeight: '22px' }}>
            {product.name}
          </h1>

          <button
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <Share className="w-5 h-5 text-luma-text-900" />
          </button>
        </div>
      </div>

      {/* Scrollable Content - Updated bottom padding for StickyActionBar */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* 1. Media Carousel - Content padding L/R = 16px */}
        <div className="px-4 mt-[0px] mr-[0px] mb-[-10px] ml-[0px]">
          <div className="relative aspect-[4/5] bg-luma-surface-0 rounded-0">
            <ImageWithFallback
              src={mediaItems[currentMediaIndex].url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Video Play Button & Badge */}
            {mediaItems[currentMediaIndex].type === 'video' && !isVideoPlaying && (
              <>
                <button
                  onClick={handleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-luma-text-900 ml-1" />
                  </div>
                </button>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-luma-text-900/80 text-white px-3 py-1 rounded-lg">
                    Видеообзор
                  </Badge>
                </div>
              </>
            )}

            {/* AR Floating Button */}
            <ARFloatingButton onClick={handleARTryOn} />

            {/* Media Dots */}
            {mediaItems.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {mediaItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentMediaIndex ? 'bg-luma-primary-600' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* AR Coming Soon Badge */}
          <ARComingSoonBadge />
        </div>

        <div className="px-4 py-6 space-y-6 pt-[0px] pr-[14px] pb-[21px] pl-[14px]">
          {/* 2. Store Row - Using StoreButton component with proper navigation */}
          <div className="flex items-center justify-between">
            <StoreButton
              storeId={product.shop.id}
              storeName={product.shop.name === 'directory' || !product.shop.name ? (product.storeName || 'Магазин') : product.shop.name}
              storeAvatar={product.shop.avatar}
              avatarSize={32}
              nameSize="base"
              onStoreClick={onStoreClick}
              className="p-2 flex-1 justify-start"
            />
            
            <button
              onClick={handleWishlistToggle}
              className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-luma-primary-200/50 transition-colors min-h-[44px] min-w-[44px]"
              aria-label={isWishlisted ? 'Убрать из избранного' : 'Добавить в избранное'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-luma-text-600'}`} />
              <span className="text-xs uppercase tracking-wide text-luma-text-600 font-medium">
                {product.likes}
              </span>
            </button>
          </div>

          {/* 3. Title + Meta - Moved under store row with larger title */}
          <div>
            <h2 className="text-lg font-bold text-luma-text-900 mb-1 line-clamp-2" style={{ fontSize: '18px', lineHeight: '24px' }}>
              {product.name}
            </h2>
            

            
            <div className="flex items-center gap-4 text-xs uppercase tracking-wide text-luma-text-600">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
                <span>({product.reviewCount.toLocaleString()})</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{product.likes}</span>
              </div>
              <span>•</span>
              <div>
                <span>Заказов: {product.orders.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Edge-to-Edge Price Band - Updated font sizes */}
        <div className="relative -mx-4 bg-luma-primary-200/90 shadow-luma-soft mx-[10px] my-[0px] rounded-[10px]">
          <div className="px-4 py-4 rounded-[10px] px-[5px] py-[14px] mx-[10px] mx-[5px] my-[0px]">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-luma-text-900" style={{ fontSize: '21px', lineHeight: '28px' }}>
                  Сейчас: {formatPrice(product.price)}
                </span>
              </div>
              {product.originalPrice && (
                <div className="flex items-center gap-3">
                  <span className="text-luma-text-600 line-through" style={{ fontSize: '14px', lineHeight: '18px', fontWeight: '400' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="bg-luma-danger-600 text-white rounded-lg font-bold px-3 py-1 min-w-[44px] h-[28px] flex items-center justify-center" 
                         style={{ fontSize: '14px', lineHeight: '18px' }}>
                    −{product.discount}%
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* 5. Options */}
          <div className="space-y-6">
            {/* Colors */}
            <div>
              <h3 className="font-semibold text-luma-text-900 mb-3">Цвет</h3>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color.id, color.available)}
                    className={`relative w-7 h-7 rounded-full border-2 transition-all flex-shrink-0 ${
                      selectedColor === color.id
                        ? 'border-luma-primary-600'
                        : 'border-luma-border-200'
                    } ${!color.available ? 'opacity-50' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  >
                    {selectedColor === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow-lg" />
                      </div>
                    )}
                    {!color.available && (
                      <div className="absolute inset-0 bg-red-500/20 rounded-full">
                        <div className="w-full h-0.5 bg-red-500 transform rotate-45 translate-y-3" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Picker */}
            <div>
              <h3 className="font-semibold text-luma-text-900 mb-3">Размер</h3>
              <button
                onClick={() => setShowSizePicker(true)}
                className="flex items-center justify-between w-full p-3 border border-luma-border-200 rounded-luma hover:border-luma-primary-600 transition-colors"
              >
                <span className={selectedSize ? 'text-luma-text-900 font-medium' : 'text-luma-text-600'}>
                  {selectedSize ? getSizeLabel(selectedSize) || 'Размер не найден' : 'Выбрать размер'}
                </span>
                <ChevronDown className="w-5 h-5 text-luma-text-600" />
              </button>
            </div>
          </div>

          {/* 6. Short Description */}
          <div>
            <p className="text-luma-text-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* 7. Attributes */}
          <div>
            <h3 className="font-semibold text-luma-text-900 mb-4">Характеристики</h3>
            <div className="bg-luma-surface-0 rounded-luma p-4 space-y-3">
              {Object.entries(product.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start border-b border-luma-border-200 pb-2 last:border-b-0 last:pb-0">
                  <dt className="text-sm text-luma-text-600 w-1/3">{key}</dt>
                  <dd className="text-sm font-medium text-luma-text-900 w-2/3 text-right">{value}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Reviews - Horizontal Slider */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-luma-text-900">
                Отзывы {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
              </h3>
              <button className="flex items-center gap-1 text-luma-primary-600 font-medium">
                <span>Смотреть всё</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-luma-surface-0 p-4 rounded-luma flex-shrink-0 w-80 shadow-luma-soft">
                  <div className="flex items-center gap-3 mb-3">
                    <ImageWithFallback
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-luma-text-900">{review.userName}</span>
                        <span className="text-sm text-luma-text-600">{review.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-luma-border-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-luma-text-900 text-sm line-clamp-3 mb-3">{review.text}</p>
                  
                  {review.images && (
                    <div className="flex gap-2">
                      {review.images.map((image, index) => (
                        <ImageWithFallback
                          key={index}
                          src={image}
                          alt="Review"
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 9. Other from Seller */}
          <div className="px-4 mb-6 py-[0px] px-[5px]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-luma-text-900">
                Другие товары магазина
              </h4>
              <button 
                onClick={() => onStoreClick(product.shop.id)}
                className="flex items-center gap-1 text-luma-primary-600 font-medium hover:text-luma-primary-500 transition-colors"
              >
                <span className="text-sm">Смотреть всё</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <ProductCarousel
              products={otherFromSeller.map(p => ({
                id: p.id,
                name: p.name,
                image: p.image,
                price: p.price,
                originalPrice: p.originalPrice,
                storeName: p.shop.name === 'directory' || !p.shop.name ? (p.storeName || 'Магазин') : p.shop.name,
                storeAvatar: p.shop.avatar
              }))}
              onProductClick={(id) => {
                onProductClick?.(id);
              }}
              onStoreClick={(id) => console.log('Store clicked:', id)}
              onAddToCart={(id) => {
                const relatedProduct = otherFromSeller.find(p => p.id === id);
                if (relatedProduct) {
                  onAddToCart(relatedProduct, 1);
                }
              }}
            />
          </div>

          {/* 10. Similar Products */}
          <div className="px-4 mb-6 px-[5px] py-[0px]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-luma-text-900">
                Похожие товары
              </h4>
              <button 
                onClick={() => console.log('View all similar products')}
                className="flex items-center gap-1 text-luma-primary-600 font-medium hover:text-luma-primary-500 transition-colors"
              >
                <span className="text-sm">Смотреть всё</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <ProductCarousel
              products={similarProducts.map(p => ({
                id: p.id,
                name: p.name,
                image: p.image,
                price: p.price,
                originalPrice: p.originalPrice,
                storeName: p.shop.name === 'directory' || !p.shop.name ? (p.storeName || 'Магазин') : p.shop.name,
                storeAvatar: p.shop.avatar
              }))}
              onProductClick={(id) => {
                onProductClick?.(id);
              }}
              onStoreClick={(id) => console.log('Store clicked:', id)}
              onAddToCart={(id) => {
                const relatedProduct = similarProducts.find(p => p.id === id);
                if (relatedProduct) {
                  onAddToCart(relatedProduct, 1);
                }
              }}
            />
          </div>

          {/* 11. Popular Products */}
          <div className="px-4 mb-6 px-[5px] py-[0px]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-luma-text-900">
                Популярные товары
              </h4>
              <button 
                onClick={() => console.log('View all popular products')}
                className="flex items-center gap-1 text-luma-primary-600 font-medium hover:text-luma-primary-500 transition-colors"
              >
                <span className="text-sm">Смотреть всё</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <ProductCarousel
              products={popularProducts.map(p => ({
                id: p.id,
                name: p.name,
                image: p.image,
                price: p.price,
                originalPrice: p.originalPrice,
                storeName: p.shop.name === 'directory' || !p.shop.name ? (p.storeName || 'Магазин') : p.shop.name,
                storeAvatar: p.shop.avatar
              }))}
              onProductClick={(id) => {
                onProductClick?.(id);
              }}
              onStoreClick={(id) => console.log('Store clicked:', id)}
              onAddToCart={(id) => {
                const relatedProduct = popularProducts.find(p => p.id === id);
                if (relatedProduct) {
                  onAddToCart(relatedProduct, 1);
                }
              }}
            />
          </div>
        </div>
      </div>

      <StickyActionBar
        layout="twoButtons"
        summary="price"
        summaryTitle="Итого"
        summaryValue={formatPrice(product.price)}
        primaryLabel="Купить сейчас"
        secondaryLabel="В корзину"
        state={(sizes.length > 0 && !selectedSize) ? 'disabled' : 'default'}
        onPrimaryClick={handleBuyNow}
        onSecondaryClick={handleAddToCart}
        onAddToCart={handleAddToCart}
        cartQuantity={currentQuantity}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />

      {/* Size Picker */}
      <SizePicker
        isOpen={showSizePicker}
        onClose={() => setShowSizePicker(false)}
        selectedSize={getSizeLabel(selectedSize)}
        onSizeSelect={handleSizePickerSelect}
        sizes={sizes.filter(size => size.available).map(size => String(size.label))}
      />

      {/* Share Sheet Modal */}
      <ShareSheetModal
        isOpen={shareState.isOpen}
        onClose={closeShare}
        url={shareState.url || ''}
        title={shareState.title || ''}
      />

      {/* AR Not Ready Modal */}
      <ARNotReadyModal
        isOpen={showARModal}
        onClose={() => setShowARModal(false)}
      />
    </div>
  );
}