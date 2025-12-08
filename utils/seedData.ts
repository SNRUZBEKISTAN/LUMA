import { Category, SizeChart, Shop, Product, ProductMedia } from '../types/app';
import { Categories, SizeCharts } from './catalog';
import { genArticle } from './sku';
import { ColorHex } from './color';
import { ProductAttribute } from './productAttributes';

// GitHub repository base URL for media assets
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/SNRUZBEKISTAN/LUMA/2e06322169e4086e76802a44d4d5e490fc65cd6d/stores';

// Generate 10 original stores
export function generateShops(): Shop[] {
  return [
    { 
      id: 'shop-1', 
      name: 'URBAN STYLE', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      code: 'URB', 
      isVerified: true, 
      country: 'Узбекистан',
      deliveryFee: 15000,
      freeDeliveryThreshold: 200000
    },
    { 
      id: 'shop-2', 
      name: 'CLASSIC WEAR', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      code: 'CLS', 
      isVerified: true, 
      country: 'Турция',
      deliveryFee: 12000,
      freeDeliveryThreshold: 150000
    },
    { 
      id: 'shop-3', 
      name: 'SPORT ZONE', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e2d3?w=100&h=100&fit=crop&crop=face',
      code: 'SPT', 
      isVerified: false, 
      country: 'Китай',
      deliveryFee: 18000,
      freeDeliveryThreshold: 100000
    },
    { 
      id: 'shop-4', 
      name: 'ELEGANT BOUTIQUE', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      code: 'ELG', 
      isVerified: true, 
      country: 'Италия',
      deliveryFee: 25000,
      freeDeliveryThreshold: 300000
    },
    { 
      id: 'shop-5', 
      name: 'STREET FASHION', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      code: 'STR', 
      isVerified: false, 
      country: 'Корея',
      deliveryFee: 20000,
      freeDeliveryThreshold: 120000
    },
    { 
      id: 'shop-6', 
      name: 'PREMIUM BRANDS', 
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face',
      code: 'PRM', 
      isVerified: true, 
      country: 'Германия',
      deliveryFee: 30000,
      freeDeliveryThreshold: 500000
    },
    { 
      id: 'shop-7', 
      name: 'CASUAL PLUS', 
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
      code: 'CSL', 
      isVerified: false, 
      country: 'Узбекистан',
      deliveryFee: 10000,
      freeDeliveryThreshold: 80000
    },
    { 
      id: 'shop-8', 
      name: 'TREND MAKER', 
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      code: 'TRM', 
      isVerified: true, 
      country: 'Франция',
      deliveryFee: 22000,
      freeDeliveryThreshold: 180000
    },
    { 
      id: 'shop-9', 
      name: 'ACTIVE LIFESTYLE', 
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=face',
      code: 'ACT', 
      isVerified: true, 
      country: 'США',
      deliveryFee: 35000,
      freeDeliveryThreshold: 250000
    },
    { 
      id: 'shop-10', 
      name: 'MINIMALIST STORE', 
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face',
      code: 'MIN', 
      isVerified: true, 
      country: 'Япония',
      deliveryFee: 28000,
      freeDeliveryThreshold: 200000
    }
  ];
}

// Video URLs - using sample videos as placeholders
const GITHUB_VIDEOS = [
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
];

// Product names by category
const PRODUCT_NAMES: Record<string, string[]> = {
  'cat_ts': [
    'Футболка базовая', 'Топ с принтом', 'Майка спортивная', 'Лонгслив оверсайз',
    'Футболка винтаж', 'Топ кроп', 'Майка рибана', 'Лонгслив полосатый'
  ],
  'cat_dress': [
    'Платье миди элеганс', 'Платье макси', 'Платье коктейльное', 'Платье рубашка',
    'Платье футляр', 'Платье трапеция', 'Платье романтик', 'Платье baby doll'
  ],
  'cat_jeans': [
    'Джинсы слим', 'Джинсы бойфренд', 'Джинсы широкие', 'Джинсы клеш',
    'Джинсы карго', 'Джинсы скинни', 'Джинсы мом', 'Джинсы прямые'
  ],
  'cat_sneakers': [
    'Кроссовки спортивные', 'Кроссовки casual', 'Кроссовки running', 'Кроссовки lifestyle',
    'Кеды классические', 'Кеды высокие', 'Слипоны', 'Кроссовки премиум'
  ],
  'cat_hoodies': [
    'Худи оверсайз', 'Худи с принтом', 'Худи базовое', 'Худи винтаж',
    'Свитшот графика', 'Свитшот однотонный', 'Худи на молнии', 'Свитшот crop'
  ]
};

