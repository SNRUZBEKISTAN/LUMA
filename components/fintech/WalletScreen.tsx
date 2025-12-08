import React from 'react';
import { ArrowLeft, Wallet as WalletIcon, TrendingUp, Star, CreditCard, Plus, ArrowDownToLine, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface WalletScreenProps {
  onBack: () => void;
  onNavigate: (screen: 'addMoney' | 'withdraw' | 'bnpl' | 'creditBuilder' | 'spendingAnalytics' | 'rewardStore') => void;
}

export function WalletScreen({ onBack, onNavigate }: WalletScreenProps) {
  const [freezeEnabled, setFreezeEnabled] = React.useState(false);

  // Mock data - in real app, fetch from backend
  const walletData = {
    balance: 15430750,
    cashback: 55250,
    points: 750,
    userName: 'Alexey Volkov',
    currency: 'UZS'
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

  const paymentMethods = [
    { name: 'Uzum', logo: '💜' },
    { name: 'Click', logo: '🔵' },
    { name: 'Payme', logo: '💚' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] flex items-center justify-center">
            <span className="text-white font-bold">AV</span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
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
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 tracking-tight">
              {formatCurrency(walletData.balance)} <span className="text-2xl">UZS</span>
            </p>
            <p className="mt-4 text-base font-medium text-gray-600">{walletData.userName}</p>
          </div>
        </div>

        {/* Cashback & Points */}
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="p-4 rounded-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <p className="text-xs font-medium text-gray-500">Cashback</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatCurrency(walletData.cashback)} <span className="text-base font-semibold">UZS</span>
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('rewardStore')}
            className="p-4 rounded-2xl text-left"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <p className="text-xs font-medium text-gray-500">Luma Points</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {walletData.points} <span className="text-base font-semibold">pts</span>
            </p>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => onNavigate('addMoney')}
            className="h-14 bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90 rounded-2xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Money
          </Button>
          <Button
            onClick={() => onNavigate('withdraw')}
            variant="outline"
            className="h-14 border-2 rounded-2xl"
          >
            <ArrowDownToLine className="w-5 h-5 mr-2" />
            Withdraw
          </Button>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/80 transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <span className="text-xl">{tx.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{tx.title}</p>
                  <p className="text-sm text-gray-500">{tx.time}</p>
                </div>
                <p className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))} UZS
                </p>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => onNavigate('spendingAnalytics')}
            className="w-full py-3 text-center text-sm font-medium text-[#A260EF] hover:underline"
          >
            View All Transactions →
          </button>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
          <div className="grid grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <button
                key={method.name}
                className="flex flex-col items-center justify-center p-4 space-y-2 rounded-2xl"
                style={{
                  background: '#f4f6fa',
                  boxShadow: '6px 6px 12px #d4d7db, -6px -6px 12px #ffffff'
                }}
              >
                <span className="text-3xl">{method.logo}</span>
                <span className="text-xs font-medium text-gray-600">{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* BNPL Card */}
        <button
          onClick={() => onNavigate('bnpl')}
          className="w-full p-5 space-y-4 rounded-2xl text-left"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.9)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-base font-bold text-gray-900">Freeze and Pay Later</p>
              <p className="text-sm text-gray-500">Pause your BNPL plan</p>
            </div>
            <label 
              className="relative flex h-8 w-14 cursor-pointer items-center rounded-full p-0.5"
              style={{
                background: freezeEnabled ? '#3b82f6' : '#e5e7eb'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setFreezeEnabled(!freezeEnabled);
              }}
            >
              <div 
                className="h-7 w-7 rounded-full bg-white shadow-sm transition-transform duration-200"
                style={{
                  transform: freezeEnabled ? 'translateX(24px)' : 'translateX(0)'
                }}
              />
            </label>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between gap-6">
              <p className="text-base font-medium text-gray-900">Credit Limit</p>
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">6.25M</span> / 12.5M UZS
              </p>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-blue-500" style={{ width: '50%' }} />
            </div>
          </div>
        </button>

        {/* Rewards Vault */}
        <button
          onClick={() => onNavigate('rewardStore')}
          className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 w-full"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-bold text-gray-900">Rewards Vault</p>
            <p className="text-sm text-gray-600">3 unlockable bonuses available</p>
          </div>
          <ArrowLeft className="w-6 h-6 text-gray-500 rotate-180" />
        </button>
      </div>
    </div>
  );
}
