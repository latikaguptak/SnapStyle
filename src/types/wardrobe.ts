export interface ClothingItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'dresses';
  imageUrl: string;
  season: string[];
  tags: string[];
}

export type SavedOutfit = {
  id: string;
  name: string;
  label: string;
  items: ClothingItem[];
  createdAt: Date;
  plannedDate?: Date;
};

export type OutfitLabel = {
  id: string;
  name: string;
  color: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
};