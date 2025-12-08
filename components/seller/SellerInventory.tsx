import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { ProductRow } from './ProductRow';
import { SafeBottomSpacer } from './SafeBottomSpacer';
import { Search, Filter, ScanLine, Plus, CheckSquare, Square } from 'lucide-react';

const categoryTabs = [
  { id: 'all', label: 'Все' },
  { id: 'dresses', label: 'Платья' },
  { id: 'tops', label: 'Верх' },
  { id: 'shoes', label: 'Обувь' },
  { id: 'accessories', label: 'Аксессуары' },
];

const mockProducts = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop',
    name: 'Платье миди с принтом',
    price: '890 000',
    stock: 12,
    status: 'published' as const,
    sku: 'DR-001',
    category: 'dresses'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop',
    name: 'Блузка шелковая белая',
    price: '650 000',
    stock: 8,
    status: 'published' as const,
    sku: 'BL-002',
    category: 'tops'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop',
    name: 'Кроссовки белые базовые',
    price: '1 200 000',
    stock: 0,
    status: 'out_of_stock' as const,
    sku: 'SH-003',
    category: 'shoes'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=200&h=200&fit=crop',
    name: 'Сумка кожаная черная',
    price: '2 100 000',
    stock: 5,
    status: 'draft' as const,
    sku: 'BAG-004',
    category: 'accessories'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop',
    name: 'Джинсы slim fit синие',
    price: '780 000',
    stock: 15,
    status: 'hidden' as const,
    sku: 'JN-005',
    category: 'pants'
  },
];

interface SellerInventoryProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function SellerInventory({ activeTab, onTabChange, onBack, onNavigate }: SellerInventoryProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action ${action} for products:`, selectedProducts);
    setSelectedProducts([]);
    setIsSelectMode(false);
  };

  return (
    <div className="flex flex-col h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Товары"
        onBack={onBack}
        rightIcons={['bell']}
        onBellClick={() => onNavigate('notifications')}
        storeSelector={false}
      />
      
      <div className="flex-1 overflow-y-auto safe-bottom">
        {/* Category Tabs */}
        <div className="px-4 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-2xl luma-type-cap-12 whitespace-nowrap transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-luma-primary-600 text-white'
                    : 'bg-luma-surface-0 text-luma-text-600 border border-luma-border-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="px-4 mb-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luma-text-600" />
              <input
                type="text"
                placeholder="Поиск по названию или SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-luma-surface-0 rounded-2xl luma-type-body-14 border border-luma-border-200 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
              />
            </div>
            
            <button className="p-3 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors">
              <Filter className="w-5 h-5 text-luma-text-600" />
            </button>
            
            <button className="p-3 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors">
              <ScanLine className="w-5 h-5 text-luma-text-600" />
            </button>
          </div>
        </div>

        {/* Selection Mode Toggle */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                setSelectedProducts([]);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-luma-surface-0 rounded-2xl border border-luma-border-200 hover:bg-luma-bg-0 transition-colors"
            >
              <CheckSquare className="w-4 h-4 text-luma-text-600" />
              <span className="luma-type-title-14 text-luma-text-600">
                {isSelectMode ? 'Отменить выбор' : 'Выбрать'}
              </span>
            </button>

            {isSelectMode && selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="luma-type-body-14 text-luma-text-600">
                  Выбрано: {selectedProducts.length}
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('show')}
                    className="px-3 py-1.5 bg-luma-success-600 text-white rounded-lg luma-type-cap-12"
                  >
                    Показать
                  </button>
                  <button
                    onClick={() => handleBulkAction('hide')}
                    className="px-3 py-1.5 bg-orange-600 text-white rounded-lg luma-type-cap-12"
                  >
                    Скрыть
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1.5 bg-luma-danger-600 text-white rounded-lg luma-type-cap-12"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products List */}
        <div className="px-4 pb-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-luma-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-luma-primary-600" />
              </div>
              <h3 className="luma-type-title-16 text-luma-text-900 mb-2">Товары не найдены</h3>
              <p className="luma-type-body-14 text-luma-text-600 mb-4">
                Попробуйте изменить фильтры или поисковый запрос
              </p>
              <button
                onClick={() => onNavigate('addProduct')}
                className="px-6 py-3 bg-luma-primary-600 text-white rounded-2xl luma-type-title-14"
              >
                Добавить первый товар
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative">
                  {isSelectMode && (
                    <button
                      onClick={() => toggleProductSelection(product.id)}
                      className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10"
                    >
                      {selectedProducts.includes(product.id) ? (
                        <CheckSquare className="w-6 h-6 text-luma-primary-600" />
                      ) : (
                        <Square className="w-6 h-6 text-luma-text-600" />
                      )}
                    </button>
                  )}
                  
                  <ProductRow
                    {...product}
                    onEdit={() => onNavigate('editProduct')}
                    onToggleVisibility={() => console.log('Toggle visibility:', product.id)}
                    onMenu={() => console.log('Menu for:', product.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Safe Bottom Spacer */}
        <SafeBottomSpacer />
      </div>

      {/* Floating Add Button - Positioned above nav */}
      <button
        onClick={() => onNavigate('addProduct')}
        className="fab-above-nav w-14 h-14 bg-luma-primary-600 rounded-2xl flex items-center justify-center shadow-luma-floating hover:bg-luma-primary-500 transition-colors"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      <SellerBottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}