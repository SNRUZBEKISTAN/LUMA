import React from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ProfileTemplate } from './ProfileTemplate';
import { toast } from 'sonner@2.0.3';

interface NotifSettingsScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function NotifSettingsScreen({ onBack, onTabChange, activeTab }: NotifSettingsScreenProps) {
  const [settings, setSettings] = React.useState({
    orders: true,
    delivery: true,
    inStock: false,
    promotions: true,
    system: true,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00'
  });

  const [hasChanges, setHasChanges] = React.useState(false);

  const handleToggle = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleTimeChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success('Настройки сохранены');
    setHasChanges(false);
  };

  const notificationTypes = [
    {
      id: 'orders',
      title: 'Заказы',
      description: 'Уведомления о статусе заказов',
      value: settings.orders
    },
    {
      id: 'delivery',
      title: 'Доставка',
      description: 'Информация о доставке товаров',
      value: settings.delivery
    },
    {
      id: 'inStock',
      title: 'В наличии',
      description: 'Когда товар из списка желаемого появится в наличии',
      value: settings.inStock
    },
    {
      id: 'promotions',
      title: 'Промо-акции',
      description: 'Скидки, распродажи и специальные предложения',
      value: settings.promotions
    },
    {
      id: 'system',
      title: 'Системные',
      description: 'Обновления приложения и важные сообщения',
      value: settings.system
    }
  ];

  return (
    <ProfileTemplate
      title="Уведомления"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="list"
    >
      <div className="space-y-6">
        {/* Notification Types */}
        <div className="space-y-4">
          {notificationTypes.map((notif) => (
            <div key={notif.id} className="flex items-start justify-between p-4 bg-luma-surface-0 rounded-2xl border border-luma-border-200">
              <div className="flex-1 pr-4">
                <Label htmlFor={notif.id} className="font-medium text-luma-text-900 cursor-pointer">
                  {notif.title}
                </Label>
                <p className="text-sm text-luma-text-600 mt-1">
                  {notif.description}
                </p>
              </div>
              <Switch
                id={notif.id}
                checked={notif.value}
                onCheckedChange={(checked) => handleToggle(notif.id, checked)}
              />
            </div>
          ))}
        </div>

        <Separator />

        {/* Quiet Hours */}
        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-luma-surface-0 rounded-2xl border border-luma-border-200">
            <div className="flex-1 pr-4">
              <Label htmlFor="quietHours" className="font-medium text-luma-text-900 cursor-pointer">
                Тихие часы
              </Label>
              <p className="text-sm text-luma-text-600 mt-1">
                Отключить уведомления в определенное время
              </p>
            </div>
            <Switch
              id="quietHours"
              checked={settings.quietHoursEnabled}
              onCheckedChange={(checked) => handleToggle('quietHoursEnabled', checked)}
            />
          </div>

          {settings.quietHoursEnabled && (
            <div className="space-y-3 p-4 bg-luma-bg-0 rounded-2xl border border-luma-border-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime" className="text-sm font-medium text-luma-text-900">
                    С
                  </Label>
                  <input
                    id="startTime"
                    type="time"
                    value={settings.quietHoursStart}
                    onChange={(e) => handleTimeChange('quietHoursStart', e.target.value)}
                    className="w-full mt-1 p-2 border border-luma-border-200 rounded-lg focus:outline-none focus:border-luma-primary-600"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="text-sm font-medium text-luma-text-900">
                    До
                  </Label>
                  <input
                    id="endTime"
                    type="time"
                    value={settings.quietHoursEnd}
                    onChange={(e) => handleTimeChange('quietHoursEnd', e.target.value)}
                    className="w-full mt-1 p-2 border border-luma-border-200 rounded-lg focus:outline-none focus:border-luma-primary-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        {hasChanges && (
          <div className="pt-4">
            <Button
              onClick={handleSave}
              className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white"
              size="lg"
            >
              Сохранить настройки
            </Button>
          </div>
        )}
      </div>
    </ProfileTemplate>
  );
}