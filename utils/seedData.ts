import { Category, SizeChart, Shop, Product, ProductMedia } from '../types/app';
import { Categories, SizeCharts } from './catalog';
import { genArticle } from './sku';
import { ColorHex } from './color';
import { ProductAttribute } from './productAttributes';

// Расширенный список из 10 магазинов
export function generateShops(): Shop[] {
  return [
    { 
      id: 'shop-1', 
      name: 'URBAN STYLE', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', 
      code: 'URB', 
      isVerified: true, 
      country: 'Узбекистан',
      deliveryFee: 15000,
      freeDeliveryThreshold: 200000
    },
    { 
      id: 'shop-2', 
      name: 'CLASSIC WEAR', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', 
      code: 'CLS', 
      isVerified: true, 
      country: 'Турция',
      deliveryFee: 12000,
      freeDeliveryThreshold: 150000
    },
    { 
      id: 'shop-3', 
      name: 'SPORT ZONE', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612e2d3?w=40&h=40&fit=crop&crop=face', 
      code: 'SPT', 
      isVerified: false, 
      country: 'Китай',
      deliveryFee: 18000,
      freeDeliveryThreshold: 100000
    },
    { 
      id: 'shop-4', 
      name: 'ELEGANT BOUTIQUE', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', 
      code: 'ELG', 
      isVerified: true, 
      country: 'Италия',
      deliveryFee: 25000,
      freeDeliveryThreshold: 300000
    },
    { 
      id: 'shop-5', 
      name: 'STREET FASHION', 
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face', 
      code: 'STR', 
      isVerified: false, 
      country: 'Корея',
      deliveryFee: 20000,
      freeDeliveryThreshold: 120000
    },
    { 
      id: 'shop-6', 
      name: 'PREMIUM BRANDS', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', 
      code: 'PRM', 
      isVerified: true, 
      country: 'Германия',
      deliveryFee: 30000,
      freeDeliveryThreshold: 500000
    },
    { 
      id: 'shop-7', 
      name: 'CASUAL PLUS', 
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face', 
      code: 'CSL', 
      isVerified: false, 
      country: 'Узбекистан',
      deliveryFee: 10000,
      freeDeliveryThreshold: 80000
    },
    { 
      id: 'shop-8', 
      name: 'TREND MAKER', 
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face', 
      code: 'TRM', 
      isVerified: true, 
      country: 'Франция',
      deliveryFee: 22000,
      freeDeliveryThreshold: 180000
    },
    { 
      id: 'shop-9', 
      name: 'ACTIVE LIFESTYLE', 
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face', 
      code: 'ACT', 
      isVerified: true, 
      country: 'США',
      deliveryFee: 35000,
      freeDeliveryThreshold: 250000
    },
    { 
      id: 'shop-10', 
      name: 'MINIMALIST STORE', 
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=40&h=40&fit=crop&crop=face', 
      code: 'MIN', 
      isVerified: true, 
      country: 'Япония',
      deliveryFee: 28000,
      freeDeliveryThreshold: 200000
    }
  ];
}

