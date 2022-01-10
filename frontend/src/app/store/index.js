import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '../services/authApi'
import { authSlice } from '../slices/authSlice'

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
