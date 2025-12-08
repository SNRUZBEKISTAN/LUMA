# LUMA Design System Guidelines

## 🎯 Общие принципы дизайна

### Философия
- **Минималистичность**: Убираем визуальный шум, фокусируемся на контенте
- **Премиальность**: Создаём ощущение качества как у Nike, Apple, Ozbe
- **Читабельность**: Типографика и контраст должны быть идеальными
- **Единообразие**: Все элементы следуют единой системе отступов и стилей

### Цветовая палитра
- **Primary**: #A260EF (фиолетовый)
- **Secondary**: #FF6D9D (розовый) 
- **Brand Gradient**: от #A260EF к #FF6D9D
- **Нейтральные**: #FAFAFA (фон), #F7F7F7 (градиент), #FFFFFF (карточки)

---

## 🛍️ Карточки товаров (ProductCardModern)

### Структура
1. **Фото товара**: aspect-ratio 1:1, rounded-xl, object-cover, shadow-sm
2. **Название магазина + иконка**: text-xs, text-muted-foreground, под фото
3. **Название товара**: text-sm, font-medium, line-clamp-2, под магазином
4. **Цена**: В отдельной области PriceTag
5. **Иконка корзины**: Только при hover/tap, анимация scale-in

### ❌ Что убираем из карточек
- Метки "Хит", если уже в категории "Хиты"
- Метки "Скидка -30%" - только внутри карточки товара
- Количество лайков и заказов - только на странице товара
- Сердечки и лишние кнопки

### ✅ Требования к дизайну
- **Отступы**: 12px между карточками (gap-3)
- **Внутри карточки**: padding 12px
- **Тени**: shadow-sm по умолчанию, shadow-lg при hover
- **Анимации**: hover:scale-[1.02], transition 150ms ease-in
- **Скругления**: rounded-xl для карточки и изображения

---

## 💰 Область цены (PriceTag)

### Варианты
1. **Default**: Цена в bg-purple-50 блоке, старая цена рядом
2. **Compact**: Цены в одной строке без фона
3. **Prominent**: Для акций, градиентный фон

### Стили
- **Цена**: text-lg, font-semibold, text-purple-600
- **Старая цена**: text-sm, line-through, text-gray-400
- **Фон области**: bg-purple-50 (#F6F3FF), rounded-md, py-2 px-3

---

## 🖼️ Контейнер изображений (ProductImageContainer)

### Поддерживаемые соотношения
- **1:1**: Квадрат (основной для карточек)
- **4:5**: Портрет (для детальных просмотров)
- **3:4**: Классический (для каталогов)

### Технические требования
- **Скругления**: rounded-xl по умолчанию
- **Фон**: bg-gray-100 для загрузки
- **Обрезка**: object-cover для правильного масштабирования

---

## 🎨 Фон приложения

### Структурная иерархия
- **Основной фон**: linear-gradient(to top, #F7F7F7, #FFFFFF)
- **Секции**: bg-white/80 с backdrop-blur для glass эффекта
- **Карточки**: bg-white с тенями для выделения

### Разделители секций
- Используем мягкие тени вместо границ
- bg-white/80 с shadow-sm для section-separator

---

## 📐 Система отступов

### Базовые значения
- **Между карточками**: 12px (gap-3)
- **Внутри карточки**: 12px (p-3)
- **Секции**: 24px отступ снизу
- **Контейнеры**: 16px padding по бокам

### CSS переменные
```css
--card-spacing: 12px;
--section-spacing: 24px; 
--card-inner-spacing: 8px;
--modern-card-shadow-light: 0 1px 3px rgba(0, 0, 0, 0.1);
--modern-card-shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.15);
```

---

## 🎪 Анимации и переходы

### Hover эффекты
- **Карточки**: scale(1.02) + shadow-lg
- **Кнопки**: opacity 0.9 или brightness(0.96)
- **Длительность**: 150ms ease-in для быстроты

### Появление элементов
- **Корзина в карточке**: opacity 0 → 1 + scale 0.75 → 1.0
- **Модальные окна**: fade-in 300ms + slide-up
- **Страницы**: slide transitions с transform

---

## 📱 Адаптивность

### Сетка товаров
- **Мобильные**: 2 колонки (grid-cols-2)
- **Планшеты**: 3-4 колонки
- **Десктоп**: до 6 колонок

### Размеры карточек
- Пропорциональное масштабирование от базового размера 402×874
- Минимальная ширина: 156px
- Максимальная широта: 200px на больших экранах

---

## 🚫 Запрещённые практики

1. **НЕ используй** text-size классы без необходимости
2. **НЕ добавляй** лишние метки и бейджи на карточки
3. **НЕ нарушай** единую систему отступов в 12px
4. **НЕ используй** старые компоненты ProductCardV3/V4
5. **НЕ создавай** hover эффекты длиннее 200ms

---

## ✅ Внедрение

### Чек-лист замены карточек
- [ ] Заменить ProductCardMedium на ProductCardModern
- [ ] Обновить пропсы (убрать onLikeToggle, добавить onAddToCart)
- [ ] Заменить "card-spacing" на "gap-3"
- [ ] Проверить отображение цен с PriceTag
- [ ] Убрать лишние метки из данных
- [ ] Протестировать hover эффекты

### Приоритеты
1. **Высокий**: Главная страница товаров
2. **Средний**: Страницы категорий
3. **Низкий**: Админ панель продавца
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
