import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['UserPermissions', 'User'],
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
    getUser: builder.query({
      query: id => ({ url: 'user/' + id }),
      providesTags: ['User'],
    }),
    addMobileNumber: builder.mutation({
      query: ({ mobileNumber, id }) => ({
        url: 'user/mobile/add/' + id,
        method: 'POST',
        body: {mobileNumber},
      }),
      invalidatesTags: ['User'],
    }),
    editMobileNumber: builder.mutation({
      query: ({ mobileNumber, id }) => ({
        url: 'user/mobile/edit/' + id,
        method: 'PUT',
        body: {mobileNumber},
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetPermissionsQuery,
  useGetUserQuery,
  useAddMobileNumberMutation,
  useEditMobileNumberMutation,
} = authApi;
