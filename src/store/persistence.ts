import { AtomEffect } from 'recoil';

const MAX_ITEMS = 20; // Limit number of items to prevent quota issues

export const localStorageEffect = <T>(key: string): AtomEffect<T> => ({
  setSelf,
  onSet,
}) => {
  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  } catch (error) {
    console.warn(`Error reading from localStorage for key "${key}":`, error);
  }

  onSet((newValue: any, _: any, isReset) => {
    try {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        // For wardrobe items, limit the number of items stored
        if (key === 'wardrobe' && Array.isArray(newValue)) {
          const limitedItems = newValue.slice(-MAX_ITEMS);
          localStorage.setItem(key, JSON.stringify(limitedItems));
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      }
    } catch (error) {
      console.warn(`Error writing to localStorage for key "${key}":`, error);
    }
  });
};