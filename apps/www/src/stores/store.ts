import { createStore } from 'jotai';

export const store = createStore();

export type Store = ReturnType<typeof createStore>;
