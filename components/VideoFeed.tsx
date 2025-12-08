import React from 'react';
import { Heart, ShoppingCart, Share, Play } from 'lucide-react';
import { Product } from '../types/app';

interface VideoItem {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  product: {
    id: string;
    name: string;
    price: number;
    storeName: string;
    storeAvatar: string;
    image: string;
    rating: number;
    ordersCount: number;
  };
  likes: number;
  isLiked: boolean;
  description: string;
  duration: number; // в секундах
}

interface VideoFeedProps {
  products: Product[];
  onOpenProduct: (id: string) => void;
  onAddToCart: (id: string) => void;
}

// Функция для генерации видео данных из продуктов
const generateVideoDataFromProducts = (products: Product[]): VideoItem[] => {
  const descriptions = [
    'Отличное качество и стиль! Идеально сочетается с любыми нарядами ✨',
    'Классика, которая никогда не выйдет из моды! Комфорт на весь день 💙',
    'Изысканность в каждой детали. Идеально для особых случаев 👑',
    'Аксессуар, который дополнит любой образ! Качественные материалы ✨',
    'Ограниченная коллекция! Успей купить, пока не разобрали! 🔥',
    'Тренд этого сезона! Легко сочетается с любыми вещами в гардеробе 💙',
    'Премиальное качество по доступной цене! Заказывай прямо сейчас 🎯',
    'Модный тренд сезона! Не упусти возможность выделиться 🌟'
  ];

  // Фильтруем только продукты с видео в media
  const productsWithVideo = products.filter(product => 
    product.media?.some(media => media.type === 'video')
  );

  console.log('🎬 VideoFeed: Генерация видео данных из продуктов:', {
    totalProducts: products.length,
    productsWithVideo: productsWithVideo.length,
    firstProductMedia: products[0]?.media?.map(m => ({ type: m.type, url: m.url?.substring(0, 50) }))
  });

  if (productsWithVideo.length === 0) {
    console.warn('⚠️ Нет товаров с видео в базе данных');
    return [];
  }

  return productsWithVideo.map((product, index) => {
    // Находим видео в media товара
    const videoMedia = product.media?.find(media => media.type === 'video');
    const imageMedia = product.media?.find(media => media.type === 'image');
    
    if (!videoMedia) {
      console.warn('⚠️ Видео не найдено для продукта:', product.name);
      return null;
    }

    return {
      id: `video-${product.id}`,
      videoUrl: videoMedia.url,
      thumbnailUrl: videoMedia.thumbnailUrl || imageMedia?.url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        storeName: product.storeName,
        storeAvatar: `https://images.unsplash.com/photo-${1472099645785 + index}?w=40&h=40&fit=crop&crop=face`,
        image: imageMedia?.url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
        rating: 4.2 + (Math.random() * 0.6), // 4.2-4.8
        ordersCount: Math.floor(Math.random() * 500) + 50, // 50-550 заказов
      },
      likes: Math.floor(Math.random() * 5000) + 500,
      isLiked: Math.random() > 0.7,
      description: descriptions[index % descriptions.length],
      duration: videoMedia.duration || 15 // Используем длительность из данных или default 15 сек
    };
  }).filter(Boolean) as VideoItem[]; // Убираем null значения
};

