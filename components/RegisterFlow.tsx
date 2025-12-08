import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { ArrowLeft, User, Store, Eye, EyeOff, Check } from 'lucide-react';

type UserRole = 'buyer' | 'seller';

interface RegisterFlowProps {
  onBack: () => void;
  onRegisterComplete: (userData: any) => void;
  onOTPRequired: (phoneNumber: string, role: UserRole, sellerId?: string) => void;
  currentStep?: number;
  onStepChange?: (step: number) => void;
}

export function RegisterFlow({ 
  onBack, 
  onRegisterComplete, 
  onOTPRequired, 
  currentStep: externalStep,
  onStepChange 
}: RegisterFlowProps) {
  const [currentStep, setCurrentStep] = React.useState(externalStep || 1);
  const [selectedRole, setSelectedRole] = React.useState<UserRole>('buyer');
  const [formData, setFormData] = React.useState({
    phone: '',
    sellerId: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Sync internal step with external step
  React.useEffect(() => {
    if (externalStep && externalStep !== currentStep) {
      setCurrentStep(externalStep);
    }
  }, [externalStep]);

  // Update external step when internal step changes
  const updateStep = (step: number) => {
    setCurrentStep(step);
    if (onStepChange) {
      onStepChange(step);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'buyer') {
      setFormData(prev => ({ ...prev, sellerId: '' }));
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: 0, text: 'Слишком короткий' };
    if (password.length < 8) return { strength: 33, text: 'Слабый' };
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) return { strength: 66, text: 'Средний' };
    return { strength: 100, text: 'Сильный' };
  };

  const handleStep1Submit = async () => {
    setIsLoading(true);
    // Simulate API call to send OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onOTPRequired(formData.phone, selectedRole, selectedRole === 'seller' ? formData.sellerId : undefined);
  };

  const handleStep2Submit = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    updateStep(3);
  };

  const handleStep3Submit = async () => {
    if (!formData.agreeToTerms) {
      alert('Необходимо согласиться с условиями');
      return;
    }

    setIsLoading(true);
    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = {
      id: Date.now(),
      name: selectedRole === 'buyer' ? 'Новый покупатель' : 'Новый продавец',
      phone: formData.phone,
      role: selectedRole,
      sellerId: selectedRole === 'seller' ? formData.sellerId : undefined
    };

    setIsLoading(false);
    onRegisterComplete(userData);
  };

  const isStep1Valid = () => {
    const phoneValid = formData.phone.length >= 13; // +998 format
    if (selectedRole === 'seller') {
      return phoneValid && formData.sellerId.trim();
    }
    return phoneValid;
  };

  const isStep2Valid = () => {
    return formData.password.length >= 6 && formData.confirmPassword.length >= 6;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Телефон и роль';
      case 2: return 'Создание пароля';
      case 3: return 'Согласие с условиями';
      default: return '';
    }
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          <h1 className="text-lg font-bold text-luma-text-900">
            Регистрация
          </h1>
          <div className="w-10" />
        </div>

        {/* Progress Stepper */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step < currentStep 
                    ? 'bg-luma-primary-600 text-white'
                    : step === currentStep
                      ? 'bg-luma-primary-600 text-white'
                      : 'bg-luma-border-200 text-luma-text-600'
                }`}>
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-luma-primary-600' : 'bg-luma-border-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="font-semibold text-luma-text-900">{getStepTitle()}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Role Picker */}
            <div>
              <h3 className="text-base font-semibold text-luma-text-900 mb-4">Выберите роль</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => handleRoleSelect('buyer')}
                  className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-luma border-2 transition-all ${
                    selectedRole === 'buyer'
                      ? 'bg-luma-primary-600/10 border-luma-primary-600'
                      : 'bg-luma-surface-0 border-luma-border-200'
                  }`}
                >
                  <User className={`w-8 h-8 ${
                    selectedRole === 'buyer' ? 'text-luma-primary-600' : 'text-luma-text-600'
                  }`} />
                  <span className={`font-medium ${
                    selectedRole === 'buyer' ? 'text-luma-primary-600' : 'text-luma-text-900'
                  }`}>
                    Покупатель
                  </span>
                </button>

                <button
                  onClick={() => handleRoleSelect('seller')}
                  className={`flex-1 flex flex-col items-center gap-3 p-4 rounded-luma border-2 transition-all ${
                    selectedRole === 'seller'
                      ? 'bg-luma-primary-600/10 border-luma-primary-600'
                      : 'bg-luma-surface-0 border-luma-border-200'
                  }`}
                >
                  <Store className={`w-8 h-8 ${
                    selectedRole === 'seller' ? 'text-luma-primary-600' : 'text-luma-text-600'
                  }`} />
                  <span className={`font-medium ${
                    selectedRole === 'seller' ? 'text-luma-primary-600' : 'text-luma-text-900'
                  }`}>
                    Продавец
                  </span>
                </button>
              </div>
            </div>

            <Card className="p-6 bg-luma-surface-0 rounded-luma shadow-luma-soft">
              <div className="space-y-4">
                {/* Seller ID (only for sellers) */}
                {selectedRole === 'seller' && (
                  <div>
                    <label className="block text-sm font-medium text-luma-text-900 mb-2">
                      ID продавца *
                    </label>
                    <Input
                      type="text"
                      placeholder="Например: S-123456"
                      value={formData.sellerId}
                      onChange={(e) => handleInputChange('sellerId', e.target.value)}
                      className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma"
                    />
                  </div>
                )}

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-luma-text-900 mb-2">
                    Номер телефона *
                  </label>
                  <Input
                    type="tel"
                    placeholder="+998 __ ___ __ __"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma"
                  />
                </div>

                <Button
                  onClick={handleStep1Submit}
                  disabled={!isStep1Valid() || isLoading}
                  className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma h-12"
                >
                  {isLoading ? 'Отправляем код...' : 'Получить код'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {currentStep === 2 && (
          <Card className="p-6 bg-luma-surface-0 rounded-luma shadow-luma-soft">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-luma-text-900 mb-2">
                  Пароль *
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Минимум 6 символов"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luma-text-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-luma-border-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${
                            passwordStrength.strength < 50 ? 'bg-luma-danger-600' :
                            passwordStrength.strength < 100 ? 'bg-yellow-500' : 'bg-luma-success-600'
                          }`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        />
                      </div>
                      <span className="text-xs text-luma-text-600">{passwordStrength.text}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-luma-text-900 mb-2">
                  Подтвердите пароль *
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luma-text-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-luma-danger-600 mt-1">Пароли не совпадают</p>
                )}
              </div>

              <Button
                onClick={handleStep2Submit}
                disabled={!isStep2Valid() || formData.password !== formData.confirmPassword}
                className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma h-12"
              >
                Продолжить
              </Button>
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="p-6 bg-luma-surface-0 rounded-luma shadow-luma-soft">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-luma-text-900 mb-4">
                  Согласие с условиями
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-luma-text-900 cursor-pointer">
                      Согласен с{' '}
                      <button className="text-luma-primary-600 underline">
                        Условиями использования
                      </button>
                      {' '}и{' '}
                      <button className="text-luma-primary-600 underline">
                        Политикой конфиденциальности
                      </button>
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked)}
                      className="mt-1"
                    />
                    <label htmlFor="marketing" className="text-sm text-luma-text-600 cursor-pointer">
                      Получать промо-рассылки и уведомления о скидках
                    </label>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStep3Submit}
                disabled={!formData.agreeToTerms || isLoading}
                className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma h-12"
              >
                {isLoading ? 'Создаём аккаунт...' : 'Создать аккаунт'}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}