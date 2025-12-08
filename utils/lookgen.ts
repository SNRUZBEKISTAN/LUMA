import { Product, Look, ApparelKind, Season, Gender } from '../types/app';
import { searchFashionImage } from './imageSearch';

// Расширенная карта стилей и поводов
const styleMap: Record<string, any> = {
  // Базовые стили
  casual: { 
    kinds: ['topwear', 'bottomwear', 'footwear'], 
    patterns: ['solid', 'striped'], 
    materials: ['cotton', 'denim'],
    confidence: 0.9 
  },
  elegant: { 
    kinds: ['dress', 'topwear', 'bottomwear', 'footwear'], 
    patterns: ['solid'], 
    materials: ['silk', 'wool'],
    confidence: 0.85 
  },
  streetwear: { 
    kinds: ['topwear', 'bottomwear', 'outerwear', 'footwear'], 
    fits: ['oversized', 'relaxed'],
    confidence: 0.8 
  },
  business: { 
    kinds: ['suiting', 'topwear', 'bottomwear', 'footwear'], 
    patterns: ['solid', 'checked'], 
    fits: ['slim', 'regular'],
    confidence: 0.9 
  },
  sport: { 
    kinds: ['activewear', 'footwear'], 
    materials: ['polyester', 'elastane'],
    confidence: 0.95 
  },
  minimalist: { 
    kinds: ['topwear', 'bottomwear', 'footwear'], 
    patterns: ['solid'], 
    colors: ['black', 'white', 'grey', 'beige'],
    confidence: 0.9 
  },

  // Поводы
  work: { 
    kinds: ['topwear', 'bottomwear', 'footwear', 'suiting'], 
    patterns: ['solid', 'checked'],
    colors: ['black', 'white', 'grey', 'navy'],
    confidence: 0.88 
  },
  date: { 
    kinds: ['dress', 'topwear', 'bottomwear', 'footwear'], 
    patterns: ['solid', 'floral'],
    confidence: 0.85 
  },
  party: { 
    kinds: ['dress', 'topwear', 'bottomwear', 'footwear'], 
    patterns: ['solid', 'embroidered'],
    confidence: 0.8 
  },
  travel: { 
    kinds: ['topwear', 'bottomwear', 'footwear', 'outerwear'], 
    materials: ['cotton', 'polyester'],
    fits: ['comfortable', 'relaxed'],
    confidence: 0.9 
  },

  // Сезоны
  summer: { 
    season: ['summer'], 
    materials: ['cotton', 'linen'], 
    kinds: ['topwear', 'bottomwear', 'footwear'],
    confidence: 0.95 
  },
  winter: { 
    season: ['winter'], 
    kinds: ['outerwear', 'knitwear', 'bottomwear', 'footwear'], 
    materials: ['wool', 'fleece'],
    confidence: 0.95 
  },
  spring: { 
    season: ['spring'], 
    kinds: ['topwear', 'bottomwear', 'outerwear', 'footwear'],
    confidence: 0.9 
  },
  autumn: { 
    season: ['autumn'], 
    kinds: ['topwear', 'bottomwear', 'outerwear', 'knitwear', 'footwear'],
    confidence: 0.9 
  },

  // Цветовые схемы
  monochrome: { 
    colors: ['black', 'white', 'grey'], 
    confidence: 0.9 
  },
  pastel: { 
    colors: ['pink', 'lightblue', 'beige'], 
    confidence: 0.8 
  },
  bright: { 
    colors: ['red', 'yellow', 'orange', 'green'], 
    confidence: 0.7 
  },
  neutral: { 
    colors: ['beige', 'brown', 'olive', 'grey'], 
    confidence: 0.85 
  }
};

// Совместимость категорий одежды
const categoryCompatibility: Record<ApparelKind, ApparelKind[]> = {
  topwear: ['bottomwear', 'footwear', 'outerwear', 'accessories'],
  bottomwear: ['topwear', 'footwear', 'outerwear', 'accessories'],
  dress: ['footwear', 'outerwear', 'accessories', 'jewelry'],
  outerwear: ['topwear', 'bottomwear', 'footwear', 'accessories'],
  knitwear: ['bottomwear', 'footwear', 'accessories'],
  suiting: ['footwear', 'accessories'],
  activewear: ['footwear'],
  loungewear: ['footwear'],
  underwear: [],
  swimwear: ['footwear', 'accessories'],
  footwear: ['topwear', 'bottomwear', 'dress', 'outerwear'],
  accessories: ['topwear', 'bottomwear', 'dress', 'outerwear'],
  jewelry: ['topwear', 'bottomwear', 'dress', 'outerwear']
};

