import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ProfileTemplate } from './ProfileTemplate';
import { Avatar } from './ui/avatar';
import { User, Camera } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfileEditScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function ProfileEditScreen({ onBack, onTabChange, activeTab }: ProfileEditScreenProps) {
  const [formData, setFormData] = React.useState({
    name: 'Тестовый пользователь',
    phone: '+998 90 123 45 67',
    email: 'user@test.com',
    gender: '',
    birthday: '',
    language: 'ru'
  });

  const [hasChanges, setHasChanges] = React.useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success('Сохранено');
    setHasChanges(false);
    onBack();
  };

  const handleChangePhone = () => {
    toast.info('Функция изменения номера будет доступна позже');
  };

  const handleVerifyEmail = () => {
    toast.info('Письмо с подтверждением отправлено на почту');
  };

  const handleChangeAvatar = () => {
    toast.info('Функция загрузки фото будет доступна позже');
  };

  return (
    <ProfileTemplate
      title="Редактировать профиль"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="list"
    >
      <div className="space-y-6">
        {/* Avatar Row */}
        <div className="flex items-center gap-4 p-4 bg-luma-surface-0 rounded-2xl border border-luma-border-200">
          <Avatar className="w-18 h-18 bg-luma-primary-200">
            <User className="w-10 h-10 text-luma-primary-600" />
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-luma-text-900">Фото профиля</h3>
            <p className="text-sm text-luma-text-600">Добавьте фотографию для персонализации</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleChangeAvatar}
            className="border-luma-primary-600 text-luma-primary-600 hover:bg-luma-primary-600 hover:text-white"
          >
            <Camera className="w-4 h-4 mr-2" />
            Изменить
          </Button>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-luma-text-900">
            Имя и фамилия
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="border-luma-border-200 focus:border-luma-primary-600"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-luma-text-900">
            Номер телефона
          </Label>
          <div className="flex gap-2">
            <Input
              id="phone"
              value={formData.phone}
              readOnly
              className="flex-1 border-luma-border-200 bg-luma-bg-0 text-luma-text-600"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleChangePhone}
              className="border-luma-primary-600 text-luma-primary-600 hover:bg-luma-primary-600 hover:text-white"
            >
              Изменить номер
            </Button>
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-luma-text-900">
            Email (необязательно)
          </Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="flex-1 border-luma-border-200 focus:border-luma-primary-600"
              placeholder="your@email.com"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleVerifyEmail}
              className="border-luma-success-600 text-luma-success-600 hover:bg-luma-success-600 hover:text-white"
            >
              Подтвердить
            </Button>
          </div>
        </div>

        {/* Gender Field */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-luma-text-900">
            Пол
          </Label>
          <div className="flex gap-2">
            {[
              { value: '', label: 'Не указывать' },
              { value: 'female', label: 'Ж' },
              { value: 'male', label: 'М' }
            ].map((option) => (
              <Button
                key={option.value}
                variant={formData.gender === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleInputChange('gender', option.value)}
                className={`flex-1 ${
                  formData.gender === option.value
                    ? 'bg-luma-primary-600 text-white hover:bg-luma-primary-500'
                    : 'border-luma-border-200 text-luma-text-900 hover:bg-luma-primary-200'
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Birthday Field */}
        <div className="space-y-2">
          <Label htmlFor="birthday" className="text-sm font-medium text-luma-text-900">
            Дата рождения (необязательно)
          </Label>
          <Input
            id="birthday"
            type="date"
            value={formData.birthday}
            onChange={(e) => handleInputChange('birthday', e.target.value)}
            className="border-luma-border-200 focus:border-luma-primary-600"
          />
        </div>

        {/* Language Field */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-luma-text-900">
            Язык интерфейса
          </Label>
          <Select 
            value={formData.language} 
            onValueChange={(value) => handleInputChange('language', value)}
          >
            <SelectTrigger className="border-luma-border-200 focus:border-luma-primary-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="uz">O'zbek</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Address Shortcut */}
        <Button
          variant="outline"
          className="w-full justify-between p-4 h-auto border-luma-border-200 hover:bg-luma-primary-200/50"
          onClick={() => toast.info('Переход к адресам доставки')}
        >
          <div className="text-left">
            <h3 className="font-medium text-luma-text-900">Адреса доставки</h3>
            <p className="text-sm text-luma-text-600">Управление адресами</p>
          </div>
          <span className="text-luma-primary-600">→</span>
        </Button>

        <Separator className="my-6" />

        {/* Privacy Note */}
        <div className="text-center">
          <p className="text-xs text-luma-text-600 leading-relaxed">
            Изменяя персональные данные, вы соглашаетесь с{' '}
            <span className="text-luma-primary-600 underline">политикой конфиденциальности</span>{' '}
            и <span className="text-luma-primary-600 underline">пользовательским соглашением</span>.
          </p>
        </div>
      </div>

      {/* Sticky Action Bar */}
      {hasChanges && (
        <div className="fixed bottom-20 left-4 right-4 z-40">
          <div className="bg-luma-surface-0 border border-luma-border-200 rounded-2xl p-4 shadow-luma-floating">
            <Button
              onClick={handleSave}
              className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white"
              size="lg"
            >
              Сохранить изменения
            </Button>
          </div>
        </div>
      )}
    </ProfileTemplate>
  );
}