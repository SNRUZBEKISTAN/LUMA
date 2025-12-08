import React from 'react';
import { ArrowLeft, Wallet, TrendingUp, Star, Clock, PieChart, Gift, Plus, ArrowUpRight, ChevronRight, CreditCard, Sparkles, Trophy, Target, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { FloatingBottomNav } from '../FloatingBottomNav';

interface FintechDashboardProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  cartItemCount?: number;
}

export function FintechDashboard({ onBack, onTabChange, activeTab, cartItemCount = 0 }: FintechDashboardProps) {
  console.log('💰 FintechDashboard рендер с activeTab:', activeTab);
  const [freezeEnabled, setFreezeEnabled] = React.useState(false);

  // Mock data - in real app, fetch from backend
  const walletData = {
    balance: 15430750,
    cashback: 55250,
    points: 1250,
    userName: 'Alexey Volkov',
    currency: 'UZS'
  };

  const creditData = {
    score: 685,
    maxScore: 900,
    level: 'Good',
    improvement: '+15 this month'
  };

  const lumaPointsData = {
    points: 1250,
    level: 'Silver',
    nextLevel: 'Gold',
    pointsToNext: 750
  };

  const bnplData = {
    used: 6250000,
    limit: 12500000,
    activeLoans: 2,
    nextPayment: '15 Dec 2024'
  };

  const spendingData = {
    thisMonth: 7400000,
    lastMonth: 6200000,
    categories: [
      { name: 'Fashion', amount: 4200000, color: '#A260EF' },
      { name: 'Beauty', amount: 2100000, color: '#FF6D9D' },
      { name: 'Other', amount: 1100000, color: '#60D5EF' }
    ]
  };

  const rewardsData = {
    available: 3,
    featured: [
      { name: '500 UZS Off', points: 250, icon: '🎁' },
      { name: 'Free Delivery', points: 500, icon: '🚚' },
      { name: '10% Cashback', points: 750, icon: '⭐' }
    ]
  };

  const transactions = [
    {
      id: '1',
      type: 'purchase',
      title: 'Purchase at Zara',
      time: 'Today, 14:30',
      amount: -1124875,
      icon: '🛍️'
    },
    {
      id: '2',
      type: 'deposit',
      title: 'Deposit from Uzum Card',
      time: 'Yesterday, 09:15',
      amount: 2500000,
      icon: '💳'
    },
    {
      id: '3',
      type: 'cashback',
      title: 'Cashback Received',
      time: 'Oct 28, 18:00',
      amount: 56250,
      icon: '⭐'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const formatPercent = (value: number) => {
    return Math.round(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-lg px-6 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Финансы</h1>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] flex items-center justify-center">
            <span className="text-white font-bold">AV</span>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 space-y-6 mt-6" style={{ paddingBottom: '104px' }}>
        {/* Balance Card with Glassmorphism */}
        <div 
          className="relative p-6 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-200/50 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-fuchsia-200/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-[#A260EF]" />
              <p className="text-sm font-medium text-gray-600">Luma Wallet</p>
            </div>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 tracking-tight">
              {formatCurrency(walletData.balance)} <span className="text-2xl">UZS</span>
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{formatCurrency(walletData.cashback)} Cashback</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#A260EF]" />
                <span className="text-sm font-medium text-gray-700">{walletData.points} LP</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button
                className="bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90 text-white rounded-2xl h-12"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Money
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#A260EF]/20 hover:bg-[#A260EF]/5 text-[#A260EF] rounded-2xl h-12"
              >
                <ArrowUpRight className="w-5 h-5 mr-2" />
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        {/* Credit Builder Section */}
        <Card className="p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Credit Builder</h3>
                <p className="text-sm text-gray-500">Build your credit score</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-gray-900">{creditData.score}</span>
              <span className="text-sm text-gray-500">/ {creditData.maxScore}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                style={{ width: `${(creditData.score / creditData.maxScore) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {creditData.level}
              </Badge>
              <span className="text-sm font-medium text-green-600">{creditData.improvement}</span>
            </div>
          </div>
        </Card>

        {/* Luma Points Section */}
        <Card className="p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Luma Points</h3>
                <p className="text-sm text-gray-500">{lumaPointsData.level} Level</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{formatCurrency(lumaPointsData.points)}</span>
              <span className="text-sm text-gray-500">LP</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{lumaPointsData.pointsToNext} LP to {lumaPointsData.nextLevel}</span>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all"
                style={{ width: `${(lumaPointsData.points / (lumaPointsData.points + lumaPointsData.pointsToNext)) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* BNPL Section */}
        <Card className="p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Pay Later (BNPL)</h3>
                <p className="text-sm text-gray-500">{bnplData.activeLoans} active loans</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900">{formatCurrency(bnplData.used)}</span>
              <span className="text-sm text-gray-500">/ {formatCurrency(bnplData.limit)} UZS</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                style={{ width: `${(bnplData.used / bnplData.limit) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Next payment: {bnplData.nextPayment}</span>
              <Target className="w-4 h-4 text-blue-500" />
            </div>
          </div>
        </Card>

        {/* Spending Analytics Section */}
        <Card className="p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Spending Analytics</h3>
                <p className="text-sm text-gray-500">This month</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{formatCurrency(spendingData.thisMonth)}</span>
              <span className="text-sm text-gray-500">UZS</span>
            </div>

            {/* Category breakdown */}
            <div className="space-y-2">
              {spendingData.categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{category.name}</span>
                    <span className="font-medium text-gray-900">{formatCurrency(category.amount)} UZS</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${(category.amount / spendingData.thisMonth) * 100}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <span className="text-sm text-gray-600">vs. Last month</span>
              <span className="text-sm font-medium text-green-600">
                +{formatPercent(((spendingData.thisMonth - spendingData.lastMonth) / spendingData.lastMonth) * 100)}%
              </span>
            </div>
          </div>
        </Card>

        {/* Reward Store Section */}
        <Card className="p-5 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center">
                <Gift className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Reward Store</h3>
                <p className="text-sm text-gray-500">{rewardsData.available} rewards available</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-3">
            {rewardsData.featured.map((reward, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{reward.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{reward.name}</p>
                    <p className="text-sm text-gray-500">{reward.points} LP</p>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-yellow-500" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Transactions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-bold text-gray-900">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-[#A260EF]">
              View All
            </Button>
          </div>

          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{transaction.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{transaction.title}</p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                  <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))} UZS
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
        cartItemCount={cartItemCount}
      />
    </div>
  );
}