import React from 'react';
import { Button } from './ui/button';
import { X, Copy, MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ShareOption {
  id: string;
  name: string;
  icon: string;
  action: (url: string, title: string) => void;
}

interface ShareSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function ShareSheetModal({ isOpen, onClose, url, title }: ShareSheetModalProps) {
  
  const shareOptions: ShareOption[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      action: (url, title) => {
        // Instagram doesn't support direct URL sharing, so copy to clipboard
        navigator.clipboard?.writeText(`${title} ${url}`);
        toast.success('Скопировано для Instagram');
        onClose();
      }
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '💬',
      action: (url, title) => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(telegramUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: '📱',
      action: (url, title) => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
        window.open(whatsappUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: '🔗',
      action: (url, title) => {
        navigator.clipboard?.writeText(url);
        toast.success('Ссылка скопирована');
        onClose();
      }
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: '💌',
      action: (url, title) => {
        const smsUrl = `sms:?body=${encodeURIComponent(`${title} ${url}`)}`;
        window.location.href = smsUrl;
        onClose();
      }
    },
    {
      id: 'more',
      name: 'More…',
      icon: '⋯',
      action: async (url, title) => {
        if (navigator.share) {
          try {
            await navigator.share({ title, url });
            onClose();
          } catch (error) {
            // User cancelled sharing
          }
        } else {
          toast.info('Функция недоступна в вашем браузере');
        }
      }
    }
  ];

  const handleOptionClick = (option: ShareOption) => {
    option.action(url, title);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
      
      {/* Sheet */}
      <div 
        className="relative bg-luma-surface-0 w-full max-w-md mx-4 mb-4 rounded-3xl p-4 animate-slide-up"
        style={{ 
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          animation: 'slideUp 220ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-luma-text-900">
            Поделиться
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full text-luma-text-600 hover:bg-luma-primary-200"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Share Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              className="flex flex-col items-center p-3 rounded-2xl hover:bg-luma-primary-200/20 transition-colors"
              onClick={() => handleOptionClick(option)}
            >
              <div className="w-12 h-12 bg-luma-primary-200/30 rounded-2xl flex items-center justify-center text-2xl mb-2">
                {option.icon}
              </div>
              <span className="text-xs text-luma-text-900 font-medium text-center">
                {option.name}
              </span>
            </button>
          ))}
        </div>

        {/* Cancel Button */}
        <Button
          variant="ghost"
          onClick={onClose}
          className="w-full h-12 bg-luma-bg-0 hover:bg-luma-primary-200/20 text-luma-text-900 font-medium"
        >
          Отмена
        </Button>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Hook for managing share functionality
export function useShareSheet() {
  const [shareState, setShareState] = React.useState<{
    isOpen: boolean;
    url?: string;
    title?: string;
  }>({
    isOpen: false
  });

  const openShare = React.useCallback((url: string, title: string) => {
    setShareState({
      isOpen: true,
      url,
      title
    });
  }, []);

  const closeShare = React.useCallback(() => {
    setShareState({
      isOpen: false
    });
  }, []);

  const share = React.useCallback(async (url: string, title: string) => {
    // Try native sharing first
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        // If user cancels or error occurs, fall back to modal
      }
    }
    
    // Fallback to custom share sheet
    openShare(url, title);
  }, [openShare]);

  return {
    shareState,
    openShare,
    closeShare,
    share
  };
}