// Генерация медиа для товара с обновленными категориями
function generateProductMedia(productIndex: number, categoryId: string, hasVideo: boolean = false): ProductMedia[] {
  const categoryImages: Record<string, string[]> = {
    // Одежда - Верх
    'cat_ts': [
      'https://images.unsplash.com/photo-1688111421202-bda886f5e215?w=400',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=400',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400'
    ],
    'cat_shirts': [
      'https://images.unsplash.com/photo-1593765762957-d8d876a1beeb?w=400',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400',
      'https://images.unsplash.com/photo-1594938328870-28ade49b6b0a?w=400',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400'
    ],
    'cat_sweaters': [
      'https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=400',
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400'
    ],
    'cat_hoodies': [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    ],
    
    // Одежда - Низ
    'cat_jeans': [
      'https://images.unsplash.com/photo-1578693082747-50c396cacd81?w=400',
      'https://images.unsplash.com/photo-1541840031508-326b77c9a17e?w=400',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400'
    ],
    'cat_pants': [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      'https://images.unsplash.com/photo-1578678508056-8e0e6e5e8e26?w=400',
      'https://images.unsplash.com/photo-1506629905270-11674e3f2d99?w=400'
    ],
    'cat_shorts': [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
      'https://images.unsplash.com/photo-1578678508056-8e0e6e5e8e26?w=400'
    ],
    
    // Платья
    'cat_dress': [
      'https://images.unsplash.com/photo-1759229874810-26aa9a3dda92?w=400',
      'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=400',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
    ],
    
    // Обувь
    'cat_shoes': [
      'https://images.unsplash.com/photo-1758702701300-372126112cb4?w=400',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400',
      'https://images.unsplash.com/photo-1551107696-a4b57a62e7d6?w=400',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400'
    ],
    'cat_sneakers': [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'
    ],
    'cat_boots': [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400',
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400'
    ],
    
    // Аксессуары
    'cat_bags': [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400'
    ],
    'cat_watches': [
      'https://images.unsplash.com/photo-1523170335258-f5c6c6bd6edc?w=400',
      'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400'
    ],
    'cat_jewelry': [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'
    ],
    
    // Спорт
    'cat_sportswear': [
      'https://images.unsplash.com/photo-1506629905270-11674e3f2d99?w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      'https://images.unsplash.com/photo-1506629905270-11674e3f2d99?w=400'
    ]
  };

  const fallbackImages = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400'
  ];

  const images = categoryImages[categoryId] || fallbackImages;
  const media: ProductMedia[] = [];

  // Добавляем основное изображение
  media.push({
    id: `media-${productIndex}-1`,
    type: 'image',
    url: images[productIndex % images.length],
    width: 400,
    height: 400
  });

  // Добавляем дополнительные изображения
  if (images.length > 1) {
    media.push({
      id: `media-${productIndex}-2`,
      type: 'image',
      url: images[(productIndex + 1) % images.length],
      width: 400,
      height: 400
    });
  }

  if (images.length > 2) {
    media.push({
      id: `media-${productIndex}-3`,
      type: 'image',
      url: images[(productIndex + 2) % images.length],
      width: 400,
      height: 400
    });
  }

  // Добавляем видео для некоторых товаров
  if (hasVideo && productIndex % 5 === 0) {
    media.push({
      id: `media-${productIndex}-video`,
      type: 'video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: images[0],
      width: 400,
      height: 400
    });
  }

  return media;
}

