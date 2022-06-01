import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['UserPermissions', 'User'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
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
    getAllUsers: builder.query({
      query: () => ({ url: 'user/getAll' }),
      providesTags: ['User'],
    }),
    removeUser: builder.mutation({
      query: ({ id }) => ({
        url: 'user/remove/' + id,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    addMobileNumber: builder.mutation({
      query: ({ mobileNumber, id }) => ({
        url: 'user/mobile/add/' + id,
        method: 'POST',
        body: { mobileNumber },
      }),
      invalidatesTags: ['User'],
    }),
    editMobileNumber: builder.mutation({
      query: ({ mobileNumber, id }) => ({
        url: 'user/mobile/edit/' + id,
        method: 'PUT',
        body: { mobileNumber },
      }),
      invalidatesTags: ['User'],
    }),
    editUserRole: builder.mutation({
      query: ({ id, isAdmin }) => ({
        url: 'user/update/' + id,
        method: 'PUT',
        body: { isAdmin },
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
  useGetAllUsersQuery,
  useRemoveUserMutation,
  useEditUserRoleMutation,
} = authApi;
