import { ColorKey } from '../types/app';

// Цветовая карта с hex значениями для UI
export const ColorHex: Record<ColorKey, string> = {
  black: '#000000',
  white: '#FFFFFF', 
  grey: '#9CA3AF',
  navy: '#1F2937',
  blue: '#2563EB',
  lightblue: '#60A5FA',
  green: '#10B981',
  olive: '#4D7C0F',
  beige: '#D6CCB2',
  brown: '#7C4A22',
  tan: '#D2B48C',
  yellow: '#F59E0B',
  orange: '#F97316',
  red: '#EF4444',
  pink: '#EC4899',
  purple: '#8B5CF6',
  gold: '#D4AF37',
  silver: '#C0C0C0',
};

export const getColorHex = (color: ColorKey): string => {
  return ColorHex[color] || '#9CA3AF';
};