import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { NoAccessModal } from './NoAccessModal';
import { Eye, EyeOff, Apple } from 'lucide-react';

interface AuthScreenProps {
  userRole?: 'buyer' | 'seller' | null;
  onAuthComplete: (userData: any) => void;
  onRoleChange?: (role: 'buyer' | 'seller') => void;
}

export function AuthScreen({ userRole = 'buyer', onAuthComplete, onRoleChange }: AuthScreenProps) {
  const [activeTab, setActiveTab] = React.useState<'login' | 'register'>('login');
  const [currentRole, setCurrentRole] = React.useState<'buyer' | 'seller'>(userRole || 'buyer');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [useSmsCode, setUseSmsCode] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [showNoAccessModal, setShowNoAccessModal] = React.useState(false);

  const handleRoleSwitch = (role: 'buyer' | 'seller') => {
    setCurrentRole(role);
    onRoleChange?.(role);
  };

  const handleLogin = () => {
    // Mock authentication
    const userData = {
      id: 1,
      name: name || 'Пользователь',
      phone,
      role: currentRole
    };
    onAuthComplete(userData);
  };

  const handleRegister = () => {
    if (!agreedToTerms) {
      alert('Необходимо согласиться с условиями');
      return;
    }
    // Mock registration - would normally go to OTP screen
    const userData = {
      id: 1,
      name,
      phone,
      role: currentRole
    };
    onAuthComplete(userData);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const match = numbers.match(/^(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (match) {
      return [match[1], match[2], match[3], match[4], match[5]]
        .filter(Boolean)
        .join(' ')
        .trim();
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 12) {
      setPhone(formatted);
    }
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-6 pt-12 pb-4 shadow-luma-soft">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-luma-primary-600 tracking-wide mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            luma
          </h1>
          <p className="text-xs text-luma-text-600 font-medium">
            Добро пожаловать в luma
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Role Switch */}
        <div className="mb-6">
          <div className="bg-luma-surface-0 rounded-luma p-1 shadow-luma-soft">
            <div className="flex">
              <button
                onClick={() => handleRoleSwitch('buyer')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all font-semibold text-sm ${
                  currentRole === 'buyer'
                    ? 'bg-luma-primary-600 text-white shadow-luma-primary'
                    : 'bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white'
                }`}
              >
                Покупатель
              </button>
              <button
                onClick={() => handleRoleSwitch('seller')}
                className={`flex-1 py-3 px-4 rounded-lg transition-all font-semibold text-sm ${
                  currentRole === 'seller'
                    ? 'bg-luma-primary-600 text-white shadow-luma-primary'
                    : 'bg-luma-primary-200 text-luma-text-900 hover:bg-luma-primary-500 hover:text-white'
                }`}
              >
                Продавец
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex bg-luma-surface-0 rounded-luma p-1 shadow-luma-soft">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all font-medium text-sm ${
                activeTab === 'login'
                  ? 'bg-luma-primary-200 text-luma-text-900'
                  : 'text-luma-text-600 hover:text-luma-text-900'
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all font-medium text-sm ${
                activeTab === 'register'
                  ? 'bg-luma-primary-200 text-luma-text-900'
                  : 'text-luma-text-600 hover:text-luma-text-900'
              }`}
            >
              Регистрация
            </button>
          </div>
        </div>

        {activeTab === 'login' ? (
          /* Login Tab */
          <div className="space-y-6">
            {/* Login Form */}
            <Card className="p-6 bg-luma-surface-0 shadow-luma-soft border-luma-border-200">
              <h3 className="text-lg font-semibold text-luma-text-900 mb-4">
                Войти по телефону
              </h3>
              
              {/* Phone Input */}
              <div className="mb-4">
                <Label htmlFor="phone" className="text-sm font-medium text-luma-text-900 mb-2 block">
                  Телефон
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+998 __ ___ __ __"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base"
                />
              </div>

              {/* SMS Code Toggle */}
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="sms-toggle" className="text-xs text-luma-text-600">
                  Получить временный код по SMS
                </Label>
                <Switch
                  id="sms-toggle"
                  checked={useSmsCode}
                  onCheckedChange={setUseSmsCode}
                />
              </div>

              {/* Password or OTP */}
              {useSmsCode ? (
                <div className="mb-6">
                  <Label htmlFor="otp" className="text-sm font-medium text-luma-text-900 mb-2 block">
                    Код из SMS
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base tracking-widest text-center font-mono"
                    maxLength={6}
                  />
                </div>
              ) : (
                <div className="mb-6">
                  <Label htmlFor="password" className="text-sm font-medium text-luma-text-900 mb-2 block">
                    Пароль
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luma-text-600 hover:text-luma-text-900"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white font-semibold py-3 text-base"
              >
                Войти
              </Button>

              {/* Links */}
              <div className="flex justify-between mt-4">
                <button className="text-xs text-luma-primary-600 hover:text-luma-primary-500">
                  Забыли пароль?
                </button>
                <button 
                  onClick={() => setShowNoAccessModal(true)}
                  className="text-xs text-luma-primary-600 hover:text-luma-primary-500"
                >
                  Нет доступа к телефону/паролю
                </button>
              </div>
            </Card>

            {/* Divider */}
            <div className="flex items-center">
              <div className="flex-1 h-px bg-luma-border-200"></div>
              <span className="px-4 text-xs text-luma-text-600">или</span>
              <div className="flex-1 h-px bg-luma-border-200"></div>
            </div>

            {/* Social Login */}
            <Card className="p-6 bg-luma-surface-0 shadow-luma-soft border-luma-border-200">
              <h3 className="text-sm font-medium text-luma-text-900 mb-4">
                Социальный вход
              </h3>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 h-12 bg-luma-surface-0 border-luma-border-200 hover:border-luma-primary-500 hover:bg-luma-primary-200/20"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  Apple ID
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 bg-luma-surface-0 border-luma-border-200 hover:border-luma-primary-500 hover:bg-luma-primary-200/20"
                >
                  <span className="w-5 h-5 mr-2 font-bold text-luma-text-900">G</span>
                  Google
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          /* Register Tab */
          <div className="space-y-6">
            <Card className="p-6 bg-luma-surface-0 shadow-luma-soft border-luma-border-200">
              <h3 className="text-lg font-semibold text-luma-text-900 mb-4">
                Создать аккаунт
              </h3>
              
              {/* Phone Input */}
              <div className="mb-4">
                <Label htmlFor="reg-phone" className="text-sm font-medium text-luma-text-900 mb-2 block">
                  Телефон
                </Label>
                <Input
                  id="reg-phone"
                  type="tel"
                  placeholder="+998 __ ___ __ __"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base"
                />
              </div>

              {/* Name Input */}
              <div className="mb-4">
                <Label htmlFor="name" className="text-sm font-medium text-luma-text-900 mb-2 block">
                  Имя
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base"
                />
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <Label htmlFor="reg-password" className="text-sm font-medium text-luma-text-900 mb-2 block">
                  Пароль
                </Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Минимум 6 символов"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 text-base pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luma-text-600 hover:text-luma-text-900"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mb-6">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={setAgreedToTerms}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-xs text-luma-text-600 leading-relaxed">
                  Согласен с Условиями и Политикой
                </Label>
              </div>

              {/* Register Button */}
              <Button
                onClick={handleRegister}
                className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white font-semibold py-3 text-base mb-4"
              >
                Продолжить
              </Button>

              {/* Info Text */}
              <p className="text-xs text-luma-text-600 text-center mb-2">
                Мы отправим SMS с кодом подтверждения
              </p>

              {/* Switch to Login */}
              <button
                onClick={() => setActiveTab('login')}
                className="text-xs text-luma-primary-600 hover:text-luma-primary-500 block mx-auto"
              >
                У меня уже есть аккаунт
              </button>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pb-6">
          <p className="text-xs text-luma-text-600 text-center">
            Продолжая, вы соглашаетесь с условиями luma.
          </p>
        </div>
      </div>

      {/* No Access Modal */}
      <NoAccessModal
        isOpen={showNoAccessModal}
        onClose={() => setShowNoAccessModal(false)}
        onEmailRecovery={() => {
          setShowNoAccessModal(false);
          // Handle email recovery
        }}
        onContactSupport={() => {
          setShowNoAccessModal(false);
          // Handle support contact
        }}
        onSocialLogin={() => {
          setShowNoAccessModal(false);
          // Scroll to social buttons
        }}
      />
    </div>
  );
}