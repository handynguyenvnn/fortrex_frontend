import React, { createContext, useContext, useReducer } from 'react';
import produce from 'immer';
import PropTypes from 'prop-types';

export const createStore = initialState => {
  const StateContext = createContext(initialState);
  const UpdateContext = createContext(null);
  const StoreProvider = ({ children }) => {
    const [state, updateState] = useReducer(produce, initialState);
    return (
      <UpdateContext.Provider value={updateState}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
      </UpdateContext.Provider>
    );
  };
  StoreProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };
  const useStore = () => [useContext(StateContext), useContext(UpdateContext)];
  return { Provider: StoreProvider, useStore };
};
