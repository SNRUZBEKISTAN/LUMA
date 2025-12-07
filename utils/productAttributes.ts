export interface AttributeDefinition {
  id: string;
  name: string;
  type: 'text' | 'select' | 'multiselect' | 'number' | 'boolean' | 'color' | 'size' | 'measurement';
  required: boolean;
  category?: string[];
  options?: string[];
  unit?: string;
  placeholder?: string;
  description?: string;
  group: 'basic' | 'material' | 'construction' | 'sizing' | 'technical' | 'origin' | 'care';
}

export interface ProductAttribute {
  id: string;
  value: any;
  label?: string;
}

// Глобальные атрибуты, применимые ко всем товарам
export const GLOBAL_ATTRIBUTES: AttributeDefinition[] = [
  // Базовые атрибуты
  {
    id: 'target_gender',
    name: 'Пол',
    type: 'select',
    required: true,
    options: ['Женщины', 'Мужчины', 'Unisex', 'Девочки', 'Мальчики', 'Младенцы'],
    group: 'basic'
  },
  {
    id: 'age_group',
    name: 'Возрастная группа',
    type: 'select',
    required: true,
    options: ['Baby 0-24м', 'Toddler 2-5', 'Kids 6-12', 'Teen 13-17', 'Adult 18+', 'Senior'],
    group: 'basic'
  },
  {
    id: 'occasion',
    name: 'Повод',
    type: 'multiselect',
    required: true,
    options: [
      'ежедневная', 'smart-casual', 'деловая', 'деловая формальная', 
      'вечерняя', 'коктейль', 'торжество/свадьба', 'клуб/пати', 
      'путешествия', 'пляж', 'спорт', 'турист/outdoor', 'рабочая/униформа'
    ],
    group: 'basic'
  },
  {
    id: 'season',
    name: 'Сезон',
    type: 'select',
    required: true,
    options: ['SS (весна-лето)', 'FW (осень-зима)', 'круглый год'],
    group: 'basic'
  },
  {
    id: 'style_aesthetic',
    name: 'Стиль/Эстетика',
    type: 'multiselect',
    required: false,
    options: [
      'минимализм', 'классика', 'спорт', 'athleisure', 'streetwear', 
      'preppy', 'boho', 'гранж', 'романтика', 'винтаж', 'милитари', 
      'workwear', 'techwear', 'modest'
    ],
    group: 'basic'
  },

  // Размеры и посадка
  {
    id: 'size_system',
    name: 'Размерная система',
    type: 'select',
    required: true,
    options: ['Международная (XS-XXL)', 'EU', 'US', 'UK', 'IT', 'JP', 'CN', 'RU', 'Джинсовая (W/L)', 'Обувная', 'Детская (рост/возраст)'],
    group: 'sizing'
  },
  {
    id: 'fit_type',
    name: 'Посадка/Fit',
    type: 'select',
    required: false,
    options: ['Slim', 'Regular', 'Relaxed', 'Oversized', 'Athletic', 'Curvy'],
    group: 'sizing'
  },

  // Цвет и узор
  {
    id: 'primary_color',
    name: 'Основной цвет',
    type: 'color',
    required: true,
    group: 'basic'
  },
  {
    id: 'pattern',
    name: 'Узор',
    type: 'select',
    required: true,
    options: [
      'однотон', 'полоска', 'клетка', 'ёлочка', 'горох', 'флора', 
      'гео', 'камуфляж', 'animal', 'tie-dye', 'абстракция', 'логомания'
    ],
    group: 'basic'
  },

  // Материалы
  {
    id: 'main_material',
    name: 'Основной материал',
    type: 'select',
    required: true,
    options: [
      'хлопок', 'лён', 'шёлк', 'шерсть', 'кашемир', 'кожа', 'замша',
      'полиэстер', 'нейлон', 'вискоза', 'модал', 'эластан', 'деним'
    ],
    group: 'material'
  },
  {
    id: 'material_composition',
    name: 'Состав материала',
    type: 'text',
    required: false,
    placeholder: 'например: 95% хлопок, 5% эластан',
    group: 'material'
  },

  // Происхождение
  {
    id: 'country_of_origin',
    name: 'Страна производства',
    type: 'select',
    required: true,
    options: [
      'Узбекистан', 'Турция', 'Китай', 'Италия', 'Франция', 'Германия', 
      'Испания', 'Португалия', 'Индия', 'Бангладеш', 'Вьетнам', 'Южная Корея'
    ],
    group: 'origin'
  },

  // Уход
  {
    id: 'care_instructions',
    name: 'Инструкции по уходу',
    type: 'multiselect',
    required: false,
    options: [
      'машинная стирка 30°C', 'машинная стирка 40°C', 'ручная стирка',
      'не отбеливать', 'сушка в барабане низкая температура', 
      'сушка на воздухе', 'глажка низкая температура', 'химчистка'
    ],
    group: 'care'
  }
];

