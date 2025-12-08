import React from 'react';
import { FloatingBottomNav } from './FloatingBottomNav';
import {
  MoreHorizontal,
  Edit,
  ShoppingBag,
  Heart,
  Truck,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Wallet
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileScreenV2Props {
  userName: string;
  userAvatar?: string;
  walletBalance: number;
  points: number;
  onLogout: () => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
  onBack: () => void;
  onOpenOrders: () => void;
  onOpenFavs: () => void;
  onOpenPayments: () => void;
  onOpenAddresses: () => void;
  onOpenHelp: () => void;
  onEditProfile: () => void;
  onOpenWallet: () => void;
  cartItemCount?: number;
}

export function ProfileScreenV2({ 
  userName, 
  userAvatar,
  walletBalance,
  points,
  onLogout,
  onTabChange,
  activeTab,
  onBack,
  onOpenOrders,
  onOpenFavs,
  onOpenPayments,
  onOpenAddresses,
  onOpenHelp,
  onEditProfile,
  onOpenWallet,
  cartItemCount = 0
}: ProfileScreenV2Props) {
  
  const formatBalance = (balance: number) => {
    return `${(balance / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} 000 UZS`;
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#F5F5F7]">
      {/* Top App Bar */}
      <div className="flex items-center bg-[#F5F5F7]/80 backdrop-blur-lg p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start"></div>
        <h1 className="text-[#1D1D1F] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Profile
        </h1>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-transparent text-[#1D1D1F] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <MoreHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      <main className="flex flex-col gap-8 pb-32 px-4">
        {/* Profile Header */}
        <div className="flex w-full flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-28 w-28 p-1 bg-gradient-to-br from-[#E6E6FA] to-[#B0E0E6]">
              <div className="w-full h-full bg-center bg-no-repeat aspect-square bg-cover rounded-full overflow-hidden">
                <ImageWithFallback
                  src={userAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-1">
            <p className="text-[#1D1D1F] text-[22px] font-bold leading-tight tracking-[-0.015em]">
              {userName}
            </p>
            <p className="text-[#6E6E73] text-base font-normal leading-normal">
              @{userName.toLowerCase().replace(/\s+/g, '_')}
            </p>
          </div>
          <button 
            onClick={onEditProfile}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-gray-200/80 text-[#007AFF] text-sm font-bold leading-normal tracking-[0.015em] w-auto gap-2 transition-colors hover:bg-gray-300/80"
          >
            <Edit className="w-[18px] h-[18px]" />
            <span className="truncate">Edit Profile</span>
          </button>
        </div>

        {/* Wallet & Points Card */}
        <div className="p-4">
          <div 
            className="flex flex-col items-stretch justify-start rounded-xl p-6 gap-4 cursor-pointer transition-all hover:shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #E6E6FA 0%, #B0E0E6 100%)',
              boxShadow: '-8px -8px 16px rgba(255, 255, 255, 0.8), 8px 8px 16px rgba(0, 0, 0, 0.05)'
            }}
            onClick={onOpenWallet}
          >
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-2">
              <p className="text-[#1D1D1F]/80 text-sm font-normal leading-normal">
                Luma Wallet
              </p>
              <p className="text-[#1D1D1F] text-3xl font-bold leading-tight tracking-[-0.015em]">
                {formatBalance(walletBalance)}
              </p>
              <p className="text-[#6E6E73] text-base font-medium leading-normal">
                ✨ {points} Points
              </p>
            </div>
            <div className="flex items-center gap-3 w-full">
              <button className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#007AFF] text-white text-sm font-bold leading-normal transition-opacity hover:opacity-90">
                <span className="truncate">Top Up</span>
              </button>
              <button className="flex flex-1 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white/50 text-[#1D1D1F] text-sm font-bold leading-normal transition-all hover:bg-white/70">
                <span className="truncate">View History</span>
              </button>
            </div>
          </div>
        </div>

        {/* My Account Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#6E6E73] text-sm font-bold uppercase tracking-wider px-4">
            My Account
          </h3>
          <div 
            className="flex flex-col overflow-hidden rounded-xl"
            style={{
              backgroundColor: '#F5F5F7',
              boxShadow: '-5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 10px rgba(0, 0, 0, 0.05)'
            }}
          >
            <button 
              onClick={onOpenOrders}
              className="flex items-center gap-4 bg-transparent px-4 min-h-[56px] justify-between border-b border-gray-200 hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#1D1D1F] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <p className="text-[#1D1D1F] text-base font-medium leading-normal flex-1 truncate">
                  My Orders
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#6E6E73]">
                <span className="text-sm">Track 2 new orders</span>
                <ChevronRight className="w-[18px] h-[18px]" />
              </div>
            </button>

            <button 
              onClick={onOpenFavs}
              className="flex items-center gap-4 bg-transparent px-4 min-h-[56px] justify-between border-b border-gray-200 hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#1D1D1F] flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <p className="text-[#1D1D1F] text-base font-medium leading-normal flex-1 truncate">
                  Saved Items
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#6E6E73]">
                <span className="text-sm">12 items</span>
                <ChevronRight className="w-[18px] h-[18px]" />
              </div>
            </button>

            <button 
              onClick={onOpenAddresses}
              className="flex items-center gap-4 bg-transparent px-4 min-h-[56px] justify-between border-b border-gray-200 hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#1D1D1F] flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <p className="text-[#1D1D1F] text-base font-medium leading-normal flex-1 truncate">
                  Shipping Addresses
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#6E6E73]">
                <ChevronRight className="w-[18px] h-[18px]" />
              </div>
            </button>

            <button 
              onClick={onOpenPayments}
              className="flex items-center gap-4 bg-transparent px-4 min-h-[56px] justify-between hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#1D1D1F] flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <p className="text-[#1D1D1F] text-base font-medium leading-normal flex-1 truncate">
                  Payment Methods
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#6E6E73]">
                <ChevronRight className="w-[18px] h-[18px]" />
              </div>
            </button>
          </div>
        </div>

        {/* Settings & Support Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[#6E6E73] text-sm font-bold uppercase tracking-wider px-4">
            App Settings & Support
          </h3>
          <div 
            className="flex flex-col overflow-hidden rounded-xl"
            style={{
              backgroundColor: '#F5F5F7',
              boxShadow: '-5px -5px 10px rgba(255, 255, 255, 0.9), 5px 5px 10px rgba(0, 0, 0, 0.05)'
            }}
          >
            <button className="flex items-center gap-4 bg-transparent px-4 min-h-[56px] justify-between border-b border-gray-200 hover:bg-white/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-[#1D1D1F] flex items-center justify-center">
                  <Settings className="w-6 h-6" />
                </div>
                <p className="text-[#1D1D1F] text-base font-medium leading-normal flex-1 truncate">
                  Settings
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#6E6E73]">
                <ChevronRight className="w-[18px] h-[18px]" />
              </div>
            </button>

            <button 
              onClick={onOpenHelp}
              className="flex items-center gap-4 bg-transparent px-4 min-h-[56px] justify-between border-b border-gray-200 hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-[#1D1D1F] flex items-center justify-center">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <p className="text-[#1D1D1F] text-base font-medium leading-normal flex-1 truncate">
                  Help & Support
                </p>
              </div>
              <div className="flex items-center gap-2 text-[#6E6E73]">
                <ChevronRight className="w-[18px] h-[18px]" />
              </div>
            </button>

            <button 
              onClick={onLogout}
              className="flex items-center gap-4 bg-transparent px-4 min-h-[56px] justify-between hover:bg-white/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-red-500 flex items-center justify-center">
                  <LogOut className="w-6 h-6" />
                </div>
                <p className="text-red-500 text-base font-medium leading-normal flex-1 truncate">
                  Log Out
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <FloatingBottomNav 
        activeTab={activeTab}
        onTabChange={onTabChange}
        cartItemCount={cartItemCount}
      />
    </div>
  );
}
