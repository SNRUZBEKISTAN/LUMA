import React, { useState } from 'react';
import { Search, Plus, ChevronRight, MoreVertical } from 'lucide-react';
import { StatusChip } from './StatusChip';

interface Store {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'pending' | 'suspended';
  isActive?: boolean;
}

interface StoreSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  stores: Store[];
  onSelectStore: (storeId: string) => void;
  onCreateStore: () => void;
  onManageStores: () => void;
}

export function StoreSelector({
  isOpen,
  onClose,
  stores,
  onSelectStore,
  onCreateStore,
  onManageStores
}: StoreSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-luma-surface-0 rounded-t-3xl animate-slide-up max-h-[80vh] flex flex-col">
        {/* Drag Indicator */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-luma-border-200 rounded-full"></div>
        </div>
        
        {/* Header */}
        <div className="px-6 pb-4">
          <h2 className="luma-type-title-16 text-luma-text-900 mb-4">Магазины</h2>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-luma-text-600" />
            <input
              type="text"
              placeholder="Найти магазин..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-luma-bg-0 rounded-2xl luma-type-body-14 border border-luma-border-200 focus:outline-none focus:ring-2 focus:ring-luma-primary-600 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Store List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-3">
            {filteredStores.map((store) => (
              <div key={store.id} className="flex items-center gap-3 p-4 bg-luma-bg-0 rounded-2xl">
                {/* Store Logo */}
                <div className="relative">
                  <div className="w-8 h-8 bg-luma-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white luma-type-cap-12">{store.name[0]}</span>
                  </div>
                  {store.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-luma-success-600 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                {/* Store Info */}
                <div className="flex-1">
                  <h3 className="luma-type-title-14 text-luma-text-900">{store.name}</h3>
                  <StatusChip 
                    status={store.status} 
                    label={store.status === 'active' ? 'Активен' : store.status === 'pending' ? 'На модерации' : 'Приостановлен'}
                    size="sm"
                  />
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectStore(store.id)}
                    className="px-4 py-2 bg-luma-primary-600 text-white rounded-xl luma-type-cap-12 hover:bg-luma-primary-500 transition-colors"
                  >
                    Перейти
                  </button>
                  
                  <button className="p-2 hover:bg-luma-surface-0 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-luma-text-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Create Store Button */}
          <button
            onClick={onCreateStore}
            className="w-full mt-4 flex items-center justify-center gap-2 p-4 bg-luma-primary-600 text-white rounded-2xl hover:bg-luma-primary-500 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="luma-type-title-14">Создать магазин</span>
          </button>
          
          {/* Manage Stores Link */}
          <button
            onClick={onManageStores}
            className="w-full mt-3 flex items-center justify-center gap-2 p-3 text-luma-primary-600 hover:text-luma-primary-500 transition-colors"
          >
            <span className="luma-type-title-14">Управление магазинами</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}