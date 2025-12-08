import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Copy, CheckCircle } from 'lucide-react';

interface GoogleSetupGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GoogleSetupGuide({ isOpen, onClose }: GoogleSetupGuideProps) {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. Создайте проект в Google Cloud Console",
      description: "Перейдите в Google Cloud Console и создайте новый проект",
      action: (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open('https://console.cloud.google.com/', '_blank')}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Открыть Console
        </Button>
      )
    },
    {
      title: "2. Включите Google Identity API",
      description: "В разделе 'APIs & Services' включите Google Identity Services API",
      action: null
    },
    {
      title: "3. Создайте OAuth 2.0 Client ID",
      description: "В 'Credentials' создайте новый OAuth 2.0 Client ID для веб-приложения",
      action: null
    },
    {
      title: "4. Настройте Authorized JavaScript origins",
      description: "Добавьте домены вашего приложения:",
      action: (
        <div className="space-y-2 mt-2">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded font-mono text-sm">
            <span className="flex-1">http://localhost:3000</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard('http://localhost:3000', 'localhost')}
            >
              {copied === 'localhost' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded font-mono text-sm">
            <span className="flex-1">https://yourdomain.com</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard('https://yourdomain.com', 'domain')}
            >
              {copied === 'domain' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      )
    },
    {
      title: "5. Скопируйте Client ID",
      description: "Скопируйте полученный Client ID и добавьте в .env файл:",
      action: (
        <div className="mt-2">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded font-mono text-sm">
            <span className="flex-1">REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard('REACT_APP_GOOGLE_CLIENT_ID=your_client_id_here', 'env')}
            >
              {copied === 'env' ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      )
    },
    {
      title: "6. Перезапустите приложение",
      description: "После добавления environment variable перезапустите development server",
      action: null
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-luma-text-900">
              Настройка Google OAuth
            </h2>
            <Button variant="ghost" onClick={onClose}>
              ✕
            </Button>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Примечание:</strong> Для работы Google OAuth в продакшене необходимо настроить 
                Client ID в Google Cloud Console. В демо-режиме кнопка будет показывать эмуляцию входа.
              </p>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-luma-text-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-luma-text-600 mb-3">
                  {step.description}
                </p>
                {step.action && step.action}
              </div>
            ))}

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                После настройки:
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Пользователи смогут входить через Google одним кликом</li>
                <li>• Автоматическое получение email и имени пользователя</li>
                <li>• Безопасная авторизация без паролей</li>
                <li>• Поддержка различных ролей (покупатель/продавец)</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button onClick={onClose} className="flex-1">
                Понятно
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open('https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Документация
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}