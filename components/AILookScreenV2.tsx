import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic, Lightbulb, Sparkles, RotateCcw, ChevronDown, ChevronUp, Filter, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

import { ImageWithFallback } from './figma/ImageWithFallback';
import { AIGuideAnimation } from './AIGuideAnimation';
import { buildLookFromPrompt, styleMap, analyzePrompt } from '../utils/lookgen';
import { Product, Look, AppState, AppActions, Gender } from '../types/app';
import { searchFashionImage } from '../utils/imageSearch';

interface AILookScreenV2Props {
  state: AppState;
  actions: AppActions;
  onBack: () => void;
  onNavigateToLookDetail?: (lookId: string) => void;
}



// Расширенные чипы для быстрого выбора
const styleChips = [
  { label: 'Минимализм', value: 'minimalist', color: 'bg-gray-100' },
  { label: 'Элегантность', value: 'elegant', color: 'bg-purple-100' },
  { label: 'Streetwear', value: 'streetwear', color: 'bg-blue-100' },
  { label: 'Business', value: 'business', color: 'bg-indigo-100' },
  { label: 'Casual', value: 'casual', color: 'bg-green-100' },
  { label: 'Романтично', value: 'romantic', color: 'bg-pink-100' }
];

const occasionChips = [
  { label: 'Работа', value: 'work', color: 'bg-slate-100' },
  { label: 'Свидание', value: 'date', color: 'bg-rose-100' },
  { label: 'Вечеринка', value: 'party', color: 'bg-amber-100' },
  { label: 'Прогулка', value: 'walk', color: 'bg-emerald-100' },
  { label: 'Спорт', value: 'sport', color: 'bg-cyan-100' },
  { label: 'Путешествие', value: 'travel', color: 'bg-orange-100' }
];

const colorChips = [
  { label: 'Монохром', value: 'monochrome', color: 'bg-gray-100' },
  { label: 'Пастель', value: 'pastel', color: 'bg-purple-50' },
  { label: 'Яркие', value: 'bright', color: 'bg-rainbow' },
  { label: 'Нейтральные', value: 'neutral', color: 'bg-stone-100' },
  { label: 'Теплые', value: 'warm', color: 'bg-orange-100' },
  { label: 'Холодные', value: 'cold', color: 'bg-blue-100' }
];

