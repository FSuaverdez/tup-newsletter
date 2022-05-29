import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['UserPermissions'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    login: builder.mutation({
      query: googleUser => ({
        url: 'user/auth',
        method: 'POST',
        body: googleUser,
      }),
    }),
    getPermissions: builder.query({
      query: id => ({ url: 'user/auth/permissions/' + id }),
      providesTags: ['UserPermissions'],
    }),
  }),
});

export const { useLoginMutation, useGetPermissionsQuery } = authApi;