// Расширенный список товаров (более 100 товаров)
export function generateProducts(shops: Shop[]): Product[] {
  const products: Product[] = [];
  let productIndex = 0;

  // Определим товары для каждого магазина
  const shopProductsConfig = [
    // URBAN STYLE (shop-1) - 15 товаров: уличная мода
    {
      shopId: 'shop-1',
      categories: ['cat_ts', 'cat_jeans', 'cat_hoodies', 'cat_sneakers', 'cat_bags'],
      count: 15,
      priceRange: [150000, 800000],
      focus: 'streetwear'
    },
    // CLASSIC WEAR (shop-2) - 12 товаров: классика
    {
      shopId: 'shop-2',
      categories: ['cat_shirts', 'cat_pants', 'cat_dress', 'cat_shoes', 'cat_watches'],
      count: 12,
      priceRange: [200000, 1200000],
      focus: 'classic'
    },
    // SPORT ZONE (shop-3) - 18 товаров: спорт
    {
      shopId: 'shop-3',
      categories: ['cat_sportswear', 'cat_ts', 'cat_shorts', 'cat_sneakers'],
      count: 18,
      priceRange: [80000, 600000],
      focus: 'sport'
    },
    // ELEGANT BOUTIQUE (shop-4) - 10 товаров: премиум
    {
      shopId: 'shop-4',
      categories: ['cat_dress', 'cat_shoes', 'cat_jewelry', 'cat_bags'],
      count: 10,
      priceRange: [500000, 2500000],
      focus: 'luxury'
    },
    // STREET FASHION (shop-5) - 14 товаров: молодежка
    {
      shopId: 'shop-5',
      categories: ['cat_ts', 'cat_jeans', 'cat_hoodies', 'cat_sneakers', 'cat_bags'],
      count: 14,
      priceRange: [120000, 700000],
      focus: 'youth'
    },
    // PREMIUM BRANDS (shop-6) - 8 товаров: люкс
    {
      shopId: 'shop-6',
      categories: ['cat_shirts', 'cat_pants', 'cat_shoes', 'cat_watches', 'cat_jewelry'],
      count: 8,
      priceRange: [800000, 3000000],
      focus: 'premium'
    },
    // CASUAL PLUS (shop-7) - 16 товаров: повседневка
    {
      shopId: 'shop-7',
      categories: ['cat_ts', 'cat_jeans', 'cat_sweaters', 'cat_sneakers', 'cat_bags'],
      count: 16,
      priceRange: [90000, 500000],
      focus: 'casual'
    },
    // TREND MAKER (shop-8) - 11 товаров: тренды
    {
      shopId: 'shop-8',
      categories: ['cat_dress', 'cat_shirts', 'cat_pants', 'cat_shoes', 'cat_jewelry'],
      count: 11,
      priceRange: [250000, 1500000],
      focus: 'trendy'
    },
    // ACTIVE LIFESTYLE (shop-9) - 13 товаров: активка
    {
      shopId: 'shop-9',
      categories: ['cat_sportswear', 'cat_ts', 'cat_shorts', 'cat_sneakers'],
      count: 13,
      priceRange: [150000, 900000],
      focus: 'active'
    },
    // MINIMALIST STORE (shop-10) - 9 товаров: минимализм
    {
      shopId: 'shop-10',
      categories: ['cat_ts', 'cat_pants', 'cat_dress', 'cat_shoes', 'cat_bags'],
      count: 9,
      priceRange: [200000, 1000000],
      focus: 'minimal'
    }
  ];

  // Названия товаров по категориям
  const productNames: Record<string, string[]> = {
    'cat_ts': [
      'Футболка базовая', 'Топ с принтом', 'Майка спортивная', 'Лонгслив оверсайз', 
      'Футболка винтаж', 'Топ кроп', 'Майка рибана', 'Лонгслив полосатый',
      'Футболка графическая', 'Топ асимметричный', 'Майка борцовка', 'Лонгслив термо'
    ],
    'cat_shirts': [
      'Рубашка классическая', 'Блуза шелковая', 'Рубашка оверсайз', 'Блуза с рюшами',
      'Рубашка джинсовая', 'Блуза креп', 'Рубашка поло', 'Блуза туника',
      'Рубашка фланель', 'Блуза с принтом', 'Рубашка лён', 'Блуза шифон'
    ],
    'cat_sweaters': [
      'Джемпер кашемир', 'Кардиган длинный', 'Свитер оверсайз', 'Пуловер с горлом',
      'Джемпер с косами', 'Кардиган укороченный', 'Свитер крупная вязка', 'Пуловер V-вырез',
      'Джемпер мохер', 'Кардиган на пуговицах', 'Свитер водолазка', 'Пуловер полосатый'
    ],
    'cat_hoodies': [
      'Худи оверсайз', 'Свитшот базовый', 'Худи с принтом', 'Свитшот винтаж',
      'Худи кроп', 'Свитшот на молнии', 'Худи флис', 'Свитшот градиент',
      'Худи бомбер', 'Свитшот асимметрия', 'Худи капучино', 'Свитшот тай-дай'
    ],
    'cat_jeans': [
      'Джинсы слим', 'Джинсы бойфренд', 'Джинсы скинни', 'Джинсы широкие',
      'Джинсы высокая посадка', 'Джинсы рваные', 'Джинсы классик', 'Джинсы мом',
      'Джинсы стрейч', 'Джинсы винтаж', 'Джинсы клеш', 'Джинсы карго'
    ],
    'cat_pants': [
      'Брюки классические', 'Леггинсы базовые', 'Брюки карго', 'Леггинсы спорт',
      'Брюки чино', 'Леггинсы кожа', 'Брюки палаццо', 'Леггинсы с принтом',
      'Брюки прямые', 'Леггинсы push-up', 'Брюки клеш', 'Леггинсы термо'
    ],
    'cat_shorts': [
      'Шорты джинсовые', 'Шорты спортивные', 'Шорты классические', 'Шорты карго',
      'Шорты льняные', 'Шорты велосипедки', 'Шорты бермуды', 'Шорты пляжные',
      'Шорты высокая посадка', 'Шорты мини', 'Шорты с поясом', 'Шорты трикотаж'
    ],
    'cat_dress': [
      'Платье миди', 'Платье макси', 'Платье мини', 'Платье футляр',
      'Платье рубашка', 'Платье вечернее', 'Платье коктейльное', 'Платье сарафан',
      'Платье запах', 'Платье трапеция', 'Платье облегающее', 'Платье свитер'
    ],
    'cat_shoes': [
      'Туфли классические', 'Ботинки кожаные', 'Сапоги высокие', 'Туфли каблук',
      'Ботинки челси', 'Сапоги ковбойские', 'Туфли лодочки', 'Ботинки грубые',
      'Сапоги до колена', 'Туфли оксфорд', 'Ботинки на шнурках', 'Сапоги замша'
    ],
    'cat_sneakers': [
      'Кроссовки беговые', 'Кеды классические', 'Кроссовки баскетбольные', 'Кеды высокие',
      'Кроссовки lifestyle', 'Кеды платформа', 'Кроссовки трейнинг', 'Кеды slip-on',
      'Кроссовки ретро', 'Кеды принт', 'Кроссовки тренд', 'Кеды кожаные'
    ],
    'cat_boots': [
      'Ботинки зимние', 'Сапоги резиновые', 'Ботинки тактические', 'Сапоги мех',
      'Ботинки треккинг', 'Сапоги унты', 'Ботинки мартинс', 'Сапоги валенки',
      'Ботинки работа', 'Сапоги дождевики', 'Ботинки дезерты', 'Сапоги угги'
    ],
    'cat_bags': [
      'Сумка тоут', 'Рюкзак городской', 'Сумка клатч', 'Рюкзак спортивный',
      'Сумка через плечо', 'Рюкзак школьный', 'Сумка шоппер', 'Рюкзак туристический',
      'Сумка поясная', 'Рюкзак кожаный', 'Сумка вечерняя', 'Рюкзак для ноутбука'
    ],
    'cat_watches': [
      'Часы механические', 'Часы кварцевые', 'Часы смарт', 'Часы спортивные',
      'Часы классические', 'Часы дайверские', 'Часы женские', 'Часы хронограф',
      'Часы винтаж', 'Часы цифровые', 'Часы автоматические', 'Часы керамика'
    ],
    'cat_jewelry': [
      'Кольцо золото', 'Серьги серебро', 'Браслет кожа', 'Цепочка сталь',
      'Кольцо камень', 'Серьги жемчуг', 'Браслет металл', 'Цепочка золото',
      'Кольцо помолвочное', 'Серьги длинные', 'Браслет шарм', 'Цепочка массивная'
    ],
    'cat_sportswear': [
      'Костюм спортивный', 'Форма футбольная', 'Костюм для йоги', 'Форма баскетбольная',
      'Костюм беговой', 'Форма теннисная', 'Костюм фитнес', 'Форма волейбольная',
      'Костюм тренировочный', 'Форма гимнастическая', 'Костюм компрессионный', 'Форма плавание'
    ]
  };

  // Генерируем товары для каждого магазина
  shopProductsConfig.forEach(config => {
    const shop = shops.find(s => s.id === config.shopId)!;
    
    for (let i = 0; i < config.count; i++) {
      const categoryId = config.categories[i % config.categories.length];
      const categoryNames = productNames[categoryId] || ['Товар'];
      const productName = categoryNames[i % categoryNames.length];
      
      const minPrice = config.priceRange[0];
      const maxPrice = config.priceRange[1];
      const price = Math.floor(Math.random() * (maxPrice - minPrice) + minPrice);
      const originalPrice = Math.random() > 0.7 ? Math.floor(price * (1 + Math.random() * 0.5)) : undefined;
      const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined;

      // Создаем атрибуты товара на основе категории и фокуса магазина
      const attributes = generateProductAttributes(categoryId, config.focus, shop.country);

      const product: Product = {
        id: `product-${productIndex + 1}`,
        name: productName,
        description: generateProductDescription(productName, config.focus),
        price,
        originalPrice,
        discount,
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 500) + 10,
        media: generateProductMedia(productIndex, categoryId, Math.random() > 0.8),
        article: genArticle(),
        storeId: shop.id,
        storeName: shop.name,
        isLiked: Math.random() > 0.8,
        colors: generateColors(categoryId),
        sizes: generateSizes(categoryId),
        tags: generateTags(categoryId, config.focus),
        categoryId,
        categoryPath: getCategoryPath(categoryId),
        structuredAttributes: attributes,
        // Legacy attributes для обратной совместимости
        attributes: {
          'Артикул': genArticle(),
          'Страна производства': shop.country,
          'Материал': getMainMaterial(categoryId),
          'Размерная сетка': 'EU'
        }
      };

      products.push(product);
      productIndex++;
    }
  });

  return products;
}

