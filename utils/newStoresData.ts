import { Shop, Product, ProductMedia } from '../types/app';
import { genArticle } from './sku';
import { ProductAttribute } from './productAttributes';

// GitHub video base - using specific commit hash for reliability
const GITHUB_COMMIT = 'bfee292aeebf35bdb214cca5c283ef40ab1b1258';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/SNRUZBEKISTAN/LUMA/${GITHUB_COMMIT}/stores`;

// === JUST STORE MEDIA ASSETS (Premium Fashion) ===
const JUST_IMAGES = [
  'https://images.unsplash.com/photo-1638717366457-dbcaf6b1afbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1705232497552-abd05ad64485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1763336016192-c7b62602e993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1761164920960-2d776a18998c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762432876586-76ff27b06f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1620799139652-715e4d5b232d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762341124796-530c0085f7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762112211843-e75e0c16a407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1694642197844-9e5dc0338ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1760083545495-b297b1690672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1622080159621-bfceab50b3e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1624902810049-8ea0199d32ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1562041350-7778a082a797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1554325109-87755d48a3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762342685668-a76f1a57d7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1680789526833-9b09dee3d68e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1623113758911-db913c487b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1759162820690-b09c674bab82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
];

// JUST store videos from GitHub - ONLY REAL VIDEOS
const JUST_VIDEOS = [
  `${GITHUB_RAW_BASE}/Just/1.mp4`,
  `${GITHUB_RAW_BASE}/Just/2.mp4`
];

// === OZBE STORE MEDIA ASSETS (Urban Streetwear) ===
const OZBE_IMAGES = [
  'https://images.unsplash.com/photo-1635650805015-2fa50682873a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1632682582909-2b3a2581eef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1651828855150-ba40f6870a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1750338602837-6a1e93e206c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1602585198422-d795fa9bfd6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1639602182178-2dc689354103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1750857739948-48466483515d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1696661115319-a9b6801e2571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1679768763201-e07480531b49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1764265554883-9804fe44f330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1759567066672-4b9f48000096?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1764026721657-4b41e0201988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1759056911301-59c6f138e397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1635650805015-2fa50682873a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1651828855150-ba40f6870a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1632682582909-2b3a2581eef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
];

// OZBE store videos from GitHub - ONLY REAL VIDEOS
const OZBE_VIDEOS = [
  `${GITHUB_RAW_BASE}/Ozbe/1.mp4`
];

// === PINKISLAND STORE MEDIA ASSETS (Feminine Fashion) ===
const PINKISLAND_IMAGES = [
  'https://images.unsplash.com/photo-1601740289404-6d0dca1bc904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1763971922542-59c7609114f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1624902810049-8ea0199d32ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762342685668-a76f1a57d7d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1562041350-7778a082a797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1694642197844-9e5dc0338ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1760083545495-b297b1690672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1622080159621-bfceab50b3e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762112211843-e75e0c16a407?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1638717366457-dbcaf6b1afbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1705232497552-abd05ad64485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1763336016192-c7b62602e993?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1761164920960-2d776a18998c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762432876586-76ff27b06f44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1761117228880-df2425bd70da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1620799139652-715e4d5b232d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1762341124796-530c0085f7d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1554325109-87755d48a3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
  'https://images.unsplash.com/photo-1759162820690-b09c674bab82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
];

// PINKISLAND store videos - ONLY REAL VIDEOS from GitHub
const PINKISLAND_VIDEOS = [
  `${GITHUB_RAW_BASE}/Pinkisland/1.mp4`,
  `${GITHUB_RAW_BASE}/Pinkisland/2.mp4`,
  `${GITHUB_RAW_BASE}/Pinkisland/3.mp4`
];

// Three new premium stores
export const NEW_STORES: Shop[] = [
  {
    id: 'shop-just',
    name: 'JUST',
    avatar: 'https://images.unsplash.com/photo-1638717366457-dbcaf6b1afbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&h=100&crop=face',
    code: 'JST',
    isVerified: true,
    country: 'Узбекистан',
    deliveryFee: 15000,
    freeDeliveryThreshold: 200000
  },
  {
    id: 'shop-ozbe',
    name: 'OZBE',
    avatar: 'https://images.unsplash.com/photo-1635650805015-2fa50682873a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&h=100&crop=face',
    code: 'OZB',
    isVerified: true,
    country: 'Узбекистан',
    deliveryFee: 18000,
    freeDeliveryThreshold: 250000
  },
  {
    id: 'shop-pinkisland',
    name: 'PINK ISLAND',
    avatar: 'https://images.unsplash.com/photo-1601740289404-6d0dca1bc904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&h=100&crop=face',
    code: 'PNK',
    isVerified: true,
    country: 'Турция',
    deliveryFee: 20000,
    freeDeliveryThreshold: 300000
  }
];

// Product names for new stores - trendy, modern names
const PRODUCT_NAMES = {
  just: [
    'Платье Миди Элеганс', 'Топ Кроп Лайт', 'Брюки Палаццо', 'Блуза Шелк Люкс',
    'Юбка Плиссе', 'Комбинезон Оверсайз', 'Жилет Трикотаж', 'Кардиган Кашемир',
    'Платье Макси Флоу', 'Джемпер Мохер', 'Костюм Деловой', 'Пиджак Классик',
    'Туника Льняная', 'Свитер Оверсайз', 'Брюки Карго', 'Топ Асимметрия',
    'Платье Коктейльное', 'Рубашка Шифон', 'Юбка Мини', 'Блейзер Структурный'
  ],
  ozbe: [
    'Футболка Premium', 'Джинсы Слим', 'Худи Vintage', 'Кроссовки Leather',
    'Рубашка Оверсайз', 'Шорты Деним', 'Свитшот Графика', 'Брюки Чино',
    'Куртка Бомбер', 'Кеды Canvas', 'Поло Пике', 'Джоггеры Спорт',
    'Парка Зимняя', 'Ботинки Челси', 'Лонгслив Полоска', 'Майка Рибана',
    'Джинсы Карго', 'Анорак Техно', 'Кота Zip', 'Сумка Crossbody'
  ],
  pinkisland: [
    'Платье Романтик', 'Блуза Рюши', 'Топ Кружево', 'Юбка Туту',
    'Кардиган Ажур', 'Платье Бэби Долл', 'Блейзер Розовый', 'Брюки Широкие',
    'Комплкт Твин Сет', 'Топ Бандо', 'Платье Рубашка', 'Жакет Букле',
    'Юбка Карандаш', 'Блуза Бант', 'Платье Трапеция', 'Кофта Пушистая',
    'Брюки Классика', 'Топ Корсет', 'Платье Футляр', 'Кардиган Длинный'
  ]
};

// Generate products with actual GitHub media for each store
function generateStoreProducts(
  storeId: string,
  storeName: string,
  images: string[],
  videos: string[],
  productNames: string[],
  startIndex: number
): Product[] {
  const products: Product[] = [];
  const country = storeId === 'shop-pinkisland' ? 'Турция' : 'Узбекистан';
  
  // Create 20 products per store using their actual images
  for (let i = 0; i < 20; i++) {
    const imageIndex = i % images.length;
    const hasVideo = i < videos.length;
    
    // Media array with actual store images
    const media: ProductMedia[] = [
      {
        id: `media-${storeId}-${i}-1`,
        type: 'image',
        url: images[imageIndex],
        width: 800,
        height: 1000
      }
    ];
    
    // Add 2-3 more images
    if (images.length > imageIndex + 1) {
      media.push({
        id: `media-${storeId}-${i}-2`,
        type: 'image',
        url: images[(imageIndex + 1) % images.length],
        width: 800,
        height: 1000
      });
    }
    
    if (images.length > imageIndex + 2) {
      media.push({
        id: `media-${storeId}-${i}-3`,
        type: 'image',
        url: images[(imageIndex + 2) % images.length],
        width: 800,
        height: 1000
      });
    }
    
    // Add video if available
    if (hasVideo) {
      media.push({
        id: `media-${storeId}-${i}-video`,
        type: 'video',
        url: videos[i],
        thumbnail: images[imageIndex],
        width: 800,
        height: 1000
      });
    }
    
    // Price ranges based on store
    const priceRanges = {
      'shop-just': [350000, 1500000],
      'shop-ozbe': [200000, 900000],
      'shop-pinkisland': [400000, 1800000]
    };
    
    const [minPrice, maxPrice] = priceRanges[storeId as keyof typeof priceRanges];
    const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
    const originalPrice = Math.random() > 0.6 ? Math.floor(price * (1 + Math.random() * 0.4)) : undefined;
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined;
    
    const product: Product = {
      id: `product-new-${startIndex + i}`,
      name: productNames[i],
      description: generateDescription(storeId, productNames[i]),
      price,
      originalPrice,
      discount,
      rating: Math.round((4.0 + Math.random() * 1.0) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 800) + 50,
      media,
      article: genArticle(),
      storeId,
      storeName,
      isLiked: Math.random() > 0.7,
      colors: generateColors(storeId),
      sizes: generateSizes(storeId),
      tags: generateTags(storeId),
      categoryId: getCategoryForStore(storeId),
      categoryPath: getCategoryPath(storeId),
      structuredAttributes: generateAttributes(storeId, country),
      attributes: {
        'Артикул': genArticle(),
        'Страна производства': country,
        'Материал': getMaterial(storeId),
        'Размерная сетка': 'EU'
      }
    };
    
    products.push(product);
  }
  
  return products;
}

// Generate all products for the three new stores
export function generateNewStoresProducts(startIndex: number = 0): Product[] {
  const allProducts: Product[] = [];
  
  // JUST store products (20 products)
  allProducts.push(...generateStoreProducts(
    'shop-just',
    'JUST',
    JUST_IMAGES,
    JUST_VIDEOS,
    PRODUCT_NAMES.just,
    startIndex
  ));
  
  // OZBE store products (20 products)
  allProducts.push(...generateStoreProducts(
    'shop-ozbe',
    'OZBE',
    OZBE_IMAGES,
    OZBE_VIDEOS,
    PRODUCT_NAMES.ozbe,
    startIndex + 20
  ));
  
  // PINKISLAND store products (20 products)
  allProducts.push(...generateStoreProducts(
    'shop-pinkisland',
    'PINK ISLAND',
    PINKISLAND_IMAGES,
    PINKISLAND_VIDEOS,
    PRODUCT_NAMES.pinkisland,
    startIndex + 40
  ));
  
  return allProducts; // Total: 60 new products
}

// Generate stories for the new stores
export function generateNewStoresStories(products: Product[]) {
  const stories = [];
  
  // JUST store stories
  const justProducts = products.filter(p => p.storeId === 'shop-just').slice(0, 3);
  const justStoryItems = JUST_VIDEOS.map((video, i) => ({
    id: `story-just-${i}`,
    type: 'video' as const,
    src: video,
    durationMs: 15000,
    product: justProducts[i % justProducts.length] ? {
      id: justProducts[i % justProducts.length].id,
      name: justProducts[i % justProducts.length].name,
      price: `${Math.floor(justProducts[i % justProducts.length].price / 1000)} 000`,
      currency: 'сум',
      availableSizes: justProducts[i % justProducts.length].sizes || [],
      likes: justProducts[i % justProducts.length].reviewCount,
      orders: Math.floor(justProducts[i % justProducts.length].reviewCount * 0.3)
    } : undefined
  }));
  
  stories.push({
    storeId: 'shop-just',
    storeName: 'JUST',
    avatar: 'https://images.unsplash.com/photo-1638717366457-dbcaf6b1afbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&h=100&crop=face',
    items: justStoryItems,
    isFollowing: false
  });
  
  // OZBE store stories
  const ozbeProducts = products.filter(p => p.storeId === 'shop-ozbe').slice(0, 3);
  const ozbeStoryItems = OZBE_VIDEOS.map((video, i) => ({
    id: `story-ozbe-${i}`,
    type: 'video' as const,
    src: video,
    durationMs: 15000,
    product: ozbeProducts[i % ozbeProducts.length] ? {
      id: ozbeProducts[i % ozbeProducts.length].id,
      name: ozbeProducts[i % ozbeProducts.length].name,
      price: `${Math.floor(ozbeProducts[i % ozbeProducts.length].price / 1000)} 000`,
      currency: 'сум',
      availableSizes: ozbeProducts[i % ozbeProducts.length].sizes || [],
      likes: ozbeProducts[i % ozbeProducts.length].reviewCount,
      orders: Math.floor(ozbeProducts[i % ozbeProducts.length].reviewCount * 0.3)
    } : undefined
  }));
  
  stories.push({
    storeId: 'shop-ozbe',
    storeName: 'OZBE',
    avatar: 'https://images.unsplash.com/photo-1635650805015-2fa50682873a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&h=100&crop=face',
    items: ozbeStoryItems,
    isFollowing: false
  });
  
  // PINKISLAND store stories
  const pinkProducts = products.filter(p => p.storeId === 'shop-pinkisland').slice(0, 3);
  const pinkStoryItems = PINKISLAND_VIDEOS.map((video, i) => ({
    id: `story-pink-${i}`,
    type: 'video' as const,
    src: video,
    durationMs: 15000,
    product: pinkProducts[i % pinkProducts.length] ? {
      id: pinkProducts[i % pinkProducts.length].id,
      name: pinkProducts[i % pinkProducts.length].name,
      price: `${Math.floor(pinkProducts[i % pinkProducts.length].price / 1000)} 000`,
      currency: 'сум',
      availableSizes: pinkProducts[i % pinkProducts.length].sizes || [],
      likes: pinkProducts[i % pinkProducts.length].reviewCount,
      orders: Math.floor(pinkProducts[i % pinkProducts.length].reviewCount * 0.3)
    } : undefined
  }));
  
  stories.push({
    storeId: 'shop-pinkisland',
    storeName: 'PINK ISLAND',
    avatar: 'https://images.unsplash.com/photo-1601740289404-6d0dca1bc904?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100&h=100&crop=face',
    items: pinkStoryItems,
    isFollowing: false
  });
  
  return stories;
}

// Helper functions

function generateDescription(storeId: string, productName: string): string {
  const descriptions = {
    'shop-just': [
      'Элегантная модель для современной женщины',
      'Премиальное качество и изысканный дизайн',
      'Идеально для осоых случаев и повседневной элегантности'
    ],
    'shop-ozbe': [
      'Стильная модель в современном urban стиле',
      'Высокое качество материалов и удобная посадка',
      'Идеально для городского стритстайла'
    ],
    'shop-pinkisland': [
      'Романтичная модель с женственными деталями',
      'Нежные ткани и продуманный крой',
      'Создает элегантный и романтичный образ'
    ]
  };
  
  const options = descriptions[storeId as keyof typeof descriptions];
  return options[Math.floor(Math.random() * options.length)];
}

function generateColors(storeId: string): any[] {
  const colorSets = {
    'shop-just': [
      { id: 'black', name: 'Черный', hex: '#000000' },
      { id: 'white', name: 'Белый', hex: '#FFFFFF' },
      { id: 'beige', name: 'Бежевый', hex: '#F5F5DC' },
      { id: 'navy', name: 'Темно-синий', hex: '#2F4F4F' }
    ],
    'shop-ozbe': [
      { id: 'black', name: 'Черный', hex: '#000000' },
      { id: 'white', name: 'Белый', hex: '#FFFFFF' },
      { id: 'gray', name: 'Серый', hex: '#808080' },
      { id: 'blue', name: 'Синий', hex: '#4169E1' }
    ],
    'shop-pinkisland': [
      { id: 'pink', name: 'Розовый', hex: '#FFC0CB' },
      { id: 'white', name: 'Белый', hex: '#FFFFFF' },
      { id: 'lavender', name: 'Лавандовый', hex: '#E6E6FA' },
      { id: 'peach', name: 'Персиковый', hex: '#FFE5B4' }
    ]
  };
  
  return colorSets[storeId as keyof typeof colorSets] || colorSets['shop-just'];
}

function generateSizes(storeId: string): string[] {
  if (storeId === 'shop-ozbe') {
    return ['S', 'M', 'L', 'XL', 'XXL'];
  }
  return ['XS', 'S', 'M', 'L', 'XL'];
}

function generateTags(storeId: string): string[] {
  const tagSets = {
    'shop-just': ['элегантность', 'премиум', 'современное', 'качество'],
    'shop-ozbe': ['стритстайл', 'urban', 'модное', 'комфорт'],
    'shop-pinkisland': ['романтика', 'женственность', 'нежность', 'стиль']
  };
  
  const tags = tagSets[storeId as keyof typeof tagSets] || tagSets['shop-just'];
  return tags.slice(0, Math.floor(Math.random() * 2) + 2);
}

function getCategoryForStore(storeId: string): string {
  if (storeId === 'shop-ozbe') return 'cat_ts';
  return 'cat_dress';
}

function getCategoryPath(storeId: string): string[] {
  if (storeId === 'shop-ozbe') {
    return ['Одежда', 'Верх', 'Футболки'];
  }
  return ['Одежда', 'Платья'];
}

function getMaterial(storeId: string): string {
  const materials = {
    'shop-just': 'шёлк',
    'shop-ozbe': 'хлопок',
    'shop-pinkisland': 'вискоза'
  };
  
  return materials[storeId as keyof typeof materials] || 'смешанный';
}

function generateAttributes(storeId: string, country: string): ProductAttribute[] {
  return [
    { id: 'target_gender', value: storeId === 'shop-ozbe' ? 'Унисекс' : 'Женщины' },
    { id: 'age_group', value: 'Adult 18+' },
    { id: 'season', value: 'круглый год' },
    { id: 'country_of_origin', value: country },
    { id: 'main_material', value: getMaterial(storeId) },
    { id: 'size_system', value: 'EU' },
    { id: 'fit_type', value: storeId === 'shop-just' ? 'Slim' : 'Regular' },
    { id: 'style_aesthetic', value: storeId === 'shop-pinkisland' ? ['романтика', 'классика'] : ['современное', 'минимализм'] },
    { id: 'occasion', value: ['ежедневная', 'smart-casual'] }
  ];
}

// Export all videos for video feed
export const ALL_NEW_VIDEOS = [
  ...JUST_VIDEOS,
  ...OZBE_VIDEOS,
  ...PINKISLAND_VIDEOS
];