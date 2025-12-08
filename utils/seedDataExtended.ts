import { Category, SizeChart, Shop, Product, ProductMedia } from '../types/app';
import { Categories, SizeCharts } from './catalog';
import { genArticle } from './sku';
import { ColorHex } from './color';
import { ProductAttribute } from './productAttributes';

// GitHub repository base URL for media assets
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/SNRUZBEKISTAN/LUMA/2e06322169e4086e76802a44d4d5e490fc65cd6d/stores';

// Элегантные белые платья из загруженных изображений
const ELEGANT_DRESS_IMAGES = [
  'figma:asset/4fce29d5ffae5cdcacb9017ceaddc870c776004e.png',
  'figma:asset/ab07e5113b056c84560bbd6f37d8494bf838318f.png',
  'figma:asset/b08d00fd401e3557e47b5e1f1daa089e762cc2ba.png'
];

// Расширенный список из 20 магазинов
export function generateShops(): Shop[] {
  return [
    { id: 'shop-1', name: 'URBAN STYLE', avatar: `${GITHUB_BASE_URL}/urban-style/avatar.jpg`, code: 'URB', isVerified: true, country: 'Узбекистан', deliveryFee: 15000, freeDeliveryThreshold: 200000 },
    { id: 'shop-2', name: 'CLASSIC WEAR', avatar: `${GITHUB_BASE_URL}/classic-wear/avatar.jpg`, code: 'CLS', isVerified: true, country: 'Турция', deliveryFee: 12000, freeDeliveryThreshold: 150000 },
    { id: 'shop-3', name: 'SPORT ZONE', avatar: `${GITHUB_BASE_URL}/sport-zone/avatar.jpg`, code: 'SPT', isVerified: false, country: 'Китай', deliveryFee: 18000, freeDeliveryThreshold: 100000 },
    { id: 'shop-4', name: 'ELEGANT BOUTIQUE', avatar: `${GITHUB_BASE_URL}/elegant-boutique/avatar.jpg`, code: 'ELG', isVerified: true, country: 'Италия', deliveryFee: 25000, freeDeliveryThreshold: 300000 },
    { id: 'shop-5', name: 'STREET FASHION', avatar: `${GITHUB_BASE_URL}/street-fashion/avatar.jpg`, code: 'STR', isVerified: false, country: 'Корея', deliveryFee: 20000, freeDeliveryThreshold: 120000 },
    { id: 'shop-6', name: 'PREMIUM BRANDS', avatar: `${GITHUB_BASE_URL}/premium-brands/avatar.jpg`, code: 'PRM', isVerified: true, country: 'Германия', deliveryFee: 30000, freeDeliveryThreshold: 500000 },
    { id: 'shop-7', name: 'CASUAL PLUS', avatar: `${GITHUB_BASE_URL}/casual-plus/avatar.jpg`, code: 'CSL', isVerified: false, country: 'Узбекистан', deliveryFee: 10000, freeDeliveryThreshold: 80000 },
    { id: 'shop-8', name: 'TREND MAKER', avatar: `${GITHUB_BASE_URL}/trend-maker/avatar.jpg`, code: 'TRM', isVerified: true, country: 'Франция', deliveryFee: 22000, freeDeliveryThreshold: 180000 },
    { id: 'shop-9', name: 'ACTIVE LIFESTYLE', avatar: `${GITHUB_BASE_URL}/active-lifestyle/avatar.jpg`, code: 'ACT', isVerified: true, country: 'США', deliveryFee: 35000, freeDeliveryThreshold: 250000 },
    { id: 'shop-10', name: 'MINIMALIST STORE', avatar: `${GITHUB_BASE_URL}/minimalist-store/avatar.jpg`, code: 'MIN', isVerified: true, country: 'Япония', deliveryFee: 28000, freeDeliveryThreshold: 200000 },
    { id: 'shop-11', name: 'DENIM REPUBLIC', avatar: `${GITHUB_BASE_URL}/denim-republic/avatar.jpg`, code: 'DNM', isVerified: true, country: 'США', deliveryFee: 24000, freeDeliveryThreshold: 220000 },
    { id: 'shop-12', name: 'BEAUTY ESSENTIALS', avatar: `${GITHUB_BASE_URL}/beauty-essentials/avatar.jpg`, code: 'BTY', isVerified: true, country: 'Франция', deliveryFee: 30000, freeDeliveryThreshold: 250000 },
    { id: 'shop-13', name: 'SNEAKER VAULT', avatar: `${GITHUB_BASE_URL}/sneaker-vault/avatar.jpg`, code: 'SNK', isVerified: false, country: 'Китай', deliveryFee: 15000, freeDeliveryThreshold: 150000 },
    { id: 'shop-14', name: 'VINTAGE VIBES', avatar: `${GITHUB_BASE_URL}/vintage-vibes/avatar.jpg`, code: 'VNT', isVerified: true, country: 'Великобритания', deliveryFee: 27000, freeDeliveryThreshold: 280000 },
    { id: 'shop-15', name: 'YOGA & WELLNESS', avatar: `${GITHUB_BASE_URL}/yoga-wellness/avatar.jpg`, code: 'YGW', isVerified: true, country: 'Индия', deliveryFee: 19000, freeDeliveryThreshold: 160000 },
    { id: 'shop-16', name: 'LEATHER LUXE', avatar: `${GITHUB_BASE_URL}/leather-luxe/avatar.jpg`, code: 'LTH', isVerified: true, country: 'Италия', deliveryFee: 32000, freeDeliveryThreshold: 400000 },
    { id: 'shop-17', name: 'URBAN SNEAKERS', avatar: `${GITHUB_BASE_URL}/urban-sneakers/avatar.jpg`, code: 'USN', isVerified: false, country: 'Вьетнам', deliveryFee: 14000, freeDeliveryThreshold: 130000 },
    { id: 'shop-18', name: 'BOHO CHIC', avatar: `${GITHUB_BASE_URL}/boho-chic/avatar.jpg`, code: 'BHC', isVerified: true, country: 'Испания', deliveryFee: 26000, freeDeliveryThreshold: 240000 },
    { id: 'shop-19', name: 'TECH APPAREL', avatar: `${GITHUB_BASE_URL}/tech-apparel/avatar.jpg`, code: 'TCH', isVerified: true, country: 'Япония', deliveryFee: 29000, freeDeliveryThreshold: 300000 },
    { id: 'shop-20', name: 'ACCESSORY HUB', avatar: `${GITHUB_BASE_URL}/accessory-hub/avatar.jpg`, code: 'ACC', isVerified: false, country: 'Турция', deliveryFee: 13000, freeDeliveryThreshold: 140000 }
  ];
}

