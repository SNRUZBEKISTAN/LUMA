# Luma Backend Functions

Backend функции реализованы на базе **Supabase** с использованием Edge Functions (Hono web server) и Key-Value Store для хранения данных.

## Архитектура

```
Frontend (React) ←→ Supabase Edge Functions (Hono) ←→ KV Store (PostgreSQL)
                ↓
         Supabase Auth
```

## Доступ к Backend Demo

Для просмотра статуса backend и инициализации данных:

1. Откройте приложение и используйте hash URL: `#backendDemo`
2. Или перезагрузите страницу с `window.location.hash = 'backendDemo'`
3. В Debug Navigation нажмите кнопку "🔧 Backend Demo"

## Endpoints

### Authentication

#### POST `/auth/signup`
Регистрация нового пользователя.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "User Name",
  "role": "buyer",
  "phone": "+998901234567"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    ...
  },
  "message": "User created successfully"
}
```

#### GET `/auth/profile`
Получить профиль текущего пользователя.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name",
    "role": "buyer"
  },
  "authenticated": true
}
```

---

### Shops

#### GET `/shops`
Получить список всех магазинов.

**Response:**
```json
{
  "shops": [
    {
      "id": "shop-1",
      "name": "URBAN STYLE",
      "avatar": "https://...",
      "isVerified": true,
      "country": "Узбекистан",
      "deliveryFee": 15000
    }
  ]
}
```

#### GET `/shops/:shopId`
Получить информацию о конкретном магазине.

#### POST `/shops`
Создать новый магазин (только для продавцов).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "name": "My Shop",
  "avatar": "https://...",
  "country": "Узбекистан",
  "code": "MSH",
  "deliveryFee": 15000,
  "freeDeliveryThreshold": 200000
}
```

---

### Products

#### GET `/products`
Получить список товаров с опциональной фильтрацией.

**Query Parameters:**
- `shopId`: Фильтр по магазину
- `categoryId`: Фильтр по категории

**Response:**
```json
{
  "products": [
    {
      "id": "product-1",
      "name": "Стильная футболка",
      "price": 150000,
      "storeId": "shop-1",
      "media": [...],
      ...
    }
  ]
}
```

#### GET `/products/:productId`
Получить информацию о конкретном товаре.

#### POST `/products`
Создать новый товар (только для продавцов).

**Headers:**
```
Authorization: Bearer <access_token>
```

#### PUT `/products/:productId`
Обновить товар (только для продавцов).

#### DELETE `/products/:productId`
Удалить товар (только для продавцов).

---

### Cart

#### GET `/cart`
Получить корзину текущего пользователя.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "cart": {
    "shops": [
      {
        "storeId": "shop-1",
        "storeName": "URBAN STYLE",
        "items": [
          {
            "productId": "product-1",
            "name": "Стильная футболка",
            "price": 150000,
            "quantity": 2
          }
        ],
        "deliveryFee": 15000
      }
    ]
  }
}
```

#### POST `/cart`
Обновить корзину.

#### DELETE `/cart`
Очистить корзину.

---

### Orders

#### POST `/orders`
Создать новый заказ.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request:**
```json
{
  "storeId": "shop-1",
  "storeName": "URBAN STYLE",
  "items": [...],
  "address": "г. Ташкент, ул. Примерная 123",
  "fees": {
    "subtotal": 300000,
    "deliveryFee": 15000,
    "serviceFee": 7875,
    "total": 322875
  }
}
```

**Response:**
```json
{
  "order": {
    "id": "order-1234567890",
    "number": "A-274593",
    "status": "new",
    ...
  }
}
```

#### GET `/orders`
Получить заказы покупателя.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### GET `/seller/orders?storeId=shop-1`
Получить заказы продавца.

#### PUT `/orders/:orderId/status`
Обновить статус заказа (только для продавцов).

**Request:**
```json
{
  "status": "shipped",
  "note": "Заказ отправлен курьером"
}
```