// Функция анализа промпта и извлечения ключевых слов
function analyzePrompt(prompt: string) {
  const p = prompt.toLowerCase();
  const detectedStyles: string[] = [];
  const detectedColors: string[] = [];
  const detectedSeasons: string[] = [];
  const detectedOccasions: string[] = [];
  
  // Анализируем стили
  Object.keys(styleMap).forEach(style => {
    if (p.includes(style) || p.includes(style.replace('_', ' '))) {
      detectedStyles.push(style);
    }
  });

  // Анализируем цвета
  const colorWords = ['черный', 'белый', 'серый', 'синий', 'красный', 'зеленый', 'желтый', 'розовый', 'фиолетовый'];
  const colorMap: Record<string, string> = {
    'черный': 'black', 'белый': 'white', 'серый': 'grey', 'синий': 'navy',
    'красный': 'red', 'зеленый': 'green', 'желтый': 'yellow', 'розовый': 'pink'
  };
  
  colorWords.forEach(color => {
    if (p.includes(color)) {
      detectedColors.push(colorMap[color] || color);
    }
  });

  // Анализируем сезоны
  const seasonWords = ['лето', 'зима', 'весна', 'осень', 'летний', 'зимний', 'весенний', 'осенний'];
  const seasonMap: Record<string, string> = {
    'лето': 'summer', 'летний': 'summer', 'зима': 'winter', 'зимний': 'winter',
    'весна': 'spring', 'весенний': 'spring', 'осень': 'autumn', 'осенний': 'autumn'
  };
  
  seasonWords.forEach(season => {
    if (p.includes(season)) {
      detectedSeasons.push(seasonMap[season] || season);
    }
  });

  // Анализируем поводы
  const occasionWords = ['работа', 'офис', 'свидание', 'вечеринка', 'прогулка', 'спорт', 'путешествие'];
  const occasionMap: Record<string, string> = {
    'работа': 'work', 'офис': 'work', 'свидание': 'date', 'вечеринка': 'party',
    'прогулка': 'casual', 'спорт': 'sport', 'путешествие': 'travel'
  };
  
  occasionWords.forEach(occasion => {
    if (p.includes(occasion)) {
      detectedOccasions.push(occasionMap[occasion] || occasion);
    }
  });

  return { detectedStyles, detectedColors, detectedSeasons, detectedOccasions };
}

// Функция оценки совместимости товара с требованиями
function calculateProductScore(product: Product, requirements: any): number {
  let score = 0.5; // базовый скор

  // Проверяем соответствие категории
  if (requirements.kinds && requirements.kinds.includes(product.kind)) {
    score += 0.3;
  }

  // Проверяем соответствие сезона
  if (requirements.season && product.season) {
    const hasMatchingSeason = product.season.some((s: Season) => requirements.season.includes(s));
    if (hasMatchingSeason) score += 0.2;
  }

  // Проверяем соответствие цвета
  if (requirements.colors && product.color) {
    if (requirements.colors.includes(product.color)) {
      score += 0.2;
    }
  }

  // Проверяем соответствие материала
  if (requirements.materials && product.material) {
    const hasMatchingMaterial = product.material.some((m: string) => requirements.materials.includes(m));
    if (hasMatchingMaterial) score += 0.15;
  }

  // Проверяем соответствие фасона
  if (requirements.fits && product.fit) {
    if (requirements.fits.includes(product.fit)) {
      score += 0.1;
    }
  }

  // Проверяем соответствие паттерна
  if (requirements.patterns && product.pattern) {
    if (requirements.patterns.includes(product.pattern)) {
      score += 0.1;
    }
  }

  // Учитываем теги товара
  if (product.tags && requirements.tags) {
    const matchingTags = product.tags.filter(tag => requirements.tags.includes(tag)).length;
    score += matchingTags * 0.05;
  }

  return Math.min(score, 1.0); // ограничиваем максимальный скор
}

