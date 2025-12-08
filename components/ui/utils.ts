import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Price formatting utility - removes currency display as per requirements
export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU');
}
