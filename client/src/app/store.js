import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import helloReducer from '../features/hello/helloSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    hello: helloReducer,
  },
});
