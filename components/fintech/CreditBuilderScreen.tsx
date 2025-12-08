import React from 'react';
import { ArrowLeft, TrendingUp, CheckCircle2, Lock } from 'lucide-react';
import { Button } from '../ui/button';

interface CreditBuilderScreenProps {
  onBack: () => void;
  onNavigate: (screen: 'lumaPoints' | 'bnpl') => void;
}

export function CreditBuilderScreen({ onBack, onNavigate }: CreditBuilderScreenProps) {
  const creditScore = {
    score: 685,
    maxScore: 900,
    tier: 'Gold',
    tierColor: '#FFD700',
    factors: {
      paymentBehavior: 85,
      shoppingReliability: 75,
      returnRate: 90,
      pointsTier: 70,
      profileCompleteness: 80
    },
    bnplLimit: 12500000,
    nextTierLimit: 25000000
  };

  const dailyMissions = [
    { id: '1', title: 'Daily Login', points: 10, completed: true, icon: '✓' },
    { id: '2', title: 'Complete a Purchase', points: 50, completed: false, icon: '🛍️' },
    { id: '3', title: 'Leave a Review', points: 25, completed: false, icon: '⭐' },
    { id: '4', title: 'Add to Wishlist', points: 15, completed: false, icon: '💝' }
  ];

  const percentage = (creditScore.score / creditScore.maxScore) * 100;
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Credit Builder</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Credit Score Ring */}
        <div 
          className="relative p-6 rounded-3xl flex flex-col items-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200/50 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* SVG Ring */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="96"
                  cy="96"
                  r="90"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A260EF" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-5xl font-extrabold text-gray-900">{creditScore.score}</p>
                <p className="text-sm font-medium text-gray-500">/ {creditScore.maxScore}</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ background: creditScore.tierColor }}
              />
              <p className="text-lg font-bold text-gray-900">{creditScore.tier} Tier</p>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Score Breakdown</h2>
          
          <div className="space-y-3">
            {Object.entries(creditScore.factors).map(([key, value]) => {
              const labels: Record<string, string> = {
                paymentBehavior: 'Payment Behavior',
                shoppingReliability: 'Shopping Reliability',
                returnRate: 'Return Rate',
                pointsTier: 'Luma Points Tier',
                profileCompleteness: 'Profile Completeness'
              };
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">{labels[key]}</p>
                    <p className="text-sm font-bold text-gray-900">{value}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-[#A260EF] to-[#10B981]"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Missions */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Daily Missions</h2>
          
          <div 
            className="rounded-2xl p-2"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {dailyMissions.map((mission, index) => (
              <React.Fragment key={mission.id}>
                {index > 0 && <div className="h-px w-full bg-gray-200/50" />}
                <label className="flex items-center gap-4 py-3 px-4 cursor-pointer hover:bg-white/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={mission.completed}
                    className="w-6 h-6 rounded-md border-gray-300 text-[#A260EF] focus:ring-[#A260EF]"
                    readOnly
                  />
                  <span className="text-xl">{mission.icon}</span>
                  <span className="flex-1 font-medium text-gray-900">{mission.title}</span>
                  <span className="text-sm font-bold text-[#A260EF]">+{mission.points} LP</span>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* BNPL Unlock Banner */}
        <button
          onClick={() => onNavigate('bnpl')}
          className="w-full p-5 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100"
        >
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
              <TrendingUp className="w-6 h-6 text-[#A260EF]" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-gray-900">Unlock Higher BNPL Limit</p>
              <p className="text-sm text-gray-600 mt-1">
                Current: {(creditScore.bnplLimit / 1000000).toFixed(1)}M UZS
              </p>
              <div className="mt-3 h-2 rounded-full bg-white/50">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D]"
                  style={{ width: '50%' }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                50 more points to unlock {(creditScore.nextTierLimit / 1000000).toFixed(1)}M UZS
              </p>
            </div>
          </div>
        </button>

        {/* Progress to Next Tier */}
        <div 
          className="p-5 rounded-2xl space-y-4"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Progress to Platinum</h3>
            <p className="text-sm font-bold text-[#A260EF]">115 / 200 XP</p>
          </div>
          
          <div className="h-3 rounded-full bg-gray-200">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#E5E4E2]"
              style={{ width: '57.5%' }}
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="w-4 h-4" />
            <span>Unlock exclusive perks with Platinum tier</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={() => onNavigate('lumaPoints')}
          className="w-full h-14 bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90 rounded-2xl text-lg font-bold"
        >
          View Luma Points →
        </Button>
      </div>
    </div>
  );
}
