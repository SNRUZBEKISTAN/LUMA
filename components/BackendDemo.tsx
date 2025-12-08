import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Database, 
  ShoppingBag, 
  Store, 
  ShoppingCart, 
  Heart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Bell,
  Package
} from 'lucide-react';
import { seedBackend, isBackendSeeded } from '../utils/seedBackend';
import * as api from '../utils/api';
import { useBackend } from '../hooks/useBackend';
import { useNotifications } from '../hooks/useNotifications';
import { useCart } from '../hooks/useCart';
import { useOrders } from '../hooks/useOrders';

export function BackendDemo() {
  const [isSeeded, setIsSeeded] = React.useState(false);
  const [isSeeding, setIsSeeding] = React.useState(false);
  const [seedResult, setSeedResult] = React.useState<any>(null);
  const [stats, setStats] = React.useState({
    shops: 0,
    products: 0,
    isLoading: true
  });
  
  const { isAuthenticated, user } = useBackend();
  const { notifications, getUnreadCount } = useNotifications();
  const { getTotalItems } = useCart();
  const { orders } = useOrders();

  React.useEffect(() => {
    checkBackendStatus();
  }, []);

  async function checkBackendStatus() {
    try {
      const seeded = await isBackendSeeded();
      setIsSeeded(seeded);

      if (seeded) {
        // Fetch stats
        const shops = await api.getShops();
        const products = await api.getProducts();
        
        setStats({
          shops: shops.length,
          products: products.length,
          isLoading: false
        });
      } else {
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Failed to check backend status:', error);
      setStats(prev => ({ ...prev, isLoading: false }));
    }
  }

  async function handleSeed() {
    setIsSeeding(true);
    setSeedResult(null);
    
    try {
      const result = await seedBackend();
      setSeedResult(result);
      
      if (result.success) {
        setIsSeeded(true);
        await checkBackendStatus();
      }
    } catch (error) {
      setSeedResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] bg-clip-text text-transparent">
            Backend Functions
          </h1>
          <p className="text-muted-foreground">
            Ваш маркетплейс теперь подключен к Supabase backend
          </p>
        </div>

        {/* Status Card */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Статус Backend</h2>
              {stats.isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : isSeeded ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Готов
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Не инициализирован
                </Badge>
              )}
            </div>

            {isSeeded && !stats.isLoading && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <Store className="w-8 h-8 text-[#A260EF]" />
                  <div>
                    <div className="text-2xl font-bold text-[#A260EF]">
                      {stats.shops}
                    </div>
                    <div className="text-sm text-muted-foreground">Магазинов</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-50">
                  <ShoppingBag className="w-8 h-8 text-[#FF6D9D]" />
                  <div>
                    <div className="text-2xl font-bold text-[#FF6D9D]">
                      {stats.products}
                    </div>
                    <div className="text-sm text-muted-foreground">Товаров</div>
                  </div>
                </div>
              </div>
            )}

            {!isSeeded && !stats.isLoading && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Backend пуст. Нажмите кнопку ниже, чтобы загрузить тестовые данные 
                  (магазины и товары) из seedData.ts
                </p>
                
                <Button
                  onClick={handleSeed}
                  disabled={isSeeding}
                  className="w-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90"
                >
                  {isSeeding ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Инициализация...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Инициализировать Backend
                    </>
                  )}
                </Button>
              </div>
            )}

            {isSeeded && (
              <Button
                onClick={checkBackendStatus}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Обновить статистику
              </Button>
            )}
          </div>
        </Card>

        {/* Seed Result */}
        {seedResult && (
          <Card className={`p-4 ${seedResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-start gap-3">
              {seedResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${seedResult.success ? 'text-green-900' : 'text-red-900'}`}>
                  {seedResult.message}
                </p>
                {seedResult.error && (
                  <p className="text-sm text-red-700 mt-1">{seedResult.error}</p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Features Card */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Доступные Backend Функции</h2>
          
          <div className="space-y-3">
            <FeatureItem
              icon={<Store className="w-5 h-5" />}
              title="Управление магазинами"
              description="API для создания, обновления и получения информации о магазинах"
              enabled={isSeeded}
            />
            
            <FeatureItem
              icon={<ShoppingBag className="w-5 h-5" />}
              title="Управление товарами"
              description="CRUD операции для товаров с фильтрацией по магазину и категории"
              enabled={isSeeded}
            />
            
            <FeatureItem
              icon={<ShoppingCart className="w-5 h-5" />}
              title="Корзина и заказы"
              description="Система заказов с отслеживанием статуса и историей"
              enabled={isSeeded}
            />
            
            <FeatureItem
              icon={<Heart className="w-5 h-5" />}
              title="Избранное"
              description="Сохранение любимых товаров для каждого пользователя"
              enabled={isSeeded}
            />
            
            <FeatureItem
              icon={<Bell className="w-5 h-5" />}
              title="Уведомления"
              description="Система уведомлений о заказах и изменениях статусов"
              enabled={isSeeded}
            />
            
            <FeatureItem
              icon={<Package className="w-5 h-5" />}
              title="Отслеживание заказов"
              description="Полная история заказов с timeline событий"
              enabled={isSeeded}
            />
          </div>
        </Card>
        
        {/* Live Stats (if authenticated) */}
        {isAuthenticated && isSeeded && (
          <Card className="p-6 border-2 border-[#A260EF]/20">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#A260EF]" />
              Статус пользователя
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="text-3xl font-bold text-[#A260EF]">{getTotalItems()}</div>
                <div className="text-sm text-muted-foreground mt-1">В корзине</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-3xl font-bold text-blue-600">{orders.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Заказов</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100">
                <div className="text-3xl font-bold text-[#FF6D9D]">{getUnreadCount()}</div>
                <div className="text-sm text-muted-foreground mt-1">Новых уведомлений</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <div className="text-sm">
                <span className="text-muted-foreground">Авторизован как:</span>{' '}
                <span className="font-medium">{user?.email || user?.name || 'Пользователь'}</span>
              </div>
            </div>
          </Card>
        )}
        
        {/* Integration Info */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
          <h3 className="font-semibold mb-2">Готово к интеграции</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Backend функции доступны через <code className="px-2 py-1 bg-white rounded text-xs">utils/api.ts</code>. 
            Используйте хуки для интеграции:
          </p>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• <code className="px-2 py-0.5 bg-white rounded">useBackend()</code> - аутентификация и данные пользователя</p>
            <p>• <code className="px-2 py-0.5 bg-white rounded">useCart()</code> - управление корзиной покупок</p>
            <p>• <code className="px-2 py-0.5 bg-white rounded">useOrders()</code> - заказы и история покупок</p>
            <p>• <code className="px-2 py-0.5 bg-white rounded">useNotifications()</code> - система уведомлений</p>
          </div>
          
          <div className="mt-4 pt-4 border-t text-xs text-muted-foreground space-y-1">
            <p>✓ Аутентификация через Supabase Auth</p>
            <p>✓ Данные хранятся в KV Store</p>
            <p>✓ Все эндпоинты защищены авторизацией</p>
            <p>✓ Автоматические уведомления при заказах</p>
            <p>✓ Готово для production после настройки</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function FeatureItem({ 
  icon, 
  title, 
  description, 
  enabled 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  enabled: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
      <div className={`mt-0.5 ${enabled ? 'text-[#A260EF]' : 'text-gray-400'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{title}</h4>
          {enabled && (
            <Badge variant="secondary" className="text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Активно
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}