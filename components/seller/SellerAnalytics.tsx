import React, { useState } from 'react';
import { SellerAppBar } from './SellerAppBar';
import { SellerBottomNav } from './SellerBottomNav';
import { StoreSelector } from './StoreSelector';
import { KPICard } from './KPICard';
import { CompactChart } from './CompactChart';
import { SafeBottomSpacer } from './SafeBottomSpacer';
import { 
  Calendar, 
  Filter, 
  TrendingUp, 
  Eye, 
  Heart, 
  ShoppingCart, 
  ShoppingBag, 
  DollarSign, 
  Target, 
  Repeat,
  BarChart3,
  Users,
  MousePointer,
  Lightbulb,
  Play,
  ExternalLink,
  AlertCircle,
  Tag,
  Store
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, FunnelChart, Funnel, Cell } from 'recharts';

const mockKPIData = [
  { title: 'Охват', value: '45.2K', delta: { value: '+12%', type: 'up' as const }, icon: <Users className="w-4 h-4 text-blue-600" /> },
  { title: 'Просмотры', value: '128K', delta: { value: '+18%', type: 'up' as const }, icon: <Eye className="w-4 h-4 text-green-600" /> },
  { title: 'Лайки', value: '3.2K', delta: { value: '+5%', type: 'up' as const }, icon: <Heart className="w-4 h-4 text-red-500" /> },
  { title: 'В корзину', value: '892', delta: { value: '+15%', type: 'up' as const }, icon: <ShoppingCart className="w-4 h-4 text-orange-600" /> },
  { title: 'Заказы', value: '234', delta: { value: '+8%', type: 'up' as const }, icon: <ShoppingBag className="w-4 h-4 text-luma-primary-600" /> },
  { title: 'Выручка', value: '18.4', suffix: 'млн', delta: { value: '+22%', type: 'up' as const }, icon: <DollarSign className="w-4 h-4 text-green-600" /> },
  { title: 'Конверсия', value: '2.8', suffix: '%', delta: { value: '+0.3%', type: 'up' as const }, icon: <Target className="w-4 h-4 text-purple-600" /> },
  { title: 'Повторные', value: '12', suffix: '%', delta: { value: '-2%', type: 'down' as const }, icon: <Repeat className="w-4 h-4 text-blue-600" /> },
];

const revenueData = [
  { name: 'Пн', value: 1200000 },
  { name: 'Вт', value: 1900000 },
  { name: 'Ср', value: 800000 },
  { name: 'Чт', value: 1500000 },
  { name: 'Пт', value: 2200000 },
  { name: 'Сб', value: 2800000 },
  { name: 'Вс', value: 1800000 },
];

const engagementData = [
  { name: 'Пн', reach: 6000, views: 12000, likes: 450 },
  { name: 'Вт', reach: 8200, views: 15800, likes: 580 },
  { name: 'Ср', reach: 5100, views: 9800, likes: 320 },
  { name: 'Чт', reach: 7800, views: 14200, likes: 520 },
  { name: 'Пт', reach: 9200, views: 18500, likes: 680 },
  { name: 'Сб', reach: 11500, views: 22800, likes: 890 },
  { name: 'Вс', reach: 8800, views: 16200, likes: 620 },
];

const sourceData = [
  { name: 'Лента', value: 45 },
  { name: 'Поиск', value: 28 },
  { name: 'Магазин', value: 18 },
  { name: 'Промо', value: 9 },
];

const funnelData = [
  { name: 'Просмотры', value: 10000, fill: '#C77670' },
  { name: 'Клики', value: 3200, fill: '#DBA1A2' },
  { name: 'В корзину', value: 892, fill: '#E8B9B1' },
  { name: 'Покупки', value: 234, fill: '#8EDAC8' },
];

const topProducts = [
  { 
    id: '1', 
    name: 'Платье миди с принтом', 
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=200&fit=crop',
    revenue: '4.2 млн',
    views: '15.2K',
    isTop: true
  },
  { 
    id: '2', 
    name: 'Блузка шелковая белая', 
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop',
    revenue: '2.8 млн',
    views: '12.1K',
    isTop: false
  },
  { 
    id: '3', 
    name: 'Кроссовки белые базовые', 
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop',
    revenue: '2.1 млн',
    views: '8.9K',
    isTop: false
  },
];