// Generate products for shops
export function generateProducts(shops: Shop[]): Product[] {
  const products: Product[] = [];
  let productIndex = 0;

  // High-quality Unsplash images for different categories and styles
  const CATEGORY_IMAGES: Record<string, string[]> = {
    'cat_ts': [
      'https://images.unsplash.com/photo-1759572095329-1dcf9522762b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1632682582909-2b3a2581eef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1635650805015-2fa50682873a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1651828855150-ba40f6870a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
    ],
    'cat_dress': [
      'https://images.unsplash.com/photo-1694642197844-9e5dc0338ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1760083545495-b297b1690672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1562041350-7778a082a797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1622080159621-bfceab50b3e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
    ],
    'cat_jeans': [
      'https://images.unsplash.com/photo-1639602182178-2dc689354103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1588011025378-15f4778d2558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1764265554883-9804fe44f330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
    ],
    'cat_sneakers': [
      'https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1696661115319-a9b6801e2571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
    ],
    'cat_hoodies': [
      'https://images.unsplash.com/photo-1632682582909-2b3a2581eef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1759056911301-59c6f138e397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
      'https://images.unsplash.com/photo-1764026721657-4b41e0201988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
    ]
  };

  // Additional generic fashion images as fallback
  const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1680789526833-9b09dee3d68e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
    'https://images.unsplash.com/photo-1759162820690-b09c674bab82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
    'https://images.unsplash.com/photo-1623113758911-db913c487b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
    'https://images.unsplash.com/photo-1679768763201-e07480531b49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000',
    'https://images.unsplash.com/photo-1554325109-87755d48a3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&h=1000'
  ];

  // Configuration for each shop
  const shopProductsConfig = [
    { shopId: 'shop-1', categories: ['cat_ts', 'cat_jeans', 'cat_hoodies', 'cat_sneakers'], count: 15, priceRange: [150000, 800000] },
    { shopId: 'shop-2', categories: ['cat_dress', 'cat_ts'], count: 12, priceRange: [200000, 1200000] },
    { shopId: 'shop-3', categories: ['cat_ts', 'cat_sneakers', 'cat_hoodies'], count: 18, priceRange: [80000, 600000] },
    { shopId: 'shop-4', categories: ['cat_dress'], count: 10, priceRange: [500000, 2500000] },
    { shopId: 'shop-5', categories: ['cat_ts', 'cat_jeans', 'cat_hoodies'], count: 14, priceRange: [120000, 700000] },
    { shopId: 'shop-6', categories: ['cat_dress', 'cat_ts'], count: 8, priceRange: [800000, 3000000] },
    { shopId: 'shop-7', categories: ['cat_ts', 'cat_jeans'], count: 16, priceRange: [90000, 500000] },
    { shopId: 'shop-8', categories: ['cat_dress', 'cat_ts'], count: 11, priceRange: [250000, 1500000] },
    { shopId: 'shop-9', categories: ['cat_ts', 'cat_sneakers', 'cat_hoodies'], count: 13, priceRange: [150000, 900000] },
    { shopId: 'shop-10', categories: ['cat_ts', 'cat_dress'], count: 9, priceRange: [200000, 1000000] }
  ];

  for (const config of shopProductsConfig) {
    const shop = shops.find(s => s.id === config.shopId);
    if (!shop) continue;

    for (let i = 0; i < config.count; i++) {
      const categoryId = config.categories[i % config.categories.length];
      const names = PRODUCT_NAMES[categoryId] || ['Товар'];
      const productName = names[i % names.length];
      
      const [minPrice, maxPrice] = config.priceRange;
      const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
      const hasDiscount = Math.random() > 0.6;
      const originalPrice = hasDiscount ? Math.floor(price * (1 + Math.random() * 0.4)) : undefined;
      const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined;

      // Get quality images based on category
      const categoryImages = CATEGORY_IMAGES[categoryId] || FALLBACK_IMAGES;
      const imageIndex = productIndex % categoryImages.length;
      const secondImageIndex = (productIndex + 1) % categoryImages.length;
      
      // Generate media with quality Unsplash images
      const media: ProductMedia[] = [
        {
          id: `media-${productIndex}-1`,
          type: 'image',
          url: categoryImages[imageIndex],
          width: 800,
          height: 1000
        },
        {
          id: `media-${productIndex}-2`,
          type: 'image',
          url: categoryImages[secondImageIndex],
          width: 800,
          height: 1000
        }
      ];

      const product: Product = {
        id: `product-${productIndex}`,
        name: productName,
        description: `Качественный ${productName.toLowerCase()} от магазина ${shop.name}`,
        price,
        originalPrice,
        discount,
        rating: Math.round((4.0 + Math.random() * 1.0) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 500) + 50,
        media,
        article: genArticle(),
        storeId: shop.id,
        storeName: shop.name,
        isLiked: Math.random() > 0.7,
        colors: [
          { id: 'black', name: 'Черный', hex: '#000000' },
          { id: 'white', name: 'Белый', hex: '#FFFFFF' }
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        tags: ['новинка', 'качество'],
        categoryId,
        categoryPath: ['Одежда', 'Категория'],
        structuredAttributes: [
          { id: 'target_gender', value: 'Унисекс' },
          { id: 'age_group', value: 'Adult 18+' },
          { id: 'season', value: 'круглый год' },
          { id: 'country_of_origin', value: shop.country }
        ],
        attributes: {
          'Артикул': genArticle(),
          'Страна производства': shop.country,
          'Материал': 'хлопок',
          'Размерная сетка': 'EU'
        }
      };

      products.push(product);
      productIndex++;
    }
  }

  return products;
}

