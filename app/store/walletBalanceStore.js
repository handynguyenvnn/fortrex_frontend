import {  DEFAULT_PAGE_INDEX, PAGE_SIZE } from 'constants/constant';

import { createStore } from './store';


const initStore = {
  pageSize:  PAGE_SIZE,
  pageIndex: DEFAULT_PAGE_INDEX,
  isReloadTable: false,
  params: {
    Type: -2,
  },
  loading: false,
};
export const WalletBalanceStore = createStore({
  default: initStore,
  ...initStore,
});
export const useWalletBalanceStore = WalletBalanceStore.useStore;