const activeCampaigns = [
  {
    id: '1',
    name: 'Летняя коллекция 2024',
    status: 'active',
    objective: 'Покупки',
    budget: '500K',
    reach: '15.2K',
    clicks: '892',
    cpa: '2.1K'
  },
  {
    id: '2',
    name: 'Промо скидки 30%',
    status: 'active',
    objective: 'В корзину',
    budget: '300K',
    reach: '8.7K',
    clicks: '567',
    cpa: '890'
  },
];

const insights = [
  {
    type: 'success',
    title: 'Видео с тегом "платья" дают +18% к добавлениям в корзину',
    action: 'Добавить больше видео'
  },
  {
    type: 'warning',
    title: 'У товара "Блузка белая" мало фото — добавьте 2 изображения на белом фоне',
    action: 'Добавить фото'
  },
  {
    type: 'info',
    title: 'Клиенты из Ташкента покупают на 35% больше в выходные',
    action: 'Настроить график'
  },
];

const mockStores = [
  { id: '1', name: 'Urban', logo: '', status: 'active' as const, isActive: true },
  { id: '2', name: 'Chic', logo: '', status: 'active' as const },
  { id: '3', name: 'Nova', logo: '', status: 'pending' as const },
];

interface SellerAnalyticsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onStartPromo: (type: 'product' | 'store') => void;
}

