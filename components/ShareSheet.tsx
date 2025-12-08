import React from 'react';
import { Button } from './ui/button';
import { 
  MessageCircle, 
  Copy, 
  Share2, 
  MoreHorizontal,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ShareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

interface ShareOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  action: (url: string, title: string) => void;
}

export function ShareSheet({ isOpen, onClose, url, title }: ShareSheetProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Ссылка скопирована');
      onClose();
    } catch (err) {
      toast.error('Не удалось скопировать ссылку');
    }
  };

  const shareOptions: ShareOption[] = [
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '📱',
      color: 'bg-blue-500',
      action: (url, title) => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        onClose();
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '💬',
      color: 'bg-green-500',
      action: (url, title) => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
        onClose();
      }
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      color: 'bg-pink-500',
      action: (url, title) => {
        // Instagram doesn't support direct sharing, copy to clipboard instead
        copyToClipboard(`${title} ${url}`);
        toast('Скопировано для Instagram');
      }
    },
    {
      id: 'copy',
      name: 'Копировать',
      icon: <Copy className="w-6 h-6" />,
      color: 'bg-luma-text-600',
      action: (url) => {
        copyToClipboard(url);
      }
    },
    {
      id: 'messages',
      name: 'Сообщения',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-blue-600',
      action: (url, title) => {
        window.open(`sms:?body=${encodeURIComponent(`${title} ${url}`)}`, '_blank');
        onClose();
      }
    },
    {
      id: 'more',
      name: 'Ещё',
      icon: <MoreHorizontal className="w-6 h-6" />,
      color: 'bg-luma-text-600',
      action: async (url, title) => {
        if (navigator.share) {
          try {
            await navigator.share({ title, url });
            onClose();
          } catch (err) {
            // User cancelled sharing
          }
        } else {
          toast('Функция недоступна в этом браузере');
        }
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom sheet */}
      <div className="relative w-full bg-luma-surface-0 rounded-t-3xl p-4 animate-slide-up">
        {/* Handle */}
        <div className="w-10 h-1 bg-luma-border-200 rounded-full mx-auto mb-6" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-luma-text-900">Поделиться</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-luma-text-600 hover:bg-luma-primary-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Share options grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => option.action(url, title)}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-luma-primary-200/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center text-white`}>
                {typeof option.icon === 'string' ? (
                  <span className="text-xl">{option.icon}</span>
                ) : (
                  option.icon
                )}
              </div>
              <span className="text-sm text-luma-text-900 font-medium">
                {option.name}
              </span>
            </button>
          ))}
        </div>
        
        {/* Cancel button */}
        <Button
          variant="outline"
          className="w-full border-luma-border-200 text-luma-text-900 hover:bg-luma-primary-200/50"
          onClick={onClose}
        >
          Отмена
        </Button>
        
        {/* Safe area padding */}
        <div className="h-4 safe-area-bottom" />
      </div>
    </div>
  );
}

// Hook for sharing functionality
export function useShare() {
  const [shareData, setShareData] = React.useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: '',
    title: ''
  });

  const shareProduct = async (url: string, title: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // User cancelled or share failed, show in-app sheet
        setShareData({ isOpen: true, url, title });
      }
    } else {
      // No native sharing, show in-app sheet
      setShareData({ isOpen: true, url, title });
    }
  };

  const closeShare = () => {
    setShareData({ isOpen: false, url: '', title: '' });
  };

  return {
    shareData,
    shareProduct,
    closeShare
  };
}