// Функция генерации cover изображения
async function generateCoverImage(look: Look, products: Product[]): Promise<string> {
  const lookProducts = products.filter(p => look.items.some(item => item.productId === p.id));
  
  // Создаем ключевые слова для поиска изображения
  const searchKeywords: string[] = [];
  
  // Добавляем стили
  if (look.style && look.style.length > 0) {
    searchKeywords.push(...look.style);
  }
  
  // Добавляем поводы
  if (look.occasion && look.occasion.length > 0) {
    searchKeywords.push(...look.occasion);
  }
  
  // Добавляем информацию о типах одежды
  const kinds = lookProducts.map(p => p.kind).filter(k => k);
  if (kinds.includes('dress' as ApparelKind)) {
    searchKeywords.push('dress');
  } else if (kinds.includes('suiting' as ApparelKind)) {
    searchKeywords.push('business');
  } else if (kinds.includes('activewear' as ApparelKind)) {
    searchKeywords.push('sport');
  }
  
  // Используем утилиту поиска изображений
  return await searchFashionImage(searchKeywords);
}

// Основная функция генерации образа
export async function buildLookFromPrompt(
  prompt: string, 
  allProducts: Product[], 
  maxItems = 4,
  budgetLimit?: number,
  preferredGender?: Gender
): Promise<Look> {
  const analysis = analyzePrompt(prompt);
  const lookId = crypto.randomUUID();
  
  // Объединяем все требования из анализа промпта
  const combinedRequirements: any = {
    kinds: [],
    season: analysis.detectedSeasons,
    colors: analysis.detectedColors,
    tags: [...analysis.detectedStyles, ...analysis.detectedOccasions]
  };

  // Собираем требования по категориям из всех стилей
  analysis.detectedStyles.forEach(style => {
    const styleReqs = styleMap[style];
    if (styleReqs) {
      if (styleReqs.kinds) combinedRequirements.kinds.push(...styleReqs.kinds);
      if (styleReqs.season) combinedRequirements.season.push(...styleReqs.season);
      if (styleReqs.colors) combinedRequirements.colors.push(...styleReqs.colors);
      if (styleReqs.materials) {
        if (!combinedRequirements.materials) combinedRequirements.materials = [];
        combinedRequirements.materials.push(...styleReqs.materials);
      }
      if (styleReqs.fits) {
        if (!combinedRequirements.fits) combinedRequirements.fits = [];
        combinedRequirements.fits.push(...styleReqs.fits);
      }
      if (styleReqs.patterns) {
        if (!combinedRequirements.patterns) combinedRequirements.patterns = [];
        combinedRequirements.patterns.push(...styleReqs.patterns);
      }
    }
  });

  // Удаляем дубликаты
  Object.keys(combinedRequirements).forEach(key => {
    if (Array.isArray(combinedRequirements[key])) {
      combinedRequirements[key] = [...new Set(combinedRequirements[key])];
    }
  });

  // Фильтруем товары по полу
  let filteredProducts = allProducts;
  if (preferredGender) {
    filteredProducts = allProducts.filter(p => 
      !p.gender || p.gender === preferredGender || p.gender === 'unisex'
    );
  }

  // Фильтруем по бюджету
  if (budgetLimit) {
    filteredProducts = filteredProducts.filter(p => p.price <= budgetLimit);
  }

  // Оцениваем каждый товар и сортируем по релевантности
  const scoredProducts = filteredProducts.map(product => ({
    product,
    score: calculateProductScore(product, combinedRequirements),
    reason: generateSelectionReason(product, combinedRequirements)
  })).sort((a, b) => b.score - a.score);

  // Выбираем товары для образа, обеспечивая разнообразие категорий
  const selectedItems: LookItem[] = [];
  const usedCategories = new Set<ApparelKind>();
  let totalPrice = 0;

  // Определяем приоритетные категории на основе стиля
  const preferredOrder = getPreferredCategoryOrder(analysis.detectedStyles);

  for (const category of preferredOrder) {
    if (selectedItems.length >= maxItems) break;
    if (usedCategories.has(category)) continue;

    const categoryProducts = scoredProducts.filter(sp => 
      sp.product.kind === category && 
      (!budgetLimit || totalPrice + sp.product.price <= budgetLimit)
    );

    if (categoryProducts.length > 0) {
      const selected = categoryProducts[0];
      selectedItems.push({
        productId: selected.product.id,
        confidence: selected.score,
        reason: selected.reason
      });
      usedCategories.add(category);
      totalPrice += selected.product.price;
    }
  }

  // Если не набрали достаточно товаров, добавляем лучшие из оставшихся
  for (const scoredProduct of scoredProducts) {
    if (selectedItems.length >= maxItems) break;
    if (usedCategories.has(scoredProduct.product.kind!)) continue;
    if (budgetLimit && totalPrice + scoredProduct.product.price > budgetLimit) continue;

    selectedItems.push({
      productId: scoredProduct.product.id,
      confidence: scoredProduct.score,
      reason: scoredProduct.reason
    });
    usedCategories.add(scoredProduct.product.kind!);
    totalPrice += scoredProduct.product.price;
  }

  // Вычисляем общую уверенность образа
  const avgConfidence = selectedItems.length > 0 
    ? selectedItems.reduce((sum, item) => sum + (item.confidence || 0), 0) / selectedItems.length
    : 0;

  // Создаем образ
  const look: Look = {
    id: lookId,
    title: generateLookTitle(prompt, analysis),
    prompt,
    items: selectedItems,
    totalPrice,
    tags: [...analysis.detectedStyles, ...analysis.detectedOccasions],
    style: analysis.detectedStyles,
    occasion: analysis.detectedOccasions,
    season: analysis.detectedSeasons as Season[],
    confidence: avgConfidence,
    createdAt: Date.now()
  };

  // Генерируем cover изображение
  try {
    look.coverImage = await generateCoverImage(look, filteredProducts);
  } catch (error) {
    console.warn('Failed to generate cover image:', error);
    look.coverImage = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop';
  }

  return look;
}

