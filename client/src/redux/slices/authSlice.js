import { createSlice } from '@reduxjs/toolkit'

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem('isAuth')

  if (isAuth && JSON.parse(isAuth) === true) {
    return true
  }

  return false
}
const userRoleFromLocalStorage = () => {
  const userRole = localStorage.getItem('userRole')

  if (userRole) {
    return JSON.parse(userRole)
  }

  return null
}

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  userRole: userRoleFromLocalStorage(),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true
      localStorage.setItem('isAuth', true)
      state.userRole = action.payload
      localStorage.setItem('userRole', JSON.stringify(action.payload))
    },
    unauthenticateUser: (state) => {
      state.isAuth = false
      localStorage.removeItem('isAuth')
      state.userRole = null
      localStorage.removeItem('userRole')
    },
  },
})

export const { authenticateUser, unauthenticateUser } = authSlice.actions

export default authSlice.reducer
