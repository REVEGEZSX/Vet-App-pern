import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import userSlice from './slices/userSlice'
import vetSlice from './slices/vetSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    vets: vetSlice,
  },
})