// Функция генерации атрибутов товара
function generateProductAttributes(categoryId: string, focus: string, country: string): ProductAttribute[] {
  const attributes: ProductAttribute[] = [];

  // Базовые атрибуты для всех товаров
  attributes.push(
    { id: 'target_gender', value: getTargetGender(categoryId) },
    { id: 'age_group', value: 'Adult 18+' },
    { id: 'season', value: getSeason(categoryId) },
    { id: 'country_of_origin', value: country },
    { id: 'main_material', value: getMainMaterial(categoryId) }
  );

  // Добавляем специфичные атрибуты в зависимости от категории
  if (categoryId.includes('shoes') || categoryId.includes('sneakers') || categoryId.includes('boots')) {
    attributes.push(
      { id: 'shoe_width', value: 'стандартная' },
      { id: 'sole_material', value: getSoleMaterial(categoryId) },
      { id: 'upper_material', value: getUpperMaterial(categoryId) }
    );
    
    if (categoryId.includes('shoes')) {
      attributes.push({ id: 'heel_height', value: Math.floor(Math.random() * 8) + 1 });
    }
  }

  if (categoryId.includes('sportswear') || focus === 'sport' || focus === 'active') {
    attributes.push(
      { id: 'sport_type', value: getSportType(categoryId) },
      { id: 'moisture_wicking', value: true },
      { id: 'compression_level', value: getCompressionLevel() }
    );
  }

  // Атрибуты одежды
  if (isClothingCategory(categoryId)) {
    attributes.push(
      { id: 'size_system', value: 'EU' },
      { id: 'fit_type', value: getFitType(focus) },
      { id: 'primary_color', value: { name: 'Черный', hex: '#000000' } },
      { id: 'pattern', value: getPattern(categoryId) },
      { id: 'material_composition', value: getMaterialComposition(categoryId) },
      { id: 'care_instructions', value: getCareInstructions(categoryId) }
    );

    if (categoryId.includes('ts') || categoryId.includes('shirts')) {
      attributes.push(
        { id: 'sleeve_length', value: getSleeveLength(categoryId) },
        { id: 'neckline', value: getNeckline(categoryId) }
      );
    }

    if (isBottomCategory(categoryId)) {
      attributes.push({ id: 'closure_type', value: getClosureType(categoryId) });
    }
  }

  // Добавляем атрибуты стиля и поводов
  attributes.push(
    { id: 'style_aesthetic', value: getStyleAesthetic(focus) },
    { id: 'occasion', value: getOccasions(categoryId, focus) }
  );

  return attributes;
}

