import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface SortSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (sortOption: string) => void;
  currentSort?: string;
}

const sortOptions = [
  { id: 'popularity', name: 'По популярности', description: 'Самые покупаемые товары' },
  { id: 'newest', name: 'Сначала новинки', description: 'Последние поступления' },
  { id: 'price-asc', name: 'Цена: по возрастанию', description: 'От дешёвых к дорогим' },
  { id: 'price-desc', name: 'Цена: по убыванию', description: 'От дорогих к дешёвым' },
  { id: 'rating', name: 'Рейтинг', description: 'Высоко оценённые товары' }
];

export function SortSheet({ isOpen, onClose, onSortChange, currentSort = 'popularity' }: SortSheetProps) {
  const [selectedSort, setSelectedSort] = React.useState(currentSort);

  const handleApply = () => {
    onSortChange(selectedSort);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="relative w-full bg-luma-surface-0 rounded-t-luma-lg shadow-luma-floating animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-luma-border-200">
          <h2 className="text-lg font-semibold text-luma-text-900">Сортировка</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <X className="w-5 h-5 text-luma-text-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <RadioGroup value={selectedSort} onValueChange={setSelectedSort}>
            <div className="space-y-4">
              {sortOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedSort(option.id)}>
                    <Label htmlFor={option.id} className="text-base font-medium text-luma-text-900 cursor-pointer block">
                      {option.name}
                    </Label>
                    <p className="text-sm text-luma-text-600 mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-luma-border-200 bg-luma-surface-0">
          <Button
            onClick={handleApply}
            className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white"
          >
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
}