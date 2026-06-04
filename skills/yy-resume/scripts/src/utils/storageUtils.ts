import { ref, watch, type Ref } from 'vue';

const STORE_STORAGE_KEY_PREFIX = 'store.';

function createStoreStorageKey(key: StoreStorageKey) {
  return `${STORE_STORAGE_KEY_PREFIX}${key}`;
}

function readStorage<T>(storage: Storage, key: StoreStorageKey, defaultValue: T): T {
  try {
    const raw = storage.getItem(createStoreStorageKey(key));

    if (raw === null) {
      return defaultValue;
    }

    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

function writeStorage<T>(storage: Storage, key: StoreStorageKey, value: T) {
  storage.setItem(createStoreStorageKey(key), JSON.stringify(value));
}

function createCachedRef<T>(storage: Storage, key: StoreStorageKey, defaultValue: T): Ref<T> {
  const state = ref(readStorage(storage, key, defaultValue)) as Ref<T>;

  watch(
    state,
    value => {
      writeStorage(storage, key, value);
    },
    { deep: true, flush: 'sync' }
  );

  return state;
}

export function cacheRef<T>(key: StoreStorageKey, defaultValue: T): Ref<T> {
  return createCachedRef<T>(localStorage, key, defaultValue);
}

export function tempRef<T>(key: StoreStorageKey, defaultValue: T): Ref<T> {
  return createCachedRef<T>(sessionStorage, key, defaultValue);
}