// Популярные промпты от сообщества
const popularPrompts = [
  {
    id: 'example-1',
    title: "Элегантный офисный образ",
    prompt: "Создай стильный business casual look в нейтральных тонах для деловой встречи, бюджет до 2 млн сум",
    author: "Анна К.",
    likes: 124,
    coverImage: "https://images.unsplash.com/photo-1696453423411-3fc7847a9611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhc3VhbCUyMHdvbWFuJTIwZWxlZ2FudCUyMG9mZmljZXxlbnwxfHx8fDE3NTk2NzgyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 4,
    price: 1850000
  },
  {
    id: 'example-2',
    title: "Романтичный вечерний стиль",
    prompt: "Нежный романтичный образ для свидания в ресторане, пастельные тона, женственные силуэты",
    author: "Мария С.", 
    likes: 98,
    coverImage: "https://images.unsplash.com/photo-1671691302268-e316f81c7b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb21hbnRpYyUyMGV2ZW5pbmclMjBkcmVzcyUyMHdvbWFuJTIwZGlubmVyfGVufDF8fHx8MTc1OTY3ODIyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 3,
    price: 1200000
  },
  {
    id: 'example-3',
    title: "Дерзкий streetwear look",
    prompt: "Современный уличный стиль с яркими акцентами, кроссовки, oversized худи, молодежный вайб",
    author: "Артем М.",
    likes: 87,
    coverImage: "https://images.unsplash.com/photo-1581450369508-5f29e761d9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwdXJiYW4lMjBzdHlsZSUyMGhvb2RpZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc1OTY3ODIzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 5,
    price: 950000
  },
  {
    id: 'example-4',
    title: "Минималистичный casual",
    prompt: "Комфортный повседневный образ в стиле минимализм, базовые цвета, качественные материалы",
    author: "Екатерина Л.",
    likes: 156,
    coverImage: "https://images.unsplash.com/photo-1759346617240-b45ed956868e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pbWFsaXN0JTIwY2FzdWFsJTIwY2xvdGhpbmclMjBiYXNpY3xlbnwxfHx8fDE3NTk2NzgyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 3,
    price: 1450000
  },
  {
    id: 'example-5',
    title: "Гламурный party look",
    prompt: "Яркий образ для ночной вечеринки, блестки, смелые цвета, высокие каблуки, statement украшения",
    author: "София Р.",
    likes: 73,
    coverImage: "https://images.unsplash.com/photo-1759349394750-f85f5c3fc4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGRyZXNzJTIwZ2xhbW91ciUyMG91dGZpdHxlbnwxfHx8fDE3NTk2ODg0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 4,
    price: 2100000
  },
  {
    id: 'example-6',
    title: "Спортивный chic",
    prompt: "Стильный athleisure образ для активного дня, удобная одежда с модными акцентами",
    author: "Дмитрий К.",
    likes: 95,
    coverImage: "https://images.unsplash.com/photo-1696453423411-3fc7847a9611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhc3VhbCUyMHdvbWFuJTIwZWxlZ2FudCUyMG9mZmljZXxlbnwxfHx8fDE3NTk2NzgyMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 4,
    price: 850000
  },
  {
    id: 'example-7',
    title: "Винтажный образ",
    prompt: "Ретро стиль 90-х с современными элементами, джинсы высокой посадки и кроп-топ",
    author: "Алёна Б.",
    likes: 112,
    coverImage: "https://images.unsplash.com/photo-1671691302268-e316f81c7b3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyb21hbnRpYyUyMGV2ZW5pbmclMjBkcmVzcyUyMHdvbWFuJTIwZGlubmVyfGVufDF8fHx8MTc1OTY3ODIyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 5,
    price: 750000
  },
  {
    id: 'example-8',
    title: "Летний vacation look",
    prompt: "Легкий летний образ для отпуска, яркие цвета, натуральные материалы",
    author: "Ирина Н.",
    likes: 89,
    coverImage: "https://images.unsplash.com/photo-1581450369508-5f29e761d9c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwdXJiYW4lMjBzdHlsZSUyMGhvb2RpZSUyMHNuZWFrZXJzfGVufDF8fHx8MTc1OTY3ODIzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 3,
    price: 680000
  },
  {
    id: 'example-9',
    title: "Деловой для мужчин",
    prompt: "Классический мужской костюм с современными деталями для офиса",
    author: "Максим Р.",
    likes: 67,
    coverImage: "https://images.unsplash.com/photo-1759346617240-b45ed956868e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaW5pbWFsaXN0JTIwY2FzdWFsJTIwY2xvdGhpbmclMjBiYXNpY3xlbnwxfHx8fDE3NTk2NzgyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    itemCount: 4,
    price: 1950000
  },
  {
    id: 'example-10',
    title: "Свадебная гостья",
    prompt: "Элегантный образ для свадьбы, нежные тона, изысканные детали без конкуренции с невестой",
    author: "Виктория Т.",
    likes: 134,
    coverImage: "https://images.unsplash.com/photo-1756483510840-b0dda5f0dd0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwZ3Vlc3QlMjBkcmVzcyUyMGVsZWdhbnR8ZW58MXx8fHwxNzU5Njg4NDkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    itemCount: 4,
    price: 1650000
  }
];

