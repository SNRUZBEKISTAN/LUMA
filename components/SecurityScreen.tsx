import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { ProfileTemplate } from './ProfileTemplate';
import { 
  Lock, 
  Shield, 
  Smartphone, 
  AlertTriangle, 
  Monitor,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SecurityScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function SecurityScreen({ onBack, onTabChange, activeTab }: SecurityScreenProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

  const handleChangePassword = () => {
    toast.info('Функция смены пароля будет доступна позже');
  };

  const handleToggle2FA = (enabled: boolean) => {
    setTwoFactorEnabled(enabled);
    if (enabled) {
      toast.success('Двухфакторная аутентификация включена');
    } else {
      toast.success('Двухфакторная аутентификация отключена');
    }
  };

  const handleViewSessions = () => {
    toast.info('Функция просмотра активных сессий будет doступна позже');
  };

  const handleSuspiciousActivity = () => {
    toast.info('Переход к справке по безопасности');
  };

  const securityOptions = [
    {
      id: 'password',
      title: 'Изменить пароль',
      description: 'Обновите свой пароль для входа в аккаунт',
      icon: Lock,
      color: 'text-luma-primary-600',
      bgColor: 'bg-luma-primary-200',
      action: handleChangePassword,
      showArrow: true
    },
    {
      id: 'sessions',
      title: 'Активные сессии',
      description: 'Управление устройствами, с которых выполнен вход',
      icon: Monitor,
      color: 'text-luma-success-600',
      bgColor: 'bg-luma-success-600/10',
      action: handleViewSessions,
      showArrow: true
    },
    {
      id: 'suspicious',
      title: 'Подозрительная активность',
      description: 'Как защитить аккаунт от взлома',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      action: handleSuspiciousActivity,
      showArrow: true
    }
  ];

  return (
    <ProfileTemplate
      title="Безопасность"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="list"
    >
      <div className="space-y-6">
        {/* Two-Factor Authentication */}
        <Card className="p-4 border-luma-border-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-luma-success-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-luma-success-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-luma-text-900">
                  Двухфакторная аутентификация
                </h3>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggle2FA}
                />
              </div>
              <p className="text-sm text-luma-text-600 mb-3">
                {twoFactorEnabled 
                  ? 'Дополнительная защита через SMS включена'
                  : 'Получайте SMS-код для входа в аккаунт'
                }
              </p>
              
              {twoFactorEnabled && (
                <div className="flex items-center gap-2 p-2 bg-luma-success-600/5 rounded-lg">
                  <Smartphone className="w-4 h-4 text-luma-success-600" />
                  <span className="text-sm text-luma-success-600 font-medium">
                    +998 90 ••• •• 67
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Security Options */}
        <div className="space-y-3">
          {securityOptions.map((option) => {
            const IconComponent = option.icon;
            
            return (
              <Card
                key={option.id}
                className="p-4 cursor-pointer hover:bg-luma-primary-200/10 transition-colors border-luma-border-200"
                onClick={option.action}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${option.bgColor} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${option.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-luma-text-900">
                      {option.title}
                    </h3>
                    <p className="text-sm text-luma-text-600">
                      {option.description}
                    </p>
                  </div>
                  
                  {option.showArrow && (
                    <ChevronRight className="w-5 h-5 text-luma-text-600" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Security Tips */}
        <div className="bg-luma-bg-0 p-4 rounded-2xl border border-luma-border-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-luma-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-luma-text-900 mb-2">
                Советы по безопасности
              </h4>
              <ul className="text-sm text-luma-text-600 space-y-1">
                <li>• Используйте сложный пароль из 8+ символов</li>
                <li>• Не передавайте никому данные для входа</li>
                <li>• Включите двухфакторную аутентификация</li>
                <li>• Регулярно проверяйте активные сессии</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Account Deactivation */}
        <Card className="p-4 border-luma-danger-600/20 bg-red-50">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-luma-danger-600/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-luma-danger-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-luma-text-900 mb-1">
                Деактивация аккаунта
              </h3>
              <p className="text-sm text-luma-text-600 mb-3">
                Временно отключить или удалить аккаунт
              </p>
              <Button
                variant="outline"
                size="sm"
                className="border-luma-danger-600 text-luma-danger-600 hover:bg-luma-danger-600 hover:text-white"
                onClick={() => toast.info('Функция деактивации будет доступна позже')}
              >
                Управление аккаунтом
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ProfileTemplate>
  );
}