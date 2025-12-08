import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Plus, Package, MessageCircle, DollarSign, TrendingUp, Clock } from 'lucide-react';

interface SellerHomeProps {
  userName: string;
  onAddProduct: () => void;
  onViewOrders: () => void;
  onOpenChat: () => void;
  onWithdraw: () => void;
}

export function SellerHome({ 
  userName, 
  onAddProduct, 
  onViewOrders, 
  onOpenChat, 
  onWithdraw 
}: SellerHomeProps) {
  const [balance] = React.useState(150000);
  const [todayOrders] = React.useState(5);
  const [todayRevenue] = React.useState(320000);

  return (
    <div className="min-h-screen bg-luma-background">
      {/* Header */}
      <div className="bg-white border-b border-luma-primary/10 px-6 py-6">
        <h1 className="text-xl font-semibold text-luma-primary mb-2">LUMA</h1>
        <h2 className="text-lg text-luma-text-dark">
          Добро пожаловать, {userName}
        </h2>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Balance Card */}
        <Card className="p-6 gradient-luma text-white rounded-2xl shadow-luma">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Ваш баланс</p>
              <h3 className="text-2xl font-bold">
                {balance.toLocaleString()} сум
              </h3>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <Button 
            onClick={onWithdraw}
            className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-xl"
            variant="outline"
          >
            Вывести средства
          </Button>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={onAddProduct}
            className="h-20 bg-luma-primary hover:bg-luma-primary/90 text-white rounded-xl shadow-luma flex flex-col items-center justify-center space-y-2"
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm">Добавить товар</span>
          </Button>
          
          <Button
            onClick={onViewOrders}
            className="h-20 bg-white hover:bg-luma-secondary/20 text-luma-text-dark border border-luma-primary/20 rounded-xl shadow-luma flex flex-col items-center justify-center space-y-2"
            variant="outline"
          >
            <Package className="w-6 h-6" />
            <span className="text-sm">Заказы</span>
          </Button>
          
          <Button
            onClick={onOpenChat}
            className="h-20 bg-white hover:bg-luma-secondary/20 text-luma-text-dark border border-luma-primary/20 rounded-xl shadow-luma flex flex-col items-center justify-center space-y-2"
            variant="outline"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-sm">Чаты</span>
          </Button>
          
          <Button
            className="h-20 bg-white hover:bg-luma-secondary/20 text-luma-text-dark border border-luma-primary/20 rounded-xl shadow-luma flex flex-col items-center justify-center space-y-2"
            variant="outline"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm">Аналитика</span>
          </Button>
        </div>

        {/* Today's Statistics */}
        <div>
          <h3 className="text-lg font-semibold text-luma-text-dark mb-4">Статистика дня</h3>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 rounded-xl shadow-luma">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-luma-secondary rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-luma-primary" />
                </div>
                <div>
                  <p className="text-xs text-luma-text-secondary">Заказов сегодня</p>
                  <p className="text-lg font-semibold text-luma-text-dark">{todayOrders}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 rounded-xl shadow-luma">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-luma-secondary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-luma-primary" />
                </div>
                <div>
                  <p className="text-xs text-luma-text-secondary">Выручка</p>
                  <p className="text-lg font-semibold text-luma-text-dark">
                    {todayRevenue.toLocaleString()} сум
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-luma-text-dark mb-4">Последние действия</h3>
          <div className="space-y-3">
            <Card className="p-4 rounded-xl shadow-luma">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-luma-text-dark">Новый заказ #1234</p>
                  <p className="text-xs text-luma-text-secondary">2 мин назад</p>
                </div>
                <span className="text-sm font-semibold text-luma-success">+25 000 сум</span>
              </div>
            </Card>
            
            <Card className="p-4 rounded-xl shadow-luma">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-luma-text-dark">Товар добавлен в каталог</p>
                  <p className="text-xs text-luma-text-secondary">1 час назад</p>
                </div>
                <span className="text-xs text-luma-text-secondary">Активно</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}