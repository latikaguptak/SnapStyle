import { ClothingItem } from '../types/wardrobe';

// Reduced number of dummy items to prevent storage issues
export const dummyClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'White T-Shirt',
    category: 'tops',
    imageUrl: '/white-tshirt.png',
    season: ['spring', 'summer'],
    tags: ['casual', 'basic'],
  },
  {
    id: '2',
    name: 'Blue Jeans',
    category: 'bottoms',
    imageUrl: '/jeans.png',
    season: ['spring', 'fall'],
    tags: ['casual', 'versatile'],
  },
  {
    id: '3',
    name: 'Full Dress',
    category: 'dresses',
    imageUrl: '/full_dress.png',
    season: ['summer'],
    tags: ['elegant', 'casual'],
  }
];