// Вспомогательные функции для генерации атрибутов
function getTargetGender(categoryId: string): string {
  if (categoryId.includes('dress')) return 'Женщины';
  if (categoryId.includes('jewelry') && Math.random() > 0.3) return 'Женщины';
  return Math.random() > 0.5 ? 'Женщины' : 'Мужчины';
}

function getSeason(categoryId: string): string {
  if (categoryId.includes('boots') || categoryId.includes('sweaters')) return 'FW (осень-зима)';
  if (categoryId.includes('shorts') || categoryId.includes('ts')) return 'SS (весна-лето)';
  return 'круглый год';
}

function getMainMaterial(categoryId: string): string {
  const materials: Record<string, string[]> = {
    'cat_ts': ['хлопок', 'полиэстер', 'вискоза'],
    'cat_shirts': ['хлопок', 'лён', 'шёлк'],
    'cat_jeans': ['деним', 'хлопок'],
    'cat_sweaters': ['шерсть', 'кашемир', 'акрил'],
    'cat_dress': ['вискоза', 'шёлк', 'полиэстер'],
    'cat_shoes': ['кожа', 'замша'],
    'cat_sneakers': ['синтетика', 'текстиль'],
    'cat_bags': ['кожа', 'текстиль'],
    'cat_jewelry': ['металл', 'серебро', 'золото']
  };
  
  const options = materials[categoryId] || ['смешанный'];
  return options[Math.floor(Math.random() * options.length)];
}

