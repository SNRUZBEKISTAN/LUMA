import React from 'react';
import { ArrowLeft, Calendar, DollarSign, Snowflake, CreditCard } from 'lucide-react';
import { Button } from '../ui/button';

interface BNPLScreenProps {
  onBack: () => void;
  onNavigateTo: (screen: 'bnplOrderDetail', orderId: string) => void;
}

export function BNPLScreen({ onBack, onNavigateTo }: BNPLScreenProps) {
  const bnplData = {
    creditLimit: 12500000,
    usedLimit: 6250000,
    availableLimit: 6250000,
    freezeEnabled: false,
    interestRate: 0 // 0% for first 3 months
  };

  const bnplOrders = [
    {
      id: '1',
      productName: 'Nike Air Max 270',
      productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
      totalAmount: 2500000,
      paidAmount: 833333,
      remainingAmount: 1666667,
      nextPaymentDate: '2024-01-15',
      nextPaymentAmount: 833333,
      status: 'active' as const,
      installments: 3,
      completedInstallments: 1
    },
    {
      id: '2',
      productName: 'Zara Leather Jacket',
      productImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop',
      totalAmount: 3750000,
      paidAmount: 1250000,
      remainingAmount: 2500000,
      nextPaymentDate: '2024-01-20',
      nextPaymentAmount: 1250000,
      status: 'active' as const,
      installments: 3,
      completedInstallments: 1
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const usagePercentage = (bnplData.usedLimit / bnplData.creditLimit) * 100;

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
          <h1 className="text-2xl font-bold text-gray-900">Pay Later</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 space-y-6 mt-6">
        {/* Credit Limit Card */}
        <div 
          className="relative p-6 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)'
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300/30 rounded-full blur-3xl" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <p className="text-sm font-medium text-gray-600">BNPL Credit Limit</p>
            </div>
            
            <div>
              <p className="text-4xl font-extrabold text-gray-900">
                {formatCurrency(bnplData.availableLimit)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Available of {formatCurrency(bnplData.creditLimit)} UZS</p>
            </div>
            
            <div className="h-3 rounded-full bg-white/50">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Used: {formatCurrency(bnplData.usedLimit)}</span>
              <span className="font-bold text-gray-900">{usagePercentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Freeze Feature */}
        <div 
          className="p-5 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Snowflake className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-bold text-gray-900">Freeze Payments</p>
                <p className="text-sm text-gray-600">Pause BNPL for one month</p>
              </div>
            </div>
            <label 
              className="relative flex h-8 w-14 cursor-pointer items-center rounded-full p-0.5"
              style={{
                background: bnplData.freezeEnabled ? '#3b82f6' : '#e5e7eb'
              }}
            >
              <div 
                className="h-7 w-7 rounded-full bg-white shadow-sm transition-transform duration-200"
                style={{
                  transform: bnplData.freezeEnabled ? 'translateX(24px)' : 'translateX(0)'
                }}
              />
            </label>
          </div>
        </div>

        {/* Active BNPL Orders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Active Orders</h2>
            <span className="text-sm font-medium text-gray-600">{bnplOrders.length} orders</span>
          </div>
          
          <div className="space-y-3">
            {bnplOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => onNavigateTo('bnplOrderDetail', order.id)}
                className="w-full p-4 rounded-2xl text-left"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                <div className="flex items-start gap-4">
                  <img 
                    src={order.productImage} 
                    alt={order.productName}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 truncate">{order.productName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatCurrency(order.totalAmount)} UZS
                    </p>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-bold text-gray-900">
                          {order.completedInstallments}/{order.installments} paid
                        </span>
                      </div>
                      
                      <div className="h-1.5 rounded-full bg-gray-200">
                        <div 
                          className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                          style={{ width: `${(order.completedInstallments / order.installments) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        Next: {formatCurrency(order.nextPaymentAmount)} on {order.nextPaymentDate}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div 
          className="p-5 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100"
        >
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
              <span className="text-2xl">✓</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">Interest-Free</p>
              <p className="text-sm text-gray-600 mt-1">
                Pay in 3 installments with 0% interest for your first 3 months
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900">How It Works</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A260EF] text-white font-bold text-sm">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Shop Now</p>
                <p className="text-sm text-gray-600">Select "Pay Later" at checkout</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A260EF] text-white font-bold text-sm">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Split Payment</p>
                <p className="text-sm text-gray-600">Divide into 3 equal installments</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#A260EF] text-white font-bold text-sm">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Auto Pay</p>
                <p className="text-sm text-gray-600">Payments deducted automatically each month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}