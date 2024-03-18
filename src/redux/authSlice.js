/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { username, accessToken } = action.payload
      state.user = username
      state.token = accessToken
    },
    logOut: (state) => {
      state.user = null
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
