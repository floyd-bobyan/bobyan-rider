import { configureStore } from '@reduxjs/toolkit';
// import login from './slices/login';

export const makeStore = () => {
  return configureStore({
    reducer: {
      login: (state = {}) => state,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];