function getSoleMaterial(categoryId: string): string {
  const materials = ['резина', 'EVA', 'ПУ', 'кожа'];
  return materials[Math.floor(Math.random() * materials.length)];
}

function getUpperMaterial(categoryId: string): string {
  if (categoryId.includes('sneakers')) {
    return ['текстиль', 'синтетика', 'сетка'][Math.floor(Math.random() * 3)];
  }
  return ['кожа', 'замша', 'нубук'][Math.floor(Math.random() * 3)];
}

function getSportType(categoryId: string): string {
  const sports = ['бег', 'фитнес', 'йога', 'теннис', 'баскетбол'];
  return sports[Math.floor(Math.random() * sports.length)];
}

function getCompressionLevel(): string {
  return ['низкий', 'средний', 'высокий'][Math.floor(Math.random() * 3)];
}

function isClothingCategory(categoryId: string): boolean {
  return !categoryId.includes('shoes') && !categoryId.includes('sneakers') && 
         !categoryId.includes('boots') && !categoryId.includes('bags') && 
         !categoryId.includes('watches') && !categoryId.includes('jewelry');
}

function isBottomCategory(categoryId: string): boolean {
  return categoryId.includes('jeans') || categoryId.includes('pants') || categoryId.includes('shorts');
}

function getFitType(focus: string): string {
  const fits: Record<string, string[]> = {
    'streetwear': ['Oversized', 'Relaxed'],
    'classic': ['Regular', 'Slim'],
    'sport': ['Athletic', 'Regular'],
    'luxury': ['Slim', 'Regular'],
    'minimal': ['Regular', 'Slim']
  };
  
  const options = fits[focus] || ['Regular'];
  return options[Math.floor(Math.random() * options.length)];
}

function getPattern(categoryId: string): string {
  const patterns = ['однотон', 'полоска', 'клетка', 'флора', 'гео'];
  return patterns[Math.floor(Math.random() * patterns.length)];
}

