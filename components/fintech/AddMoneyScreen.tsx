import React from 'react';
import { ArrowLeft, CreditCard, Plus, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface AddMoneyScreenProps {
  onBack: () => void;
}

export function AddMoneyScreen({ onBack }: AddMoneyScreenProps) {
  const [amount, setAmount] = React.useState('');
  const [selectedMethod, setSelectedMethod] = React.useState<string | null>(null);

  const quickAmounts = [100000, 500000, 1000000, 2000000];
  
  const paymentMethods = [
    { id: 'uzum', name: 'Uzum Bank', logo: '💜', last4: '4242' },
    { id: 'click', name: 'Click', logo: '🔵', last4: '5678' },
    { id: 'payme', name: 'Payme', logo: '💚', last4: '9012' }
  ];

  const handleAddMoney = () => {
    // Implementation
    alert(`Adding ${amount} UZS via ${selectedMethod}`);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white pb-20">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Add Money</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Amount Input */}
        <div
          className="p-6 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          <p className="text-sm font-medium text-gray-600 mb-3">Enter Amount</p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 text-4xl font-extrabold bg-transparent border-none outline-none text-gray-900"
            />
            <span className="text-2xl font-bold text-gray-600">UZS</span>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className="py-3 rounded-xl font-bold text-sm bg-white/70 backdrop-blur-sm hover:bg-white transition-colors"
            >
              {amt / 1000}K
            </button>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Payment Method</h2>
          
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                  selectedMethod === method.id
                    ? 'bg-gradient-to-r from-[#A260EF]/10 to-[#FF6D9D]/10 border-2 border-[#A260EF]'
                    : 'bg-white/70 backdrop-blur-sm border-2 border-transparent'
                }`}
              >
                <span className="text-3xl">{method.logo}</span>
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-600">•••• {method.last4}</p>
                </div>
                {selectedMethod === method.id && (
                  <div className="w-6 h-6 rounded-full bg-[#A260EF] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <button className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 text-gray-600 font-medium flex items-center justify-center gap-2 hover:border-[#A260EF] hover:text-[#A260EF] transition-colors">
            <Plus className="w-5 h-5" />
            Add New Card
          </button>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleAddMoney}
          disabled={!amount || !selectedMethod}
          className="w-full h-14 bg-gradient-to-r from-[#A260EF] to-[#FF6D9D] hover:opacity-90 rounded-2xl text-lg font-bold disabled:opacity-50"
        >
          Add {amount ? `${parseInt(amount).toLocaleString()} UZS` : 'Money'}
        </Button>
      </div>
    </div>
  );
}
