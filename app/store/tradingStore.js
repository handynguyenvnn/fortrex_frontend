import { createStore } from './store';


const initStore = {
  isShowButtonDownUp: false,
  loading: false,
  isShow2FA: false,
};
export const TradingStore = createStore({
  default: initStore,
  ...initStore,
});
export const useTradingStore = TradingStore.useStore;