function getMaterialComposition(categoryId: string): string {
  const compositions: Record<string, string[]> = {
    'cat_ts': ['100% хлопок', '95% хлопок, 5% эластан', '60% хлопок, 40% полиэстер'],
    'cat_jeans': ['98% хлопок, 2% эластан', '100% хлопок', '90% хлопок, 10% полиэстер'],
    'cat_sweaters': ['100% шерсть', '50% шерсть, 50% акрил', '30% шерсть, 70% акрил'],
    'cat_dress': ['100% вискоза', '95% полиэстер, 5% эластан', '100% шёлк']
  };
  
  const options = compositions[categoryId] || ['смешанный состав'];
  return options[Math.floor(Math.random() * options.length)];
}

function getCareInstructions(categoryId: string): string[] {
  const basic = ['машинная стирка 30°C', 'не отбеливать'];
  
  if (categoryId.includes('sweaters')) {
    return [...basic, 'ручная стирка', 'сушка на воздухе'];
  }
  
  return [...basic, 'сушка в барабане низкая температура', 'глажка низкая температура'];
}

function getSleeveLength(categoryId: string): string {
  if (categoryId.includes('ts')) {
    return ['без рукавов', 'короткий', 'длинный'][Math.floor(Math.random() * 3)];
  }
  return ['короткий', 'длинный'][Math.floor(Math.random() * 2)];
}

function getNeckline(categoryId: string): string {
  const necklines = ['круглый', 'V-образный', 'лодочка', 'стойка'];
  return necklines[Math.floor(Math.random() * necklines.length)];
}

function getClosureType(categoryId: string): string[] {
  if (categoryId.includes('jeans')) return ['молния', 'пуговицы'];
  return ['молния', 'пуговицы', 'резинка'][Math.floor(Math.random() * 3)] as any;
}

function getStyleAesthetic(focus: string): string[] {
  const styles: Record<string, string[]> = {
    'streetwear': ['streetwear', 'спорт'],
    'classic': ['классика', 'минимализм'],
    'sport': ['спорт', 'athleisure'],
    'luxury': ['классика', 'романтика'],
    'youth': ['streetwear', 'гранж'],
    'premium': ['классика', 'минимализм'],
    'casual': ['минимализм', 'классика'],
    'trendy': ['романтика', 'винтаж'],
    'active': ['спорт', 'athleisure'],
    'minimal': ['минимализм']
  };
  
  return styles[focus] || ['классика'];
}

function getOccasions(categoryId: string, focus: string): string[] {
  if (categoryId.includes('sportswear') || focus === 'sport') {
    return ['спорт'];
  }
  
  if (categoryId.includes('dress') && focus === 'luxury') {
    return ['вечерняя', 'коктейль'];
  }
  
  if (focus === 'classic') {
    return ['деловая', 'smart-casual'];
  }
  
  return ['ежедневная', 'smart-casual'];
}

function getCategoryPath(categoryId: string): string[] {
  const paths: Record<string, string[]> = {
    'cat_ts': ['Одежда', 'Верх', 'Футболки'],
    'cat_shirts': ['Одежда', 'Верх', 'Рубашки'],
    'cat_sweaters': ['Одежда', 'Верх', 'Свитеры'],
    'cat_hoodies': ['Одежда', 'Верх', 'Худи'],
    'cat_jeans': ['Одежда', 'Низ', 'Джинсы'],
    'cat_pants': ['Одежда', 'Низ', 'Брюки'],
    'cat_shorts': ['Одежда', 'Низ', 'Шорты'],
    'cat_dress': ['Одежда', 'Платья'],
    'cat_shoes': ['Обувь', 'Классическая'],
    'cat_sneakers': ['Обувь', 'Кроссовки'],
    'cat_boots': ['Обувь', 'Ботинки'],
    'cat_bags': ['Аксессуары', 'Сумки'],
    'cat_watches': ['Аксессуары', 'Часы'],
    'cat_jewelry': ['Аксессуары', 'Украшения'],
    'cat_sportswear': ['Спорт', 'Костюмы']
  };
  
  return paths[categoryId] || ['Товары'];
}