export function VideoFeed({ products, onOpenProduct, onAddToCart }: VideoFeedProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);
  const [likedVideos, setLikedVideos] = React.useState<Set<string>>(new Set());
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isMountedRef = React.useRef(true); // Для отслеживания состояния компонента
  
  // Генерируем видео данные из продуктов
  const videos = React.useMemo(() => {
    const result = generateVideoDataFromProducts(products);
    console.log('Generated videos:', {
      productsLength: products.length,
      videosLength: result.length,
      firstVideo: result[0]?.id,
      firstProduct: result[0]?.product?.name
    });
    return result;
  }, [products]);
  
  const currentVideo = videos[currentIndex];

  // Функции навигации (определяем первыми) - с бесконечной прокруткой
  const goToNext = React.useCallback(() => {
    if (!isMountedRef.current) return;
    
    const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    console.log(`Moving to next video: ${currentIndex} -> ${nextIndex}`);
    setIsLoading(true);
    setHasError(false);
    setProgress(0);
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  }, [currentIndex, videos.length]);

  const goToPrevious = React.useCallback(() => {
    if (!isMountedRef.current) return;
    
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    console.log(`Moving to previous video: ${currentIndex} -> ${prevIndex}`);
    setIsLoading(true);
    setHasError(false);
    setProgress(0);
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  }, [currentIndex, videos.length]);

  // Управление воспроизведением
  const togglePlayPause = React.useCallback(() => {
    if (!isMountedRef.current) return;
    
    const video = videoRef.current;
    if (video && video.parentElement && document.contains(video)) {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            if (isMountedRef.current && video.parentElement) {
              setIsPlaying(true);
            }
          }).catch(err => {
            if (err.name !== 'AbortError') {
              console.error('Play failed:', err);
            }
            if (isMountedRef.current) {
              setIsPlaying(false);
            }
          });
        }
      }
    }
  }, [isPlaying]);

  // Первый запуск видео после user interaction
  const handleFirstPlay = React.useCallback(() => {
    if (!isMountedRef.current) return;
    
    const video = videoRef.current;
    console.log('🎬 First play triggered:', { video: !!video, isPlaying, mounted: isMountedRef.current });
    
    // Дополнительные проверки для предотвращения AbortError
    if (video && !isPlaying && video.parentElement && document.contains(video)) {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('✅ Video started playing');
          if (isMountedRef.current && video.parentElement) {
            setIsPlaying(true);
            setIsLoading(false);
          }
        }).catch(err => {
          // Игнорируем AbortError, так как это нормально при быстрой навигации
          if (err.name !== 'AbortError') {
            console.error('❌ Initial play failed:', err);
          }
          if (isMountedRef.current) {
            setIsPlaying(false);
            setIsLoading(false);
          }
        });
      }
    }
  }, [isPlaying]);

  // Обработчик свайпа/скролла
  const touchStartY = React.useRef<number>(0);
  const touchEndY = React.useRef<number>(0);
  const isScrollingRef = React.useRef<boolean>(false);
  const [isSwipeInProgress, setIsSwipeInProgress] = React.useState(false);

  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    isScrollingRef.current = false;
    setIsSwipeInProgress(false);
  }, []);

  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = Math.abs(touchStartY.current - currentY);
    
    if (diff > 20) {
      isScrollingRef.current = true;
      e.preventDefault(); // Предотвращаем обычный скролл
    }
  }, []);

  const handleTouchEnd = React.useCallback((e: React.TouchEvent) => {
    if (!isScrollingRef.current || isSwipeInProgress) return;
    
    touchEndY.current = e.changedTouches[0].clientY;
    const swipeDistance = touchStartY.current - touchEndY.current;
    const swipeThreshold = 50;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      setIsSwipeInProgress(true);
      
      if (swipeDistance > 0) {
        // Свайп вверх - следующее видео
        console.log('Swipe up - next video');
        goToNext();
      } else {
        // Свайп вниз - предыдущее видео
        console.log('Swipe down - previous video');
        goToPrevious();
      }
      
      // Сброс флага через небольшое время
      setTimeout(() => setIsSwipeInProgress(false), 300);
    }
  }, [isSwipeInProgress, goToNext, goToPrevious]);

  // Обработка скролла колесом мыши
  const handleWheel = React.useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (isSwipeInProgress) return;
    
    const threshold = 50;
    if (Math.abs(e.deltaY) > threshold) {
      setIsSwipeInProgress(true);
      
      if (e.deltaY > 0) {
        console.log('Wheel down - next video');
        goToNext();
      } else {
        console.log('Wheel up - previous video');
        goToPrevious();
      }
      
      setTimeout(() => setIsSwipeInProgress(false), 300);
    }
  }, [isSwipeInProgress, goToNext, goToPrevious]);





  // Обработчик лайков
  const toggleLike = (videoId: string) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  // Cleanup при размонтировании
  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Останавливаем видео при размонтировании
      const video = videoRef.current;
      if (video && video.parentElement) {
        try {
          video.pause();
          video.currentTime = 0;
          video.src = ''; // Очищаем источник для предотвращения дальнейших загрузок
        } catch (err) {
          // Игнорируем ошибки при cleanup
        }
      }
    };
  }, []);

  // Добавляем wheel listener
  React.useEffect(() => {
    const container = containerRef.current;
    if (container && isMountedRef.current) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        if (container) {
          container.removeEventListener('wheel', handleWheel);
        }
      };
    }
  }, [handleWheel]);

  // Автовоспроизведение следующего видео
  React.useEffect(() => {
    const video = videoRef.current;
    if (video && isMountedRef.current && video.parentElement) {
      const handleVideoEnd = () => {
        if (!isMountedRef.current || !video.parentElement) return;
        
        console.log('Video ended, moving to next');
        goToNext(); // Теперь всегда переходим к следующему (с циклом)
      };
      
      video.addEventListener('ended', handleVideoEnd);
      return () => {
        if (video) {
          video.removeEventListener('ended', handleVideoEnd);
        }
      };
    }
  }, [currentIndex, videos.length, goToNext]);

  // Автоплей при смене видео
  React.useEffect(() => {
    if (!isMountedRef.current) return;
    
    const video = videoRef.current;
    if (video && isPlaying && video.parentElement && document.contains(video)) {
      console.log(`Auto-playing video ${currentIndex}`);
      video.currentTime = 0; // Сбрасываем время
      
      // Небольшая задержка перед воспроизведением
      const playTimeout = setTimeout(() => {
        if (isMountedRef.current && video.parentElement && document.contains(video)) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              if (err.name !== 'AbortError') {
                console.error('Error playing video:', err);
                if (isMountedRef.current) {
                  setHasError(true);
                }
              }
            });
          }
        }
      }, 100);
      
      return () => clearTimeout(playTimeout);
    }
  }, [currentIndex, isPlaying]);

  // Preload next videos for smooth transitions
  React.useEffect(() => {
    const nextVideos: string[] = [];
    
    // Preload next and next+1 videos
    const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    const nextNextIndex = nextIndex < videos.length - 1 ? nextIndex + 1 : 0;
    
    if (videos[nextIndex]) {
      nextVideos.push(videos[nextIndex].videoUrl);
    }
    if (videos[nextNextIndex] && nextNextIndex !== currentIndex) {
      nextVideos.push(videos[nextNextIndex].videoUrl);
    }
    
    // Preload videos
    nextVideos.forEach((videoUrl) => {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.preload = 'auto';
      video.muted = true;
      // Don't append to DOM, just trigger preload
      video.load();
    });
  }, [currentIndex, videos]);

  // Обработчик ошибок видео
  React.useEffect(() => {
    const video = videoRef.current;
    if (video && isMountedRef.current && video.parentElement) {
      const handleVideoError = (e: Event) => {
        // Log only safe properties to avoid circular structure
        const target = e.currentTarget as HTMLVideoElement;
        const error = target.error;
        console.error('Video element error:', {
          src: target.src,
          errorCode: error?.code,
          errorMessage: error?.message
        });
        
        if (isMountedRef.current && video.parentElement) {
          setHasError(true);
          setIsLoading(false);
        }
      };

      const handleVideoLoadStart = () => {
        if (isMountedRef.current && video.parentElement) {
          setIsLoading(true);
          setHasError(false);
        }
      };

      const handleVideoCanPlay = () => {
        if (isMountedRef.current && video.parentElement) {
          setIsLoading(false);
        }
      };

      video.addEventListener('error', handleVideoError);
      video.addEventListener('loadstart', handleVideoLoadStart);
      video.addEventListener('canplay', handleVideoCanPlay);

      return () => {
        if (video) {
          video.removeEventListener('error', handleVideoError);
          video.removeEventListener('loadstart', handleVideoLoadStart);
          video.removeEventListener('canplay', handleVideoCanPlay);
        }
      };
    }
  }, [currentVideo?.videoUrl]);

  // Клавиатурная навигация
  React.useEffect(() => {
    if (!isMountedRef.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMountedRef.current) return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowDown':
          e.preventDefault();
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, togglePlayPause]);

  // Debugging useEffect
  React.useEffect(() => {
    console.log('VideoFeed state:', {
      currentIndex,
      videosLength: videos.length,
      currentVideoId: currentVideo?.id,
      isPlaying,
      isLoading
    });
  }, [currentIndex, videos.length, currentVideo?.id, isPlaying, isLoading]);

  // Отладочная информация при монтировании компонента
  React.useEffect(() => {
    console.log('VideoFeed mounted with:', {
      productsCount: products.length,
      videosCount: videos.length,
      currentVideo: currentVideo?.id
    });
  }, []);

  if (!currentVideo) {
    console.log('No current video found:', { videos: videos.length, currentIndex });
    return (
      <div className="fixed inset-0 w-full h-full bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-xl mb-2">Нет видео для показа</div>
          <div className="text-sm text-white/60">
            Видео: {videos.length}, Индекс: {currentIndex}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full overflow-hidden bg-black"
      style={{ 
        touchAction: 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Player */}
      <video 
        ref={videoRef}
        key={currentVideo.id}
        src={currentVideo.videoUrl}
        poster={currentVideo.thumbnailUrl}
        className="absolute top-0 left-0 w-full object-cover" 
        style={{ height: '100vh' }} // Полная высота экрана
        muted 
        loop={false}
        playsInline
        preload="auto"
        onClick={handleFirstPlay}
        onLoadStart={() => {
          console.log('Video loading started:', currentVideo.id);
          if (isMountedRef.current) {
            setIsLoading(true);
          }
        }}
        onCanPlay={() => {
          console.log('Video can play:', currentVideo.id);
          if (isMountedRef.current) {
            setIsLoading(false);
            // Автоматически запускаем видео после возможности воспроизведения
            if (isPlaying && videoRef.current && videoRef.current.parentElement && document.contains(videoRef.current)) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(err => {
                  if (err.name !== 'AbortError') {
                    console.error('Auto-play failed:', err);
                    if (isMountedRef.current) {
                      setHasError(true);
                    }
                  }
                });
              }
            }
          }
        }}
        onWaiting={() => {
          if (isMountedRef.current) setIsLoading(true);
        }}
        onPlaying={() => {
          console.log('Video playing:', currentVideo.id);
          if (isMountedRef.current) {
            setIsLoading(false);
            setIsPlaying(true);
          }
        }}
        onPause={() => {
          if (isMountedRef.current) setIsPlaying(false);
        }}
        onTimeUpdate={(e) => {
          if (!isMountedRef.current) return;
          const video = e.target as HTMLVideoElement;
          if (video.duration) {
            setProgress((video.currentTime / video.duration) * 100);
          }
        }}
        onLoadedMetadata={() => {
          console.log('Video metadata loaded:', currentVideo.id);
          if (isMountedRef.current) {
            setProgress(0);
            setHasError(false);
          }
        }}
        onError={(e) => {
          // Log only safe properties to avoid circular structure
          const target = e.currentTarget as HTMLVideoElement;
          const error = target.error;
          console.error('Video element error:', {
            src: target.src,
            errorCode: error?.code,
            errorMessage: error?.message
          });
          if (isMountedRef.current) {
            setHasError(true);
            setIsLoading(false);
          }
        }}
      />



      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">⚠️</div>
            <div className="text-lg font-medium mb-2">Ошибка загрузки видео</div>
            <button 
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      )}



      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin backdrop-blur-sm bg-white/10 rounded-full p-2"></div>
        </div>
      )}

      {/* Play/Pause Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleFirstPlay}
            className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm shadow-lg hover:bg-white/95 transition-all duration-200"
          >
            <Play className="w-8 h-8 text-black ml-1" />
          </button>
        </div>
      )}

      {/* Tap to play overlay (for first interaction) */}
      {currentIndex === 0 && !isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white bg-black/30 backdrop-blur-md rounded-2xl p-6">
            <button
              onClick={handleFirstPlay}
              className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm shadow-xl mb-4 hover:bg-white/95 transition-all duration-200"
            >
              <Play className="w-10 h-10 text-black ml-1" />
            </button>
            <div className="text-lg font-medium mb-2">Нажмите для воспроизведения</div>
            <div className="text-sm text-white/80">Свайпайте вверх/вниз для навигации</div>
          </div>
        </div>
      )}

      {/* Content Info - Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* LUMA/Feed/Overlay_v6 - Video Feed adapted version */}
        <div className="absolute inset-x-0 pointer-events-none" style={{ bottom: '88px' }}>
          <div className="px-3 flex items-end justify-between gap-4">
            {/* LEFT COLUMN (LeftStack) - Fixed width */}
            <div
              className="pointer-events-auto flex flex-col gap-2"
              style={{
                width: 'min(320px, calc(100% - (12px + 56px + 16px + 12px)))', // L + button + gap + R
              }}
            >
              {/* 1. Store Row */}
              <div className="flex items-center justify-between text-white drop-shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm text-sm">
                    {currentVideo.product.storeAvatar.length <= 2 ? currentVideo.product.storeAvatar : '🏪'}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold">{currentVideo.product.storeName}</span>
                    <div className="w-3 h-3 bg-luma-primary rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
                
                {/* Store Rating and Orders */}
                <div className="flex items-center gap-1 text-white/90 text-xs">
                  <span>⭐ 4.8</span>
                  <span>•</span>
                  <span>2.1k заказов</span>
                </div>
              </div>
              
              {/* 2. Description - Full width of LeftStack */}
              <div className="text-white/95 text-[13px] leading-[18px] line-clamp-2 drop-shadow-md">
                {currentVideo.description}
              </div>

              {/* 3. Product Card - Square image, status badge, eye button */}
              <div 
                className="flex rounded-2xl overflow-hidden backdrop-blur-md cursor-pointer relative"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.85)', // Белый полупрозрачный фон
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)'
                }}
                onClick={() => onOpenProduct(currentVideo.product.id)}
              >
                {/* Left: Square Media */}
                <div className="w-[80px] h-[80px] flex-shrink-0 p-2">
                  <img 
                    src={currentVideo.product.image} 
                    alt={currentVideo.product.name}
                    className="w-full h-full object-cover rounded-xl"
                    style={{ aspectRatio: '1/1' }}
                  />
                </div>

                {/* Center: Content */}
                <div className="flex flex-col justify-center flex-1 py-2 pr-2 pl-1 overflow-hidden">
                  {/* Title */}
                  <div 
                    className="truncate font-bold text-luma-text-900 w-full mb-1"
                    style={{ fontSize: 'clamp(11px, 2.6vw, 12px)' }}
                    title={currentVideo.product.name}
                  >
                    {currentVideo.product.name}
                  </div>

                  {/* Status Badge */}
                  <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      В наличии
                    </span>
                  </div>

                  {/* Price */}
                  <div className="w-full">
                    <div 
                      className="font-extrabold text-luma-primary-600 whitespace-nowrap"
                      style={{ fontSize: 'clamp(14px, 3.8vw, 16px)' }}
                    >
                      {currentVideo.product.price.toLocaleString()}&nbsp;сум
                    </div>
                  </div>
                </div>

                {/* Right: Eye Button */}
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (RightRail) - Unified style for all actions */}
            <div className="pointer-events-auto flex flex-col items-center gap-2.5">
              {/* Like Action - Unified style */}
              <div className="flex flex-col items-center">
                <button 
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)'
                  }}
                  onClick={() => toggleLike(currentVideo.id)}
                  aria-label="Избранное"
                >
                  <Heart 
                    className={`w-6 h-6 ${
                      likedVideos.has(currentVideo.id) || currentVideo.isLiked
                        ? 'text-luma-danger-600 fill-luma-danger-600' 
                        : 'text-luma-text-600'
                    }`} 
                  />
                </button>
                <div className="mt-1 text-[11px] font-bold text-white drop-shadow-md text-center">
                  Избранное
                </div>
              </div>

              {/* Share Action - Unified style */}
              <div className="flex flex-col items-center">
                <button 
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)'
                  }}
                  aria-label="Поделиться"
                >
                  <Share className="w-6 h-6 text-luma-text-600" />
                </button>
                <div className="mt-1 text-[11px] font-bold text-white drop-shadow-md text-center">
                  Поделиться
                </div>
              </div>

              {/* Cart Action - Unified style */}
              <div className="flex flex-col items-center">
                <button 
                  className="w-14 h-14 bg-gradient-to-r from-luma-primary to-luma-pink rounded-full flex items-center justify-center shadow-luma hover:scale-110 transition-transform"
                  onClick={() => onAddToCart(currentVideo.product.id)}
                  aria-label="В корзину"
                >
                  <ShoppingCart className="w-6 h-6 text-white" />
                </button>
                <div className="mt-1 text-[11px] font-bold text-white drop-shadow-md text-center">
                  В корзину
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}