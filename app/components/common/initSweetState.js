import { defaults  } from 'react-sweet-state';
import '@babel/polyfill';
/**
 * Add simple logger middleware
 */
const mw = storeState => next => arg => {
  /* eslint-disable no-console */
 // console.log(storeState.key, 'changing', arg);
  const result = next(arg);
 // console.log(storeState.key, 'changed');
  return result;
};
defaults.middlewares.add(mw);

/**
 * Enable Redux devtools support
 */
defaults.devtools = false;
