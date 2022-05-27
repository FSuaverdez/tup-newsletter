import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import { categoryApi } from '../services/categoryApi';
import { postApi } from '../services/postApi';
import { subCategoryApi } from '../services/subCategoryApi';
import { authSlice } from '../slices/authSlice';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    user: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      categoryApi.middleware,
      subCategoryApi.middleware,
      postApi.middleware
    ),
});

export default store;
