import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sparkles, Plus } from 'lucide-react';
import { Look, Product } from '../types/app';
import { buildLookFromPrompt } from '../utils/lookgen';

interface AILookGeneratorProps {
  products: Product[];
  onLookGenerated: (look: Look) => void;
  onAddLookToCart: (look: Look) => void;
  className?: string;
}

export default function AILookGenerator({ 
  products, 
  onLookGenerated, 
  onAddLookToCart, 
  className = '' 
}: AILookGeneratorProps) {
  const [prompt, setPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [currentLook, setCurrentLook] = React.useState<Look | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Симулируем задержку для AI обработки
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedLook = buildLookFromPrompt(prompt, products);
    setCurrentLook(generatedLook);
    onLookGenerated(generatedLook);
    setIsGenerating(false);
  };

  const handleAddToCart = () => {
    if (currentLook) {
      onAddLookToCart(currentLook);
    }
  };

  const lookProducts = React.useMemo(() => {
    if (!currentLook) return [];
    return currentLook.items
      .map(item => products.find(p => p.id === item.productId))
      .filter(Boolean) as Product[];
  }, [currentLook, products]);

  return (
    <div className={`bg-white rounded-2xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-gradient-magic-primary flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">AI Look Generator</h2>
          <p className="text-sm text-gray-500">Создайте образ по описанию</p>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Опишите желаемый образ
          </label>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Например: casual summer look, office style, streetwear"
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isGenerating) {
                handleGenerate();
              }
            }}
          />
        </div>
        
        <Button 
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="w-full bg-gradient-magic-primary text-white hover:opacity-90"
        >
          {isGenerating ? (
            <>
              <Sparkles className="h-4 w-4 mr-2 animate-spin" />
              Генерируем образ...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Сгенерировать образ
            </>
          )}
        </Button>
      </div>

      {/* Generated Look */}
      {currentLook && lookProducts.length > 0 && (
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              {currentLook.title}
            </h3>
            <Button 
              onClick={handleAddToCart}
              size="sm"
              className="bg-luma-primary-600 text-white hover:bg-luma-primary-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              В корзину
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {lookProducts.map((product, index) => (
              <div key={product.id} className="group">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={product.media?.[0]?.url || '/media/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {product.storeName}
                  </p>
                  <p className="text-xs font-semibold text-luma-primary-600">
                    {product.price.toLocaleString()} сум
                  </p>
                </div>
              </div>
            ))}
          </div>

          {lookProducts.length < currentLook.items.length && (
            <p className="text-xs text-gray-500 mt-3">
              Некоторые товары из образа недоступны
            </p>
          )}
        </div>
      )}

      {/* Example Prompts */}
      {!currentLook && (
        <div className="border-t pt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Примеры запросов:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'casual summer',
              'office style',
              'streetwear',
              'modest look',
              'sport outfit'
            ].map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}