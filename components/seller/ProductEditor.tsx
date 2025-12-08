import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { ProductAttributesEditor } from './ProductAttributesEditor';
import { ProductAttribute } from '../../utils/productAttributes';
import { 
  Image, 
  Video, 
  Package, 
  Tag, 
  Grid3X3, 
  DollarSign, 
  Truck, 
  Link2, 
  Eye, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  X, 
  Check,
  AlertCircle,
  History,
  Palette,
  Ruler,
  FileText
} from 'lucide-react';

interface ProductVariation {
  id: string;
  color: string;
  size: string;
  sku: string;
  price: string;
  oldPrice: string;
  stock: number;
  barcode: string;
}

interface ProductEditorProps {
  onBack: () => void;
  onSave: (draft: boolean) => void;
}

export function ProductEditor({ onBack, onSave }: ProductEditorProps) {
  const [activeSection, setActiveSection] = useState<string>('media');
  const [showHistory, setShowHistory] = useState(false);
  
  // Product data state
  const [product, setProduct] = useState({
    name: 'Платье миди с принтом',
    description: 'Элегантное платье миди с цветочным принтом. Идеально подходит для офиса и повседневной носки.',
    tags: ['платье', 'миди', 'принт', 'элегантное'],
    category: 'dresses',
    categoryPath: ['Одежда', 'Платья', 'Миди'],
    material: 'хлопок',
    country: 'узбекистан',
    season: 'весна-лето',
    style: 'casual',
    basePrice: '890000',
    oldPrice: '1200000',
    costPrice: '450000',
    weight: '0.3',
    dimensions: '30x40x5',
    warehouse: 'main',
    enableVideos: true,
    enableTeasers: true,
    slug: 'platye-midi-s-printom'
  });

  // Product attributes state
  const [attributes, setAttributes] = useState<ProductAttribute[]>([
    { id: 'target_gender', value: 'Женщины' },
    { id: 'age_group', value: 'Adult 18+' },
    { id: 'main_material', value: 'хлопок' },
    { id: 'season', value: 'SS (весна-лето)' },
    { id: 'country_of_origin', value: 'Узбекистан' }
  ]);

  const [variations, setVariations] = useState<ProductVariation[]>([
    { id: '1', color: 'Синий', size: 'S', sku: 'DR-001-BL-S', price: '890000', oldPrice: '1200000', stock: 5, barcode: '1234567890123' },
    { id: '2', color: 'Синий', size: 'M', sku: 'DR-001-BL-M', price: '890000', oldPrice: '1200000', stock: 8, barcode: '1234567890124' },
    { id: '3', color: 'Синий', size: 'L', sku: 'DR-001-BL-L', price: '890000', oldPrice: '1200000', stock: 3, barcode: '1234567890125' },
    { id: '4', color: 'Красный', size: 'S', sku: 'DR-001-RD-S', price: '890000', oldPrice: '1200000', stock: 2, barcode: '1234567890126' },
    { id: '5', color: 'Красный', size: 'M', sku: 'DR-001-RD-M', price: '890000', oldPrice: '1200000', stock: 6, barcode: '1234567890127' },
    { id: '6', color: 'Красный', size: 'L', sku: 'DR-001-RD-L', price: '890000', oldPrice: '1200000', stock: 4, barcode: '1234567890128' },
  ]);

  const [selectedVariations, setSelectedVariations] = useState<string[]>([]);
  const [bulkEditValues, setBulkEditValues] = useState({
    price: '',
    oldPrice: '',
    stock: ''
  });

  const sections = [
    { id: 'media', title: 'Медиа', icon: Image, completed: true },
    { id: 'basic', title: 'Основное', icon: Package, completed: true },
    { id: 'category', title: 'Категория', icon: Tag, completed: true },
    { id: 'attributes', title: 'Атрибуты', icon: FileText, completed: attributes.length > 0 },
    { id: 'variations', title: 'Вариации', icon: Grid3X3, completed: false },
    { id: 'pricing', title: 'Цены', icon: DollarSign, completed: true },
    { id: 'shipping', title: 'Склад', icon: Truck, completed: false },
    { id: 'related', title: 'Связанные', icon: Link2, completed: false },
    { id: 'feed', title: 'Лента', icon: Eye, completed: false },
    { id: 'seo', title: 'SEO', icon: Search, completed: false },
  ];

  const colors = ['Синий', 'Красный', 'Зеленый', 'Черный', 'Белый'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const qualityTips = [
    { type: 'warning', text: 'Название слишком короткое (рекомендуется 20-80 символов)' },
    { type: 'success', text: 'Добавлено достаточно фотографий' },
    { type: 'info', text: 'Добавьте видео для увеличения конверсии на 35%' },
  ];

  const toggleVariationSelection = (id: string) => {
    setSelectedVariations(prev =>
      prev.includes(id) ? prev.filter(vid => vid !== id) : [...prev, id]
    );
  };

  const applyBulkEdit = () => {
    setVariations(prev => prev.map(variation => {
      if (selectedVariations.includes(variation.id)) {
        return {
          ...variation,
          ...(bulkEditValues.price && { price: bulkEditValues.price }),
          ...(bulkEditValues.oldPrice && { oldPrice: bulkEditValues.oldPrice }),
          ...(bulkEditValues.stock && { stock: parseInt(bulkEditValues.stock) }),
        };
      }
      return variation;
    }));
    setSelectedVariations([]);
    setBulkEditValues({ price: '', oldPrice: '', stock: '' });
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'media':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-luma-bg-0 rounded-xl border-2 border-dashed border-luma-border-200 flex items-center justify-center">
                  {i === 1 ? (
                    <Image className="w-8 h-8 text-luma-text-600" />
                  ) : (
                    <Plus className="w-6 h-6 text-luma-text-600" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-luma-primary-600 text-white rounded-xl luma-type-title-14">
                Добавить фото
              </button>
              <button className="flex-1 py-3 bg-luma-bg-0 text-luma-text-900 rounded-xl border border-luma-border-200 luma-type-title-14">
                Добавить видео
              </button>
            </div>
          </div>
        );

      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <label className="luma-type-cap-12 text-luma-text-600 mb-2 block">Название товара*</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-3 bg-luma-bg-0 rounded-xl border border-luma-border-200 luma-type-body-14"
                placeholder="Введите название товара"
                maxLength={80}
              />
              <p className="luma-type-micro-10 text-luma-text-600 mt-1">{product.name.length}/80</p>
            </div>
            
            <div>
              <label className="luma-type-cap-12 text-luma-text-600 mb-2 block">Описание</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 bg-luma-bg-0 rounded-xl border border-luma-border-200 luma-type-body-14 min-h-24"
                placeholder="Подробное описание товара"
                maxLength={2000}
              />
              <p className="luma-type-micro-10 text-luma-text-600 mt-1">{product.description.length}/2000</p>
            </div>

            <div>
              <label className="luma-type-cap-12 text-luma-text-600 mb-2 block">Теги</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-luma-primary-200 text-luma-primary-600 rounded-lg luma-type-cap-12 flex items-center gap-1">
                    {tag}
                    <X className="w-3 h-3 cursor-pointer" />
                  </span>
                ))}
              </div>
              <input
                type="text"
                className="w-full p-3 bg-luma-bg-0 rounded-xl border border-luma-border-200 luma-type-body-14"
                placeholder="Добавить тег и нажать Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    setProduct(prev => ({
                      ...prev,
                      tags: [...prev.tags, e.currentTarget.value.trim()]
                    }));
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>
        );

      case 'attributes':
        return (
          <div className="space-y-4">
            <div className="bg-luma-primary-200/50 rounded-xl p-4 mb-4">
              <h4 className="luma-type-title-14 text-luma-text-900 mb-2">
                Характеристики товара
              </h4>
              <p className="luma-type-body-14 text-luma-text-600">
                Заполните атрибуты товара на основе выбранной категории. 
                Обязательные поля отмечены звёздочкой (*).
              </p>
            </div>
            <ProductAttributesEditor
              categoryPath={product.categoryPath}
              attributes={attributes}
              onChange={setAttributes}
            />
          </div>
        );

      case 'variations':
        return (
          <div className="space-y-6">
            {/* Bulk Edit */}
            {selectedVariations.length > 0 && (
              <div className="bg-luma-primary-200 rounded-xl p-4">
                <h4 className="luma-type-title-14 text-luma-text-900 mb-3">
                  Массовое редактирование ({selectedVariations.length} выбрано)
                </h4>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Цена"
                    value={bulkEditValues.price}
                    onChange={(e) => setBulkEditValues(prev => ({ ...prev, price: e.target.value }))}
                    className="p-2 bg-white rounded-lg border border-luma-border-200 luma-type-body-14"
                  />
                  <input
                    type="text"
                    placeholder="Старая цена"
                    value={bulkEditValues.oldPrice}
                    onChange={(e) => setBulkEditValues(prev => ({ ...prev, oldPrice: e.target.value }))}
                    className="p-2 bg-white rounded-lg border border-luma-border-200 luma-type-body-14"
                  />
                  <input
                    type="text"
                    placeholder="Остаток"
                    value={bulkEditValues.stock}
                    onChange={(e) => setBulkEditValues(prev => ({ ...prev, stock: e.target.value }))}
                    className="p-2 bg-white rounded-lg border border-luma-border-200 luma-type-body-14"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={applyBulkEdit}
                    className="px-4 py-2 bg-luma-primary-600 text-white rounded-lg luma-type-cap-12"
                  >
                    Применить
                  </button>
                  <button
                    onClick={() => setSelectedVariations([])}
                    className="px-4 py-2 bg-white text-luma-text-600 rounded-lg border border-luma-border-200 luma-type-cap-12"
                  >
                    Отменить
                  </button>
                </div>
              </div>
            )}

            {/* Variations Matrix */}
            <div className="bg-luma-surface-0 rounded-xl border border-luma-border-200 overflow-hidden">
              <div className="grid grid-cols-8 gap-0 bg-luma-bg-0">
                <div className="p-3 luma-type-cap-12 text-luma-text-600">Выбор</div>
                <div className="p-3 luma-type-cap-12 text-luma-text-600">Цвет</div>
                <div className="p-3 luma-type-cap-12 text-luma-text-600">Размер</div>
                <div className="p-3 luma-type-cap-12 text-luma-text-600">SKU</div>
                <div className="p-3 luma-type-cap-12 text-luma-text-600">Цена</div>
                <div className="p-3 luma-type-cap-12 text-luma-text-600">Старая</div>
                <div className="p-3 luma-type-cap-12 text-luma-text-600">Остаток</div>
                <div className="p-3 luma-type-cap-12 text-luma-text-600">Штрихкод</div>
              </div>
              
              {variations.map((variation, index) => (
                <div key={variation.id} className={`grid grid-cols-8 gap-0 border-t border-luma-border-200 ${index % 2 === 0 ? 'bg-white' : 'bg-luma-bg-0'}`}>
                  <div className="p-3 flex items-center">
                    <button
                      onClick={() => toggleVariationSelection(variation.id)}
                      className="text-luma-primary-600"
                    >
                      {selectedVariations.includes(variation.id) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <div className="w-4 h-4 border border-luma-border-200 rounded"></div>
                      )}
                    </button>
                  </div>
                  <div className="p-3 flex items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${variation.color === 'Синий' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                      <span className="luma-type-body-14">{variation.color}</span>
                    </div>
                  </div>
                  <div className="p-3 luma-type-body-14">{variation.size}</div>
                  <div className="p-3 luma-type-body-14 text-luma-text-600">{variation.sku}</div>
                  <div className="p-3">
                    <input
                      type="text"
                      value={variation.price}
                      onChange={(e) => {
                        setVariations(prev => prev.map(v => 
                          v.id === variation.id ? { ...v, price: e.target.value } : v
                        ));
                      }}
                      className="w-full p-1 bg-transparent border-none luma-type-body-14 focus:outline-none focus:bg-white focus:border focus:border-luma-primary-600 rounded"
                    />
                  </div>
                  <div className="p-3">
                    <input
                      type="text"
                      value={variation.oldPrice}
                      onChange={(e) => {
                        setVariations(prev => prev.map(v => 
                          v.id === variation.id ? { ...v, oldPrice: e.target.value } : v
                        ));
                      }}
                      className="w-full p-1 bg-transparent border-none luma-type-body-14 text-luma-text-600 focus:outline-none focus:bg-white focus:border focus:border-luma-primary-600 rounded"
                    />
                  </div>
                  <div className="p-3">
                    <input
                      type="number"
                      value={variation.stock}
                      onChange={(e) => {
                        setVariations(prev => prev.map(v => 
                          v.id === variation.id ? { ...v, stock: parseInt(e.target.value) || 0 } : v
                        ));
                      }}
                      className="w-full p-1 bg-transparent border-none luma-type-body-14 focus:outline-none focus:bg-white focus:border focus:border-luma-primary-600 rounded"
                    />
                  </div>
                  <div className="p-3 luma-type-body-14 text-luma-text-600">{variation.barcode}</div>
                </div>
              ))}
            </div>

            {/* Add Variation */}
            <button className="w-full py-3 border-2 border-dashed border-luma-border-200 rounded-xl flex items-center justify-center gap-2 text-luma-text-600 hover:border-luma-primary-600 hover:text-luma-primary-600 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="luma-type-title-14">Добавить вариацию</span>
            </button>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="luma-type-body-14 text-luma-text-600">Секция "{sectionId}" в разработке</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Редактировать товар"
        onBack={onBack}
        rightIcons={[]}
        storeSelector={false}
      />

      <div className="pb-20">
        {/* Quality Tips */}
        <div className="px-4 py-4">
          <div className="space-y-2">
            {qualityTips.map((tip, index) => (
              <div key={index} className={`flex items-start gap-3 p-3 rounded-xl ${
                tip.type === 'warning' ? 'bg-orange-50' :
                tip.type === 'success' ? 'bg-green-50' : 'bg-blue-50'
              }`}>
                <AlertCircle className={`w-4 h-4 mt-0.5 ${
                  tip.type === 'warning' ? 'text-orange-600' :
                  tip.type === 'success' ? 'text-green-600' : 'text-blue-600'
                }`} />
                <p className={`luma-type-body-14 ${
                  tip.type === 'warning' ? 'text-orange-800' :
                  tip.type === 'success' ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sections Navigation */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-3 gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-colors ${
                    activeSection === section.id
                      ? 'bg-luma-primary-600 text-white border-luma-primary-600'
                      : 'bg-luma-surface-0 text-luma-text-600 border-luma-border-200'
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {section.completed && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="luma-type-micro-10">{section.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Section Content */}
        <div className="px-4 mb-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-6">
            {renderSection(activeSection)}
          </div>
        </div>

        {/* Version History Button */}
        <div className="px-4 mb-6">
          <button
            onClick={() => setShowHistory(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors"
          >
            <History className="w-5 h-5 text-luma-text-600" />
            <span className="luma-type-title-14 text-luma-text-600">История изменений</span>
          </button>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <div className="flex gap-3">
          <button
            onClick={() => onSave(true)}
            className="flex-1 py-4 bg-luma-bg-0 text-luma-text-900 rounded-2xl border border-luma-border-200 luma-type-title-14"
          >
            Сохранить черновик
          </button>
          <button
            onClick={() => onSave(false)}
            className="flex-1 py-4 bg-luma-primary-600 text-white rounded-2xl luma-type-title-14"
          >
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
}