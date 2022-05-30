import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from '../services/adminApi';
import { authApi } from '../services/authApi';
import { postApi } from '../services/postApi';
import { authSlice } from '../slices/authSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    user: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      adminApi.middleware,
      postApi.middleware
    ),
});

export default store;
