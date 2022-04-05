export type TKey = 'language';

export enum LocalStorageKey {
  BookStoreCart = 'book_store_cart',
}

export const setItemStorage = (key: TKey, value: string): void => {
  if (!process.browser) return;
  localStorage.setItem(key, value);
};

export const getItemStorage = (key: TKey): string | null => {
  if (!process.browser) return null;
  return localStorage.getItem(key);
};

export const setItemDataStorage = (key: string, value: string): void => {
  if (!process.browser) return;
  localStorage.setItem(key, value);
};

export const getItemDataStorage = (key: string): string | null => {
  if (!process.browser) return null;
  return localStorage.getItem(key);
};

export const removeItemDataStorage = (key: string): void | null => {
  if (!process.browser) return null;
  return localStorage.removeItem(key);
};
