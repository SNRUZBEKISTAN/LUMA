import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { StoreLink } from './StoreLink';
import { CartQuantityButton } from './CartQuantityButton';
import { ProductAttributesDisplay, ProductAttributesQuick } from './ProductAttributesDisplay';
import { ProductAttribute } from '../utils/productAttributes';
import { 
  ArrowLeft, 
  Share, 
  Heart, 
  Star, 
  Check, 
  ChevronRight,
  Play
} from 'lucide-react';
import { CartShop } from '../types/app';

interface ProductDetailScreenProps {
  onBack: () => void;
  onStoreClick: (storeId: string) => void;
  onAddToCart: (productId: string, options: any) => void;
  onBuyNow: (productId: string, options: any) => void;
  onShare: () => void;
  onWishlistToggle: (productId: string) => void;
  cart: CartShop[];
  onChangeCartQty: (productId: string, storeId: string, delta: number) => void;
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

export function ProductDetailScreen({
  onBack,
  onStoreClick,
  onAddToCart,
  onBuyNow,
  onShare,
  onWishlistToggle,
  cart,
  onChangeCartQty
}: ProductDetailScreenProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('black');
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [showSizeGuide, setShowSizeGuide] = React.useState(false);

  // Mock product data
  const product = {
    id: 'prod-001',
    name: 'Элегантное платье миди из лёгкой вискозы',
    price: 245000,
    originalPrice: 350000,
    discount: 30,
    rating: 4.8,
    reviewCount: 1245,
    likes: 320,
    orders: 2140,
    description: 'Платье из лёгкой вискозы с поясом. Мягкая посадка, длина миди. Подходит для повседневных и вечерних образов. Рекомендуем ручную стирку.',
    shop: {
      id: 'shop-urban',
      name: 'Urban',
      avatar: '🏙️'
    },
    deliveryBadges: ['Сегодня', 'Возврат 7 дней'],
    categoryPath: ['Одежда', 'Платья', 'Миди'],
    attributes: {
      'Тип': 'Платье',
      'Цвета': 'Черный, Бежевый, Розовый',
      'Материал': 'Вискоза 70%, ПЭ 30%',
      'Размерная сетка': 'EU',
      'Категория': 'Женская одежда',
      'Страна производства': 'Турция',
      'Артикул': 'LUM-5842'
    },
    // Новая система атрибутов
    structuredAttributes: [
      { id: 'target_gender', value: 'Женщины' },
      { id: 'age_group', value: 'Adult 18+' },
      { id: 'occasion', value: ['ежедневная', 'smart-casual', 'деловая'] },
      { id: 'season', value: 'SS (весна-лето)' },
      { id: 'style_aesthetic', value: ['минимализм', 'классика'] },
      { id: 'size_system', value: 'EU' },
      { id: 'fit_type', value: 'Regular' },
      { id: 'primary_color', value: { name: 'Черный', hex: '#000000' } },
      { id: 'pattern', value: 'однотон' },
      { id: 'main_material', value: 'вискоза' },
      { id: 'material_composition', value: '70% вискоза, 30% полиэстер' },
      { id: 'country_of_origin', value: 'Турция' },
      { id: 'care_instructions', value: ['машинная стирка 30°C', 'не отбеливать', 'глажка низкая температура'] },
      { id: 'sleeve_length', value: 'без рукавов' },
      { id: 'neckline', value: 'круглый' },
      { id: 'closure_type', value: ['молния'] }
    ] as ProductAttribute[]
  };

  const mediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop'
    },
    {
      id: '2',
      type: 'video',
      url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop'
    },
    {
      id: '3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d35?w=400&h=400&fit=crop'
    }
  ];

  const sizes = [
    { id: 'xxs', label: 'XXS', available: false },
    { id: 'xs', label: 'XS', available: true },
    { id: 's', label: 'S', available: true },
    { id: 'm', label: 'M', available: true },
    { id: 'l', label: 'L', available: false },
    { id: 'xl', label: 'XL', available: true }
  ];

  const colors = [
    { id: 'black', label: 'Черный', hex: '#000000', available: true },
    { id: 'beige', label: 'Бежевый', hex: '#F5F5DC', available: true },
    { id: 'pink', label: 'Розовый', hex: '#FFC0CB', available: false }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      userName: 'Анна К.',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      date: '15 дек',
      text: 'Отличное платье! Качество материала превосходное, очень удобное и стильное. Рекомендую!',
      images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=60&h=60&fit=crop']
    },
    {
      id: '2',
      userName: 'Мария Д.',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      date: '12 дек',
      text: 'Красивое платье, но размер немного маловат. Советую брать на размер больше.'
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
    }
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} сум`;
  };

  const handleSizeSelect = (sizeId: string, available: boolean) => {
    if (!available) {
      // Show toast for out of stock
      alert('Нет в наличии. Подписаться на поступление?');
      return;
    }
    setSelectedSize(sizeId);
  };

  const handleColorSelect = (colorId: string, available: boolean) => {
    if (!available) {
      alert('Нет в наличии. Подписаться на поступление?');
      return;
    }
    setSelectedColor(colorId);
  };

  const handleAddToCart = () => {
    const options = { size: selectedSize, color: selectedColor };
    onAddToCart(product.id, options);
    alert('Добавлено в корзину');
  };

  const handleBuyNow = () => {
    const options = { size: selectedSize, color: selectedColor };
    onBuyNow(product.id, options);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    onWishlistToggle(product.id);
  };

  // Получаем текущее количество товара в корзине
  const getCurrentCartQuantity = () => {
    const shop = cart.find(shop => shop.storeId === product.shop.id);
    if (!shop) return 0;
    
    const item = shop.items.find(item => item.productId === product.id);
    return item ? item.quantity : 0;
  };

  const currentCartQuantity = getCurrentCartQuantity();

  // Обработчики для кнопки корзины
  const handleCartAdd = () => {
    const options = { 
      size: selectedSize, 
      color: selectedColor,
      storeId: product.shop.id,
      storeName: product.shop.name === 'directory' || !product.shop.name ? (product.storeName || 'Магазин') : product.shop.name
    };
    onAddToCart(product.id, options);
  };

  const handleCartIncrease = () => {
    onChangeCartQty(product.id, product.shop.id, 1);
  };

  const handleCartDecrease = () => {
    onChangeCartQty(product.id, product.shop.id, -1);
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          
          {/* Store Info */}
          <StoreLink
            id={product.shop.id}
            name={product.shop.name === 'directory' || !product.shop.name ? (product.storeName || 'Магазин') : product.shop.name}
            avatar={product.shop.avatar}
            variant="default"
            size="md"
            onClick={onStoreClick}
          />

          <div className="flex items-center gap-2">
            <button
              onClick={onShare}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
            >
              <Share className="w-5 h-5 text-luma-text-900" />
            </button>
            <button
              onClick={handleWishlistToggle}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-luma-danger-600 text-luma-danger-600' : 'text-luma-text-900'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Media Carousel */}
        <div className="relative aspect-square bg-luma-surface-0">
          <ImageWithFallback
            src={mediaItems[currentMediaIndex].url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Store Chip Overlay */}
          <div className="absolute top-4 left-4">
            <StoreLink
              id={product.shop.id}
              name={product.shop.name === 'directory' || !product.shop.name ? (product.storeName || 'Магазин') : product.shop.name}
              avatar={product.shop.avatar}
              variant="glass"
              size="sm"
              onClick={onStoreClick}
            />
          </div>

          {/* Video Badge */}
          {mediaItems[currentMediaIndex].type === 'video' && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-luma-text-900/80 text-white px-2 py-1 rounded-lg flex items-center gap-1">
                <Play className="w-3 h-3" />
                Видео
              </Badge>
            </div>
          )}

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

        <div className="px-4 py-6 space-y-6">
          {/* Title + Meta */}
          <div>
            <h1 className="text-xl font-bold text-luma-text-900 mb-3 line-clamp-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-luma-text-600 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span>({product.reviewCount.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{product.likes}</span>
              </div>
              <div>
                <span>Заказов: {product.orders.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {product.deliveryBadges.map((badge, index) => (
                <Badge key={index} className="bg-luma-success-600 text-white px-3 py-1 rounded-full">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-luma-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-luma-text-600 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge className="bg-luma-danger-600 text-white px-2 py-1 rounded-lg">
                  −{product.discount}%
                </Badge>
              </>
            )}
          </div>

          {/* Size Options */}
          <div>
            <h3 className="font-semibold text-luma-text-900 mb-3">Размер</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => handleSizeSelect(size.id, size.available)}
                  disabled={!size.available}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedSize === size.id
                      ? 'bg-luma-primary-600 text-white border-luma-primary-600'
                      : size.available
                        ? 'bg-luma-surface-0 text-luma-text-900 border-luma-border-200 hover:border-luma-primary-500'
                        : 'bg-luma-surface-0 text-luma-text-600 border-luma-border-200 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span className="font-medium">{size.label}</span>
                  {!size.available && (
                    <span className="block text-xs mt-1">нет в наличии</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSizeGuide(true)}
              className="text-sm text-luma-primary-600 font-medium"
            >
              Таблица размеров
            </button>
          </div>

          {/* Color Options */}
          <div>
            <h3 className="font-semibold text-luma-text-900 mb-3">Цвет</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorSelect(color.id, color.available)}
                  className={`relative w-8 h-8 rounded-full border-2 transition-all ${
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
                      <div className="w-full h-0.5 bg-red-500 transform rotate-45 translate-y-3.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Short Description */}
          <div>
            <p className="text-luma-text-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Attributes - New System */}
          <div>
            <h3 className="font-semibold text-luma-text-900 mb-4">Характеристики</h3>
            
            {/* Quick attributes display */}
            <ProductAttributesQuick
              categoryPath={product.categoryPath}
              attributes={product.structuredAttributes}
              className="mb-4"
            />
            
            {/* Detailed attributes */}
            <ProductAttributesDisplay
              categoryPath={product.categoryPath}
              attributes={product.structuredAttributes}
              className="mt-4"
            />
            
            {/* Legacy attributes fallback */}
            {(!product.structuredAttributes || product.structuredAttributes.length === 0) && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <dt className="text-sm text-luma-text-600">{key}</dt>
                    <dd className="text-sm font-medium text-luma-text-900">{value}</dd>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-luma-text-900">
                Отзывы {product.rating} ({product.reviewCount.toLocaleString()})
              </h3>
              <button className="flex items-center gap-1 text-luma-primary-600 font-medium">
                <span>Смотреть все</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-luma-surface-0 p-4 rounded-luma">
                  <div className="flex items-center gap-3 mb-2">
                    <ImageWithFallback
                      src={review.userAvatar}
                      alt={review.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-luma-text-900">{review.userName}</span>
                        <div className="flex items-center">
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
                        <span className="text-sm text-luma-text-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-luma-text-900 mb-3 line-clamp-2">{review.text}</p>
                  
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

          {/* Other from Seller */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-luma-text-900">Другие товары магазина</h3>
              <button 
                onClick={() => onStoreClick(product.shop.id)}
                className="flex items-center gap-1 text-luma-primary-600 font-medium"
              >
                <span>Смотреть все</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {otherFromSeller.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-40">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-luma"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-luma-surface-0/90 px-2 py-1 rounded-full">
                      <span className="text-xs">{product.shop.avatar}</span>
                    </div>
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-luma-danger-600 text-white px-2 py-1 rounded-lg">
                        −{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <h4 className="font-medium text-luma-text-900 line-clamp-2 mb-1">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-luma-primary-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-luma-text-600 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Products */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-luma-text-900">Похожие товары</h3>
              <button className="flex items-center gap-1 text-luma-primary-600 font-medium">
                <span>Смотреть все</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {similarProducts.map((product) => (
                <div key={product.id} className="bg-luma-surface-0 rounded-luma overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-luma-danger-600 text-white px-2 py-1 rounded-lg">
                        −{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="mb-2">
                      <StoreLink
                        id={product.shop.id}
                        name={product.shop.name === 'directory' || !product.shop.name ? (product.storeName || 'Магазин') : product.shop.name}
                        avatar={product.shop.avatar}
                        variant="minimal"
                        size="sm"
                        onClick={onStoreClick}
                        className="justify-start"
                      />
                    </div>
                    <h4 className="font-medium text-luma-text-900 line-clamp-2 mb-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-luma-primary-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-luma-text-600 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-luma-text-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Buy Bar */}
      <div className="flex-shrink-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-2xl font-bold text-luma-primary-600">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-luma-text-600 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            <CartQuantityButton
              productId={product.id}
              storeId={product.shop.id}
              currentQuantity={currentCartQuantity}
              disabled={!selectedSize}
              onAdd={handleCartAdd}
              onIncrease={handleCartIncrease}
              onDecrease={handleCartDecrease}
              className="flex-1"
            />
            <Button
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className="flex-1 bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma"
            >
              Купить сейчас
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}