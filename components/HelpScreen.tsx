import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { ProfileTemplate } from './ProfileTemplate';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  FileText, 
  ChevronDown,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface HelpScreenProps {
  onBack: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export function HelpScreen({ onBack, onTabChange, activeTab }: HelpScreenProps) {
  const [openFAQ, setOpenFAQ] = React.useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Как отследить мой заказ?',
      answer: 'Вы можете отследить заказ в разделе "Мои заказы". Для активных заказов доступна кнопка "Трек" с подробной информацией о статусе доставки.'
    },
    {
      id: '2',
      question: 'Как вернуть товар?',
      answer: 'Возврат товара возможен в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и без следов использования. Обратитесь в службу поддержки для оформления возврата.'
    },
    {
      id: '3',
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем карты Visa, Mastercard, UzCard, Humo. Также планируется поддержка Payme, Click и Uzum Pay. Наличными курьеру при получении.'
    },
    {
      id: '4',
      question: 'Сколько стоит доставка?',
      answer: 'Стоимость доставки зависит от района города. Обычно от 15 000 до 25 000 сум. При заказе от 500 000 сум доставка бесплатная.'
    },
    {
      id: '5',
      question: 'Как изменить адрес доставки?',
      answer: 'Адрес можно изменить в разделе "Адреса доставки" в настройках профиля. Также можно указать новый адрес при оформлении заказа.'
    },
    {
      id: '6',
      question: 'Что делать, если товар не подошел?',
      answer: 'Если товар не подошел по размеру или не понравился, вы можете вернуть его в течение 14 дней. Стоимость обратной доставки оплачивает покупатель.'
    }
  ];

  const contactOptions = [
    {
      id: 'telegram',
      title: 'Telegram',
      description: 'Быстрые ответы в мессенджере',
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      action: () => {
        window.open('https://t.me/luma_support', '_blank');
      }
    },
    {
      id: 'email',
      title: 'Email',
      description: 'support@luma.uz',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      action: () => {
        window.location.href = 'mailto:support@luma.uz';
      }
    },
    {
      id: 'phone',
      title: 'Телефон',
      description: '+998 78 150 00 50',
      icon: Phone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      action: () => {
        window.location.href = 'tel:+998781500050';
      }
    }
  ];

  const legalLinks = [
    {
      id: 'return-policy',
      title: 'Политика возврата',
      action: () => toast.info('Открытие политики возврата')
    },
    {
      id: 'terms',
      title: 'Пользовательское соглашение',
      action: () => toast.info('Открытие пользовательского соглашения')
    },
    {
      id: 'privacy',
      title: 'Политика конфиденциальности',
      action: () => toast.info('Открытие политики конфиденциальности')
    }
  ];

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <ProfileTemplate
      title="Помощь и поддержка"
      onBack={onBack}
      onTabChange={onTabChange}
      activeTab={activeTab}
      type="list"
    >
      <div className="space-y-6">
        {/* FAQ Section */}
        <div className="space-y-4">
          <h3 className="font-medium text-luma-text-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Часто задаваемые вопросы
          </h3>
          
          <div className="space-y-2">
            {faqItems.map((item) => (
              <Collapsible key={item.id}>
                <Card className="border-luma-border-200">
                  <CollapsibleTrigger
                    className="w-full p-4 text-left hover:bg-luma-primary-200/10 transition-colors"
                    onClick={() => toggleFAQ(item.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-luma-text-900 pr-4">
                        {item.question}
                      </h4>
                      <ChevronDown 
                        className={`w-5 h-5 text-luma-text-600 transition-transform ${
                          openFAQ === item.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm text-luma-text-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="space-y-4">
          <h3 className="font-medium text-luma-text-900">
            Связаться с нами
          </h3>
          
          <div className="space-y-3">
            {contactOptions.map((option) => {
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
                      <h4 className="font-medium text-luma-text-900">
                        {option.title}
                      </h4>
                      <p className="text-sm text-luma-text-600">
                        {option.description}
                      </p>
                    </div>
                    
                    <ExternalLink className="w-5 h-5 text-luma-text-600" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Legal Links */}
        <div className="space-y-4">
          <h3 className="font-medium text-luma-text-900">
            Документы
          </h3>
          
          <div className="space-y-2">
            {legalLinks.map((link) => (
              <Button
                key={link.id}
                variant="outline"
                className="w-full justify-between p-4 h-auto border-luma-border-200 hover:bg-luma-primary-200/50"
                onClick={link.action}
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-luma-text-600" />
                  <span className="text-luma-text-900">{link.title}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-luma-text-600" />
              </Button>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="bg-luma-bg-0 p-4 rounded-2xl border border-luma-border-200">
          <div className="text-center">
            <h4 className="font-medium text-luma-text-900 mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              luma
            </h4>
            <p className="text-sm text-luma-text-600 mb-1">
              Версия 1.0.0
            </p>
            <p className="text-xs text-luma-text-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              © 2025 luma. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </ProfileTemplate>
  );
}