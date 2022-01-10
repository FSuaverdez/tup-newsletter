import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:5000/'
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    login: builder.mutation({
      query: googleUser => ({
        url: 'user/auth',
        method: 'POST',
        body: googleUser,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
