import { generateShops, generateProducts } from './seedData';
import { apiCall } from './supabase/client';

/**
 * Seed the backend with initial data
 * This function should be called once to populate the database
 * with shops and products from seedData.ts
 */
export async function seedBackend() {
  try {
    console.log('Starting backend seed...');
    
    // Generate data
    const shops = generateShops();
    const products = generateProducts(shops);
    
    console.log(`Generated ${shops.length} shops and ${products.length} products`);
    
    // Check if data already exists
    const existingShopsResponse = await apiCall('/shops');
    const { shops: existingShops } = await existingShopsResponse.json();
    
    if (existingShops && existingShops.length > 0) {
      console.log('Backend already seeded. Skipping...');
      return {
        success: true,
        message: 'Backend already has data',
        alreadySeeded: true
      };
    }
    
    // Seed shops
    console.log('Seeding shops...');
    for (const shop of shops) {
      try {
        // Use direct KV store endpoint
        await fetch(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-16f227d8/shops`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(shop)
        });
      } catch (error) {
        console.error(`Failed to seed shop ${shop.id}:`, error);
      }
    }
    
    // Seed products
    console.log('Seeding products...');
    for (const product of products) {
      try {
        await fetch(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/make-server-16f227d8/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify(product)
        });
      } catch (error) {
        console.error(`Failed to seed product ${product.id}:`, error);
      }
    }
    
    console.log('Backend seeding completed!');
    
    return {
      success: true,
      message: `Successfully seeded ${shops.length} shops and ${products.length} products`,
      shopsCount: shops.length,
      productsCount: products.length
    };
  } catch (error) {
    console.error('Backend seeding error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to seed backend'
    };
  }
}

/**
 * Check if backend is seeded
 */
export async function isBackendSeeded(): Promise<boolean> {
  try {
    const response = await apiCall('/shops');
    const { shops } = await response.json();
    return shops && shops.length > 0;
  } catch (error) {
    console.error('Check backend seed error:', error);
    return false;
  }
}