export function AILookScreenV2({ state, actions, onBack, onNavigateToLookDetail }: AILookScreenV2Props) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [budget, setBudget] = useState([1500000]);
  const [preferredGender, setPreferredGender] = useState<Gender>('women');
  const [maxItems, setMaxItems] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedLooks, setGeneratedLooks] = useState<Look[]>([]);
  const [characterCount, setCharacterCount] = useState(0);

  const [recentLooks, setRecentLooks] = useState<Look[]>([]);
  const [confidence, setConfidence] = useState<number>(0);

  // Загружаем последние образы при инициализации
  useEffect(() => {
    const recent = state.looks.slice(-10).reverse(); // Берем до 10 последних образов
    setRecentLooks(recent);
  }, [state.looks]);

  // Функция для добавления чипа в промпт
  const handleChipSelect = (chipValue: string, chipType: 'style' | 'occasion' | 'color') => {
    let newPrompt = prompt;

    if (chipType === 'style') {
      if (selectedStyles.includes(chipValue)) {
        setSelectedStyles(selectedStyles.filter(s => s !== chipValue));
      } else {
        setSelectedStyles([...selectedStyles, chipValue]);
        if (!prompt.includes(chipValue)) {
          newPrompt = prompt ? `${prompt}, ${chipValue}` : chipValue;
        }
      }
    } else if (chipType === 'occasion') {
      if (selectedOccasions.includes(chipValue)) {
        setSelectedOccasions(selectedOccasions.filter(o => o !== chipValue));
      } else {
        setSelectedOccasions([...selectedOccasions, chipValue]);
        if (!prompt.includes(chipValue)) {
          newPrompt = prompt ? `${prompt}, ${chipValue}` : chipValue;
        }
      }
    } else if (chipType === 'color') {
      if (selectedColors.includes(chipValue)) {
        setSelectedColors(selectedColors.filter(c => c !== chipValue));
      } else {
        setSelectedColors([...selectedColors, chipValue]);
        if (!prompt.includes(chipValue)) {
          newPrompt = prompt ? `${prompt}, ${chipValue}` : chipValue;
        }
      }
    }

    setPrompt(newPrompt);
    setCharacterCount(newPrompt.length);
  };

  // Функция генерации cover изображения
  const generateCoverImageFromPrompt = async (look: Look): Promise<string> => {
    try {
      // Создаем поисковый запрос на основе стиля и повода
      const searchTerms = [];
      
      if (look.style && look.style.length > 0) {
        searchTerms.push(look.style[0].replace(/[^a-zA-Z0-9\s]/g, ''));
      }
      
      if (look.occasion && look.occasion.length > 0) {
        searchTerms.push(look.occasion[0].replace(/[^a-zA-Z0-9\s]/g, ''));
      }
      
      // Используем новую утилиту поиска изображений
      return await searchFashionImage(searchTerms);
    } catch (error) {
      console.warn('Failed to generate cover image:', error);
      return 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop';
    }
  };

  // Основная функция генерации образа
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setGeneratedLooks([]);
    setConfidence(0);

    try {
      // Создаем несколько вариантов образов
      const looks: Look[] = [];
      
      for (let i = 0; i < 3; i++) {
        const look = await buildLookFromPrompt(
          prompt,
          state.products,
          maxItems,
          budget[0],
          preferredGender
        );

        // Генерируем cover изображение
        const coverImage = await generateCoverImageFromPrompt(look);
        look.coverImage = coverImage;

        // Вычисляем общую стоимость
        const lookProducts = state.products.filter(p => 
          look.items.some(item => item.productId === p.id)
        );
        look.totalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0);

        looks.push(look);
      }

      setGeneratedLooks(looks);
      
      // Вычисляем среднюю уверенность
      const avgConfidence = looks.reduce((sum, look) => sum + (look.confidence || 0), 0) / looks.length;
      setConfidence(avgConfidence);

      // Добавляем образы в состояние приложения
      looks.forEach(look => {
        actions.generateLook(look.prompt || '');
      });

    } catch (error) {
      console.error('Error generating looks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Функция очистки формы
  const handleClear = () => {
    setPrompt('');
    setSelectedStyles([]);
    setSelectedOccasions([]);
    setSelectedColors([]);
    setCharacterCount(0);
    setGeneratedLooks([]);
    setConfidence(0);
    setIsFiltersOpen(false);
  };

  // Функция обработки клика на карточку примера
  const handleExampleClick = async (example: typeof popularPrompts[0]) => {
    try {
      setIsLoading(true);
      
      // Создаем look на основе примера
      const look = await buildLookFromPrompt(
        example.prompt,
        state.products,
        example.itemCount,
        example.price * 1.2, // увеличиваем бюджет на 20%
        'women'
      );

      // Используем изображение из примера
      look.coverImage = example.coverImage;
      look.title = example.title;
      look.totalPrice = example.price;
      look.id = example.id;

      // Добавляем образ в состояние
      actions.generateLook(example.prompt);
      
      // Навигируем к детальной странице образа
      if (onNavigateToLookDetail) {
        onNavigateToLookDetail(look.id);
      }
    } catch (error) {
      console.error('Error creating look from example:', error);
      // Fallback: просто заполняем промпт
      setPrompt(example.prompt);
      setCharacterCount(example.prompt.length);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-modern-gradient">
      {/* Header */}
      <div className="sticky top-0 z-40 magic-callout">
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center px-2">
            <h1 className="font-bold text-lg text-white mb-1">
              <Wand2 className="w-5 h-5 inline mr-2" />
              ИИ Стилист
            </h1>
            <p className="text-white/90 text-xs font-medium">
              Создаю идеальные образы на основе ваших предпочтений
            </p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* AI Guide Animation - всегда показываем сверху */}
        <div className="space-y-3">
          <h3 className="font-semibold text-ai-primary">Как это работает</h3>
          <AIGuideAnimation />
        </div>

        {/* Prompt Input */}
        <div className="space-y-3">
          <h3 className="font-semibold text-ai-primary">Опишите желаемый образ</h3>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                setCharacterCount(e.target.value.length);
              }}
              placeholder="Например: «Элегантный business casual образ для встречи с клиентами, в нейтральных тонах, бюджет до 1.5 млн сум»"
              className="min-h-[25px] bg-white border-ai-subtle rounded-xl px-4 py-3 pr-20 text-ai-primary placeholder:text-ai-secondary resize-none shadow-sm"
              maxLength={500}
            />
            
            {/* Input Icons */}
            <div className="absolute right-3 top-3 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-ai-secondary hover:text-ai-primary"
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-ai-secondary hover:text-ai-primary"
              >
                <Lightbulb className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Character Counter */}
            <div className="absolute right-3 bottom-2">
              <span className="text-xs text-ai-secondary">
                {characterCount}/500
              </span>
            </div>
          </div>
          
          <p className="text-xs text-ai-secondary">
            💡 Укажите повод, стиль, цветовые предпочтения и бюджет для более точного подбора
          </p>
        </div>


        {/* Advanced Filters - Collapsible */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Дополнительные параметры
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-6 pt-6">
            {/* Quick Style Selection */}
            <div className="space-y-3">
              <h4 className="font-medium text-ai-primary">Стиль</h4>
              <div className="flex flex-wrap gap-2">
                {styleChips.map((chip) => (
                  <Badge
                    key={chip.value}
                    variant={selectedStyles.includes(chip.value) ? "default" : "secondary"}
                    className={`cursor-pointer px-3 py-2 rounded-full transition-all ${
                      selectedStyles.includes(chip.value)
                        ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-600/90 shadow-sm'
                        : `${chip.color} text-ai-primary hover:bg-gray-200`
                    }`}
                    onClick={() => handleChipSelect(chip.value, 'style')}
                  >
                    {chip.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Occasion Selection */}
            <div className="space-y-3">
              <h4 className="font-medium text-ai-primary">Повод</h4>
              <div className="flex flex-wrap gap-2">
                {occasionChips.map((chip) => (
                  <Badge
                    key={chip.value}
                    variant={selectedOccasions.includes(chip.value) ? "default" : "secondary"}
                    className={`cursor-pointer px-3 py-2 rounded-full transition-all ${
                      selectedOccasions.includes(chip.value)
                        ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-600/90 shadow-sm'
                        : `${chip.color} text-ai-primary hover:bg-gray-200`
                    }`}
                    onClick={() => handleChipSelect(chip.value, 'occasion')}
                  >
                    {chip.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Quick Color Selection */}
            <div className="space-y-3">
              <h4 className="font-medium text-ai-primary">Цветовая гамма</h4>
              <div className="flex flex-wrap gap-2">
                {colorChips.map((chip) => (
                  <Badge
                    key={chip.value}
                    variant={selectedColors.includes(chip.value) ? "default" : "secondary"}
                    className={`cursor-pointer px-3 py-2 rounded-full transition-all ${
                      selectedColors.includes(chip.value)
                        ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-600/90 shadow-sm'
                        : `${chip.color} text-ai-primary hover:bg-gray-200`
                    }`}
                    onClick={() => handleChipSelect(chip.value, 'color')}
                  >
                    {chip.label}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Budget */}
            <div className="space-y-3">
              <h4 className="font-medium text-ai-primary">Бюджет</h4>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={5000000}
                min={200000}
                step={100000}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span className="text-ai-secondary">200k сум</span>
                <span className="font-medium text-luma-primary-600">
                  {budget[0].toLocaleString('ru-RU')} сум
                </span>
                <span className="text-ai-secondary">5M сум</span>
              </div>
            </div>

            <Separator />

            {/* Gender */}
            <div className="space-y-3">
              <h4 className="font-medium text-ai-primary">Пол</h4>
              <Select value={preferredGender} onValueChange={(value: Gender) => setPreferredGender(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="women">Женский</SelectItem>
                  <SelectItem value="men">Мужской</SelectItem>
                  <SelectItem value="unisex">Унисекс</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* Max Items */}
            <div className="space-y-3">
              <h4 className="font-medium text-ai-primary">Количество вещей в образе</h4>
              <Select value={maxItems.toString()} onValueChange={(value) => setMaxItems(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 вещи</SelectItem>
                  <SelectItem value="4">4 вещи</SelectItem>
                  <SelectItem value="5">5 вещей</SelectItem>
                  <SelectItem value="6">6 вещей</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>



        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="flex-1 h-12 rounded-xl magic-callout text-white font-medium"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Создаю образы...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Создать образ
              </div>
            )}
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleClear}
            className="px-4 h-12 border border-ai-subtle hover:bg-gray-50"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Confidence Indicator */}
        {confidence > 0 && (
          <div className="bg-white p-4 rounded-xl border border-ai-subtle">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-ai-primary mb-1">
                  Уверенность ИИ в подборе
                </p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-luma-primary-600 to-luma-primary-500 transition-all duration-500"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-luma-primary-600">
                  {Math.round(confidence * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Generated Looks */}
        {(isLoading || generatedLooks.length > 0) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-ai-primary">
                {isLoading ? 'Создаю образы...' : 'Готовые образы'}
              </h3>
              {!isLoading && generatedLooks.length > 0 && (
                <span className="text-xs text-ai-secondary">
                  {generatedLooks.length} {generatedLooks.length === 1 ? 'образ' : generatedLooks.length < 5 ? 'образа' : 'образов'}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {isLoading ? (
                // Loading skeletons - 2x5 format
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="animate-pulse">
                      <div className="aspect-square bg-gray-200"></div>
                      <div className="p-3 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                generatedLooks.map((look, index) => {
                  // Вычисляем общую стоимость образа
                  const lookProducts = state.products.filter(p => 
                    look.items.some(item => item.productId === p.id)
                  );
                  const totalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0);
                  
                  return (
                    <div
                      key={look.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                      onClick={() => {
                        actions.setSelectedLookId(look.id);
                        actions.setCurrentScreen('lookDetailV2');
                      }}
                    >
                      {/* AI Cover Image */}
                      <div className="aspect-square relative">
                        <ImageWithFallback
                          src={look.coverImage || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop'}
                          alt={look.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        
                        {/* AI Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-xs px-2 py-1">
                            <Wand2 className="w-3 h-3 mr-1" />
                            ИИ
                          </Badge>
                        </div>

                        {/* Confidence if available */}
                        {look.confidence && (
                          <div className="absolute top-3 right-3">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-700 shadow-sm">
                              {Math.round(look.confidence * 100)}%
                            </div>
                          </div>
                        )}

                        {/* Bottom overlay with quick info */}
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="text-white text-xs opacity-90">
                            {look.items.length} {look.items.length === 1 ? 'вещь' : look.items.length < 5 ? 'вещи' : 'вещей'}
                          </div>
                        </div>
                      </div>

                      {/* Card content with fixed layout */}
                      <div className="p-3 space-y-2 min-h-[80px] flex flex-col justify-between">
                        {/* Title - fixed height */}
                        <h4 className="font-medium text-sm text-gray-800 line-clamp-2 leading-tight h-[2.5rem] overflow-hidden">
                          {look.title}
                        </h4>
                        
                        {/* Bottom section - price and status */}
                        <div className="flex items-center justify-between mt-auto">
                          {/* Price tag */}
                          <div className="bg-[#F6F3FF] rounded-md px-2 py-1">
                            <span className="text-sm font-semibold text-luma-primary-600">
                              {totalPrice > 0 ? `${(totalPrice / 1000).toFixed(0)}K` : '—'}
                            </span>
                          </div>
                          
                          {/* New badge */}
                          <span className="text-xs text-green-600 font-medium">
                            Новый
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Inspiration Section - Объединённый раздел последних образов и популярных запросов */}
        {!isLoading && generatedLooks.length === 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-ai-primary">Вдохновение и образы</h4>
              <span className="text-xs text-ai-secondary">
                {recentLooks.length > 0 ? `${Math.min(recentLooks.length, 10)} последних` : 'от сообщества'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Сначала показываем последние образы */}
              {recentLooks.slice(0, 6).map((look) => {
                // Вычисляем общую стоимость образа
                const lookProducts = state.products.filter(p => 
                  look.items.some(item => item.productId === p.id)
                );
                const totalPrice = lookProducts.reduce((sum, p) => sum + p.price, 0);
                
                return (
                  <div
                    key={`recent-${look.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                    onClick={() => onNavigateToLookDetail?.(look.id)}
                  >
                    {/* AI Cover Image */}
                    <div className="aspect-square relative">
                      <ImageWithFallback
                        src={look.coverImage || 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop'}
                        alt={look.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* AI Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 text-white border-0 text-xs px-2 py-1 shadow-sm">
                          <Wand2 className="w-3 h-3 mr-1" />
                          Мой ИИ
                        </Badge>
                      </div>

                      {/* Confidence if available */}
                      {look.confidence && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-700 shadow-sm">
                            {Math.round(look.confidence * 100)}%
                          </div>
                        </div>
                      )}

                      {/* Bottom overlay with quick info */}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-white text-xs opacity-90">
                          {look.items.length} {look.items.length === 1 ? 'вещь' : look.items.length < 5 ? 'вещи' : 'вещей'}
                        </div>
                      </div>
                    </div>

                    {/* Card content with fixed layout */}
                    <div className="p-3 space-y-2 min-h-[80px] flex flex-col justify-between">
                      {/* Title - fixed height */}
                      <h4 className="font-medium text-sm text-gray-800 line-clamp-2 leading-tight h-[2.5rem] overflow-hidden">
                        {look.title}
                      </h4>
                      
                      {/* Bottom section - price */}
                      <div className="flex items-center justify-between mt-auto">
                        {/* Price tag */}
                        <div className="bg-[#F6F3FF] rounded-md px-2 py-1">
                          <span className="text-sm font-semibold text-luma-primary-600">
                            {totalPrice > 0 ? `${(totalPrice / 1000).toFixed(0)}K` : '—'}
                          </span>
                        </div>
                        
                        {/* Recent badge */}
                        <span className="text-xs text-gray-500">
                          Недавно
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Затем показываем популярные запросы, дополняя до полного грида */}
              {popularPrompts.slice(0, Math.max(0, 10 - Math.min(recentLooks.length, 6))).map((example, index) => (
                <div
                  key={`popular-${example.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                  onClick={() => handleExampleClick(example)}
                >
                  {/* Fixed aspect ratio cover image */}
                  <div className="aspect-square relative">
                    <ImageWithFallback
                      src={example.coverImage}
                      alt={example.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Community Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-orange-500 text-white border-0 text-xs px-2 py-1 shadow-sm">
                        <Lightbulb className="w-3 h-3 mr-1" />
                        Пример
                      </Badge>
                    </div>

                    {/* Likes counter */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-gray-700 shadow-sm">
                        ❤️ {example.likes}
                      </div>
                    </div>

                    {/* Bottom overlay with quick info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-white text-xs opacity-90">
                        {example.itemCount} {example.itemCount === 1 ? 'вещь' : example.itemCount < 5 ? 'вещи' : 'вещей'}
                      </div>
                    </div>
                  </div>

                  {/* Card content with fixed layout */}
                  <div className="p-3 space-y-2 min-h-[80px] flex flex-col justify-between">
                    {/* Title - fixed height */}
                    <h4 className="font-medium text-sm text-gray-800 line-clamp-2 leading-tight h-[2.5rem] overflow-hidden">
                      {example.title}
                    </h4>
                    
                    {/* Bottom section - price and author aligned */}
                    <div className="flex items-center justify-between mt-auto">
                      {/* Price tag */}
                      <div className="bg-[#F6F3FF] rounded-md px-2 py-1">
                        <span className="text-sm font-semibold text-luma-primary-600">
                          {(example.price / 1000).toFixed(0)}K
                        </span>
                      </div>
                      
                      {/* Author */}
                      <span className="text-xs text-gray-500 truncate ml-2 max-w-[60px]">
                        {example.author}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Help text */}
            <div className="text-center pt-2">
              <p className="text-xs text-ai-secondary">
                💡 Нажмите на карточку чтобы открыть образ или использовать пример
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}