// Story video URLs from GitHub - расширенный список для 20 магазинов
const GITHUB_VIDEOS = [
  `${GITHUB_BASE_URL}/urban-style/video-1.mp4`,
  `${GITHUB_BASE_URL}/urban-style/video-2.mp4`,
  `${GITHUB_BASE_URL}/classic-wear/video-1.mp4`,
  `${GITHUB_BASE_URL}/classic-wear/video-2.mp4`,
  `${GITHUB_BASE_URL}/sport-zone/video-1.mp4`,
  `${GITHUB_BASE_URL}/sport-zone/video-2.mp4`,
  `${GITHUB_BASE_URL}/elegant-boutique/video-1.mp4`,
  `${GITHUB_BASE_URL}/elegant-boutique/video-2.mp4`,
  `${GITHUB_BASE_URL}/street-fashion/video-1.mp4`,
  `${GITHUB_BASE_URL}/street-fashion/video-2.mp4`,
  `${GITHUB_BASE_URL}/premium-brands/video-1.mp4`,
  `${GITHUB_BASE_URL}/casual-plus/video-1.mp4`,
  `${GITHUB_BASE_URL}/casual-plus/video-2.mp4`,
  `${GITHUB_BASE_URL}/trend-maker/video-1.mp4`,
  `${GITHUB_BASE_URL}/trend-maker/video-2.mp4`,
  `${GITHUB_BASE_URL}/active-lifestyle/video-1.mp4`,
  `${GITHUB_BASE_URL}/minimalist-store/video-1.mp4`,
  `${GITHUB_BASE_URL}/denim-republic/video-1.mp4`,
  `${GITHUB_BASE_URL}/beauty-essentials/video-1.mp4`,
  `${GITHUB_BASE_URL}/sneaker-vault/video-1.mp4`,
  `${GITHUB_BASE_URL}/sneaker-vault/video-2.mp4`,
  `${GITHUB_BASE_URL}/vintage-vibes/video-1.mp4`,
  `${GITHUB_BASE_URL}/yoga-wellness/video-1.mp4`,
  `${GITHUB_BASE_URL}/yoga-wellness/video-2.mp4`,
  `${GITHUB_BASE_URL}/leather-luxe/video-1.mp4`,
  `${GITHUB_BASE_URL}/urban-sneakers/video-1.mp4`,
  `${GITHUB_BASE_URL}/boho-chic/video-1.mp4`,
  `${GITHUB_BASE_URL}/boho-chic/video-2.mp4`,
  `${GITHUB_BASE_URL}/tech-apparel/video-1.mp4`,
  `${GITHUB_BASE_URL}/accessory-hub/video-1.mp4`
];

// Генерация сторисов для всех 20 магазинов
export function generateStories(shops: Shop[], products: Product[]) {
  const stories = [];
  let videoIndex = 0;
  
  // Создаем истории для всех 20 магазинов
  for (let i = 0; i < Math.min(shops.length, 20); i++) {
    const shop = shops[i];
    const shopProducts = products.filter(p => p.storeId === shop.id).slice(0, 3);
    
    const storyItems = [];
    
    // Распределяем видео: первые 10 магазинов получают 1-2 видео, остальные по 1
    const videoCount = i < 10 ? (i < 5 ? 2 : 1) : 1;
    
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

// Export as default functions to use in main seedData
export { generateShops as generateShopsExtended, generateStories as generateStoriesExtended };