export function SellerAnalytics({ 
  activeTab, 
  onTabChange, 
  onBack, 
  onNavigate,
  onStartPromo 
}: SellerAnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [chartType, setChartType] = useState<'revenue' | 'orders'>('revenue');
  const [selectedEngagement, setSelectedEngagement] = useState(['reach', 'views', 'likes']);
  const [topProductsView, setTopProductsView] = useState<'revenue' | 'views'>('revenue');
  const [showStoreSelector, setShowStoreSelector] = useState(false);

  const periods = [
    { id: '7', label: '7Д' },
    { id: '30', label: '30Д' },
    { id: '90', label: '90Д' },
    { id: 'custom', label: 'Календарь' },
  ];

  const toggleEngagementMetric = (metric: string) => {
    setSelectedEngagement(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case 'info':
        return <Lightbulb className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-luma-text-600" />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-luma-background">
      <SellerAppBar
        hasBack
        title="Аналитика"
        onBack={onBack}
        storeName="Urban"
        onStoreSelect={() => onNavigate('storeProfile')}
        rightIcons={['bell']}
        onBellClick={() => onNavigate('notifications')}
      />

      <div className="flex-1 overflow-y-auto safe-bottom">
        {/* Filter Bar */}
        <div className="px-4 py-4 bg-luma-surface-0 border-b border-luma-border-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex bg-luma-bg-0 rounded-xl p-1">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-3 py-1.5 rounded-lg luma-type-cap-12 transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-luma-primary-600 text-white'
                      : 'text-luma-text-600'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
            
            <button className="p-2 bg-luma-bg-0 rounded-xl border border-luma-border-200">
              <Filter className="w-4 h-4 text-luma-text-600" />
            </button>
            
            <button className="p-2 bg-luma-bg-0 rounded-xl border border-luma-border-200">
              <Calendar className="w-4 h-4 text-luma-text-600" />
            </button>
          </div>
          
          <p className="luma-type-body-14 text-luma-text-600">
            Данные за период с учетом выбранных фильтров
          </p>
        </div>

        {/* KPI Tiles */}
        <div className="p-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {mockKPIData.map((kpi, index) => (
              <div key={index} className="flex-shrink-0 w-44">
                <KPICard {...kpi} />
              </div>
            ))}
          </div>
        </div>

        {/* Promo CTA Section - Added directly under KPI tiles */}
        <div className="px-4 pb-6">
          <div className="flex gap-3">
            <button
              onClick={() => onStartPromo('product')}
              className="flex-1 flex items-center justify-center gap-2 h-11 bg-luma-primary-600 text-white rounded-xl luma-type-title-14 hover:bg-luma-primary-500 transition-colors"
            >
              <Tag className="w-5 h-5" />
              Промо товара
            </button>
            <button
              onClick={() => onStartPromo('store')}
              className="flex-1 flex items-center justify-center gap-2 h-11 bg-luma-surface-0 text-luma-primary-600 border border-luma-primary-600 rounded-xl luma-type-title-14 hover:bg-luma-primary-50 transition-colors"
            >
              <Store className="w-5 h-5" />
              Промо магазина
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="px-4 space-y-6">
          {/* Revenue/Orders Chart */}
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="luma-type-title-16 text-luma-text-900">Динамика</h3>
              <div className="flex bg-luma-bg-0 rounded-xl p-1">
                <button
                  onClick={() => setChartType('revenue')}
                  className={`px-3 py-1 rounded-lg luma-type-cap-12 transition-colors ${
                    chartType === 'revenue'
                      ? 'bg-luma-primary-600 text-white'
                      : 'text-luma-text-600'
                  }`}
                >
                  Выручка
                </button>
                <button
                  onClick={() => setChartType('orders')}
                  className={`px-3 py-1 rounded-lg luma-type-cap-12 transition-colors ${
                    chartType === 'orders'
                      ? 'bg-luma-primary-600 text-white'
                      : 'text-luma-text-600'
                  }`}
                >
                  Заказы
                </button>
              </div>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="var(--luma-primary-600)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--luma-primary-600)', strokeWidth: 0, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Chart */}
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="luma-type-title-16 text-luma-text-900">Вовлечение</h3>
              <div className="flex items-center gap-2">
                {[
                  { key: 'reach', label: 'Охват', color: '#C77670' },
                  { key: 'views', label: 'Просмотры', color: '#DBA1A2' },
                  { key: 'likes', label: 'Лайки', color: '#8EDAC8' },
                ].map((metric) => (
                  <button
                    key={metric.key}
                    onClick={() => toggleEngagementMetric(metric.key)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg luma-type-micro-10 transition-colors ${
                      selectedEngagement.includes(metric.key)
                        ? 'bg-luma-primary-200 text-luma-primary-600'
                        : 'text-luma-text-600'
                    }`}
                  >
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: metric.color }}
                    ></div>
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  {selectedEngagement.includes('reach') && (
                    <Line type="monotone" dataKey="reach" stroke="#C77670" strokeWidth={2} dot={false} />
                  )}
                  {selectedEngagement.includes('views') && (
                    <Line type="monotone" dataKey="views" stroke="#DBA1A2" strokeWidth={2} dot={false} />
                  )}
                  {selectedEngagement.includes('likes') && (
                    <Line type="monotone" dataKey="likes" stroke="#8EDAC8" strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sources Chart */}
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Источники трафика</h3>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Bar dataKey="value" fill="var(--luma-primary-600)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Funnel Chart */}
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Воронка конверсии</h3>
            
            <div className="space-y-2">
              {funnelData.map((step, index) => {
                const percentage = index === 0 ? 100 : Math.round((step.value / funnelData[0].value) * 100);
                const width = `${percentage}%`;
                
                return (
                  <div key={step.name} className="flex items-center gap-4">
                    <div className="w-20">
                      <span className="luma-type-body-14 text-luma-text-600">{step.name}</span>
                    </div>
                    <div className="flex-1 bg-luma-bg-0 rounded-full h-8 relative overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 flex items-center justify-center"
                        style={{ width, backgroundColor: step.fill }}
                      >
                        <span className="luma-type-cap-12 text-white">
                          {step.value.toLocaleString()} ({percentage}%)
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="px-4 py-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="luma-type-title-16 text-luma-text-900">ТОП-товары</h3>
              <div className="flex bg-luma-bg-0 rounded-xl p-1">
                <button
                  onClick={() => setTopProductsView('revenue')}
                  className={`px-3 py-1 rounded-lg luma-type-cap-12 transition-colors ${
                    topProductsView === 'revenue'
                      ? 'bg-luma-primary-600 text-white'
                      : 'text-luma-text-600'
                  }`}
                >
                  По выручке
                </button>
                <button
                  onClick={() => setTopProductsView('views')}
                  className={`px-3 py-1 rounded-lg luma-type-cap-12 transition-colors ${
                    topProductsView === 'views'
                      ? 'bg-luma-primary-600 text-white'
                      : 'text-luma-text-600'
                  }`}
                >
                  По просмотрам
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4 p-3 hover:bg-luma-bg-0 rounded-xl transition-colors">
                  <div className="flex items-center justify-center w-6 h-6">
                    {product.isTop ? (
                      <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">👑</span>
                      </div>
                    ) : (
                      <span className="luma-type-title-14 text-luma-text-600">#{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="w-12 h-12 bg-luma-bg-0 rounded-xl overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="luma-type-title-14 text-luma-text-900 truncate">{product.name}</h4>
                    <p className="luma-type-body-14 text-luma-text-600">
                      {topProductsView === 'revenue' ? product.revenue : `${product.views} просмотров`}
                    </p>
                  </div>
                  
                  <button className="p-2 hover:bg-luma-primary-200 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-luma-text-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="px-4 pb-6">
          <div className="bg-luma-surface-0 rounded-2xl border border-luma-border-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="luma-type-title-16 text-luma-text-900">Активные кампании</h3>
              <button 
                onClick={() => onNavigate('campaigns')}
                className="luma-type-title-14 text-luma-primary-600"
              >
                Смотреть все
              </button>
            </div>
            
            <div className="space-y-3">
              {activeCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 bg-luma-bg-0 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="luma-type-title-14 text-luma-text-900">{campaign.name}</h4>
                      <p className="luma-type-body-14 text-luma-text-600">{campaign.objective}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-lg luma-type-micro-10">
                      Активна
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="luma-type-micro-10 text-luma-text-600">БЮДЖЕТ</p>
                      <p className="luma-type-title-14 text-luma-text-900">{campaign.budget}</p>
                    </div>
                    <div className="text-center">
                      <p className="luma-type-micro-10 text-luma-text-600">ОХВАТ</p>
                      <p className="luma-type-title-14 text-luma-text-900">{campaign.reach}</p>
                    </div>
                    <div className="text-center">
                      <p className="luma-type-micro-10 text-luma-text-600">КЛИКИ</p>
                      <p className="luma-type-title-14 text-luma-text-900">{campaign.clicks}</p>
                    </div>
                    <div className="text-center">
                      <p className="luma-type-micro-10 text-luma-text-600">CPA</p>
                      <p className="luma-type-title-14 text-luma-text-900">{campaign.cpa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="px-4 pb-6">
          <h3 className="luma-type-title-16 text-luma-text-900 mb-4">Рекомендации</h3>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 rounded-2xl border ${
                insight.type === 'success' ? 'bg-green-50 border-green-200' :
                insight.type === 'warning' ? 'bg-orange-50 border-orange-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    insight.type === 'success' ? 'bg-green-100' :
                    insight.type === 'warning' ? 'bg-orange-100' :
                    'bg-blue-100'
                  }`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`luma-type-body-14 mb-2 ${
                      insight.type === 'success' ? 'text-green-800' :
                      insight.type === 'warning' ? 'text-orange-800' :
                      'text-blue-800'
                    }`}>
                      {insight.title}
                    </p>
                    <button className={`px-3 py-1.5 rounded-lg luma-type-cap-12 transition-colors ${
                      insight.type === 'success' ? 'bg-green-600 text-white hover:bg-green-500' :
                      insight.type === 'warning' ? 'bg-orange-600 text-white hover:bg-orange-500' :
                      'bg-blue-600 text-white hover:bg-blue-500'
                    }`}>
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safe Bottom Spacer */}
        <SafeBottomSpacer />
      </div>

      <SellerBottomNav activeTab={activeTab} onTabChange={onTabChange} />
      
      <StoreSelector
        isOpen={showStoreSelector}
        onClose={() => setShowStoreSelector(false)}
        stores={mockStores}
        onSelectStore={(id) => {
          console.log('Selected store:', id);
          setShowStoreSelector(false);
        }}
        onCreateStore={() => {
          setShowStoreSelector(false);
          onNavigate('createStore');
        }}
        onManageStores={() => {
          setShowStoreSelector(false);
          onNavigate('settings');
        }}
      />
    </div>
  );
}