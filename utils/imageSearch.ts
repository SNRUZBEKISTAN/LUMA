// Утилита для поиска изображений с fallback на предустановленные URL

interface ImageSearchOptions {
  query: string;
  width?: number;
  height?: number;
  fit?: 'crop' | 'fill' | 'pad';
}

// Предустановленные изображения для разных типов запросов
const fallbackImages: Record<string, string> = {
  'business': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
  'elegant': 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=600&h=800&fit=crop',
  'casual': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop',
  'streetwear': 'https://images.unsplash.com/photo-1660485760386-b8957f9b9b96?w=600&h=800&fit=crop',
  'sport': 'https://images.unsplash.com/photo-1571019613540-996a3be71e6a?w=600&h=800&fit=crop',
  'work': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
  'date': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop',
  'party': 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop',
  'minimalist': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
  'romantic': 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&h=800&fit=crop',
  'travel': 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=800&fit=crop',
  'summer': 'https://images.unsplash.com/photo-1723189518780-2380f644eba4?w=600&h=800&fit=crop',
  'winter': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop',
  'spring': 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=600&h=800&fit=crop',
  'autumn': 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop',
  'monochrome': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
  'pastel': 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=600&h=800&fit=crop',
  'bright': 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=800&fit=crop',
  'neutral': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop',
  'fashion': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop',
  'outfit': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop',
  'default': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop'
};

// Функция для получения изображения с fallback логикой
export async function searchImage(options: ImageSearchOptions): Promise<string> {
  const { query, width = 600, height = 800, fit = 'crop' } = options;
  
  try {
    // Пытаемся использовать реальный поиск изображений, если доступен
    // В будущем здесь можно интегрировать реальный unsplash_tool
    
    // Пока используем fallback логику
    const queryLower = query.toLowerCase();
    
    // Ищем наиболее подходящее изображение по ключевым словам
    for (const [keyword, url] of Object.entries(fallbackImages)) {
      if (queryLower.includes(keyword)) {
        // Добавляем параметры размера к URL
        const urlObj = new URL(url);
        urlObj.searchParams.set('w', width.toString());
        urlObj.searchParams.set('h', height.toString());
        urlObj.searchParams.set('fit', fit);
        return urlObj.toString();
      }
    }
    
    // Возвращаем дефолтное изображение с правильными размерами
    const defaultUrl = new URL(fallbackImages.default);
    defaultUrl.searchParams.set('w', width.toString());
    defaultUrl.searchParams.set('h', height.toString());
    defaultUrl.searchParams.set('fit', fit);
    return defaultUrl.toString();
    
  } catch (error) {
    console.warn('Image search failed, using fallback:', error);
    return fallbackImages.default;
  }
}

// Специализированная функция для AI образов
export async function searchFashionImage(styleKeywords: string[]): Promise<string> {
  const query = [...styleKeywords, 'fashion', 'outfit'].join(' ');
  return searchImage({ 
    query, 
    width: 600, 
    height: 800, 
    fit: 'crop' 
  });
}

export default searchImage;