import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { NoAccessModal } from './NoAccessModal';
import { GoogleAuthProvider, useGoogleAuth } from './GoogleAuthProvider';
import { GoogleSetupGuide } from './GoogleSetupGuide';
import { Eye, EyeOff, User, Store, Settings } from 'lucide-react';
import { decodeGoogleJWT, createLumaUserFromGoogle, saveGoogleToken } from '../utils/googleAuth';

type UserRole = 'buyer' | 'seller';

interface AuthLiteProps {
  onAuthComplete: (userData: any) => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export function AuthLite({ onAuthComplete, onRegister, onForgotPassword }: AuthLiteProps) {
  const [selectedRole, setSelectedRole] = React.useState<UserRole>('buyer');
  const [credentials, setCredentials] = React.useState({
    sellerId: '',
    phoneOrEmail: '',
    password: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNoAccessModal, setShowNoAccessModal] = React.useState(false);
  const [showGoogleSetup, setShowGoogleSetup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Clear seller ID when switching to buyer
    if (role === 'buyer') {
      setCredentials(prev => ({ ...prev, sellerId: '' }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const userData = {
      id: 1,
      name: selectedRole === 'buyer' ? 'Покупатель' : 'Продавец',
      email: credentials.phoneOrEmail,
      role: selectedRole,
      sellerId: selectedRole === 'seller' ? credentials.sellerId : undefined
    };

    setIsLoading(false);
    onAuthComplete(userData);
  };

  const handleGoogleAuth = () => {
    // TODO: Replace with your actual Google OAuth Client ID from Google Cloud Console
    // Get it from: https://console.cloud.google.com/apis/credentials
    const clientId = "YOUR_GOOGLE_CLIENT_ID_HERE";
    
    if (!clientId || clientId === "YOUR_GOOGLE_CLIENT_ID_HERE") {
      setShowGoogleSetup(true);
      return;
    }

    if (window.google) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('Google One Tap не показан:', notification.getNotDisplayedReason());
          // Fallback: показываем демо авторизацию
          handleDemoGoogleAuth();
        }
      });
    } else {
      // Fallback: показываем демо авторизацию если Google SDK не загружен
      handleDemoGoogleAuth();
    }
  };

  const handleDemoGoogleAuth = () => {
    // Демо авторизация через Google
    const demoGoogleUser = {
      id: Date.now(),
      name: selectedRole === 'buyer' ? 'Покупатель Google' : 'Продавец Google',
      email: 'demo@gmail.com',
      picture: 'https://via.placeholder.com/100',
      role: selectedRole,
      authProvider: 'google',
      createdAt: new Date().toISOString()
    };
    
    console.log('Demo Google login:', demoGoogleUser);
    onAuthComplete(demoGoogleUser);
  };

  const onGoogleSuccess = (credentialResponse: any) => {
    console.log('Google authentication success:', credentialResponse);
    
    if (credentialResponse.credential) {
      // Декодируем JWT токен
      const googleUser = decodeGoogleJWT(credentialResponse.credential);
      
      if (googleUser) {
        // Сохраняем токен
        saveGoogleToken(credentialResponse.credential);
        
        // Создаем пользователя LUMA
        const lumaUser = createLumaUserFromGoogle(googleUser, selectedRole);
        
        console.log('LUMA user created:', lumaUser);
        onAuthComplete(lumaUser);
      } else {
        console.error('Failed to decode Google user data');
        alert('Ошибка при обработке данных Google. Попробуйте еще раз.');
      }
    }
  };

  const onGoogleError = () => {
    console.error('Google authentication failed');
    alert('Ошибка авторизации через Google. Попробуйте еще раз.');
  };

  const handleSocialLogin = (provider: 'apple' | 'google') => {
    if (provider === 'google') {
      handleGoogleAuth();
    } else {
      console.log(`Login with ${provider}`);
      // Mock Apple login
      const userData = {
        id: 1,
        name: selectedRole === 'buyer' ? 'Покупатель' : 'Продавец',
        email: `user@${provider}.com`,
        role: selectedRole
      };
      onAuthComplete(userData);
    }
  };

  const isFormValid = () => {
    const baseValid = credentials.phoneOrEmail.trim() && credentials.password.trim();
    if (selectedRole === 'seller') {
      return baseValid && credentials.sellerId.trim();
    }
    return baseValid;
  };

  return (
    <GoogleAuthProvider onSuccess={onGoogleSuccess} onError={onGoogleError}>
      <AuthLiteContent 
        selectedRole={selectedRole}
        credentials={credentials}
        showPassword={showPassword}
        showNoAccessModal={showNoAccessModal}
        showGoogleSetup={showGoogleSetup}
        isLoading={isLoading}
        handleRoleSelect={handleRoleSelect}
        handleInputChange={handleInputChange}
        setShowPassword={setShowPassword}
        handleLogin={handleLogin}
        handleSocialLogin={handleSocialLogin}
        onRegister={onRegister}
        onForgotPassword={onForgotPassword}
        setShowNoAccessModal={setShowNoAccessModal}
        setShowGoogleSetup={setShowGoogleSetup}
        isFormValid={isFormValid}
      />
    </GoogleAuthProvider>
  );
}

interface AuthLiteContentProps {
  selectedRole: UserRole;
  credentials: any;
  showPassword: boolean;
  showNoAccessModal: boolean;
  showGoogleSetup: boolean;
  isLoading: boolean;
  handleRoleSelect: (role: UserRole) => void;
  handleInputChange: (field: string, value: string) => void;
  setShowPassword: (show: boolean) => void;
  handleLogin: () => void;
  handleSocialLogin: (provider: 'apple' | 'google') => void;
  onRegister: () => void;
  onForgotPassword: () => void;
  setShowNoAccessModal: (show: boolean) => void;
  setShowGoogleSetup: (show: boolean) => void;
  isFormValid: () => boolean;
}

function AuthLiteContent({
  selectedRole,
  credentials,
  showPassword,
  showNoAccessModal,
  showGoogleSetup,
  isLoading,
  handleRoleSelect,
  handleInputChange,
  setShowPassword,
  handleLogin,
  handleSocialLogin,
  onRegister,
  onForgotPassword,
  setShowNoAccessModal,
  setShowGoogleSetup,
  isFormValid
}: AuthLiteContentProps) {
  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-luma-primary-600 mb-2">LUMA</h1>
          <p className="text-base text-luma-text-600">Добро пожаловать в LUMA</p>
        </div>

        {/* Role Picker */}
        <div className="mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => handleRoleSelect('buyer')}
              className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-luma border-2 transition-all ${
                selectedRole === 'buyer'
                  ? 'bg-luma-primary-600/10 border-luma-primary-600'
                  : 'bg-luma-surface-0 border-luma-border-200 hover:border-luma-primary-500'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedRole === 'buyer' ? 'bg-luma-primary-600' : 'bg-luma-primary-200'
              }`}>
                <User className={`w-6 h-6 ${
                  selectedRole === 'buyer' ? 'text-white' : 'text-luma-primary-600'
                }`} />
              </div>
              <span className={`font-medium ${
                selectedRole === 'buyer' ? 'text-luma-primary-600' : 'text-luma-text-900'
              }`}>
                Покупатель
              </span>
            </button>

            <button
              onClick={() => handleRoleSelect('seller')}
              className={`flex-1 flex flex-col items-center gap-3 p-6 rounded-luma border-2 transition-all ${
                selectedRole === 'seller'
                  ? 'bg-luma-primary-600/10 border-luma-primary-600'
                  : 'bg-luma-surface-0 border-luma-border-200 hover:border-luma-primary-500'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedRole === 'seller' ? 'bg-luma-primary-600' : 'bg-luma-primary-200'
              }`}>
                <Store className={`w-6 h-6 ${
                  selectedRole === 'seller' ? 'text-white' : 'text-luma-primary-600'
                }`} />
              </div>
              <span className={`font-medium ${
                selectedRole === 'seller' ? 'text-luma-primary-600' : 'text-luma-text-900'
              }`}>
                Продавец
              </span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <Card className="p-6 bg-luma-surface-0 rounded-luma shadow-luma-soft">
          <div className="space-y-4">
            {/* Seller ID Field (only for sellers) */}
            {selectedRole === 'seller' && (
              <div>
                <Input
                  type="text"
                  placeholder="Например: S-123456"
                  value={credentials.sellerId}
                  onChange={(e) => handleInputChange('sellerId', e.target.value)}
                  className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma"
                />
              </div>
            )}

            {/* Phone or Email Field */}
            <div>
              <Input
                type="text"
                placeholder="+998 __ ___ __ __  или  name@mail.com"
                value={credentials.phoneOrEmail}
                onChange={(e) => handleInputChange('phoneOrEmail', e.target.value)}
                className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••"
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-luma-surface-0 border-luma-border-200 focus:border-luma-primary-600 rounded-luma pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-luma-text-600 hover:text-luma-primary-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Social Login */}
            <div className="flex gap-3 justify-center mt-6">

              
              <div className="relative">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-12 h-12 bg-luma-surface-0 border border-luma-border-200 rounded-xl flex items-center justify-center hover:bg-luma-primary-200 transition-colors group"
                  title="Войти через Google"
                >
                  <svg 
                    className="w-5 h-5 transition-transform group-hover:scale-110" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      fill="#4285F4" 
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path 
                      fill="#34A853" 
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path 
                      fill="#FBBC05" 
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path 
                      fill="#EA4335" 
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </button>
                
                {/* Настройки Google OAuth - маленькая иконка */}
                <button
                  onClick={() => setShowGoogleSetup(true)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-luma-primary-600 rounded-full flex items-center justify-center text-white hover:bg-luma-primary-500 transition-colors"
                  title="Настроить Google OAuth"
                >
                  <Settings className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              disabled={!isFormValid() || isLoading}
              className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma h-12 text-base font-medium mt-6"
            >
              {isLoading ? 'Входим...' : 'Войти'}
            </Button>

            {/* Links Row */}
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={onForgotPassword}
                className="text-xs text-luma-text-600 hover:text-luma-primary-600 transition-colors"
              >
                Забыли пароль?
              </button>
              <button
                onClick={() => setShowNoAccessModal(true)}
                className="text-xs text-luma-text-600 hover:text-luma-primary-600 transition-colors"
              >
                Нет доступа к телефону/паролю
              </button>
            </div>
          </div>
        </Card>

        {/* Register Button */}
        <div className="text-center mt-8">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 text-luma-primary-600 hover:text-luma-primary-500 font-medium transition-colors"
          >
            <span className="text-lg">➕</span>
            Создать аккаунт
          </button>
        </div>
      </div>

      {/* No Access Modal */}
      <NoAccessModal
        isOpen={showNoAccessModal}
        onClose={() => setShowNoAccessModal(false)}
      />

      {/* Google Setup Guide */}
      <GoogleSetupGuide
        isOpen={showGoogleSetup}
        onClose={() => setShowGoogleSetup(false)}
      />
    </div>
  );
}