// Generate stories for shops
export function generateStories(shops: Shop[], products: Product[]) {
  const stories = [];
  let videoIndex = 0;

  // Generate stories for first 10 shops
  for (let i = 0; i < Math.min(shops.length, 10); i++) {
    const shop = shops[i];
    const shopProducts = products.filter(p => p.storeId === shop.id).slice(0, 3);
    
    const storyItems = [];
    const videoCount = i < 5 ? 2 : 1; // First 5 shops get 2 videos, rest get 1
    
    for (let v = 0; v < videoCount && videoIndex < GITHUB_VIDEOS.length; v++) {
      const product = shopProducts[v % shopProducts.length];
      
      storyItems.push({
        id: `story-${shop.id}-${v}`,
        type: 'video' as const,
        src: GITHUB_VIDEOS[videoIndex],
        durationMs: 15000,
        product: product ? {
          id: product.id,
          name: product.name,
          price: `${Math.floor(product.price / 1000)} 000`,
          currency: 'сум',
          availableSizes: product.sizes || [],
          likes: product.reviewCount,
          orders: Math.floor(product.reviewCount * 0.3)
        } : undefined
      });
      
      videoIndex++;
    }
    
    if (storyItems.length > 0) {
      stories.push({
        storeId: shop.id,
        storeName: shop.name,
        avatar: shop.avatar,
        items: storyItems,
        isFollowing: false
      });
    }
  }
  
  return stories;
}

// Initialize seed data - main export
export function initializeSeedData() {
  const categories = Categories;
  const sizeCharts = SizeCharts;
  const shops = generateShops();
  const products = generateProducts(shops);
  
  return {
    categories,
    sizeCharts,
    shops,
    products
  };
}