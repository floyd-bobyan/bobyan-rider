import { configureStore } from '@reduxjs/toolkit';
import authreducer from './slices/login';
import earningsReducer from './slices/earnings';

export const makeStore = () => {
  return configureStore({
    reducer: {
      login: authreducer,
      earnings: earningsReducer,
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