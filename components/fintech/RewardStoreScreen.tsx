import React from 'react';
import { ArrowLeft, Gift, Truck, Tag, Star } from 'lucide-react';
import { Button } from '../ui/button';

interface RewardStoreScreenProps {
  onBack: () => void;
}

export function RewardStoreScreen({ onBack }: RewardStoreScreenProps) {
  const userPoints = 1250;

  const rewards = [
    {
      id: '1',
      title: '2x Cashback Boost',
      description: 'Double cashback on all purchases for 7 days',
      type: 'cashback_boost',
      pointsCost: 500,
      value: '2x multiplier',
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      gradient: 'from-yellow-100 to-orange-100'
    },
    {
      id: '2',
      title: 'Free Shipping',
      description: 'Free delivery on your next 3 orders',
      type: 'free_shipping',
      pointsCost: 300,
      value: '3 orders',
      icon: <Truck className="w-8 h-8 text-blue-500" />,
      gradient: 'from-blue-100 to-cyan-100'
    },
    {
      id: '3',
      title: '15% Off Coupon',
      description: 'Get 15% discount on any purchase',
      type: 'discount_coupon',
      pointsCost: 750,
      value: '15% off',
      icon: <Tag className="w-8 h-8 text-pink-500" />,
      gradient: 'from-pink-100 to-rose-100'
    },
    {
      id: '4',
      title: 'Exclusive Early Access',
      description: 'Shop new collections 24h early',
      type: 'exclusive_deal',
      pointsCost: 1000,
      value: '24h early',
      icon: <Gift className="w-8 h-8 text-purple-500" />,
      gradient: 'from-purple-100 to-indigo-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white pb-20">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Reward Store</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D]">
            <Star className="w-4 h-4 text-white" fill="white" />
            <span className="font-bold text-white">{userPoints}</span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-6">
        {rewards.map((reward) => {
          const canAfford = userPoints >= reward.pointsCost;
          
          return (
            <div
              key={reward.id}
              className={`p-5 rounded-2xl bg-gradient-to-br ${reward.gradient} ${!canAfford && 'opacity-60'}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm">
                  {reward.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#A260EF]" />
                      <span className="font-bold text-[#A260EF]">{reward.pointsCost} LP</span>
                    </div>
                    
                    <Button
                      disabled={!canAfford}
                      className={`px-4 py-2 rounded-lg font-bold ${canAfford ? 'bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90' : 'bg-gray-300 text-gray-500'}`}
                    >
                      {canAfford ? 'Redeem' : 'Not Enough Points'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
