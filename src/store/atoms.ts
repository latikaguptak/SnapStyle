import { atom } from 'recoil';
import { ClothingItem, SavedOutfit, OutfitLabel, User } from '../types/wardrobe';
import { dummyClothingItems } from '../data/dummyData';
import { localStorageEffect } from './persistence';

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects: [localStorageEffect('user')]
});

export const themeState = atom<'light' | 'dark'>({
  key: 'themeState',
  default: 'light',
  effects: [localStorageEffect('theme')]
});

export const wardrobeState = atom<ClothingItem[]>({
  key: 'wardrobeState',
  default: dummyClothingItems,
  effects: [localStorageEffect('wardrobe')]
});

export const selectedOutfitState = atom<ClothingItem[]>({
  key: 'selectedOutfitState',
  default: [],
  effects: [localStorageEffect('selectedOutfit')]
});

export const savedOutfitsState = atom<SavedOutfit[]>({
  key: 'savedOutfitsState',
  default: [],
  effects: [localStorageEffect('savedOutfits')]
});

export const outfitLabelsState = atom<OutfitLabel[]>({
  key: 'outfitLabelsState',
  default: [
    { id: '1', name: 'Casual', color: '#FDA4AF' },
    { id: '2', name: 'Work', color: '#93C5FD' },
    { id: '3', name: 'Party', color: '#C4B5FD' },
  ],
  effects: [localStorageEffect('outfitLabels')]
});