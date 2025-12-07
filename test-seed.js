// Временный тест для проверки seedData
console.log('Testing seedData...');

try {
  // Эмулируем модули которые нужны
  const Categories = [
    { id: 'cat_ts', name: 'Футболки', parent: null },
    { id: 'cat_jeans', name: 'Джинсы', parent: null }
  ];
  
  const SizeCharts = {
    'cat_ts': ['XS', 'S', 'M', 'L', 'XL'],
    'cat_jeans': ['28', '30', '32', '34', '36']
  };

  function generateShops() {
    return [
      { 
        id: 'shop-1', 
        name: 'URBAN STYLE', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', 
        code: 'URB', 
        isVerified: true, 
        country: 'Узбекистан',
        deliveryFee: 15000,
        freeDeliveryThreshold: 200000
      },
      { 
        id: 'shop-2', 
        name: 'CLASSIC WEAR', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', 
        code: 'CLS', 
        isVerified: true, 
        country: 'Турция',
        deliveryFee: 12000,
        freeDeliveryThreshold: 150000
      }
    ];
  }

  const shops = generateShops();
  console.log('Shops generated:', shops.length);
  console.log('First shop:', shops[0]);

} catch (error) {
  console.error('Error:', error);
}