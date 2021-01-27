import {  DEFAULT_PAGE_INDEX, PAGE_SIZE } from 'constants/constant';

import { createStore } from './store';


const initStore = {
  pageSize:  PAGE_SIZE,
  pageIndex: DEFAULT_PAGE_INDEX,
  isReloadTable: false,
  params: {

  },
  loading: false,
};
export const WalletTransferHistory = createStore({
  default: initStore,
  ...initStore,
});
export const useWalletTransferHistory = WalletTransferHistory.useStore;
