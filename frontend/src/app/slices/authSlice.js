import { createSlice } from '@reduxjs/toolkit'

const localStorageAuthData = localStorage.getItem('profile')
  ? JSON.parse(localStorage.getItem('profile'))
  : null

export const authSlice = createSlice({
  name: 'auth',
  initialState: localStorageAuthData,

  reducers: {
    AUTH(state, action) {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
      return action.payload
    },
    LOGOUT(state, action) {
      localStorage.clear()
      return null
    },
  },
})

export const authActions = authSlice.actions