---

### Favorites

#### GET `/favorites`
Получить список избранных товаров.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### POST `/favorites/:productId`
Добавить товар в избранное.

#### DELETE `/favorites/:productId`
Удалить товар из избранного.

---

## Frontend Integration

### Using API Functions

```typescript
import * as api from '../utils/api';

// Sign in
const { session } = await api.signIn('user@example.com', 'password');

// Get products
const products = await api.getProducts({ shopId: 'shop-1' });

// Add to cart
const cart = await api.updateCart(cartData);

// Create order
const order = await api.createOrder(orderData);
```

### Using Backend Hook

```typescript
import { useBackend } from '../hooks/useBackend';

function MyComponent() {
  const { isAuthenticated, user, loading, api } = useBackend();

  useEffect(() => {
    if (isAuthenticated) {
      // Load user data
      api.getOrders().then(setOrders);
    }
  }, [isAuthenticated]);

  // ...
}
```

---

## Data Seeding

Для инициализации backend данными из `seedData.ts`:

```typescript
import { seedBackend } from '../utils/seedBackend';

// Seed backend with shops and products
const result = await seedBackend();
console.log(result); // { success: true, shopsCount: 10, productsCount: 126 }
```

---

## Security

### Authentication
Все защищенные endpoints требуют JWT токен в заголовке:
```
Authorization: Bearer <access_token>
```

### Row Level Security
Данные пользователей изолированы на уровне запросов:
- Покупатели видят только свои заказы и корзину
- Продавцы видят только заказы своих магазинов
- Публичные данные (товары, магазины) доступны всем

### Environment Variables
Backend использует следующие переменные окружения:
- `SUPABASE_URL`: URL проекта Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Ключ с полными правами (только на сервере)
- `SUPABASE_ANON_KEY`: Публичный ключ для клиента

---

## Error Handling

Все endpoints возвращают стандартизированные ошибки:

```json
{
  "error": "Error message",
  "status": 400
}
```

HTTP статусы:
- `200`: Успешно
- `400`: Неверный запрос
- `401`: Не авторизован
- `404`: Не найдено
- `500`: Внутренняя ошибка сервера

---

## Development

### Running Locally

Backend автоматически развертывается в Supabase. Для локального тестирования:

1. Убедитесь что Supabase проект настроен
2. Проверьте переменные окружения
3. Endpoints доступны по адресу:
   ```
   https://{projectId}.supabase.co/functions/v1/make-server-16f227d8/{endpoint}
   ```

### Testing

Используйте Backend Demo экран для:
- Проверки подключения
- Инициализации тестовых данных
- Просмотра статистики
- Тестирования endpoints

---

## Limitations

**⚠️ Важно для Production:**

1. **KV Store**: Текущая реализация использует простой KV store. Для production рекомендуется:
   - Создать полноценные таблицы PostgreSQL
   - Добавить индексы для производительности
   - Настроить Row Level Security политики

2. **Миграции**: Не поддерживаются в Make environment. Для production:
   - Используйте Supabase migrations
   - Создайте proper database schema

3. **PII данные**: Make не предназначен для хранения персональной информации:
   - Не используйте для реальных платежей
   - Не храните sensitive данные
   - Для production используйте полноценную инфраструктуру

4. **Масштабирование**: KV store подходит для прототипирования:
   - Для высоких нагрузок используйте полноценные таблицы
   - Добавьте кэширование (Redis)
   - Используйте CDN для статики

---

## Next Steps

1. **Настройте Google OAuth** для социального входа
2. **Добавьте Storage** для загрузки изображений товаров
3. **Интегрируйте платежи** (например, Click, Payme)
4. **Добавьте Real-time** уведомления через Supabase Realtime
5. **Создайте админ панель** для управления заказами

---

## Support

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Убедитесь что backend инициализирован (Backend Demo)
3. Проверьте логи в Supabase Dashboard
4. Убедитесь что токен авторизации актуален

