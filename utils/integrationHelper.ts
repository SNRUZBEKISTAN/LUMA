/**
 * Integration helper to merge new stores (JUST, OZBE, PINKISLAND) 
 * with existing seed data
 */

import { Shop, Product } from '../types/app';
import { NEW_STORES, generateNewStoresProducts, generateNewStoresStories } from './newStoresData';
import { initializeSeedData, generateStories } from './seedData';

/**
 * Enhanced initialization that includes the 3 new premium stores
 * Now total: 13 stores, 186+ products, 28+ story videos
 */
export function initializeEnhancedSeedData() {
  // Get original 10 stores and 126 products
  const originalData = initializeSeedData();
  
  // Generate products for new stores (60 products: 20 per store)
  const newProducts = generateNewStoresProducts(originalData.products.length);
  
  // Merge with premium stores FIRST - making them the main brands
  const allShops = [...NEW_STORES, ...originalData.shops]; // Premium brands first!
  const allProducts = [...newProducts, ...originalData.products]; // Premium products first!
  
  return {
    categories: originalData.categories,
    sizeCharts: originalData.sizeCharts,
    shops: allShops, // Total: 13 stores (JUST, OZBE, PINK ISLAND first!)
    products: allProducts // Total: 186 products (premium first!)
  };
}

/**
 * Enhanced stories generation that includes new store videos
 */
export function generateEnhancedStories(shops: Shop[], products: Product[]) {
  try {
    // Get new stores' stories FIRST (15 videos: 5 per store) - they should appear first!
    const newStories = generateNewStoresStories(products);
    
    // Get original stories for remaining shops (skip first 3 which are the new premium stores)
    const originalShops = shops.slice(3); // Skip JUST, OZBE, PINKISLAND
    const originalStories = generateStories(originalShops, products);
    
    // Merge with premium stories first
    return [...newStories, ...originalStories]; // Total: 28+ story videos (premium first!)
  } catch (error) {
    console.error('Error generating enhanced stories:', error);
    // Return empty array as fallback
    return [];
  }
}

/**
 * Summary statistics
 */
export function getDataSummary() {
  const data = initializeEnhancedSeedData();
  
  return {
    totalStores: data.shops.length,
    totalProducts: data.products.length,
    premiumStores: NEW_STORES.length,
    storeBreakdown: {
      premium: 3, // JUST, OZBE, PINK ISLAND - shown first!
      standard: 10 // Other stores with Unsplash images
    },
    productsPerStore: {
      'JUST': data.products.filter(p => p.storeId === 'shop-just').length,
      'OZBE': data.products.filter(p => p.storeId === 'shop-ozbe').length,
      'PINK ISLAND': data.products.filter(p => p.storeId === 'shop-pinkisland').length,
      'URBAN STYLE': data.products.filter(p => p.storeId === 'shop-1').length,
      'CLASSIC WEAR': data.products.filter(p => p.storeId === 'shop-2').length,
      'SPORT ZONE': data.products.filter(p => p.storeId === 'shop-3').length,
      'ELEGANT BOUTIQUE': data.products.filter(p => p.storeId === 'shop-4').length,
      'STREET FASHION': data.products.filter(p => p.storeId === 'shop-5').length,
      'PREMIUM BRANDS': data.products.filter(p => p.storeId === 'shop-6').length,
      'CASUAL PLUS': data.products.filter(p => p.storeId === 'shop-7').length,
      'TREND MAKER': data.products.filter(p => p.storeId === 'shop-8').length,
      'ACTIVE LIFESTYLE': data.products.filter(p => p.storeId === 'shop-9').length,
      'MINIMALIST STORE': data.products.filter(p => p.storeId === 'shop-10').length
    },
    imagesSources: {
      premium: 'GitHub Real Photos (60 products with actual store images)',
      standard: 'Unsplash Quality Fashion Photos (126 products with category-matched images)'
    }
  };
}