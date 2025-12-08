import React from 'react';
import { ArrowLeft, TrendingUp, ShoppingBag } from 'lucide-react';

interface SpendingAnalyticsScreenProps {
  onBack: () => void;
}

export function SpendingAnalyticsScreen({ onBack }: SpendingAnalyticsScreenProps) {
  const [period, setPeriod] = React.useState<'week' | 'month' | '90days'>('month');

  const analyticsData = {
    week: { totalSpent: 1850000, cashback: 18500, points: 185 },
    month: { totalSpent: 7420000, cashback: 74200, points: 742 },
    '90days': { totalSpent: 22300000, cashback: 223000, points: 2230 }
  };

  const categories = [
    { category: 'Fashion', amount: 3200000, percentage: 43, color: '#A260EF' },
    { category: 'Beauty', amount: 2100000, percentage: 28, color: '#FF6D9D' },
    { category: 'Accessories', amount: 1520000, percentage: 21, color: '#60A5FA' },
    { category: 'Others', amount: 600000, percentage: 8, color: '#10B981' }
  ];

  const topPurchases = [
    { productName: 'Nike Air Max 270', amount: 2500000, date: 'Dec 20' },
    { productName: 'Zara Leather Jacket', amount: 1750000, date: 'Dec 18' },
    { productName: 'Dior Lipstick Set', amount: 850000, date: 'Dec 15' }
  ];

  const currentData = analyticsData[period];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white pb-20">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Period Selector */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/70 backdrop-blur-sm">
          {(['week', 'month', '90days'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-xl font-medium transition-all ${
                period === p
                  ? 'bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] text-white shadow-lg'
                  : 'text-gray-600'
              }`}
            >
              {p === 'week' ? 'Weekly' : p === 'month' ? 'Monthly' : '90 Days'}
            </button>
          ))}
        </div>

        {/* Total Spent Card */}
        <div
          className="p-6 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          <p className="text-sm font-medium text-gray-600">Total Spent</p>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">
            {currentData.totalSpent.toLocaleString()} <span className="text-2xl">UZS</span>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Cashback Earned</p>
              <p className="text-lg font-bold text-green-600">{currentData.cashback.toLocaleString()} UZS</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Points Earned</p>
              <p className="text-lg font-bold text-[#A260EF]">{currentData.points} LP</p>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Spending by Category</h2>
          
          {/* Pie Chart Visualization (simple bars) */}
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                    <span className="font-medium text-gray-900">{cat.category}</span>
                  </div>
                  <span className="font-bold text-gray-900">{cat.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${cat.percentage}%`, background: cat.color }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{cat.amount.toLocaleString()} UZS</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Purchases */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Top Purchases</h2>
          
          <div className="space-y-2">
            {topPurchases.map((purchase, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{purchase.productName}</p>
                  <p className="text-sm text-gray-500">{purchase.date}</p>
                </div>
                <p className="font-bold text-gray-900">{purchase.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
