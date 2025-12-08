import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ShoppingBag, Store } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'buyer' | 'seller') => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-luma-background px-6 py-8 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-luma-text-dark mb-2">
            Как вы хотите использовать LUMA?
          </h1>
        </div>

        <div className="space-y-6">
          <Card 
            className="p-6 border-2 border-transparent hover:border-luma-primary transition-all duration-200 cursor-pointer shadow-luma"
            onClick={() => onRoleSelect('buyer')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-luma-primary rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-luma-text-dark mb-1">
                  Покупатель
                </h3>
                <p className="text-sm text-luma-text-secondary">
                  Покупайте стильные вещи с доставкой до двери
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-2 border-transparent hover:border-luma-primary transition-all duration-200 cursor-pointer shadow-luma"
            onClick={() => onRoleSelect('seller')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-luma-primary rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-luma-text-dark mb-1">
                  Продавец
                </h3>
                <p className="text-sm text-luma-text-secondary">
                  Продавайте легко, без затрат на рекламу
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}