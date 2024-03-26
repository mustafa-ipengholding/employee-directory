// store.js
import { configureStore } from '@reduxjs/toolkit';
import {employeeApi} from "../reducers/apiSlice";
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeeApi.middleware),
    
});
setupListeners(store.dispatch)

export default store;