// Вспомогательные функции
function generateSelectionReason(product: Product, requirements: any): string {
  const reasons: string[] = [];

  if (requirements.kinds && requirements.kinds.includes(product.kind)) {
    reasons.push(`подходит по категории ${product.kind}`);
  }

  if (requirements.colors && product.color && requirements.colors.includes(product.color)) {
    reasons.push(`совпадает по цвету`);
  }

  if (requirements.materials && product.material) {
    const matchingMaterials = product.material.filter((m: string) => requirements.materials.includes(m));
    if (matchingMaterials.length > 0) {
      reasons.push(`подходящий материал ${matchingMaterials[0]}`);
    }
  }

  if (requirements.season && product.season) {
    const matchingSeasons = product.season.filter((s: Season) => requirements.season.includes(s));
    if (matchingSeasons.length > 0) {
      reasons.push(`сезонность ${matchingSeasons[0]}`);
    }
  }

  return reasons.length > 0 ? reasons.join(', ') : 'хорошо вписывается в образ';
}

function generateLookTitle(prompt: string, analysis: any): string {
  const { detectedStyles, detectedOccasions } = analysis;
  
  if (detectedOccasions.length > 0) {
    const occasion = detectedOccasions[0];
    const style = detectedStyles.length > 0 ? detectedStyles[0] : '';
    return `${style ? style + ' ' : ''}образ для ${occasion}`;
  }
  
  if (detectedStyles.length > 0) {
    return `${detectedStyles[0]} образ`;
  }
  
  return prompt.length > 50 ? prompt.substring(0, 47) + '...' : prompt;
}

function getPreferredCategoryOrder(styles: string[]): ApparelKind[] {
  // Базовый порядок для большинства образов
  let order: ApparelKind[] = ['topwear', 'bottomwear', 'footwear', 'outerwear', 'accessories'];

  // Корректируем порядок в зависимости от стиля
  if (styles.includes('elegant') || styles.includes('business')) {
    order = ['dress', 'suiting', 'topwear', 'bottomwear', 'footwear', 'accessories'];
  } else if (styles.includes('sport')) {
    order = ['activewear', 'footwear', 'accessories'];
  } else if (styles.includes('winter')) {
    order = ['outerwear', 'knitwear', 'topwear', 'bottomwear', 'footwear', 'accessories'];
  }

  return order;
}

// Экспорт дополнительных функций для использования в компонентах
export { styleMap, analyzePrompt, generateCoverImage };