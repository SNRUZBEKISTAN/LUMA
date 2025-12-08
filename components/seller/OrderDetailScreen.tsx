import React, { useState } from 'react';
import { SellerOrderDetail } from './SellerOrderDetail';

interface OrderDetailScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function OrderDetailScreen({ onBack, onNavigate }: OrderDetailScreenProps) {
  return (
    <SellerOrderDetail
      onBack={onBack}
      onNavigate={onNavigate}
      activeTab="orders"
      onTabChange={() => {}}
    />
  );
}