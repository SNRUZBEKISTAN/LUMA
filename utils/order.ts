import { OrderStatus, ServiceFeeConfig } from '../types/app';

export const genId = () => crypto.randomUUID();

export const genOrderNumber = () => `A-${Math.floor(200000 + Math.random() * 800000)}`;

export const nowISO = () => new Date().toISOString();

export const estimateETA = (status: OrderStatus): string | undefined => {
  const base = new Date();
  if (status === 'new') base.setHours(base.getHours() + 24);
  if (status === 'prep') base.setHours(base.getHours() + 22);
  if (status === 'shipped') base.setHours(base.getHours() + 18);
  if (status === 'delivered') return undefined;
  return base.toISOString();
};

export const calcServiceFee = (subtotal: number, deliveryFee: number, cfg: ServiceFeeConfig): number => {
  const base = subtotal + deliveryFee;
  let fee = 0;
  
  if (cfg.mode === 'percent' && cfg.percent != null) {
    fee = Math.round(base * (cfg.percent / 100));
  }
  
  if (cfg.mode === 'flat' && cfg.flat != null) {
    fee = Math.round(cfg.flat);
  }
  
  if (cfg.mode === 'mixed') {
    const p = cfg.percent ? base * (cfg.percent / 100) : 0;
    const f = cfg.flat ?? 0;
    fee = Math.round(p + f);
  }
  
  if (cfg.minFee != null) fee = Math.max(fee, cfg.minFee);
  if (cfg.maxFee != null) fee = Math.min(fee, cfg.maxFee);
  
  return fee;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' сум';
};

export const getStatusText = (status: OrderStatus): string => {
  const statusMap = {
    new: 'Новый',
    prep: 'Готовится',
    shipped: 'Отправлен',
    delivered: 'Доставлен',
    return: 'Возврат',
    cancel: 'Отменен'
  };
  return statusMap[status] || status;
};

export const getStatusColor = (status: OrderStatus): string => {
  const colorMap = {
    new: 'bg-blue-100 text-blue-800',
    prep: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    return: 'bg-orange-100 text-orange-800',
    cancel: 'bg-red-100 text-red-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};