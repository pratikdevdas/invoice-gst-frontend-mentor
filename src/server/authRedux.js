/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../redux/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error?.originalStatus === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions)
    if (refreshResult?.data) {
      const user = await api.getState().auth.user
      api.dispatch(setCredentials({ ...refreshResult.data, user }))
      // retry original query with new token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
    return result
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
})

// for my login mutation to be used in login form
export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
})

export const { useLoginMutation } = authApiSlice