// Остальные вспомогательные функции
function generateProductDescription(name: string, focus: string): string {
  const descriptions: Record<string, string[]> = {
    'streetwear': [
      'Стильная модель для городских прогулок',
      'Отличное качество материалов и современный дизайн',
      'Идеально подходит для повседневной носки'
    ],
    'classic': [
      'Элегантная модель классического кроя',
      'Высокое качество материалов и безупречная посадка',
      'Подходит для офиса и торжественных мероприятий'
    ],
    'sport': [
      'Функциональная модель для активного образа жизни',
      'Дышащие материалы и эргономичный крой',
      'Идеально для тренировок и спорта'
    ],
    'luxury': [
      'Премиальная модель из высококачественных материалов',
      'Изысканный дизайн и безупречное качество исполнения',
      'Для особых случаев и торжественных мероприятий'
    ]
  };
  
  const options = descriptions[focus] || descriptions['streetwear'];
  return options[Math.floor(Math.random() * options.length)];
}

function generateColors(categoryId: string): any[] {
  const basicColors = [
    { id: 'black', name: 'Черный', hex: '#000000' },
    { id: 'white', name: 'Белый', hex: '#FFFFFF' },
    { id: 'navy', name: 'Темно-синий', hex: '#2F4F4F' },
    { id: 'gray', name: 'Серый', hex: '#808080' }
  ];
  
  const additionalColors = [
    { id: 'red', name: 'Красный', hex: '#DC143C' },
    { id: 'blue', name: 'Синий', hex: '#4169E1' },
    { id: 'green', name: 'Зеленый', hex: '#228B22' },
    { id: 'brown', name: 'Коричневый', hex: '#8B4513' },
    { id: 'beige', name: 'Бежевый', hex: '#F5F5DC' }
  ];
  
  const colors = [...basicColors];
  
  // Добавляем случайное количество дополнительных цветов
  const additionalCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < additionalCount; i++) {
    const randomColor = additionalColors[Math.floor(Math.random() * additionalColors.length)];
    if (!colors.find(c => c.id === randomColor.id)) {
      colors.push(randomColor);
    }
  }
  
  return colors.slice(0, Math.floor(Math.random() * 4) + 2);
}

function generateSizes(categoryId: string): string[] {
  if (categoryId.includes('shoes') || categoryId.includes('sneakers') || categoryId.includes('boots')) {
    return ['39', '40', '41', '42', '43', '44'];
  }
  
  return ['XS', 'S', 'M', 'L', 'XL'];
}

function generateTags(categoryId: string, focus: string): string[] {
  const baseTags: Record<string, string[]> = {
    'cat_ts': ['футболки', 'базовые вещи', 'топы'],
    'cat_shirts': ['рубашки', 'блузы', 'деловое'],
    'cat_jeans': ['джинсы', 'деним', 'повседневное'],
    'cat_dress': ['платья', 'женское', 'элегантное'],
    'cat_shoes': ['обувь', 'классическая', 'кожа'],
    'cat_sneakers': ['кроссовки', 'спорт', 'комфорт'],
    'cat_bags': ['аксессуары', 'сумки', 'стиль']
  };
  
  const focusTags: Record<string, string[]> = {
    'streetwear': ['уличный стиль', 'молодежное', 'трендовое'],
    'classic': ['классика', 'элегантное', 'офисное'],
    'sport': ['спорт', 'активное', 'тренировки'],
    'luxury': ['премиум', 'люкс', 'качество']
  };
  
  const tags = [...(baseTags[categoryId] || []), ...(focusTags[focus] || [])];
  return tags.slice(0, Math.floor(Math.random() * 3) + 2);
}

// Основная функция инициализации
export function initializeSeedData() {
  const shops = generateShops();
  const products = generateProducts(shops);
  
  return {
    categories: Categories,
    sizeCharts: SizeCharts,
    shops,
    products
  };
}