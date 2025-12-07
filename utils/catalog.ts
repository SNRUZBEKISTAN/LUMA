import { Category, SizeChart, Gender } from '../types/app';

export const SizeCharts: SizeChart = {
  // Унисекс/муж верхи (междунар.)
  'tops_int_men': [
    { code: 'XS', label: 'XS (86–91 см грудь)' },
    { code: 'S',  label: 'S (91–96)' },
    { code: 'M',  label: 'M (96–101)' },
    { code: 'L',  label: 'L (101–106)' },
    { code: 'XL', label: 'XL (106–111)' },
    { code: 'XXL',label: 'XXL (111–116)' },
  ],
  // Жен верхи (междунар.)
  'tops_int_women': [
    { code: 'XS', label: 'XS (78–82 см грудь)' },
    { code: 'S',  label: 'S (82–86)' },
    { code: 'M',  label: 'M (86–92)' },
    { code: 'L',  label: 'L (92–98)' },
    { code: 'XL', label: 'XL (98–104)' },
  ],
  // Низы муж (джинсы W/L)
  'bottoms_jeans_men': [
    { code: '28/30', label: 'W28 L30' }, { code: '30/30', label: 'W30 L30' },
    { code: '31/32', label: 'W31 L32' }, { code: '32/32', label: 'W32 L32' },
    { code: '33/32', label: 'W33 L32' }, { code: '34/32', label: 'W34 L32' },
    { code: '36/34', label: 'W36 L34' },
  ],
  // Низы жен (междунар.)
  'bottoms_int_women': [
    { code: 'XS', label: 'XS (талия 60–64)' }, { code: 'S', label: 'S (64–68)' },
    { code: 'M', label: 'M (68–74)' }, { code: 'L', label: 'L (74–80)' },
    { code: 'XL', label: 'XL (80–86)' },
  ],
  // Платья (жен)
  'dress_int_women': [
    { code: 'XS', label: 'XS (росс. 40–42)' }, { code: 'S', label: 'S (42–44)' },
    { code: 'M', label: 'M (44–46)' }, { code: 'L', label: 'L (46–48)' },
    { code: 'XL', label: 'XL (48–50)' },
  ],
  // Обувь EU
  'shoes_eu_unisex': [
    { code: '36', label: 'EU 36' }, { code: '37', label: 'EU 37' }, { code: '38', label: 'EU 38' },
    { code: '39', label: 'EU 39' }, { code: '40', label: 'EU 40' }, { code: '41', label: 'EU 41' },
    { code: '42', label: 'EU 42' }, { code: '43', label: 'EU 43' }, { code: '44', label: 'EU 44' },
    { code: '45', label: 'EU 45' },
  ],
  // Дети (рост, см)
  'kids_height': [
    { code: '92', label: '92 см' }, { code: '98', label: '98 см' }, { code: '104', label: '104 см' }, { code: '110', label: '110 см' },
    { code: '116', label: '116 см' }, { code: '122', label: '122 см' }, { code: '128', label: '128 см' }, { code: '134', label: '134 см' },
    { code: '140', label: '140 см' }, { code: '146', label: '146 см' }, { code: '152', label: '152 см' },
  ],
  // Бюстгальтеры (примерно)
  'bra_band_cup': [
    { code: '70A', label: '70A' }, { code: '70B', label: '70B' }, { code: '75B', label: '75B' }, { code: '75C', label: '75C' },
    { code: '80C', label: '80C' }, { code: '85D', label: '85D' },
  ],
};

export const Categories: Category[] = [
  { id: 'cat_ts', kind: 'topwear', name: 'Футболки', slug: 't-shirts', gender: ['men','women','unisex'], sizeSystem: 'tops_int_men', coverImage: '/media/cat/tshirts.jpg' },
  { id: 'cat_shirts', kind: 'topwear', name: 'Рубашки', slug: 'shirts', gender: ['men','unisex'], sizeSystem: 'tops_int_men', coverImage: '/media/cat/shirts.jpg' },
  { id: 'cat_blouses', kind: 'topwear', name: 'Блузы', slug: 'blouses', gender: ['women'], sizeSystem: 'tops_int_women', coverImage: '/media/cat/blouses.jpg' },
  { id: 'cat_jeans', kind: 'bottomwear', name: 'Джинсы', slug: 'jeans', gender: ['men','women','unisex'], sizeSystem: 'bottoms_jeans_men', coverImage: '/media/cat/jeans.jpg' },
  { id: 'cat_trousers', kind: 'bottomwear', name: 'Брюки', slug: 'trousers', gender: ['men','women'], sizeSystem: 'bottoms_int_women', coverImage: '/media/cat/trousers.jpg' },
  { id: 'cat_dress', kind: 'dress', name: 'Платья', slug: 'dresses', gender: ['women'], sizeSystem: 'dress_int_women', coverImage: '/media/cat/dresses.jpg' },
  { id: 'cat_outer', kind: 'outerwear', name: 'Верхняя одежда', slug: 'outerwear', gender: ['men','women','unisex'], sizeSystem: 'tops_int_men', coverImage: '/media/cat/outerwear.jpg' },
  { id: 'cat_knit', kind: 'knitwear', name: 'Трикотаж', slug: 'knitwear', gender: ['men','women'], sizeSystem: 'tops_int_men', coverImage: '/media/cat/knitwear.jpg' },
  { id: 'cat_shoes', kind: 'footwear', name: 'Обувь', slug: 'footwear', gender: ['men','women','unisex'], sizeSystem: 'shoes_eu_unisex', coverImage: '/media/cat/shoes.jpg' },
  { id: 'cat_kids', kind: 'loungewear', name: 'Детская одежда', slug: 'kids', gender: ['girls','boys','baby'], sizeSystem: 'kids_height', coverImage: '/media/cat/kids.jpg' },
];