import { createStore } from './store';


export const initialStore = {}
;

export const AppStore = createStore(initialStore);
export const useAppStore = AppStore.useStore;
