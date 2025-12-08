import React from 'react';
import { ArrowLeft, Star, Gift, Zap, History } from 'lucide-react';
import { Button } from '../ui/button';

interface LumaPointsScreenProps {
  onBack: () => void;
  onNavigate: (screen: 'rewardStore') => void;
}

export function LumaPointsScreen({ onBack, onNavigate }: LumaPointsScreenProps) {
  const [convertPoints, setConvertPoints] = React.useState(500);
  
  const pointsData = {
    totalPoints: 1250,
    level: 'Silver',
    xp: 250,
    xpToNextLevel: 1000,
    nextLevel: 'Gold'
  };

  const dailyMissions = [
    { id: '1', title: 'Daily Login (+10 LP)', completed: true },
    { id: '2', title: 'Virtual Try-On (+25 LP)', completed: false },
    { id: '3', title: 'Support Local: Buy from a local brand (+50 LP)', completed: false }
  ];

  const levelGradients: Record<string, string> = {
    Bronze: 'from-orange-400 to-orange-600',
    Silver: 'from-gray-300 to-gray-500',
    Gold: 'from-yellow-400 to-yellow-600',
    Platinum: 'from-blue-300 to-blue-500',
    Titanium: 'from-slate-400 to-slate-700'
  };

  const progressPercentage = (pointsData.xp / pointsData.xpToNextLevel) * 100;
  const conversionRate = 10; // 1 LP = 10 UZS

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
          <h1 className="text-2xl font-bold text-gray-900">Lumaverse Rewards</h1>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
            <History className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Level Card */}
        <div 
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          <div className="flex items-center gap-4">
            {/* Level Avatar */}
            <div 
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${levelGradients[pointsData.level]} flex items-center justify-center shadow-lg`}
            >
              <Star className="w-10 h-10 text-white" fill="white" />
            </div>
            
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-900">{pointsData.level} Level</p>
              <p className="text-base text-gray-600">{pointsData.totalPoints.toLocaleString()} LP</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {pointsData.xp} / {pointsData.xpToNextLevel} points to {pointsData.nextLevel}
              </p>
            </div>
            <div className="h-2 rounded-full bg-gray-200">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${levelGradients[pointsData.nextLevel]}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Daily Missions */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900">Daily Missions</h3>
          
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
                  <span className="flex-1 font-medium text-gray-900">{mission.title}</span>
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Gamification Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Spin Wheel */}
          <div 
            className="flex flex-col gap-4 rounded-2xl p-4"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative flex items-center justify-center h-20 w-20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 opacity-70 blur-lg" />
                <Zap className="w-10 h-10 text-[#A260EF] z-10" fill="#A260EF" />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-gray-900">Spin for a Surprise</p>
                <p className="text-sm text-gray-600">1 free spin daily</p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90 rounded-lg h-12">
              Spin
            </Button>
          </div>

          {/* Monthly Chest */}
          <div 
            className="flex flex-col gap-4 rounded-2xl p-4"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative flex items-center justify-center h-20 w-20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 opacity-70 blur-lg" />
                <Gift className="w-10 h-10 text-orange-500 z-10" />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-gray-900">Your Monthly Chest</p>
                <p className="text-sm text-gray-600">Unlocks in 15 days</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              disabled 
              className="w-full rounded-lg h-12 bg-gray-200 text-gray-500"
            >
              Claim
            </Button>
          </div>
        </div>

        {/* Points to Cashback Converter */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900">Points to Cashback</h3>
          
          <div 
            className="rounded-2xl p-6 flex flex-col gap-4"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex justify-between items-baseline">
              <p className="text-gray-600">Converting</p>
              <p className="text-3xl font-bold text-gray-900">
                {convertPoints} <span className="text-lg text-gray-600">LP</span>
              </p>
            </div>
            
            <div className="w-full py-2">
              <input
                type="range"
                min="0"
                max={pointsData.totalPoints}
                value={convertPoints}
                onChange={(e) => setConvertPoints(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#A260EF]"
                style={{
                  background: `linear-gradient(to right, #A260EF 0%, #A260EF ${(convertPoints / pointsData.totalPoints) * 100}%, #E5E7EB ${(convertPoints / pointsData.totalPoints) * 100}%, #E5E7EB 100%)`
                }}
              />
            </div>
            
            <div className="flex justify-between items-baseline">
              <p className="text-gray-600">Equals</p>
              <p className="text-3xl font-bold text-gray-900">
                {(convertPoints * conversionRate).toLocaleString()} <span className="text-lg text-gray-600">UZS</span>
              </p>
            </div>
            
            <Button className="w-full mt-2 h-14 bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90 rounded-lg text-lg font-bold">
              Convert
            </Button>
          </div>
        </div>

        {/* Rewards Store CTA */}
        <Button
          onClick={() => onNavigate('rewardStore')}
          variant="outline"
          className="w-full h-14 border-2 rounded-2xl text-lg font-bold"
        >
          Browse Reward Store →
        </Button>
      </div>
    </div>
  );
}
