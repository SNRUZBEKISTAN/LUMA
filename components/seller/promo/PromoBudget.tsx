import React, { useState } from 'react';
import { SellerAppBar } from '../SellerAppBar';
import { Calendar, TrendingUp, Eye, Users, ShoppingBag } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface PromoBudgetProps {
  onBack: () => void;
  onNext: (data: { period: { start: string; end: string; days: number }; dailyBudget: number; totalBudget: number }) => void;
  packageData: {
    price: number;
    objective: string;
  };
}

export function PromoBudget({ onBack, onNext, packageData }: PromoBudgetProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [dailyBudget, setDailyBudget] = useState(packageData.price / 7);
  const [budgetMode, setBudgetMode] = useState<'daily' | 'total'>('daily');

  const periodPresets = [
    { id: '3', label: '3 дня', days: 3 },
    { id: '7', label: '7 дней', days: 7 },
    { id: '14', label: '14 дней', days: 14 },
    { id: '30', label: '30 дней', days: 30 },
  ];

  const getDaysCount = () => {
    if (selectedPeriod === 'custom') {
      if (customStartDate && customEndDate) {
        const start = new Date(customStartDate);
        const end = new Date(customEndDate);
        return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      }
      return 7;
    }
    return parseInt(selectedPeriod);
  };

  const getTotalBudget = () => {
    return dailyBudget * getDaysCount();
  };

  const handleDailyBudgetChange = (value: number) => {
    setDailyBudget(value);
  };

  const handleTotalBudgetChange = (value: number) => {
    const days = getDaysCount();
    setDailyBudget(Math.round(value / days));
  };

  // Mock forecast data
  const forecastData = Array.from({ length: getDaysCount() }, (_, index) => ({
    day: index + 1,
    spend: dailyBudget * (0.8 + Math.random() * 0.4), // Simulate some variation
    reach: Math.round(dailyBudget * (0.15 + Math.random() * 0.1)),
    views: Math.round(dailyBudget * (0.4 + Math.random() * 0.2)),
    clicks: Math.round(dailyBudget * (0.02 + Math.random() * 0.01)),
  }));

  const getExpectedResults = () => {
    const total = getTotalBudget();
    const multiplier = total / 1000000; // Base multiplier per million

    switch (packageData.objective) {
      case 'reach':
        return {
          primary: Math.round(total * 0.15 * multiplier).toLocaleString(),
          label: 'Охват'
        };
      case 'views':
        return {
          primary: Math.round(total * 0.4 * multiplier).toLocaleString(),
          label: 'Просмотры'
        };
      case 'clicks':
        return {
          primary: Math.round(total * 0.02 * multiplier).toLocaleString(),
          label: 'Клики'
        };
      case 'cart':
        return {
          primary: Math.round(total * 0.008 * multiplier).toLocaleString(),
          label: 'В корзину'
        };
      case 'purchases':
        return {
          primary: Math.round(total * 0.003 * multiplier).toLocaleString(),
          label: 'Покупки'
        };
      default:
        return {
          primary: Math.round(total * 0.003 * multiplier).toLocaleString(),
          label: 'Покупки'
        };
    }
  };

  const handleNext = () => {
    const days = getDaysCount();
    let startDate = '';
    let endDate = '';

    if (selectedPeriod === 'custom') {
      startDate = customStartDate;
      endDate = customEndDate;
    } else {
      const today = new Date();
      startDate = today.toISOString().split('T')[0];
      const end = new Date(today);
      end.setDate(today.getDate() + days - 1);
      endDate = end.toISOString().split('T')[0];
    }

    onNext({
      period: { start: startDate, end: endDate, days },
      dailyBudget,
      totalBudget: getTotalBudget()
    });
  };

  const expectedResults = getExpectedResults();

  return (
    <div className="min-h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Бюджет и период"
        onBack={onBack}
        storeSelector={false}
      />

      <div className="px-4 py-6 pb-32">
        {/* Period Selection */}
        <div className="mb-8">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Период проведения</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {periodPresets.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`p-4 rounded-xl transition-colors ${
                  selectedPeriod === period.id
                    ? 'bg-luma-primary-600 text-white'
                    : 'bg-luma-surface-0 text-luma-text-900 border border-luma-border-200'
                }`}
              >
                <div className="text-center">
                  <p className="luma-type-title-14">{period.label}</p>
                  <p className={`luma-type-body-14 ${
                    selectedPeriod === period.id ? 'text-white' : 'text-luma-text-600'
                  }`}>
                    {Math.round(packageData.price / period.days).toLocaleString()}/день
                  </p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setSelectedPeriod('custom')}
            className={`w-full p-4 rounded-xl flex items-center justify-center gap-2 transition-colors ${
              selectedPeriod === 'custom'
                ? 'bg-luma-primary-600 text-white'
                : 'bg-luma-surface-0 text-luma-text-900 border border-luma-border-200'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="luma-type-title-14">Выбрать даты</span>
          </button>

          {selectedPeriod === 'custom' && (
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="luma-type-body-14 text-luma-text-600 block mb-2">Начало</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full p-3 border border-luma-border-200 rounded-xl bg-luma-surface-0"
                />
              </div>
              <div>
                <label className="luma-type-body-14 text-luma-text-600 block mb-2">Конец</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full p-3 border border-luma-border-200 rounded-xl bg-luma-surface-0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Budget Selection */}
        <div className="mb-8">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Бюджет</h3>
          
          <div className="flex bg-luma-bg-0 rounded-xl p-1 mb-4">
            <button
              onClick={() => setBudgetMode('daily')}
              className={`flex-1 py-2 rounded-lg luma-type-body-14 transition-colors ${
                budgetMode === 'daily'
                  ? 'bg-luma-primary-600 text-white'
                  : 'text-luma-text-600'
              }`}
            >
              Дневной
            </button>
            <button
              onClick={() => setBudgetMode('total')}
              className={`flex-1 py-2 rounded-lg luma-type-body-14 transition-colors ${
                budgetMode === 'total'
                  ? 'bg-luma-primary-600 text-white'
                  : 'text-luma-text-600'
              }`}
            >
              Общий
            </button>
          </div>

          {budgetMode === 'daily' ? (
            <div>
              <label className="luma-type-body-14 text-luma-text-600 block mb-2">
                Дневной бюджет (сум)
              </label>
              <input
                type="number"
                value={Math.round(dailyBudget)}
                onChange={(e) => handleDailyBudgetChange(parseInt(e.target.value) || 0)}
                className="w-full p-4 border border-luma-border-200 rounded-xl bg-luma-surface-0 luma-type-price-16"
                placeholder="Введите сумму"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="luma-type-body-14 text-luma-text-600">
                  Общий бюджет: {getTotalBudget().toLocaleString()}
                </span>
                <span className="luma-type-body-14 text-luma-text-600">
                  {getDaysCount()} дней
                </span>
              </div>
            </div>
          ) : (
            <div>
              <label className="luma-type-body-14 text-luma-text-600 block mb-2">
                Общий бюджет (сум)
              </label>
              <input
                type="number"
                value={Math.round(getTotalBudget())}
                onChange={(e) => handleTotalBudgetChange(parseInt(e.target.value) || 0)}
                className="w-full p-4 border border-luma-border-200 rounded-xl bg-luma-surface-0 luma-type-price-16"
                placeholder="Введите сумму"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="luma-type-body-14 text-luma-text-600">
                  Дневной бюджет: {Math.round(dailyBudget).toLocaleString()}
                </span>
                <span className="luma-type-body-14 text-luma-text-600">
                  {getDaysCount()} дней
                </span>
              </div>
            </div>
          )}

          <input
            type="range"
            min={packageData.price / 30}
            max={packageData.price * 2}
            value={dailyBudget}
            onChange={(e) => handleDailyBudgetChange(parseInt(e.target.value))}
            className="w-full mt-4"
          />
        </div>

        {/* Forecast Chart */}
        <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4 mb-6">
          <h4 className="luma-type-title-14 text-luma-text-900 mb-4">Прогноз расходов</h4>
          
          <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="spend"
                  stroke="var(--luma-primary-600)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <p className="luma-type-title-14 text-luma-text-900">
                {(getTotalBudget() * 0.15 / 1000).toFixed(1)}K
              </p>
              <p className="luma-type-micro-10 text-luma-text-600">ОХВАТ</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                <Eye className="w-4 h-4 text-green-600" />
              </div>
              <p className="luma-type-title-14 text-luma-text-900">
                {(getTotalBudget() * 0.4 / 1000).toFixed(1)}K
              </p>
              <p className="luma-type-micro-10 text-luma-text-600">ПРОСМОТРЫ</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <p className="luma-type-title-14 text-luma-text-900">
                {Math.round(getTotalBudget() * 0.02)}
              </p>
              <p className="luma-type-micro-10 text-luma-text-600">КЛИКИ</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                <ShoppingBag className="w-4 h-4 text-purple-600" />
              </div>
              <p className="luma-type-title-14 text-luma-text-900">{expectedResults.primary}</p>
              <p className="luma-type-micro-10 text-luma-text-600">{expectedResults.label.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="luma-type-body-14 text-blue-800">
            <strong>Прогноз ориентировочный, не гарантия результата.</strong> Система будет автоматически оптимизировать показы для достижения лучших результатов в рамках вашего бюджета.
          </p>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-luma-surface-0 border-t border-luma-border-200 p-4 safe-area-bottom">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="luma-type-body-14 text-luma-text-600">К оплате:</p>
            <p className="luma-type-price-16 text-luma-text-900">
              {getTotalBudget().toLocaleString()} сум
            </p>
          </div>
          <div className="text-right">
            <p className="luma-type-micro-10 text-luma-text-600">ОЖИДАЕМО</p>
            <p className="luma-type-title-14 text-luma-primary-600">
              {expectedResults.primary} {expectedResults.label}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleNext}
          className="w-full py-4 bg-luma-primary-600 text-white rounded-2xl luma-type-title-14 hover:bg-luma-primary-500 transition-colors"
        >
          Далее
        </button>
      </div>
    </div>
  );
}