// Специфические атрибуты для категорий одежды
export const CLOTHING_ATTRIBUTES: AttributeDefinition[] = [
  {
    id: 'closure_type',
    name: 'Тип застёжки',
    type: 'multiselect',
    required: false,
    category: ['Одежда'],
    options: ['молния', 'пуговицы', 'кнопки', 'крючки', 'липучка', 'завязки', 'резинка'],
    group: 'construction'
  },
  {
    id: 'sleeve_length',
    name: 'Длина рукава',
    type: 'select',
    required: false,
    category: ['Верх'],
    options: ['без рукавов', 'короткий', 'три четверти', 'длинный'],
    group: 'construction'
  },
  {
    id: 'neckline',
    name: 'Вырез',
    type: 'select',
    required: false,
    category: ['Верх'],
    options: ['круглый', 'V-образный', 'лодочка', 'хомут', 'стойка', 'квадратный'],
    group: 'construction'
  },
  {
    id: 'pocket_count',
    name: 'Количество карманов',
    type: 'number',
    required: false,
    category: ['Одежда'],
    group: 'construction'
  }
];

// Специфические атрибуты для обуви
export const FOOTWEAR_ATTRIBUTES: AttributeDefinition[] = [
  {
    id: 'heel_height',
    name: 'Высота каблука',
    type: 'measurement',
    required: false,
    category: ['Обувь'],
    unit: 'см',
    group: 'construction'
  },
  {
    id: 'shoe_width',
    name: 'Ширина колодки',
    type: 'select',
    required: false,
    category: ['Обувь'],
    options: ['узкая (N)', 'стандартная', 'широкая (W)', 'очень широкая (2E/4E)'],
    group: 'sizing'
  },
  {
    id: 'sole_material',
    name: 'Материал подошвы',
    type: 'select',
    required: false,
    category: ['Обувь'],
    options: ['резина', 'кожа', 'EVA', 'ПУ', 'TPU', 'Vibram'],
    group: 'material'
  },
  {
    id: 'upper_material',
    name: 'Материал верха',
    type: 'select',
    required: false,
    category: ['Обувь'],
    options: ['кожа', 'замша', 'нубук', 'текстиль', 'синтетика', 'сетка'],
    group: 'material'
  }
];

// Специфические атрибуты для спортивной одежды
export const SPORT_ATTRIBUTES: AttributeDefinition[] = [
  {
    id: 'sport_type',
    name: 'Вид спорта',
    type: 'select',
    required: false,
    category: ['Спорт'],
    options: ['бег', 'фитнес', 'йога', 'теннис', 'футбол', 'баскетбол', 'плавание', 'лыжи'],
    group: 'basic'
  },
  {
    id: 'moisture_wicking',
    name: 'Влагоотводящие свойства',
    type: 'boolean',
    required: false,
    category: ['Спорт'],
    group: 'technical'
  },
  {
    id: 'compression_level',
    name: 'Уровень компрессии',
    type: 'select',
    required: false,
    category: ['Спорт'],
    options: ['низкий', 'средний', 'высокий'],
    group: 'technical'
  }
];

// Функция для получения атрибутов по категории
export function getAttributesForCategory(categoryPath: string[]): AttributeDefinition[] {
  const attributes = [...GLOBAL_ATTRIBUTES];
  
  // Добавляем специфические атрибуты в зависимости от категории
  if (categoryPath.includes('Одежда')) {
    attributes.push(...CLOTHING_ATTRIBUTES);
  }
  
  if (categoryPath.includes('Обувь')) {
    attributes.push(...FOOTWEAR_ATTRIBUTES);
  }
  
  if (categoryPath.includes('Спорт') || categoryPath.includes('Performance')) {
    attributes.push(...SPORT_ATTRIBUTES);
  }
  
  return attributes.filter(attr => 
    !attr.category || 
    attr.category.some(cat => categoryPath.includes(cat))
  );
}

// Функция для группировки атрибутов
export function groupAttributes(attributes: AttributeDefinition[]): Record<string, AttributeDefinition[]> {
  return attributes.reduce((groups, attr) => {
    const group = attr.group || 'basic';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(attr);
    return groups;
  }, {} as Record<string, AttributeDefinition[]>);
}

// Названия групп для UI
export const ATTRIBUTE_GROUP_NAMES = {
  basic: 'Основные характеристики',
  material: 'Материалы и состав',
  construction: 'Конструкция и детали', 
  sizing: 'Размеры и посадка',
  technical: 'Технические свойства',
  origin: 'Происхождение',
  care: 'Уход и эксплуатация'
};

// Функция для валидации атрибутов
export function validateAttributes(attributes: ProductAttribute[], definitions: AttributeDefinition[]): string[] {
  const errors: string[] = [];
  
  definitions.forEach(def => {
    const attr = attributes.find(a => a.id === def.id);
    
    if (def.required && (!attr || !attr.value)) {
      errors.push(`Поле "${def.name}" обязательно для заполнения`);
    }
    
    if (attr && attr.value) {
      // Дополнительная валидация по типам
      if (def.type === 'number' && isNaN(Number(attr.value))) {
        errors.push(`Поле "${def.name}" должно содержать число`);
      }
    }
  });
  
  return errors;
}

// Функция для форматирования значения атрибута для отображения
export function formatAttributeValue(value: any, definition: AttributeDefinition): string {
  if (!value) return '';
  
  switch (definition.type) {
    case 'boolean':
      return value ? 'Да' : 'Нет';
    case 'measurement':
      return `${value} ${definition.unit || ''}`;
    case 'multiselect':
      return Array.isArray(value) ? value.join(', ') : value;
    case 'color':
      return value.name || value;
    default:
      return String(value);
  }
}