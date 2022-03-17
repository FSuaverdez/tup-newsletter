import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import { categoryApi } from '../services/categoryApi'
import { authSlice } from '../slices/authSlice'

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    user: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, categoryApi.middleware),
})

export default store
