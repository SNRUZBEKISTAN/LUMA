import React from 'react';
import { X, Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface FiltersSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colors = [
  { id: 'white', name: 'Белый', hex: '#FFFFFF' },
  { id: 'black', name: 'Чёрный', hex: '#000000' },
  { id: 'beige', name: 'Бежевый', hex: '#F5F5DC' },
  { id: 'pink', name: 'Розовый', hex: '#FFC0CB' },
  { id: 'blue', name: 'Синий', hex: '#0000FF' },
  { id: 'red', name: 'Красный', hex: '#FF0000' },
  { id: 'green', name: 'Зелёный', hex: '#008000' },
  { id: 'gray', name: 'Серый', hex: '#808080' },
  { id: 'yellow', name: 'Жёлтый', hex: '#FFFF00' },
  { id: 'brown', name: 'Коричневый', hex: '#A52A2A' },
  { id: 'purple', name: 'Фиолетовый', hex: '#800080' },
  { id: 'orange', name: 'Оранжевый', hex: '#FFA500' }
];

const popularBrands = [
  'ZARA', 'H&M', 'UNIQLO', 'NIKE', 'ADIDAS', 'MANGO', 'BERSHKA', 'MASSIMO DUTTI', 'PULL&BEAR', 'STRADIVARIUS'
];

const deliveryOptions = [
  { id: 'today', name: 'Сегодня' },
  { id: 'tomorrow', name: 'Завтра' },
  { id: 'up-to-3-days', name: 'До 3 дней' }
];

export function FiltersSheet({ isOpen, onClose, onApplyFilters }: FiltersSheetProps) {
  const [priceRange, setPriceRange] = React.useState([0, 2000000]);
  const [priceFrom, setPriceFrom] = React.useState('');
  const [priceTo, setPriceTo] = React.useState('');
  const [selectedSizes, setSelectedSizes] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [brandSearch, setBrandSearch] = React.useState('');
  const [showAllBrands, setShowAllBrands] = React.useState(false);
  const [selectedRating, setSelectedRating] = React.useState('any');
  const [selectedDelivery, setSelectedDelivery] = React.useState<string[]>([]);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorToggle = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(c => c !== colorId)
        : [...prev, colorId]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleDeliveryToggle = (deliveryId: string) => {
    setSelectedDelivery(prev => 
      prev.includes(deliveryId) 
        ? prev.filter(d => d !== deliveryId)
        : [...prev, deliveryId]
    );
  };

  const handleReset = () => {
    setPriceRange([0, 2000000]);
    setPriceFrom('');
    setPriceTo('');
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedRating('any');
    setSelectedDelivery([]);
  };

  const handleApply = () => {
    const filters = {
      priceRange,
      priceFrom: priceFrom ? parseInt(priceFrom) : null,
      priceTo: priceTo ? parseInt(priceTo) : null,
      sizes: selectedSizes,
      colors: selectedColors,
      brands: selectedBrands,
      rating: selectedRating,
      delivery: selectedDelivery
    };
    onApplyFilters(filters);
    onClose();
  };

  const filteredBrands = popularBrands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const displayedBrands = showAllBrands ? filteredBrands : filteredBrands.slice(0, 5);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="relative w-full max-h-[90vh] bg-luma-surface-0 rounded-t-luma-lg shadow-luma-floating animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-luma-border-200">
          <h2 className="text-lg font-semibold text-luma-text-900">Фильтры</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <X className="w-5 h-5 text-luma-text-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="p-4 space-y-6">
            {/* Price Range */}
            <div>
              <h3 className="text-base font-medium text-luma-text-900 mb-4">Цена</h3>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={2000000}
                  step={10000}
                  className="mb-4"
                />
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-sm text-luma-text-600 mb-1 block">От</label>
                    <input
                      type="number"
                      value={priceFrom}
                      onChange={(e) => setPriceFrom(e.target.value)}
                      placeholder={priceRange[0].toLocaleString()}
                      className="w-full h-10 px-3 bg-luma-bg-0 border border-luma-border-200 rounded-luma text-luma-text-900 placeholder-luma-text-600 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-luma-text-600 mb-1 block">До</label>
                    <input
                      type="number"
                      value={priceTo}
                      onChange={(e) => setPriceTo(e.target.value)}
                      placeholder={priceRange[1].toLocaleString()}
                      className="w-full h-10 px-3 bg-luma-bg-0 border border-luma-border-200 rounded-luma text-luma-text-900 placeholder-luma-text-600 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="text-base font-medium text-luma-text-900 mb-4">Размер</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 py-2 rounded-luma text-sm font-medium transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-luma-primary-600 text-white'
                        : 'bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <h3 className="text-base font-medium text-luma-text-900 mb-4">Цвет</h3>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorToggle(color.id)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-luma transition-colors ${
                      selectedColors.includes(color.id)
                        ? 'bg-luma-primary-200'
                        : 'hover:bg-luma-bg-0'
                    }`}
                  >
                    <div 
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColors.includes(color.id)
                          ? 'border-luma-primary-600'
                          : 'border-luma-border-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs text-luma-text-900">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div>
              <h3 className="text-base font-medium text-luma-text-900 mb-4">Бренд</h3>
              
              {/* Brand Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-luma-text-600" />
                <input
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Поиск бренда"
                  className="w-full h-10 pl-10 pr-4 bg-luma-bg-0 border border-luma-border-200 rounded-luma text-luma-text-900 placeholder-luma-text-600 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
                />
              </div>

              {/* Brand List */}
              <div className="space-y-3">
                {displayedBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <Label htmlFor={brand} className="text-sm text-luma-text-900 cursor-pointer">
                      {brand}
                    </Label>
                  </div>
                ))}
                
                {!showAllBrands && filteredBrands.length > 5 && (
                  <button 
                    onClick={() => setShowAllBrands(true)}
                    className="text-luma-primary-600 text-sm font-medium hover:text-luma-primary-500 transition-colors flex items-center gap-1"
                  >
                    Показать ещё
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="text-base font-medium text-luma-text-900 mb-4">Рейтинг</h3>
              <RadioGroup value={selectedRating} onValueChange={setSelectedRating}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4+" id="rating-4" />
                  <Label htmlFor="rating-4" className="text-sm text-luma-text-900 cursor-pointer">
                    4+ ⭐
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3+" id="rating-3" />
                  <Label htmlFor="rating-3" className="text-sm text-luma-text-900 cursor-pointer">
                    3+ ⭐
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="rating-any" />
                  <Label htmlFor="rating-any" className="text-sm text-luma-text-900 cursor-pointer">
                    Любой
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Delivery */}
            <div>
              <h3 className="text-base font-medium text-luma-text-900 mb-4">Доставка</h3>
              <div className="space-y-3">
                {deliveryOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={selectedDelivery.includes(option.id)}
                      onCheckedChange={() => handleDeliveryToggle(option.id)}
                    />
                    <Label htmlFor={option.id} className="text-sm text-luma-text-900 cursor-pointer">
                      {option.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-luma-border-200 bg-luma-surface-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1 border-luma-border-200 text-luma-text-900 hover:bg-luma-primary-200"
            >
              Сбросить
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-luma-primary-600 hover:bg-luma-primary-500 text-white"
            >
              Показать результаты
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}