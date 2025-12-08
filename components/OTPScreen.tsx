import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowLeft } from 'lucide-react';

interface OTPScreenProps {
  phoneNumber: string;
  onBack: () => void;
  onVerify: (code: string) => void;
  onResendCode: () => void;
  onChangeNumber: () => void;
}

export function OTPScreen({ 
  phoneNumber, 
  onBack, 
  onVerify, 
  onResendCode, 
  onChangeNumber 
}: OTPScreenProps) {
  const [otp, setOtp] = React.useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = React.useState(false);
  const [countdown, setCountdown] = React.useState(45);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code?: string) => {
    const otpCode = code || otp.join('');
    if (otpCode.length !== 6) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onVerify(otpCode);
  };

  const handleResend = () => {
    setCountdown(45);
    setOtp(['', '', '', '', '', '']);
    onResendCode();
    inputRefs.current[0]?.focus();
  };

  const formatPhoneNumber = (phone: string) => {
    // Format +998901234567 to +998 90 123 45 67
    return phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
  };

  return (
    <div className="h-full flex flex-col bg-luma-bg-0">
      {/* Header */}
      <div className="flex-shrink-0 bg-luma-surface-0 px-4 pt-12 pb-4 shadow-luma-soft">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-luma-primary-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-luma-text-900" />
          </button>
          <h1 className="text-lg font-bold text-luma-text-900">
            Подтверждение номера
          </h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-luma-text-900 mb-2">
            Подтверждение номера
          </h2>
          <p className="text-luma-text-600">
            Мы отправили код на {formatPhoneNumber(phoneNumber)}
          </p>
        </div>

        <Card className="p-6 bg-luma-surface-0 rounded-luma shadow-luma-soft">
          <div className="space-y-6">
            {/* OTP Input */}
            <div>
              <div className="flex gap-3 justify-center mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-xl font-bold bg-luma-surface-0 border-2 border-luma-border-200 rounded-luma focus:border-luma-primary-600 focus:outline-none transition-colors"
                  />
                ))}
              </div>

              {/* Resend Code */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-luma-text-600">
                    Отправить код ещё раз (0:{countdown.toString().padStart(2, '0')})
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm text-luma-primary-600 hover:text-luma-primary-500 font-medium underline"
                  >
                    Отправить код ещё раз
                  </button>
                )}
              </div>
            </div>

            {/* Verify Button */}
            <Button
              onClick={() => handleVerify()}
              disabled={otp.some(digit => digit === '') || isLoading}
              className="w-full bg-luma-primary-600 hover:bg-luma-primary-500 text-white rounded-luma h-12"
            >
              {isLoading ? 'Подтверждаем...' : 'Подтвердить'}
            </Button>

            {/* Change Number */}
            <div className="text-center">
              <button
                onClick={onChangeNumber}
                className="text-sm text-luma-text-600 hover:text-luma-primary-600 transition-colors"
              >
                Изменить номер телефона
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}