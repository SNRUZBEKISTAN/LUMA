import React, { useState } from 'react';
import { ArrowLeft, Mic, Lightbulb, Sparkles, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AILookCard } from './AILookCard';
import { AILookSkeleton } from './AILookSkeleton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AIGuideAnimation } from './AIGuideAnimation';

interface AILookScreenProps {
  onBack: () => void;
  onNavigateToLookConfig?: (lookId: string) => void;
}

const occasionChips = [
  'На вечер', 'На свидание', 'Для прогулки', 'Для спорта', 
  'В офис', 'На учебу', 'Пляж', 'Зима'
];

const styleChips = [
  'Минимализм', 'Streetwear', 'Элегантно', 'Casual', 
  'Smart casual', 'Y2K'
];

const colorChips = [
  'Монохром', 'Пастель', 'Теплые', 'Холодные', 'Яркие акценты'
];

const budgetPresets = [
  { label: 'до 500к', value: 500000 },
  { label: 'до 1M', value: 1000000 },
  { label: 'до 2M', value: 2000000 }
];

const weatherOptions = ['Жарко', 'Прохладно', 'Дождь', 'Зима'];

// Mock data for generated looks
const mockLooks = [
  {
    id: '1',
    title: 'Элегантный вечерний образ',
    tags: ['Вечер', 'Элегантно', '1.2M сум'],
    items: [
      { name: 'Черное платье миди', price: 450000, image: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Черные лоферы', price: 280000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['36', '37', '38', '39', '40', '41'] },
      { name: 'Золотые серьги', price: 150000, image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400', availableSizes: ['Универсальный'] },
      { name: 'Черная сумочка', price: 320000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', availableSizes: ['Универсальный'] }
    ],
    totalPrice: 1200000,
    coverImage: 'https://images.unsplash.com/photo-1566479179817-c0a7bc2e6f27?w=600'
  },
  {
    id: '2',
    title: 'Повседневный comfort look',
    tags: ['Casual', 'Прогулка', '680к сум'],
    items: [
      { name: 'Белая футболка', price: 120000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Джинсы mom fit', price: 320000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', availableSizes: ['24', '25', '26', '27', '28', '29', '30'] },
      { name: 'Белые кроссовки', price: 240000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', availableSizes: ['36', '37', '38', '39', '40', '41', '42'] }
    ],
    totalPrice: 680000,
    coverImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600'
  },
  {
    id: '3',
    title: 'Офисный стиль smart casual',
    tags: ['Офис', 'Smart casual', '950к сум'],
    items: [
      { name: 'Блейзер серый', price: 420000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Брюки прямые', price: 280000, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', availableSizes: ['24', '25', '26', '27', '28', '29', '30'] },
      { name: 'Белая рубашка', price: 180000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Туфли лоферы', price: 320000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['36', '37', '38', '39', '40', '41'] }
    ],
    totalPrice: 950000,
    coverImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600'
  },
  {
    id: '4',
    title: 'Романтический look на свидание',
    tags: ['Свидание', 'Романтично', '780к сум'],
    items: [
      { name: 'Платье миди с цветами', price: 380000, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Босоножки на каблуке', price: 240000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['36', '37', '38', '39', '40', '41'] },
      { name: 'Сумочка клатч', price: 160000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', availableSizes: ['Универсальный'] }
    ],
    totalPrice: 780000,
    coverImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600'
  }
];

// Mock data for recent queries with complete looks
const recentQueries = [
  {
    query: 'Мужской streetwear образ, casual стиль для города',
    preview: 'https://images.unsplash.com/photo-1660485760386-b8957f9b9b96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBzdHJlZXQlMjBzdHlsZSUyMG91dGZpdHxlbnwxfHx8fDE3NTkxNjYzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    totalPrice: 850000,
    items: [
      { name: 'Худи оверсайз', price: 280000, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', availableSizes: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Джинсы широкие', price: 350000, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', availableSizes: ['30', '32', '34', '36', '38'] },
      { name: 'Кроссовки белые', price: 220000, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', availableSizes: ['40', '41', '42', '43', '44', '45'] }
    ]
  },
  {
    query: 'Женский элегантный офисный look, минимализм',
    preview: 'https://images.unsplash.com/photo-1758457077975-1073493b5744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3b21hbiUyMGVsZWdhbnQlMjBidXNpbmVzcyUyMG91dGZpdHxlbnwxfHx8fDE3NTkxNjY0MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    totalPrice: 1150000,
    items: [
      { name: 'Блейзер приталенный', price: 480000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Брюки классические', price: 320000, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', availableSizes: ['24', '25', '26', '27', '28', '29', '30'] },
      { name: 'Туфли на низком каблуке', price: 350000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['36', '37', '38', '39', '40', '41'] }
    ]
  },
  {
    query: 'Мужской business casual, smart style для работы',
    preview: 'https://images.unsplash.com/photo-1758599543154-7aebd6ef9095?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMGNhc3VhbCUyMG91dGZpdHxlbnwxfHx8fDE3NTkxNjY0MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    totalPrice: 1050000,
    items: [
      { name: 'Рубашка хлопковая', price: 250000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', availableSizes: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Чиносы темно-синие', price: 320000, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400', availableSizes: ['30', '32', '34', '36', '38'] },
      { name: 'Лоферы кожаные', price: 480000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['40', '41', '42', '43', '44', '45'] }
    ]
  },
  {
    query: 'Женский летний casual образ, яркие цвета',
    preview: 'https://images.unsplash.com/photo-1723189518780-2380f644eba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3b21hbiUyMGNhc3VhbCUyMHN1bW1lciUyMGZhc2hpb258ZW58MXx8fHwxNzU5MTY2NDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    totalPrice: 590000,
    items: [
      { name: 'Топ яркий', price: 150000, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', availableSizes: ['XS', 'S', 'M', 'L', 'XL'] },
      { name: 'Шорты джинсовые', price: 200000, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400', availableSizes: ['24', '25', '26', '27', '28', '29', '30'] },
      { name: 'Сандалии', price: 240000, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', availableSizes: ['36', '37', '38', '39', '40', '41'] }
    ]
  }
];

export function AILookScreen({ onBack, onNavigateToLookConfig }: AILookScreenProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [budget, setBudget] = useState([1000000]);
  const [size, setSize] = useState('');
  const [height, setHeight] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [weather, setWeather] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [looks, setLooks] = useState<typeof mockLooks>([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [expandedQuery, setExpandedQuery] = useState<number | null>(null);

  const handleChipClick = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter(c => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
    
    // Add chip to prompt
    if (!prompt.includes(chip.toLowerCase())) {
      const newPrompt = prompt ? `${prompt}, ${chip.toLowerCase()}` : chip.toLowerCase();
      setPrompt(newPrompt);
      setCharacterCount(newPrompt.length);
    }
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    setCharacterCount(value.length);
  };

  const handleGenerate = () => {
    setIsLoading(true);
    setLooks([]);
    
    // Simulate API call
    setTimeout(() => {
      setLooks(mockLooks);
      setIsLoading(false);
    }, 2000);
  };

  const handleClear = () => {
    setPrompt('');
    setSelectedChips([]);
    setCharacterCount(0);
    setLooks([]);
  };

  const handleGenerateMore = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const moreLooks = [...mockLooks].map(look => ({
        ...look,
        id: look.id + '_more',
        title: `Альтернативный ${look.title.toLowerCase()}`
      }));
      setLooks([...looks, ...moreLooks]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Gradient */}
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
            <div className="relative z-10">
              <h1 className="font-bold text-lg text-white mb-[1px] mt-[5px] mr-[0px] ml-[0px]">
                ✨ Собери образ с AI
              </h1>
              <p className="text-white/90 text-xs font-medium">
                Опиши стиль — получи готовый look
              </p>
            </div>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* AI Guide Animation */}
        <AIGuideAnimation />

        {/* Prompt Input */}
        <div className="space-y-2">
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => handlePromptChange(e.target.value)}
              placeholder="Например: «Элегантный образ на вечер под чёрные лоферы, до 1,5 млн сум»"
              className="min-h-[80px] bg-ai-subtle border-ai-subtle rounded-xl px-4 py-3 pr-20 text-ai-primary placeholder:text-ai-secondary resize-none text-sm"
              maxLength={500}
            />
            
            {/* Input Icons */}
            <div className="absolute right-3 top-2 flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-ai-secondary hover:text-ai-primary"
              >
                <Mic className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-ai-secondary hover:text-ai-primary"
              >
                <Lightbulb className="w-3.5 h-3.5" />
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
            Добавь бюджет, цвет и событие — подбор будет точнее
          </p>
        </div>

        {/* Quick Presets - Horizontal Slider */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-ai-primary">Быстрый выбор</h4>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide chip-slider pb-2">
            {[...occasionChips, ...styleChips, ...colorChips].map((chip) => (
              <Badge
                key={chip}
                variant={selectedChips.includes(chip) ? "default" : "secondary"}
                className={`cursor-pointer animate-spring px-4 py-2 rounded-full whitespace-nowrap flex-shrink-0 ${
                  selectedChips.includes(chip) 
                    ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-600/90' 
                    : 'bg-gray-100 text-ai-secondary hover:bg-gray-200'
                }`}

                onClick={() => handleChipClick(chip)}
              >
                {chip}
              </Badge>
            ))}
          </div>
        </div>



        {/* Advanced Filters */}
        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              Доп. параметры
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={`transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
              >
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-4">
            {/* Budget */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-ai-primary">Бюджет</h4>
              <Slider
                value={budget}
                onValueChange={setBudget}
                max={3000000}
                min={100000}
                step={50000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-ai-secondary">
                <span>100к сум</span>
                <span className="font-medium text-ai-primary">
                  {budget[0].toLocaleString('ru-RU')}
                </span>
                <span>3M сум</span>
              </div>
              <div className="flex gap-2">
                {budgetPresets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => setBudget([preset.value])}
                    className="text-xs"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Size and Height */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-ai-primary">Размер</h4>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите размер" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-ai-primary">Рост</h4>
                <Select value={height} onValueChange={setHeight}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите рост" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="150-160">150-160 см</SelectItem>
                    <SelectItem value="160-170">160-170 см</SelectItem>
                    <SelectItem value="170-180">170-180 см</SelectItem>
                    <SelectItem value="180+">180+ см</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Weather */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-ai-primary">Погода/сезон</h4>
              <div className="flex flex-wrap gap-2">
                {weatherOptions.map((option) => (
                  <Badge
                    key={option}
                    variant={weather === option ? "default" : "secondary"}
                    className={`cursor-pointer animate-spring px-3 py-1.5 rounded-full ${
                      weather === option 
                        ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-600/90' 
                        : 'bg-gray-100 text-ai-secondary hover:bg-gray-200'
                    }`}
                    onClick={() => setWeather(weather === option ? '' : option)}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isLoading}
            className="flex-1 h-10 rounded-xl magic-callout text-white font-medium text-sm"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Генерирую...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Сгенерировать образ
              </div>
            )}
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleClear}
            className="px-3 h-10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Recent Queries Section */}
        {!isLoading && looks.length === 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-ai-primary">
              Последние запросы от пользователей
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              {recentQueries.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-ai-card border border-gray-100 overflow-hidden"
                >
                  {/* Preview Image */}
                  <div className="aspect-square bg-gray-100 relative">
                    <ImageWithFallback
                      src={item.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* AI Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-black/20 backdrop-blur-sm text-white border-0 text-xs px-1.5 py-0.5">
                        ✨ AI
                      </Badge>
                    </div>

                    {/* Expand/Collapse Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white"
                      onClick={() => setExpandedQuery(expandedQuery === index ? null : index)}
                    >
                      {expandedQuery === index ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </Button>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 space-y-2">
                    {/* Query Text */}
                    <p className="text-xs text-ai-secondary line-clamp-2 leading-relaxed">
                      {item.query}
                    </p>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-ai-secondary">Итого</p>
                        <p className="font-semibold text-sm text-ai-primary">
                          {item.totalPrice.toLocaleString('ru-RU')}
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => {
                          if (onNavigateToLookConfig) {
                            // Create a temporary look from recent query
                            const tempLook = {
                              id: `recent-${index}`,
                              title: item.query.slice(0, 50) + '...',
                              tags: ['AI-подбор'],
                              items: item.items,
                              totalPrice: item.totalPrice,
                              coverImage: item.preview
                            };
                            onNavigateToLookConfig(tempLook.id);
                          }
                        }}
                        size="sm"
                        className="magic-callout text-white font-medium px-2 py-1 rounded-lg h-auto text-xs"
                      >
                        Выбрать
                      </Button>
                    </div>

                    {/* Expanded Details */}
                    {expandedQuery === index && (
                      <div className="pt-2 border-t border-gray-100 space-y-2">
                        <h4 className="text-xs font-medium text-ai-primary">
                          Состав ({item.items.length} вещей)
                        </h4>
                        
                        <div className="space-y-1">
                          {item.items.slice(0, 3).map((lookItem, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                              {/* Item Image */}
                              <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                <ImageWithFallback
                                  src={lookItem.image}
                                  alt={lookItem.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              {/* Item Info */}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-ai-primary truncate">
                                  {lookItem.name}
                                </p>
                                <p className="text-xs text-ai-secondary">
                                  {lookItem.price.toLocaleString()} сум
                                </p>
                              </div>
                            </div>
                          ))}
                          
                          {item.items.length > 3 && (
                            <p className="text-xs text-ai-secondary text-center py-1">
                              +{item.items.length - 3} ещё
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {(isLoading || looks.length > 0) && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-ai-primary">
              {isLoading ? 'Подбираю образы...' : 'Готовые образы'}
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {isLoading ? (
                <>
                  <AILookSkeleton compact />
                  <AILookSkeleton compact />
                  <AILookSkeleton compact />
                  <AILookSkeleton compact />
                </>
              ) : (
                <>
                  {/* Casual Street Look */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => onNavigateToLookConfig?.('casual-street')}>
                    <div className="aspect-[3/4] relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1672567711579-a8615fe2d373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzdHJlZXQlMjBvdXRmaXQlMjBmYXNoaW9ufGVufDF8fHx8MTc1OTE2NjA5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Casual Street Look"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium text-sm mb-1">Casual Street</h4>
                        <p className="text-white/80 text-xs">От 4 590₽</p>
                      </div>
                    </div>
                  </div>

                  {/* Business Elegant Look */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => onNavigateToLookConfig?.('business-elegant')}>
                    <div className="aspect-[3/4] relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwYnVzaW5lc3MlMjBvdXRmaXR8ZW58MXx8fHwxNzU5MTY2MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Business Elegant Look"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium text-sm mb-1">Business Elegant</h4>
                        <p className="text-white/80 text-xs">От 8 990₽</p>
                      </div>
                    </div>
                  </div>

                  {/* Party Dress Look */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => onNavigateToLookConfig?.('party-dress')}>
                    <div className="aspect-[3/4] relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1759349394750-f85f5c3fc4b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGRyZXNzJTIwZ2xhbW91ciUyMG91dGZpdHxlbnwxfHx8fDE3NTk2ODg0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Party Dress Look"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium text-sm mb-1">Party Glam</h4>
                        <p className="text-white/80 text-xs">От 6 290₽</p>
                      </div>
                    </div>
                  </div>

                  {/* Cozy Winter Look */}
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => onNavigateToLookConfig?.('cozy-winter')}>
                    <div className="aspect-[3/4] relative">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1708739237236-8bb32a163c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwd2ludGVyJTIwZmFzaGlvbiUyMG91dGZpdHxlbnwxfHx8fDE3NTkxNjYxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Cozy Winter Look"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-white font-medium text-sm mb-1">Cozy Winter</h4>
                        <p className="text-white/80 text-xs">От 7 450₽</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {!isLoading && (
              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleGenerateMore}
                  className="px-6"
                >
                  Сгенерировать ещё
                </Button>
                
                <div className="flex justify-center gap-3 mt-3">
                  <Badge variant="secondary" className="cursor-pointer">дешевле</Badge>
                  <Badge variant="secondary" className="cursor-pointer">теплее</Badge>
                  <Badge variant="secondary" className="cursor-pointer">более ярко</Badge>
                  <Badge variant="secondary" className="cursor-pointer">более строго</Badge>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && looks.length === 0 && prompt.length === 0 && (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 mx-auto bg-gradient-pastel-wash rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-luma-primary-600" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-ai-primary text-sm">
                Я готов собрать образ — расскажи, куда идёшь
              </h3>
              <p className="text-xs text-ai-secondary">
                Опиши, куда идёшь и что любишь — и я подберу вещи
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AILookScreen;